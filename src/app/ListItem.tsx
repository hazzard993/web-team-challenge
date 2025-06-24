import { Box, Image, Text } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  character: {
    name: string;
    image: string;
  };
};

const ListItem: FC<Props> = ({ character }) => {
  return (
    <Box width="32" alignItems="center" _hover={{ borderColor: "white" }}>
      <Image src={character.image} />
      <Text textAlign="center">{character.name}</Text>
    </Box>
  );
};

export default ListItem;
