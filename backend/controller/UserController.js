const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register user
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, avatar, isDefaultAvatar, avatarUrl } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    let avatarData = {
      public_id: "default_avatar",
      url: "/profile.png",
    };

    // Check if it's a default avatar
    if (isDefaultAvatar === "true" && avatarUrl) {
      // For default avatars, just use the provided URL
      avatarData = {
        public_id: "default_avatar",
        url: avatarUrl,
      };
    } else if (avatar && avatar !== "/profile.png" && avatar.startsWith("data:image")) {
      // For uploaded files, handle cloudinary upload
      try {
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });

        avatarData = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } catch (uploadError) {
        return next(new ErrorHandler("Avatar upload failed: " + uploadError.message, 400));
      }
    }

    user = await User.create({
      name,
      email,
      password,
      avatar: avatarData,
    });
    
    // Send token with newUser flag for registration
    sendTokenWithNewUserFlag(user, 201, res, true); 

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter the email & password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect password", 401));
  }

  // Send token with newUser flag false for login (existing user)
  sendTokenWithNewUserFlag(user, 200, res, false);
});

//  Log out user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log out success",
  });
});

// Forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetToken();

  await user.save({
    validateBeforeSave: false,
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl}`;

  try {
    await sendMail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTime = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Create Token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordTime: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password is not matched with the new password", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordTime = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//  Get user Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update User Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("Old Password is incorrect", 400)
    );
  }

  if(req.body.newPassword !== req.body.confirmPassword){
    return next(
      new ErrorHandler("Password not matched with each other", 400)
    );
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Handle avatar update
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    
    // Check if it's a default avatar or uploaded file
    if (req.body.isDefaultAvatar === "true" && req.body.avatarUrl) {
      // For default avatars, just update with the new URL
      newUserData.avatar = {
        public_id: "default_avatar",
        url: req.body.avatarUrl,
      };
    } else if (req.body.avatar.startsWith("data:image")) {
      // For uploaded files, handle cloudinary upload
      try {
        // Delete old avatar if it's not a default one
        if (user.avatar.public_id !== "default_avatar") {
          await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        }

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });

        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      } catch (uploadError) {
        return next(new ErrorHandler("Avatar upload failed: " + uploadError.message, 400));
      }
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All users ---Admin
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details ---Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
 
  if(!user){
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Change user Role --Admin
exports.updateUserRole = catchAsyncErrors(async(req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user
  });
});

// Delete User ---Admin
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findById(req.params.id);

  if(!user){
    return next(new ErrorHandler("User is not found with this id", 400));
  }

  // Only delete from cloudinary if it's not a default avatar
  if (user.avatar.public_id !== "default_avatar") {
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }

  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully"
  });
});

// Helper function to send token with newUser flag
const sendTokenWithNewUserFlag = (user, statusCode, res, isNewUser) => {
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
    newUser: isNewUser, // This is the key addition
  });
};