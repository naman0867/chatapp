const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
{
sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" 
recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Use
text: { type: String, required: true },
},
{ timestamps: true }
);
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;