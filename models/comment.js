const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

const Post = require("./post");

const schema = new Schema(
	{
		body: {
			type: String,
			required: true
		},
		post: {
			type: Schema.Types.ObjectId,
			ref: "Post"
		},
		parent: {
			type: Schema.Types.ObjectId,
			ref: "Comment"
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "User",
			autopopulate: true
		},
		children: [
			{
				type: Schema.Types.ObjectId,
				ref: "Comment",
				autopopulate: { maxDepth: 25 }
			}
		],
		createdAt: {
			type: Date,
			default: Date.now
		}
	},
	{
		timestamps: false
	}
);
//перед сохранением
schema.pre("save", async function(next) {
	if (this.isNew) {
		await Post.incCommentCount(this.post);
	}
	next();
});

schema.plugin(autopopulate);

//убираем нижнее подчеркивание в id
schema.set("toJSON", {
	virtuals: true
});

module.exports = mongoose.model("Comment", schema);
