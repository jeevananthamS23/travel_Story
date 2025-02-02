import React, { useState } from "react";
import uploadImage from "../../utils/uploadImage"; // Adjust the path as needed
import ImageSelector from "../../components/input/ImageSelector";
import TagInput from "../../components/input/TagInput";
import DateSelector from "../../components/input/DateSelector";
import { MdAdd, MdDeleteOutline, MdUpdate, MdClose } from "react-icons/md";
import { toast } from "react-toastify"; // Ensure toast is imported
import "react-toastify/dist/ReactToastify.css"; // Necessary for toast styles
import axiosInstance from "../../utils/axiosinstance"; // Ensure axiosInstance is correctly imported
import moment from "moment"; // Ensure moment is imported

const AddEditTravelStory = ({ storyInfo, type, onClose, getAllTravelStories }) => {
  const [visitedDate, setVisitedDate] = useState(storyInfo?.
    visitedDate||"");
  const [title, setTitle] = useState(storyInfo?.title||"");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl||"");
  const [visitedLocation, setVisitedLocation] = useState(storyInfo?.visitedLocation||[]);
  const [story, setStory] = useState(storyInfo?.story||"");
  const [error, setError] = useState(""); // State for error messages

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
        console.log("Uploaded Image URL:", imageuploads.imageUrl); // Log the URL
        postData = { ...postData, imageUrl: imageuploads.imageUrl || "" };
      }
  
      console.log("Post Data:", postData); // Log the payload being sent
  
      const response = await axiosInstance.put("/edit-story/" + storyId, postData);
  
      if (response.data && response.data.story) {
        toast.success("Story updated successfully");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.error("Update Error:", error); // Log the full error
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  // Function to add a new travel story
  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      // Upload image if present
      if (storyImg) {
        const imgUploadRes = await uploadImage(storyImg); // Ensure uploadImage is imported
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
        getAllTravelStories(); // Ensure getAllTravelStories is passed properly
        onClose();
      }
    } catch (error) {
     if(error.response && error.response.data && error.response.data.message)
     {
      setError(error.response.data.message)
     }
     else{
      setError("An unexpected error occured. please try again.");
     }
    }
  };

  const handleAddOrUpdateClick = () => {
    console.log("Input Data:", { title, storyImg, story, visitedLocation, visitedDate });

    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!story) {
      setError("Please enter the story");
      return;
    }

    setError(""); // Clear error if everything is valid

    if (type === "edit") {
      updateTravelStory(); // Ensure this function exists
    } else {
      addNewTravelStory(); // Ensure this function exists
    }
  };

  const handleDeleteStoryImg = async () => {
    try {
      // Deleting the Image
      const deleteImgRes = await axiosInstance.delete("/delete-image", {
        params: {
          imageUrl: storyInfo.imageUrl,
        },
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
  
        // Updating story
        const response = await axiosInstance.put(
          "/edit-story/" + storyId,
          postData
        );
  
        if (response.data && response.data.story) {
          setStoryImg(null);
          toast.success("Image deleted successfully");
        }
      }
    } catch (error) {
      console.error("Error deleting story image:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };


  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-medium text-slate-700">
          {type === "add" ? "Add Story" : "Update Story"}
        </h5>
        <div>
          <div className="flex items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
            {type === "add" ? (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdAdd className="text-lg" /> ADD STORY
              </button>
            ) : (
              <button className="btn-small" onClick={handleAddOrUpdateClick}>
                <MdUpdate className="text-lg" /> UPDATE STORY
              </button>
            )}

            <button onClick={onClose}>
              <MdClose className="text-xl text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {error && <p className="text-red-500 text-right">{error}</p>} {/* Display error message */}

      <div>
        <div className="flex-1 flex flex-col gap-2 pt-4">
          <label className="input-label">Title</label>
          <input
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="A day at the Great Wall"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // Event handler
          />

          <div className="my-3">
            <DateSelector date={visitedDate} setDate={setVisitedDate} />
          </div>

          <ImageSelector image={storyImg} setImage={setStoryImg} handleDeleteImg={handleDeleteStoryImg} />

          <div className="flex flex-col gap-2 mt-4">
            <label className="input-label">Story</label>
            <textarea
              className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
              placeholder="Your Story"
              rows={10}
              value={story}
              onChange={(e) => setStory(e.target.value)} // Event handler
            />
          </div>

          <div className="pt-3">
            <label className="input-label">Visited Location</label>
            <TagInput tags={visitedLocation} setTags={setVisitedLocation} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
