import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Notes from '../components/Notes';
import { addNotes, getAllNotes, updateNotes, deleteNotes } from "../utils/Utils";
import NavBar from '../components/NavBar';
import { toast } from 'react-hot-toast';

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [notesId, setNotesId] = useState("");

    const navigate = useNavigate();

    const handleLogOut = () => {

        localStorage.removeItem("token");

        toast.success("logged out")

        navigate("/login");
    };

    useEffect(() => {
        getAllNotes(setNotes);
    }, []);


    const updateMode = (_id, text) => {
        setIsUpdating(true);
        setText(text);
        setNotesId(_id);
    };

    return (
        <>
            <NavBar />
            <div className="App">
                <div className="dash-container">

                    <h1>Hello {localStorage.getItem("name")} </h1>

                    <div className="dash-top">
                        <input
                            type="text"
                            placeholder="Add Notess..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />

                        <div
                            className="add"
                            onClick={
                                isUpdating
                                    ? () => updateNotes(notesId, text, setNotes, setText, setIsUpdating)
                                    : () => addNotes(text, setText, setNotes)
                            }
                        >
                            {isUpdating ? "Update" : "Add"}
                        </div>
                    </div>

                    <div className="dash-list">
                        {notes.map((item) => (
                            <Notes
                                key={item._id}
                                text={item.text}
                                updateMode={() => updateMode(item._id, item.text)}
                                deleteNotes={() => deleteNotes(item._id, setNotes, isUpdating)}
                            />
                        ))}
                    </div>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </div>
        </>

    )
}

export default Home
