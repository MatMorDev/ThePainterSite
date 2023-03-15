import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import ArticlesContent from "../components/admin/ArticlesContent";
import CustomersContent from "../components/admin/CustomersContent";
import SubscribersContent from "../components/admin/SubscribersContent";
import ServicesContent from "../components/admin/ServicesContent";
import {
  getAllSubscribers,
  deleteSubscriber,
  deleteComment,
  putSubscriber,
  getAllCustomers,
  putComment,
  deleteCustomer,
  putCustomer,
  putOrder,
  deleteOrder,
} from "../../src/api";
import "../components/admin/Admin.css";
import AdminService from "../components/admin/AdminService";

const Admin = () => {
  const [toggleAdmin, setToggleAdmin] = useState("");
  const [subscribers, setSubscribers] = useState([]);
  const [customers, setCustomers] = useState([]);

  const handleToggleAdmin = (value) => {
    setToggleAdmin(value);
  };

  //////////////////////// START SUBSCRIBER/////////////////////////////////////
  const handleSubscriber = async (firstName, lastName) => {
    if (firstName === undefined && lastName === undefined) {
      firstName = "";
      lastName = "";
    }
    const subscribers = await getAllSubscribers(firstName, lastName);
    setSubscribers(subscribers.data);
  };
  const handleDeleteSubscriber = async (id) => {
    let tempSubscriber = [];
    if (id !== 1) {
      subscribers.forEach((subscriber) => {
        if (subscriber.id !== id) {
          tempSubscriber.push(subscriber);
        }
      });
      setSubscribers(tempSubscriber);
      deleteSubscriber(id);
      console.log("Subscriber deleted");
    } else {
      console.log("You cant delete the admin");
    }
  };
  const handleDeleteComment = async (idSub, idComment) => {
    let tempSubscriber = [];
    let tempComment = [];
    let newComment = [];
    subscribers.forEach((subscriber) => {
      if (subscriber.id !== idSub) {
        tempSubscriber.push(subscriber);
      }
      if (subscriber.id === idSub) {
        tempComment = subscriber.comments;
        tempComment.forEach((comment) => {
          if (comment.id !== idComment) {
            newComment.push(comment);
          }
        });
        tempSubscriber.push({
          id: subscriber.id,
          username: subscriber.username,
          password: subscriber.password,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName,
          dateOfBirth: subscriber.dateOfBirth,
          email: subscriber.email,
          address: subscriber.address,
          city: subscriber.city,
          cap: subscriber.cap,
          phoneNumber: subscriber.phoneNumber,
          comments: newComment,
        });
      }
    });
    console.log("comment deleted");
    setSubscribers(tempSubscriber);
    deleteComment(idSub, idComment);
  };
  const handlePutSubscriber = async (id, subscriberBody) => {
    let tempSubscriber = [];
    const result = await putSubscriber(id, subscriberBody);
    const modifiedSubscriber = result.data;
    subscribers.forEach((subscriber) => {
      if (subscriber.id !== modifiedSubscriber.id) {
        tempSubscriber.push(subscriber);
      } else {
        tempSubscriber.push(modifiedSubscriber);
      }
    });
    setSubscribers(tempSubscriber);
    console.log(result, "subscriber modified");
  };
  const handlePutComment = async (idSub, idComment, commentBody) => {
    let tempSubscriber = [];
    let tempComment = [];
    let newComment = [];
    subscribers.forEach((subscriber) => {
      if (subscriber.id !== idSub) {
        tempSubscriber.push(subscriber);
      }
      if (subscriber.id === idSub) {
        tempComment = subscriber.comments;
        tempComment.forEach((comment) => {
          if (comment.id !== idComment) {
            newComment.push(comment);
          }
          if (comment.id === idComment) {
            newComment.push({ id: idComment, content: commentBody.content });
          }
        });
        tempSubscriber.push({
          id: subscriber.id,
          username: subscriber.username,
          password: subscriber.password,
          firstName: subscriber.firstName,
          lastName: subscriber.lastName,
          dateOfBirth: subscriber.dateOfBirth,
          email: subscriber.email,
          address: subscriber.address,
          city: subscriber.city,
          cap: subscriber.cap,
          phoneNumber: subscriber.phoneNumber,
          comments: newComment,
        });
      }
    });
    console.log("comment modified");
    setSubscribers(tempSubscriber);
    putComment(idSub, idComment, commentBody);
  };
  //////////////////////// END SUBSCRIBER/////////////////////////////////////

  //////////////////////// START CUSTOMER/////////////////////////////////////
  const handleCustomer = async (firstName, lastName) => {
    if (firstName === undefined && lastName === undefined) {
      firstName = "";
      lastName = "";
    }
    const customers = await getAllCustomers(firstName, lastName);
    setCustomers(customers.data);
  };
  const handleDeleteCustomer = async (id) => {
    let tempCustomers = [];
    customers.forEach((customer) => {
      if (customer.id !== id) {
        tempCustomers.push(customer);
      }
    });
    setCustomers(tempCustomers);
    deleteCustomer(id);
    console.log("Customer deleted");
  };
  const handlePutCustomer = async (id, customerBody) => {
    let tempCustomer = [];
    const result = await putCustomer(id, customerBody);
    const modifiedCustomer = result.data;
    customers.forEach((customer) => {
      if (customer.id !== modifiedCustomer.id) {
        tempCustomer.push(customer);
      } else {
        tempCustomer.push(modifiedCustomer);
      }
    });
    setCustomers(tempCustomer);
    console.log(result, "Customer modified");
  };
  const handlePutOrder = async (customerId, orderId, orderBody) => {
    let tempCustomers = [];
    let tempOrder = [];
    customers.forEach((customer) => {
      if (customer.id !== customerId) {
        tempCustomers.push(customer);
      } else {
        customer.serviceBought.forEach((order) => {
          if (order.id !== orderId) {
            tempOrder.push(order);
          } else {
            //necessario rendere da string a boolean prima di pushare il nuovo order nel dom
            let paidStatus = false;
            if (orderBody.paid === "true") {
              paidStatus = true;
            }
            if (orderBody.paid === "false") {
              paidStatus = false;
            }
            tempOrder.push({
              id: order.id,
              localDateTime: order.localDateTime,
              orderStatus: orderBody.orderStatus,
              paid: paidStatus,
              quantity: orderBody.quantity,
              service: order.service,
            });
          }
        });
        tempCustomers.push({
          id: customer.id,
          password: customer.password,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          email: customer.email,
          address: customer.address,
          city: customer.city,
          cap: customer.cap,
          phoneNumber: customer.phoneNumber,
          serviceBought: tempOrder,
        });
      }
    });
    setCustomers(tempCustomers);
    const result = await putOrder(customerId, orderId, orderBody);
    console.log(result.ok, "order modified");
  };
  const handleDeleteOrder = async (idCustomer, orderId) => {
    const result = await deleteOrder(idCustomer, orderId);
    let tempCustomers = [];
    let tempOrder = [];
    customers.forEach((customer) => {
      if (customer.id !== idCustomer) {
        tempCustomers.push(customer);
      } else {
        customer.serviceBought.forEach((order) => {
          if (order.id !== orderId) {
            tempOrder.push(order);
          }
        });
        tempCustomers.push({
          id: customer.id,
          password: customer.password,
          firstName: customer.firstName,
          lastName: customer.lastName,
          dateOfBirth: customer.dateOfBirth,
          email: customer.email,
          address: customer.address,
          city: customer.city,
          cap: customer.cap,
          phoneNumber: customer.phoneNumber,
          serviceBought: tempOrder,
        });
      }
    });
    setCustomers(tempCustomers);
    console.log(result.ok, "Order deleted");
  };
  //////////////////////// END CUSTOMER/////////////////////////////////////

  ///////////////////////ADMIN PAGE/////////////////////////////////////

  //////////////////////ADMIN PAGE END/////////////////////////////////

  //selettore per il pannello admin
  let content = <></>;
  switch (toggleAdmin) {
    case "main":
      content = (
        <div>
          <AdminService customers={customers} />
        </div>
      );
      break;
    case "subscribers":
      content = (
        <div className="contentDiv">
          <Row className="contentDivTitle">
            <Col>(Id) Username</Col>
            <Col>
              First name<div>Last name</div>
            </Col>
            <Col>Date of birth</Col>
            <Col>Email</Col>
            <Col>Address</Col>
            <Col>City - Cap</Col>
            <Col>Phone number</Col>
          </Row>
          <SubscribersContent
            subscribers={subscribers}
            handleDeleteSubscriber={handleDeleteSubscriber}
            handleDeleteComment={handleDeleteComment}
            handlePutSubscriber={handlePutSubscriber}
            handlePutComment={handlePutComment}
          />
        </div>
      );
      break;
    case "customers":
      content = (
        <div className="contentDiv">
          <Row className="contentDivTitle">
            <Col>(Id)</Col>
            <Col>
              First name<div>Last name</div>
            </Col>
            <Col>Date of birth</Col>
            <Col>Email</Col>
            <Col>Address</Col>
            <Col>City - Cap</Col>
            <Col>Phone number</Col>
          </Row>
          <CustomersContent
            customers={customers}
            handlePutCustomer={handlePutCustomer}
            handleDeleteCustomer={handleDeleteCustomer}
            handlePutOrder={handlePutOrder}
            handleDeleteOrder={handleDeleteOrder}
          />
        </div>
      );
      break;
    case "services":
      content = <ServicesContent />;
      break;
    case "articles":
      content = <ArticlesContent />;
      break;
    default:
      content = <h1>Select a button to start</h1>;
      break;
  }
  useEffect(() => {
    handleSubscriber();
    handleCustomer();
  }, []);

  return (
    <>
      <div className="mx-1">
        <Row className="mt-3">
          <Col sm={2} className="d-flex flex-column">
            <Button
              className="m-2"
              variant="dark"
              value="main"
              onClick={(e) => {
                handleToggleAdmin(e.target.value);
              }}
            >
              Main page
            </Button>
            <Button
              className="m-2"
              variant="secondary"
              value="subscribers"
              onClick={(e) => {
                handleToggleAdmin(e.target.value);
              }}
            >
              Subscribers
            </Button>
            <Button
              className="m-2"
              variant="secondary"
              value="customers"
              onClick={(e) => {
                handleToggleAdmin(e.target.value);
              }}
            >
              Customers
            </Button>
            <Button
              className="m-2"
              variant="secondary"
              value="services"
              onClick={(e) => {
                handleToggleAdmin(e.target.value);
              }}
            >
              Services
            </Button>
            <Button
              className="m-2"
              variant="secondary"
              value="articles"
              onClick={(e) => {
                handleToggleAdmin(e.target.value);
              }}
            >
              Articles
            </Button>
          </Col>
          <Col sm>
            <div>{content}</div>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Admin;
