import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  /** Handle file selection */
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  /** Trigger hidden input */
  const onChooseFile = () => {
    inputRef.current.click();
  };

  /** Remove image */
  const handleRemoveImage = () => {
    setImage(null);
    if (handleDeleteImg) {
      handleDeleteImg(); // Optional delete logic
    }
  };

  /** Manage preview URL */
  useEffect(() => {
    if (typeof image === "string") {
      setPreviewUrl(image);
    } else if (image) {
      setPreviewUrl(URL.createObjectURL(image));
    } else {
      setPreviewUrl(null);
    }

    return () => {
      if (previewUrl && typeof previewUrl === "string" && !image) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [image]);

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Upload Section */}
      {!image ? (
        <button
          className="w-full h-[200px] sm:h-[220px] md:h-[250px] 
                     flex flex-col items-center justify-center gap-4
                     bg-slate-50 rounded-lg border border-slate-200/50
                     hover:bg-slate-100 transition duration-200"
          onClick={onChooseFile}
        >
          <div className="w-14 h-14 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-2xl sm:text-xl text-cyan-500" />
          </div>
          <p className="text-sm sm:text-base text-slate-500 text-center px-4">
            Browse image files to upload
          </p>
        </button>
      ) : (
        <div className="w-full relative">
          {/* Preview Image */}
          <img
            src={previewUrl}
            alt="Selected"
            className="w-full h-[250px] sm:h-[300px] object-cover rounded-lg shadow-md"
          />

          {/* Delete Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-red-100 hover:bg-red-200
                       rounded-full shadow-md transition duration-200"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline className="text-lg text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
