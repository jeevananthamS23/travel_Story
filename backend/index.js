require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./utilities");
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB Atlas successfully');
})
.catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});
const app = express();
app.use(express.json());
app.use(cors({ origin: "https://travel-story-1-5vca.onrender.com" }));
const upload=require('./multer')
const path=require('path');
const fs=require('fs')



const User = require('./models/user.model');
const TravelStory = require('./models/travelStory.model');


// create a account 
app.post("/create-account", async (req, res) =>{
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
             return res.status(400).json({ error: true, message: "All fields are required" });
        }

    const isUser = await User.findOne({ email });

    if (isUser) {
              return res.status(400).json({ error: true, message: "User already exists" });
       }

      const hashedPassword= await bcrypt.hash(password,10);


      const user=new User({
        fullName,email,password:hashedPassword,
      });


      await user.save();

      const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"72H"});

      return res.status(201).json({error: false,user: { fullName: user.fullName, email: user.email },accessToken, message: "Registration Successful"});


    });


// login
app.post("/login",async (req,res)=>{
  const {email,password}=req.body;
  if(!email||!password)
  {
    return  res.status(400).json({message:"email and password are required"});
  }

  const user=await User.findOne({email});
  console.log(user);
  if(!user)
  {
    return res.status(400).json({message:"user not found"})
  }

  const ispassword=await bcrypt.compare(password,user.password);

  if (!ispassword)
  {
    return  res.status(400).json({message:"invaild credentials"});

  }

  const accessToken=jwt.sign({userId:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"72H"});
  return res.status(201).json({error: false,message:"Login successfuly",user: { fullName: user.fullName, email: user.email },accessToken});

 
})


// get user

app.get("/get-user",authenticateToken ,async (req,res)=>{
      const {userId}=req.user;
      const isUser=await User.findOne({_id:userId});

      if(!isUser){
        return res.sendStatus(401);
      }

      return res.json({user:isUser,message:"",});
});




// Add Travel Story

app.post("/add-travel-story", authenticateToken, async (req, res) => {
  try {
    let { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    // Validate required fields
    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    // Convert visitedDate to a Date object
    visitedDate = new Date(visitedDate);

    // Check if the conversion resulted in an invalid date
    if (isNaN(visitedDate.getTime())) {
      return res.status(400).json({ error: true, message: "Invalid date format" });
    }

    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate
    });

    await travelStory.save();
    res.status(201).json({ story: travelStory, message: "Added Successfully" });
  } catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});


// Add all Travel Story

app.get("/get-all-stories", authenticateToken, async (req, res) => {
  const {userId}=req.user;
  try{
    const travelStories=await TravelStory.find({userId:userId}).sort({isFavourite: -1});
    res.status(200).json({stories:travelStories});
  }
  
  catch(error)
  {
    res.status(500).json({error:true,message:error.message});

  }
 
});


// Route to handle image upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
       if (!req.file) {
      return res.status(400).json({ error: true, message: "No image uploaded" });
     }
  const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
           res.status(200).json({ imageUrl });
  } 
  catch (error) {
  res.status(500).json({ error: true, message: error.message});
}
});


app.delete("/delete-image", async (req, res) => {
  const { imageUrl } = req.query;
  if (!imageUrl) {
    return res.status(400).json({ error: true, message: "imageUrl parameter is required" });
  }

  try {
    // Extract the filename from the imageUrl
    const filename = path.basename(imageUrl);
    // Define the file path
    const filePath = path.join(__dirname, "uploads", filename);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Delete the file from the uploads folder
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: true, message: "Image not found" });
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ error: true, message: error.message });
  }
});


