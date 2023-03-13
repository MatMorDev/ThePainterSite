import { Nav, Navbar, NavLink } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BsFillHouseFill,
  BsFillHouseDoorFill,
  BsPaletteFill,
  BsFillBrushFill,
  BsPersonWorkspace,
  BsPersonUp,
  BsFillFileTextFill,
  BsFileRichtext,
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import iconLogo from "../../utilities/icon-logo.png";
import "./Navigationbar.css";
import { useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";

function Navigationbar({
  loggedUser,
  handleLoggedUser,
  serviceCart,
  setServiceCart,
  customer,
  customerSubscriber,
}) {
  const [iconName, setIconName] = useState("");
  const navigate = useNavigate();

  let home = <BsFillHouseFill className="mb-1 me-1 ms-2" />;
  let about = <BsPersonWorkspace className="me-1 ms-2" />;
  let service = <BsPaletteFill className="me-1 ms-2" />;
  let blog = <BsFillFileTextFill className="me-1 ms-2" />;
  let logInRegister = <AiOutlineLogin className="me-1 ms-2" />;
  let logged = <AiOutlineLogout className="me-1 ms-2" />;
  switch (iconName) {
    case "home":
      home = <BsFillHouseDoorFill className="mb-1 me-1 ms-2" />;
      break;
    case "about":
      about = <BsPersonUp className="me-1 ms-2" />;
      break;
    case "service":
      service = <BsFillBrushFill className="me-1 ms-2" />;
      break;
    case "blog":
      blog = <BsFileRichtext className="me-1 ms-2" />;
      break;
    case "logInRegister":
      logInRegister = <BsFillArrowRightCircleFill className="me-1 ms-2" />;
      break;
    case "logged":
      logged = <BsFillArrowLeftCircleFill className="me-1 ms-2" />;
      break;
    default:
  }

  const handleLogOutUserNav = () => {
    navigate("/login-register");
    handleLoggedUser("logout");
  };

  // navlink del login e dashboardche cambia una volta si è logggati
  let dashboard = <></>;
  let loginRegisterNav = <></>;
  if (loggedUser.idSub === 0 && loggedUser.username === "unknown") {
    loginRegisterNav = (
      <NavLink
        evenkey="7"
        as={Link}
        to="/login-register"
        className="navElement me-1"
        onMouseEnter={() => setIconName("logInRegister")}
        onMouseLeave={() => setIconName("")}
      >
        <span className="ms-2 me-5">
          {logInRegister}
          Log In / Register
        </span>
      </NavLink>
    );
  } else {
    if (loggedUser.idSub === 1 && loggedUser.username === "AdminPainter") {
      dashboard = (
        <NavLink
          evenkey="7"
          as={Link}
          to="/admin"
          className="navElement"
          style={{ color: "orange" }}
        >
          <span className="ms-2">Administrator Page</span>
        </NavLink>
      );
    } else {
      dashboard = (
        <NavLink
          evenkey="7"
          as={Link}
          to="/dashboard"
          className="navElement"
          style={{ color: "orange" }}
        >
          <span className="ms-2">Dashboard</span>
        </NavLink>
      );
    }

    loginRegisterNav = (
      <Nav.Link
        evenkey="8"
        className="navElement me-1"
        onClick={handleLogOutUserNav}
        onMouseEnter={() => setIconName("logged")}
        onMouseLeave={() => setIconName("")}
        style={{ color: "orange" }}
      >
        <span>
          {logged}
          Logged as: {loggedUser.username}
        </span>
      </Nav.Link>
    );
  }

  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <NavLink evenkey="1" as={Link} to="/" className="p-0">
            <img
              alt="logo"
              src={iconLogo}
              width="40"
              height="40"
              className="ms-2 mt-1"
            />
          </NavLink>
          <NavLink
            evenkey="2"
            as={Link}
            to="/"
            className="navElement"
            onMouseEnter={() => setIconName("home")}
            onMouseLeave={() => setIconName("")}
          >
            <span>
              {home}
              Home
            </span>
          </NavLink>
          <Nav.Link
            evenkey="3"
            as={Link}
            to="/about"
            className="navElement"
            onMouseEnter={() => setIconName("about")}
            onMouseLeave={() => setIconName("")}
          >
            <span>
              {about}
              About Us
            </span>
          </Nav.Link>
          <NavLink
            evenkey="4"
            as={Link}
            to="/services"
            className="navElement"
            onMouseEnter={() => setIconName("service")}
            onMouseLeave={() => setIconName("")}
          >
            <span>
              {service}
              Services
            </span>
          </NavLink>
          <NavLink
            evenkey="5"
            as={Link}
            to="/blog"
            className="navElement"
            onMouseEnter={() => setIconName("blog")}
            onMouseLeave={() => setIconName("")}
          >
            <span>
              {blog}
              Blog
            </span>
          </NavLink>
          <NavLink evenkey="6" as={Link} to="/contact" className="navElement">
            <span className="ms-2">Contact</span>
          </NavLink>
          {dashboard}
        </Nav>
      </Navbar.Collapse>
      <Cart
        serviceCart={serviceCart}
        setServiceCart={setServiceCart}
        customer={customer}
        customerSubscriber={customerSubscriber}
      />
      <Nav>{loginRegisterNav}</Nav>
    </Navbar>
  );
}

export default Navigationbar;
