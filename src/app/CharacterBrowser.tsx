"use client";

import { Flex, Image, Stack, Text, useDisclosure } from "@chakra-ui/react";
import ListItem from "./ListItem";
import { FC, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/modal";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Character } from "../../types/Character";

type Props = {
  characters: Character[];
};

const CharacterBrowser: FC<Props> = ({ characters }) => {
  const [character, setCharacter] = useState<Character | undefined>();
  const { open, onClose, setOpen } = useDisclosure();
  const background = useColorModeValue("white", "black");

  const handleItemClick = (character: Character) => {
    setCharacter(character);
    setOpen(true);
  };

  const handleCloseButtonClick = () => {
    setCharacter(undefined);
    onClose();
  };

  return (
    <>
      <Modal isOpen={open} onClose={onClose}>
        <ModalContent
          bgColor={background}
          maxW="40rem"
          m="8em auto"
          p="20"
          gap="20"
        >
          <Flex alignItems="start">
            <ModalHeader flex="1" fontSize="larger" fontWeight="bold">
              Character Information
            </ModalHeader>
            <ModalCloseButton alignSelf="center" />
          </Flex>

          <ModalBody>
            <Flex gap="10">
              <Image
                src={character?.image}
                boxSize="40"
                borderRadius="2xl"
                alt={`An image of ${character?.name}`}
              />
              <Stack as="dl">
                <Text as="dt" fontWeight="bold">
                  Name
                </Text>
                <Text as="dd">{character?.name}</Text>
                <Text as="dt" fontWeight="bold">
                  Status
                </Text>
                <Text as="dd">{character?.status}</Text>
                <Text as="dt" fontWeight="bold">
                  Species
                </Text>
                <Text as="dd">{formatSpecies(character)}</Text>
                <Text as="dt" fontWeight="bold">
                  Gender
                </Text>
                <Text as="dd">{character?.gender}</Text>
              </Stack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <ModalCloseButton variant="ghost" onClick={handleCloseButtonClick}>
              Close
            </ModalCloseButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex gap="4" wrap="wrap">
        {characters.map((character, index) => (
          <ListItem
            character={character}
            key={index}
            onClick={handleItemClick}
          />
        ))}
      </Flex>
    </>
  );
};

export default CharacterBrowser;

function formatSpecies(character: Character | undefined) {
  if (character?.type == "") {
    return <>{character?.species}</>;
  }

  return (
    <>
      {character?.species} ({character?.type})
    </>
  );
}
