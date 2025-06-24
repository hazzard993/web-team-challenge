import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import Blocking from "./Blocking";
import { getClient } from "../../ApolloClient";
import { gql } from "@apollo/client";
import { NextPage } from "next";
import ListItem from "./ListItem";
import Navigation from "./Navigation";
import CharacterBrowser from "./CharacterBrowser";

const GET_CHARACTERS = gql`
  query Characters($page: Int) {
    characters(page: $page) {
      results {
        name
        image
        status
        species
        type
        gender
      }
    }
  }
`;

type SearchParams = { [key: string]: string | string[] | undefined };

const Home: NextPage<{
  searchParams: Promise<SearchParams>;
}> = async ({ searchParams }) => {
  const params = await searchParams;
  const page = pickNonNegativeNumberFromSearchParams(params, "page") ?? 1;
  const { data } = await getClient().query({
    query: GET_CHARACTERS,
    variables: { page },
  });

  return (
    <Stack
      maxW={{ xl: "1200px" }}
      m="0 auto"
      minH="100vh"
      justifyContent="space-between"
    >
      <Stack align="center">
        <Blocking />

        <CharacterBrowser characters={data.characters.results} />
      </Stack>

      <Stack align="center">
        <Navigation totalPages={data.characters.results.length} />
        <Box as="footer">v3.5</Box>
      </Stack>
    </Stack>
  );
};

export default Home;

function pickNonNegativeNumberFromSearchParams(
  searchParams: SearchParams,
  param: string
) {
  const value = searchParams[param];
  if (Array.isArray(value)) return;
  if (value == null) return;
  if (value === "") return;
  const parsed = parseInt(value);
  if (isNaN(parsed)) return;
  if (parsed < 0) return;
  return parsed;
}
