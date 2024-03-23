const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        const headerToken = req.headers["authorization"];
        
        /*const token = headerToken.replace("Bearer ", "");
        console.log(token)*/
        const formattedToken = headerToken.replace(/^Bearer\s+|"/g, "");
        if (!formattedToken) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        const decode = jwt.verify(formattedToken, process.env.JWT_SECRET_KEY);
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ errorMessage: "Invalid token!" });
    }
};

module.exports = verifyToken;

module.exports = verifyToken;