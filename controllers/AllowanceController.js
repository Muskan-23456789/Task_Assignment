
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";
import AllowanceRequest from "../models/allowanceRequestModel.js";



export const createRequest = async (req, res) => {
  try {
    const { userId, amount, description } = req.body;
    const user = await User.findById(userId);

    if (!user) 
      return res.status(404).json({ message: "User not found" });

    const newRequest = await AllowanceRequest.create({
      user: userId,
      amount,
      description
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "hr@company.com",
      subject: `New Allowance Request from ${user.name}`,
      text: `Details:\nAmount: ${amount}\nDescription: ${description}\nDate: ${new Date().toLocaleDateString()}`
    });
    res.status(201).json(newRequest);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRequests = async (req, res) => {
  try {
    const requests = await AllowanceRequest.find().populate("user");
    res.json(requests);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await AllowanceRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updated) 
      return res.status(404).json({ message: "Request not found" });

    res.json(updated);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await AllowanceRequest.findByIdAndDelete(id);
    res.json({ message: "Request deleted successfully" });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};
