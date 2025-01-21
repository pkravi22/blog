const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const port = process.env.PORT || 5004;
const axios = require("axios");
const cheerio = require("cheerio");
const Byte = require("./models/Bytes");
const User = require("./models/User");
// Assuming you have a separate file for DB connection
const connectDB = require("./db");

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory

// Bytes Schema and Model
//user login and signup
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});


// Blog Schema and Model
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  category: String,
  author: String,
  authorPic: String,
  published_date: String,
  reading_time: String,
  content: String,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema, "Blogs");

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads"); // Save uploaded files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Create a unique file name
  },
});

const upload = multer({ storage });

// Route to upload a file
app.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path: filePath, mimetype } = req.file;
console.log(req.file)
    // Save file details in the database
    const normalizedPath = path.normalize(filePath);
    const newByte = new Byte({
      fileName: originalname,
      filePath,
      fileType: mimetype,
    });

    await newByte.save();
    res.status(201).json({ message: "File uploaded successfully", newByte });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Error uploading file", error });
  }
});

// Route to fetch all uploaded files
app.get("/bytes", async (req, res) => {
  try {
    const bytes = await Byte.find();
    res.status(200).json(bytes);
  } catch (error) {
    console.error("Error fetching bytes:", error);
    res.status(500).json({ message: "Error fetching bytes", error });
  }
});

// Routes for blogs
app.get("/blogs", async (req, res) => {
  try {
    console.log("Fetching blogs from MongoDB...");
    const blogs = await Blog.find(); // Fetching all blogs from the 'Blogs' collection
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await Blog.findById(id);

    if (blog) {
      res.send(blog);
    } else {
      res.status(404).send({ message: "Blog not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Error fetching blog", error });
  }
});

// Web scraping for job listings
const url = "https://www.sarkariresult.com/latestjob/";

const scrapeJobs = async () => {
  try {
    console.log(`Fetching data from ${url}`);
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const jobListings = [];

    $("body #post ul ").each((index, element) => {
      const jobTitle = $(element).text().trim();
      const jobLink = $(element).find("a").attr("href");

      if (jobTitle && jobLink) {
        jobListings.push({
          title: jobTitle,
          link: new URL(jobLink, url).href,
        });
      }
    });

    return jobListings;
  } catch (error) {
    console.error("Error scraping job listings:", error);
    return [];
  }
};

app.get("/jobs", async (req, res) => {
  const jobs = await scrapeJobs();
  res.json(jobs);
});

// Serve frontend files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/frontend/dist/index"));
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
