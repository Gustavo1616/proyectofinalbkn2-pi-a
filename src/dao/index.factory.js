import dbConnect from '../helpers/dbConnect.helper.js';

const { PERSISTENCE, LINK_MONGO } = process.env;
let dao = {};
switch (PERSISTENCE) {
    case "MEMORY":
        break;
    case 'fs':
        {
            console.log("fs database connected");
            const { productsManager, usersManager } = await import("./fs/manager.fs.js");
            const { cartsManager } = await import("./fs/cart.fs.js");
            dao = { productsManager, usersManager, cartsManager };
        }
        break;
    default: {
        await dbConnect(LINK_MONGO);
        console.log("mongo database connected");
        const { usersManager, productsManager } = await import("./mongo/managers/manager.mongo.js");
        const { cartsManager } = await import("./mongo/managers/carts.mongo.js");
        dao = { productsManager, usersManager, cartsManager };
    }
        break;
};

const { productsManager, usersManager, cartsManager } = dao;
export { productsManager, usersManager, cartsManager };
export default dao;

