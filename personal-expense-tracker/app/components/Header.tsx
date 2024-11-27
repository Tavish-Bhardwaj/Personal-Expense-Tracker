// // components/Header.tsx

// "use client";

// import React from "react";
// import Link from "next/link";
// import ThemeToggleButton from "./themeToggleButton"; 
// import { Button } from "@/components/ui/button"; 
// import axios from 'axios';
// import { useRouter } from "next/navigation";

// const Header: React.FC = () => {
//     const router =  useRouter();
//   const handleLogout = async() => {


    
//         try {
            
//             await axios.post('/api/user/v1/logout', {}, { withCredentials: true });
            
//             router.push("/auth/login");
            
    
        
//             // Optionally, you can handle any additional client-side logic here
//         } catch (error) {
//             console.error("Logout failed:", error);
//             // Optionally, handle the error (e.g., show a message to the user)
//         }
    

//   };

//   return (
//     <header className="fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted z-50">
//       <div className="flex items-center space-x-4">
//         <Link href="/dashboard" className="text-foreground dark:text-primary-foreground hover:underline">
//           Dashboard
//         </Link>
//         <Link href="/expenses" className="text-foreground dark:text-primary-foreground hover:underline">
//           Expenses
//         </Link>
//         <Link href="/addCategory" className="text-foreground dark:text-primary-foreground hover:underline">
//           Categories
//         </Link>
//       </div>
//       <h1 className="text-2xl font-bold text-foreground dark:text-primary-foreground">
//         Personal Expense Tracker
//       </h1>
//       <div className="flex items-center space-x-4">
//         <ThemeToggleButton />
//         <Button 
//           onClick={handleLogout}
//           variant="destructive" // Assuming 'destructive' is the variant for a red button in shadcn
//         >
//           Log Out
//         </Button>
//       </div>
//     </header>
//   );
// };

// export default Header;


"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ThemeToggleButton from "./themeToggleButton"; // Adjust the import path as needed
import { Button } from "@/components/ui/button"; // Adjust the import path based on your shadcn button setup
import axios from 'axios';
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
    const router = useRouter();
    const [isFixed, setIsFixed] = useState(false);

    const handleLogout = async () => {
        try {
            // Call the logout API route using axios
            await axios.post('/api/user/v1/logout', {}, { withCredentials: true });
            router.push("/auth/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleScroll = () => {
        // Check if the page has been scrolled past the header
        if (window.scrollY > 0) {
            setIsFixed(true);
        } else {
            setIsFixed(false);
        }
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`flex justify-between items-center py-4 px-6 bg-card dark:bg-card-foreground shadow-lg border-b border-border dark:border-muted transition-all duration-300 ${isFixed ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
            <div className={`flex items-center space-x-4 ${isFixed ? 'mt-0' : 'mt-4'}`}>
                <Link href="/dashboard" className="relative text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                    Dashboard
                </Link>
                <Link href="/expenses" className="relative text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                    Expenses
                </Link>
                <Link href="/addCategory" className="relative text-foreground dark:text-primary-foreground hover:shadow-lg transition-shadow duration-300 p-2 rounded">
                    Categories
                </Link>
            </div>
            <h1 className="text-2xl font-bold text-foreground dark:text-primary-foreground">
                Personal Expense Tracker
            </h1>
            <div className="flex items-center space-x-4">
                <ThemeToggleButton />
                <Button 
                    onClick={handleLogout}
                    variant="destructive" // Assuming 'destructive' is the variant for a red button in shadcn
                >
                    Log Out
                </Button>
            </div>
        </header>
    );
};

export default Header;