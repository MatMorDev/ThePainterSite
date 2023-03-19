import CommentList from "./CommentList";
const Article = ({ article, loggedUser, handleLoadData }) => {
  return (
    <>
      <li className="list-group-item mb-4" key={article.id} id={article.id}>
        <div>
          <h3>{article.title}</h3>
          <h6>{article.date}</h6>
        </div>
        <div>
          <p>{article.description}</p>
        </div>
        <CommentList
          commentList={article.comments}
          idArticle={article.id}
          loggedUser={loggedUser}
          handleLoadData={handleLoadData}
        />
      </li>
    </>
  );
};
export default Article;
