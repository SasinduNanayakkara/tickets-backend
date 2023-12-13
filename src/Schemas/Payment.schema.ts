import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
   paymentRef : {
         type: String,
         required: [true, "Ticket reference is required"],
         trim: true
   },
   event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: [true, "Event is required"],
   },
   user: {
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
   }
},{ timestamps: true });

export default mongoose.model("Payment", paymentSchema);