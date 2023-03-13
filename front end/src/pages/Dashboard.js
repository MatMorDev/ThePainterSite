import UserData from "../components/dashboard/UserData";
import { getSubscriberId } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = ({
  customer,
  loggedUser,
  customerSubscriber,
  handleLoggedUser,
}) => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [thisSubscriber, setThisSubscriber] = useState({});

  const getUserData = async () => {
    const result = await getSubscriberId(loggedUser.idSub);
    customerSubscriber();
    setThisSubscriber(result.data);
  };

  let content = (
    <h1 className="container mt-3">
      Area restricted only to logged users, please
      <p
        onClick={() => {
          navigate("/login-register");
        }}
        style={{ color: "blue", textDecorationLine: "underline" }}
      >
        login or register here
      </p>
    </h1>
  );
  if (loggedUser.idSub !== 0 || loggedUser.username !== "unknown") {
    content = (
      <div className="m-1">
        <UserData
          thisSubscriber={thisSubscriber}
          customer={customer}
          getUserData={getUserData}
          handleLoggedUser={handleLoggedUser}
          showEdit={showEdit}
          setShowEdit={setShowEdit}
        />
      </div>
    );
  }

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, [loggedUser, showEdit]);

  return <>{content}</>;
};
export default Dashboard;
