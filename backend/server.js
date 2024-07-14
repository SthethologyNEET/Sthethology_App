import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectToMongoDB.js";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.get("/api/v1", (req, res) => {
    res.send("<h1>Sthethology API V1</h1>");
});

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server is listening on Port: ${PORT}`);
});