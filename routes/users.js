import express from 'express';
import { createMatch, deleteMatch, updateMatchPreference, inviteUser, viewMatches } from "../controllers/user.js";

const router = express.Router();



// create a match
router.post('/', createMatch).get("/", viewMatches).put("/", updateMatchPreference).delete("/", deleteMatch);

//delete a match
// router.delete('/:id', deleteMatch);

// update match preference
// router.put('/:id', updateMatchPreference);

// invite a user
router.post('/invite', inviteUser);

export { router };