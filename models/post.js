const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		title: {
			type: String,
			required: true //для указания, что type обязательный
		},
		body: {
			type: String
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

module.exports = mongoose.model("Post", schema);
