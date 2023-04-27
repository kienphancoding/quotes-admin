import clsx from "clsx";
import style from "./Header.module.scss"
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderSearch from "./HeaderSearch/HeaderSearch";

const Header = () => {
    return ( 
        <div className={clsx(style.wrapper)}>
            <HeaderLogo/>
            <HeaderSearch/>
        </div>
     );
}
 
export default Header;