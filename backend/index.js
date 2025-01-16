const express = require('express')
const app = express()
const cors = require('cors')
const blogs = require('./api/blogsData.json')
const port = process.env.PORT || 5004
;
const scrapeJobs = require('./Scraper');
// middleware
app.use(cors())
const path = require("path");
app.use(express.json());
//


app.get('/blogs', (req, res) => {
  res.send(blogs)
})
app.get('/blogs/:id', (req, res) => {
  const id = parseInt(req.params.id);
  // console.log(id)
  const blog = blogs.filter(b => b.id === id);
  // console.log(blog)
  res.send(blog)
})

app.get('/jobs', async (req, res) => { const jobs = await scrapeJobs(); res.json(jobs); });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/frontend/dist/index"));
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});