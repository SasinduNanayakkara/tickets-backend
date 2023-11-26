import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
   ticketRef : {
         type: String,
         required: [true, "Ticket reference is required"],
         trim: true
   },
   event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event is required"],
   }
},{ timestamps: true });

export default mongoose.model("Ticket", ticketSchema);