const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  productImage: {
    type: String,
    required: [true, "Please enter your product image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter your product stock"],
  }
});

cartSchema.virtual('product', {
  ref: 'Product',
  localField: 'productId',
  foreignField: '_id',
  justOne: true
});

cartSchema.set('toObject', { virtuals: true });
cartSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Cart", cartSchema);
