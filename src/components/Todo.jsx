import "./style.css";
import logo from "../images/logo.png";
import { useState, useEffect } from "react";

const fetchLocalData = () => {
  const lists = localStorage.getItem("TodoList");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [task, setTask] = useState("");
  const [allTask, setAllTask] = useState(fetchLocalData());
  const [isEditItem, setisEditItem] = useState("");
  const [toggle, setToggle] = useState(false);

  const addTask = () => {
    if (!task) {
      alert("Please Enter the value");
    } else if (task && toggle) {
      setAllTask(
        allTask.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: task };
          }
          return curElem;
        })
      );

      setTask([]);
      setisEditItem(null);
      setToggle(false);
    } else {
      const myTask = {
        id: new Date().getTime().toString(),
        name: task,
      };
      setAllTask([...allTask, myTask]);
    }
    setTask("");
  };
  const taskDelete = (index) => {
    const upDatedList = allTask.filter((curElem) => {
      return index !== curElem.id;
    });
    setAllTask(upDatedList);
  };

  const editTask = (index) => {
    const curEditTask = allTask.find((curElem) => {
      return curElem.id === index;
    });
    setTask(curEditTask.name);
    setisEditItem(index);
    setToggle(true);
  };
  const deleteAll = () => {
    setAllTask([]);
  };

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(allTask));
  }, [allTask]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={logo} alt="todologo" height="100px" width="100px  " />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              className="form-control "
              type="text"
              placeholder="✍ Add Item"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />
            {toggle ? (
              <i className="far fa-edit add-btn" onClick={() => addTask()}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={() => addTask()}></i>
            )}
          </div>
          {allTask.map((curElem, index) => {
            return (
              <div className="showItems" key={curElem.id}>
                <div className="eachItem">
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editTask(curElem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => taskDelete(curElem.id)}
                    ></i>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="showItems">
            <button
              className="btn effects04"
              data-sm-link-text="Remove ALl"
              onClick={() => deleteAll()}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
