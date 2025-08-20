import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Allowance route working!" });
});

router.post("/", (req, res) => {
  const { amount, description } = req.body;
  res.json({
    message: "Allowance request created successfully",
    data: { amount, description },
  });
});

export default router;
