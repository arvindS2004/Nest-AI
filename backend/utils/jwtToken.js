// utils/jwtToken.js

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    sameSite: "None", // Required for cross-origin cookies
    secure: true,     // Required for HTTPS
  };

  res.status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // Include role for frontend role-based logic
      },
    });
};

module.exports = sendToken;
