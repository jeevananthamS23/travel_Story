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


export const getEmptyCardMessage = (filterType) => {
    switch (filterType) {
      case "search":
        return "Oops! No stories found matching your search.";
      case "date":
        return "No stories found in the given date range.";
      default:
        return "Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!";
    }
  };
  