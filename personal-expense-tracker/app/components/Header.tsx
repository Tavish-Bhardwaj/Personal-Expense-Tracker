
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
    const [isOpen, setIsOpen] = useState(false);

    // Handle Logout
    const handleLogout = async () => {
        try {
            await axios.post('/api/user/v1/logout', {}, { withCredentials: true });
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    // Handle Scroll
    const handleScroll = () => {
        if (isOpen) setIsOpen(false); // Close the menu on scroll
        setIsFixed(window.scrollY > 0); // Set fixed position based on scroll
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    // Hide Hamburger on certain routes
    const hideHamburger = ["/auth/login", "/auth/register", "/"].includes(pathname);

    return (
        <header
            className={`flex flex-row items-center py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted transition-all duration-300 ${isFixed ? "fixed top-0 left-0 right-0 z-50" : ""}`}
        >
            {/* Parent div for all header elements */}
            <div className="flex items-center justify-between w-full">
                {/* Left Section: Nav Links (hidden on mobile, visible on desktop) */}
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
                    <nav className="hidden md:flex space-x-6 w-full md:w-auto">
                        {pathname !== "/auth/login" && pathname !== "/auth/register" && pathname !== "/" && (
                            <>
                                <Link href="/dashboard" className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition">
                                    Dashboard
                                </Link>
                                <Link href="/expenses" className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition">
                                    Expenses
                                </Link>
                                <Link href="/addCategory" className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition">
                                    Categories
                                </Link>
                                <Link href="/profile" className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition">
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

                {/* Right Section: Buttons (Theme Toggle and Logout) */}
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

            {/* Mobile Navigation Menu (Pop-down Menu) */}
            <div className={`md:hidden ${isOpen ? "z-50" : "z-0"} transition-all duration-300`}>
                {isOpen && !hideHamburger && (
                    <nav className="flex flex-col w-full mt-2 space-y-4 bg-card dark:bg-card-foreground fixed top-16 left-0 right-0 p-4">
                        {pathname !== "/auth/login" && pathname !== "/auth/register" && pathname !== "/" && (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition nav-link"
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href="/expenses"
                                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition nav-link"
                                >
                                    Expenses
                                </Link>
                                <Link
                                    href="/addCategory"
                                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition nav-link"
                                >
                                    Categories
                                </Link>
                                <Link
                                    href="/profile"
                                    className="text-lg font-medium text-foreground dark:text-primary-foreground hover:text-primary transition nav-link"
                                >
                                    Profile
                                </Link>
                            </>
                        )}
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
