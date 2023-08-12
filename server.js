const express = require("express");
const app = express();
const PORT = 4000;
const mongoose = require("mongoose");
const productRoutes = require("./routes");
mongoose
  .connect(
    "mongodb+srv://fastcampus:fastcampus@cluster0.o8yonlm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((error) => console.error(error));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
