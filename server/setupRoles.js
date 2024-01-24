// const mongoose = require('mongoose');
// const RoleMapping = require('./api/models/roleMapping');

// async function setupRoles() {

//     await mongoose.connect('mongodb+srv://Team18:Team18pwd@node-rest-canvas.lystdp9.mongodb.net/?retryWrites=true&w=majority', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });


//     const editorRoleMapping = new RoleMapping({
//         role: 'editor',
//         permissions: ['GET', 'POST', 'PUT','PATCH', 'DELETE'],
//     });
//     await editorRoleMapping.save();


//     const viewerRoleMapping = new RoleMapping({
//         role: 'viewer',
//         permissions: ['GET'],
//     });
 //     await viewerRoleMapping.save();

   
//     mongoose.connection.close();
// }


// setupRoles();