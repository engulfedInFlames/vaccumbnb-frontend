import { Box, Grid, Skeleton } from "@chakra-ui/react";

export default function HouseSkeleton() {
  return (
    <Box>
      <Skeleton h="310" rounded={"2xl"} mb={3} />
      <Grid templateColumns={"6fr 1.4fr"} columnGap={10}>
        <Skeleton w={"100%"} h="3" rounded={"2xl"} mb={3} />
        <Skeleton w={"100%"} h="3" rounded={"2xl"} mb={3} />
      </Grid>
      <Skeleton w={"30%"} h="3" rounded={"2xl"} mb={3} />
      <Skeleton w={"45%"} h="3" rounded={"2xl"} mb={3} />
    </Box>
  );
}
