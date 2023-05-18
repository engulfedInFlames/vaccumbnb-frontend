import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import {
  Avatar,
  Box,
  Container,
  Grid,
  GridItem,
  HStack,
  Heading,
  Image,
  Skeleton,
  SkeletonCircle,
  Text,
  VStack,
} from "@chakra-ui/react";

import { IHouseDetail, IReview } from "../types";
import { fetchHouseDetail, fetchHouseReviews } from "../api";
import { FaStar } from "react-icons/fa";

export default function HouseDetail() {
  const { housePk } = useParams();
  const { isLoading: isDetailLoading, data: detailData } =
    useQuery<IHouseDetail>(["house", housePk], fetchHouseDetail);
  const { isLoading: isReviewsLoading, data: reviewsData } = useQuery<
    IReview[]
  >(["houses", housePk, "reviews"], fetchHouseReviews);

  return (
    <Box
      px={{
        base: 6,
        lg: 12,
      }}
      py={8}
    >
      <Skeleton w={"60%"} h={"32px"} isLoaded={!isDetailLoading}>
        <Heading fontSize={"2xl"}>{detailData?.name}</Heading>
      </Skeleton>
      <Grid
        h={"60vh"}
        templateRows={"repeat(2, 1fr)"}
        templateColumns={"repeat(4, 1fr)"}
        gap={2}
        mt={8}
        rounded={"xl"}
        overflow={"hidden"}
        borderBottomWidth={1}
      >
        {[1, 1, 1, 1, 1].map((_, index) => (
          <GridItem
            key={index}
            colSpan={index === 0 ? 2 : 1}
            rowSpan={index === 0 ? 2 : 1}
          >
            <Skeleton isLoaded={!isDetailLoading} w="100%" h="100%">
              {detailData?.photos && detailData.photos.length > 0 ? (
                <Image
                  w="100%"
                  h="100%"
                  objectFit={"cover"}
                  src={detailData?.photos[index].file}
                />
              ) : null}
            </Skeleton>
          </GridItem>
        ))}
      </Grid>
      <HStack w="45%" justifyContent={"space-between"} mt={10} pb={5}>
        <VStack w={"70%"} alignItems={"flex-start"}>
          <Skeleton isLoaded={!isDetailLoading} w="100%" h={"24px"}>
            <Heading fontSize={"2xl"} noOfLines={1} wordBreak={"break-all"}>
              House hosted by {detailData?.host.name}
            </Heading>
          </Skeleton>
          <Skeleton isLoaded={!isDetailLoading} w="80%" h={"24px"}>
            <HStack mt={2}>
              <Text>
                {detailData?.toilets}{" "}
                {detailData?.toilets === 1 ? "toilet" : "toilets"}
              </Text>
              <Text>·</Text>
              <Text>
                {detailData?.rooms} {detailData?.rooms === 1 ? "room" : "rooms"}{" "}
              </Text>
            </HStack>
          </Skeleton>
        </VStack>
        <SkeletonCircle isLoaded={!isDetailLoading} w={"60px"} h={"60px"}>
          <Avatar
            size={"lg"}
            src={detailData?.host.avatar}
            name={detailData?.host.name}
          />
        </SkeletonCircle>
      </HStack>

      <Box borderTopWidth={1} mt={10} pt={10}>
        <Heading fontSize={"2xl"} mb={12}>
          <HStack>
            <FaStar />
            <Text>{detailData?.rating}</Text> <Text>·</Text>{" "}
            <Text>
              {reviewsData?.length}{" "}
              {reviewsData?.length === 1 ? "review" : "reviews"}{" "}
            </Text>
          </HStack>
        </Heading>
        <Container maxW="full">
          <Grid templateColumns={"repeat(2,1fr)"} gap={8}>
            {reviewsData?.map((review, index) => (
              <VStack alignItems={"flex-start"} key={index}>
                <HStack mb={2}>
                  <Avatar
                    name={review.user.name}
                    src={review.user.avatar}
                    size="md"
                  ></Avatar>
                  <VStack alignItems={"flex-start"} spacing={0}>
                    <Text fontSize={"xl"} as="b">
                      {review.user.name}
                    </Text>
                    <HStack spacing={1}>
                      <FaStar size={14} />
                      <Text fontSize={"sm"}>{review.rating}</Text>
                    </HStack>
                  </VStack>
                </HStack>
                <Text fontSize={"xl"}>{review.payload}</Text>
              </VStack>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
