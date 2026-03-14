import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NavbarWrapper from "@/components/NavbarWrapper";

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
        <NavbarWrapper>
          <Navbar />
        </NavbarWrapper>
        <main>{children}</main>
        <NavbarWrapper>
          <Footer />
        </NavbarWrapper>
      </body>
    </html>
  );
}