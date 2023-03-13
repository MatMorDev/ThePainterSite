import "../cart/Cart.css";
import { Button } from "react-bootstrap";
import InfoDetailForm from "./InfoDetailForm";

const CustomerAndOrderDetails = ({
  serviceCart,
  customer,
  totalPrice,
  changeInfoShow,
  setChangeInfoShow,
  customerSubscriber,
}) => {
  const finalCart = serviceCart.map((element) => {
    return (
      <li key={element.id}>
        <span>
          Service: {element.title}, no° : {element.quantity}
        </span>
      </li>
    );
  });

  const orderDetails = (
    <>
      <div>Your Order</div>
      <div className="lists">
        <ul>{finalCart}</ul>
      </div>
    </>
  );

  const buttonInfo = (
    <Button
      variant="dark"
      className="ms-3 mb-3 mt-4"
      onClick={() => toggleChangeInfo()}
    >
      Change Info
    </Button>
  );

  const toggleChangeInfo = () => {
    setChangeInfoShow(!changeInfoShow);
  };

  let infoDetails = <></>;
  if (changeInfoShow) {
    infoDetails = (
      <>
        {orderDetails}
        <InfoDetailForm
          customer={customer}
          buttonInfo={buttonInfo}
          toggleChangeInfo={toggleChangeInfo}
          customerSubscriber={customerSubscriber}
        />
      </>
    );
  } else {
    infoDetails = (
      <>
        {orderDetails}
        <div>Shipping details</div>
        <div className="lists">
          <ul>
            <li key={1}>
              Name & surname:
              <p className="mb-1">
                {customer.lastName} {customer.firstName}
              </p>
            </li>
            <li key={2}>
              Address: <p className="mb-1">{customer.address}</p>
            </li>
            <li key={3}>
              CAP & City:
              <p className="mb-1">
                {customer.cap} - {customer.city}
              </p>
            </li>
          </ul>
          {buttonInfo}
        </div>
        <div>Total price: {totalPrice}€</div>
      </>
    );
  }

  return <>{infoDetails}</>;
};
export default CustomerAndOrderDetails;
