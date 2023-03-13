import imgTwo from "../../images/1815-iron-heart-arnau-lazaro.jpg";
import imgFive from "../../images/72284422_435007003683634_3322992089263767552_n.jpg";
import imgThree from "../../images/306565222_595634298767513_1694876367040829990_n.jpg";
import imgFour from "../../images/310330093_614064756924467_6633563874696938473_n.jpg";
import imgOne from "../../images/320333034_674716350869815_146148279957736682_n.jpg";

import ServiceItem from "./ServiceItem";

const ServiceList = ({ serviceList, serviceCart, setServiceCart }) => {
  let arrayImg = [];
  arrayImg.push(imgOne);
  arrayImg.push(imgTwo);
  arrayImg.push(imgThree);
  arrayImg.push(imgFour);
  arrayImg.push(imgFive);

  const serviceContent = serviceList.map((element) => {
    return (
      <div key={element.id} className="col-12 col-sm-6 col-lg-4">
        <ServiceItem
          service={element}
          arrayImg={arrayImg[element.id - 1]}
          serviceCart={serviceCart}
          setServiceCart={setServiceCart}
        />
      </div>
    );
  });
  return (
    <div className="d-flex  flex-column my-3">
      <h1 className="mb-4 text-center">Our best products</h1>
      <div className="row gy-3">{serviceContent}</div>
    </div>
  );
};
export default ServiceList;
