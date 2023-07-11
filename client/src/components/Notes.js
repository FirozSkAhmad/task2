import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";

const Notes = ({ text, updateMode,deletenotes }) => {

  return (
    <div className="notess-notes">
      <div className="text">{text}</div>
      <div className="icons">
        <AiFillDelete onClick={deletenotes} className="icon" />
        <BiEdit className="icon" onClick={updateMode} />
      </div>
    </div>
  );
};

export default Notes;