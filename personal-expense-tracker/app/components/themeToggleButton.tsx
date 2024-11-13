"use client"

import {useTheme} from '../contexts/ThemeContext';
import { Button } from "@/components/ui/button"

const ThemeToggleButton = () =>{
    const {theme, toggleTheme} = useTheme();

    return(
        <Button onClick= {toggleTheme} className= "p-2 rounded">
            {theme === "light"? '🌙 Dark Mode' : '☀️ Light Mode'}
        </Button>
    )
}
export default ThemeToggleButton;
