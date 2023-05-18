import {
  Box,
  Button,
  Grid,
  HStack,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsSuitHeart } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IHouseProps {
  imageUrl: string;
  pk: number;
  city: string;
  country: string;
  rating: number;
  description: string;
  price: number;
}

export default function House({
  imageUrl,
  pk,
  city,
  country,
  rating,
  description,
  price,
}: IHouseProps) {
  const DarkModeGray = useColorModeValue("gray.600", "gray.400");

  return (
    <Link to={`houses/${pk}`}>
      <Box userSelect={"none"} cursor={"pointer"}>
        <VStack
          position={"relative"}
          overflow={"hidden"}
          rounded={"3xl"}
          mb={3}
        >
          <Image w={"100%"} h={"100%"} src={imageUrl} />
          <Button
            variant={"unstyled"}
            position={"absolute"}
            zIndex={999}
            top={0}
            right={2}
          >
            <BsSuitHeart size={24} color="rgba(255,255,255,1)" />
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
              {city}, {country}
            </Text>
            <HStack>
              <FaStar />
              <Text fontSize={"xl"}>{rating}</Text>
            </HStack>
          </Grid>
          <Text color={DarkModeGray} fontSize={18}>
            {description}
          </Text>
          <Box pt={1} fontSize={"xl"}>
            <Text>
              <Text as="b">${price}</Text> / 박
            </Text>
          </Box>
        </VStack>
      </Box>
    </Link>
  );
}
