import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import OrderList from "./OrderList";
import "./UserData.css";
import { deleteSubscriber } from "../../api";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserForm from "./UserForm";
import CommentList from "./CommentList";
const UserData = ({
  thisSubscriber,
  customer,
  getUserData,
  handleLoggedUser,
  articleList,
  userComment,
  setUserComment,
  handleDeleteComment,
}) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const toggleShowEdit = () => {
    setShowEdit(!showEdit);
  };
  const handleDelete = (value) => {
    setShowDelete(true);
    if (showDelete && value) {
      console.log(thisSubscriber.id);
      deleteSubscriber(thisSubscriber.id);
      handleLoggedUser("logout");
      navigate("/");
      console.log("deleted subscriber");
    } else if (showDelete && value === false) {
      setShowDelete(false);
    }
  };

  let deleteChoice = <></>;
  if (showDelete) {
    deleteChoice = (
      <div style={{ border: "solid 2px black" }} className="p-1 text-center">
        <strong>
          Are you sure? <p>This action is permanent!</p>
        </strong>
        <div>
          <Button
            className="me-1 mt-1 customerBtn"
            variant="danger"
            onClick={() => {
              handleDelete(true);
            }}
          >
            Yes
            <BsFillTrashFill className="ms-1" />
          </Button>
          <Button
            className="me-1 mt-1 customerBtn"
            variant="success"
            onClick={() => {
              handleDelete(false);
            }}
          >
            No
            <ImCross className="ms-1" />
          </Button>
        </div>
      </div>
    );
  } else {
    deleteChoice = (
      <Button
        className="me-1 mt-1 customerBtn"
        variant="warning"
        onClick={() => {
          handleDelete();
        }}
      >
        Delete account
        <BsFillTrashFill className="ms-1" />
      </Button>
    );
  }

  let customerData = <></>;
  if (showEdit) {
    customerData = (
      <>
        <UserForm
          customer={customer}
          toggleShowEdit={toggleShowEdit}
          thisSubscriber={thisSubscriber}
          getUserData={getUserData}
        />
      </>
    );
  } else {
    customerData = (
      <>
        <Button
          className="me-1 mt-1 customerBtn"
          variant="primary"
          style={{ padding: "3px", paddingTop: "1px" }}
          onClick={toggleShowEdit}
        >
          Modify data <BsPencilFill />
        </Button>
        <div>
          Username:
          <span className="ms-1">{thisSubscriber.username}</span>
        </div>
        <div>
          Name:
          <span className="ms-1">{customer.firstName}</span>
        </div>
        <div>
          Surname:
          <span className="ms-1">{customer.lastName}</span>
        </div>
        <div>
          <div>
            Date of birth:
            <span className="ms-1">{customer.dateOfBirth}</span>
          </div>
          Email:
          <span className="ms-1">{customer.email}</span>
        </div>
        <div>
          Address:
          <span className="ms-1">{customer.address}</span>
        </div>
        <div>
          City:
          <span className="ms-1">{customer.city}</span>
        </div>
        <div>
          Cap:
          <span className="ms-1">{customer.cap}</span>
        </div>
        <div>
          Phone number:
          <span className="ms-1">{customer.phoneNumber}</span>
        </div>
        <Row className="d-flex justify-content-evenly">
          <Col>{deleteChoice}</Col>
          <Col>
            <Button
              className="me-1 mt-1 customerBtn"
              variant="primary"
              disabled={!showEdit}
            >
              Submit changes
            </Button>
          </Col>
        </Row>
      </>
    );
  }

  return (
    <>
      <h1 className="text-center">This is your dashboard</h1>
      <div className=" d-flex justify-content-around flex-wrap">
        <div className="col-12 col-sm-6 col-lg-6 ">
          <Card className="customer mb-3">
            <Card.Header>
              <Card.Title>Your subscriber & customer data</Card.Title>
            </Card.Header>
            <Card.Body>{customerData}</Card.Body>
          </Card>
        </div>
        <div className="col-12 col-sm-6 col-lg-6">
          <Card className="mb-3">
            <Card.Header>
              <Card.Title>Your orders </Card.Title>
            </Card.Header>
            <Card.Body>
              <OrderList customer={customer} getUserData={getUserData} />
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Header>
              <Card.Title>Your Comments </Card.Title>
            </Card.Header>
            <Card.Body>
              <CommentList
                thisSubscriber={thisSubscriber}
                articleList={articleList}
                userComment={userComment}
                setUserComment={setUserComment}
                handleDeleteComment={handleDeleteComment}
              />
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
export default UserData;
