import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        // required: [true, "Event name is required"],
        trim: true
    },
    eventDate: [
        {
            type: Date,
            required: [true, "Event date is required"],
            trim: true
        }
    ],
    venue: {
        type: String,
        // required: [true, "Venue is required"],
        trim: true
    },
    description: {
        type: String,
        // required: [true, "Description is required"],
        trim: true
    },
    eventType: {
        type: String,
        enum: ["Musical", "Drama", "Dance", "Comedy", "Sport","Exhibition","Movies", "Other"],
        // required: [true, "Event type is required"],
    },
    ticketPrice: [    
            {
                ticketName: {type: String},
                ticketPrice: {type: Number},
                ticketQuantity: {type: Number},
                totalTicketQuantity: {type: Number}
            }
    ],
    eventImage: [
        {
            type: String,
            required: false,
        }
    ],
    category: {
        type: String,
        enum: ["Concert", "Festival", "Show", "Other"],
        // required: [true, "Category is required"],
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Admin Id is required"],
    }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);