import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import clsx from "clsx";
import style from "./Layout.module.scss"
import { createContext } from "react";

export const ApiUrlContext = createContext()

const Layout = ({ children }) => {
  const urlApi = "http://127.0.0.1:8000/api/"
  return (
    <ApiUrlContext.Provider value={urlApi}>
      <div className="container">
      <Header />
      <Sidebar />
      <div className={clsx(style.content)}>{children}</div>
    </div>
    </ApiUrlContext.Provider>
  );
};

export default Layout;
