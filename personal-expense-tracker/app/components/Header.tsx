

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./themeToggleButton"; 
import { Button } from "@/components/ui/button"; 
import axios from 'axios';
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation"; 
import { FaBars, FaTimes } from "react-icons/fa"; 

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname(); 
    const [isFixed, setIsFixed] = useState(false);
    const [isOpen, setIsOpen] = useState(false); 

    const handleLogout = async () => {
        try {
            await axios.post('/api/user/v1/logout', {}, { withCredentials: true });
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleScroll = () => {
        if (window.scrollY > 0) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`flex flex-col md:flex-row justify-between items-center py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted transition-all duration-300 ${isFixed ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
            <div className="flex items-center justify-between w-full">
                {/* Hamburger Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? (
                        <FaTimes size={24} className="text-white" />
                    ) : (
                        <FaBars size={24} className="text-white" />
                    )}
                </button>

                {/* Title */}
                <h1 className="text-2xl font-bold text-foreground dark:text-primary-foreground text-center flex-grow">
                    Personal Expense Tracker
                </h1>

                {/* Theme Toggle Button and Action Button */}
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
                    ) : pathname === "/" ? null : (
                        <Button 
                            onClick={handleLogout}
                            variant="destructive" 
                        >
                            Log Out
                        </Button>
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden bg-card dark:bg-card-foreground p-4 space-y-2 w-full">
                    {pathname !== "/" && pathname !== "/auth/login" && pathname !== "/auth/register" && (
                        <>
                            <Link href="/dashboard" className="block text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                                Dashboard
                            </Link>
                            <Link href="/expenses" className="block text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                                Expenses
                            </Link>
                            <Link href="/addCategory" className="block text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                                Categories
                            </Link>
                            <Link href="/profile" className="block text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                                Profile
                            </Link>
                        </>
                    )}
                </nav>
            )}
        </header>
    );
};

export default Header;