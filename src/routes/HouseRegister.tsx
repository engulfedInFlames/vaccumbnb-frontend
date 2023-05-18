import { Link, useNavigate } from "react-router-dom";
import { UseQueryResult, useMutation, useQueries } from "@tanstack/react-query";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { FaBed, FaMoneyBill, FaToilet } from "react-icons/fa";

import useHostOnly from "../lib/useHostOnly";
import useProtected from "../lib/useProtected";
import {
  fetchAmenities,
  fetchCategories,
  fetchHouseRegisterData,
} from "../api";
import {
  IAmenity,
  ICategory,
  IHouseDetail,
  IHouseReigsterForm,
} from "../types";
import { useForm } from "react-hook-form";

export default function HouseRegister() {
  useProtected();
  useHostOnly();

  const queries = useQueries({
    queries: [
      { queryKey: ["amenities"], queryFn: fetchAmenities },
      { queryKey: ["categoreis"], queryFn: fetchCategories },
    ],
  }) as [
    UseQueryResult<IAmenity[], unknown>,
    UseQueryResult<ICategory[], unknown>
  ];
  const { isLoading: isAmenitiesLoading, data: amenities } = queries[0];
  const { isLoading: isCategoriesLoading, data: categories } = queries[1];

  const { register, handleSubmit } = useForm<IHouseReigsterForm>();

  const toast = useToast();
  const navigate = useNavigate();

  const mutation = useMutation(fetchHouseRegisterData, {
    onSuccess: (data: IHouseDetail) => {
      toast({
        title: "House Registered",
        position: "bottom-right",
        status: "success",
      });
      navigate(`/houses/${data.id}`);
    },
  });

  const onSubmit = (data: IHouseReigsterForm) => {
    mutation.mutate(data);
  };

  return (
    <Box pb={40} mt={10} px={{ base: 10, lg: 40 }}>
      <Container>
        <Heading textAlign={"center"} mb={12}>
          House Registration
        </Heading>
        {!isAmenitiesLoading && !isCategoriesLoading ? (
          <VStack
            spacing={8}
            as="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                required
                type="text"
              />
              <FormHelperText>Write your house name</FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Input
                {...register("country", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>City</FormLabel>
              <Input
                {...register("city", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                {...register("address", { required: true })}
                required
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Price</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaMoneyBill />} />
                <Input
                  {...register("price", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>The number of rooms</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaBed />} />
                <Input
                  {...register("rooms", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>The number of toilets</FormLabel>
              <InputGroup>
                <InputLeftAddon children={<FaToilet />} />
                <Input
                  {...register("toilets", { required: true })}
                  required
                  type="number"
                  min={0}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <Checkbox>Pet Allowed</Checkbox>
            </FormControl>
            <FormControl>
              <Select
                {...register("category", { required: true })}
                placeholder="Type of House"
                required
              >
                {categories?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <Select
                {...register("kind", { required: true })}
                placeholder="Type of Rooms"
                required
              >
                <option value="entire_place">Entire Place</option>
                <option value="private_room">Private Room</option>
                <option value="shared_room">Shared Room</option>
              </Select>
            </FormControl>
            <FormControl>
              <Grid gridTemplateColumns={"1fr 1fr"} gap={4}>
                {amenities?.map((amenity) => (
                  <Box>
                    <Checkbox
                      {...register("amenities", { required: true })}
                      key={amenity.id}
                      value={amenity.id}
                    >
                      {amenity.name}
                    </Checkbox>
                    <FormHelperText>{amenity.description}</FormHelperText>
                  </Box>
                ))}
              </Grid>
            </FormControl>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Textarea {...register("description", { required: true })} />
            </FormControl>
            {mutation.isError ? (
              <Text color={"red.500"}>The Form is invalid</Text>
            ) : null}
            <ButtonGroup w={"full"} justifyContent={"flex-end"}>
              <Button
                type="submit"
                isLoading={mutation.isLoading}
                bg={"pink.400"}
                color={"white"}
                _hover={{ bg: "pink.200" }}
              >
                Register
              </Button>
              <Button>
                <Link to="/">Cancel</Link>
              </Button>
            </ButtonGroup>
          </VStack>
        ) : null}
      </Container>
    </Box>
  );
}
