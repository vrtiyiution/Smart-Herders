// app/layout.js
import "./globals.css";
import Navbar from "./components/navbar";
import ThemeToggle from "./components/ThemeToggle";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-900 text-white">
        <AuthProvider>
          <header className="fixed inset-x-0 top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
            <Navbar />
          </header>

          {/* ЯГ 80px / 96px – илүү зай огт гарахгүй */}
          <main className="pt-[80px] lg:pt-[96px]">
            {children}
          </main>

          <div className="fixed bottom-6 right-6 z-50">
            <ThemeToggle />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}