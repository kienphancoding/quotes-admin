import { memo } from "react";
import clsx from "clsx";
import style from "./HeaderLogo.module.scss";
import { Link } from "react-router-dom";

const HeaderLogo = () => {
  return (
    <Link to="/" className={clsx(style.wrapper)}>
      Quotes Chất
    </Link>
  );
};

export default memo(HeaderLogo);
