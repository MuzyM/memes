var books = [];

function add() {
	var title = document.getElementById("title").value;
	var author = document.getElementById("author").value;
	var publisher = document.getElementById("publisher").value;
	var year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
		var book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (var i = 0; i < books.length; i++) {
			if (books[i].title == book.title && books[i].author == book.author && books[i].publisher == book.publisher && books[i].year == book.year) {
				console.log('Failed to add book! This book is already in library.');
				return;
			}
		}
		books.push(book);
	}
}

function remove() {
	var title = document.getElementById("title").value;
	var author = document.getElementById("author").value;
	var publisher = document.getElementById("publisher").value;
	var year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
		var book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (var i = 0; i < books.length; i++) {
			if (books[i].title == book.title && books[i].author == book.author && books[i].publisher == book.publisher && books[i].year == book.year) {
				books.splice(i, 1);
				return;
			}
		}
		console.log('Failed to find this book');
	}
}

function find() {
	var title = document.getElementById("title").value;
	var author = document.getElementById("author").value;
	var publisher = document.getElementById("publisher").value;
	var year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
		var book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (var i = 0; i < books.length; i++) {
			if (books[i].title == book.title && books[i].author == book.author && books[i].publisher == book.publisher && books[i].year == book.year) {
				console.log('This book is in library now!')
				return;
			}
		}
		console.log('Failed to find this book');
	}
}

function bookSort() {
/*	books = books.sort(CompareForSort)
	for (var i = 0; i < books.length; i++) {
		console.log(books[i].title);
	}
	*/
}

