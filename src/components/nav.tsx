import { Box, Text, VStack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const nav = () => {
  const navigate = useNavigate();
  const { pathname: url } = useLocation();
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
      <Box
        py="2"
        px="3"
        mb="1"
        as="button"
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
      </Box>
      <Box onClick={toMain} py="2" px="3" as="button" textColor="gray.600">
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
      </Box>
      <Box onClick={toSearch} py="2" px="3" as="button" textColor="gray.600">
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
      </Box>
      <Box onClick={toBookmarks} py="2" px="3" as="button" textColor="gray.600">
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
            strokeWidth={2}
            d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </Box>
      <Box onClick={toSettings} py="2" px="3" as="button" textColor="gray.600">
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
      </Box>
      <Box flex="1" />
      <Box py="2" px="3" as="button" textColor="gray.600">
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
      </Box>
    </VStack>
  );
};

export default nav;
