import CardOrders from "../admin/CardOrders";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const AdminService = ({ customers }) => {
  const [allOrders, setAllOrders] = useState({});
  const [allUserOrder, setAllUserOrder] = useState({});
  console.log(allUserOrder);
  // ad inizio mi suddivide gli ordini che trova
  const handleOrders = () => {
    let allOrdersTemp = [];
    let newOrders = [];
    let ordersProgress = [];
    let ordersDelivered = [];
    let ordersClosed = [];
    let customerIdOrderId = [];

    customers.forEach((customer) => {
      customer.serviceBought.forEach((order) => {
        // mi salvo i riferimetni customer con order per poi associarli nelle card
        customerIdOrderId.push({ customer: customer.id, order: order.id });
        // mi genero un array di soli ordini
        allOrdersTemp.push(order);
      });
    });
    // suddivido gli ordini per la proprietà dello stato degli ordini
    allOrdersTemp.forEach((order) => {
      if (order.orderStatus === "NEW") {
        newOrders.push(order);
      }
      if (order.orderStatus === "INPROGRESS") {
        ordersProgress.push(order);
      }
      if (order.orderStatus === "DELIVERED") {
        ordersDelivered.push(order);
      }
      if (order.orderStatus === "CLOSED") {
        ordersClosed.push(order);
      }
    });

    // creo un oggetto con array ordinati per stato
    setAllOrders({
      NEW: newOrders,
      INPROGRESS: ordersProgress,
      DELIVERED: ordersDelivered,
      CLOSED: ordersClosed,
    });
    setAllUserOrder(customerIdOrderId);
  };

  useEffect(() => {
    if (allOrders) {
      handleOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let content = <></>;
  if (allOrders === {} || allOrders === undefined) {
    content = <>There is no orders yet</>;
  } else {
    content = (
      <Container>
        <h1>New orders</h1>
        <div className="d-flex flex-wrap mb-3">
          <CardOrders allOrders={allOrders.NEW} allUserOrder={allUserOrder} />
        </div>
        <h1>Order in progress</h1>
        <div className="d-flex  flex-wrap mb-3">
          <CardOrders
            allOrders={allOrders.INPROGRESS}
            allUserOrder={allUserOrder}
          />
        </div>
        <h1>Order delivered</h1>
        <div className="d-flex flex-wrap mb-3">
          <CardOrders
            allOrders={allOrders.DELIVERED}
            allUserOrder={allUserOrder}
          />
        </div>
        <h1>Order closed</h1>
        <div className="d-flex flex-wrap mb-3">
          <CardOrders
            allOrders={allOrders.CLOSED}
            allUserOrder={allUserOrder}
          />
        </div>
      </Container>
    );
  }

  return <>{content}</>;
};
export default AdminService;
