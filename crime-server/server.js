import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/crimes", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://brottsplatskartan.se/api/events/?location=vastervik&limit=5`
    );
    res.json(response.data.data);
    console.log(response.data.data);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/crimes/locations", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://brottsplatskartan.se/api/locations/?location=vastervik&limit=5`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    res.json(response.data.data.map((item) => item.headline));
    console.log(response.data.data.map((item) => item.headline));
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/crimes/search", async (req, res, next) => {
  const location = req.query.city || "vastervik";
  try {
    const response = await axios.get(
      `https://brottsplatskartan.se/api/events/?location=${location}&limit=5`
    );
    res.json(response.data.data);
    console.log(response.data.data);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
});

app.get("/crimes/latest", async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://brottsplatskartan.se/api/events/?location=vastervik&limit=5`
    );
    res.json(response.data.data[0]);
    console.log(response.data.data[0]);
  } catch (err) {
    console.error(err);
    next(err); // Pass the error to the error handling middleware
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
