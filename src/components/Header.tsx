import { Link } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";
import { useQueryClient } from "@tanstack/react-query";

import LoginModal from "./LoginModal";
import SingupModal from "./SignupModal";
import useUser from "../lib/useUser";
import { logout } from "../api";

export default function Header() {
  const queryClient = useQueryClient();
  const logoutToast = useToast();
  const { isUserLoading, isLoggedIn, user } = useUser();
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
  const onLogout = async () => {
    const toastId = logoutToast({
      title: "Now logout...",
      status: "loading",
      position: "bottom-right",
    });
    await logout();
    queryClient.refetchQueries(["me"]);
    logoutToast.update(toastId, {
      title: "Logout success!",
      status: "success",
      position: "bottom-right",
      duration: 3000,
    });
  };

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
        <Flex alignItems={"center"}>
          <IconButton
            aria-label="Toggle Dark Mode"
            onClick={toggleColorMode}
            icon={<DarkModeIcon />}
            variant={"ghost"}
          />
          {!isUserLoading && !isLoggedIn ? (
            <>
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
                  ml={"1"}
                >
                  Sign Up
                </Button>
              </LightMode>
            </>
          ) : (
            <>
              <Menu>
                <MenuButton>
                  <Avatar name={user?.name} src={user?.avatar} />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={onLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </Flex>
        <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
        <SingupModal isOpen={isSignupOpen} onClose={onSignupClose} />
      </Stack>
    </Box>
  );
}
