import { Box, Button, Portal, Text, VStack } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { MotionBox } from ".";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";

const nav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const toMain = () => navigate("/");
  const toSearch = () => navigate("/search");
  const toBookmarks = () => navigate("/bookmarks");
  const toSettings = () => navigate("/settings");

  return (
    <VStack
      h="100vh"
      py="3"
      bgColor="gray.100"
      borderRight="2px"
      borderColor="gray.200"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      spacing="10px">
      <Popover placement="right-end">
        <PopoverTrigger>
          <MotionBox
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            // @ts-ignore
            transition={{ type: "tween", duration: 0.1 }}
            py="2"
            px="3"
            mb="1"
            display="flex"
            alignItems="center"
            justifyContent="center"
            w="35px"
            h="35px"
            rounded="full"
            bgGradient="linear(to-br, blue.300, blue.500)">
            <Text color="white" fontSize="lg" fontWeight="600">
              ME
            </Text>
          </MotionBox>
        </PopoverTrigger>
        <Portal>
          <PopoverContent zIndex="40">
            <PopoverArrow />
            <PopoverHeader>🎉🎉 Hi, I&apos;m Roman Munar</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              a Filipino Web Developer and UX Designer based in Philippines. I also write content
              about software development toolings and frameworks. I&apos;m also looking for work,
              <a href="https://romanmunar.netlify.app/about#contact-me">contact me</a> if
              you&apos;re interested
            </PopoverBody>
            <PopoverFooter>
              <Button
                bgGradient="linear(to-r, yellow.400, orange.400)"
                size="sm"
                color="white"
                leftIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16">
                    <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
                    <path fillRule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path
                      fillRule="evenodd"
                      d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"
                    />
                  </svg>
                }>
                Visit my site
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
      <MotionBox
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.1 }}
        onClick={toMain}
        py="2"
        px="3"
        textColor={pathname === "/" ? "gray.800" : "gray.600"}>
        <svg
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </MotionBox>
      <MotionBox
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.1 }}
        onClick={toSearch}
        py="2"
        px="3"
        textColor={pathname === "/search" ? "gray.800" : "gray.600"}>
        <svg
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </MotionBox>
      <MotionBox
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.1 }}
        onClick={toBookmarks}
        py="2"
        px="3"
        textColor={pathname === "/bookmarks" ? "gray.800" : "gray.600"}>
        <svg
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </MotionBox>
      <MotionBox
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        // @ts-ignore
        transition={{ type: "tween", duration: 0.1 }}
        onClick={toSettings}
        py="2"
        px="3"
        textColor={pathname === "/settings" ? "gray.800" : "gray.600"}>
        <svg
          width="30px"
          height="30px"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </MotionBox>
      <MotionBox flex="1" />
      <Popover placement="right-end">
        <PopoverTrigger>
          <MotionBox
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
