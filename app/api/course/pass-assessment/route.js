import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, courseTitle } = await req.json();
    if (!courseSlug || !courseTitle) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Add course to passedAssessments if not already there
    if (!user.passedAssessments.includes(courseSlug)) {
      user.passedAssessments.push(courseSlug);
      
      // Generate a simple certificate ID
      const certificateId = `CC-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`;
      
      // Add to certificates array
      user.certificates.push({
        courseSlug,
        courseTitle,
        completedAt: new Date(),
        issueDate: new Date(),
        certificateId
      });

      await user.save();
    }

    return Response.json({ 
      success: true, 
      passedAssessments: user.passedAssessments,
      certificates: user.certificates
    });
  } catch (error) {
    console.error("Pass assessment error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
