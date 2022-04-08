const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.filter((book) => {
    const transactionStatus = book.borrows[0].returned;
    if (transactionStatus === false) {
      count++;
    }
  });
  return count;
}

function getMostCommonGenres(books) {
  let genres = books.reduce((acc, book) => {
    acc[book.genre] != null
      ? acc[book.genre].count++
      : (acc[book.genre] = { name: book.genre, count: 1 });
    return acc;
  }, {});
  return Object.keys(genres)
    .map((genre) => genres[genre])
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  let result = [];
  const bookTitleAndCount = books.forEach((book) => {
    result.push({ name: book.title, count: book.borrows.length });
  });
  let sortedResult = result.sort((a, b) => b.count - a.count);
  return sortedResult.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let result = [];
  //loop over books
  books.forEach((book) => {
    //create an array of books for each authorId
    const bookAuthor = book.authorId;
    //find the author of each book
    const authorOfBook = findAuthorById(authors, bookAuthor);
    result.push({
      name: `${authorOfBook.name.first} ${authorOfBook.name.last}`,
      count: book.borrows.length,
    });
  });
  const resultB = result.sort((a, b) => b.count - a.count);
  return resultB.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
