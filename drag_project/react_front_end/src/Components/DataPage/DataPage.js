import { useState, useEffect } from "react";
import { useDrop, useDrag } from "react-dnd";
import ListData from "../ListData";

const DataPage = (props) => {
  const [taskData, setTaskData] = useState([]);
  const [playerType, setplayerType] = useState("COMPLETED");

  const [{ isOver }, addToTeamRef] = useDrop({
    accept: "OPEN",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
    accept: "IN-PROGRESS",
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  });

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:9000/item/getItems", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setTaskData(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const editAPI = (item, type) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (type == "OPEN") {
      var raw = JSON.stringify({
        id: item.id,
        status: "IN-PROGRESS",
      });
    }

    if (type == "IN-PROGRESS") {
      var raw = JSON.stringify({
        id: item.id,
        status: "COMPLETED",
      });
    }
    // if (type == "IN-PROGRESS") {
    //   var raw = JSON.stringify({
    //     id: item.id,
    //     status: "OPEN",
    //   });
    // }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:9000/item/updateItemStatus", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const moveOPEN = (item) => {
    editAPI(item, "OPEN");
  };
  const movePROGRESS = (item) => {
    editAPI(item, "IN-PROGRESS");
  };

  const moveCOMPLETED = (item) => {
    editAPI(item, "COMPLETED");
  };

  const addExpensehandler = (event) => {
    console.log(event);
    props.EditId(event);
  };
  const deleteList = (event) => {
    console.log(event);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: event,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `http://localhost:9000/item/deleteItemById?id=${event}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        window.location.reload();
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="d-flex card w-100">
          <h5 className="card-header text-center">Task List</h5>
          <div className="container">
            <div className="row my-4">
              <div className="col">
                <div className="card">
                  <h5 className="card-header">Task Open</h5>
                  <div className="card-body">
                    {taskData
                      .filter((status) => status.status == "OPEN")
                      .map((item) => (
                        <ListData
                          title={item.title}
                          id={item._id}
                          listType={"OPEN"}
                          button="Edit"
                          onDropList={moveOPEN}
                          ref={addToTeamRef}
                          onSaveNewExpenseData={addExpensehandler}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <h5 className="card-header">Task Work in progress</h5>
                  <div className="card-body">
                    {taskData
                      .filter((status) => status.status == "IN-PROGRESS")
                      .map((item) => (
                        <ListData
                          title={item.title}
                          id={item._id}
                          listType={"IN-PROGRESS"}
                          button="Edit"
                          onDropList={movePROGRESS}
                          ref={removeFromTeamRef}
                          onSaveNewExpenseData={addExpensehandler}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <h5 className="card-header">Task Completed</h5>
                  <div className="card-body">
                    {taskData
                      .filter((status) => status.status == "COMPLETED")
                      .map((item) => (
                        <ListData
                          title={item.title}
                          id={item._id}
                          listType={"COMPLETED"}
                          button="Del"
                          onDropList={moveCOMPLETED}
                          ref={removeFromTeamRef}
                          onSaveNewExpenseData={deleteList}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataPage;
