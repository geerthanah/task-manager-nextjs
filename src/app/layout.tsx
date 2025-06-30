import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "Simple task manager with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
