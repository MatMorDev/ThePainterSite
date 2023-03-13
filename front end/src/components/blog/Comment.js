const Comment = ({ comment }) => {
  return comment.map((element) => {
    return <li key={element.id}>{element.content}</li>;
  });
};
export default Comment;
