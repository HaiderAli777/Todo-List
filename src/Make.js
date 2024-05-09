import UserForm from "./UserForm";
import DisplayData from "./DisplayData";
import { useState } from "react";
import "./new.css";
const Make = (prop) => {
  const [check, setCheck] = useState(true);
  const val = prop.val;
  console.log(prop.val);

  if (check === prop.con)
    return (
      <div className="bac">
        <div className="pop">
          <div className="text-center pt-2 text-white pop1">INVALID</div>
          <h4 className="text-dark text-center py-5">{val}</h4>
          <button
            type="button"
            class="btn btn-dark bot"
            onClick={() => {
              prop.closeThe(false);
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
};

export default Make;
