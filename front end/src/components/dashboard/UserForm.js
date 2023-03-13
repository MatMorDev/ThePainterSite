import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { putCustomer, putSubscriber } from "../../api";
const UserForm = ({ customer, toggleShowEdit, thisSubscriber }) => {
  const defaultInputState = {
    password: customer.password,
    firstName: customer.firstName,
    lastName: customer.lastName,
    dateOfBirth: customer.dateOfBirth,
    email: customer.email,
    address: customer.address,
    city: customer.city,
    cap: customer.cap,
    phoneNumber: customer.phoneNumber,
    serviceBought: customer.serviceBought,
  };
  const defaultSubscriber = {
    username: thisSubscriber.username,
    password: thisSubscriber.password,
    firstName: thisSubscriber.firstName,
    lastName: thisSubscriber.lastName,
    dateOfBirth: thisSubscriber.dateOfBirth,
    email: thisSubscriber.email,
    address: thisSubscriber.address,
    city: thisSubscriber.city,
    cap: thisSubscriber.cap,
    phoneNumber: thisSubscriber.phoneNumber,
    comments: thisSubscriber.comments,
  };
  const [inputState, setInputState] = useState(defaultInputState);
  const [inputSubscriber, setInputSubscriber] = useState(defaultSubscriber);
  const [inputErrors, setInputErrors] = useState({});

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
    const newInputSubscriber = { ...inputSubscriber, [input]: value };
    setInputSubscriber(newInputSubscriber);
  };

  const validateCustomer = (inputObject) => {
    const errorObj = {};
    if (inputObject.firstName === "") {
      errorObj.firstName = "Customer name is mandatory";
    }
    if (inputObject.lastName === "") {
      errorObj.lastName = "Customer last name is mandatory";
    }
    if (inputObject.dateOfBirth === "") {
      errorObj.dateOfBirth = "Customer date of birth is mandatory";
    }
    if (inputObject.address === "") {
      errorObj.address = "Customer address is mandatory";
    }
    if (inputObject.city === "") {
      errorObj.city = "Customer city is mandatory";
    }
    if (inputObject.credit === "") {
      errorObj.cap = "Customer cap is mandatory";
    }
    if (inputObject.phoneNumber === "") {
      errorObj.cap = "Customer phoneNumber is mandatory";
    }
    return errorObj;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errorObject = validateCustomer(inputState);
    if (Object.keys(errorObject).length === 0) {
      const responseCustomer = await putCustomer(customer.id, inputState);
      if (responseCustomer.ok) {
        const responseSubscriber = await putSubscriber(
          thisSubscriber.id,
          inputSubscriber
        );
        if (responseSubscriber.ok) {
          console.log("modificato subscriber");
        } else {
          console.log(responseSubscriber.data);
        }
        // mostro messaggio di successo
        toggleShowEdit();
        setInputErrors({});
        setInputState(defaultInputState);
        console.log("modificato customer");
      } else {
        console.log(responseCustomer.data);
      }
    } else {
      setInputErrors(errorObject);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-1" controlId="firstName">
          <Form.Label className="h6 mb-1">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.firstName}
            value={inputState.firstName}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.firstName ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.firstName}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1" controlId="lastName">
          <Form.Label className="h6 mb-1">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.lastName}
            value={inputState.lastName}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.lastName ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="dateOfBirth">
          <Form.Label className="h6 mb-1">date of birth</Form.Label>
          <Form.Control
            type="date"
            placeholder={customer.dateOfBirth}
            value={inputState.dateOfBirth}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.dateOfBirth ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.dateOfBirth}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="address">
          <Form.Label className="h6 mb-1">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.address}
            value={inputState.address}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.address ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.address}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="city">
          <Form.Label className="h6 mb-1">City</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.city}
            value={inputState.city}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.city ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.city}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1" controlId="cap">
          <Form.Label className="h6 mb-1">Cap</Form.Label>
          <Form.Control
            type="number"
            placeholder={customer.cap}
            value={inputState.cap}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
            isInvalid={inputErrors.cap ? true : false}
          />
          <Form.Control.Feedback type="invalid">
            {inputErrors.cap}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1" controlId="phoneNumber">
          <Form.Label className="h6 mb-1">Phone number</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.phoneNumber}
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

        <Button
          variant="primary"
          type="submit"
          className="mt-2 me-2"
          onClick={handleSubmit}
        >
          Submit changes
        </Button>

        <Button
          variant="secondary"
          type="button"
          className="mt-2"
          onClick={toggleShowEdit}
        >
          Close
        </Button>
      </Form>
    </>
  );
};
export default UserForm;
