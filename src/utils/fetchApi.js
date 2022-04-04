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
  // const { data } = loginUserApi({
  //   email,
  //   password,
  // });
  const { data } = await axios.post("/auth/login", { email, password });
  token.set(data.accessToken);
  // console.log("loginUserApi_data :>> ", data);
  return data;
}

export async function logoutUserApi() {
  const { data } = await axios.post("/auth/logout");
  token.unset();
  // console.log("logoutUserApi :>> ", data);
  return data;
}

export async function refreshUserTokenApi(persistedToken) {
  const { data } = await axios.get("/auth/refresh", persistedToken);
  // console.log("refreshUserTokenApi_data :>> ", data);
  return data;
}

//--------------------------------------------------------------/

export async function addBookApi(newBook) {
  const { data } = await axios.post("/book", newBook);
  // console.log("fetchAddBook :>> ", data);
  return data;
}

export async function addBookReviewApi({ bookId, form }) {
  const data = await axios.patch(`/book/review`, form);
  // console.log("fetchAddBookReview :>> ", data);
  return data;
}

//--------------------------------------------------------------/

export async function addPlanningApi(form) {
  const { data } = await axios.post("/planning", form);
  // console.log("fetchPlanning :>> ", data);
  return data;
}

export async function addPagesApi(num) {
  const { data } = await axios.patch("/planning", num);
  // console.log("fetchAddPages :>> ", data);
  return data;
}

export async function getPlanningApi() {
  const { data } = await axios.get("/planning");
  // console.log("fetchPlanning :>> ", data);
  return data;
}

//--------------------------------------------------------------/

export async function getUserBooksApi() {
  const { data } = await axios.post("/user/books");
  token.unset();
  // console.log("fetchLogout_data :>> ", data);
  return data;
}
