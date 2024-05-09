import { useReducer, useState } from "react";
import Make from "./Make";
import { upload } from "@testing-library/user-event/dist/upload";
const UserForm = (prop) => {
  var [text, setText] = useState("");
  var [Number, setNumber] = useState("");
  var [choice, setchoice] = useState(0);
  var [content, setContent] = useState("");
  const SetUserName = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };
  const SetAge = (event) => {
    event.preventDefault();
    setNumber(event.target.value);
  };
  const closeModal = (val) => {
    setchoice(val);
  };
  const TakeData = (val) => {
    val.preventDefault();
    const valObj = {
      id: Math.random(),
      Name: text,
      Age: Number,
    };

    setText("");
    setNumber("");
    if (text.length === 0 || Number.length === 0) {
      const content1 = "Please Fill The Form Correctly";
      setchoice(true);
      setContent(content1);
      return;
    }

    if (Number < 33 || Number > 100) {
      const content2 =
        "Please Enter The Age Greater Then 33 And Leasser Than 100";
      setchoice(true);
      setContent(content2);
      return;
    }

    const existing = JSON.parse(localStorage.getItem("record"));
    const Update = [...existing, valObj];
    localStorage.setItem("record", JSON.stringify(Update));
    console.log("Add", Update);

    prop.Updateobj(valObj);
  };

  return (
    <form onSubmit={TakeData} className="form-control border-0">
      <div className="card mx-auto w-75 my-5 ">
        <div className="card-body bg-dark">
          <div className="my-2">
            <label
              htmlFor="inputPassword"
              className=" col-form-label text-white fs-5 fw-bold"
            >
              USER-NAME
            </label>
            <input
              onChange={SetUserName}
              type="text"
              value={text}
              placeholder="Enter Name"
              className="form-control"
              id="inputPassword"
            ></input>
          </div>
          <div className="my-2">
            <label
              htmlFor="inputAge"
              className=" col-form-label text-white fs-5 fw-bold"
            >
              Age
            </label>
            <input
              onChange={SetAge}
              type="number"
              value={Number}
              className="form-control mb-3"
              id="inputAge"
              placeholder="Enter Age"
            ></input>
          </div>
          <button type="submit" className="btn btn-light my-3">
            SUBMIT
          </button>
        </div>
      </div>
      <Make con={choice} closeThe={closeModal} val={content}></Make>
    </form>
  );
};
export default UserForm;
