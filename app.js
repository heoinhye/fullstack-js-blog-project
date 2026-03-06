const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 홈 페이지 경로
app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Hello from Jane in Windsor!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});