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
  VStack,
} from "@chakra-ui/react";
import { MdAlternateEmail, MdLock } from "react-icons/md";

import SocialLogin from "./SocialLogin";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={"slideInBottom"}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader fontWeight={"bold"}>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack mb={"4"}>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <MdAlternateEmail />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Email address" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <MdLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Password" />
            </InputGroup>
          </VStack>
          <Button w={"100%"} bg={"pink.500"} color={"white"} fontSize={20}>
            Login
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
