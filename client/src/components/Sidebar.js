import { SidebarData } from "./SidebarData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo"> TecMaster </div>
      <hr
        style={{
          borderColor: "white",
          color: "white",
          backgroundColor: "white",
          height: "2px",
          opacity: "100%",
        }}
      />
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              /*   id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}*/
            >
              <Link to={val.link} id="title">
                <div>
                  <FontAwesomeIcon icon={val.icon} /> {val.title}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div id="footerSidebar">TecMaster@2021 All Rigths Reserved</div>
    </div>
  );
}

export default Sidebar;
