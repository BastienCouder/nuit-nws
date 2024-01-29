import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "pending" }, // 'pending', 'authenticated', etc.
  createdAt: { type: Date, expires: "15m", default: Date.now }, // Session expire après 15 minutes
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
