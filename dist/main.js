(() => {
  "use strict";
  var e = {
      945: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.app = t.currentUser = t.chars = void 0);
        const a = r(450),
          o = r(390);
        let s = new (r(932).Insert)(1e3);
        t.chars = s;
        let n = (function () {
          let e = [
              { id: 0, name: "Son", avatar: "./src/images/avatars/Son.png" },
              {
                id: 1,
                name: "Iron Man",
                avatar: "./src/images/avatars/IronMan.png",
              },
              {
                id: 2,
                name: "Bat Man",
                avatar: "./src/images/avatars/BatMan.png",
              },
              {
                id: 3,
                name: "One Punch Man",
                avatar: "./src/images/avatars/OnePunchMan.png",
              },
              {
                id: 4,
                name: "Obi Van",
                avatar: "./src/images/avatars/ObiVanCenoby.png",
              },
            ],
            t = Math.floor(Math.random() * e.length);
          return new o.User(
            Number(`${e[t].id}`),
            `${e[t].name}`,
            `${e[t].avatar}`
          );
        })();
        t.currentUser = n;
        let i = new a.Main();
        t.app = i;
      },
      932: (e, t) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Insert = void 0),
          (t.Insert = class {
            constructor(e) {
              this.maxChars = e;
            }
            charsCounter() {
              let e = document.querySelector(".send-area__input"),
                t = document.querySelector(".send-area__btn"),
                r = document.querySelector(".header-area__error"),
                a = document.querySelector(".header-area__maxletters");
              (a.innerHTML = `Макс. ${this.maxChars} символов`),
                e.addEventListener("input", () => {
                  let o = Number(e.value.length);
                  (a.innerHTML = `${o}/1000`),
                    e.value.length > 0 &&
                      (a.classList.remove("red-text"),
                      (r.innerHTML = ""),
                      (t.disabled = !1)),
                    e.value.length === 1e3 &&
                      ((r.innerHTML =
                        "Достигнута максимальная длина комментария"),
                      r.classList.add("red-text"),
                      a.classList.add("red-text"),
                      (t.disabled = 0)),
                    0 === e.value.length &&
                      ((a.innerHTML = `Макс. ${this.maxChars} символов`),
                      a.classList.remove("red-text"),
                      (r.innerHTML = ""),
                      (t.disabled = !0));
                }),
                t.addEventListener("click", () => {
                  (a.innerHTML = `Макс. ${this.maxChars} символов`),
                    (t.disabled = !0);
                });
            }
          });
      },
      450: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.Main = void 0);
        const a = r(945),
          o = r(945),
          s = r(945);
        t.Main = class {
          constructor() {
            this.data = [];
          }
          sortingBy() {
            a.currentUser.sortingByDate(),
              a.currentUser.sortingByDate(),
              a.currentUser.sortingByAnswersQuantity();
          }
          start() {
            null != localStorage.getItem("data") &&
              ((o.app.data = JSON.parse(localStorage.getItem("data"))),
              o.app.data.forEach(function (e) {
                document.querySelector(".comment-list").innerHTML += e.text;
              }),
              document.querySelectorAll(".reply-block").forEach(function (e) {
                let t = e.closest(".comment-block").getAttribute("data-index");
                o.app.data[Number(t)].answers.forEach(function (t) {
                  e.innerHTML += t.text;
                });
              }),
              document
                .querySelectorAll(".post-options__num")
                .forEach(function (e) {
                  if (e.hasAttribute("data-num-comment")) {
                    let t = Number(
                      e.closest(".comment-block").getAttribute("data-index")
                    );
                    (e.value = o.app.data[t].rate),
                      Number(e.value) < 0 && e.classList.add("red-text"),
                      o.app.data[t].rated.find(
                        (e) => e.id === a.currentUser.id
                      ) &&
                        (e
                          .closest(".post-options-counter")
                          .querySelector(".btn-counter--plus")
                          .setAttribute("disabled", ""),
                        e
                          .closest(".post-options-counter")
                          .querySelector(".btn-counter--minus")
                          .setAttribute("disabled", ""));
                  }
                  if (e.hasAttribute("data-num-answer")) {
                    let t = Number(
                        e
                          .closest(".reply-block__item")
                          .getAttribute("data-comment-index")
                      ),
                      r = Number(
                        e
                          .closest(".reply-block__item")
                          .getAttribute("data-answer-index")
                      );
                    (e.value = o.app.data[t].answers[r].rate),
                      Number(e.value) < 0 && e.classList.add("red-text"),
                      o.app.data[t].answers[r].rated.find(
                        (e) => e.id === a.currentUser.id
                      ) &&
                        (e
                          .closest(".post-options-counter")
                          .querySelector(".btn-counter--plus")
                          .setAttribute("disabled", ""),
                        e
                          .closest(".post-options-counter")
                          .querySelector(".btn-counter--minus")
                          .setAttribute("disabled", ""));
                  }
                }),
              document
                .querySelectorAll(".post-options-favorite-comment")
                .forEach((e) => {
                  let t = Number(
                    e.closest(".comment-block").getAttribute("data-index")
                  );
                  o.app.data[t].favorite.find(
                    (e) => e.id === a.currentUser.id
                  ) &&
                    (e
                      .closest(".comment-block-area")
                      .setAttribute("data-favorite", ""),
                    e
                      .closest(".post-options-favorite-comment")
                      .querySelector("img")
                      .setAttribute(
                        "src",
                        "./src/images/icons/in_favorite.svg"
                      ),
                    (e
                      .closest(".post-options-favorite-comment")
                      .querySelector(".btn-favorite").textContent =
                      "В избранном"));
                }),
              document
                .querySelectorAll(".post-options-favorite-answer")
                .forEach((e) => {
                  let t = Number(
                      e
                        .closest(".reply-block__item")
                        .getAttribute("data-comment-index")
                    ),
                    r = Number(
                      e
                        .closest(".reply-block__item")
                        .getAttribute("data-answer-index")
                    );
                  o.app.data[t].answers[r].favorite.find(
                    (e) => e.id === a.currentUser.id
                  ) &&
                    (e
                      .closest(".reply-block__item")
                      .setAttribute("data-favorite", ""),
                    e
                      .closest(".post-options-favorite-answer")
                      .querySelector("img")
                      .setAttribute(
                        "src",
                        "./src/images/icons/in_favorite.svg"
                      ),
                    (e
                      .closest(".post-options-favorite-answer")
                      .querySelector(".btn-favorite").textContent =
                      "В избранном"));
                }),
              a.currentUser.replyMsg(),
              a.currentUser.ratecomment(),
              a.currentUser.rateAnswer(),
              a.currentUser.addToFavoritecomment(),
              a.currentUser.addToFavoriteAnswer(),
              a.currentUser.showFavorite(),
              this.sortingBy()),
              s.chars.charsCounter(),
              a.currentUser.addUserData(),
              a.currentUser.sendMsg(),
              a.currentUser.sortingOptions();
          }
        };
      },
      390: (e, t, r) => {
        Object.defineProperty(t, "__esModule", { value: !0 }),
          (t.User = void 0);
        const a = r(945),
          o = r(945);
        t.User = class {
          constructor(e, t, r) {
            (this.id = e), (this.name = t), (this.avatar = r);
          }
          addUserData() {
            (document.querySelector(".header-area__author").innerHTML =
              a.currentUser.name),
              document
                .querySelector(".write-block-area__avatar")
                .setAttribute("src", a.currentUser.avatar);
          }
          sendMsg() {
            let e = document.querySelector(".send-area__input"),
              t = 0,
              r = document.querySelector(".comment-num");
            null != localStorage.getItem("commentIndex")
              ? ((t = Number(`${localStorage.getItem("commentIndex")}`)),
                (r.innerHTML = `(${t})`))
              : (r.innerHTML = `(${t})`),
              document
                .querySelector(".send-area__btn")
                .addEventListener("click", () => {
                  let r = new Date().toLocaleDateString(),
                    s = new Date().toLocaleTimeString().slice(0, -3);
                  if (e.hasAttribute("data-comment-index")) {
                    let t = {
                        rate: 0,
                        rated: [],
                        favorite: [],
                        date: r,
                        time: s,
                        text: `<div class="reply-block__item" data-comment-index data-type-answer> \n                <img class="comment-block__avatar" src="${a.currentUser.avatar}" alt="avatar">\n\n                <div class="reply-block__write">\n\n                    <div class="header-post">\n                        <div class="reply-to">\n                            <span class="header-post__author">${a.currentUser.name}</span>\n                            <img class="post-options__img post-options__img--reply" src="./src/images/icons/reply.svg">\n                            <span class="header-post__author header-post__author--reply"></span>\n                        </div>\n                        <span class="header-post__posted">${r} ${s}</span>\n                    </div>\n\n                    <div class="post-area">\n                        <p class="post-area__text post-area__text--reply">${e.value}</p>\n                    </div>\n                    \n                    <div class="post-options">\n\n                        <div class="post-options-favorite-answer">\n\n                            <img сlass="post-options__img" src="./src/images/icons/add_favorite.svg" alt="add to favorite">\n                            <button class="post-options__btn btn-favorite">В избранное</button>\n\n                        </div>\n\n                        <div class="post-options-counter" data-num-answer-area>\n\n                            <button class="btn-counter btn-counter--minus"></button>\n                                <input type='text' disabled class="post-options__num" data-num-answer>\n                            <button class="btn-counter btn-counter--plus"></button>\n\n                        </div>\n\n                    </div>\n                    \n                </div>\n                </div>`,
                      },
                      n = Number(e.getAttribute("data-comment-index"));
                    e.removeAttribute("data-comment-index"),
                      (e.value = ""),
                      (document
                        .querySelector(".comment-list")
                        .querySelector('[data-index="' + n + '"]')
                        .querySelector(".reply-block").innerHTML += t.text),
                      o.app.data[n].answers.push(t);
                    let i = document
                      .querySelector(`[data-index="${n}"]`)
                      .querySelectorAll(".reply-block__item");
                    i.forEach((e) => {
                      let t = e
                        .closest(".comment-block")
                        .getAttribute("data-index");
                      e.setAttribute("data-comment-index", String(t));
                      for (let e = 0; e < i.length; e++)
                        i[e].setAttribute("data-answer-index", String(e));
                    }),
                      this.rateAnswerRemove(),
                      this.rateAnswer(),
                      document
                        .querySelectorAll(".reply-block__item")
                        .forEach((e) => {
                          let t = e.getAttribute("data-comment-index"),
                            r = e.getAttribute("data-answer-index"),
                            a = e
                              .closest(".comment-block")
                              .querySelector(".header-post__author");
                          e.querySelector(
                            ".header-post__author--reply"
                          ).innerHTML = a.innerHTML;
                          let s = e.closest(".reply-block__item").outerHTML;
                          (o.app.data[Number(t)].answers[Number(r)].text = s),
                            localStorage.setItem(
                              "data",
                              JSON.stringify(o.app.data)
                            );
                        }),
                      document
                        .querySelectorAll(".post-options__num")
                        .forEach((e) => {
                          if (e.hasAttribute("data-num-answer")) {
                            let t = e
                                .closest(".reply-block__item")
                                .getAttribute("data-comment-index"),
                              r = e
                                .closest(".reply-block__item")
                                .getAttribute("data-answer-index");
                            e.value =
                              o.app.data[Number(t)].answers[Number(r)].rate;
                          }
                        }),
                      localStorage.setItem("data", JSON.stringify(o.app.data));
                  } else {
                    let n = {
                        rate: 0,
                        rated: [],
                        answers: [],
                        favorite: [],
                        date: r,
                        time: s,
                        text: "",
                      },
                      i = document.querySelector(".comment-list");
                    o.app.data.push(n),
                      (o.app.data[
                        t
                      ].text = `<div class="comment-block" data-index="${t}">\n\n                    <div class="comment-block__write">\n\n                        <div class="comment-block-area" data-type-comment>\n\n                        <img class="comment-block__avatar" src="${a.currentUser.avatar}" alt="avatar">\n\n                            <div class="comment-block__body">\n\n                                <div class="header-post">\n\n                                    <span class="header-post__author">${a.currentUser.name}</span>\n\n                                    <span class="header-post__posted">${r} ${s}</span>\n\n                                </div>\n\n                                <div class="post-area">\n\n                                    <p class="post-area__text">${e.value}</p>\n                                    \n                                </div>\n\n                                <div class="post-options">\n\n                                    <div class="post-options-reply">\n\n                                        <img сlass="post-options__img" src="./src/images/icons/reply.svg" alt="reply">\n                                        <button class="post-options__btn btn-reply">Ответить</button>\n\n                                    </div>\n\n                                    <div class="post-options-favorite-comment">\n\n                                        <img сlass="post-options__img" src="./src/images/icons/add_favorite.svg" alt="add to favorite">\n                                        <button class="post-options__btn btn-favorite">В избранное</button>\n\n                                    </div>\n\n                                    <div class="post-options-counter" data-num-comment-block>\n\n                                        <button class="btn-counter btn-counter--minus"></button>\n                                        <input type='text' disabled class="post-options__num" data-num-comment>\n                                        <button class="btn-counter btn-counter--plus"></button>\n\n                                    </div>\n\n                                </div>\n                                \n                            </div>\n                    \n                    </div>\n\n                    <div class="reply-block"></div>\n\n                </div>`),
                      localStorage.setItem("data", JSON.stringify(o.app.data)),
                      (i.innerHTML += o.app.data[t].text),
                      document
                        .querySelectorAll(".post-options__num")
                        .forEach((e) => {
                          if (e && e.hasAttribute("data-num-comment")) {
                            let t = Number(
                              e
                                .closest(".comment-block")
                                .getAttribute("data-index")
                            );
                            e.value = o.app.data[t].rate;
                          }
                        }),
                      document
                        .querySelectorAll(".post-options__num")
                        .forEach((e) => {
                          if (e.hasAttribute("data-num-answer")) {
                            let t = Number(
                                e
                                  .closest(".reply-block__item")
                                  .getAttribute("data-comment-index")
                              ),
                              r = Number(
                                e
                                  .closest(".reply-block__item")
                                  .getAttribute("data-answer-index")
                              );
                            e.value = o.app.data[t].answers[r].rate;
                          }
                        }),
                      null != localStorage.getItem("commentIndex")
                        ? ((t = Number(localStorage.getItem("commentIndex"))),
                          (t += 1))
                        : (t += 1),
                      (document.querySelector(
                        ".comment-num"
                      ).innerHTML = `(${t})`),
                      localStorage.setItem("commentIndex", String(t)),
                      (e.value = ""),
                      localStorage.setItem("data", JSON.stringify(o.app.data)),
                      this.ratecomment(),
                      this.rateAnswer(),
                      this.replyMsg();
                  }
                  this.addToFavoritecomment(),
                    this.addToFavoriteAnswer(),
                    this.showFavorite(),
                    this.sortingByDate(),
                    this.sortingByRate(),
                    this.sortingByAnswersQuantity();
                });
          }
          replyMsg() {
            document.querySelectorAll(".post-options-reply").forEach((e) => {
              e.addEventListener("click", (e) => {
                let t =
                    e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
                      "data-index"
                    ),
                  r = document.querySelector(".send-area__input");
                r.setAttribute("data-comment-index", String(t)),
                  r.focus(),
                  this.addToFavoritecomment(),
                  this.addToFavoriteAnswer();
              });
            });
          }
          ratecomment() {
            let e = { id: a.currentUser.id, isRated: !0 };
            document
              .querySelectorAll("[data-num-comment-block]")
              .forEach((t) => {
                t.addEventListener("click", (t) => {
                  const r = t.target;
                  let s = Number(
                    r.closest(".comment-block").getAttribute("data-index")
                  );
                  (o.app.data[Number(s)].rate = r
                    .closest(".post-options-counter")
                    .querySelector(".post-options__num").value),
                    r.closest(".btn-counter--minus") &&
                      (--o.app.data[Number(s)].rate,
                      o.app.data[s].rated.find(
                        (e) => e.id === a.currentUser.id
                      ) || o.app.data[s].rated.push(e),
                      r
                        .closest(".post-options-counter")
                        .querySelector(".btn-counter--plus")
                        .setAttribute("disabled", ""),
                      r
                        .closest(".post-options-counter")
                        .querySelector(".btn-counter--minus")
                        .setAttribute("disabled", ""),
                      o.app.data[Number(s)].rate < 0 &&
                        r
                          .closest(".post-options-counter")
                          .querySelector(".post-options__num")
                          .classList.add("red-text")),
                    r.closest(".btn-counter--plus") &&
                      (++o.app.data[Number(s)].rate,
                      o.app.data[s].rated.find(
                        (e) => e.id === a.currentUser.id
                      ) || o.app.data[s].rated.push(e),
                      r
                        .closest(".post-options-counter")
                        .querySelector(".btn-counter--plus")
                        .setAttribute("disabled", ""),
                      r
                        .closest(".post-options-counter")
                        .querySelector(".btn-counter--minus")
                        .setAttribute("disabled", ""),
                      o.app.data[Number(s)].rate >= 0 &&
                        r
                          .closest(".post-options-counter")
                          .querySelector(".post-options__num")
                          .classList.remove("red-text")),
                    (r
                      .closest(".post-options-counter")
                      .querySelector(".post-options__num").value =
                      o.app.data[Number(s)].rate),
                    localStorage.setItem("data", JSON.stringify(o.app.data));
                });
              });
          }
          handlerRate(e) {
            let t = { id: a.currentUser.id, isRated: !0 };
            const r = e.target;
            let s = Number(
                r
                  .closest(".reply-block__item")
                  .getAttribute("data-comment-index")
              ),
              n = Number(
                r
                  .closest(".reply-block__item")
                  .getAttribute("data-answer-index")
              );
            (o.app.data[Number(s)].answers[Number(n)].rate = r
              .closest(".post-options-counter")
              .querySelector(".post-options__num").value),
              r.closest(".btn-counter--minus") &&
                (--o.app.data[Number(s)].answers[Number(n)].rate,
                o.app.data[s].answers[n].rated.find(
                  (e) => e.id === a.currentUser.id
                ) || o.app.data[s].answers[n].rated.push(t),
                r
                  .closest(".post-options-counter")
                  .querySelector(".btn-counter--plus")
                  .setAttribute("disabled", ""),
                r
                  .closest(".post-options-counter")
                  .querySelector(".btn-counter--minus")
                  .setAttribute("disabled", ""),
                o.app.data[Number(s)].answers[Number(n)].rate < 0 &&
                  r
                    .closest(".post-options-counter")
                    .querySelector(".post-options__num")
                    .classList.add("red-text")),
              r.closest(".btn-counter--plus") &&
                (++o.app.data[Number(s)].answers[Number(n)].rate,
                o.app.data[s].answers[n].rated.find(
                  (e) => e.id === a.currentUser.id
                ) || o.app.data[s].answers[n].rated.push(t),
                r
                  .closest(".post-options-counter")
                  .querySelector(".btn-counter--plus")
                  .setAttribute("disabled", ""),
                r
                  .closest(".post-options-counter")
                  .querySelector(".btn-counter--minus")
                  .setAttribute("disabled", ""),
                o.app.data[Number(s)].answers[Number(n)].rate >= 0 &&
                  r
                    .closest(".post-options-counter")
                    .querySelector(".post-options__num")
                    .classList.remove("red-text")),
              (r
                .closest(".post-options-counter")
                .querySelector(".post-options__num").value =
                o.app.data[Number(s)].answers[Number(n)].rate),
              localStorage.setItem("data", JSON.stringify(o.app.data));
          }
          rateAnswer() {
            document.querySelectorAll("[data-num-answer-area]").forEach((e) => {
              e.addEventListener("click", this.handlerRate);
            });
          }
          rateAnswerRemove() {
            document.querySelectorAll("[data-num-answer-area]").forEach((e) => {
              e.removeEventListener("click", this.handlerRate);
            });
          }
          addToFavoritecomment() {
            let e = { id: a.currentUser.id, isFavorite: !0 };
            document
              .querySelectorAll(".post-options-favorite-comment")
              .forEach((t) => {
                t.addEventListener("click", (t) => {
                  const r = t.target;
                  let s = Number(
                      r.closest(".comment-block").getAttribute("data-index")
                    ),
                    n = o.app.data[s].favorite.findIndex(
                      (e) => e.id === a.currentUser.id
                    );
                  o.app.data[s].favorite.find((e) => e.id === a.currentUser.id)
                    ? (o.app.data[s].favorite.splice(n, 1),
                      r
                        .closest(".comment-block-area")
                        .removeAttribute("data-favorite"),
                      (r
                        .closest(".post-options-favorite-comment")
                        .querySelector("img").src =
                        "./src/images/icons/add_favorite.svg"),
                      (r
                        .closest(".post-options-favorite-comment")
                        .querySelector(".btn-favorite").textContent =
                        "В избранноe"),
                      localStorage.setItem("data", JSON.stringify(o.app.data)))
                    : (o.app.data[s].favorite.push(e),
                      r
                        .closest(".comment-block-area")
                        .setAttribute("data-favorite", ""),
                      (r
                        .closest(".post-options-favorite-comment")
                        .querySelector("img").src =
                        "./src/images/icons/in_favorite.svg"),
                      (r
                        .closest(".post-options-favorite-comment")
                        .querySelector(".btn-favorite").textContent =
                        "В избранном"),
                      localStorage.setItem("data", JSON.stringify(o.app.data)));
                }),
                  localStorage.setItem("data", JSON.stringify(o.app.data));
              });
          }
          addToFavoriteAnswer() {
            let e = { id: a.currentUser.id, isFavorite: !0 };
            document
              .querySelectorAll(".post-options-favorite-answer")
              .forEach((t) => {
                t.addEventListener("click", (r) => {
                  const s = r.target;
                  let n = Number(
                      t
                        .closest(".reply-block__item")
                        .getAttribute("data-comment-index")
                    ),
                    i = Number(
                      t
                        .closest(".reply-block__item")
                        .getAttribute("data-answer-index")
                    ),
                    c = o.app.data[n].answers[i].favorite.findIndex(
                      (e) => e.id === a.currentUser.id
                    );
                  o.app.data[n].answers[i].favorite.find(
                    (e) => e.id === a.currentUser.id
                  )
                    ? (o.app.data[n].answers[i].favorite.splice(c, 1),
                      s
                        .closest(".reply-block__item")
                        .removeAttribute("data-favorite"),
                      (s
                        .closest(".post-options-favorite-answer")
                        .querySelector("img").src =
                        "./src/images/icons/add_favorite.svg"),
                      (s
                        .closest(".post-options-favorite-answer")
                        .querySelector(".btn-favorite").textContent =
                        "В избранноe"),
                      localStorage.setItem("data", JSON.stringify(o.app.data)))
                    : (o.app.data[n].answers[i].favorite.push(e),
                      s
                        .closest(".reply-block__item")
                        .setAttribute("data-favorite", ""),
                      (s
                        .closest(".post-options-favorite-answer")
                        .querySelector("img").src =
                        "./src/images/icons/in_favorite.svg"),
                      (s
                        .closest(".post-options-favorite-answer")
                        .querySelector(".btn-favorite").textContent =
                        "В избранном"),
                      localStorage.setItem("data", JSON.stringify(o.app.data)));
                }),
                  localStorage.setItem("data", JSON.stringify(o.app.data));
              });
          }
          showFavorite() {
            let e = document.querySelector(".favorite-list"),
              t = document.querySelectorAll(".comment-block-area"),
              r = document.querySelectorAll(".reply-block__item"),
              a = document.querySelector(".write-block"),
              o = document.querySelector(".comment-nav-list"),
              s = !1;
            e.addEventListener("click", () => {
              s
                ? (a.classList.remove("invisible"),
                  o.classList.remove("invisible"),
                  t.forEach((e) => {
                    e.classList.remove("invisible");
                  }),
                  r.forEach((e) => {
                    e.classList.remove("invisible"),
                      e.classList.remove("in-favorite");
                  }),
                  (s = !1))
                : ((s = !0),
                  a.classList.add("invisible"),
                  o.classList.add("invisible"),
                  t.forEach((e) => {
                    e.hasAttribute("data-favorite") ||
                      e.classList.add("invisible");
                  }),
                  r.forEach((e) => {
                    e.hasAttribute("data-favorite") ||
                      e.classList.add("invisible"),
                      e.hasAttribute("data-favorite") &&
                        e.classList.add("in-favorite");
                  }));
            });
          }
          sortingOptions() {
            let e = document.querySelector(".comment-nav-drop"),
              t = document.querySelector(".drop-default"),
              r = document.querySelector(".drop-default "),
              a = document.querySelector(".nav-arrow");
            r.addEventListener("mouseover", () => {
              e.classList.add("open-menu");
            }),
              e.addEventListener("click", (r) => {
                const o = r.target;
                o.classList.contains("drop-choose") &&
                  ((t.textContent = o.textContent),
                  e.classList.remove("open-menu"),
                  (a.src = "./src/images/icons/arrow-down.svg"),
                  a.setAttribute("title", "По убыванию"));
              }),
              document.addEventListener("click", (t) => {
                t.target.classList.contains("drop-choose") ||
                  e.classList.remove("open-menu");
              });
          }
          sortingByDate() {
            let e = document.querySelector(".nav-arrow"),
              t = document.querySelector(".comment-list"),
              r = document.querySelectorAll(".comment-block"),
              a = document.querySelector("#comment-date");
            function o() {
              let a = [...r].sort(function (e, t) {
                return e.querySelector(".header-post__posted").innerHTML >
                  t.querySelector(".header-post__posted").innerHTML
                  ? -1
                  : 1;
              });
              t.innerHTML = "";
              for (let e of a) t.appendChild(e);
              let o = !1;
              e.addEventListener("click", () => {
                if (o) {
                  (e.src = "./src/images/icons/arrow-down.svg"),
                    e.setAttribute("title", "По убыванию"),
                    (o = !1);
                  let a = [...r].sort(function (e, t) {
                    return e.querySelector(".header-post__posted").innerHTML >
                      t.querySelector(".header-post__posted").innerHTML
                      ? -1
                      : 1;
                  });
                  t.innerHTML = "";
                  for (let e of a) t.appendChild(e);
                } else {
                  (o = !0),
                    (e.src = "./src/images/icons/arrow-up.svg"),
                    e.setAttribute("title", "По возрастанию");
                  let a = [...r].sort(function (e, t) {
                    return e.querySelector(".header-post__posted").innerHTML >
                      t.querySelector(".header-post__posted").innerHTML
                      ? 1
                      : -1;
                  });
                  t.innerHTML = "";
                  for (let e of a) t.appendChild(e);
                }
              });
            }
            o(),
              a.addEventListener("click", function () {
                o();
              });
          }
          sortingByRate() {
            let e = document.querySelector(".nav-arrow"),
              t = document.querySelector(".comment-list"),
              r = document.querySelectorAll(".comment-block");
            document
              .querySelector("#comment-rate")
              .addEventListener("click", function () {
                let a = [...r].sort(function (e, t) {
                  return e.querySelector(".post-options__num").value >
                    t.querySelector(".post-options__num").value
                    ? -1
                    : 1;
                });
                t.innerHTML = "";
                for (let e of a) t.appendChild(e);
                let o = !1;
                e.addEventListener("click", () => {
                  if (o) {
                    (e.src = "./src/images/icons/arrow-down.svg"),
                      e.setAttribute("title", "По убыванию"),
                      (o = !1);
                    let a = [...r].sort(function (e, t) {
                      return e.querySelector(".post-options__num").value >
                        t.querySelector(".post-options__num").value
                        ? -1
                        : 1;
                    });
                    t.innerHTML = "";
                    for (let e of a) t.appendChild(e);
                  } else {
                    (o = !0),
                      (e.src = "./src/images/icons/arrow-up.svg"),
                      e.setAttribute("title", "По возрастанию");
                    let a = [...r].sort(function (e, t) {
                      return e.querySelector(".post-options__num").value >
                        t.querySelector(".post-options__num").value
                        ? 1
                        : -1;
                    });
                    t.innerHTML = "";
                    for (let e of a) t.appendChild(e);
                  }
                });
              });
          }
          sortingByAnswersQuantity() {
            let e = document.querySelector(".nav-arrow"),
              t = document.querySelector(".comment-list"),
              r = document.querySelectorAll(".comment-block");
            document
              .querySelector("#comment-answers")
              .addEventListener("click", function () {
                let a = [...r].sort(function (e, t) {
                  return e.querySelectorAll(".reply-block__item").length >
                    t.querySelectorAll(".reply-block__item").length
                    ? -1
                    : 1;
                });
                t.innerHTML = "";
                for (let e of a) t.appendChild(e);
                let o = !1;
                e.addEventListener("click", () => {
                  if (o) {
                    (e.src = "./src/images/icons/arrow-down.svg"),
                      e.setAttribute("title", "По убыванию"),
                      (o = !1);
                    let a = [...r].sort(function (e, t) {
                      return e.querySelectorAll(".reply-block__item").length >
                        t.querySelectorAll(".reply-block__item").length
                        ? -1
                        : 1;
                    });
                    t.innerHTML = "";
                    for (let e of a) t.appendChild(e);
                  } else {
                    (o = !0),
                      (e.src = "./src/images/icons/arrow-up.svg"),
                      e.setAttribute("title", "По возрастанию");
                    let a = [...r].sort(function (e, t) {
                      return e.querySelectorAll(".reply-block__item").length >
                        t.querySelectorAll(".reply-block__item").length
                        ? 1
                        : -1;
                    });
                    t.innerHTML = "";
                    for (let e of a) t.appendChild(e);
                  }
                });
              });
          }
        };
      },
    },
    t = {};
  function r(a) {
    var o = t[a];
    if (void 0 !== o) return o.exports;
    var s = (t[a] = { exports: {} });
    return e[a](s, s.exports, r), s.exports;
  }
  (() => {
    const e = r(945);
    document.addEventListener("DOMContentLoaded", () => e.app.start());
  })();
})();
