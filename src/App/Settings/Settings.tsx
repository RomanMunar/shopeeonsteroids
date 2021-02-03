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
import { Reset, Save, Star } from "src/components/icons";
import {
  compareLayouts,
  itemRating,
  lastActiveDays,
  locations,
  searchSort,
} from "src/lib/data/constants";
import { defaultSettings, Settings as ISettings } from "src/lib/data/defaultSearchSettings";
import { getLocaleStorageSettings, setLocalStorageSettings } from "src/lib/utils/localStorage";

const Settings = () => {
  const toast = useToast();
  const settings = getLocaleStorageSettings();
  const [sessionSettings, setSessionSettings] = useState<ISettings>({
    filterPanelCollapsed: settings.filterPanelCollapsed,
    compareLayout: settings.compareLayout,
    searchSort: settings.searchSort,
    sellerLocation: settings.sellerLocation,
    itemRatingOnly: settings.itemRatingOnly,
    shopeeVerifiedOnly: settings.shopeeVerifiedOnly,
    lastActive: settings.lastActive,
  });

  const onSubmit = () => {
    toast({
      position: "top",
      status: "success",
      title: "Changes saved successfully.",
      isClosable: true,
    });
    setLocalStorageSettings(sessionSettings);
  };

  const onReset = () => {
    setLocalStorageSettings(defaultSettings);
    toast({
      position: "top",
      title: "Reset Settings",
      isClosable: true,
    });
    setSessionSettings(defaultSettings);
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
        <Flex
          flexDirection={["column", "row"]}
          mx="auto"
          p="8"
          maxW="2xl"
          flex="1"
          w="full"
          pb="20">
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
                      isChecked={sessionSettings.sellerLocation.includes(l)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSessionSettings((p) => {
                            return {
                              ...p,
                              sellerLocation: [l, ...sessionSettings.sellerLocation],
                            };
                          });
                        } else {
                          if (sessionSettings.sellerLocation.length <= 1) return;
                          setSessionSettings((p) => {
                            return {
                              ...p,
                              sellerLocation: sessionSettings.sellerLocation.filter((i) => i !== l),
                            };
                          });
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
                        icon={<Star />}
                        key={i}
                        isChecked={sessionSettings.itemRatingOnly === i}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSessionSettings((p) => {
                              return { ...p, itemRatingOnly: i };
                            });
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
                        isChecked={sessionSettings.searchSort === i}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSessionSettings((p) => {
                              return { ...p, searchSort: i };
                            });
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
                    isChecked={sessionSettings.compareLayout === i}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSessionSettings((p) => {
                          return { ...p, compareLayout: i };
                        });
                      }
                    }}>
                    {i}
                  </Checkbox>
                ))}
                <Checkbox
                  pt="2"
                  isChecked={sessionSettings.filterPanelCollapsed}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSessionSettings((p) => {
                        return { ...p, filterPanelCollapsed: e.target.checked };
                      });
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
                      isChecked={sessionSettings.lastActive === i}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSessionSettings((p) => {
                            return { ...p, lastActive: i };
                          });
                        }
                      }}>
                      {i} days
                    </Checkbox>
                  ))}
                </Stack>
                <Checkbox
                  mt="4"
                  isChecked={sessionSettings.shopeeVerifiedOnly}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSessionSettings((p) => {
                        return { ...p, shopeeVerifiedOnly: e.target.checked };
                      });
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
                  leftIcon={<Reset width="20px" height="20px" />}>
                  Reset
                </Button>
                <Button onClick={onSubmit} rightIcon={<Save width="20px" height="20px" />}>
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
