import { useEffect } from "react";

import ArticleList from "../components/blog/ArticleList";
import "../components/blog/Blog.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Blog = ({ loggedUser, articleList, handleLoadData }) => {
  useEffect(() => {
    handleLoadData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <main className="container d-flex flex-row-reverse flex-wrap ">
        <aside className="col-12 col-md-4 col-lg-3 mb-2 mt-3">
          <ul className="list-group m-4">
            {articleList.map((element) => {
              return (
                <li className="list-group-item aside" key={element.id}>
                  <a href={"#" + element.id} className="aside">
                    {element.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>
        <section className=" col-12 col-md-8 col-lg-9 mb-3 mt-2 d-flex justify-content-between ">
          <ArticleList
            articleList={articleList}
            loggedUser={loggedUser}
            handleLoadData={handleLoadData}
          />
        </section>
        <BsFillArrowUpCircleFill
          id="arrowUp"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        />
      </main>
    </>
  );
};
export default Blog;
