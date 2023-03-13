import Alert from "react-bootstrap/Alert";

const AlertNewSubscriber = ({ showAlert, setShowAlert, handleToggle }) => {
  const handleSuccessForm = () => {
    handleToggle();
    setShowAlert(false);
  };

  if (showAlert) {
    return (
      <Alert
        className="mt-2 container"
        show={showAlert}
        variant="success"
        onClose={handleSuccessForm}
        dismissible
      >
        <Alert.Heading>Congratulations!</Alert.Heading>
        <p>
          Your account is submitted succesfully! Now you will receive an email
          to your address with your personal Username and Password. Don't lose
          them, we will see you! Keep painting!
        </p>
      </Alert>
    );
  }
  return <></>;
};
export default AlertNewSubscriber;
