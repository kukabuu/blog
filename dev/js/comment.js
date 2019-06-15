/* eslint-disable no-undef */

$(function() {
	let commentForm;
	let parentId;

	function form(isNew, comment) {
		if (commentForm) {
			commentForm.remove();
		}
		parentId = null;
		commentForm = $(".comment").clone(true, true);

		if (isNew) {
			commentForm.appendTo(".comment-list");
		} else {
			let parentComment = $(comment).parent();
			parentId = parentComment.attr("id");
			$(comment).after(commentForm);
		}
		commentForm.css({ display: "flex" });
	}
	//load
	form(true);

	//add form
	$(".reply").on("click", function() {
		form(false, this);
	});
	//cancel form
	$("form.comment .cancel").on("click", function(e) {
		e.preventDefault();
		commentForm.remove();
	});

	//publish
	$("form.comment .send").on("click", function(e) {
		e.preventDefault();

		var data = {
			post: $(".comments").attr("id"),
			body: commentForm.find("textarea").val(),
			parent: parentId
		};

		$.ajax({
			type: "POST",
			data: JSON.stringify(data),
			contentType: "application/json",
			url: "/comment/add"
		}).done(function(data) {
			console.log(data);
			if (!data.ok) {
				$(".post-form h2").after('<p class="error">' + data.error + "</p>");
				if (data.fields) {
					data.fields.forEach(function(item) {
						$("#post-" + item).addClass("error");
					});
				}
			} else {
				$(location).attr("href", "/");
			}
		});
	});
});
