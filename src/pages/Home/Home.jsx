import clsx from "clsx";
import style from "./Home.module.scss";
import { useContext, useEffect, useState } from "react";
import { ApiUrlContext } from "../../layout/Layout";

const Home = () => {
  const [data, setData] = useState([]);

  const urlApi = useContext(ApiUrlContext)

  useEffect(() => {
    fetch(urlApi+"quote?page=1&count=5")
      .then((x) => x.json())
      .then((x) => setData(x));
  },[]);
  return (
    <div className={clsx(style.wrapper)}>
      <h1>Create Quotes</h1>
      <form>
        
      </form>
      <h1>Tổng hợp các quotes</h1>
      <table>
        <thead>
          <td>ID</td>
          <td>Quotes</td>
          <td>Tác giả</td>
        </thead>

        {data.map((item, index) => {
          return (
            <tbody key={index}>
              <td>{item.id}</td>
              <td>{item.content}</td>
              <td>{item.author.name}</td>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default Home;
