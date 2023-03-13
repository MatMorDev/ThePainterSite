import { BsFillTrashFill } from "react-icons/bs";

const CartProduct = ({ servTitle, servQuantity, handleAddRemove, servId }) => {
  return (
    <li>
      <span>{servTitle}</span>
      <span className="ms-2">x{servQuantity}</span>
      <div className="ms-3 mb-3">
        <button
          id="minus"
          className="btn btn-warning btn-sm"
          value="-"
          onClick={(e) => {
            handleAddRemove(servId, e.target.value);
          }}
        >
          -
        </button>
        <span id="counter" className="mx-2">
          {servQuantity}
        </span>
        <button
          id="plus"
          className="btn btn-warning btn-sm ml-2"
          value="+"
          onClick={(e) => {
            handleAddRemove(servId, e.target.value);
          }}
        >
          +
        </button>
        <button
          className="btn btn-danger btn-sm ms-2"
          value="delete"
          onClick={(e) => {
            handleAddRemove(servId, e.target.value);
          }}
        >
          <BsFillTrashFill />
        </button>
      </div>
    </li>
  );
};

export default CartProduct;
