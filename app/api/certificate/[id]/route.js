import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    // Find the user who has this certificate ID
    const user = await User.findOne({ "certificates.certificateId": id });

    if (!user) {
      return Response.json({ error: "Certificate not found" }, { status: 404 });
    }

    // Find the specific certificate in the user's certificates array
    const certificate = user.certificates.find((c) => c.certificateId === id);

    if (!certificate) {
      return Response.json({ error: "Certificate not found" }, { status: 404 });
    }

    return Response.json({
      userName: user.name,
      courseTitle: certificate.courseTitle,
      issueDate: certificate.issueDate,
      certificateId: certificate.certificateId,
    });
  } catch (error) {
    console.error("Fetch certificate error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
