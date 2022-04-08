function findAuthorById(authors, id) {
  let matchingId = authors.find((author) => author.id === id);
  return matchingId;
}

function findBookById(books, id) {
  const matchingBook = books.find((book) => book.id === id);
  return matchingBook;
}

function partitionBooksByBorrowedStatus(books) {
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  const checkedOutBooks = books.filter((book) => !book.borrows[0].returned);
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const borrowersForBook = borrows.map((transaction) => {
    const borrower = accounts.find((account) => account.id === transaction.id);
    borrower.returned = transaction.returned;
    return borrower;
  });
  return borrowersForBook.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
