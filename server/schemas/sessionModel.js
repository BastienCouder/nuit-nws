import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "pending" },
  createdAt: { type: Date, expires: "15m", default: Date.now },
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
