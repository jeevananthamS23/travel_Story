import React, { useState } from "react";
import uploadImage from "../../utils/uploadImage";
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import DateSelector from "../../components/input/DateSelector";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../utils/axiosinstance";
import moment from "moment";
import "./AddEditTravelStory.css"; 

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || "");
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [error, setError] = useState("");

  const updateTravelStory = async () => {
    try {
      let postData = {
        title,
        story,
        imageUrl: storyInfo.imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      };

      const storyId = storyInfo._id;

      if (typeof storyImg === "object") {
        const imageuploads = await uploadImage(storyImg);
        postData = { ...postData, imageUrl: imageuploads.imageUrl || "" };
      }

      const response = await axiosInstance.put("/edit-story/" + storyId, postData);

      if (response.data && response.data.story) {
        toast.success("Story updated successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.error("Update Error:", error);
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post("/add-travel-story", {
        title,
        story,
        imageUrl: imageUrl || "",
        visitedLocation,
        visitedDate: visitedDate ? moment(visitedDate).valueOf() : moment().valueOf(),
      });

      if (response.data && response.data.story) {
        toast.success("Story added successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleAddOrUpdateClick = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!story) {
      setError("Please enter the story");
      return;
    }

    setError("");
    if (type === "edit") {
      updateTravelStory();
    } else {
      addNewTravelStory();
    }
  };

  const handleDeleteStoryImg = async () => {
    try {
      const deleteImgRes = await axiosInstance.delete("/delete-image", {
        params: { imageUrl: storyInfo.imageUrl },
      });

      if (deleteImgRes.data) {
        const storyId = storyInfo._id;
        const postData = {
          title,
          story,
          visitedLocation,
          visitedDate: moment().valueOf(),
          imageUrl: "",
        };

        const response = await axiosInstance.put("/edit-story/" + storyId, postData);

        if (response.data && response.data.story) {
          setStoryImg(null);
          toast.success("Image deleted successfully");
        }
      }
    } catch (error) {
      console.error("Error deleting story image:", error);
      setError(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="story-page">
      {/* Header */}
      <div className="story-header">
        <h5 className="story-title">{type === "add" ? "Add Story" : "Update Story"}</h5>
        <div className="story-actions">
          <button className="btn-small" onClick={handleAddOrUpdateClick}>
            {type === "add" ? <><MdAdd /> ADD STORY</> : <><MdUpdate /> UPDATE STORY</>}
          </button>
          <button onClick={onClose} className="close-btn">
            <MdClose />
          </button>
        </div>
      </div>

      {/* Error */}
      {error && <p className="error-text">{error}</p>}

      {/* Form */}
      <div className="story-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="input-box"
            placeholder="A day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        <div className="form-group">
          <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg} />
        </div>

        <div className="form-group">
          <label>Story</label>
          <textarea
            className="textarea-box"
            placeholder="Your Story"
            rows={8}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Visited Location</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
