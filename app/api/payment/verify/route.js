import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(req) {
  try {
    await connectDB();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, courseSlug } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update Payment record
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "captured",
        }
      );

      // Add course to User's purchasedCourses
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: courseSlug },
      });

      return NextResponse.json({ message: "Payment verified successfully", success: true });
    } else {
      return NextResponse.json({ message: "Payment verification failed", success: false }, { status: 400 });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
