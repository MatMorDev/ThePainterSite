import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsArrowBarLeft } from "react-icons/bs";
import CartProduct from "./CartProduct";
import { postCustomerOrder } from "../../api";
import CustomerAndOrderDetails from "./CustomerOrderDetails";
import AlertOrder from "./AlertOrder";
import { Badge } from "react-bootstrap";

const Cart = ({
  serviceCart,
  setServiceCart,
  customer,
  customerSubscriber,
}) => {
  const [show, setShow] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [changeInfoShow, setChangeInfoShow] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);

  let badgeCounter = 0;
  if (badgeCounter === 0) {
    badgeCounter = null;
  }
  let totalPrice = 0;

  const handleClose = () => setShow(false);
  const handleCloseCustomer = () => setShowCustomer(false);
  const handleShow = () => setShow(true);

  // funzione per rimuovere, aggiungere od eliminare le quantità degli articoli nel carrello
  const handleAddRemove = (id, value) => {
    let oldQuantity = 0;
    let newCart = [];
    serviceCart.forEach((el) => {
      if (el.id === id) {
        oldQuantity = el.quantity;
        if (value === "+") {
          newCart.push({
            id: el.id,
            title: el.title,
            price: el.price,
            quantity: oldQuantity + 1,
          });
        }
        if (value === "-") {
          if (el.quantity > 1) {
            newCart.push({
              id: el.id,
              title: el.title,
              price: el.price,
              quantity: oldQuantity - 1,
            });
          }
        }
      } else {
        newCart.push(el);
      }
    });
    setServiceCart(newCart);
  };
  // handle per cambiare offCanvas
  const handleReturnCart = () => {
    setShowCustomer(false);
    setShow(true);
  };

  //handle per continuare con l'ordine o verificare se può procedere
  const handleContinueOrder = () => {
    if (customer.id === 0 || undefined || isNaN(customer.id)) {
      setShow(false);
      customerSubscriber();
      setShowCustomer(true);
    } else {
      setShow(false);
      setShowCustomer(true);
    }
  };
  //handle per registrare l'ordine finale al backend
  const handleCompleteOrder = () => {
    serviceCart.forEach((element) => {
      postCustomerOrder(customer.id, element.id, element.quantity);
      setShowCustomer(false);
      setShowCompleted(true);
      setServiceCart([]);
    });
  };

  // per la generazione e gestione dei cartProducts
  const cartItems = serviceCart.map((element) => {
    totalPrice += element.quantity * element.price;
    badgeCounter += element.quantity;
    return (
      <CartProduct
        handleAddRemove={handleAddRemove}
        servId={element.id}
        setServiceCart={setServiceCart}
        servTitle={element.title}
        servQuantity={element.quantity}
        key={element.id}
      />
    );
  });

  let customerAndOrderDetails = <></>;
  let buttonConfirmOrder = <></>;
  let alertLogin = <></>;
  let buttonOrder = <></>;
  if (showCustomer === true) {
    if (customer.id === 0 || isNaN(customer.id)) {
      alertLogin = (
        <div className="alert alert-danger" role="alert">
          You must be logged in before place an order
        </div>
      );
      buttonConfirmOrder = <></>;
    } else {
      alertLogin = <></>;
      if (serviceCart.length !== 0 && changeInfoShow === false) {
        buttonConfirmOrder = (
          <Button
            variant="success"
            onClick={handleCompleteOrder}
            className="mt-2"
          >
            <AiOutlineShoppingCart /> Place your order
          </Button>
        );
      }
      customerAndOrderDetails = (
        <CustomerAndOrderDetails
          serviceCart={serviceCart}
          customer={customer}
          totalPrice={totalPrice}
          changeInfoShow={changeInfoShow}
          setChangeInfoShow={setChangeInfoShow}
          customerSubscriber={customerSubscriber}
        />
      );
    }
    buttonOrder = (
      <Button
        variant="warning"
        onClick={handleReturnCart}
        className="me-3 mt-2"
      >
        <BsArrowBarLeft /> Return to cart
      </Button>
    );
  } else {
    alertLogin = <></>;
    buttonOrder = (
      <Button variant="primary" onClick={handleContinueOrder}>
        <AiOutlineShoppingCart /> Continue order
      </Button>
    );
  }

  // come si presenta il carrello nel caso di gestire gli item o di completare l'ordine
  return (
    <>
      <Button variant="dark" onClick={handleShow} id="btn-cart">
        <AiOutlineShoppingCart className="me-1" />
        Cart
        <Badge pill bg="warning" text="dark" className="ms-1">
          {badgeCounter}
        </Badge>
      </Button>

      <AlertOrder
        showCompleted={showCompleted}
        setShowCompleted={setShowCompleted}
      />

      <Offcanvas show={show} onHide={handleClose} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>Your Cart</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <ul>{cartItems}</ul>
          <div>Total price: {totalPrice}€</div>
          <div className="mt-3 ms-3">{buttonOrder}</div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas show={showCustomer} onHide={handleCloseCustomer} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>Your details</h1>
            {alertLogin}
            {customerAndOrderDetails}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <div className="mt-0 ms-3">
            {buttonOrder}
            {buttonConfirmOrder}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default Cart;
