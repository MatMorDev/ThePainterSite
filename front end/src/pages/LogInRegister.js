import SubscriberForm from "../components/login/SubscriberForm";
import LogInForm from "../components/login/LogInForm";
import { useState } from "react";

const LogInRegister = ({ handleLoggedUser }) => {
  const [toggleForm, setToggleForm] = useState(false);

  const handleToggle = () => {
    setToggleForm(!toggleForm);
  };
  // faccio un toggle per la registrazione od il login a seconda della scelta dell'utente, di default è login
  let logInRegisterForm = <LogInForm setToggleForm={setToggleForm} />;
  toggleForm
    ? (logInRegisterForm = <SubscriberForm handleToggle={handleToggle} />)
    : (logInRegisterForm = (
        <LogInForm
          handleToggle={handleToggle}
          handleLoggedUser={handleLoggedUser}
        />
      ));

  return <>{logInRegisterForm}</>;
};
export default LogInRegister;
