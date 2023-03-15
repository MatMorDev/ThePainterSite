import UserData from "../components/dashboard/UserData";
import { getSubscriberId } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = ({
  customer,
  loggedUser,
  customerSubscriber,
  handleLoggedUser,
  articleList,
  handleLoadData,
  handleDeleteComment,
  userComment,
  setUserComment,
}) => {
  const navigate = useNavigate();
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
          articleList={articleList}
          userComment={userComment}
          setUserComment={setUserComment}
          handleDeleteComment={handleDeleteComment}
        />
      </div>
    );
  }

  useEffect(() => {
    handleLoadData();
    getUserData();
    // eslint-disable-next-line
  }, [userComment]);

  return <>{content}</>;
};
export default Dashboard;
