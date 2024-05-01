import jwt from 'jsonwebtoken';

function generateToken(payload) {
    console.log(payload)
    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

function verifyToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(jwt.verify(token, process.env.JWT_SECRET));
    return decoded;
}

export { generateToken };
export { verifyToken };