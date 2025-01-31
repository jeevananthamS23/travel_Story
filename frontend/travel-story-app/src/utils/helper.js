import { FaWordpressSimple } from "react-icons/fa";

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return regex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";
    
    // Split the name into words
    const words = name.trim().split(" ");
    
    // Get initials from first two words
    let initials = words.slice(0, 2).map(word => word[0]).join("");

    return initials.toUpperCase();
};
