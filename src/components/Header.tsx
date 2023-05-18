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
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaAirbnb, FaMoon } from "react-icons/fa";
import { MdWbSunny } from "react-icons/md";

import LoginModal from "./LoginModal";
import SingupModal from "./SignupModal";
import { logout } from "../api";
import { IMe } from "../types";

interface IHeaderProps {
  user: IMe | null;
  isUserLoading: boolean;
}

export default function Header({ user, isUserLoading }: IHeaderProps) {
  const queryClient = useQueryClient();
  const logoutToast = useToast();
  const toastId = useRef<ToastId>();

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

  const mutation = useMutation(logout, {
    onMutate: () => {
      toastId.current = logoutToast({
        title: "Now Logout...",
        status: "loading",
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries(["me"]);
      logoutToast.update(toastId.current!, {
        title: "Logout Success!",
        status: "success",
        position: "bottom-right",
        duration: 3000,
      });
    },
    onError: () => {
      logoutToast.update(toastId.current!, {
        title: "Logout Failed.",
        status: "error",
        position: "bottom-right",
        duration: 3000,
      });
    },
  });
  const onLogout = async () => {
    mutation.mutate();
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
          {!isUserLoading && !user ? (
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
                  {user?.is_host ? (
                    <Link to="/houses/upload">
                      <MenuItem>Register House</MenuItem>
                    </Link>
                  ) : null}

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
