import { Outlet } from "react-router-dom";
import MenuBar from "./pages/menuBar";

function App() {
  return (
    <>
      <MenuBar />
      <div id="area">
        <Outlet/>
      </div>
    </>
  );
}

export default App;
