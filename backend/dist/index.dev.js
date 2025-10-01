"use strict";

require("dotenv").config();

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

var express = require("express");

var cors = require("cors");

var jwt = require("jsonwebtoken");

var _require = require("./utilities"),
    authenticateToken = _require.authenticateToken;

mongoose.connect(process.env.MONGO_URI).then(function () {
  console.log('Connected to MongoDB Atlas successfully');
})["catch"](function (error) {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});
var app = express();
app.use(express.json());
app.use(cors({
  origin: "https://travel-story-1-5vca.onrender.com"
}));

var upload = require('./multer');

var path = require('path');

var fs = require('fs');

var User = require('./models/user.model');

var TravelStory = require('./models/travelStory.model'); // create a account 


app.post("/create-account", function _callee(req, res) {
  var _req$body, fullName, email, password, isUser, hashedPassword, user, accessToken;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, fullName = _req$body.fullName, email = _req$body.email, password = _req$body.password;

          if (!(!fullName || !email || !password)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: true,
            message: "All fields are required"
          }));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          isUser = _context.sent;

          if (!isUser) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: true,
            message: "User already exists"
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 10:
          hashedPassword = _context.sent;
          user = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
          });
          _context.next = 14;
          return regeneratorRuntime.awrap(user.save());

        case 14:
          accessToken = jwt.sign({
            userId: user._id
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "72H"
          });
          return _context.abrupt("return", res.status(201).json({
            error: false,
            user: {
              fullName: user.fullName,
              email: user.email
            },
            accessToken: accessToken,
            message: "Registration Successful"
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  });
}); // login

app.post("/login", function _callee2(req, res) {
  var _req$body2, email, password, user, ispassword, accessToken;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "email and password are required"
          }));

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context2.sent;
          console.log(user);

          if (user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "user not found"
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          ispassword = _context2.sent;

          if (ispassword) {
            _context2.next = 14;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "invaild credentials"
          }));

        case 14:
          accessToken = jwt.sign({
            userId: user._id
          }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "72H"
          });
          return _context2.abrupt("return", res.status(201).json({
            error: false,
            message: "Login successfuly",
            user: {
              fullName: user.fullName,
              email: user.email
            },
            accessToken: accessToken
          }));

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // get user

app.get("/get-user", authenticateToken, function _callee3(req, res) {
  var userId, isUser;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = req.user.userId;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.findOne({
            _id: userId
          }));

        case 3:
          isUser = _context3.sent;

          if (isUser) {
            _context3.next = 6;
            break;
          }

          return _context3.abrupt("return", res.sendStatus(401));

        case 6:
          return _context3.abrupt("return", res.json({
            user: isUser,
            message: ""
          }));

        case 7:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Add Travel Story

app.post("/add-travel-story", authenticateToken, function _callee4(req, res) {
  var _req$body3, title, story, visitedLocation, imageUrl, visitedDate, userId, travelStory;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body3 = req.body, title = _req$body3.title, story = _req$body3.story, visitedLocation = _req$body3.visitedLocation, imageUrl = _req$body3.imageUrl, visitedDate = _req$body3.visitedDate;
          userId = req.user.userId; // Validate required fields

          if (!(!title || !story || !visitedLocation || !imageUrl || !visitedDate)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: true,
            message: "All fields are required"
          }));

        case 5:
          // Convert visitedDate to a Date object
          visitedDate = new Date(visitedDate); // Check if the conversion resulted in an invalid date

          if (!isNaN(visitedDate.getTime())) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            error: true,
            message: "Invalid date format"
          }));

        case 8:
          travelStory = new TravelStory({
            title: title,
            story: story,
            visitedLocation: visitedLocation,
            userId: userId,
            imageUrl: imageUrl,
            visitedDate: visitedDate
          });
          _context4.next = 11;
          return regeneratorRuntime.awrap(travelStory.save());

        case 11:
          res.status(201).json({
            story: travelStory,
            message: "Added Successfully"
          });
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: true,
            message: _context4.t0.message
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 14]]);
}); // Add all Travel Story

app.get("/get-all-stories", authenticateToken, function _callee5(req, res) {
  var userId, travelStories;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          userId = req.user.userId;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(TravelStory.find({
            userId: userId
          }).sort({
            isFavourite: -1
          }));

        case 4:
          travelStories = _context5.sent;
          res.status(200).json({
            stories: travelStories
          });
          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t0 = _context5["catch"](1);
          res.status(500).json({
            error: true,
            message: _context5.t0.message
          });

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 8]]);
}); // Route to handle image upload

