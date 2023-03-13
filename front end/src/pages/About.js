import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-2 container">
      <h1>Questo è il tuo About Us</h1>
      <Link to={`/`}>Home</Link>
    </div>
  );
};
export default About;
