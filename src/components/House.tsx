import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

export default function House() {
  const DarkModeGray = useColorModeValue("gray.600", "gray.400");

  return (
    <Box userSelect={"none"} cursor={"pointer"}>
      <VStack position={"relative"} overflow={"hidden"} rounded={"3xl"} mb={3}>
        <Image w={"100%"} h={"100%"} src="https://placehold.co/320x320" />
        <Button
          variant={"unstyled"}
          position={"absolute"}
          zIndex={999}
          top={3}
          right={2}
        >
          <BsFillSuitHeartFill size={24} color="rgba(0,0,0,0.5)" />
        </Button>
      </VStack>
      <VStack spacing={-0.5} alignItems={"flex-start"} userSelect={"none"}>
        <Grid templateColumns={"6fr 1fr"} columnGap={4}>
          <Text
            noOfLines={1}
            fontSize={"xl"}
            fontWeight={"medium"}
            wordBreak={"break-all"}
          >
            Ganggu-myeon, Yeongdeok-gun, 경상북도, 한국
          </Text>
          <HStack>
            <FaStar />
            <Text fontSize={"xl"}>4.72</Text>
          </HStack>
        </Grid>
        <Text color={DarkModeGray} fontSize={18}>
          바다 전망
        </Text>
        <Box pt={1} fontSize={"xl"}>
          <Text>
            <Text as="b">$265.00</Text> / 박
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
