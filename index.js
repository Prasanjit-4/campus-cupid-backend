import express from 'express';
// import connectDatbase from './database/db.js';
import { router } from './routes/users.js';
import 'dotenv/config';


const app = express();

const PORT = process.env.PORT;

app.get('/.well-known/assetlinks.json', (req, res) => {
    res.json([
        {
            "relation": [
                "delegate_permission/common.handle_all_urls"
            ],
            "target": {
                "namespace": "android_app",
                "package_name": "com.example.campuscupid",
                "sha256_cert_fingerprints": [
                    process.env.SHA256_CERT
                ]
            }
        }
    ]);
});
app.use(express.json());
app.use('/api/users', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});