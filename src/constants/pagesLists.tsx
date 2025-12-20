import type { ReactNode } from "react";
import Home from "../Modules/Home/View/Home.tsx";
import Details from "../Modules/Home/View/Details.tsx";
import Contact from "../Modules/Contact/View/Contact.tsx";
import Personal from "../Modules/Personal/View/Personal.tsx";
import Who from "../Modules/Who/View/Who.tsx";
import NotFound from "../Modules/NotFound/View/NotFound.tsx";




interface IPage {
  id: string;
  title: string;
  path: string;
  element: ReactNode;
  is_visible: boolean;
  for_navigation: boolean;
}

const pagesList: IPage[] = [
  {
    id: "home",
    title: "Home",
    path: "/",
    element: <Home />,
    is_visible: true,
    for_navigation: true,
    
  },
{
  id: "details",
  title: "Details",
  path: "/details/:id",
  element: <Details />,
  is_visible: true,
  for_navigation: false,
},
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    element: <Contact />,
    is_visible: true,
    for_navigation: true,
  },
  {
    id: "personal",
    title: "personal",
    path: "/personal",
    element: <Personal />, 
    is_visible: true,
    for_navigation: false, 
  },
 {
    id: "who",
    title: "Who",
    path: "/who",
    element: <Who />, 
    is_visible: true,
    for_navigation: true, 
  },
  {
    id: "not-found",
    title: "Not Found",
    path: "*",
    element: <NotFound />,
    is_visible: true,
    for_navigation: false,
  },

];

export default pagesList;
