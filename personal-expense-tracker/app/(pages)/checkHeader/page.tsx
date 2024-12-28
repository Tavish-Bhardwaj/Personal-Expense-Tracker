"use client";

import React from "react";
import Header from "@/app/components/Header"; // Assuming your Header component is in components folder

const CheckHeaderPage: React.FC = () => {
    return (
        <div>
          
            <main className="p-6">
                <h2 className="text-xl font-bold">Check Header Functionality</h2>
                <p className="mt-4">Scroll the page, click the hamburger menu, and check the header behavior.</p>
                <div className="h-[1500px] mt-4">
                    {/* Content to simulate scroll */}
                    <p className="mb-4">
                        This is just some content to make the page scrollable. Scroll down to test the sticky header.
                    </p>
                    <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <p className="mb-4">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </main>
        </div>
    );
};

export default CheckHeaderPage;
