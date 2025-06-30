import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "Stylish task manager built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 text-gray-900">
        <header className="bg-blue-700 text-white shadow-md">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-wide"> Task Manager</h1>
           
          </nav>
        </header>

        <main className="container mx-auto px-6 py-8 flex-grow">{children}</main>

        <footer className="bg-blue-700 text-white py-4 mt-auto text-center text-sm opacity-75">
          &copy; {new Date().getFullYear()} All rights reserved.
        </footer>
      </body>
    </html>
  );
}
