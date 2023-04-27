import { Box, Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { AiFillGithub } from "react-icons/ai";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";

export default function () {
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
        >
          Continue With Github
        </Button>
        <Button
          leftIcon={<RiKakaoTalkFill />}
          w={"100%"}
          colorScheme={"yellow"}
        >
          Continue With Google
        </Button>
        <Button leftIcon={<FcGoogle />} w={"100%"}>
          Continue With Kakaotalk
        </Button>
      </VStack>
    </Box>
  );
}
