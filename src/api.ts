import { QueryFunctionContext } from "@tanstack/react-query";
import axios from "axios";
import Cookie from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/v1/",
  withCredentials: true,
});

export const fetchHouses = async () =>
  axiosInstance.get("houses/").then((response) => response.data);

export const fetchHouseDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [_, housePk] = queryKey;
  return axiosInstance
    .get(`houses/${housePk}`)
    .then((response) => response.data);
};

export const fetchHouseReviews = async ({ queryKey }: QueryFunctionContext) => {
  const [_, housePk] = queryKey;
  return axiosInstance
    .get(`houses/${housePk}/reviews`)
    .then((response) => response.data);
};

export const fetchMe = async () =>
  axiosInstance.get("users/me/").then((response) => response.data);

export const logout = () =>
  axiosInstance
    .post("users/logout/", null, {
      headers: {
        "X-CSRFToken": Cookie.get("csrftoken") || "",
      },
    })
    .then((response) => response.data);

export const githubLogin = (code: string) =>
  axiosInstance
    .post(
      "users/github-login/",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);

export const kakaoLogin = (code: string) =>
  axiosInstance
    .post(
      "users/kakao-login/",
      { code },
      {
        headers: {
          "X-CSRFToken": Cookie.get("csrftoken") || "",
        },
      }
    )
    .then((response) => response.status);
