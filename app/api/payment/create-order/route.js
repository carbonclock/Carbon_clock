import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/lib/mongodb";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const requestData = await req.json();
    const { amount, courseSlug, userId } = requestData;

    console.log("Creating order for:", { amount, courseSlug, userId });

    if (!amount || !courseSlug || !userId) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error("Razorpay keys missing in .env");
      return NextResponse.json({ message: "Payment gateway configuration missing" }, { status: 500 });
    }

    const RazorpayInstance = Razorpay.default || Razorpay;
    const razorpay = new RazorpayInstance({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
    };

    console.log("Razorpay order options:", options);

    const order = await razorpay.orders.create(options);

    console.log("Razorpay order created:", order.id);

    await connectDB();
    await Payment.create({
      userId,
      courseSlug,
      razorpayOrderId: order.id,
      amount,
      status: "created",
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Detailed Order creation error:", error);
    // Log more specific error info if available
    if (error.error) console.error("Razorpay Error Data:", error.error);
    
    return NextResponse.json({ 
      message: "Razorpay order creation failed", 
      error: error.message 
    }, { status: 500 });
  }
}
