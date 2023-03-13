import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="mt-2 container">
      <h1>Questa è la tua Contact</h1>
      <Link to={`/`}>Home</Link>
    </div>
  );
};
export default Contact;
