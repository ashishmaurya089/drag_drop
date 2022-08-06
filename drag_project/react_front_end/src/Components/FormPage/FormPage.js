import { useState, useEffect } from "react";
import DataPage from "../DataPage/DataPage";

const FormPage = (props) => {
  const [editID, setEditID] = useState("");
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  const [userInput, setUserInput] = useState({
    title: "",
    status: "",
    description: "",
  });

  const titleChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, title: event.target.value };
    });
  };
  const statusChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, status: event.target.value };
    });
  };
  const descriptionChangeHandler = (event) => {
    setUserInput((prevState) => {
      return { ...prevState, description: event.target.value };
    });
  };

  const submitHandler = (event) => {
    let apiUrl = "";
    //   ____________to stop page reload___________
    event.preventDefault();
    if (
      userInput.title == "" ||
      userInput.status == "" ||
      userInput.description == ""
    ) {
      alert("Please fill all required fields ")
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    if (editID == "") {
      var raw = JSON.stringify({
        title: userInput.title,
        status: userInput.status,
        description: userInput.description,
      });
      apiUrl = "insertItems";
    } else {
      var raw = JSON.stringify({
        id: editID,
        title: userInput.title,
        status: userInput.status,
        description: userInput.description,
      });
      apiUrl = "updateItem";
    }

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:9000/item/${apiUrl}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.success == true) {
          setUserInput({
            title: "",
            status: "",
            description: "",
          });
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const edit_ID = (event) => {
    setEditID(event);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (editID != "") {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch(
        `http://localhost:9000/item/getItemsById?id=${editID}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          setUserInput({
            title: result.data[0].title,
            status: result.data[0].status,
            description: result.data[0].description,
          });
          setSubmitButtonText("Edit");
        })
        .catch((error) => console.log("error", error));
    }
  }, [editID]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="d-flex justify-content-center">
          <div className="card w-75">
            <div className="card-body">
              {editID == "" ? (
                <h4 className="card-title mb-4">Create A New List</h4>
              ) : (
                <h4 className="card-title mb-4">Edit List</h4>
              )}

              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Title"
                    id="title"
                    onChange={titleChangeHandler}
                    value={userInput.title}
                  />
                </div>

                <div className="col mb-3">
                  <label htmlFor="status" className="form-label">
                    Status
                  </label>
                  <select
                    className="form-select mb-3"
                    id="status"
                    onChange={statusChangeHandler}
                    value={userInput.status}
                  >
                    <option hidden>Choose... </option>
                    <option value="OPEN">Open</option>
                    <option value="IN-PROGRESS">In-Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="2"
                    placeholder="Description"
                    onChange={descriptionChangeHandler}
                    value={userInput.description}
                  ></textarea>
                </div>
              </div>
              <div className="d-grid gap-2 col-3 mx-auto">
                <button type="submit" className="btn btn-primary float-end">
                  {submitButtonText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <DataPage EditId={edit_ID}/>
    </>
  );
};

export default FormPage;
