// function hasPermission(req, res, next) {
//     const userPermissions = req.user.permissions || [];
//     const requiredPermissions = getRequiredPermissions(req.method);

//     if (requiredPermissions.every(permission => userPermissions.includes(permission))) {
//         next();
//     } else {
//         res.sendStatus(401);
//     }
// }

// function getRequiredPermissions(method) {
//     switch (method) {
//         case 'GET':
//             return ['GET'];
//         case 'POST':
//         case 'PATCH':
//         case 'DELETE':
//             return ['POST', 'PATCH', 'DELETE'];
//         default:
//             return [];
//     }
// }

// module.exports = hasPermission;