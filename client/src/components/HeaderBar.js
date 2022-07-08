import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeaderBar() {
  return (
    <div className="headerBar">
      <div className="bellIconDiv">
        <FontAwesomeIcon
          icon={["far", "fa-bell"]}
          className="headerIcon"
          style={{ height: "30px", width: "30px" }}
        />
      </div>
      <div className="userIconDiv">
        <FontAwesomeIcon
          icon="fa-solid fa-circle-user"
          style={{ color: "grey", height: "30px", width: "30px" }}
          className="headerIcon"
        />
      </div>
    </div>
  );
}

export default HeaderBar;
