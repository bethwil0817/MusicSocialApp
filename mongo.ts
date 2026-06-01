import mongoose from "mongoose";
mongoose
	.connect("mongodb://")
	.then(() => {
		console.log("mongo connected");
	})
	.catch(() => {
		console.log("failed connections");
	});

const newSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const collection = mongoose.model("collection", newSchema);
export default collection;
