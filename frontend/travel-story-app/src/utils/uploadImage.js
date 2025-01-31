import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => { // ✅ Fixed function syntax
  const formData = new FormData();
  
  // Append image file to form data
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post("/image-upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set header for file upload
      },
    });

    return response.data; // ✅ Correct return statement
  } catch (error) {
    console.error("Error uploading the image:", error); // ✅ Fixed quote issue
    throw error; // Rethrow error for handling
  }
};

export default uploadImage;
