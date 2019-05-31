const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const URLSlugs = require("mongoose-url-slugs");
const tr = require("transliter");

const schema = new Schema(
	{
		title: {
			type: String,
			required: true //для указания, что type обязательный
		},
		body: {
			type: String
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps: true
	}
);

schema.plugin(
	URLSlugs("title", {
		field: "url",
		generator: text => tr.slugify(text)
	})
);
//убираем нижнее подчеркивание в id
schema.set("toJSON", {
	virtuals: true
});

module.exports = mongoose.model("Post", schema);
