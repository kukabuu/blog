const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			autopopulate: true
		},
		path: {
			type: String,
			required: true
		}
	},
	{
		timestamps: true
	}
);
//убираем нижнее подчеркивание в id
schema.set("toJSON", {
	virtuals: true
});

module.exports = mongoose.model("Upload", schema);
