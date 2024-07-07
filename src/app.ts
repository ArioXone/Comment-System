import { Main } from "./main";
import { User } from "./user";
import { Insert } from "./insert";

export { chars, currentUser, app };

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

  let index: number = Math.floor(Math.random() * users.length);

  let user = new User(
    Number(`${users[index].id}`),
    `${users[index].name}`,
    `${users[index].avatar}`
  );

  return user;
}

let chars = new Insert(1000);

let currentUser = generateUser();

let app = new Main();
