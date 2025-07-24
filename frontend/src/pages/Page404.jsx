import { useNavigate } from "react-router-dom";
import "../style/page404.css";

function Page404() {
  const navitage = useNavigate()
  return (
    <div className="c404page">
      <h1>404</h1>
      <p>
        Page Not Found or Does Not Exist.
      </p>
      <div className="c404page-btns">

      <button onClick={() => navitage(-1)} className="go-back-btn">
        Go Back
      </button>
      <button onClick={() => navitage("/")} className="go-back-btn">
        Go to Home
      </button>
      </div>
    </div>
  );
}

export default Page404;
