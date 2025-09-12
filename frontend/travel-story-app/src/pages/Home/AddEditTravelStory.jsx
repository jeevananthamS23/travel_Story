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

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.visitedDate || "");
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || "");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation || []);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [error, setError] = useState("");

  /** ------------------------------
   *  Update Travel Story
   * ------------------------------ */
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

  /** ------------------------------
   *  Add New Travel Story
   * ------------------------------ */
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

  /** ------------------------------
   *  Validate and Submit
   * ------------------------------ */
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

  /** ------------------------------
   *  Delete Image
   * ------------------------------ */
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
    <div className="relative p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h5 className="text-xl sm:text-2xl font-semibold text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>

        <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg w-full sm:w-auto">
          {type === "add" ? (
            <button
              className="btn-small flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={handleAddOrUpdateClick}
            >
              <MdAdd className="text-lg" /> ADD STORY
            </button>
          ) : (
            <button
              className="btn-small flex items-center justify-center gap-2 w-full sm:w-auto"
              onClick={handleAddOrUpdateClick}
            >
              <MdUpdate className="text-lg" /> UPDATE STORY
            </button>
          )}

          <button onClick={onClose} className="ml-2">
            <MdClose className="text-xl text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm mt-2 text-right">{error}</p>}

      {/* Form Section */}
      <div className="mt-5 flex flex-col gap-4">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="input-label text-sm sm:text-base">Title</label>
          <input
            type="text"
            className="text-lg sm:text-xl text-slate-950 outline-none p-2 border border-gray-300 rounded-md w-full"
            placeholder="A day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Date Selector */}
        <div className="my-3">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        {/* Image Selector */}
        <div className="w-full">
          <ImageSelector
            image={storyImg}
            setImage={setStoryImg}
            handleDeleteImg={handleDeleteStoryImg}
          />
        </div>

        {/* Story */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="input-label text-sm sm:text-base">Story</label>
          <textarea
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded border border-gray-300 w-full resize-none"
            placeholder="Your Story"
            rows={8}
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />
        </div>

        {/* Visited Location */}
        <div className="pt-3">
          <label className="input-label text-sm sm:text-base">Visited Location</label>
          <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
