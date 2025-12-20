import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import pagesList from "../constants/pagesLists";
import { CircleOverlay } from "../components/animation/CircleOverlay";

const PascaleRouter = () => {
  const location = useLocation();

  return (
    <>
      <CircleOverlay key={"overlay" + location.pathname} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {pagesList
            .filter((page) => page.is_visible)
            .map((item) => (
              <Route
                key={item.id}
                path={item.path}
                element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.element}
                  </motion.div>
                }
              />
            ))}
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default PascaleRouter;
