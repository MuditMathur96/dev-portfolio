import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import ThemeProvider from "@/components/theme-provider";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mudit Mather Dev Portfolio",
  description: "Experienced Web Developer with 4+ years of expertise in JavaScript, TypeScript, .NET, MongoDB, and PostgreSQL. Specializing in AI and automation solutions. Explore my portfolio and projects.Experienced Web Developer with 4+ years of expertise in JavaScript, TypeScript, .NET, MongoDB, and PostgreSQL. Specializing in AI and automation solutions. Explore my portfolio and projects.",
  keywords:"Web Developer, JavaScript, TypeScript, .NET, MongoDB, PostgreSQL, AI Developer, Automation, Full-Stack Developer, Portfolio",
  authors:[{name:"Mudit Mathur"}],
  openGraph:{
    type:"website",
    title:"Experienced Web & AI Automation Developer",
    description:"I specialize in JavaScript, TypeScript, .NET, MongoDB, and PostgreSQL, with hands-on experience in AI and automation. Explore my portfolio.",
    
  },
  twitter:{ card: "summary_large_image", site: "@site", creator: "@creator", "images": "https://example.com/og.png" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      
      <body className={`${inter.className}
      
      `}>

       <header className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 py-4 border-b border-gray-200 dark:border-gray-800">
          

        <Navbar />
        </header>
        <main>
        {children}
        </main>
        <Toaster 
        position={"top-center"}
        />
        <Footer />
        </body>
      
       
    </html>
  );
}
