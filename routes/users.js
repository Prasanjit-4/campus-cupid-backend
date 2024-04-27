import express from 'express';
import { createMatch, deleteMatch, updateMatchPreference, inviteUser, viewMatches, sendMagicLink, login } from "../controllers/user.js";


const router = express.Router();



// create a match
router.post('/', createMatch).get("/", viewMatches).put("/", updateMatchPreference).delete("/", deleteMatch);

// invite a user
router.post('/invite', inviteUser);

router.get('/sendMagicLink', sendMagicLink);
router.get('/login', login);
router.get('/assetlinks.json', (req, res) => {
    res.json([{
        "relation": ["delegate_permission/common.handle_all_urls"],
        "target": {
            "namespace": "android_app",
            "package_name": "com.example",
            "sha256_cert_fingerprints":
                [""]
        }
    }]);
});

export { router };