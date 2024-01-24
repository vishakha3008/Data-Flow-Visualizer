// function isLoggedIn(req, res, next) {
//     console.log(req.user);
//     const userPermissions = req.user.permissions || [];

//     if (userPermissions.includes(req.method)) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// module.exports = isLoggedIn;
