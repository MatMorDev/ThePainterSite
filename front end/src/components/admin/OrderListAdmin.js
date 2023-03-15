import OrderAdmin from "./OrderAdmin";
const OrderListAdmin = ({
  orders,
  toggleModifyOrder,
  modifyOrder,
  handlePutOrder,
  customerId,
  handleDeleteOrder,
}) => {
  if (orders.length !== 0) {
    return orders.map((order) => {
      return (
        <div key={order.id}>
          <OrderAdmin
            order={order}
            toggleModifyOrder={toggleModifyOrder}
            modifyOrder={modifyOrder}
            handlePutOrder={handlePutOrder}
            customerId={customerId}
            handleDeleteOrder={handleDeleteOrder}
          />
        </div>
      );
    });
  } else {
    return (
      <div
        style={{
          color: "red",
          fontWeight: "bold",
          fontSize: "large",
        }}
      >
        There is no orders
      </div>
    );
  }
};
export default OrderListAdmin;
