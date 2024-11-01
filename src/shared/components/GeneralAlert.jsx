
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";

export function GeneralAlert({ message, dismissFunction }) {
  return (
    <Alert
      color="warning"
      icon={HiInformationCircle}
      onDismiss={() => (dismissFunction({isAlertOpen: false}))}
      rounded
    >
      <span className="font-medium">{message}</span>
    </Alert>
  );
}