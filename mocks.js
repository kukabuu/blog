const faker = require("faker");
const tr = require("transliter");
const models = require("./models");

const owner = "5cf1053a996282132cfdbca6";

module.exports = async () => {
	try {
		await models.Post.remove();

		Array.from({ length: 10 }).forEach(async () => {
			const title = faker.lorem.words(5);
			const url = `${tr.slugify(title)}-${Date.now().toString(36)}`;
			const post = await models.Post.create({
				title,
				body: faker.lorem.words(100),
				url,
				owner
			});
			console.log(post);
		});
	} catch (error) {
		console.log(error);
	}
};
