import axios from "axios";

axios.defaults.baseURL = "https://bookread-backend.goit.global";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export async function loginUserApi(userData) {
  const { data } = await axios.post("/auth/login", userData);
  token.set(data.accessToken);
  // console.log("loginUserApi :>> ", data);
  return data;
}

export async function registerUserApi(userData) {
  await axios.post("/auth/register", userData);
  const { email, password } = userData;
  const data = loginUserApi({
    email,
    password,
  });
  // console.log("loginUserApi_data :>> ", data);
  return data;
}

export async function logoutUserApi(persistedToken) {
  token.set(persistedToken);
  const { data } = await axios.post("/auth/logout", persistedToken);
  token.unset();
  // console.log("logoutUserApi :>> ", data);
  return data;
}

export async function refreshUserTokenApi({ refreshToken, sid }) {
  token.set(refreshToken);
  const { data } = await axios.get("/auth/refresh", { sid });
  // console.log("refreshUserTokenApi_data :>> ", data);
  return data;
}

//--------------------------------------------------------------/

export async function addBookApi(newBook, persistedToken) {
  token.set(persistedToken);
  const { data } = await axios.post("/book", newBook);
  // console.log("fetchAddBook :>> ", data);
  return data;
}

export async function addBookReviewApi({ bookId, form }) {
  // console.log(form);
  const { data } = await axios.patch(`/book/review/${bookId}`, form);
  // console.log("fetchAddBookReview :>> ", data);

  return data;
}

//--------------------------------------------------------------/

export async function addPlanningApi(form, accessToken) {
  token.set(accessToken);
  const { data } = await axios.post("/planning", form);
  // console.log("fetchPlanning :>> ", data);
  return data;
}

export async function addPagesApi(num) {
  // console.log("num---", num);
  const { data } = await axios.patch("/planning", num);
  // console.log("addPagesApi :>> ", data);
  return data;
}

export async function getPlanningApi(accessToken) {
  token.set(accessToken);
  const { data } = await axios.get("/planning");
  // console.log("getPlanningApi :>> ", data.planning);
  return data;
}

//--------------------------------------------------------------/

export async function getUserBooksApi(accessToken) {
  token.set(accessToken);
  const { data } = await axios.get("/user/books");
  token.unset();
  // console.log("getUserBooksApi :>> ", data);
  return data;
}
