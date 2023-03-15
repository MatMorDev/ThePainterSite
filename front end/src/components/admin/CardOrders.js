import Card from "react-bootstrap/Card";
const CardOrders = ({ allOrders, allUserOrder }) => {
  let content = <>Loading please wait..</>;
  if (allOrders === undefined) {
    content = <>Loading please wait..</>;
  } else if (allOrders.length === 0) {
    content = <h3>There is no order yet</h3>;
  } else {
    content = allOrders.map((element) => {
      let paid = "";
      if (element.paid === true) {
        paid = "Paid";
      } else {
        paid = "Not paid";
      }
      let idCustomer = 0;
      allUserOrder.forEach((item) => {
        if (item.order === element.id) {
          idCustomer = item.customer;
        }
      });

      return (
        <div key={element.id} className="m-1">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>
                Order id: {element.id} - Customer id: {idCustomer}
                <p>{element.service[0].title}</p>
              </Card.Title>
              <Card.Subtitle className="mb-3 text-muted">
                Order date: {element.localDateTime}
              </Card.Subtitle>
              <Card.Text>Quantity: {element.quantity}</Card.Text>
              <Card.Text>Status payment: {paid}</Card.Text>
              <Card.Link href="#">Message customer</Card.Link>
              <Card.Link href="#">Modify order</Card.Link>
            </Card.Body>
          </Card>
        </div>
      );
    });
  }
  return <>{content}</>;
};

export default CardOrders;
