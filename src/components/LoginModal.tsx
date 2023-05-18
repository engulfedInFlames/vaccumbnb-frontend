import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { MdAlternateEmail, MdLock } from "react-icons/md";

import SocialLogin from "./SocialLogin";
import { userLogin } from "../api";
import { IUserLoginResult, IUserLoginVars } from "../types";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  username: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  // handleSubmit에는 기본으로 validation 및 preventDefault() 기능이 있다.
  // handleSubmit이 가진 고유 기능을 수행한 뒤에 인자로 받은 함수(onSubmit)를 실행한다.
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setValue : modify the value of a specific field.
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation<
    IUserLoginResult,
    IUserLoginResult,
    IUserLoginVars
  >(userLogin, {
    onMutate: () => {
      // Mutation이 진행 중일 때 실행된다.
      console.log("Mutation is in progess.");
    },
    onSuccess: () => {
      console.log("Mutation is successful.");
      toast({
        title: "Welcome!",
        description: "Login is successful!",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
      onClose();
      reset();
      queryClient.refetchQueries(["me"]);
    },
    onError: () => {
      console.log("Mutation has an error.");
    },
  });

  const onSubmit = ({ username, password }: IForm) => {
    mutation.mutate({ username, password });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={"slideInBottom"}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader fontWeight={"bold"}>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody as={"form"} onSubmit={handleSubmit(onSubmit)}>
          <VStack mb={"4"}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <MdAlternateEmail />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.username?.message)}
                {...register("username", { required: "invalid" })}
                placeholder="Username"
                required
                variant={"filled"}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <MdLock />
                  </Box>
                }
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", { required: "invalid" })}
                type="password"
                placeholder="Password"
                required
                variant={"filled"}
              />
            </InputGroup>
          </VStack>
          {mutation.isError ? (
            <Text color="red.500" textAlign={"center"} fontSize={"sm"} mb={4}>
              Username or Password is invalid
            </Text>
          ) : null}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            w={"100%"}
            bg={"pink.500"}
            color={"white"}
            fontSize={20}
            _hover={{
              backgroundColor: "pink.200",
            }}
            _focus={{
              backgroundColor: "pink.200",
            }}
          >
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
