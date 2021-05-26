const mongoose = require("mongoose"),
  express = require("express"),
  app = express(),
  router = require("./routes/index"),
  layouts = require("express-ejs-layouts"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  expressSession = require("express-session"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash");

mongoose.Promise = global.Promise;

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/docucare",
    {useNewUrlParser: true}
);

app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);
app.use(express.static("public"));

app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(express.json());

app.use(methodOverride("_method", {methods: ["POST", "GET"]}));

app.use("/", router);

app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});