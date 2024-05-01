import express from 'express';
import { createMatch, deleteMatch, updateMatchPreference, inviteUser, viewMatches, sendMagicLink, login, checkUserRoute } from "../controllers/user.js";



const router = express.Router();



// create a match
router.get("/viewmatches/:uid", viewMatches)
router.put("/update/:uid/:mid/:pref", updateMatchPreference)
router.delete("/delete/:uid/:mid", deleteMatch);
router.post('/create/:uid/:mid/:pref/:status', createMatch);
router.post('/invite/:email', inviteUser);
router.get('/sendMagicLink/:email', sendMagicLink);
router.get('/login/:token', login);
router.get('/check/:uid', checkUserRoute);
// router.get('/.well-known/assetlinks.json', (req, res) => {
//     res.json([
//         {
//             "relation": [
//                 "delegate_permission/common.handle_all_urls"
//             ],
//             "target": {
//                 "namespace": "android_app",
//                 "package_name": "com.example.test_backend",
//                 "sha256_cert_fingerprints": [
//                     process.env.SHA256_CERT
//                 ]
//             }
//         }
//     ]);
// });

export { router };