const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  console.log(authHeader)
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) {
        res.status(403).json("Token is not validated");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenciated!!");
  }
};

const verifyToekenAndAuthorization =  (req, res, next) => {
  
  verifyToken(req, res, () => {
   
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("you are not allowed to do this action");
    }
  });
};



const verifyToekenAndAdmin =  (req, res, next) => {
    verifyToken(req, res, () => {
      // console.log(req.user.isAdmin)
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("you are not allowed to do this action!!");
      }
    });
  };

module.exports = { verifyToken, verifyToekenAndAuthorization, verifyToekenAndAdmin };
