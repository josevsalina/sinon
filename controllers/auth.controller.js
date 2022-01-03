function AuthController() {
  var roles;
  var user;
  function setRoles(role) {
    roles = role;
    user.roles = role;
  }

  function setUser(inUser) {
    user = inUser;
  }

  function isAuthorized(neededRole) {
    if (user) {
      return user.isAuthorized(neededRole);
    }
  }
  function isAuthorizedAsync(neededRole, cb) {
    setTimeout(() => {
      cb(roles.indexOf(neededRole) >= 0);
    }, 2100);
  }

  function isAuthorizedPromise(neededRole) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(roles.indexOf(neededRole) >= 0);
      }, 100);
    });
  }

  function getIndex(req, res) {
    try {
      if (req.user.isAuthorized('admin')) {
        return res.render('index');
      }
      res.render('notAuth');
    } catch (err) {
      res.render('error');
    }
  }
  return {
    isAuthorized,
    isAuthorizedAsync,
    isAuthorizedPromise,
    setRoles,
    getIndex,
    setUser,
  };
}

module.exports = AuthController();
