
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export function SuccessAlert({ message, dismissFunction }) {
  return (
    <Alert
      color="success"
      icon={HiInformationCircle}
      onDismiss={() => (dismissFunction({isAlertOpen: false}))}
      rounded
    >
      <span className="font-medium">{message}</span>
    </Alert>
  );
}
