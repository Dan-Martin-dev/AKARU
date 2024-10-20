import { Link } from "react-router-dom";
import "../../src/styles/header.css";

const Header = () => {
  return (
    <div className="header-body">

      {/* logo */}
      <div className="menu-logo">
        <Link className="" to="/">
          DAN MARTIN
        </Link>
      </div>
      
    </div>
  );
};

export default Header;
