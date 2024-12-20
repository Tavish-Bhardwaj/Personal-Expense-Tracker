import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ThemeToggleButton from './components/themeToggleButton';
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Personal Expense Tracker",
  description: "Track all of your expenses",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Import the Google Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Sour+Gummy:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {/* Header
            <header className="flex justify-between items-center py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted">
              <h1 className="text-2xl font-bold text-foreground dark:text-primary-foreground">
                Personal Expense Tracker
              </h1>
              <ThemeToggleButton />
            </header> */}

            <Header/>
            {/* Main content */}
            <main>{children}</main>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
