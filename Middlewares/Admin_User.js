const Add_Error = require ("../utils/errorHandler")
const httpError = require("../utils/httpmessagestatus");

module.exports = (...status) => {
    
   return (req,res,next) => {
       const personal = req.Role.role;
       
       if (!status.includes(personal)) {
           return next(Add_Error.createError(403, httpError.FAIL, "You are not allowed"));
       }
       next();
      
    }
}

