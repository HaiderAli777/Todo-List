import { useState } from "react";
import App from "./App";
import UserForm from "./UserForm";
import Make from "./Make";
const DisplayData = (prop) => {
  let content = prop.obj.filter((val) => {
    return val;
  });

  let content1 = JSON.parse(localStorage.getItem("record")) || [];
  console.log("its content", content1);
  let updateContent = content1.filter((obj) => {
    if (obj) {
      return obj;
    }
  });
  let [con, setContent] = useState("");
  var [choice, setchoice] = useState(0);
  const closeModal = (val) => {
    setchoice(val);
  };
  var [text, setText] = useState("");
  var [Number, setNumber] = useState("");
  const [edit, setEdit] = useState(false);
  const [idi, setId] = useState(-1);
  //here we make delete handler
  const deleteHandler = (event) => {
    console.log(event.target.value);
    const id = event.target.value;
    console.log("its me", id);
    prop.getidfordeletion(id);
    const exist = JSON.parse(localStorage.getItem("record"));
    console.log("checking for eerroer", exist);
    const updatedobj = exist.filter((obj) => {
      if (obj.id != id) {
        return obj;
      }
    });
    console.log("del", updatedobj);
    localStorage.setItem("record", JSON.stringify(updatedobj));
  };
  const editHandler = (event) => {
    setEdit(true);
    setId(event.target.value);
  };
  const DoneHandler = (event) => {
    const id = event.target.value;
    const obj = {
      id: id,
      name: text,
      age: Number,
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
        "Please Enter The Age Greater Then 33 And leser than 100";
      setchoice(true);
      setContent(content2);
      return;
    }

    prop.replaceData(obj);

    const exist = JSON.parse(localStorage.getItem("record"));
    const updatedobj = exist.map((obj) => {
      if (obj.id != idi) {
        return obj;
      } else {
        return {
          id: idi,
          Name: text,
          Age: Number,
        };
      }
    });
    localStorage.setItem("record", JSON.stringify(updatedobj));
    console.log("update", updatedobj);
    setEdit(false);
    setId(-1);
    setText("");
    setNumber("");
  };

  //PLZ

  const SetUserName = (event) => {
    event.preventDefault();
    setText(event.target.value);
  };
  const SetAge = (event) => {
    event.preventDefault();
    setNumber(event.target.value);
  };

  return (
    <div className="w-75 mx-auto">
      <Make con={choice} closeThe={closeModal} val={con}></Make>
      <div className=" bg-dark">
        {updateContent.map((val) => {
          if (val.id != idi) {
            return (
              <div className="border border-primary" key={val.id}>
                <div className="row py-2  px-4 ">
                  <div className="col-12 col-md-4">
                    <h3 className=" text-white text-center py-1">{val.Name}</h3>
                  </div>
                  <div className="col-12 col-md-4">
                    <h4 className="text-white text-center py-1">
                      (AGE : {val.Age})
                    </h4>
                  </div>
                  <div className="col-12 col-md-2 py-1 text-center ">
                    <button
                      type="button"
                      class="btn btn-danger  py-1"
                      onClick={deleteHandler}
                      value={val.id}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-12 col-md-2 py-1 text-center">
                    <button
                      type="button"
                      class="btn btn-danger px-4  py-1"
                      onClick={editHandler}
                      value={val.id}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div className="border border-primary" key={val.id}>
                {edit && (
                  <div className="row py-2  px-4 ">
                    <div className="col-12 col-md-5 my-3">
                      <input
                        onChange={SetUserName}
                        type="text"
                        value={text}
                        placeholder="Enter Name"
                        className="form-control"
                        id="inputPassword"
                      ></input>
                    </div>
                    <div className="col-12 col-md-5 my-3">
                      <input
                        onChange={SetAge}
                        type="number"
                        value={Number}
                        className="form-control mb-3"
                        id="inputAge"
                        placeholder="Enter Age"
                      ></input>
                    </div>

                    <div className="col-12 col-md-2 my-3 text-center">
                      <button
                        type="button"
                        class="btn btn-danger px-4"
                        onClick={DoneHandler}
                        value={val.id}
                        disabled={!(text.length > 0 && Number > 33)}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default DisplayData;
