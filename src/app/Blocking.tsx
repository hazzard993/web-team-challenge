"use client";

import { useColorModeValue } from "@/components/ui/color-mode";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/modal";
import { Button, Input, useDisclosure } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";

const Blocking = () => {
  const [email, setStoredEmail] = useLocalStorage("email");
  const [jobTitle, setStoredJobTitle] = useLocalStorage("jobTitle");

  const emailRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);

  const { open, onOpen, onClose } = useDisclosure();

  const background = useColorModeValue("white", "black");

  const handleSubmit = useCallback(() => {
    if (emailRef.current == null) return;
    if (jobTitleRef.current == null) return;

    setStoredEmail(emailRef.current.value);
    setStoredJobTitle(jobTitleRef.current.value);
  }, [emailRef, jobTitleRef]);

  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={open} onClose={onClose}>
        <ModalOverlay bgColor={background} />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                ref={emailRef}
                defaultValue={typeof email === "string" ? email : undefined}
                disabled={typeof email === "object"}
              />
              <FormLabel>Job Title</FormLabel>
              <Input
                type="text"
                ref={jobTitleRef}
                defaultValue={
                  typeof jobTitle === "string" ? jobTitle : undefined
                }
                disabled={typeof email === "object"}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

type Unavailable = { reason: string };

function useLocalStorage(key: string) {
  const [state, setState] = useState<string | Unavailable>({
    reason: "waiting on effect",
  });

  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value == null) return;
    setState(value);
  }, [state]);

  const setValue = useCallback(
    (value: string) => {
      setState(state);
      localStorage.setItem(key, value);
    },
    [state]
  );

  return [state, setValue] as const;
}

export default Blocking;
