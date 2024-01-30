import mongoose from "mongoose";

const registrationFeeSchema = new mongoose.Schema({
    paymentRef: {
        type: String,
        required: [true, "Ticket reference is required"],
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: [true, "User is required"]
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"]
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'success'],
        default: 'pending'
    }
}, {timestamps: true});

export default mongoose.model("RegistrationFeePayment", registrationFeeSchema);