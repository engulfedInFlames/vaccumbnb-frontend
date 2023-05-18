import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./useUser";

export default function useHostOnly() {
  const navigate = useNavigate();
  const { isUserLoading, user } = useUser();
  useEffect(() => {
    if (isUserLoading || !user || !user?.is_host) {
      navigate("/");
    }
  }, [isUserLoading, user, navigate]);
}
