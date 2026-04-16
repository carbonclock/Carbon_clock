import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await req.json();
    if (!courseSlug) {
      return Response.json({ error: "Missing courseSlug" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Add course to passedAssessments if not already there
    if (!user.passedAssessments.includes(courseSlug)) {
      user.passedAssessments.push(courseSlug);
      await user.save();
    }

    return Response.json({ 
      success: true, 
      passedAssessments: user.passedAssessments 
    });
  } catch (error) {
    console.error("Pass assessment error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
