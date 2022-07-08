import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeePay from "./components/EmployeePay";
import { SidebarData } from "./components/SidebarData";
import "./styles/App.css";

library.add(fas, fab, far);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <HeaderBar />
        <Routes>
          {SidebarData.map((route, index) => (
            <Route
              key={index}
              path={route.link}
              element={<route.component />}
            ></Route>
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
