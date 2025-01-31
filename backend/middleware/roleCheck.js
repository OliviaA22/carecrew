const roleCheck = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (!req.user.id || !role.includes(req.user.role)) {
      return res.status(403).json({ message: "You are not authorized to perform this action!" });
    }
    next();
  };
};

module.exports = {
  roleCheck,
};
