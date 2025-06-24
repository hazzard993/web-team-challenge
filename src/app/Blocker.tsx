"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalOverlay,
} from "@chakra-ui/modal";
import {
  Button,
  Flex,
  Input,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import UserMessage, { Message } from "./UserMessage";

const Blocker = () => {
  const [storedUsername, setStoredUsername] = useLocalStorage("username");
  const [storedJobTitle, setStoredJobTitle] = useLocalStorage("jobTitle");

  const usernameRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);

  const { open, onOpen, onClose, setOpen } = useDisclosure({
    defaultOpen: true,
  });

  const [message, setMessage] = useState<Message>({
    type: "need",
    hint: "Your username and job title need to be filled in here",
  });

  const background = useColorModeValue("white", "black");

  const handleSubmit = () => {
    if (usernameRef.current == null) return;
    if (jobTitleRef.current == null) return;

    setStoredUsername(usernameRef.current.value);
    setStoredJobTitle(jobTitleRef.current.value);

    const username = usernameRef.current?.value;
    const jobTitle = jobTitleRef.current?.value;
    const result = validate(username, jobTitle);
    if (result.type === "error") {
      setMessage({
        type: "invalid",
        hint: result.hint,
      });
      return;
    }

    setMessage({
      type: "success",
      text: "Your data was updated successfully!",
    });
  };

  const handleClose = () => {
    const username = usernameRef.current?.value;
    const jobTitle = jobTitleRef.current?.value;
    const result = validate(username, jobTitle);
    if (result.type === "error") {
      setMessage({
        type: "invalid",
        hint: result.hint,
      });
      return;
    }

    onClose();
    setOpen(false);
  };

  return (
    <>
      <Button variant="ghost" onClick={onOpen}>
        View your data
      </Button>

      <Modal isOpen={open} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent
          bgColor={background}
          maxW="40rem"
          m="8em auto"
          p="20"
          gap="20"
        >
          <Flex alignItems="start">
            <ModalHeader flex="1" fontSize="larger" fontWeight="bold">
              Data Required
            </ModalHeader>
            <ModalCloseButton alignSelf="center" />
          </Flex>

          <ModalBody>
            <Text mb="5">Please enter your username and job title below.</Text>
            <FormControl mb="15">
              <Stack gap="5">
                <Stack>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    ref={usernameRef}
                    defaultValue={
                      storedUsername.type === "filled"
                        ? storedUsername.value
                        : undefined
                    }
                    disabled={storedUsername.type === "loading"}
                  />
                </Stack>

                <Stack>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    type="text"
                    ref={jobTitleRef}
                    defaultValue={
                      storedJobTitle.type === "filled"
                        ? storedJobTitle.value
                        : undefined
                    }
                    disabled={storedJobTitle.type === "loading"}
                  />
                </Stack>
              </Stack>
            </FormControl>
            {message != null && <UserMessage message={message} />}
          </ModalBody>
          <ModalFooter>
            <Flex gap="5" alignItems="center">
              <Text fontSize="sm">
                This information is saved to your local storage
              </Text>
              <Button colorScheme="blue" onClick={handleSubmit}>
                Update
              </Button>
              <ModalCloseButton variant="ghost">Close</ModalCloseButton>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Blocker;

type Loading = { type: "loading" };
type Empty = { type: "empty" };
type Filled = { type: "filled"; value: string };
type LocalStorageResult = Loading | Empty | Filled;

function useLocalStorage(key: string) {
  const [state, setState] = useState<LocalStorageResult>({ type: "loading" });

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value == null) {
      setState({ type: "empty" });
      return;
    }

    setState({ type: "filled", value });
  }, [key]);

  const setValue = useCallback(
    (value: string) => {
      if (value === "") {
        localStorage.removeItem(key);
        setState({ type: "empty" });
        return;
      }

      localStorage.setItem(key, value);
      setState({ type: "filled", value });
    },
    [key]
  );

  return [state, setValue] as const;
}

type Err = { type: "error"; hint: string };
type Success = { type: "success" };
type ValidationResult = Err | Success;

function validate(
  username: string | undefined,
  jobTitle: string | undefined
): ValidationResult {
  if (username == null) {
    return { type: "error", hint: "Please fill in the username field." };
  }

  if (username === "") {
    return { type: "error", hint: "Please fill in the username field." };
  }

  if (jobTitle == null) {
    return { type: "error", hint: "Please fill in the job title field." };
  }

  if (jobTitle === "") {
    return { type: "error", hint: "Please fill in the job title field." };
  }

  return { type: "success" };
}
