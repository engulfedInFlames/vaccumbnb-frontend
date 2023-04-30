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
} from "@chakra-ui/react";
import { MdAlternateEmail, MdLock } from "react-icons/md";

import SocialLogin from "./SocialLogin";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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
  } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log(data);
  };
  console.log(errors);

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
          <Button
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
