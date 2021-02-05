import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MotionBox, NavIconButton } from ".";
import { Bookmark, Home, Search, Settings, User } from "./icons";

const nav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toMain = () => navigate("/");
  const toSearch = () => navigate("/search");
  const toBookmarks = () => navigate("/bookmarks");
  const toSettings = () => navigate("/settings");
  const routes = [
    {
      path: "/",
      linkNavigate: toMain,
      icon: <Home width="30px" height="30px" strokeWidth="1.5" />,
    },
    {
      path: "/search",
      linkNavigate: toSearch,
      icon: <Search width="30px" height="30px" strokeWidth="1.5" />,
    },
    {
      path: "/bookmarks",
      linkNavigate: toBookmarks,
      icon: <Bookmark width="30px" height="30px" strokeWidth="1.5" />,
    },
    {
      path: "/settings",
      linkNavigate: toSettings,
      icon: <Settings width="30px" height="30px" strokeWidth="1.5" />,
    },
  ];
  return (
    <VStack
      h={["auto", "100vh"]}
      w={["100vw", "auto"]}
      position={["fixed", "static"]}
      bottom="0"
      zIndex="100"
      py="3"
      bgColor="gray.100"
      borderRight="2px"
      borderColor="gray.200"
      display="flex"
      flexDirection={["row", "column"]}
      alignItems="center"
      justifyContent={["space-around", "space-between"]}
      spacing={[0, "10px"]}>
      <Popover placement="right-end">
        <PopoverTrigger>
          <MotionBox
            display={["none", "flex"]}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            // @ts-ignore
            transition={{ type: "tween", duration: 0.1 }}
            mb="1">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              w="30px"
              h="30px"
              rounded="full"
              bgGradient="linear(to-br, blue.300, blue.500)"
              py="2"
              px="3">
              <Text color="white" fontSize="sm" fontWeight="600">
                ME
              </Text>
            </Box>
          </MotionBox>
        </PopoverTrigger>
        <Portal>
          <PopoverContent zIndex="40">
            <PopoverArrow />
            <PopoverHeader>🎉🎉 Hi, I&apos;m Roman Munar</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              a Filipino Web Developer and design enthusiast based in Philippines. I also write
              content about software development toolings and frameworks.
              <a href="https://romanmunar.netlify.app/about#contact-me">
                <Text color="blue.500">Contact Me</Text>
              </a>
            </PopoverBody>
            <PopoverFooter>
              <Button
                bgGradient="linear(to-r, yellow.400, orange.400)"
                size="sm"
                color="white"
                leftIcon={<User width="16px" height="16px" />}>
                Visit my site
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
      {routes.map((r) => (
        <NavIconButton
          key={r.path}
          active={r.path === pathname}
          icon={r.icon}
          onClick={r.linkNavigate}
        />
      ))}
      <MotionBox display={["none", "block"]} flex="1" />
      <Popover placement="right-end">
        <PopoverTrigger>
          <MotionBox
            display={["none", "flex"]}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            // @ts-ignore
            transition={{ type: "tween", duration: 0.1 }}
            py="2"
            px="3"
            textColor="gray.600">
            <svg
              width="30px"
              height="30px"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
          </MotionBox>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>About This Project</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              This project is built with React and Redux on the frontend and Node/Typescript on the
              backend.
            </PopoverBody>
            <PopoverFooter>
              <Button
                size="sm"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path
                      fillRule="evenodd"
                      d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                }
                _hover={{ bg: "gray.500" }}
                bg="gray.700"
                color="white">
                Github Repo
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
    </VStack>
  );
};

export default nav;
