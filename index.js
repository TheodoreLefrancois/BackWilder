const express = require("express");
const mongoose = require("mongoose");
const WilderModel = require("./models/Wilder");
const wilderController = require("./controllers/wilders");
const cors = require("cors");
const errorHandler = require("./utils/ErrorHandler");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })

  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
  WilderModel.init().then(() => {
    const firstWilder = new WilderModel({
      name: "First Wildeuse",
      city: "San Francisco",
      skills: [
        {
          title: "HTML",
          votes: 10,
        },
        {
          title: "React",
          votes: 5,
        },
      ],
    });
    firstWilder
      .save()
      .then((result) => {
        console.log("success: ", result);
      })
      .catch((err) => {
        console.log(("error: ", err));
      });
  });
});

app.post("/api/wilder/create", errorHandler(wilderController.create));
app.get("/api/wilder/read", errorHandler(wilderController.retrieve));
app.delete("/api/wilder/delete/:_id", errorHandler(wilderController.delete));
app.put("/api/wilder/update", errorHandler(wilderController.update));
app.get("/api/wilder/read/:_id", errorHandler(wilderController.getById));

app.listen(5000, () => console.log("Server started on 5000"));
