import Comment from "./Comment";

const CommentList = ({
  thisSubscriber,
  articleList,
  userComment,
  setUserComment,
  handleDeleteComment,
}) => {
  let commentList = []; // questo è il mio array di oggetti finale
  let articleIdList = [];

  //quando si inizializza i valori sono indefiniti o vuoti quindi testo prima di fare i cicli
  // cerco i valori di id commento user ed id commento articolo, se uguali allora lo mostro nella dashboard

  if (thisSubscriber.comments !== 0 && thisSubscriber.comments !== undefined) {
    for (let i = 0; i < articleList.length; i++) {
      for (let j = 0; j < articleList[i].comments.length; j++) {
        articleIdList.push({
          idComment: articleList[i].comments[j].id,
          title: articleList[i].title,
        });
      }
    }
    for (let i = 0; i < thisSubscriber.comments.length; i++) {
      for (let j = 0; j < articleIdList.length; j++) {
        if (thisSubscriber.comments[i].id === articleIdList[j].idComment) {
          commentList.push({
            id: thisSubscriber.comments[i].id,
            title: articleIdList[j].title,
            content: thisSubscriber.comments[i].content,
          });
        }
      }
    }
  }

  if (userComment.length === 0) {
    return commentList.map((comment) => {
      return (
        <div key={comment.id}>
          <Comment
            comment={comment}
            handleDeleteComment={handleDeleteComment}
          />
        </div>
      );
    });
  } else {
    return userComment.map((comment) => {
      return (
        <>
          <Comment
            comment={comment}
            handleDeleteComment={handleDeleteComment}
          />
        </>
      );
    });
  }
};
export default CommentList;
