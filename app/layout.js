import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Carbon Clock",
  description: "Time to Measure. Time to Act.",
  icons: {
    icon: "/logo1.svg",
    shortcut: "/logo1.svg",
    apple: "/logo1.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}