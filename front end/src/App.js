import { Route, Routes } from "react-router-dom";
import WebHead from "./components/navbar-app-footer/WebsiteHead";
import Navigationbar from "./components/navbar-app-footer/Navigationbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import LogInRegister from "./pages/LogInRegister";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import {
  logoutSubscriber,
  getCustomerByEmail,
  getArticles,
  deleteComment,
} from "./api";
import { useEffect, useState } from "react";
import Footer from "./components/navbar-app-footer/Footer";

const App = () => {
  const [cookieTrigger, setCookieTrigger] = useState(false);
  const [articleList, setArticleList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const [serviceCart, setServiceCart] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [faqList, setFaqList] = useState([]);
  const [customer, setCustomer] = useState({});
  const [emailUser, setEmailUser] = useState("");
  const [loggedUser, setLoggedUser] = useState({
    idSub: 0,
    username: "unknown",
    password: "",
  });
  const [lastUser, setLastUser] = useState({ idSub: "", count: false });

  //delete comment dashboard
  const handleDeleteComment = (valueId) => {
    deleteComment(loggedUser.idSub, valueId);
    console.log("message deleted");
    const filtered = userComment.filter((comment) => comment.id !== valueId);
    setUserComment(filtered);
  };

  // handle per simulare un utente che si logga all'interno del sito
  const handleLoggedUser = (token) => {
    // caso logOut
    if (token === "logout") {
      logoutSubscriber(loggedUser);
      setLoggedUser({ idSub: 0, username: "unknown" });
      setLastUser({ idSub: "", count: false });
      setEmailUser("");
      setCustomer({});
    } else {
      // caso logIn
      const userCredential = {
        idSub: token.subId,
        username: token.username,
        password: token.password,
      };
      setLoggedUser(userCredential);
      setEmailUser(token.email);
    }
  };

  // fetch per il customer in base al subscriber se presente
  const customerSubscriber = async () => {
    const thisCustomer = await getCustomerByEmail(emailUser);
    setCustomer(thisCustomer.data);
  };

  // handle per verificare che sia stato effettuato la richiesta dei cookie ad avvio pagina web
  // non viene più richiesta fino al prossimo caricamento (simula che non viene richiesto finché il cookie rimane nel browser)
  const handleCookie = (status) => {
    status ? setCookieTrigger(true) : setCookieTrigger(false);
  };

  const handleLoadData = () => {
    const loadData = async () => {
      const result = await getArticles();
      if (result.ok) {
        setArticleList(result.data);
      } else {
        console.log(result.data);
      }
    };
    loadData();
  };

  useEffect(() => {}, [loggedUser, serviceCart]);

  return (
    <>
      <div className="container justify-content-center flex-wrap-nowrap align-items-center direction-row">
        <WebHead />
      </div>
      <Navigationbar
        loggedUser={loggedUser}
        handleLoggedUser={handleLoggedUser}
        serviceCart={serviceCart}
        setServiceCart={setServiceCart}
        customer={customer}
        customerSubscriber={customerSubscriber}
      />

      <div className="m-0">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Home
                  cookie={cookieTrigger}
                  handleCookie={handleCookie}
                  loggedUser={loggedUser}
                  lastUser={lastUser}
                  setLastUser={setLastUser}
                />
              </div>
            }
          />
          <Route
            path="/about"
            element={<About faqList={faqList} setFaqList={setFaqList} />}
          />
          <Route
            path="/services"
            element={
              <Service
                serviceList={serviceList}
                setServiceList={setServiceList}
                serviceCart={serviceCart}
                setServiceCart={setServiceCart}
              />
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/blog"
            element={
              <Blog
                loggedUser={loggedUser}
                lastUser={lastUser}
                setLastUser={setLastUser}
                articleList={articleList}
                setArticleList={setArticleList}
                handleLoadData={handleLoadData}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                customer={customer}
                loggedUser={loggedUser}
                customerSubscriber={customerSubscriber}
                handleLoggedUser={handleLoggedUser}
                articleList={articleList}
                handleLoadData={handleLoadData}
                userComment={userComment}
                setUserComment={setUserComment}
                handleDeleteComment={handleDeleteComment}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                serviceList={serviceList}
                setServiceList={setServiceList}
                articleList={articleList}
                setArticleList={setArticleList}
                loggedUser={loggedUser}
              />
            }
          />
          <Route
            path="/login-register"
            element={<LogInRegister handleLoggedUser={handleLoggedUser} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
