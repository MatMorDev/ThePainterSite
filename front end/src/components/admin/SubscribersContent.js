import SubscriberItem from "./SubscriberItem";
const SubscribersContent = ({
  subscribers,
  handleDeleteSubscriber,
  handleDeleteComment,
  handlePutSubscriber,
  handlePutComment,
}) => {
  return subscribers.map((item) => {
    return (
      <SubscriberItem
        key={item.id}
        item={item}
        handleDeleteSubscriber={handleDeleteSubscriber}
        handleDeleteComment={handleDeleteComment}
        handlePutSubscriber={handlePutSubscriber}
        handlePutComment={handlePutComment}
      />
    );
  });
};
export default SubscribersContent;
