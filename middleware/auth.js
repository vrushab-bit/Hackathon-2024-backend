import jwt from "jsonwebtoken";

// This function checks the validity of a JWT token and authorizes the request if it is valid.
export const checkJWT = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    // Extract the JWT token from the authorization header, if it exists
    const token = authHeader && authHeader.split(" ")[1];
    if (token) {
      // If the token is null, send a 401 Unauthorized status and end the request
      if (token === null) return res.sendStatus(401);

      try {
        const user_id = jwt.verify(token, process.env.JWT_SECRET);
        if (!user_id) return res.sendStatus(401);

        // Assign the extracted user_id to the request object
        req.userId = user_id._id;

        // If the user_id is not present in the JWT payload, send a 401 Unauthorized status
        if (!user_id) return res.sendStatus(401);

        // If the token is valid, proceed to the next middleware or route handler
        next();
      } catch (e) {
        // Log the error and send a 401 Unauthorized status if token verification fails
        // console.log(e);
        return res.sendStatus(401);
      }
    }
  } else {
    return res.sendStatus(401);
  }
};
