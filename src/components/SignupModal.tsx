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
import { RiUser3Line } from "react-icons/ri";

import SocialLogin from "./SocialLogin";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SingupModal({ isOpen, onClose }: SignupModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset={"slideInBottom"}>
      <ModalOverlay></ModalOverlay>
      <ModalContent>
        <ModalHeader as="b">Signup</ModalHeader>
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
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <MdLock />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="Confirm Password" />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={
                  <Box color={"gray.600"}>
                    <RiUser3Line />
                  </Box>
                }
              />
              <Input variant={"filled"} placeholder="nickname" />
            </InputGroup>
          </VStack>
          <Button w={"100%"} bg={"pink.500"} color={"white"} fontSize={20}>
            Signup
          </Button>
          <SocialLogin />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
