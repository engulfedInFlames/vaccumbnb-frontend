import { useQuery } from "@tanstack/react-query";
import { fetchMe } from "../api";
import { IMe } from "../types";

export default function useUser() {
  const { isLoading, data, isError } = useQuery<IMe>(["me"], fetchMe, {
    retry: false,
  });
  // isError가 True면 로그인되지 않은, False면 로그인 된.
  return {
    isUserLoading: isLoading,
    user: data,
    isLoggedIn: !isError,
  };
}
