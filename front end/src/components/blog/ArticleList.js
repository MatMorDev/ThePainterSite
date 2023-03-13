import Article from "./Article";

const ArticleList = ({ articleList = [], loggedUser, handleLoadData }) => {
  if (articleList.length === 0)
    return (
      <div className="alert alert-info">
        The article list is empty or is loading
      </div>
    );

  return (
    <ul className="list-group mt-4">
      {articleList.map((element) => {
        return (
          <div key={element.id}>
            <Article
              article={element}
              loggedUser={loggedUser}
              handleLoadData={handleLoadData}
            />
          </div>
        );
      })}
    </ul>
  );
};
export default ArticleList;
