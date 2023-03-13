import { useEffect, useState } from "react";
import AlertLogin from "../components/login/AlertLogin";
import { getArticles } from "../api";
import ArticleList from "../components/blog/ArticleList";
import "./Blog.css";
import { BsFillArrowUpCircleFill } from "react-icons/bs";

const Blog = ({ loggedUser, lastUser, setLastUser }) => {
  const [articleList, setArticleList] = useState([]);

  const handleLoadData = () => {
    const loadData = async () => {
      const result = await getArticles();
      if (result.ok) {
        setArticleList(result.data);
      } else {
        console.log(result.data);
      }
    };
    loadData();
  };

  useEffect(() => {
    handleLoadData();
  }, []);
  // d-flex flex-wrap align-items-center justify-content-between align-items-stretch
  return (
    <>
      <div className="mt-2">
        <AlertLogin
          loggedUser={loggedUser}
          lastUser={lastUser}
          setLastUser={setLastUser}
        />
      </div>
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
