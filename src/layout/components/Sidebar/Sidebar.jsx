import clsx from "clsx";
import style from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faHouse, faIcons, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const list = [
    { path: "/", name: "Trang chủ", icon: faHouse },
    { path: "/author", name: "Tác giả", icon: faUser },
    { path: "/profession", name: "Nghề nghiệp", icon: faCamera },
    { path: "/topic", name: "Chủ đề", icon: faIcons },
  ];
  
  return (
    <div className={clsx(style.wrapper)}>
      {list.map((item, index) => {
        return (
          <Link key={index} to={item.path} className={window.location.pathname===item.path?clsx(style.item,style.active):clsx(style.item)}>
            <FontAwesomeIcon icon={item.icon} className={clsx(style.icon)}/>
            <div className={clsx(style.text)}>{item.name}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
