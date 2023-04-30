import { Heading, Spinner, VStack, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogin } from "../api";
import { useQueryClient } from "@tanstack/react-query";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmGithub = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogin(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "Welcome!",
          description: "Github Login Success.",
          position: "bottom-right",
        });
      }
      queryClient.refetchQueries(["me"]);
      navigate("/");
    }
  };
  useEffect(() => {
    confirmGithub();
  }, []);
  return (
    <VStack mt={120}>
      <Heading mb={8}>Github Login In Progress</Heading>
      <Spinner size="lg" />
    </VStack>
  );
}
