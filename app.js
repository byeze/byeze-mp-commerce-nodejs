const express = require("express");
const exphbs = require("express-handlebars");
const {
    detail,
    success,
    pending,
    failure,
    ipn,
    home,
} = require("./controller");

const app = express();

app.use(express.json());
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

// Main sections
app.get("/", home);
app.get("/detail", detail);

// Handlers for payment status
app.get("/success", success);
app.get("/pending", pending);
app.get("/failure", failure);

// IPN Controller
app.post("/ipn", ipn);

app.use(express.static("assets"));
app.use("/assets", express.static(`${__dirname}/assets`));

app.listen(process.env.PORT || 3000);
