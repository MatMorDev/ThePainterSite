import { useState } from "react";
import { Button } from "react-bootstrap";
import { putOrder } from "../../api";
const Order = ({ order, idBtn, setIdBtn, customer, getUserData }) => {
  const [show, setShow] = useState(false);

  const handlePay = (value) => {
    putOrder(customer.id, value, {
      quantity: order.quantity,
      paid: true,
      orderStatus: "INPROGRESS",
    });
    getUserData();
    window.alert("The order " + order.id + " is paid");
  };

  const handleShow = (value) => {
    setIdBtn(parseInt(value));
    setShow(true);
    if (show && idBtn === order.id) {
      setShow(false);
      setIdBtn(0);
    }
  };

  let paid = <></>;
  let propOrder = `primary`;
  let btnPayNow = <></>;
  if (order.paid) {
    paid = <span>Payment submitted</span>;
    if (order.orderStatus === "DELIVERED") {
      propOrder = `success`;
    }
  } else {
    paid = <span>Need to pay</span>;
    propOrder = `warning`;
    btnPayNow = (
      <>
        <Button
          value={order.id}
          onClick={(e) => {
            handlePay(e.target.value);
          }}
          variant="primary"
        >
          Pay now
        </Button>
      </>
    );
  }

  let orderData = <></>;
  const btnShow = (
    <Button
      value={order.id}
      onClick={(e) => {
        handleShow(e.target.value);
      }}
      variant={propOrder}
    >
      Show Order id: {order.id}
    </Button>
  );

  if (show && idBtn === order.id) {
    orderData = (
      <div className="my-1">
        {btnShow}
        <div>
          <hr className="m-1" />
          Date:<span className="ms-1">{order.localDateTime}</span>
        </div>
        <div>
          Service:<span className="ms-1">{order.service[0].title}</span>
        </div>
        <div>
          Quantity:<span className="ms-1">{order.quantity}</span>
        </div>
        <div>
          Paid:<span className="ms-1">{paid}</span>
        </div>
        <div>
          Status:<span className="ms-1">{order.orderStatus}</span>
        </div>
        <div className="text-center"> {btnPayNow}</div>

        <hr className="m-1" />
      </div>
    );
  } else {
    orderData = <> {btnShow}</>;
  }

  return <>{orderData}</>;
};
export default Order;
