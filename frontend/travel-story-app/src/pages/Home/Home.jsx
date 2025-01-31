import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/input/Navbar";
import axiosInstance from "../../utils/axiosinstance";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import ViewTravelStory from "./ViewTravelStory";

import AddEditTravelStory from "./AddEditTravelStory";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Set the app element for accessibility (fix for screen readers)
Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });


  const [openViewModal, setOpenViewModal] = useState({
    isShow: false,
    data: null,
  });











  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  // Get all travel stories
  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-stories");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Update the favorite story
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(`/update-is-story/${storyId}`, {
        isFavourite: !storyData.isFavourite,
      });

      if (response.data && response.data.story) {
        toast.success("Story updated successfully");
        getAllTravelStories();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Handle Edit Story
  const handleEdit = (story) => {
    setOpenAddEditModal({ isShow: true, type: "edit", data: story });
  };

  // Handle Viewing Story
  const handleViewStory = (data) => {
    setOpenViewModal({isShow:true,data});
   
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
    <div>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto py-10">
        <div className="flex gap-7">
          <div className="flex-1"></div>

          {allStories.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {allStories.map((item) => (
                <TravelStoryCard
                  key={item._id}
                  imgUrl={item.imageUrl}
                  title={item.title}
                  story={item.story}
                  visitedDate={item.visitedDate}
                  visitedLocation={item.visitedLocation}
                  isFavourite={item.isFavourite}
                 
                  onClick={() => handleViewStory(item)}
                  onFavouriteClick={() => updateIsFavourite(item)}
                />
              ))}
            </div>
          ) : (
            <>Empty Card here</>
          )}

          <div className="w-[320px]"></div>
        </div>
      </div>

      {/* add and edit travel story Modal */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", data: null })
        }
        shouldCloseOnOverlayClick={true} // ✅ Ensures clicking outside closes the modal
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        className="model-box" // ✅ Applied "model-box" class here
      >
        <AddEditTravelStory
          type={openAddEditModal.type}
          storyInfo={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>
 {/* view travel story Modal */}

  <Modal
  isOpen={openViewModal.isShow} // Corrected typo from is0pen to isOpen
  onRequestClose={() => {}} // Make sure this performs the desired behavior
  style={{
    overlay: {
      backgroundColor: "rgba(0,0,0,0.2)",
      zIndex: 999,
    },
  }}
  appElement={document.getElementById("root")} // Corrected appElement syntax
  className="model-box" // Ensured className is properly written
>
<ViewTravelStory 
storyInfo={openViewModal.data||null} 
onClose={()=>{setOpenViewModal({isShow:true,type:"add",data})}}   
onEditClick={()=>{}}   
onDeleteClick={()=>{}}/>
</Modal>


      {/* Floating Add Button */}
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShow: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <ToastContainer />
    </div>
  );
};

export default Home;
