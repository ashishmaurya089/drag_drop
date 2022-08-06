import React from "react";
import { useDrag } from "react-dnd";

function ListData(props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "listType",
    item: { id: props.id },
    end: (item, monitor) => {
      if (item != "") {
        props.onDropList(item);
        console.log(item);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const editItem = (event) => {
    props.onSaveNewExpenseData(event.target.id);
  };

  return (
    <div
      style={{ background: isDragging ? "#e8ede9" : "white" }}
      ref={drag}
      color={isDragging ? "#e8ede9" : "black"}
      className="border border-primary p-2 mb-1 d-flex row "
      key={props.id}
    >
      <p className="m-0 col-10">{props.title}</p>
      <button
        type="submit"
        className="btn btn-outline-dark btn-sm col-2"
        onClick={editItem}
        id={props.id}
      >
        {props.button}
      </button>
    </div>
  );
}

export default ListData;
