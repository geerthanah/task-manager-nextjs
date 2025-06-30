import "./globals.css";
import { ReactNode } from "react";
import DarkModeToggle from "./DarkModeToggle";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-500 min-h-screen">
        {/* Dark mode toggle button */}
        <DarkModeToggle />

        {/* Page content */}
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
