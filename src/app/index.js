import Main from "./main";
import Basket from "./basket";
import useSelector from "../store/use-selector";
import {Route, Routes} from "react-router-dom";
import {getRouteProductDetails, getRouteMain} from "../routes";
import Product from "./product";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {

  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={getRouteMain()} element={<Main />} />
        <Route path={getRouteProductDetails(':id')} element={<Product />} />
      </Routes>
      {activeModal === 'basket' && <Basket/>}
    </>
  );
}

export default App;
