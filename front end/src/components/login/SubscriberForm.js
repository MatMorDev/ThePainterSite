import { Form, Button, Container } from "react-bootstrap";
import { useState } from "react";
import "./LogInRegisterForm.css";
import { postCustomer, postSubscriber } from "../../api";
import AlertNewSubscriber from "./AlertNewSubscriber";
import ReactiveButton from "reactive-button";

const SubscriberForm = ({ handleToggle }) => {
  const defaultInputState = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    cap: "",
    phoneNumber: "",
    comments: [],
  };
  const defaultCustomer = {
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    address: "",
    city: "",
    cap: "",
    phoneNumber: "",
    serviceBought: [],
  };
  const [inputState, setInputState] = useState(defaultInputState);
  const [inputCustomer, setinputCustomer] = useState(defaultCustomer);
  const [inputErrors, setInputErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    const newInputCustomer = {
      password: inputState.password,
      firstName: inputState.firstName,
      lastName: inputState.lastName,
      dateOfBirth: inputState.dateOfBirth,
      email: inputState.email,
      address: inputState.address,
      city: inputState.city,
      cap: inputState.cap,
      phoneNumber: inputState.phoneNumber,
      serviceBought: [],
    };
    setInputState(newInputState);
    setinputCustomer(newInputCustomer);
  };

  // valido che i campi obbligatori siano inseriti
  const validate = (inputObject) => {
    const errorObj = {};
    if (inputObject.username === "") {
      errorObj.username = "Username is mandatory";
    }
    if (inputObject.password === "") {
      errorObj.password = "Password is mandatory";
    }
    if (inputObject.email === "") {
      errorObj.email = "Email is mandatory";
    }
    if (inputObject.phoneNumber === "") {
      errorObj.phoneNumber = "Phone number is mandatory";
    }
    return errorObj;
  };

  // gestisco la richiesta di submit e richiamo la POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorObject = validate(inputState);
    if (Object.keys(errorObject).length === 0) {
      const response = await postSubscriber(inputCustomer);
      if (response.ok) {
        // faccio anche la post del customer con gli stessi dati
        const responseCustomer = await postCustomer(inputCustomer);
        if (responseCustomer.ok) {
          setinputCustomer(defaultCustomer);
        } else {
          console.log(responseCustomer.data);
        }
        // mostro messaggio di successo
        setInputErrors({});
        setInputState(defaultInputState);
        setShowAlert(true);
        window.scrollTo(0, 0);
      } else {
        console.log(response.data);
      }
    } else {
      setInputErrors(errorObject);
    }
  };
  let submitForm = <></>;
  if (!showAlert) {
    submitForm = (
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Form onSubmit={handleSubmit}>
          <div className="p-3 border mt-4 ">
            <p>Create a new account The Painter</p>
            <p>
              Already have a The Painter account? Awesome!
              <Button
                id="toggle"
                variant="text"
                onClick={() => handleToggle()}
                style={{ fontWeight: "bold", textDecoration: "underline" }}
              >
                Sign In here
              </Button>
            </p>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={inputState.username}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
                isInvalid={inputErrors.username ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                value={inputState.password}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
                isInvalid={inputErrors.password ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="firstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                value={inputState.firstName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label className="mt-1">Last name</Form.Label>
              <Form.Control
                type="text"
                value={inputState.lastName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="dateOfBirth">
              <Form.Label className="mt-1">Date of birth</Form.Label>
              <Form.Control
                type="date"
                value={inputState.dateOfBirth}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label className="mt-1">Email</Form.Label>
              <Form.Control
                type="text"
                value={inputState.email}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
                isInvalid={inputErrors.email ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.email}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label className="mt-1">Address</Form.Label>
              <Form.Control
                type="text"
                value={inputState.address}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label className="mt-1">City</Form.Label>
              <Form.Control
                type="text"
                value={inputState.city}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="cap">
              <Form.Label className="mt-1">Cap</Form.Label>
              <Form.Control
                type="number"
                value={inputState.cap}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label className="mt-1">Phone number</Form.Label>
              <Form.Control
                type="number"
                value={inputState.phoneNumber}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
                isInvalid={inputErrors.phoneNumber ? true : false}
              />
              <Form.Control.Feedback type="invalid">
                {inputErrors.phoneNumber}
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <Button
            id="btnContinue"
            variant="success"
            type="submit"
            className="my-3"
          >
            Create Account
          </Button>
        </Form>
      </Container>
    );
  } else {
    submitForm = (
      <div className="p-3 border mt-4 d-flex flex-column text-center container">
        <p>Now you can log in!</p>
        <ReactiveButton
          color="blue"
          idleText="Sign in here"
          loadingText="Loading"
          successText="Done"
          onClick={() => handleToggle()}
          style={{ fontSize: "1em", fontWeight: "bold", width: "200px" }}
        />
      </div>
    );
  }
  return (
    <>
      <AlertNewSubscriber
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        handleToggle={handleToggle}
      />
      {submitForm}
    </>
  );
};

export default SubscriberForm;
