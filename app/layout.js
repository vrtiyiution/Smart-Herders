// app/layout.js
import "./globals.css";
import Navbar from "./components/navbar";
import ThemeToggle from "./components/ThemeToggle";
import { AuthProvider } from "./context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <ThemeToggle />
        </AuthProvider>
      </body>
    </html>
  );
}