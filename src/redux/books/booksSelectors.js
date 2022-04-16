export const getBooksGoingToReadState = (state) => state.books.goingToRead;
export const getBooksFinishedReadingState = (state) =>
  state.books.finishedReading;
export const getBooksCurrentlyReadingState = (state) =>
  state.books.currentlyReading;
export const getBooksState = (state) => state.books;
export const getIsLoading = (state) => state.books.isLoading;
export const getIsError = (state) => state.books.error;
