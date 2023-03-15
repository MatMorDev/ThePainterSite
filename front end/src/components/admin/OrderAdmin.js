import { Row, Col, Button, Form } from "react-bootstrap";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useState } from "react";
const OrderAdmin = ({
  order,
  toggleModifyOrder,
  modifyOrder,
  handlePutOrder,
  customerId,
  handleDeleteOrder,
}) => {
  let propPaid = "";
  let paid = "";
  const defaultOrder = {
    quantity: order.quantity,
    paid: order.paid,
    orderStatus: order.orderStatus,
  };
  const [inputState, setInputState] = useState(defaultOrder);

  const handleInputChange = (input, value) => {
    const newInputState = { ...inputState, [input]: value };
    setInputState(newInputState);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handlePutOrder(customerId, order.id, inputState);
  };

  // prop di colore in base a parametri
  if (order.paid === true) {
    paid = "Paid";
    propPaid = "#008000";
  }
  if (order.paid === false) {
    paid = "Not paid";
    propPaid = "#800000";
  }
  let propColor = "#DCDCDC";
  if (order.orderStatus === "NEW") {
    propColor = "#87CEFA";
  }
  if (order.orderStatus === "INPROGRESS") {
    propColor = "#90EE90";
  }
  if (order.orderStatus === "DELIVERED") {
    propColor = "#9370DB";
  }
  if (order.orderStatus === "CANCELED") {
    propColor = "#F08080";
  }
  if (order.orderStatus === "CLOSED") {
    propColor = "#DAA520";
  }

  // form per modifica ordine
  let modifyOrderContent = <></>;
  if (modifyOrder.id === order.id && modifyOrder.state === true) {
    modifyOrderContent = (
      <Form onSubmit={handleSubmit}>
        <Row className="mb-1" style={{ background: "white" }}>
          <Col sm={1} className="d-flex flex-start mt-1"></Col>
          <Col sm={3} className="my-1">
            <Button
              style={{ height: "25px" }}
              variant="success"
              size="sm"
              className="mb-1 ms-1 p-0 px-1"
              type="submit"
            >
              Modify order <BsPencilFill />
            </Button>
          </Col>
          <Col sm={2} className="my-1">
            <Form.Select
              id="orderStatus"
              onChange={(e) => {
                handleInputChange(e.target.id, e.target.value);
              }}
            >
              <option value={order.orderStatus}>{order.orderStatus}</option>
              <option value="NEW">NEW</option>
              <option value="INPROGRESS">INPROGRESS</option>
              <option value="DELIVERED">DELIVERED</option>
              <option value="CANCELED">CANCELED</option>
              <option value="CLOSED">CLOSED</option>
            </Form.Select>
          </Col>
          <Col sm={2} className="my-1">
            <Form.Select
              id="paid"
              onChange={(e) => {
                handleInputChange(e.target.id, e.target.value);
              }}
            >
              <option value={inputState.paid}>{paid}</option>
              <option value="true">Paid</option>
              <option value="false">Not paid</option>
            </Form.Select>
          </Col>
          <Col sm={1} className="my-1">
            <Form.Group controlId="quantity">
              <Form.Control
                type="number"
                placeholder={order.quantity}
                min="1"
                value={inputState.quantity}
                onChange={(e) => {
                  handleInputChange(e.target.id, e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={3} className="my-1">
            <Button
              style={{ height: "25px" }}
              variant="danger"
              size="sm"
              className="mb-1 ms-1 p-0 px-1"
              type="button"
              onClick={() => {
                handleDeleteOrder(customerId, order.id);
              }}
            >
              Cancel order
              <BsFillTrashFill className="ms-1" />
            </Button>
          </Col>
        </Row>
      </Form>
    );
  } else {
    modifyOrderContent = <></>;
  }

  // return order singolo
  return (
    <>
      <Row>
        <Col sm={1}>
          ({order.id})
          <Button
            variant="primary"
            size="sm"
            className="mb-1 ms-1 p-0 px-1"
            type="button"
            onClick={() => {
              toggleModifyOrder(order.id);
            }}
          >
            <BsPencilFill />
          </Button>
        </Col>
        <Col sm={3}>{order.localDateTime}</Col>
        <Col sm={2} style={{ background: propColor, fontWeight: "bold" }}>
          {order.orderStatus}
        </Col>
        <Col sm={2} style={{ color: propPaid, fontWeight: "bold" }}>
          {paid}
        </Col>
        <Col sm={1}>[{order.quantity}]</Col>
        <Col sm={3}>{order.service[0].title}</Col>
      </Row>
      {modifyOrderContent}
    </>
  );
};
export default OrderAdmin;
