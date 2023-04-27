import Home from "../pages/Home/Home";
import Profession from "../pages/Profession/Profession";
import Topic from "../pages/Topic/Topic";
import Author from "../pages/Author/Author";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

const routes = [
  { path: "/", component: Home },
  { path: "/profession", component: Profession },
  { path: "/topic", component: Topic },
  { path: "/author", component: Author },
  { path: "*", component: PageNotFound },
];

export { routes };
