const withAuth =  (req, res, next) => {
    if (!req.session.user) {
      res.status(403).json({ msg: "login first brotato!" });
    } else {
      next();
    }
  }

  module.exports = withAuth