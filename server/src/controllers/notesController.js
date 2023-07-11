const notesModel = require("../models/NotesModel");

async function getNotes(req, res) {
  try {
    const token = req.headers.decodedToken;

    const notes = await notesModel.find({
      user_id: token.user_id,
    });

    return res.status(200).send({ status: true, notesData: notes })
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function addNotes(req, res) {
  try {
    const { text } = req.body;

    const token = req.headers.decodedToken;

    const data = { text: text, user_name: token.name, user_id: token.user_id };

    const createdData = notesModel.create(data)

    return res.status(201).send(createdData);
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
async function deleteNotes(req, res) {
  try {
    const { _id } = req.body;

    await notesModel.findByIdAndDelete({ _id })

    return res.status(202).send({ msg: "deleted sucessfully" });
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

async function updateNotes(req, res) {
  try {
    const { text, notesId } = req.body;
    const updatedData = await notesModel.findByIdAndUpdate({ _id: notesId }, { text: text }, { new: true })
    return res.status(201).send({ msg: "updated sucessfully", updatedData });
  }
  catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { getNotes, addNotes, deleteNotes, updateNotes }
