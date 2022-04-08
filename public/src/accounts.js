function findAccountById(accounts, id) {
  let matchingAccountId = accounts.find((account) => account.id === id);
  return matchingAccountId;
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) =>
    a.name.last > b.name.last ? 1 : b.name.last > a.name.last ? -1 : 0
  );
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    let bookBorrows = book.borrows;
    let filteredBorrows = bookBorrows.filter((borrowed) => {
      if (borrowed.id === account.id) {
        total++;
      }
    });
  });
  return total;
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksPossessedByAccount = books.filter(
    (book) => book.borrows[0].id === account.id && !book.borrows[0].returned
  );
  booksPossessedByAccount.forEach((book) => {
    const bookAuthor = authors.find((author) => author.id === book.authorId);
    book.author = bookAuthor;
  });
  return booksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
