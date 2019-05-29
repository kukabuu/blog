const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		login: {
			type: String,
			required: true, //для указания, что type обязательный
			unique: true // уникальный
		},
		password: {
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

module.exports = mongoose.model("User", schema);
