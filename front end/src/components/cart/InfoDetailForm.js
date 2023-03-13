import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { putCustomer } from "../../api";
const InfoDetailForm = ({
  customer,
  buttonInfo,
  toggleChangeInfo,
  customerSubscriber,
}) => {
  const [inputCustomer, setinputCustomer] = useState({
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
  });

  const handleInputChange = (input, value) => {
    setinputCustomer({ ...inputCustomer, [input]: value });
  };

  // gestisco la richiesta di submit e richiamo la POST
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await putCustomer(customer.id, inputCustomer);
    if (response.ok) {
      customerSubscriber();
      toggleChangeInfo();
    } else {
      console.log(response.data);
    }
  };

  return (
    <>
      <div>Shipping details</div>
      <Form>
        <Form.Group className="mb-1" controlId="firstName">
          <Form.Label className="h6 mb-1">Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.firstName}
            value={inputCustomer.firstName}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="lastName">
          <Form.Label className="h6 mb-1">Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.lastName}
            value={inputCustomer.lastName}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="address">
          <Form.Label className="h6 mb-1">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.address}
            value={inputCustomer.address}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="cap">
          <Form.Label className="h6 mb-1">Cap</Form.Label>
          <Form.Control
            type="number"
            placeholder={customer.cap}
            value={inputCustomer.cap}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="city">
          <Form.Label className="h6 mb-1">City</Form.Label>
          <Form.Control
            type="text"
            placeholder={customer.city}
            value={inputCustomer.city}
            onChange={(e) => {
              handleInputChange(e.target.id, e.target.value);
            }}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="mt-2"
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {buttonInfo}
      </Form>
    </>
  );
};
export default InfoDetailForm;
