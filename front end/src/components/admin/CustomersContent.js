import CustomerItem from "./CustomerItem";
const CustomersContent = ({
  customers,
  handleDeleteCustomer,
  handlePutCustomer,
  handlePutOrder,
  handleDeleteOrder,
}) => {
  return customers.map((item) => {
    return (
      <CustomerItem
        key={item.id}
        item={item}
        handlePutCustomer={handlePutCustomer}
        handleDeleteCustomer={handleDeleteCustomer}
        handlePutOrder={handlePutOrder}
        handleDeleteOrder={handleDeleteOrder}
      />
    );
  });
};
export default CustomersContent;
