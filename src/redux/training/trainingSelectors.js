import { getBooksCurrentlyReadingState } from "../books/booksSelectors";

export const getStartDate = (state) => state.training.startDate;
export const getEndDate = (state) => state.training.endDate;
export const getTrainingBooks = (state) => state.training.books;
export const getTraining = (state) => state.training;
export const getStats = (state) => state.training.stats;
export const getDurationPeriod = (state) => state.training.duration;
export const getRemaindBooks = (state) => state.training.books;
export const getError = (state) => state.training.error;
export const getIsTrain = (state) =>
  getBooksCurrentlyReadingState(state).length > 0;
