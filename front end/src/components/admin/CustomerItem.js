import { Row, Col, Button, Form } from "react-bootstrap";
import { useState } from "react";
import OrderListAdmin from "./OrderListAdmin";
const CustomerItem = ({
  item,
  handleDeleteCustomer,
  handlePutCustomer,
  handlePutOrder,
  handleDeleteOrder,
}) => {
  const [show, setShow] = useState(false);
  const [modify, setModify] = useState(false);
  const [modifyOrder, setModifyOrder] = useState({ state: false, id: 0 });
  const defaultSubscriber = {
    id: item.id,
    password: item.password,
    firstName: item.firstName,
    lastName: item.lastName,
    dateOfBirth: item.dateOfBirth,
    email: item.email,
    address: item.address,
    city: item.city,
    cap: item.cap,
    phoneNumber: item.phoneNumber,
    serviceBought: item.serviceBought,
  };
  const [inputState, setInputState] = useState(defaultSubscriber);

  // toggle per button
  const toggleOrder = () => {
    setModify(false);
    setShow(!show);
  };
  const toggleModify = () => {
    setShow(false);
    setModify(!modify);
  };

  const toggleModifyOrder = (orderId) => {
    // se non è mai stato cliccato
    if (modifyOrder.state === false && modifyOrder.id === 0) {
      setModifyOrder({ state: true, id: orderId });
    }
    // se in memoria c'è ed è stato cliccato allora chiudi
    if (modifyOrder.state === true && modifyOrder.id === orderId) {
      setModifyOrder({ state: false, id: 0 });
    }
    // se in memoria c'è ed è stato cliccato un altro allora cambi
    if (modifyOrder.state === true && modifyOrder.id !== orderId) {
      setModifyOrder({ state: true, id: orderId });
    }
  };

  // handle per metodi
  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };
  const handleSubmit = () => {
    toggleModify();
    handlePutCustomer(item.id, inputState);
  };

  // form customer
  let contentModify = <></>;
  if (modify) {
    contentModify = (
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Button variant="danger" className="mb-1" type="submit">
              Modify
            </Button>
          </Col>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Control
                type="text"
                placeholder={item.firstName}
                value={inputState.firstName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Control
                type="text"
                placeholder={item.lastName}
                value={inputState.lastName}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="dateOfBirth">
              <Form.Control
                type="date"
                placeholder={item.dateOfBirth}
                value={inputState.dateOfBirth}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder={item.email}
                value={inputState.email}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="address">
              <Form.Control
                type="text"
                placeholder={item.address}
                value={inputState.address}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="city">
              <Form.Control
                type="text"
                placeholder={item.city}
                value={inputState.city}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group controlId="cap">
              <Form.Control
                type="number"
                placeholder={item.cap}
                value={inputState.cap}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="phoneNumber">
              <Form.Control
                type="text"
                placeholder={item.phoneNumber}
                value={inputState.phoneNumber}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    );
  } else {
    contentModify = <></>;
  }

  // buttons customer
  let contentOrder = (
    <Row className="mb-1">
      <Col>
        <Button variant="primary" type="button" onClick={() => toggleOrder()}>
          Orders
        </Button>
      </Col>
      <Col>
        <Button variant="warning" type="button" onClick={() => toggleModify()}>
          Modify Customer
        </Button>
      </Col>
      <Col>
        <Button
          variant="danger"
          type="button"
          onClick={() => handleDeleteCustomer(item.id)}
        >
          Delete Customer
        </Button>
      </Col>
    </Row>
  );
  if (show) {
    contentOrder = (
      <>
        <Row className="mb-1">
          <Col>
            <Button
              variant="primary"
              type="button"
              onClick={() => toggleOrder()}
            >
              Orders
            </Button>
          </Col>
          <Col>
            <Button
              variant="warning"
              type="button"
              onClick={() => toggleModify()}
            >
              Modify Customer
            </Button>
          </Col>
          <Col>
            <Button
              variant="danger"
              type="button"
              onClick={() => handleDeleteCustomer(item.id)}
            >
              Delete Customer
            </Button>
          </Col>
          <Row className="contentDivTitle">
            <Col sm={1}>(id)</Col>
            <Col sm={3}>localDateTime</Col>
            <Col sm={2}>status</Col>
            <Col sm={2}>paid</Col>
            <Col sm={1}>[quantity]</Col>
            <Col sm={3}>service</Col>
          </Row>
          <div className="text-center" style={{ background: "#DCDCDC" }}>
            <OrderListAdmin
              orders={item.serviceBought}
              toggleModifyOrder={toggleModifyOrder}
              modifyOrder={modifyOrder}
              handlePutOrder={handlePutOrder}
              customerId={item.id}
              handleDeleteOrder={handleDeleteOrder}
            />
          </div>
        </Row>
      </>
    );
  }
  // return
  return (
    <div key={item.id} className="my-1">
      <Row>
        <Col>({item.id})</Col>
        <Col>
          {item.firstName} - {item.lastName}
        </Col>
        <Col>{item.dateOfBirth}</Col>
        <Col>{item.email}</Col>
        <Col>{item.address}</Col>
        <Col>
          {item.city} - {item.cap}
        </Col>
        <Col>{item.phoneNumber}</Col>
      </Row>
      {contentOrder}
      {contentModify}
    </div>
  );
};
export default CustomerItem;
