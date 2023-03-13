import { FaPaintBrush } from "react-icons/fa";
import { BsBrush } from "react-icons/bs";

const Brush = ({ value, max, idService }) => {
  let arrayTemp = [];
  let i = 0;
  for (i = 0; i < value; i++) {
    arrayTemp.push(<FaPaintBrush key={idService + i} />);
  }
  if (i < max) {
    for (let j = 0; j < max - i; j++) {
      arrayTemp.push(<BsBrush key={idService + j + i} />);
    }
  }

  return <p className="mb-0">{arrayTemp}</p>;
};
export default Brush;
