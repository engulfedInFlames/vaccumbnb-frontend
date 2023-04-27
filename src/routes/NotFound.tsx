import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <VStack minH="100vh" justifyContent={"center"} bg={"gray.100"}>
      <Heading>Page not found.</Heading>
      <Text>URL 입력이 잘못됐습니다.</Text>
      <Link to="/">
        <Button colorScheme={"red"} variant={"ghost"}>
          Go Home &rarr;
        </Button>
      </Link>
    </VStack>
  );
}
