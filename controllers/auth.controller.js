function AuthController() {
  var roles;

  function setRoles(role) {
    roles = role;
  }

  function isAuthorized(neededRole) {
    return roles.indexOf(neededRole) >= 0;
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
  return { isAuthorized, isAuthorizedAsync, isAuthorizedPromise, setRoles };
}

module.exports = AuthController();
