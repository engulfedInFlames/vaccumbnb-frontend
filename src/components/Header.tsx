import {
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";
import SingupModal from "./SignupModal";

export default function Header() {
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignupOpen,
    onClose: onSignupClose,
    onOpen: onSignupOpen,
  } = useDisclosure();

  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("pink.500", "pink.200");
  // 컴포넌트는 반드시 대문자로 시작해야 한다.
  const DarkModeIcon = useColorModeValue(FaMoon, MdWbSunny);

  return (
    <Box userSelect={"none"}>
      <Stack
        justifyContent={"space-between"}
        alignItems={"center"}
        px={12}
        py={6}
        borderBottomWidth={1}
        direction={{
          sm: "column",
          md: "row",
        }}
        spacing={{
          sm: 6,
          md: 0,
        }}
      >
        <Link to="/">
          <HStack color={logoColor}>
            <FaAirbnb size={36} />
            <Text fontSize={"2xl"} as="b">
              Vaccumbnb
            </Text>
          </HStack>
        </Link>
        <HStack>
          <IconButton
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            icon={<DarkModeIcon />}
            variant={"ghost"}
          />
          <Button onClick={onLoginOpen} w={24}>
            Login
          </Button>
          <LightMode>
            <Button
              onClick={onSignupOpen}
              _hover={{
                backgroundColor: "pink.200",
              }}
              _focus={{
                backgroundColor: "pink.200",
              }}
              w={24}
              bg={"pink.500"}
              color={"white"}
            >
              Sign Up
            </Button>
          </LightMode>
        </HStack>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SingupModal isOpen={isSignupOpen} onClose={onSignupClose} />
      </Stack>
    </Box>
  );
}
