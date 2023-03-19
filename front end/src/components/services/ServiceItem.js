import Brush from "./Brush";

const Service = ({ service, arrayImg, serviceCart, setServiceCart }) => {
  let thisItem = {
    id: service.id,
    title: service.title,
    price: service.price,
    quantity: 1,
  };
  const handleClickAddToCart = () => {
    // se il carrello parte vuoto gli aggiungo un item
    if (serviceCart.length === 0) {
      setServiceCart([thisItem]);
    }
    // controllo se nel carrello ha già un item uguale se non c'è lo aggiunge
    if (!itemIsPresent(thisItem)) {
      const newCart = [...serviceCart, { ...thisItem }];
      setServiceCart(newCart);
    }
    // se nel carrello è già presente un item lo modifica
    if (itemIsPresent(thisItem)) {
      let oldQuantity = 0;
      let newCart = [];
      serviceCart.forEach((el) => {
        if (el.id === thisItem.id) {
          oldQuantity = el.quantity;
          newCart.push(
            (thisItem = {
              id: service.id,
              title: service.title,
              price: service.price,
              quantity: oldQuantity + 1,
            })
          );
        } else {
          newCart.push(el);
        }
      });
      setServiceCart(newCart);
    }
  };

  const itemIsPresent = (item) => {
    //verifica se in cart è presente un elemento con id===id di service
    return (
      serviceCart.findIndex((el) => {
        return el.id === item.id;
      }) > -1
    ); //torna true se trova un indice(dell'array el prendendo per id) > -1 altrimenti torna false
  };

  return (
    <div className="card h-100">
      <div className="card-header text-center" style={{ height: "200px" }}>
        <img
          src={arrayImg}
          alt="product"
          className="img-fluid"
          style={{ height: "100%" }}
        />
      </div>
      <div className="card-body d-flex flex-wrap p-3 flex-column text-center">
        <h4>{service.title}</h4>
        <div className="mb-2">
          {service.description}
          <div className="d-flex align-items-center justify-content-center">
            Price: <span className="display-6 mx-1">{service.price}</span>
            <span style={{ fontSize: "x-large" }}>&#8364;</span>
          </div>
        </div>
        <Brush value={service.rate} max={5} idService={service.id} />
      </div>
      <div className="card-footer d-flex justify-content-center flex-wrap">
        <button
          className="btn btn-info me-2 mb-1"
          onClick={handleClickAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default Service;
