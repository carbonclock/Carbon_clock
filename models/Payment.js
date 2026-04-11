import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  courseSlug: {
    type: String,
    required: true,
  },

  razorpayOrderId: {
    type: String,
    required: true,
  },

  razorpayPaymentId: {
    type: String,
  },

  razorpaySignature: {
    type: String,
  },

  amount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "INR",
  },

  status: {
    type: String,
    enum: ["created", "captured", "failed"],
    default: "created",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);
