
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./themeToggleButton";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";

const Header: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFixed, setIsFixed] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const headerHeight = 64; // Height of the header (e.g., 16 * 4px)

  // Check if the content is scrollable
  const checkScrollable = () => {
    const scrollable =
      document.documentElement.scrollHeight > window.innerHeight;
    setIsScrollable(scrollable);
  };


  const handleLogout = async () => {
    router.push('/auth/login'); 
    try {
      const response = await axios.post("api/user/v1/logout", {}, { withCredentials: true });
      console.log("Logout response:", response);
      // Redirect after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  // Handle Scroll
  const handleScroll = () => {
    if (isOpen) setIsOpen(false); // Close the menu on scroll
    const shouldFix = window.scrollY > 0;
    if (isFixed !== shouldFix) setIsFixed(shouldFix);
  };

  useEffect(() => {
    checkScrollable(); // Check on initial load
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkScrollable); // Recheck on resize

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [isOpen, isFixed]);

  // Hide Hamburger on certain routes
  const hideHamburger = ["/auth/login", "/auth/register", "/"].includes(pathname);

  // Function to handle link click in mobile menu
  const handleLinkClick = () => {
    setIsOpen(false); // Close the mobile menu
  };

  return (
    <>
      <header
        className={`flex flex-row items-center h-16 py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted transition-all duration-300 ${
          isFixed ? "fixed top-0 left-0 right-0 z-50" : ""
        }`}
        style={{
          position: isScrollable ? "fixed" : "relative",
        }}
      >
        <div className="flex items-center justify-between w-full">
          {/* Left Section: Hamburger Menu or Desktop Links */}
          <div className="flex items-center space-x-6">
            {!hideHamburger && (
              <button
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle Menu"
              >
                {isOpen ? (
                  <FaTimes size={24} className="text-foreground dark:text-white" />
                ) : (
                  <FaBars size={24} className="text-foreground dark:text-white" />
                )}
              </button>
            )}
            {/* Desktop Nav Links */}
            <nav className="hidden md:flex space-x-6">
              {pathname !== "/auth/login" &&
                pathname !== "/auth/register" &&
                pathname !== "/" && (
                  <>
                    <Link
                      href="/dashboard"
                      className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/expenses"
                      className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                    >
                      Expenses
                    </Link>
                    <Link
                      href="/addCategory"
                      className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/profile"
                      className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                    >
                      Profile
                    </Link>
                  </>
                )}
            </nav>
          </div>

          {/* Center Section: Title */}
          <h1 className="text-xl md:text-2xl font-bold text-foreground dark:text-primary-foreground flex-grow text-center">
            Personal Expense Tracker
          </h1>

          {/* Right Section: Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggleButton />
            {pathname === "/auth/login" ? (
              <Link href="/auth/register">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
                >
                  Sign Up
                </Button>
              </Link>
            ) : pathname === "/auth/register" ? (
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white transition duration-200"
                >
                  Log In
                </Button>
              </Link>
            ) : pathname !== "/" && (
              <Button onClick={handleLogout} variant="destructive">
                Log Out
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && !hideHamburger && (
          <nav
            className="absolute md:hidden z-50 top-16 left-0 right-0 bg-card dark:bg-card-foreground p-4 transition-all duration-300"
          >
            {pathname !== "/auth/login" &&
              pathname !== "/auth/register" &&
              pathname !== "/" && (
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/dashboard"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/expenses"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                  >
                    Expenses
                  </Link>
                  <Link
                    href="/addCategory"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/profile"
                    onClick={handleLinkClick}
                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition"
                  >
                    Profile
                  </Link>
                </div>
              )}
          </nav>
        )}
      </header>

      {/* Spacer for header */}
      {isScrollable && <div style={{ height: `${headerHeight}px` }} />}
    </>
  );
};

export default Header;
