import { Grid } from "@chakra-ui/react";
import House from "../components/House";
import HouseSkeleton from "../components/HouseSkeleton";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Grid
      columnGap={8}
      rowGap={8}
      // sm, base는 모바일용
      templateColumns={{
        sm: "1fr",
        md: "repeat(2,1fr)",
        lg: "repeat(3,1fr)",
        xl: "repeat(4,1fr)",
        "2xl": "repeat(5,1fr)",
      }}
      px={{
        base: 6,
        lg: 12,
      }}
      py={8}
    >
      {isLoading
        ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((index) => (
            <HouseSkeleton key={index} />
          ))
        : null}
    </Grid>
  );
}

/*
Skeleton은 애니메이션이 있는 Box이다. 로딩 중일 때  alt로 유용하다.
<Box>
  <Skeleton height={320} rounded={"2xl"} mb={3} />
  <SkeletonText noOfLines={3} />
</Box>
*/
