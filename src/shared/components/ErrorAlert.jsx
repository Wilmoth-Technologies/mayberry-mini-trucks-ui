
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export function ErrorAlert({ errorMessage, dismissFunction }) {
  return (
    <Alert
      color="failure"
      icon={HiInformationCircle}
      onDismiss={() => (dismissFunction({isError: false}))}
      rounded
    >
      <span className="font-medium">{errorMessage}</span>
    </Alert>
  );
}
