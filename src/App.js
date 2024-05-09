import { useState } from "react";
import logo from "./logo.svg";
//import "./App.css";
import UserForm from "./UserForm";
import DisplayData from "./DisplayData";
import Make from "./Make";
import { useEffect } from "react";

function App() {
  let Record = [];
  const [Rec, setRec] = useState(Record);
  useEffect(() => {
    if (!localStorage.getItem("record")) {
      const arr = [];

      localStorage.setItem("record", JSON.stringify(arr));
    }
  });
  //const [FinalState, setFinalState] = useState(Record);
  console.log(Record);
  const newobj = (obj) => {
    setRec((pre) => {
      return [...Rec, obj];
    });
  };
  const ReplaceHandler = (obj) => {
    const fuc = Rec.map((val) => {
      if (Number(val.id) == obj.id) {
        return {
          id: obj.id,
          Name: obj.name,
          Age: obj.age,
        };
      } else {
        return val;
      }
    });

    setRec((prev) => {
      return [...fuc];
    });
  };
  const iid = (idd) => {
    const func = Rec.filter((val) => {
      if (Number(val.id) != idd) {
        return val;
      }
    });
    console.log(func);

    setRec((pre) => {
      return [...func];
    });
  };
  console.log("Hey");
  console.log(Rec);
  return (
    <div className="mb-5">
      <h3 className="text-center text-dark text-center pt-3 font-weight-bold">
        USER_FORM
      </h3>
      <UserForm Updateobj={newobj}></UserForm>
      <h3 className="text-center text-dark text-center pb-4 font-weight-bold">
        USER_RECORD
      </h3>
      <DisplayData
        obj={Rec}
        getidfordeletion={iid}
        replaceData={ReplaceHandler}
      ></DisplayData>
    </div>
  );
}

export default App;
