import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    eventId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true,
    },
    ticketPrice: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    paymentRef: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Ticket", TicketSchema);