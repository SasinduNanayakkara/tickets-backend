import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true
    },
    NIC: {
        type: String,
        required: [true, "NIC is required"],
        unique: true,
        trim: true
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true
    }

}, { timestamps: true });

export default mongoose.model("Users", UserSchema);