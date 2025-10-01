import React, { useEffect, useRef, useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./ImageSelector.css"; 

const ImageSelector = ({ image, setImage, handleDeleteImg }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const handleRemoveImage = () => {
    setImage(null);
    if (handleDeleteImg) {
      handleDeleteImg();
    }
  };

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
    <div className="image-selector">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
      />

      {!image ? (
        <button className="upload-btn" onClick={onChooseFile}>
          <div className="icon-wrapper">
            <FaRegFileImage className="icon" />
          </div>
          <p>Browse image files to upload</p>
        </button>
      ) : (
        <div className="preview-container">
          <img src={previewUrl} alt="Selected" />
          <button className="delete-btn" onClick={handleRemoveImage}>
            <MdDeleteOutline className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
