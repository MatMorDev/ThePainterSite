import ReactiveButton from "reactive-button";
import { FaHandPointDown } from "react-icons/fa";
import { useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentList = ({
  commentList,
  idArticle,
  loggedUser,
  handleLoadData,
}) => {
  const [showComments, setShowComments] = useState(false);

  const onClickHandler = () => {
    setShowComments(!showComments);
  };

  let commentToggle = <></>;
  if (showComments) {
    commentToggle = (
      <>
        <ul className="mt-2 comments">
          <Comment comment={commentList} />
        </ul>
        <CommentForm
          idArticle={idArticle}
          loggedUser={loggedUser}
          handleLoadData={handleLoadData}
        />
      </>
    );
  }

  return (
    <div>
      <ReactiveButton
        rounded
        color="primary"
        onClick={onClickHandler}
        idleText={
          <span>
            <FaHandPointDown /> Show comments
          </span>
        }
      />
      {commentToggle}
    </div>
  );
};
export default CommentList;
