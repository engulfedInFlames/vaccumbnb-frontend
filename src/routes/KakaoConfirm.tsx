import { Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { kakaoLogin } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function KakaoConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmKakao = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await kakaoLogin(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "Welcome!",
          description: "Kakao Login Success.",
          position: "bottom-right",
        });
      }
      queryClient.refetchQueries(["me"]);
      navigate("/");
    }
  };
  useEffect(() => {
    confirmKakao();
  }, []);
  return (
    <VStack mt={120}>
      <Heading mb={8}>Kakao Login In Progress</Heading>
      <Spinner size="lg" />
    </VStack>
  );
}
