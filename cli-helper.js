import 'dotenv/config';
import connectDb from './db.js';

try {
    await connectDb();
} catch( e ) {
    console.log(e.messsage);
}


import Role from './models/Role.js';

// default system roles here
const roles = [
    {
        name: "admin",
        actions: [
            "create.blog",
            "view.blog",
            "delete.blog",
            "update.blog"
        ] 
    },
    {
        name: "author",
        actions: [
            "view.blog",
            "update.blog"
        ]
    }
]

try {
    await Role.insertMany(roles);
    console.log("default roles are created");
} catch(e) {
    console.log(e);
}