import axios from "axios";
import { toast } from 'react-hot-toast'
const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

const baseUrl = `${process.env.REACT_APP_BASE_URL}`;

async function getAllNotes(setNotes) {
  try {
    const options = {
      url: `${baseUrl}/getNotes`,
      method: "GET",
      headers: {
        authorization: `${token}`,
      },
    }
    const docs = await axios(options)
    setNotes(docs.data.NotesData)
  }
  catch (err) {
    console.log(err)
  }
};

async function addNotes(text, setText, setNotes) {
  try {

    if (text.length === 0) {
      toast.error("Add some Notes before click on Add button")
    }
    else {
      const options = {
        url: `${baseUrl}/save`,
        method: "POST",
        headers: {
          authorization: `${token}`,
        },
        data: { userId, text }
      }

      await axios(options)
      await getAllNotes(setNotes)
      toast.success("added Notes sucessfully")
      setText("")
    }

  }
  catch (err) {
    console.log(err)
  }
};

async function updateNotes(NotesId, text, setNotes, setText, setIsUpdating) {
  try {
    const options = {
      url: `${baseUrl}/update`,
      method: "PUT",
      headers: {
        authorization: `${token}`,
      },
      data: { userId, NotesId, text }
    }

    await axios(options)

    setText("");
    setIsUpdating(false);
    await getAllNotes(setNotes);

    toast.success("updated Notes sucessfully")
  }
  catch (err) {
    console.log(err)
  }
};

async function deleteNotes(_id, setNotes, isUpdating) {

  try {
    if (isUpdating) {
      toast.error("As you already clicked on the update button, update the Notes before delete")
    }
    else {
      const options = {
        url: `${baseUrl}/delete`,
        method: "DELETE",
        headers: {
          authorization: `${token}`,
        },
        data: { userId, _id }
      }

      await axios(options)
      await getAllNotes(setNotes);
      toast.success("deleted Notes sucessfully")
    }
  }
  catch (err) {
    console.log(err)
  }

};

export { getAllNotes, updateNotes, addNotes, deleteNotes };