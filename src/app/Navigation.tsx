"use client";

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FC } from "react";

type Props = {
  totalPages: number;
};

const Navigation: FC<Props> = ({ totalPages }) => {
  const params = useSearchParams();
  const unsafePage = pickNonNegativeNumberFromSearchParams(params, "page") ?? 1;
  const router = useRouter();
  const page = safeNumber(unsafePage, totalPages);

  return (
    <Flex align="center" gap="5">
      <Box flex="1">
        <Button onClick={() => router.replace(buildURL(page - 1))}>
          Previous
        </Button>
      </Box>
      <Text>
        Page {page} of {totalPages}
      </Text>
      <Box flex="1">
        <Button onClick={() => router.replace(buildURL(page + 1))}>Next</Button>
      </Box>
    </Flex>
  );
};

export default Navigation;

function pickNonNegativeNumberFromSearchParams(
  searchParams: ReadonlyURLSearchParams,
  param: string
) {
  const value = searchParams.get(param);
  if (Array.isArray(value)) return;
  if (value == null) return;
  if (value === "") return;
  const parsed = parseInt(value);
  if (isNaN(parsed)) return;
  if (parsed < 0) return;
  return parsed;
}

function safeNumber(pageNumber: number, totalPages: number) {
  return Math.min(Math.max(pageNumber, 1), totalPages);
}

function buildURL(pageNumber: number) {
  return `/?page=${pageNumber}`;
}
