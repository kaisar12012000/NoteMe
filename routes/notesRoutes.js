const { Router } = require("express");
const notesController = require("../controllers/notesController");
const { requireAuth } = require("../middlewares/authMiddleware");
const linksController = require("../controllers/linksController");
const limiter = require("../middlewares/rateLimiterMiddleware");

const router = Router()

router.get("/api/notes", requireAuth, notesController.getAllNotes)
router.get("/api/notes/:id", requireAuth, notesController.getNotesByNotesId)
router.post("/api/notes", requireAuth, limiter, notesController.postNotes)
router.put("/api/notes/:id", requireAuth, notesController.updateNotesByNoteIdUserId)
router.delete("/api/notes/:id", requireAuth, notesController.deleteNotesByNotesIdUserId)
router.post("/api/notes/:id/share", requireAuth, limiter, linksController.generateSharableLink)
router.post("/api/search", requireAuth, limiter, notesController.searchNotes)

module.exports = router