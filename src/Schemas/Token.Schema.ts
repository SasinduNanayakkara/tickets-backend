import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
    jti: {
      type: String,
      required: [true, "jti required"],
    },
    type: {
        type: String,
        required: [true, "type is required"],
    }
  },
  { timestamps: true }
);

export default mongoose.model("Token", tokenSchema);
