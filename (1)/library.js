let books = [];

function add() {
	let title = document.getElementById("title").value;
	let author = document.getElementById("author").value;
	let publisher = document.getElementById("publisher").value;
	let year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
		let book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (let i = 0; i < books.length; i++) {
			if (books[i].title == book.title && books[i].author == book.author && books[i].publisher == book.publisher && books[i].year == book.year) {
				console.log('Failed to add book! This book is already in library.');
				return;
			}
		}
		books.push(book);
	}
}

function remove() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let publisher = document.getElementById("publisher").value;
    let year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
        let book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (let i = 0; i < books.length; i++) {
			if (books[i].title == book.title &&
				books[i].author == book.author &&
				books[i].publisher == book.publisher &&
				books[i].year == book.year) {
					books.splice(i, 1);
					console.log('This book successfully removed from library!');
					return;
				}
		}
		console.log('Failed to find this book');
	}
}

function find() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let publisher = document.getElementById("publisher").value;
    let year = document.getElementById("year").value;
	if (!(title && author && publisher && year))
		alert('Не заполнено одно из полей');
	else {
        let book = {
			"title"		: title,
			"author"	: author,
			"publisher"	: publisher,
			"year"		: year
		};
		for (let i = 0; i < books.length; i++) {
			if (books[i].title == book.title && books[i].author == book.author && books[i].publisher == book.publisher && books[i].year == book.year) {
				console.log('This book is in library now!')
				return;
			}
		}
		console.log('Failed to find this book');
	}
}

function bookSort() {
	let column = prompt('Введите столбец для сортировки:');
	let isRight = confirm("Сортировать по возрастанию?");
	if ( !(column in books[0]) ) {
		alert('Некорректное значение столбца!');
		return;
	}
	if (isRight)
		books.sort((left, right) => left[column] > right[column]);
	else books.sort((left, right) => left[column] < right[column]);

	for (let i = 0; i < books.length; i++)
		console.log(books[i]);
}

