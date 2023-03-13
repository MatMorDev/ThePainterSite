import Order from "./Order";
import { useState } from "react";
const OrderList = ({ customer, getUserData }) => {
  const [idBtn, setIdBtn] = useState(0);
  const customerOrder = customer.serviceBought;

  if (customerOrder === undefined) {
    return (
      <>
        <div>Loading data..</div>
      </>
    );
  } else if (customerOrder.length === 0) {
    return (
      <>
        <div>There is no orders</div>
      </>
    );
  } else {
    return customerOrder.map((element) => {
      return (
        <div className="d-flex my-1  justify-content-evenly" key={element.id}>
          <Order
            order={element}
            idBtn={idBtn}
            setIdBtn={setIdBtn}
            customer={customer}
            getUserData={getUserData}
          />
        </div>
      );
    });
  }
};
export default OrderList;
