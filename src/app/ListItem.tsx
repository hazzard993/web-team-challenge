import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Character } from "../../types/Character";

type Props = {
  character: Character;
  onClick: (character: Character) => void;
};

const ListItem: FC<Props> = ({ character, onClick }) => {
  const handleOnClick = () => {
    onClick(character);
  };

  return (
    <Box
      width="32"
      alignItems="center"
      _hover={{ border: "px", borderColor: "white" }}
      onClick={handleOnClick}
    >
      <Image src={character.image} />
      <Text textAlign="center">{character.name}</Text>
    </Box>
  );
};

export default ListItem;
