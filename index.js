import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {   
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  });


app.get("/", (req, res) => {
  res.send(" Server is running! Use /api/allowance/users for user routes.");
});

app.use("/api/allowance/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
