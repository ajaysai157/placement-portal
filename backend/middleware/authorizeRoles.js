import ApiError from "../errors/ApiError.js";

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access Denied"));
    }

    next();
  };
};

export default authorizeRoles;