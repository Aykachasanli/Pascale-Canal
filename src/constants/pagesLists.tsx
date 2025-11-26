import type { ReactNode } from "react";
import Home from "../Modules/Home/View/Home.tsx";
import Details from "../Modules/Home/View/Details.tsx";



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
}
//   {
//     id: "car-details",
//     title: "Car Details",
//     path: "/car-details/:id",
//     element: <CarDetails />,
//     is_visible: true,
//     for_navigation: false,
//   },

];

export default pagesList;