app.post("/image-upload", upload.single("image"), function _callee6(req, res) {
  var imageUrl;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;

          if (req.file) {
            _context6.next = 3;
            break;
          }

          return _context6.abrupt("return", res.status(400).json({
            error: true,
            message: "No image uploaded"
          }));

        case 3:
          imageUrl = "http://localhost:8000/uploads/".concat(req.file.filename);
          res.status(200).json({
            imageUrl: imageUrl
          });
          _context6.next = 10;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: true,
            message: _context6.t0.message
          });

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 7]]);
});
app["delete"]("/delete-image", function _callee7(req, res) {
  var imageUrl, filename, filePath;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          imageUrl = req.query.imageUrl;

          if (imageUrl) {
            _context7.next = 3;
            break;
          }

          return _context7.abrupt("return", res.status(400).json({
            error: true,
            message: "imageUrl parameter is required"
          }));

        case 3:
          try {
            // Extract the filename from the imageUrl
            filename = path.basename(imageUrl); // Define the file path

            filePath = path.join(__dirname, "uploads", filename); // Check if the file exists

            if (fs.existsSync(filePath)) {
              // Delete the file from the uploads folder
              fs.unlinkSync(filePath);
              res.status(200).json({
                message: "Image deleted successfully"
              });
            } else {
              res.status(404).json({
                error: true,
                message: "Image not found"
              });
            }
          } catch (error) {
            console.error("Error deleting image:", error);
            res.status(500).json({
              error: true,
              message: error.message
            });
          }

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}); // Edit Travel Story

app.put("/edit-story/:id", authenticateToken, function _callee8(req, res) {
  var id, _req$body4, title, story, visitedLocation, imageUrl, visitedDate, userId, travelStory, placeholderImgUrl;

  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          _req$body4 = req.body, title = _req$body4.title, story = _req$body4.story, visitedLocation = _req$body4.visitedLocation, imageUrl = _req$body4.imageUrl, visitedDate = _req$body4.visitedDate;
          userId = req.user.userId; // Validate required fields

          if (!(!title || !story || !visitedLocation || !visitedDate)) {
            _context8.next = 5;
            break;
          }

          return _context8.abrupt("return", res.status(400).json({
            error: true,
            message: "All fields are required"
          }));

        case 5:
          _context8.prev = 5;
          _context8.next = 8;
          return regeneratorRuntime.awrap(TravelStory.findOne({
            _id: id,
            userId: userId
          }));

        case 8:
          travelStory = _context8.sent;

          if (travelStory) {
            _context8.next = 11;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            error: true,
            message: "Travel story not found"
          }));

        case 11:
          placeholderImgUrl = 'http://localhost:8000/assets/thankyou.jpg';
          travelStory.title = title;
          travelStory.story = story;
          travelStory.visitedLocation = visitedLocation;
          travelStory.imageUrl = imageUrl || placeholderImgUrl;
          travelStory.visitedDate = visitedDate;
          _context8.next = 19;
          return regeneratorRuntime.awrap(travelStory.save());

        case 19:
          res.status(200).json({
            story: travelStory,
            message: 'Update Successful'
          });
          _context8.next = 25;
          break;

        case 22:
          _context8.prev = 22;
          _context8.t0 = _context8["catch"](5);
          res.status(500).json({
            error: true,
            message: _context8.t0.message
          });

        case 25:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[5, 22]]);
}); // delete travel story

app["delete"]("/delete-story/:id", authenticateToken, function _callee9(req, res) {
  var id, userId, travelStory, imageUrl, filename, filePath;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          id = req.params.id; // Extract story ID from URL

          userId = req.user.userId; // Extract user ID from authentication

          _context9.prev = 2;
          _context9.next = 5;
          return regeneratorRuntime.awrap(TravelStory.findOne({
            _id: id,
            userId: userId
          }));

        case 5:
          travelStory = _context9.sent;

          if (travelStory) {
            _context9.next = 8;
            break;
          }

          return _context9.abrupt("return", res.status(404).json({
            error: true,
            message: "Travel story not found"
          }));

        case 8:
          _context9.next = 10;
          return regeneratorRuntime.awrap(travelStory.deleteOne());

        case 10:
          // No need to pass {_id}
          // Extract the filename from the imageUrl
          imageUrl = travelStory.imageUrl;

          if (imageUrl) {
            filename = path.basename(imageUrl);
            filePath = path.join(__dirname, "uploads", filename); // Delete the image file from the uploads folder

            fs.unlink(filePath, function (err) {
              if (err) {
                console.error("Failed to delete image file:", err); // You can choose to send an error message here if necessary
              }
            });
          }

          res.status(200).json({
            message: "Travel story deleted successfully"
          });
          _context9.next = 18;
          break;

        case 15:
          _context9.prev = 15;
          _context9.t0 = _context9["catch"](2);
          res.status(500).json({
            error: true,
            message: _context9.t0.message
          });

        case 18:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[2, 15]]);
}); //  updated isFavourite

