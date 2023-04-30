import { Grid } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import House from "../components/House";
import HouseSkeleton from "../components/HouseSkeleton";
import { fetchHouses } from "../api";

import { IHouseList } from "../types";

export default function Home() {
  const { isLoading, data } = useQuery<IHouseList[]>(["houses"], fetchHouses, {
    cacheTime: 1000 * 60,
  });

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
        ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, index) => (
            <HouseSkeleton key={index} />
          ))
        : data?.map((house, index) => (
            <House
              key={index}
              pk={house.id}
              imageUrl={
                house.photos[0]?.file
                  ? house.photos[0].file
                  : "https://placehold.co/600x400"
              }
              city={house.city}
              country={house.country}
              description={house.description}
              rating={house.rating}
              price={house.price}
            />
          ))}
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
