import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, moduleIndex } = await req.json();
    if (!courseSlug || moduleIndex === undefined) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const moduleKey = `${courseSlug}_module_${moduleIndex}`;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Add module if not already completed
    if (!user.completedModules.includes(moduleKey)) {
      user.completedModules.push(moduleKey);
      await user.save();
    }

    return Response.json({ 
      success: true, 
      completedModules: user.completedModules 
    });
  } catch (error) {
    console.error("Complete module error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
