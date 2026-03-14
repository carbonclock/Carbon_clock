import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  const decoded = verifyToken(req);

  if (!decoded) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(decoded.userId).select("-password -__v");

  return Response.json({ user });
}