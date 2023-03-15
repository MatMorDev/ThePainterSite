import { Button } from "react-bootstrap";
import { BsFillTrashFill } from "react-icons/bs";
const Comment = ({ comment, handleDeleteComment }) => {
  return (
    <>
      <div key={comment.id}>
        {comment.title}
        <Button
          className="ms-1"
          variant="danger"
          style={{ padding: "3px", paddingTop: "1px" }}
          onClick={() => {
            handleDeleteComment(comment.id);
          }}
        >
          <BsFillTrashFill />
        </Button>
        <div>{comment.content}</div>
      </div>
    </>
  );
};
export default Comment;
