import type { Metadata } from "next";
import "./globals.css";
import Provider from "@/Components/Provider";
import NavBar from "@/Components/Navbar";
export const metadata: Metadata = {
  title: "Touch Tech",
  description: "Assignment",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en">
      <body>
        
      <Provider session={null}>
        <NavBar/>
        {children}
      </Provider>
      </body>
    </html>
  );
}
