import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/input/Navbar";
import axiosInstance from "../../utils/axiosinstance";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import Logo from "/src/assets/images/Logo.jpg";
import { getEmptyCardMessage } from "../../utils/helper";
import moment from "moment";
import ViewTravelStory from "./ViewTravelStory";
import FilterInfoTitle from "../../components/Cards/FilterInfoTitle";
import EmptyCard from "../../components/Cards/EmptyCard";
import AddEditTravelStory from "./AddEditTravelStory";
import TravelStoryCard from "../../components/Cards/TravelStoryCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DayPicker } from "react-day-picker";

// Set the app element for accessibility
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("");
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [openViewModal, setOpenViewModal] = useState({
    isShow: false,
    data: null,
  });

  // Fetch user info
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

  // Fetch all travel stories
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

  // Update favourite status
  const updateIsFavourite = async (storyData) => {
    const storyId = storyData._id;
    try {
      const response = await axiosInstance.put(`/update-is-story/${storyId}`, {
        isFavourite: !storyData.isFavourite,
      });

      if (response.data && response.data.story) {
        toast.success("Story Updated Successfully");

        if (filterType === "search" && searchQuery) {
          onSearchStory(searchQuery);
        } else if (filterType === "date") {
          filterStoriesByDate(dateRange);
        } else {
          getAllTravelStories();
        }
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const handleEdit = (data) => {
    setOpenAddEditModal({ isShow: true, type: "edit", data: data });
  };

  const handleViewStory = (data) => {
    setOpenViewModal({ isShow: true, data });
  };

  const deleteTravelStory = async (data) => {
    if (!data || !data._id) return;
    try {
      const response = await axiosInstance.delete(`/delete-story/${data._id}`);
      if (response.data && !response.data.error) {
        toast.success("Story Deleted Successfully");
        setOpenViewModal((prev) => ({ ...prev, isShow: false }));
        getAllTravelStories();
      }
    } catch (error) {
      console.error("An unexpected error occurred. Please try again.");
    }
  };

  const onSearchStory = async (query) => {
    try {
      const response = await axiosInstance.get("/search", { params: { query } });
      if (response.data && response.data.stories) {
        setFilterType("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleClearSearch = () => {
    setFilterType("");
    getAllTravelStories();
  };

  // Filter stories by date
  const filterStoriesByDate = async (day) => {
    try {
      const startDate = day.from ? moment(day.from).valueOf() : null;
      const endDate = day.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/travel-stories/filter", {
          params: { startDate, endDate },
        });

        if (response.data && response.data.stories) {
          setFilterType("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (error) {
      console.error("Error filtering travel stories:", error);
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  const resetFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterType("");
    getAllTravelStories();
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchStory={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Filter Info */}
        <FilterInfoTitle
          filterType={filterType}
          filterDates={dateRange}
          onClear={resetFilter}
        />

        <div className="flex flex-col lg:flex-row gap-7 mt-6">
          {/* Main Content */}
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
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
              <div className="flex justify-center">
                <EmptyCard
                  img={Logo}
                  message={getEmptyCardMessage(filterType)}
                />
              </div>
            )}
          </div>

          {/* Calendar Sidebar */}
          <div className="w-full lg:w-[360px]">
            <div className="bg-white border border-slate-200 shadow-lg shadow-slate-200/70 rounded-lg p-4">
              <DayPicker
                captionLayout="dropdown-buttons"
                mode="range"
                selected={dateRange}
                onSelect={handleDayClick}
                pagedNavigation
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Story Modal */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() =>
          setOpenAddEditModal({ isShow: false, type: "add", data: null })
        }
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        className="model-box"
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

      {/* View Story Modal */}
      <Modal
        isOpen={openViewModal.isShow}
        onRequestClose={() =>
          setOpenViewModal((prev) => ({ ...prev, isShow: false }))
        }
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
            zIndex: 999,
          },
        }}
        className="model-box"
      >
        <ViewTravelStory
          storyInfo={openViewModal.data || null}
          onClose={() =>
            setOpenViewModal((prev) => ({ ...prev, isShow: false }))
          }
          onEditClick={() => {
            setOpenViewModal((prev) => ({ ...prev, isShow: false }));
            handleEdit(openViewModal.data || null);
          }}
          onDeleteClick={() => deleteTravelStory(openViewModal.data)}
        />
      </Modal>

      {/* Floating Add Button */}
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-primary hover:bg-cyan-400 fixed right-5 bottom-5 sm:right-10 sm:bottom-10 shadow-lg transition-transform transform hover:scale-110"
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-2xl sm:text-3xl text-white" />
      </button>

      <ToastContainer />
    </div>
  );
};

export default Home;