// Edit Travel Story
app.put("/edit-story/:id", authenticateToken, async (req, res) => {
       const {id} = req.params;
       const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
       const { userId } = req.user;
       // Validate required fields
      if (!title || !story || !visitedLocation || !visitedDate) {
       return res.status(400).json({ error: true, message: "All fields are required" });
  }
  // Convert visited Date from milliseconds to Date object
  // const parsedVisitedDate = new Date(parseInt(visitedDate));
  try {
  // Find the travel story by ID and ensure it belongs to the authenticated user
  const travelStory = await TravelStory.findOne({ _id: id, userId: userId });

  if (!travelStory) {
    return res.status(404).json({ error: true, message: "Travel story not found" });
    }
    const placeholderImgUrl = 'http://localhost:8000/assets/thankyou.jpg';
    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl || placeholderImgUrl;
    travelStory.visitedDate = visitedDate;
    await travelStory.save();
    res.status(200).json({ story: travelStory, message: 'Update Successful' });
    } catch (error) {
    res.status(500).json({ error: true, message: error.message });
    }
    });

// delete travel story
    app.delete("/delete-story/:id", authenticateToken, async (req, res) => {
      const { id } = req.params; // Extract story ID from URL
      const { userId } = req.user; // Extract user ID from authentication
    
      try {
        // Find the travel story
        const travelStory = await TravelStory.findOne({ _id: id, userId: userId });
    
        if (!travelStory) {
          return res.status(404).json({ error: true, message: "Travel story not found" });
        }
    
        // Delete the travel story from the database
        await travelStory.deleteOne(); // No need to pass {_id}
    
        // Extract the filename from the imageUrl
        const imageUrl = travelStory.imageUrl;
        if (imageUrl) {
          const filename = path.basename(imageUrl);
          const filePath = path.join(__dirname, "uploads", filename);
    
          // Delete the image file from the uploads folder
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Failed to delete image file:", err);
              // You can choose to send an error message here if necessary
            }
          });
        }
    
        res.status(200).json({ message: "Travel story deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: true, message: error.message });
      }
    });

//  updated isFavourite

app.put("/update-is-story/:id", authenticateToken, async (req, res) => {
  const {id} =req.params;
  const {isFavourite}=req.body;
  const {userId}=req.user;
  try{
    const travelStory=await TravelStory.findOne({_id:id,userId:userId});
    if (!travelStory) {
      return res.status(404).json({ error: true, message: "Travel story not found" });
    }

    travelStory.isFavourite=isFavourite;
    await travelStory.save();
    res.status(200).json({story:travelStory,message:'favorite updated successfully'});
  }

  catch (error) {
    res.status(500).json({ error: true, message: error.message });
  }
});



// search travel stories


app.get("/search", authenticateToken, async (req, res) => {
const {query}=req.query;
const {userId}=req.user;

if(!query)
{
  return res.status(404).json({error:true,message:"query is required"});

}

try{
  const searchResult=await TravelStory.find({userId:userId,$or:[{title:{$regex:query,$options:"i"}},
    {story:{$regex:query,$options:"i"}},
    {visitedLocation:{$regex:query,$options:"i"}}],}).sort({isFavourite:-1});

    res.status(200).json({stories:searchResult});
}
catch (error) {
  res.status(500).json({ error: true, message: error.message });
}
});

// Filter travel stories by date range 
app.get("/travel-stories/filter", authenticateToken, async (req, res) => { 
  try {
    const { startDate, endDate } = req.query; 
    const { userId } = req.user; 

    // Convert startDate and endDate from milliseconds to Date objects 
    const start = new Date(parseInt(startDate)); 
    const end = new Date(parseInt(endDate)); 

    // Find travel stories that belong to the authenticated user and fall within the date range 
    const filteredStories = await TravelStory.find({ 
      userId: userId, 
      visitedDate: { $gte: start, $lte: end }, 
    }).sort({ isFavourite: -1 });

    res.status(200).json({ stories: filteredStories });
  } catch (error) { 
    res.status(500).json({ error: true, message: error.message }); 
  } 
});




// server static files from the uploads and assests directory
//  app.use("/uploads",express.static(path.join(__dirname,"uploads")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));






















    app.listen(8000,()=>console.log(`the surver running on the port ${8000}`));   // simply give app.listen()  function to run but why use call back function because then only you knoe the port is running or not
module.exports = app;

