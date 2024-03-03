import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
   paymentRef : {
         type: String,
         required: [true, "Ticket reference is required"],
         trim: true
   },
   eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event is required"],
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
   quantity: {
      type: Number,
      required: [true, "Quantity is required"]
   },
   status: {
      type: String,
      required: true,
      enum: ['pending', 'success'],
      default: 'pending'
   }
},{ timestamps: true });

export default mongoose.model("Payment", paymentSchema);