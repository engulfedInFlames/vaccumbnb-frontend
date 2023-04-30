import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function () {
  const githubParams = {
    client_id: "18373b728d457a11531a",
    scope: "read:user,user:email",
  };
  const githubSearchParams = new URLSearchParams(githubParams).toString();
  const githubOauthURL = `https://github.com/login/oauth/authorize?${githubSearchParams}`;

  const kakaoParams = {
    client_id: "39669f9889ada8c1d0b149f32dfa7c20",
    redirect_uri: "http://127.0.0.1:3000/social/kakao/",
    response_type: "code",
  };
  const kakaoSearchParams = new URLSearchParams(kakaoParams).toString();
  const kakaoOauthURL = `https://kauth.kakao.com/oauth/authorize?${kakaoSearchParams}`;

  return (
    <Box mt={8}>
      <HStack>
        <Divider />
        <Text
          textTransform={"uppercase"}
          color={"gray.400"}
          fontSize={"xs"}
          as="b"
        >
          Or
        </Text>
        <Divider />
      </HStack>
      <VStack mt={8} mb={8}>
        <Button
          leftIcon={<AiFillGithub />}
          w={"100%"}
          bg={"blackAlpha.900"}
          color={"white"}
          as="a"
          href={githubOauthURL}
        >
          Continue With Github
        </Button>
        <Button
          leftIcon={<RiKakaoTalkFill />}
          w={"100%"}
          colorScheme={"yellow"}
          as="a"
          href={kakaoOauthURL}
        >
          Continue With Kakaotalk
        </Button>
        <Button leftIcon={<FcGoogle />} w={"100%"} as="a">
          Continue With Google
        </Button>
      </VStack>
    </Box>
  );
}