app.put("/update-is-story/:id", authenticateToken, function _callee10(req, res) {
  var id, isFavourite, userId, travelStory;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          id = req.params.id;
          isFavourite = req.body.isFavourite;
          userId = req.user.userId;
          _context10.prev = 3;
          _context10.next = 6;
          return regeneratorRuntime.awrap(TravelStory.findOne({
            _id: id,
            userId: userId
          }));

        case 6:
          travelStory = _context10.sent;

          if (travelStory) {
            _context10.next = 9;
            break;
          }

          return _context10.abrupt("return", res.status(404).json({
            error: true,
            message: "Travel story not found"
          }));

        case 9:
          travelStory.isFavourite = isFavourite;
          _context10.next = 12;
          return regeneratorRuntime.awrap(travelStory.save());

        case 12:
          res.status(200).json({
            story: travelStory,
            message: 'favorite updated successfully'
          });
          _context10.next = 18;
          break;

        case 15:
          _context10.prev = 15;
          _context10.t0 = _context10["catch"](3);
          res.status(500).json({
            error: true,
            message: _context10.t0.message
          });

        case 18:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[3, 15]]);
}); // search travel stories

app.get("/search", authenticateToken, function _callee11(req, res) {
  var query, userId, searchResult;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          query = req.query.query;
          userId = req.user.userId;

          if (query) {
            _context11.next = 4;
            break;
          }

          return _context11.abrupt("return", res.status(404).json({
            error: true,
            message: "query is required"
          }));

        case 4:
          _context11.prev = 4;
          _context11.next = 7;
          return regeneratorRuntime.awrap(TravelStory.find({
            userId: userId,
            $or: [{
              title: {
                $regex: query,
                $options: "i"
              }
            }, {
              story: {
                $regex: query,
                $options: "i"
              }
            }, {
              visitedLocation: {
                $regex: query,
                $options: "i"
              }
            }]
          }).sort({
            isFavourite: -1
          }));

        case 7:
          searchResult = _context11.sent;
          res.status(200).json({
            stories: searchResult
          });
          _context11.next = 14;
          break;

        case 11:
          _context11.prev = 11;
          _context11.t0 = _context11["catch"](4);
          res.status(500).json({
            error: true,
            message: _context11.t0.message
          });

        case 14:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[4, 11]]);
}); // Filter travel stories by date range 

app.get("/travel-stories/filter", authenticateToken, function _callee12(req, res) {
  var _req$query, startDate, endDate, userId, start, end, filteredStories;

  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _req$query = req.query, startDate = _req$query.startDate, endDate = _req$query.endDate;
          userId = req.user.userId; // Convert startDate and endDate from milliseconds to Date objects 

          start = new Date(parseInt(startDate));
          end = new Date(parseInt(endDate)); // Find travel stories that belong to the authenticated user and fall within the date range 

          _context12.next = 7;
          return regeneratorRuntime.awrap(TravelStory.find({
            userId: userId,
            visitedDate: {
              $gte: start,
              $lte: end
            }
          }).sort({
            isFavourite: -1
          }));

        case 7:
          filteredStories = _context12.sent;
          res.status(200).json({
            stories: filteredStories
          });
          _context12.next = 14;
          break;

        case 11:
          _context12.prev = 11;
          _context12.t0 = _context12["catch"](0);
          res.status(500).json({
            error: true,
            message: _context12.t0.message
          });

        case 14:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 11]]);
}); // server static files from the uploads and assests directory
//  app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.use("/uploads", express["static"](path.join(__dirname, "uploads")));
app.use("/assets", express["static"](path.join(__dirname, "assets")));
var PORT = process.env.PORT || 8000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
}); // simply give app.listen()  function to run but why use call back function because then only you knoe the port is running or not

module.exports = app;