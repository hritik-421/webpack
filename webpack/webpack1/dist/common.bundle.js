"use strict";
(self.webpackChunkwebpack1 = self.webpackChunkwebpack1 || []).push([
  [76],
  {
    272: (e, n, t) => {
      var c = t(540),
        l = t(338);
      const r = t.p + "643f20cc155d54f337f7.jpg";
      const a = function () {
        return c.createElement("button", null, "Learn Webpack");
      };
      const o = function () {
        return c.createElement("div", null, "Dashboard Component");
      };
      const u = function () {
        console.log("API_URL++++++++++++", "https://api.example.com");
        return c.createElement(
          "div",
          { className: "container" },
          c.createElement(
            "div",
            null,
            "App Component",
            c.createElement("img", { src: r }),
            c.createElement(a, null),
            c.createElement(o, null)
          )
        );
      };
      (0, l.H)(document.getElementById("root")).render(
        c.createElement(u, null)
      );
    },
  },
]);
