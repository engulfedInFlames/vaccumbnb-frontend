import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./useUser";

export default function useProtected() {
  const navigate = useNavigate();
  const { isUserLoading, user } = useUser();
  useEffect(() => {
    if (isUserLoading || !user) {
      navigate("/");
    }
  }, [isUserLoading, user, navigate]);
}
