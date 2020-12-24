const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

const { isAuthenticated } = require('../helpers/auth')

//create and get new note
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/add", isAuthenticated, createNewNote);

//get all notes
router.get("/notes", isAuthenticated, renderNotes);

//update note
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.post("/notes/edit/:id", isAuthenticated, updateNote);

//delete note
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
