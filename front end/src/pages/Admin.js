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
  getServices,
  postService,
  deleteService,
  putService,
  getArticles,
  postArticle,
  deleteArticle,
  putArticle,
  deleteCommentAdmin,
} from "../../src/api";
import "../components/admin/Admin.css";
import AdminService from "../components/admin/AdminService";

const Admin = ({
  serviceList,
  setServiceList,
  articleList,
  setArticleList,
  loggedUser,
}) => {
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
    let tempComments = [];
    let newComments = [];
    let newArticleList = [];

    //elimino il commento dai subscriber nel dom
    subscribers.forEach((subscriber) => {
      if (subscriber.id !== idSub) {
        tempSubscriber.push(subscriber);
      }
      if (subscriber.id === idSub) {
        tempComments = subscriber.comments;
        tempComments.forEach((comment) => {
          if (comment.id !== idComment) {
            newComments.push(comment);
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
          comments: newComments,
        });
      }
    });
    //elimino il commento dagli article nel dom
    articleList.forEach((article) => {
      let found = false;
      let artComments = article.comments;
      artComments.forEach((comment) => {
        if (comment.id === idComment) {
          found = true;
        }
      });
      if (found) {
        newArticleList.push({
          id: article.id,
          title: article.title,
          description: article.description,
          category: article.category,
          date: article.date,
          comments: newComments,
        });
      } else {
        newArticleList.push(article);
      }
    });
    console.log("comment deleted");
    setSubscribers(tempSubscriber);
    setArticleList(newArticleList);
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
    console.log(result.data, "Order deleted");
  };
  //////////////////////// END CUSTOMER/////////////////////////////////////

  ///////////////////////SERVICE/////////////////////////////////////
  const handleService = async () => {
    if (serviceList.length === 0) {
      const result = await getServices();
      setServiceList(result.data);
    }
  };
  const handlePostService = async (serviceBody) => {
    let newServiceList = [];
    const result = await postService(serviceBody);
    serviceList.forEach((service) => {
      newServiceList.push(service);
    });
    newServiceList.push(result.data);
    setServiceList(newServiceList);
    console.log("service created");
  };
  const handleDeleteService = (idService) => {
    let newServiceList = [];
    serviceList.forEach((service) => {
      if (service.id !== idService) {
        newServiceList.push(service);
      }
    });
    setServiceList(newServiceList);
    deleteService(idService);
    console.log("service deleted");
  };
  const handlePutService = async (idService, serviceBody) => {
    const result = await putService(idService, serviceBody);
    let newServiceList = [];
    serviceList.forEach((service) => {
      if (service.id !== idService) {
        newServiceList.push(service);
      }
      if (service.id === idService) {
        newServiceList.push(result.data);
      }
    });
    setServiceList(newServiceList);
  };
  //////////////////////SERVICE END/////////////////////////////////

  //////////////////////ARTICLE/////////////////////////////////////
  const handleArticle = async () => {
    if (articleList.length === 0) {
      const result = await getArticles();
      setArticleList(result.data);
    }
  };
  const handlePostArticle = async (articleBody) => {
    let newArticleList = [];
    const result = await postArticle(articleBody);
    articleList.forEach((article) => {
      newArticleList.push(article);
    });
    newArticleList.push(result.data);
    setArticleList(newArticleList);
    console.log("create new article");
  };
  const handleDeleteArticle = (idArticle) => {
    let newArticleList = [];
    articleList.forEach((article) => {
      if (article.id !== parseInt(idArticle)) {
        newArticleList.push(article);
      }
    });
    setArticleList(newArticleList);
    deleteArticle(idArticle);
    console.log("article deleted");
  };
  const handlePutArticle = async (idArticle, articleBody) => {
    const result = await putArticle(idArticle, articleBody);
    let newArticleList = [];
    articleList.forEach((article) => {
      if (article.id !== idArticle) {
        newArticleList.push(article);
      }
      if (article.id === idArticle) {
        newArticleList.push(result.data);
      }
    });
    setArticleList(newArticleList);
  };
  const handleDeleteCommentId = (idComment, idArticle) => {
    const id = parseInt(idArticle);
    let newArticleList = [];
    let newSubscriberList = [];
    let newCommentList = [];

    // elimino dalla lista di articoli nel dom i commenti
    articleList.forEach((article) => {
      if (article.id !== id) {
        newArticleList.push(article);
      }
      if (article.id === id) {
        article.comments.forEach((comment) => {
          if (comment.id !== idComment) {
            newCommentList.push(comment);
          }
          newArticleList.push({
            id: article.id,
            title: article.title,
            description: article.description,
            category: article.category,
            date: article.date,
            comments: newCommentList,
          });
        });
      }
    });
    // elimino dalla lista di subscriber nel dom i commenti
    subscribers.forEach((subscriber) => {
      let found = false;
      let subComments = subscriber.comments;
      subComments.forEach((comment) => {
        if (comment.id === idComment) {
          found = true;
        }
      });
      if (found) {
        newSubscriberList.push({
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
          comments: newCommentList,
        });
      } else {
        newSubscriberList.push(subscriber);
      }
    });
    setSubscribers(newSubscriberList);
    setArticleList(newArticleList);
    deleteCommentAdmin(idComment);
    console.log("comment deleted");
  };
  //////////////////////ARTICLE END/////////////////////////////////

  useEffect(() => {
    handleSubscriber();
    handleCustomer();
    handleService();
    handleArticle();
    // eslint-disable-next-line
  }, []);

  // simulazione accesso eslusivo per l'admin
  let contentAdminPage = (
    <div className="m-5 text-center display-3">
      <span style={{ color: "red", fontWeight: "bold" }}>
        Page restricted only to admin
      </span>
    </div>
  );

  if (loggedUser.idSub === 1) {
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
        content = (
          <ServicesContent
            serviceList={serviceList}
            handlePostService={handlePostService}
            handleDeleteService={handleDeleteService}
            handlePutService={handlePutService}
          />
        );
        break;
      case "articles":
        content = (
          <ArticlesContent
            articleList={articleList}
            setArticleList={setArticleList}
            handlePostArticle={handlePostArticle}
            handleDeleteArticle={handleDeleteArticle}
            handlePutArticle={handlePutArticle}
            handleDeleteCommentId={handleDeleteCommentId}
          />
        );
        break;
      default:
        content = <h1>Select a button to start</h1>;
        break;
    }

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
  } else {
    return <>{contentAdminPage}</>;
  }
};
export default Admin;
