import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeToggleButton from './components/themeToggleButton';


export const metadata: Metadata = {
  title: "Personal Expense Tracker",
  description: "Track all of your expenses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <header className="flex justify-between items-center p-4 bg-gray-100">
              <h1 className="text-xl font-bold text-primary">Personal Expense Tracker</h1>
              <ThemeToggleButton />
            </header>
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}