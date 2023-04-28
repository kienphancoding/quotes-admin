import clsx from "clsx";
import style from "./Home.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApiUrlContext } from "../../layout/Layout";

const Home = () => {
  const numberPage = 20;
  const [data, setData] = useState([]);
  const [topic, setTopic] = useState([]);
  const [topicId, setTopicId] = useState(0);
  const [author, setAuthor] = useState([]);
  const [authorId, setAuthorId] = useState(0);
  const [content, setContent] = useState("");

  const [count, setCount] = useState(1);
  const [page, setPage] = useState(1);

  const [topicIdUpdate, setTopicIdUpdate] = useState(0);
  const [authorIdUpdate, setAuthorIdUpdate] = useState(0);
  const [contentUpdate, setContentUpdate] = useState("");
  const [idUpdate, setIdUpdate] = useState(0);

  const [isShow, setIsShow] = useState(false);

  const urlApi = useContext(ApiUrlContext);

  let countPage = [];

  for (let i = 1; i <= Math.ceil(count / numberPage); i++) {
    countPage = [...countPage, i];
  }

  useEffect(() => {
    fetch(urlApi + `quote?page=${page}&count=${numberPage}`)
      .then((x) => x.json())
      .then((x) => {
        setData(x.quotes);
        setCount(x.count);
      });
  }, [page]);

  useEffect(() => {
    fetch(urlApi + "topic")
      .then((x) => x.json())
      .then((x) => setTopic(x));

    fetch(urlApi + "author")
      .then((x) => x.json())
      .then((x) => setAuthor(x));
  }, []);

  const handleCreate = () => {
    const dataCreate = {
      content: content,
      topic_id: topicId,
      author_id: authorId,
    };

    fetch(urlApi + "quote/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataCreate),
    });

    setContent("");
  };

  const handleUpdate = () => {
    const dataUpdate = {
      content: contentUpdate,
      topic_id: topicIdUpdate,
      author_id: authorIdUpdate,
    };

    fetch(urlApi + "quote/" + idUpdate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataUpdate),
    });

    setIsShow(false);
  };

  return (
    <div className={clsx(style.wrapper)}>
      <h1>Create Quotes</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h1>Authors</h1>
          {author.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onClick={() => setAuthorId(item.id)}
                  checked={item.id === authorId}
                />
                <label>{item.name}</label>
              </div>
            );
          })}

          <h1>Topics</h1>
          {topic.map((item, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  onClick={() => setTopicId(item.id)}
                  checked={item.id === topicId}
                />
                <label>{item.name}</label>
              </div>
            );
          })}

          <label className="block text-gray-700 text-sm font-bold mb-2">
            content
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      </div>

      <h1>Tổng hợp các quotes</h1>

      <ul className="inline-flex -space-x-px py-2">
        {countPage.map((item, index) => {
          return (
            <li
              className={
                page === index + 1
                  ? "px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "px-3 py-2 leading-tight text-gray-500 bg-white border border"
              }
              key={index}
              onClick={() => setPage(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Tác giả
              </th>
              <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
                Quotes
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {data.map((item, index) => {
            return (
              <tbody key={index}>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {item?.id}
                  </th>
                  <td className="px-6 py-4">{item?.author.name}</td>
                  <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                    {item?.content}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setIsShow(true);
                        setIdUpdate(item.id);
                        fetch(urlApi + "quote/" + item.id)
                          .then((x) => x.json())
                          .then((x) => setContentUpdate(x.content));
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>

      <h1>Update Quotes ID : {idUpdate}</h1>
      {isShow && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h1>Authors</h1>
            {author.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onClick={() => setAuthorIdUpdate(item.id)}
                    checked={item.id === authorIdUpdate}
                  />
                  <label>{item.name}</label>
                </div>
              );
            })}

            <h1>Topics</h1>
            {topic.map((item, index) => {
              return (
                <div key={index}>
                  <input
                    type="checkbox"
                    onClick={() => setTopicIdUpdate(item.id)}
                    checked={item.id === topicIdUpdate}
                  />
                  <label>{item.name}</label>
                </div>
              );
            })}

            <label className="block text-gray-700 text-sm font-bold mb-2">
              content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={contentUpdate}
              onChange={(e) => setContentUpdate(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleUpdate}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
