import { Alert } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
  message: Message;
};

const UserMessage: FC<Props> = ({ message }) => {
  return (
    <>
      {message.type === "need" && (
        <Alert.Root status="info">
          <Alert.Indicator />
          <Alert.Title>{message.hint}</Alert.Title>
        </Alert.Root>
      )}

      {message.type === "invalid" && (
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>Invalid Input</Alert.Title>
            <Alert.Description>{message.hint}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {message.type === "success" && (
        <Alert.Root status="success">
          <Alert.Indicator />
          <Alert.Title>{message.text}</Alert.Title>
        </Alert.Root>
      )}
    </>
  );
};

export default UserMessage;

type NeedsInformation = { type: "need"; hint: string };
type InvalidInput = { type: "invalid"; hint: string };
type SubmittedSuccessfully = { type: "success"; text: string };
export type Message = NeedsInformation | InvalidInput | SubmittedSuccessfully;
