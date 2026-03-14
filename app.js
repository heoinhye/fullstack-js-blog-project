const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Made with ❤️ in Windsor, Ontario 🇨🇦" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

app.get("/simon", (req, res) => {
  res.render("simon/simon.ejs", { content: "Hello!" });
});