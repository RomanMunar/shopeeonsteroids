import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  compareLayouts,
  itemRating,
  lastActiveDays,
  locations,
  searchSort,
} from "src/lib/data/constants";
import { defaultSettings } from "src/lib/data/defaultSearchSettings";
import { getLocaleStorageSettings, setLocalStorageSettings } from "src/lib/utils/localStorage";
import { CompareLayout } from "src/slices";

const Settings = () => {
  const toast = useToast();
  const settings = getLocaleStorageSettings();
  const [sessionLocation, setSessionLocation] = useState(settings.search.sellerLocation);
  const [sessionRatingsAbove, setSessionRatingsAbove] = useState(settings.search.itemRatingOnly);
  const [sessionSearchSort, setSessionSearchSort] = useState(settings.search.searchSort);
  const [sessionCompareLayout, setSessionCompareLayout] = useState<CompareLayout>(
    settings.ui.compareLayout
  );
  const [sessionFilterPanelCollpsed, setSessionFilterPanelCollpsed] = useState(
    settings.ui.filterPanelCollapsed
  );
  const [sessionLastActiveDays, setSessionLastActiveDays] = useState(settings.seller.lastActive);
  const [sessionFilterUnverified, setSessionFilterUnverified] = useState(
    settings.search.shopeeVerifiedOnly
  );

  const onSubmit = () => {
    toast({
      position: "top",
      status: "success",
      title: "Changes saved successfully.",
      isClosable: true,
    });
    setLocalStorageSettings({
      search: {
        sellerLocation: sessionLocation,
        searchSort: sessionSearchSort,
        itemRatingOnly: sessionRatingsAbove,
        shopeeVerifiedOnly: sessionFilterUnverified,
      },
      seller: { lastActive: sessionLastActiveDays },
      ui: {
        compareLayout: sessionCompareLayout,
        filterPanelCollapsed: sessionFilterPanelCollpsed,
      },
    });
  };

  const onReset = () => {
    setLocalStorageSettings(defaultSettings);
    toast({
      position: "top",
      title: "Reset Settings",
      isClosable: true,
    });
    setSessionLocation(defaultSettings.search.sellerLocation);
    setSessionRatingsAbove(defaultSettings.search.itemRatingOnly);
    setSessionSearchSort(defaultSettings.search.searchSort);
    setSessionCompareLayout(defaultSettings.ui.compareLayout);
    setSessionFilterPanelCollpsed(defaultSettings.ui.filterPanelCollapsed);
    setSessionLastActiveDays(defaultSettings.seller.lastActive);
    setSessionFilterUnverified(defaultSettings.search.shopeeVerifiedOnly);
  };

  return (
    <Flex h="100vh" flexDirection="column" overflowY="auto">
      <Box borderBottom="1px" borderColor="gray.300">
        <Box maxW="2xl" w="full" m="auto">
          <Heading as="h3" p="4" size="sm" alignSelf="start">
            SETTINGS
          </Heading>
        </Box>
      </Box>
      <Box flex="1" bg="gray.50" shadow="inner">
        <Flex mx="auto" p="8" maxW="2xl" flex="1" w="full">
          <Flex flexDirection="column" w="full">
            <Heading as="h3" py="4" size="sm" alignSelf="start">
              Search Preferences
            </Heading>
            <Stack spacing={5} direction="column">
              <Box>
                <Text>Seller Location</Text>
                <Stack pl={4} mt={1} spacing={1}>
                  {locations.map((l) => (
                    <Checkbox
                      key={l}
                      isChecked={sessionLocation.includes(l)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSessionLocation((p) => [l, ...p]);
                        } else {
                          if (sessionLocation.length <= 1) return;
                          setSessionLocation((p) => p.filter((i) => i !== l));
                        }
                      }}>
                      {l}
                    </Checkbox>
                  ))}
                </Stack>
              </Box>
              <Flex>
                <Box mr="5">
                  <Text pb="2">Ratings above</Text>
                  <Stack pl={4} spacing={2} direction="column">
                    {itemRating.map((i) => (
                      <Checkbox
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        }
                        key={i}
                        isChecked={sessionRatingsAbove === i}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSessionRatingsAbove(i);
                          }
                        }}>
                        {i}
                      </Checkbox>
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Text pb="2">Search Sort</Text>
                  <Stack pl={4} spacing={2} direction="column">
                    {searchSort.map((i) => (
                      <Checkbox
                        textTransform="capitalize"
                        key={i}
                        isChecked={sessionSearchSort === i}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSessionSearchSort(i);
                          }
                        }}>
                        {i}
                      </Checkbox>
                    ))}
                  </Stack>
                </Box>
              </Flex>
            </Stack>
          </Flex>
          <Flex flexDirection="column" w="full">
            <Box>
              <Heading as="h3" py="4" size="sm" alignSelf="start">
                UI Preferences
              </Heading>
              <Text>Default compare layout</Text>
              <Stack pl={4} spacing={1} direction="column">
                {compareLayouts.map((i) => (
                  <Checkbox
                    key={i}
                    textTransform="capitalize"
                    isChecked={sessionCompareLayout === i}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSessionCompareLayout(i);
                      }
                    }}>
                    {i}
                  </Checkbox>
                ))}
                <Checkbox
                  pt="2"
                  isChecked={sessionFilterPanelCollpsed}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSessionFilterPanelCollpsed(e.target.checked);
                    }
                  }}>
                  Auto collapse filter panel
                </Checkbox>
              </Stack>
            </Box>
            <Box>
              <Flex flexDirection="column" w="full">
                <Heading as="h3" py="2" size="sm" alignSelf="start">
                  Seller Preferences
                </Heading>
                <Stack pl={4} spacing={1} direction="column">
                  <Text>Seller Last active</Text>
                  {lastActiveDays.map((i) => (
                    <Checkbox
                      key={i}
                      textTransform="capitalize"
                      isChecked={sessionLastActiveDays === i}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSessionLastActiveDays(i);
                        }
                      }}>
                      {i} days
                    </Checkbox>
                  ))}
                </Stack>
                <Checkbox
                  mt="4"
                  isChecked={sessionFilterUnverified}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSessionFilterUnverified(e.target.checked);
                    }
                  }}>
                  Verified sellers only
                </Checkbox>
              </Flex>
            </Box>
            <Flex my="4">
              <ButtonGroup colorScheme="blue">
                <Button
                  variant="outline"
                  onClick={onReset}
                  leftIcon={
                    <svg
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  }>
                  Reset
                </Button>
                <Button
                  onClick={onSubmit}
                  rightIcon={
                    <svg
                      height="20px"
                      width="20px"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                  }>
                  Save
                </Button>
              </ButtonGroup>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Settings;
