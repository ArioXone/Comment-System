"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.currentUser = exports.chars = void 0;
const main_1 = require("./main");
const user_1 = require("./user");
const insert_1 = require("./insert");
function generateUser() {
    let users = [
        { id: 0, name: "Son", avatar: "./src/images/avatars/Son.png" },
        { id: 1, name: "Iron Man", avatar: "./src/images/avatars/IronMan.png" },
        { id: 2, name: "Bat Man", avatar: "./src/images/avatars/BatMan.png" },
        {
            id: 3,
            name: "One Punch Man",
            avatar: "./src/images/avatars/OnePunchMan.png",
        },
        { id: 4, name: "Obi Van", avatar: "./src/images/avatars/ObiVanCenoby.png" },
    ];
    let index = Math.floor(Math.random() * users.length);
    let user = new user_1.User(Number(`${users[index].id}`), `${users[index].name}`, `${users[index].avatar}`);
    return user;
}
let chars = new insert_1.Insert(1000);
exports.chars = chars;
let currentUser = generateUser();
exports.currentUser = currentUser;
let app = new main_1.Main();
exports.app = app;
