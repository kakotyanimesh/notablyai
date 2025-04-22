import type { Metadata } from "next";
import "./globals.css";
// import { ThemeProvider } from "./components/themeProvider";
import  LocalFont from "next/font/local"
import { Toaster } from "sonner";

const localFont = LocalFont({
  src : '../font/font.otf'

})

export const metadata: Metadata = {
  title: "NOTABLYAI",
  description: "AI note taking app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${localFont.className} antialiased`}
      >
        {/* <ThemeProvider
         attribute="class"
         defaultTheme="light"
         enableSystem
         disableTransitionOnChange
        > */}
        {children}
        <Toaster position="top-right" richColors />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
