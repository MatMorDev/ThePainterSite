import ServiceItem from "./ServiceItem";

const ServiceList = ({
  serviceList,
  serviceCart,
  setServiceCart,
  imgOne,
  imgTwo,
  imgThree,
  imgFour,
  imgFive,
}) => {
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
      <h1 className="mb-4 text-center serviceTitle ">Our best products</h1>
      <div className="row gy-3">{serviceContent}</div>
    </div>
  );
};
export default ServiceList;
