const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
   if ("id" in req.body) {
       res.status(400).json({error: true, message: "id detected"});
       return null;
    }
   if (req && req.body && Object.keys(req.body).length) {   
        next();
    }
   else {
       res.status(404).json({error: true, message: "no body in response or empty response body"})
   }
}

exports.responseMiddleware = responseMiddleware;