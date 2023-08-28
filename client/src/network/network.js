import axios from "axios";

const BASE_URL = "http://localhost:9000/api/";
// const TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZTZiMTcwZTAzNTFhZmQ5MjkxYjJhNyIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2OTMwNzY0NzgsImV4cCI6MTY5MzMzNTY3OH0.UegUcZcxt2HenMsubgnXAr_anZ2_-XG8vmWdRd7iadE";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
console.log(currentUser);
const TOKEN = currentUser?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
