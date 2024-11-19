/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

(() => {
  var kE = Object.create;
  var Ln = Object.defineProperty;
  var HE = Object.getOwnPropertyDescriptor;
  var UE = Object.getOwnPropertyNames;
  var BE = Object.getPrototypeOf,
    WE = Object.prototype.hasOwnProperty;
  var pe = (e, t) => () => (e && (t = e((e = 0))), t);
  var f = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
    Ne = (e, t) => {
      for (var n in t) Ln(e, n, { get: t[n], enumerable: !0 });
    },
    la = (e, t, n, r) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let i of UE(t))
          !WE.call(e, i) &&
            i !== n &&
            Ln(e, i, {
              get: () => t[i],
              enumerable: !(r = HE(t, i)) || r.enumerable,
            });
      return e;
    };
  var ae = (e, t, n) => (
      (n = e != null ? kE(BE(e)) : {}),
      la(
        t || !e || !e.__esModule
          ? Ln(n, "default", { value: e, enumerable: !0 })
          : n,
        e
      )
    ),
    Ye = (e) => la(Ln({}, "__esModule", { value: !0 }), e);
  var fa = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      let e = window.navigator.userAgent.match(/Edge\/(\d{2})\./),
        t = e ? parseInt(e[1], 10) >= 16 : !1;
      if ("objectFit" in document.documentElement.style && !t) {
        window.objectFitPolyfill = function () {
          return !1;
        };
        return;
      }
      let r = function (a) {
          let u = window.getComputedStyle(a, null),
            c = u.getPropertyValue("position"),
            h = u.getPropertyValue("overflow"),
            p = u.getPropertyValue("display");
          (!c || c === "static") && (a.style.position = "relative"),
            h !== "hidden" && (a.style.overflow = "hidden"),
            (!p || p === "inline") && (a.style.display = "block"),
            a.clientHeight === 0 && (a.style.height = "100%"),
            a.className.indexOf("object-fit-polyfill") === -1 &&
              (a.className += " object-fit-polyfill");
        },
        i = function (a) {
          let u = window.getComputedStyle(a, null),
            c = {
              "max-width": "none",
              "max-height": "none",
              "min-width": "0px",
              "min-height": "0px",
              top: "auto",
              right: "auto",
              bottom: "auto",
              left: "auto",
              "margin-top": "0px",
              "margin-right": "0px",
              "margin-bottom": "0px",
              "margin-left": "0px",
            };
          for (let h in c)
            u.getPropertyValue(h) !== c[h] && (a.style[h] = c[h]);
        },
        o = function (a) {
          let u = a.parentNode;
          r(u),
            i(a),
            (a.style.position = "absolute"),
            (a.style.height = "100%"),
            (a.style.width = "auto"),
            a.clientWidth > u.clientWidth
              ? ((a.style.top = "0"),
                (a.style.marginTop = "0"),
                (a.style.left = "50%"),
                (a.style.marginLeft = a.clientWidth / -2 + "px"))
              : ((a.style.width = "100%"),
                (a.style.height = "auto"),
                (a.style.left = "0"),
                (a.style.marginLeft = "0"),
                (a.style.top = "50%"),
                (a.style.marginTop = a.clientHeight / -2 + "px"));
        },
        s = function (a) {
          if (typeof a > "u" || a instanceof Event)
            a = document.querySelectorAll("[data-object-fit]");
          else if (a && a.nodeName) a = [a];
          else if (typeof a == "object" && a.length && a[0].nodeName) a = a;
          else return !1;
          for (let u = 0; u < a.length; u++) {
            if (!a[u].nodeName) continue;
            let c = a[u].nodeName.toLowerCase();
            if (c === "img") {
              if (t) continue;
              a[u].complete
                ? o(a[u])
                : a[u].addEventListener("load", function () {
                    o(this);
                  });
            } else
              c === "video"
                ? a[u].readyState > 0
                  ? o(a[u])
                  : a[u].addEventListener("loadedmetadata", function () {
                      o(this);
                    })
                : o(a[u]);
          }
          return !0;
        };
      document.readyState === "loading"
        ? document.addEventListener("DOMContentLoaded", s)
        : s(),
        window.addEventListener("resize", s),
        (window.objectFitPolyfill = s);
    })();
  });
  var da = f(() => {
    "use strict";
    (function () {
      if (typeof window > "u") return;
      function e(r) {
        Webflow.env("design") ||
          ($("video").each(function () {
            r && $(this).prop("autoplay") ? this.play() : this.pause();
          }),
          $(".w-background-video--control").each(function () {
            r ? n($(this)) : t($(this));
          }));
      }
      function t(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 0);
        });
      }
      function n(r) {
        r.find("> span").each(function (i) {
          $(this).prop("hidden", () => i === 1);
        });
      }
      $(document).ready(() => {
        let r = window.matchMedia("(prefers-reduced-motion: reduce)");
        r.addEventListener("change", (i) => {
          e(!i.matches);
        }),
          r.matches && e(!1),
          $("video:not([autoplay])").each(function () {
            $(this)
              .parent()
              .find(".w-background-video--control")
              .each(function () {
                t($(this));
              });
          }),
          $(document).on("click", ".w-background-video--control", function (i) {
            if (Webflow.env("design")) return;
            let o = $(i.currentTarget),
              s = $(`video#${o.attr("aria-controls")}`).get(0);
            if (s)
              if (s.paused) {
                let a = s.play();
                n(o),
                  a &&
                    typeof a.catch == "function" &&
                    a.catch(() => {
                      t(o);
                    });
              } else s.pause(), t(o);
          });
      });
    })();
  });
  var Kr = f(() => {
    "use strict";
    window.tram = (function (e) {
      function t(l, y) {
        var m = new ye.Bare();
        return m.init(l, y);
      }
      function n(l) {
        return l.replace(/[A-Z]/g, function (y) {
          return "-" + y.toLowerCase();
        });
      }
      function r(l) {
        var y = parseInt(l.slice(1), 16),
          m = (y >> 16) & 255,
          O = (y >> 8) & 255,
          L = 255 & y;
        return [m, O, L];
      }
      function i(l, y, m) {
        return (
          "#" + ((1 << 24) | (l << 16) | (y << 8) | m).toString(16).slice(1)
        );
      }
      function o() {}
      function s(l, y) {
        c("Type warning: Expected: [" + l + "] Got: [" + typeof y + "] " + y);
      }
      function a(l, y, m) {
        c("Units do not match [" + l + "]: " + y + ", " + m);
      }
      function u(l, y, m) {
        if ((y !== void 0 && (m = y), l === void 0)) return m;
        var O = m;
        return (
          en.test(l) || !ht.test(l)
            ? (O = parseInt(l, 10))
            : ht.test(l) && (O = 1e3 * parseFloat(l)),
          0 > O && (O = 0),
          O === O ? O : m
        );
      }
      function c(l) {
        ie.debug && window && window.console.warn(l);
      }
      function h(l) {
        for (var y = -1, m = l ? l.length : 0, O = []; ++y < m; ) {
          var L = l[y];
          L && O.push(L);
        }
        return O;
      }
      var p = (function (l, y, m) {
          function O(ee) {
            return typeof ee == "object";
          }
          function L(ee) {
            return typeof ee == "function";
          }
          function C() {}
          function z(ee, de) {
            function q() {
              var Se = new te();
              return L(Se.init) && Se.init.apply(Se, arguments), Se;
            }
            function te() {}
            de === m && ((de = ee), (ee = Object)), (q.Bare = te);
            var re,
              ve = (C[l] = ee[l]),
              je = (te[l] = q[l] = new C());
            return (
              (je.constructor = q),
              (q.mixin = function (Se) {
                return (te[l] = q[l] = z(q, Se)[l]), q;
              }),
              (q.open = function (Se) {
                if (
                  ((re = {}),
                  L(Se) ? (re = Se.call(q, je, ve, q, ee)) : O(Se) && (re = Se),
                  O(re))
                )
                  for (var tn in re) y.call(re, tn) && (je[tn] = re[tn]);
                return L(je.init) || (je.init = ee), q;
              }),
              q.open(de)
            );
          }
          return z;
        })("prototype", {}.hasOwnProperty),
        d = {
          ease: [
            "ease",
            function (l, y, m, O) {
              var L = (l /= O) * l,
                C = L * l;
              return (
                y +
                m * (-2.75 * C * L + 11 * L * L + -15.5 * C + 8 * L + 0.25 * l)
              );
            },
          ],
          "ease-in": [
            "ease-in",
            function (l, y, m, O) {
              var L = (l /= O) * l,
                C = L * l;
              return y + m * (-1 * C * L + 3 * L * L + -3 * C + 2 * L);
            },
          ],
          "ease-out": [
            "ease-out",
            function (l, y, m, O) {
              var L = (l /= O) * l,
                C = L * l;
              return (
                y +
                m * (0.3 * C * L + -1.6 * L * L + 2.2 * C + -1.8 * L + 1.9 * l)
              );
            },
          ],
          "ease-in-out": [
            "ease-in-out",
            function (l, y, m, O) {
              var L = (l /= O) * l,
                C = L * l;
              return y + m * (2 * C * L + -5 * L * L + 2 * C + 2 * L);
            },
          ],
          linear: [
            "linear",
            function (l, y, m, O) {
              return (m * l) / O + y;
            },
          ],
          "ease-in-quad": [
            "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
            function (l, y, m, O) {
              return m * (l /= O) * l + y;
            },
          ],
          "ease-out-quad": [
            "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
            function (l, y, m, O) {
              return -m * (l /= O) * (l - 2) + y;
            },
          ],
          "ease-in-out-quad": [
            "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
            function (l, y, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l + y
                : (-m / 2) * (--l * (l - 2) - 1) + y;
            },
          ],
          "ease-in-cubic": [
            "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
            function (l, y, m, O) {
              return m * (l /= O) * l * l + y;
            },
          ],
          "ease-out-cubic": [
            "cubic-bezier(0.215, 0.610, 0.355, 1)",
            function (l, y, m, O) {
              return m * ((l = l / O - 1) * l * l + 1) + y;
            },
          ],
          "ease-in-out-cubic": [
            "cubic-bezier(0.645, 0.045, 0.355, 1)",
            function (l, y, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l + y
                : (m / 2) * ((l -= 2) * l * l + 2) + y;
            },
          ],
          "ease-in-quart": [
            "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
            function (l, y, m, O) {
              return m * (l /= O) * l * l * l + y;
            },
          ],
          "ease-out-quart": [
            "cubic-bezier(0.165, 0.840, 0.440, 1)",
            function (l, y, m, O) {
              return -m * ((l = l / O - 1) * l * l * l - 1) + y;
            },
          ],
          "ease-in-out-quart": [
            "cubic-bezier(0.770, 0, 0.175, 1)",
            function (l, y, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l * l + y
                : (-m / 2) * ((l -= 2) * l * l * l - 2) + y;
            },
          ],
          "ease-in-quint": [
            "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
            function (l, y, m, O) {
              return m * (l /= O) * l * l * l * l + y;
            },
          ],
          "ease-out-quint": [
            "cubic-bezier(0.230, 1, 0.320, 1)",
            function (l, y, m, O) {
              return m * ((l = l / O - 1) * l * l * l * l + 1) + y;
            },
          ],
          "ease-in-out-quint": [
            "cubic-bezier(0.860, 0, 0.070, 1)",
            function (l, y, m, O) {
              return (l /= O / 2) < 1
                ? (m / 2) * l * l * l * l * l + y
                : (m / 2) * ((l -= 2) * l * l * l * l + 2) + y;
            },
          ],
          "ease-in-sine": [
            "cubic-bezier(0.470, 0, 0.745, 0.715)",
            function (l, y, m, O) {
              return -m * Math.cos((l / O) * (Math.PI / 2)) + m + y;
            },
          ],
          "ease-out-sine": [
            "cubic-bezier(0.390, 0.575, 0.565, 1)",
            function (l, y, m, O) {
              return m * Math.sin((l / O) * (Math.PI / 2)) + y;
            },
          ],
          "ease-in-out-sine": [
            "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
            function (l, y, m, O) {
              return (-m / 2) * (Math.cos((Math.PI * l) / O) - 1) + y;
            },
          ],
          "ease-in-expo": [
            "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
            function (l, y, m, O) {
              return l === 0 ? y : m * Math.pow(2, 10 * (l / O - 1)) + y;
            },
          ],
          "ease-out-expo": [
            "cubic-bezier(0.190, 1, 0.220, 1)",
            function (l, y, m, O) {
              return l === O
                ? y + m
                : m * (-Math.pow(2, (-10 * l) / O) + 1) + y;
            },
          ],
          "ease-in-out-expo": [
            "cubic-bezier(1, 0, 0, 1)",
            function (l, y, m, O) {
              return l === 0
                ? y
                : l === O
                ? y + m
                : (l /= O / 2) < 1
                ? (m / 2) * Math.pow(2, 10 * (l - 1)) + y
                : (m / 2) * (-Math.pow(2, -10 * --l) + 2) + y;
            },
          ],
          "ease-in-circ": [
            "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
            function (l, y, m, O) {
              return -m * (Math.sqrt(1 - (l /= O) * l) - 1) + y;
            },
          ],
          "ease-out-circ": [
            "cubic-bezier(0.075, 0.820, 0.165, 1)",
            function (l, y, m, O) {
              return m * Math.sqrt(1 - (l = l / O - 1) * l) + y;
            },
          ],
          "ease-in-out-circ": [
            "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
            function (l, y, m, O) {
              return (l /= O / 2) < 1
                ? (-m / 2) * (Math.sqrt(1 - l * l) - 1) + y
                : (m / 2) * (Math.sqrt(1 - (l -= 2) * l) + 1) + y;
            },
          ],
          "ease-in-back": [
            "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
            function (l, y, m, O, L) {
              return (
                L === void 0 && (L = 1.70158),
                m * (l /= O) * l * ((L + 1) * l - L) + y
              );
            },
          ],
          "ease-out-back": [
            "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
            function (l, y, m, O, L) {
              return (
                L === void 0 && (L = 1.70158),
                m * ((l = l / O - 1) * l * ((L + 1) * l + L) + 1) + y
              );
            },
          ],
          "ease-in-out-back": [
            "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
            function (l, y, m, O, L) {
              return (
                L === void 0 && (L = 1.70158),
                (l /= O / 2) < 1
                  ? (m / 2) * l * l * (((L *= 1.525) + 1) * l - L) + y
                  : (m / 2) *
                      ((l -= 2) * l * (((L *= 1.525) + 1) * l + L) + 2) +
                    y
              );
            },
          ],
        },
        E = {
          "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)",
          "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)",
          "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)",
        },
        I = document,
        _ = window,
        w = "bkwld-tram",
        v = /[\-\.0-9]/g,
        x = /[A-Z]/,
        A = "number",
        S = /^(rgb|#)/,
        P = /(em|cm|mm|in|pt|pc|px)$/,
        R = /(em|cm|mm|in|pt|pc|px|%)$/,
        X = /(deg|rad|turn)$/,
        V = "unitless",
        U = /(all|none) 0s ease 0s/,
        W = /^(width|height)$/,
        j = " ",
        N = I.createElement("a"),
        T = ["Webkit", "Moz", "O", "ms"],
        D = ["-webkit-", "-moz-", "-o-", "-ms-"],
        H = function (l) {
          if (l in N.style) return { dom: l, css: l };
          var y,
            m,
            O = "",
            L = l.split("-");
          for (y = 0; y < L.length; y++)
            O += L[y].charAt(0).toUpperCase() + L[y].slice(1);
          for (y = 0; y < T.length; y++)
            if (((m = T[y] + O), m in N.style))
              return { dom: m, css: D[y] + l };
        },
        G = (t.support = {
          bind: Function.prototype.bind,
          transform: H("transform"),
          transition: H("transition"),
          backface: H("backface-visibility"),
          timing: H("transition-timing-function"),
        });
      if (G.transition) {
        var Y = G.timing.dom;
        if (((N.style[Y] = d["ease-in-back"][0]), !N.style[Y]))
          for (var Q in E) d[Q][0] = E[Q];
      }
      var se = (t.frame = (function () {
          var l =
            _.requestAnimationFrame ||
            _.webkitRequestAnimationFrame ||
            _.mozRequestAnimationFrame ||
            _.oRequestAnimationFrame ||
            _.msRequestAnimationFrame;
          return l && G.bind
            ? l.bind(_)
            : function (y) {
                _.setTimeout(y, 16);
              };
        })()),
        _e = (t.now = (function () {
          var l = _.performance,
            y = l && (l.now || l.webkitNow || l.msNow || l.mozNow);
          return y && G.bind
            ? y.bind(l)
            : Date.now ||
                function () {
                  return +new Date();
                };
        })()),
        we = p(function (l) {
          function y(K, oe) {
            var he = h(("" + K).split(j)),
              ue = he[0];
            oe = oe || {};
            var xe = k[ue];
            if (!xe) return c("Unsupported property: " + ue);
            if (!oe.weak || !this.props[ue]) {
              var Xe = xe[0],
                Le = this.props[ue];
              return (
                Le || (Le = this.props[ue] = new Xe.Bare()),
                Le.init(this.$el, he, xe, oe),
                Le
              );
            }
          }
          function m(K, oe, he) {
            if (K) {
              var ue = typeof K;
              if (
                (oe ||
                  (this.timer && this.timer.destroy(),
                  (this.queue = []),
                  (this.active = !1)),
                ue == "number" && oe)
              )
                return (
                  (this.timer = new fe({
                    duration: K,
                    context: this,
                    complete: C,
                  })),
                  void (this.active = !0)
                );
              if (ue == "string" && oe) {
                switch (K) {
                  case "hide":
                    q.call(this);
                    break;
                  case "stop":
                    z.call(this);
                    break;
                  case "redraw":
                    te.call(this);
                    break;
                  default:
                    y.call(this, K, he && he[1]);
                }
                return C.call(this);
              }
              if (ue == "function") return void K.call(this, this);
              if (ue == "object") {
                var xe = 0;
                je.call(
                  this,
                  K,
                  function (me, VE) {
                    me.span > xe && (xe = me.span), me.stop(), me.animate(VE);
                  },
                  function (me) {
                    "wait" in me && (xe = u(me.wait, 0));
                  }
                ),
                  ve.call(this),
                  xe > 0 &&
                    ((this.timer = new fe({ duration: xe, context: this })),
                    (this.active = !0),
                    oe && (this.timer.complete = C));
                var Xe = this,
                  Le = !1,
                  Pn = {};
                se(function () {
                  je.call(Xe, K, function (me) {
                    me.active && ((Le = !0), (Pn[me.name] = me.nextStyle));
                  }),
                    Le && Xe.$el.css(Pn);
                });
              }
            }
          }
          function O(K) {
            (K = u(K, 0)),
              this.active
                ? this.queue.push({ options: K })
                : ((this.timer = new fe({
                    duration: K,
                    context: this,
                    complete: C,
                  })),
                  (this.active = !0));
          }
          function L(K) {
            return this.active
              ? (this.queue.push({ options: K, args: arguments }),
                void (this.timer.complete = C))
              : c(
                  "No active transition timer. Use start() or wait() before then()."
                );
          }
          function C() {
            if (
              (this.timer && this.timer.destroy(),
              (this.active = !1),
              this.queue.length)
            ) {
              var K = this.queue.shift();
              m.call(this, K.options, !0, K.args);
            }
          }
          function z(K) {
            this.timer && this.timer.destroy(),
              (this.queue = []),
              (this.active = !1);
            var oe;
            typeof K == "string"
              ? ((oe = {}), (oe[K] = 1))
              : (oe = typeof K == "object" && K != null ? K : this.props),
              je.call(this, oe, Se),
              ve.call(this);
          }
          function ee(K) {
            z.call(this, K), je.call(this, K, tn, GE);
          }
          function de(K) {
            typeof K != "string" && (K = "block"), (this.el.style.display = K);
          }
          function q() {
            z.call(this), (this.el.style.display = "none");
          }
          function te() {
            this.el.offsetHeight;
          }
          function re() {
            z.call(this), e.removeData(this.el, w), (this.$el = this.el = null);
          }
          function ve() {
            var K,
              oe,
              he = [];
            this.upstream && he.push(this.upstream);
            for (K in this.props)
              (oe = this.props[K]), oe.active && he.push(oe.string);
            (he = he.join(",")),
              this.style !== he &&
                ((this.style = he), (this.el.style[G.transition.dom] = he));
          }
          function je(K, oe, he) {
            var ue,
              xe,
              Xe,
              Le,
              Pn = oe !== Se,
              me = {};
            for (ue in K)
              (Xe = K[ue]),
                ue in ge
                  ? (me.transform || (me.transform = {}),
                    (me.transform[ue] = Xe))
                  : (x.test(ue) && (ue = n(ue)),
                    ue in k ? (me[ue] = Xe) : (Le || (Le = {}), (Le[ue] = Xe)));
            for (ue in me) {
              if (((Xe = me[ue]), (xe = this.props[ue]), !xe)) {
                if (!Pn) continue;
                xe = y.call(this, ue);
              }
              oe.call(this, xe, Xe);
            }
            he && Le && he.call(this, Le);
          }
          function Se(K) {
            K.stop();
          }
          function tn(K, oe) {
            K.set(oe);
          }
          function GE(K) {
            this.$el.css(K);
          }
          function Ge(K, oe) {
            l[K] = function () {
              return this.children
                ? XE.call(this, oe, arguments)
                : (this.el && oe.apply(this, arguments), this);
            };
          }
          function XE(K, oe) {
            var he,
              ue = this.children.length;
            for (he = 0; ue > he; he++) K.apply(this.children[he], oe);
            return this;
          }
          (l.init = function (K) {
            if (
              ((this.$el = e(K)),
              (this.el = this.$el[0]),
              (this.props = {}),
              (this.queue = []),
              (this.style = ""),
              (this.active = !1),
              ie.keepInherited && !ie.fallback)
            ) {
              var oe = M(this.el, "transition");
              oe && !U.test(oe) && (this.upstream = oe);
            }
            G.backface &&
              ie.hideBackface &&
              g(this.el, G.backface.css, "hidden");
          }),
            Ge("add", y),
            Ge("start", m),
            Ge("wait", O),
            Ge("then", L),
            Ge("next", C),
            Ge("stop", z),
            Ge("set", ee),
            Ge("show", de),
            Ge("hide", q),
            Ge("redraw", te),
            Ge("destroy", re);
        }),
        ye = p(we, function (l) {
          function y(m, O) {
            var L = e.data(m, w) || e.data(m, w, new we.Bare());
            return L.el || L.init(m), O ? L.start(O) : L;
          }
          l.init = function (m, O) {
            var L = e(m);
            if (!L.length) return this;
            if (L.length === 1) return y(L[0], O);
            var C = [];
            return (
              L.each(function (z, ee) {
                C.push(y(ee, O));
              }),
              (this.children = C),
              this
            );
          };
        }),
        Z = p(function (l) {
          function y() {
            var C = this.get();
            this.update("auto");
            var z = this.get();
            return this.update(C), z;
          }
          function m(C, z, ee) {
            return z !== void 0 && (ee = z), C in d ? C : ee;
          }
          function O(C) {
            var z = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(C);
            return (z ? i(z[1], z[2], z[3]) : C).replace(
              /#(\w)(\w)(\w)$/,
              "#$1$1$2$2$3$3"
            );
          }
          var L = { duration: 500, ease: "ease", delay: 0 };
          (l.init = function (C, z, ee, de) {
            (this.$el = C), (this.el = C[0]);
            var q = z[0];
            ee[2] && (q = ee[2]),
              B[q] && (q = B[q]),
              (this.name = q),
              (this.type = ee[1]),
              (this.duration = u(z[1], this.duration, L.duration)),
              (this.ease = m(z[2], this.ease, L.ease)),
              (this.delay = u(z[3], this.delay, L.delay)),
              (this.span = this.duration + this.delay),
              (this.active = !1),
              (this.nextStyle = null),
              (this.auto = W.test(this.name)),
              (this.unit = de.unit || this.unit || ie.defaultUnit),
              (this.angle = de.angle || this.angle || ie.defaultAngle),
              ie.fallback || de.fallback
                ? (this.animate = this.fallback)
                : ((this.animate = this.transition),
                  (this.string =
                    this.name +
                    j +
                    this.duration +
                    "ms" +
                    (this.ease != "ease" ? j + d[this.ease][0] : "") +
                    (this.delay ? j + this.delay + "ms" : "")));
          }),
            (l.set = function (C) {
              (C = this.convert(C, this.type)), this.update(C), this.redraw();
            }),
            (l.transition = function (C) {
              (this.active = !0),
                (C = this.convert(C, this.type)),
                this.auto &&
                  (this.el.style[this.name] == "auto" &&
                    (this.update(this.get()), this.redraw()),
                  C == "auto" && (C = y.call(this))),
                (this.nextStyle = C);
            }),
            (l.fallback = function (C) {
              var z =
                this.el.style[this.name] || this.convert(this.get(), this.type);
              (C = this.convert(C, this.type)),
                this.auto &&
                  (z == "auto" && (z = this.convert(this.get(), this.type)),
                  C == "auto" && (C = y.call(this))),
                (this.tween = new F({
                  from: z,
                  to: C,
                  duration: this.duration,
                  delay: this.delay,
                  ease: this.ease,
                  update: this.update,
                  context: this,
                }));
            }),
            (l.get = function () {
              return M(this.el, this.name);
            }),
            (l.update = function (C) {
              g(this.el, this.name, C);
            }),
            (l.stop = function () {
              (this.active || this.nextStyle) &&
                ((this.active = !1),
                (this.nextStyle = null),
                g(this.el, this.name, this.get()));
              var C = this.tween;
              C && C.context && C.destroy();
            }),
            (l.convert = function (C, z) {
              if (C == "auto" && this.auto) return C;
              var ee,
                de = typeof C == "number",
                q = typeof C == "string";
              switch (z) {
                case A:
                  if (de) return C;
                  if (q && C.replace(v, "") === "") return +C;
                  ee = "number(unitless)";
                  break;
                case S:
                  if (q) {
                    if (C === "" && this.original) return this.original;
                    if (z.test(C))
                      return C.charAt(0) == "#" && C.length == 7 ? C : O(C);
                  }
                  ee = "hex or rgb string";
                  break;
                case P:
                  if (de) return C + this.unit;
                  if (q && z.test(C)) return C;
                  ee = "number(px) or string(unit)";
                  break;
                case R:
                  if (de) return C + this.unit;
                  if (q && z.test(C)) return C;
                  ee = "number(px) or string(unit or %)";
                  break;
                case X:
                  if (de) return C + this.angle;
                  if (q && z.test(C)) return C;
                  ee = "number(deg) or string(angle)";
                  break;
                case V:
                  if (de || (q && R.test(C))) return C;
                  ee = "number(unitless) or string(unit or %)";
              }
              return s(ee, C), C;
            }),
            (l.redraw = function () {
              this.el.offsetHeight;
            });
        }),
        b = p(Z, function (l, y) {
          l.init = function () {
            y.init.apply(this, arguments),
              this.original || (this.original = this.convert(this.get(), S));
          };
        }),
        J = p(Z, function (l, y) {
          (l.init = function () {
            y.init.apply(this, arguments), (this.animate = this.fallback);
          }),
            (l.get = function () {
              return this.$el[this.name]();
            }),
            (l.update = function (m) {
              this.$el[this.name](m);
            });
        }),
        ne = p(Z, function (l, y) {
          function m(O, L) {
            var C, z, ee, de, q;
            for (C in O)
              (de = ge[C]),
                (ee = de[0]),
                (z = de[1] || C),
                (q = this.convert(O[C], ee)),
                L.call(this, z, q, ee);
          }
          (l.init = function () {
            y.init.apply(this, arguments),
              this.current ||
                ((this.current = {}),
                ge.perspective &&
                  ie.perspective &&
                  ((this.current.perspective = ie.perspective),
                  g(this.el, this.name, this.style(this.current)),
                  this.redraw()));
          }),
            (l.set = function (O) {
              m.call(this, O, function (L, C) {
                this.current[L] = C;
              }),
                g(this.el, this.name, this.style(this.current)),
                this.redraw();
            }),
            (l.transition = function (O) {
              var L = this.values(O);
              this.tween = new Te({
                current: this.current,
                values: L,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
              });
              var C,
                z = {};
              for (C in this.current) z[C] = C in L ? L[C] : this.current[C];
              (this.active = !0), (this.nextStyle = this.style(z));
            }),
            (l.fallback = function (O) {
              var L = this.values(O);
              this.tween = new Te({
                current: this.current,
                values: L,
                duration: this.duration,
                delay: this.delay,
                ease: this.ease,
                update: this.update,
                context: this,
              });
            }),
            (l.update = function () {
              g(this.el, this.name, this.style(this.current));
            }),
            (l.style = function (O) {
              var L,
                C = "";
              for (L in O) C += L + "(" + O[L] + ") ";
              return C;
            }),
            (l.values = function (O) {
              var L,
                C = {};
              return (
                m.call(this, O, function (z, ee, de) {
                  (C[z] = ee),
                    this.current[z] === void 0 &&
                      ((L = 0),
                      ~z.indexOf("scale") && (L = 1),
                      (this.current[z] = this.convert(L, de)));
                }),
                C
              );
            });
        }),
        F = p(function (l) {
          function y(q) {
            ee.push(q) === 1 && se(m);
          }
          function m() {
            var q,
              te,
              re,
              ve = ee.length;
            if (ve)
              for (se(m), te = _e(), q = ve; q--; )
                (re = ee[q]), re && re.render(te);
          }
          function O(q) {
            var te,
              re = e.inArray(q, ee);
            re >= 0 &&
              ((te = ee.slice(re + 1)),
              (ee.length = re),
              te.length && (ee = ee.concat(te)));
          }
          function L(q) {
            return Math.round(q * de) / de;
          }
          function C(q, te, re) {
            return i(
              q[0] + re * (te[0] - q[0]),
              q[1] + re * (te[1] - q[1]),
              q[2] + re * (te[2] - q[2])
            );
          }
          var z = { ease: d.ease[1], from: 0, to: 1 };
          (l.init = function (q) {
            (this.duration = q.duration || 0), (this.delay = q.delay || 0);
            var te = q.ease || z.ease;
            d[te] && (te = d[te][1]),
              typeof te != "function" && (te = z.ease),
              (this.ease = te),
              (this.update = q.update || o),
              (this.complete = q.complete || o),
              (this.context = q.context || this),
              (this.name = q.name);
            var re = q.from,
              ve = q.to;
            re === void 0 && (re = z.from),
              ve === void 0 && (ve = z.to),
              (this.unit = q.unit || ""),
              typeof re == "number" && typeof ve == "number"
                ? ((this.begin = re), (this.change = ve - re))
                : this.format(ve, re),
              (this.value = this.begin + this.unit),
              (this.start = _e()),
              q.autoplay !== !1 && this.play();
          }),
            (l.play = function () {
              this.active ||
                (this.start || (this.start = _e()),
                (this.active = !0),
                y(this));
            }),
            (l.stop = function () {
              this.active && ((this.active = !1), O(this));
            }),
            (l.render = function (q) {
              var te,
                re = q - this.start;
              if (this.delay) {
                if (re <= this.delay) return;
                re -= this.delay;
              }
              if (re < this.duration) {
                var ve = this.ease(re, 0, 1, this.duration);
                return (
                  (te = this.startRGB
                    ? C(this.startRGB, this.endRGB, ve)
                    : L(this.begin + ve * this.change)),
                  (this.value = te + this.unit),
                  void this.update.call(this.context, this.value)
                );
              }
              (te = this.endHex || this.begin + this.change),
                (this.value = te + this.unit),
                this.update.call(this.context, this.value),
                this.complete.call(this.context),
                this.destroy();
            }),
            (l.format = function (q, te) {
              if (((te += ""), (q += ""), q.charAt(0) == "#"))
                return (
                  (this.startRGB = r(te)),
                  (this.endRGB = r(q)),
                  (this.endHex = q),
                  (this.begin = 0),
                  void (this.change = 1)
                );
              if (!this.unit) {
                var re = te.replace(v, ""),
                  ve = q.replace(v, "");
                re !== ve && a("tween", te, q), (this.unit = re);
              }
              (te = parseFloat(te)),
                (q = parseFloat(q)),
                (this.begin = this.value = te),
                (this.change = q - te);
            }),
            (l.destroy = function () {
              this.stop(),
                (this.context = null),
                (this.ease = this.update = this.complete = o);
            });
          var ee = [],
            de = 1e3;
        }),
        fe = p(F, function (l) {
          (l.init = function (y) {
            (this.duration = y.duration || 0),
              (this.complete = y.complete || o),
              (this.context = y.context),
              this.play();
          }),
            (l.render = function (y) {
              var m = y - this.start;
              m < this.duration ||
                (this.complete.call(this.context), this.destroy());
            });
        }),
        Te = p(F, function (l, y) {
          (l.init = function (m) {
            (this.context = m.context),
              (this.update = m.update),
              (this.tweens = []),
              (this.current = m.current);
            var O, L;
            for (O in m.values)
              (L = m.values[O]),
                this.current[O] !== L &&
                  this.tweens.push(
                    new F({
                      name: O,
                      from: this.current[O],
                      to: L,
                      duration: m.duration,
                      delay: m.delay,
                      ease: m.ease,
                      autoplay: !1,
                    })
                  );
            this.play();
          }),
            (l.render = function (m) {
              var O,
                L,
                C = this.tweens.length,
                z = !1;
              for (O = C; O--; )
                (L = this.tweens[O]),
                  L.context &&
                    (L.render(m), (this.current[L.name] = L.value), (z = !0));
              return z
                ? void (this.update && this.update.call(this.context))
                : this.destroy();
            }),
            (l.destroy = function () {
              if ((y.destroy.call(this), this.tweens)) {
                var m,
                  O = this.tweens.length;
                for (m = O; m--; ) this.tweens[m].destroy();
                (this.tweens = null), (this.current = null);
              }
            });
        }),
        ie = (t.config = {
          debug: !1,
          defaultUnit: "px",
          defaultAngle: "deg",
          keepInherited: !1,
          hideBackface: !1,
          perspective: "",
          fallback: !G.transition,
          agentTests: [],
        });
      (t.fallback = function (l) {
        if (!G.transition) return (ie.fallback = !0);
        ie.agentTests.push("(" + l + ")");
        var y = new RegExp(ie.agentTests.join("|"), "i");
        ie.fallback = y.test(navigator.userAgent);
      }),
        t.fallback("6.0.[2-5] Safari"),
        (t.tween = function (l) {
          return new F(l);
        }),
        (t.delay = function (l, y, m) {
          return new fe({ complete: y, duration: l, context: m });
        }),
        (e.fn.tram = function (l) {
          return t.call(null, this, l);
        });
      var g = e.style,
        M = e.css,
        B = { transform: G.transform && G.transform.css },
        k = {
          color: [b, S],
          background: [b, S, "background-color"],
          "outline-color": [b, S],
          "border-color": [b, S],
          "border-top-color": [b, S],
          "border-right-color": [b, S],
          "border-bottom-color": [b, S],
          "border-left-color": [b, S],
          "border-width": [Z, P],
          "border-top-width": [Z, P],
          "border-right-width": [Z, P],
          "border-bottom-width": [Z, P],
          "border-left-width": [Z, P],
          "border-spacing": [Z, P],
          "letter-spacing": [Z, P],
          margin: [Z, P],
          "margin-top": [Z, P],
          "margin-right": [Z, P],
          "margin-bottom": [Z, P],
          "margin-left": [Z, P],
          padding: [Z, P],
          "padding-top": [Z, P],
          "padding-right": [Z, P],
          "padding-bottom": [Z, P],
          "padding-left": [Z, P],
          "outline-width": [Z, P],
          opacity: [Z, A],
          top: [Z, R],
          right: [Z, R],
          bottom: [Z, R],
          left: [Z, R],
          "font-size": [Z, R],
          "text-indent": [Z, R],
          "word-spacing": [Z, R],
          width: [Z, R],
          "min-width": [Z, R],
          "max-width": [Z, R],
          height: [Z, R],
          "min-height": [Z, R],
          "max-height": [Z, R],
          "line-height": [Z, V],
          "scroll-top": [J, A, "scrollTop"],
          "scroll-left": [J, A, "scrollLeft"],
        },
        ge = {};
      G.transform &&
        ((k.transform = [ne]),
        (ge = {
          x: [R, "translateX"],
          y: [R, "translateY"],
          rotate: [X],
          rotateX: [X],
          rotateY: [X],
          scale: [A],
          scaleX: [A],
          scaleY: [A],
          skew: [X],
          skewX: [X],
          skewY: [X],
        })),
        G.transform &&
          G.backface &&
          ((ge.z = [R, "translateZ"]),
          (ge.rotateZ = [X]),
          (ge.scaleZ = [A]),
          (ge.perspective = [P]));
      var en = /ms/,
        ht = /s|\./;
      return (e.tram = t);
    })(window.jQuery);
  });
  var ga = f((CF, pa) => {
    "use strict";
    var zE = window.$,
      KE = Kr() && zE.tram;
    pa.exports = (function () {
      var e = {};
      e.VERSION = "1.6.0-Webflow";
      var t = {},
        n = Array.prototype,
        r = Object.prototype,
        i = Function.prototype,
        o = n.push,
        s = n.slice,
        a = n.concat,
        u = r.toString,
        c = r.hasOwnProperty,
        h = n.forEach,
        p = n.map,
        d = n.reduce,
        E = n.reduceRight,
        I = n.filter,
        _ = n.every,
        w = n.some,
        v = n.indexOf,
        x = n.lastIndexOf,
        A = Array.isArray,
        S = Object.keys,
        P = i.bind,
        R =
          (e.each =
          e.forEach =
            function (T, D, H) {
              if (T == null) return T;
              if (h && T.forEach === h) T.forEach(D, H);
              else if (T.length === +T.length) {
                for (var G = 0, Y = T.length; G < Y; G++)
                  if (D.call(H, T[G], G, T) === t) return;
              } else
                for (var Q = e.keys(T), G = 0, Y = Q.length; G < Y; G++)
                  if (D.call(H, T[Q[G]], Q[G], T) === t) return;
              return T;
            });
      (e.map = e.collect =
        function (T, D, H) {
          var G = [];
          return T == null
            ? G
            : p && T.map === p
            ? T.map(D, H)
            : (R(T, function (Y, Q, se) {
                G.push(D.call(H, Y, Q, se));
              }),
              G);
        }),
        (e.find = e.detect =
          function (T, D, H) {
            var G;
            return (
              X(T, function (Y, Q, se) {
                if (D.call(H, Y, Q, se)) return (G = Y), !0;
              }),
              G
            );
          }),
        (e.filter = e.select =
          function (T, D, H) {
            var G = [];
            return T == null
              ? G
              : I && T.filter === I
              ? T.filter(D, H)
              : (R(T, function (Y, Q, se) {
                  D.call(H, Y, Q, se) && G.push(Y);
                }),
                G);
          });
      var X =
        (e.some =
        e.any =
          function (T, D, H) {
            D || (D = e.identity);
            var G = !1;
            return T == null
              ? G
              : w && T.some === w
              ? T.some(D, H)
              : (R(T, function (Y, Q, se) {
                  if (G || (G = D.call(H, Y, Q, se))) return t;
                }),
                !!G);
          });
      (e.contains = e.include =
        function (T, D) {
          return T == null
            ? !1
            : v && T.indexOf === v
            ? T.indexOf(D) != -1
            : X(T, function (H) {
                return H === D;
              });
        }),
        (e.delay = function (T, D) {
          var H = s.call(arguments, 2);
          return setTimeout(function () {
            return T.apply(null, H);
          }, D);
        }),
        (e.defer = function (T) {
          return e.delay.apply(e, [T, 1].concat(s.call(arguments, 1)));
        }),
        (e.throttle = function (T) {
          var D, H, G;
          return function () {
            D ||
              ((D = !0),
              (H = arguments),
              (G = this),
              KE.frame(function () {
                (D = !1), T.apply(G, H);
              }));
          };
        }),
        (e.debounce = function (T, D, H) {
          var G,
            Y,
            Q,
            se,
            _e,
            we = function () {
              var ye = e.now() - se;
              ye < D
                ? (G = setTimeout(we, D - ye))
                : ((G = null), H || ((_e = T.apply(Q, Y)), (Q = Y = null)));
            };
          return function () {
            (Q = this), (Y = arguments), (se = e.now());
            var ye = H && !G;
            return (
              G || (G = setTimeout(we, D)),
              ye && ((_e = T.apply(Q, Y)), (Q = Y = null)),
              _e
            );
          };
        }),
        (e.defaults = function (T) {
          if (!e.isObject(T)) return T;
          for (var D = 1, H = arguments.length; D < H; D++) {
            var G = arguments[D];
            for (var Y in G) T[Y] === void 0 && (T[Y] = G[Y]);
          }
          return T;
        }),
        (e.keys = function (T) {
          if (!e.isObject(T)) return [];
          if (S) return S(T);
          var D = [];
          for (var H in T) e.has(T, H) && D.push(H);
          return D;
        }),
        (e.has = function (T, D) {
          return c.call(T, D);
        }),
        (e.isObject = function (T) {
          return T === Object(T);
        }),
        (e.now =
          Date.now ||
          function () {
            return new Date().getTime();
          }),
        (e.templateSettings = {
          evaluate: /<%([\s\S]+?)%>/g,
          interpolate: /<%=([\s\S]+?)%>/g,
          escape: /<%-([\s\S]+?)%>/g,
        });
      var V = /(.)^/,
        U = {
          "'": "'",
          "\\": "\\",
          "\r": "r",
          "\n": "n",
          "\u2028": "u2028",
          "\u2029": "u2029",
        },
        W = /\\|'|\r|\n|\u2028|\u2029/g,
        j = function (T) {
          return "\\" + U[T];
        },
        N = /^\s*(\w|\$)+\s*$/;
      return (
        (e.template = function (T, D, H) {
          !D && H && (D = H), (D = e.defaults({}, D, e.templateSettings));
          var G = RegExp(
              [
                (D.escape || V).source,
                (D.interpolate || V).source,
                (D.evaluate || V).source,
              ].join("|") + "|$",
              "g"
            ),
            Y = 0,
            Q = "__p+='";
          T.replace(G, function (ye, Z, b, J, ne) {
            return (
              (Q += T.slice(Y, ne).replace(W, j)),
              (Y = ne + ye.length),
              Z
                ? (Q +=
                    `'+
    ((__t=(` +
                    Z +
                    `))==null?'':_.escape(__t))+
    '`)
                : b
                ? (Q +=
                    `'+
    ((__t=(` +
                    b +
                    `))==null?'':__t)+
    '`)
                : J &&
                  (Q +=
                    `';
    ` +
                    J +
                    `
    __p+='`),
              ye
            );
          }),
            (Q += `';
    `);
          var se = D.variable;
          if (se) {
            if (!N.test(se))
              throw new Error("variable is not a bare identifier: " + se);
          } else
            (Q =
              `with(obj||{}){
    ` +
              Q +
              `}
    `),
              (se = "obj");
          Q =
            `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
    ` +
            Q +
            `return __p;
    `;
          var _e;
          try {
            _e = new Function(D.variable || "obj", "_", Q);
          } catch (ye) {
            throw ((ye.source = Q), ye);
          }
          var we = function (ye) {
            return _e.call(this, ye, e);
          };
          return (
            (we.source =
              "function(" +
              se +
              `){
    ` +
              Q +
              "}"),
            we
          );
        }),
        e
      );
    })();
  });
  var He = f((PF, Ta) => {
    "use strict";
    var ce = {},
      wt = {},
      Ot = [],
      Yr = window.Webflow || [],
      ut = window.jQuery,
      ke = ut(window),
      jE = ut(document),
      Qe = ut.isFunction,
      Ve = (ce._ = ga()),
      Ea = (ce.tram = Kr() && ut.tram),
      Dn = !1,
      Qr = !1;
    Ea.config.hideBackface = !1;
    Ea.config.keepInherited = !0;
    ce.define = function (e, t, n) {
      wt[e] && va(wt[e]);
      var r = (wt[e] = t(ut, Ve, n) || {});
      return ya(r), r;
    };
    ce.require = function (e) {
      return wt[e];
    };
    function ya(e) {
      ce.env() &&
        (Qe(e.design) && ke.on("__wf_design", e.design),
        Qe(e.preview) && ke.on("__wf_preview", e.preview)),
        Qe(e.destroy) && ke.on("__wf_destroy", e.destroy),
        e.ready && Qe(e.ready) && YE(e);
    }
    function YE(e) {
      if (Dn) {
        e.ready();
        return;
      }
      Ve.contains(Ot, e.ready) || Ot.push(e.ready);
    }
    function va(e) {
      Qe(e.design) && ke.off("__wf_design", e.design),
        Qe(e.preview) && ke.off("__wf_preview", e.preview),
        Qe(e.destroy) && ke.off("__wf_destroy", e.destroy),
        e.ready && Qe(e.ready) && QE(e);
    }
    function QE(e) {
      Ot = Ve.filter(Ot, function (t) {
        return t !== e.ready;
      });
    }
    ce.push = function (e) {
      if (Dn) {
        Qe(e) && e();
        return;
      }
      Yr.push(e);
    };
    ce.env = function (e) {
      var t = window.__wf_design,
        n = typeof t < "u";
      if (!e) return n;
      if (e === "design") return n && t;
      if (e === "preview") return n && !t;
      if (e === "slug") return n && window.__wf_slug;
      if (e === "editor") return window.WebflowEditor;
      if (e === "test") return window.__wf_test;
      if (e === "frame") return window !== window.top;
    };
    var Nn = navigator.userAgent.toLowerCase(),
      ma = (ce.env.touch =
        "ontouchstart" in window ||
        (window.DocumentTouch && document instanceof window.DocumentTouch)),
      $E = (ce.env.chrome =
        /chrome/.test(Nn) &&
        /Google/.test(navigator.vendor) &&
        parseInt(Nn.match(/chrome\/(\d+)\./)[1], 10)),
      ZE = (ce.env.ios = /(ipod|iphone|ipad)/.test(Nn));
    ce.env.safari = /safari/.test(Nn) && !$E && !ZE;
    var jr;
    ma &&
      jE.on("touchstart mousedown", function (e) {
        jr = e.target;
      });
    ce.validClick = ma
      ? function (e) {
          return e === jr || ut.contains(e, jr);
        }
      : function () {
          return !0;
        };
    var _a = "resize.webflow orientationchange.webflow load.webflow",
      JE = "scroll.webflow " + _a;
    ce.resize = $r(ke, _a);
    ce.scroll = $r(ke, JE);
    ce.redraw = $r();
    function $r(e, t) {
      var n = [],
        r = {};
      return (
        (r.up = Ve.throttle(function (i) {
          Ve.each(n, function (o) {
            o(i);
          });
        })),
        e && t && e.on(t, r.up),
        (r.on = function (i) {
          typeof i == "function" && (Ve.contains(n, i) || n.push(i));
        }),
        (r.off = function (i) {
          if (!arguments.length) {
            n = [];
            return;
          }
          n = Ve.filter(n, function (o) {
            return o !== i;
          });
        }),
        r
      );
    }
    ce.location = function (e) {
      window.location = e;
    };
    ce.env() && (ce.location = function () {});
    ce.ready = function () {
      (Dn = !0), Qr ? ey() : Ve.each(Ot, ha), Ve.each(Yr, ha), ce.resize.up();
    };
    function ha(e) {
      Qe(e) && e();
    }
    function ey() {
      (Qr = !1), Ve.each(wt, ya);
    }
    var Et;
    ce.load = function (e) {
      Et.then(e);
    };
    function Ia() {
      Et && (Et.reject(), ke.off("load", Et.resolve)),
        (Et = new ut.Deferred()),
        ke.on("load", Et.resolve);
    }
    ce.destroy = function (e) {
      (e = e || {}),
        (Qr = !0),
        ke.triggerHandler("__wf_destroy"),
        e.domready != null && (Dn = e.domready),
        Ve.each(wt, va),
        ce.resize.off(),
        ce.scroll.off(),
        ce.redraw.off(),
        (Ot = []),
        (Yr = []),
        Et.state() === "pending" && Ia();
    };
    ut(ce.ready);
    Ia();
    Ta.exports = window.Webflow = ce;
  });
  var wa = f((LF, Aa) => {
    "use strict";
    var ba = He();
    ba.define(
      "brand",
      (Aa.exports = function (e) {
        var t = {},
          n = document,
          r = e("html"),
          i = e("body"),
          o = ".w-webflow-badge",
          s = window.location,
          a = /PhantomJS/i.test(navigator.userAgent),
          u =
            "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange",
          c;
        t.ready = function () {
          var E = r.attr("data-wf-status"),
            I = r.attr("data-wf-domain") || "";
          /\.webflow\.io$/i.test(I) && s.hostname !== I && (E = !0),
            E &&
              !a &&
              ((c = c || p()),
              d(),
              setTimeout(d, 500),
              e(n).off(u, h).on(u, h));
        };
        function h() {
          var E =
            n.fullScreen ||
            n.mozFullScreen ||
            n.webkitIsFullScreen ||
            n.msFullscreenElement ||
            !!n.webkitFullscreenElement;
          e(c).attr("style", E ? "display: none !important;" : "");
        }
        function p() {
          var E = e('<a class="w-webflow-badge"></a>').attr(
              "href",
              "https://webflow.com?utm_campaign=brandjs"
            ),
            I = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg"
              )
              .attr("alt", "")
              .css({ marginRight: "4px", width: "26px" }),
            _ = e("<img>")
              .attr(
                "src",
                "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg"
              )
              .attr("alt", "Made in Webflow");
          return E.append(I, _), E[0];
        }
        function d() {
          var E = i.children(o),
            I = E.length && E.get(0) === c,
            _ = ba.env("editor");
          if (I) {
            _ && E.remove();
            return;
          }
          E.length && E.remove(), _ || i.append(c);
        }
        return t;
      })
    );
  });
  var Sa = f((NF, Oa) => {
    "use strict";
    var Zr = He();
    Zr.define(
      "edit",
      (Oa.exports = function (e, t, n) {
        if (
          ((n = n || {}),
          (Zr.env("test") || Zr.env("frame")) && !n.fixture && !ty())
        )
          return { exit: 1 };
        var r = {},
          i = e(window),
          o = e(document.documentElement),
          s = document.location,
          a = "hashchange",
          u,
          c = n.load || d,
          h = !1;
        try {
          h =
            localStorage &&
            localStorage.getItem &&
            localStorage.getItem("WebflowEditor");
        } catch {}
        h
          ? c()
          : s.search
          ? (/[?&](edit)(?:[=&?]|$)/.test(s.search) ||
              /\?edit$/.test(s.href)) &&
            c()
          : i.on(a, p).triggerHandler(a);
        function p() {
          u || (/\?edit/.test(s.hash) && c());
        }
        function d() {
          (u = !0),
            (window.WebflowEditor = !0),
            i.off(a, p),
            x(function (S) {
              e.ajax({
                url: v("https://editor-api.webflow.com/api/editor/view"),
                data: { siteId: o.attr("data-wf-site") },
                xhrFields: { withCredentials: !0 },
                dataType: "json",
                crossDomain: !0,
                success: E(S),
              });
            });
        }
        function E(S) {
          return function (P) {
            if (!P) {
              console.error("Could not load editor data");
              return;
            }
            (P.thirdPartyCookiesSupported = S),
              I(w(P.scriptPath), function () {
                window.WebflowEditor(P);
              });
          };
        }
        function I(S, P) {
          e.ajax({ type: "GET", url: S, dataType: "script", cache: !0 }).then(
            P,
            _
          );
        }
        function _(S, P, R) {
          throw (console.error("Could not load editor script: " + P), R);
        }
        function w(S) {
          return S.indexOf("//") >= 0
            ? S
            : v("https://editor-api.webflow.com" + S);
        }
        function v(S) {
          return S.replace(/([^:])\/\//g, "$1/");
        }
        function x(S) {
          var P = window.document.createElement("iframe");
          (P.src = "https://webflow.com/site/third-party-cookie-check.html"),
            (P.style.display = "none"),
            (P.sandbox = "allow-scripts allow-same-origin");
          var R = function (X) {
            X.data === "WF_third_party_cookies_unsupported"
              ? (A(P, R), S(!1))
              : X.data === "WF_third_party_cookies_supported" &&
                (A(P, R), S(!0));
          };
          (P.onerror = function () {
            A(P, R), S(!1);
          }),
            window.addEventListener("message", R, !1),
            window.document.body.appendChild(P);
        }
        function A(S, P) {
          window.removeEventListener("message", P, !1), S.remove();
        }
        return r;
      })
    );
    function ty() {
      try {
        return window.top.__Cypress__;
      } catch {
        return !1;
      }
    }
  });
  var Ra = f((DF, xa) => {
    "use strict";
    var ny = He();
    ny.define(
      "focus-visible",
      (xa.exports = function () {
        function e(n) {
          var r = !0,
            i = !1,
            o = null,
            s = {
              text: !0,
              search: !0,
              url: !0,
              tel: !0,
              email: !0,
              password: !0,
              number: !0,
              date: !0,
              month: !0,
              week: !0,
              time: !0,
              datetime: !0,
              "datetime-local": !0,
            };
          function a(A) {
            return !!(
              A &&
              A !== document &&
              A.nodeName !== "HTML" &&
              A.nodeName !== "BODY" &&
              "classList" in A &&
              "contains" in A.classList
            );
          }
          function u(A) {
            var S = A.type,
              P = A.tagName;
            return !!(
              (P === "INPUT" && s[S] && !A.readOnly) ||
              (P === "TEXTAREA" && !A.readOnly) ||
              A.isContentEditable
            );
          }
          function c(A) {
            A.getAttribute("data-wf-focus-visible") ||
              A.setAttribute("data-wf-focus-visible", "true");
          }
          function h(A) {
            A.getAttribute("data-wf-focus-visible") &&
              A.removeAttribute("data-wf-focus-visible");
          }
          function p(A) {
            A.metaKey ||
              A.altKey ||
              A.ctrlKey ||
              (a(n.activeElement) && c(n.activeElement), (r = !0));
          }
          function d() {
            r = !1;
          }
          function E(A) {
            a(A.target) && (r || u(A.target)) && c(A.target);
          }
          function I(A) {
            a(A.target) &&
              A.target.hasAttribute("data-wf-focus-visible") &&
              ((i = !0),
              window.clearTimeout(o),
              (o = window.setTimeout(function () {
                i = !1;
              }, 100)),
              h(A.target));
          }
          function _() {
            document.visibilityState === "hidden" && (i && (r = !0), w());
          }
          function w() {
            document.addEventListener("mousemove", x),
              document.addEventListener("mousedown", x),
              document.addEventListener("mouseup", x),
              document.addEventListener("pointermove", x),
              document.addEventListener("pointerdown", x),
              document.addEventListener("pointerup", x),
              document.addEventListener("touchmove", x),
              document.addEventListener("touchstart", x),
              document.addEventListener("touchend", x);
          }
          function v() {
            document.removeEventListener("mousemove", x),
              document.removeEventListener("mousedown", x),
              document.removeEventListener("mouseup", x),
              document.removeEventListener("pointermove", x),
              document.removeEventListener("pointerdown", x),
              document.removeEventListener("pointerup", x),
              document.removeEventListener("touchmove", x),
              document.removeEventListener("touchstart", x),
              document.removeEventListener("touchend", x);
          }
          function x(A) {
            (A.target.nodeName && A.target.nodeName.toLowerCase() === "html") ||
              ((r = !1), v());
          }
          document.addEventListener("keydown", p, !0),
            document.addEventListener("mousedown", d, !0),
            document.addEventListener("pointerdown", d, !0),
            document.addEventListener("touchstart", d, !0),
            document.addEventListener("visibilitychange", _, !0),
            w(),
            n.addEventListener("focus", E, !0),
            n.addEventListener("blur", I, !0);
        }
        function t() {
          if (typeof document < "u")
            try {
              document.querySelector(":focus-visible");
            } catch {
              e(document);
            }
        }
        return { ready: t };
      })
    );
  });
  var La = f((MF, Pa) => {
    "use strict";
    var Ca = He();
    Ca.define(
      "focus",
      (Pa.exports = function () {
        var e = [],
          t = !1;
        function n(s) {
          t &&
            (s.preventDefault(),
            s.stopPropagation(),
            s.stopImmediatePropagation(),
            e.unshift(s));
        }
        function r(s) {
          var a = s.target,
            u = a.tagName;
          return (
            (/^a$/i.test(u) && a.href != null) ||
            (/^(button|textarea)$/i.test(u) && a.disabled !== !0) ||
            (/^input$/i.test(u) &&
              /^(button|reset|submit|radio|checkbox)$/i.test(a.type) &&
              !a.disabled) ||
            (!/^(button|input|textarea|select|a)$/i.test(u) &&
              !Number.isNaN(Number.parseFloat(a.tabIndex))) ||
            /^audio$/i.test(u) ||
            (/^video$/i.test(u) && a.controls === !0)
          );
        }
        function i(s) {
          r(s) &&
            ((t = !0),
            setTimeout(() => {
              for (t = !1, s.target.focus(); e.length > 0; ) {
                var a = e.pop();
                a.target.dispatchEvent(new MouseEvent(a.type, a));
              }
            }, 0));
        }
        function o() {
          typeof document < "u" &&
            document.body.hasAttribute("data-wf-focus-within") &&
            Ca.env.safari &&
            (document.addEventListener("mousedown", i, !0),
            document.addEventListener("mouseup", n, !0),
            document.addEventListener("click", n, !0));
        }
        return { ready: o };
      })
    );
  });
  var Ma = f((FF, Da) => {
    "use strict";
    var Jr = window.jQuery,
      $e = {},
      Mn = [],
      Na = ".w-ix",
      Fn = {
        reset: function (e, t) {
          t.__wf_intro = null;
        },
        intro: function (e, t) {
          t.__wf_intro ||
            ((t.__wf_intro = !0), Jr(t).triggerHandler($e.types.INTRO));
        },
        outro: function (e, t) {
          t.__wf_intro &&
            ((t.__wf_intro = null), Jr(t).triggerHandler($e.types.OUTRO));
        },
      };
    $e.triggers = {};
    $e.types = { INTRO: "w-ix-intro" + Na, OUTRO: "w-ix-outro" + Na };
    $e.init = function () {
      for (var e = Mn.length, t = 0; t < e; t++) {
        var n = Mn[t];
        n[0](0, n[1]);
      }
      (Mn = []), Jr.extend($e.triggers, Fn);
    };
    $e.async = function () {
      for (var e in Fn) {
        var t = Fn[e];
        Fn.hasOwnProperty(e) &&
          ($e.triggers[e] = function (n, r) {
            Mn.push([t, r]);
          });
      }
    };
    $e.async();
    Da.exports = $e;
  });
  var Gn = f((qF, Ga) => {
    "use strict";
    var ei = Ma();
    function Fa(e, t) {
      var n = document.createEvent("CustomEvent");
      n.initCustomEvent(t, !0, !0, null), e.dispatchEvent(n);
    }
    var ry = window.jQuery,
      qn = {},
      qa = ".w-ix",
      iy = {
        reset: function (e, t) {
          ei.triggers.reset(e, t);
        },
        intro: function (e, t) {
          ei.triggers.intro(e, t), Fa(t, "COMPONENT_ACTIVE");
        },
        outro: function (e, t) {
          ei.triggers.outro(e, t), Fa(t, "COMPONENT_INACTIVE");
        },
      };
    qn.triggers = {};
    qn.types = { INTRO: "w-ix-intro" + qa, OUTRO: "w-ix-outro" + qa };
    ry.extend(qn.triggers, iy);
    Ga.exports = qn;
  });
  var ti = f((GF, Xa) => {
    var oy =
      typeof global == "object" && global && global.Object === Object && global;
    Xa.exports = oy;
  });
  var Ue = f((XF, Va) => {
    var ay = ti(),
      sy = typeof self == "object" && self && self.Object === Object && self,
      uy = ay || sy || Function("return this")();
    Va.exports = uy;
  });
  var St = f((VF, ka) => {
    var cy = Ue(),
      ly = cy.Symbol;
    ka.exports = ly;
  });
  var Wa = f((kF, Ba) => {
    var Ha = St(),
      Ua = Object.prototype,
      fy = Ua.hasOwnProperty,
      dy = Ua.toString,
      nn = Ha ? Ha.toStringTag : void 0;
    function py(e) {
      var t = fy.call(e, nn),
        n = e[nn];
      try {
        e[nn] = void 0;
        var r = !0;
      } catch {}
      var i = dy.call(e);
      return r && (t ? (e[nn] = n) : delete e[nn]), i;
    }
    Ba.exports = py;
  });
  var Ka = f((HF, za) => {
    var gy = Object.prototype,
      hy = gy.toString;
    function Ey(e) {
      return hy.call(e);
    }
    za.exports = Ey;
  });
  var ct = f((UF, Qa) => {
    var ja = St(),
      yy = Wa(),
      vy = Ka(),
      my = "[object Null]",
      _y = "[object Undefined]",
      Ya = ja ? ja.toStringTag : void 0;
    function Iy(e) {
      return e == null
        ? e === void 0
          ? _y
          : my
        : Ya && Ya in Object(e)
        ? yy(e)
        : vy(e);
    }
    Qa.exports = Iy;
  });
  var ni = f((BF, $a) => {
    function Ty(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    $a.exports = Ty;
  });
  var ri = f((WF, Za) => {
    var by = ni(),
      Ay = by(Object.getPrototypeOf, Object);
    Za.exports = Ay;
  });
  var rt = f((zF, Ja) => {
    function wy(e) {
      return e != null && typeof e == "object";
    }
    Ja.exports = wy;
  });
  var ii = f((KF, ts) => {
    var Oy = ct(),
      Sy = ri(),
      xy = rt(),
      Ry = "[object Object]",
      Cy = Function.prototype,
      Py = Object.prototype,
      es = Cy.toString,
      Ly = Py.hasOwnProperty,
      Ny = es.call(Object);
    function Dy(e) {
      if (!xy(e) || Oy(e) != Ry) return !1;
      var t = Sy(e);
      if (t === null) return !0;
      var n = Ly.call(t, "constructor") && t.constructor;
      return typeof n == "function" && n instanceof n && es.call(n) == Ny;
    }
    ts.exports = Dy;
  });
  var ns = f((oi) => {
    "use strict";
    Object.defineProperty(oi, "__esModule", { value: !0 });
    oi.default = My;
    function My(e) {
      var t,
        n = e.Symbol;
      return (
        typeof n == "function"
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
  });
  var rs = f((si, ai) => {
    "use strict";
    Object.defineProperty(si, "__esModule", { value: !0 });
    var Fy = ns(),
      qy = Gy(Fy);
    function Gy(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var xt;
    typeof self < "u"
      ? (xt = self)
      : typeof window < "u"
      ? (xt = window)
      : typeof global < "u"
      ? (xt = global)
      : typeof ai < "u"
      ? (xt = ai)
      : (xt = Function("return this")());
    var Xy = (0, qy.default)(xt);
    si.default = Xy;
  });
  var ui = f((rn) => {
    "use strict";
    rn.__esModule = !0;
    rn.ActionTypes = void 0;
    rn.default = ss;
    var Vy = ii(),
      ky = as(Vy),
      Hy = rs(),
      is = as(Hy);
    function as(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var os = (rn.ActionTypes = { INIT: "@@redux/INIT" });
    function ss(e, t, n) {
      var r;
      if (
        (typeof t == "function" && typeof n > "u" && ((n = t), (t = void 0)),
        typeof n < "u")
      ) {
        if (typeof n != "function")
          throw new Error("Expected the enhancer to be a function.");
        return n(ss)(e, t);
      }
      if (typeof e != "function")
        throw new Error("Expected the reducer to be a function.");
      var i = e,
        o = t,
        s = [],
        a = s,
        u = !1;
      function c() {
        a === s && (a = s.slice());
      }
      function h() {
        return o;
      }
      function p(_) {
        if (typeof _ != "function")
          throw new Error("Expected listener to be a function.");
        var w = !0;
        return (
          c(),
          a.push(_),
          function () {
            if (w) {
              (w = !1), c();
              var x = a.indexOf(_);
              a.splice(x, 1);
            }
          }
        );
      }
      function d(_) {
        if (!(0, ky.default)(_))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if (typeof _.type > "u")
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (u) throw new Error("Reducers may not dispatch actions.");
        try {
          (u = !0), (o = i(o, _));
        } finally {
          u = !1;
        }
        for (var w = (s = a), v = 0; v < w.length; v++) w[v]();
        return _;
      }
      function E(_) {
        if (typeof _ != "function")
          throw new Error("Expected the nextReducer to be a function.");
        (i = _), d({ type: os.INIT });
      }
      function I() {
        var _,
          w = p;
        return (
          (_ = {
            subscribe: function (x) {
              if (typeof x != "object")
                throw new TypeError("Expected the observer to be an object.");
              function A() {
                x.next && x.next(h());
              }
              A();
              var S = w(A);
              return { unsubscribe: S };
            },
          }),
          (_[is.default] = function () {
            return this;
          }),
          _
        );
      }
      return (
        d({ type: os.INIT }),
        (r = { dispatch: d, subscribe: p, getState: h, replaceReducer: E }),
        (r[is.default] = I),
        r
      );
    }
  });
  var li = f((ci) => {
    "use strict";
    ci.__esModule = !0;
    ci.default = Uy;
    function Uy(e) {
      typeof console < "u" &&
        typeof console.error == "function" &&
        console.error(e);
      try {
        throw new Error(e);
      } catch {}
    }
  });
  var ls = f((fi) => {
    "use strict";
    fi.__esModule = !0;
    fi.default = jy;
    var us = ui(),
      By = ii(),
      $F = cs(By),
      Wy = li(),
      ZF = cs(Wy);
    function cs(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function zy(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state.'
      );
    }
    function Ky(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, { type: us.ActionTypes.INIT });
        if (typeof r > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (typeof n(void 0, { type: i }) > "u")
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                us.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
          );
      });
    }
    function jy(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        typeof e[i] == "function" && (n[i] = e[i]);
      }
      var o = Object.keys(n);
      if (!1) var s;
      var a;
      try {
        Ky(n);
      } catch (u) {
        a = u;
      }
      return function () {
        var c =
            arguments.length <= 0 || arguments[0] === void 0
              ? {}
              : arguments[0],
          h = arguments[1];
        if (a) throw a;
        if (!1) var p;
        for (var d = !1, E = {}, I = 0; I < o.length; I++) {
          var _ = o[I],
            w = n[_],
            v = c[_],
            x = w(v, h);
          if (typeof x > "u") {
            var A = zy(_, h);
            throw new Error(A);
          }
          (E[_] = x), (d = d || x !== v);
        }
        return d ? E : c;
      };
    }
  });
  var ds = f((di) => {
    "use strict";
    di.__esModule = !0;
    di.default = Yy;
    function fs(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function Yy(e, t) {
      if (typeof e == "function") return fs(e, t);
      if (typeof e != "object" || e === null)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (e === null ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var n = Object.keys(e), r = {}, i = 0; i < n.length; i++) {
        var o = n[i],
          s = e[o];
        typeof s == "function" && (r[o] = fs(s, t));
      }
      return r;
    }
  });
  var gi = f((pi) => {
    "use strict";
    pi.__esModule = !0;
    pi.default = Qy;
    function Qy() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      if (t.length === 0)
        return function (o) {
          return o;
        };
      if (t.length === 1) return t[0];
      var r = t[t.length - 1],
        i = t.slice(0, -1);
      return function () {
        return i.reduceRight(function (o, s) {
          return s(o);
        }, r.apply(void 0, arguments));
      };
    }
  });
  var ps = f((hi) => {
    "use strict";
    hi.__esModule = !0;
    var $y =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    hi.default = tv;
    var Zy = gi(),
      Jy = ev(Zy);
    function ev(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function tv() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (r) {
        return function (i, o, s) {
          var a = r(i, o, s),
            u = a.dispatch,
            c = [],
            h = {
              getState: a.getState,
              dispatch: function (d) {
                return u(d);
              },
            };
          return (
            (c = t.map(function (p) {
              return p(h);
            })),
            (u = Jy.default.apply(void 0, c)(a.dispatch)),
            $y({}, a, { dispatch: u })
          );
        };
      };
    }
  });
  var Ei = f((qe) => {
    "use strict";
    qe.__esModule = !0;
    qe.compose =
      qe.applyMiddleware =
      qe.bindActionCreators =
      qe.combineReducers =
      qe.createStore =
        void 0;
    var nv = ui(),
      rv = Rt(nv),
      iv = ls(),
      ov = Rt(iv),
      av = ds(),
      sv = Rt(av),
      uv = ps(),
      cv = Rt(uv),
      lv = gi(),
      fv = Rt(lv),
      dv = li(),
      r2 = Rt(dv);
    function Rt(e) {
      return e && e.__esModule ? e : { default: e };
    }
    qe.createStore = rv.default;
    qe.combineReducers = ov.default;
    qe.bindActionCreators = sv.default;
    qe.applyMiddleware = cv.default;
    qe.compose = fv.default;
  });
  var Be,
    yi,
    Ze,
    pv,
    gv,
    Xn,
    hv,
    vi = pe(() => {
      "use strict";
      (Be = {
        NAVBAR_OPEN: "NAVBAR_OPEN",
        NAVBAR_CLOSE: "NAVBAR_CLOSE",
        TAB_ACTIVE: "TAB_ACTIVE",
        TAB_INACTIVE: "TAB_INACTIVE",
        SLIDER_ACTIVE: "SLIDER_ACTIVE",
        SLIDER_INACTIVE: "SLIDER_INACTIVE",
        DROPDOWN_OPEN: "DROPDOWN_OPEN",
        DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
        MOUSE_CLICK: "MOUSE_CLICK",
        MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
        MOUSE_DOWN: "MOUSE_DOWN",
        MOUSE_UP: "MOUSE_UP",
        MOUSE_OVER: "MOUSE_OVER",
        MOUSE_OUT: "MOUSE_OUT",
        MOUSE_MOVE: "MOUSE_MOVE",
        MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
        SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
        SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
        SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
        ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
        ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
        PAGE_START: "PAGE_START",
        PAGE_FINISH: "PAGE_FINISH",
        PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
        PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
        PAGE_SCROLL: "PAGE_SCROLL",
      }),
        (yi = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
        (Ze = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
        (pv = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
        (gv = {
          CHILDREN: "CHILDREN",
          SIBLINGS: "SIBLINGS",
          IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
        }),
        (Xn = {
          FADE_EFFECT: "FADE_EFFECT",
          SLIDE_EFFECT: "SLIDE_EFFECT",
          GROW_EFFECT: "GROW_EFFECT",
          SHRINK_EFFECT: "SHRINK_EFFECT",
          SPIN_EFFECT: "SPIN_EFFECT",
          FLY_EFFECT: "FLY_EFFECT",
          POP_EFFECT: "POP_EFFECT",
          FLIP_EFFECT: "FLIP_EFFECT",
          JIGGLE_EFFECT: "JIGGLE_EFFECT",
          PULSE_EFFECT: "PULSE_EFFECT",
          DROP_EFFECT: "DROP_EFFECT",
          BLINK_EFFECT: "BLINK_EFFECT",
          BOUNCE_EFFECT: "BOUNCE_EFFECT",
          FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
          FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
          RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
          JELLO_EFFECT: "JELLO_EFFECT",
          GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
          SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
          PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
        }),
        (hv = {
          LEFT: "LEFT",
          RIGHT: "RIGHT",
          BOTTOM: "BOTTOM",
          TOP: "TOP",
          BOTTOM_LEFT: "BOTTOM_LEFT",
          BOTTOM_RIGHT: "BOTTOM_RIGHT",
          TOP_RIGHT: "TOP_RIGHT",
          TOP_LEFT: "TOP_LEFT",
          CLOCKWISE: "CLOCKWISE",
          COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
        });
    });
  var Re,
    Ev,
    Vn = pe(() => {
      "use strict";
      (Re = {
        TRANSFORM_MOVE: "TRANSFORM_MOVE",
        TRANSFORM_SCALE: "TRANSFORM_SCALE",
        TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
        TRANSFORM_SKEW: "TRANSFORM_SKEW",
        STYLE_OPACITY: "STYLE_OPACITY",
        STYLE_SIZE: "STYLE_SIZE",
        STYLE_FILTER: "STYLE_FILTER",
        STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
        STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
        STYLE_BORDER: "STYLE_BORDER",
        STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
        OBJECT_VALUE: "OBJECT_VALUE",
        PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
        PLUGIN_SPLINE: "PLUGIN_SPLINE",
        PLUGIN_RIVE: "PLUGIN_RIVE",
        PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
        GENERAL_DISPLAY: "GENERAL_DISPLAY",
        GENERAL_START_ACTION: "GENERAL_START_ACTION",
        GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
        GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
        GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
        GENERAL_LOOP: "GENERAL_LOOP",
        STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
      }),
        (Ev = {
          ELEMENT: "ELEMENT",
          ELEMENT_CLASS: "ELEMENT_CLASS",
          TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
        });
    });
  var yv,
    gs = pe(() => {
      "use strict";
      yv = {
        MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
        MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
        MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
        SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
        SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
        MOUSE_MOVE_IN_VIEWPORT_INTERACTION:
          "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
        PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
        PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
        PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
        NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
        DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
        ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
        TAB_INTERACTION: "TAB_INTERACTION",
        SLIDER_INTERACTION: "SLIDER_INTERACTION",
      };
    });
  var vv,
    mv,
    _v,
    Iv,
    Tv,
    bv,
    Av,
    mi,
    hs = pe(() => {
      "use strict";
      Vn();
      ({
        TRANSFORM_MOVE: vv,
        TRANSFORM_SCALE: mv,
        TRANSFORM_ROTATE: _v,
        TRANSFORM_SKEW: Iv,
        STYLE_SIZE: Tv,
        STYLE_FILTER: bv,
        STYLE_FONT_VARIATION: Av,
      } = Re),
        (mi = {
          [vv]: !0,
          [mv]: !0,
          [_v]: !0,
          [Iv]: !0,
          [Tv]: !0,
          [bv]: !0,
          [Av]: !0,
        });
    });
  var Ie = {};
  Ne(Ie, {
    IX2_ACTION_LIST_PLAYBACK_CHANGED: () => kv,
    IX2_ANIMATION_FRAME_CHANGED: () => Mv,
    IX2_CLEAR_REQUESTED: () => Lv,
    IX2_ELEMENT_STATE_CHANGED: () => Vv,
    IX2_EVENT_LISTENER_ADDED: () => Nv,
    IX2_EVENT_STATE_CHANGED: () => Dv,
    IX2_INSTANCE_ADDED: () => qv,
    IX2_INSTANCE_REMOVED: () => Xv,
    IX2_INSTANCE_STARTED: () => Gv,
    IX2_MEDIA_QUERIES_DEFINED: () => Uv,
    IX2_PARAMETER_CHANGED: () => Fv,
    IX2_PLAYBACK_REQUESTED: () => Cv,
    IX2_PREVIEW_REQUESTED: () => Rv,
    IX2_RAW_DATA_IMPORTED: () => wv,
    IX2_SESSION_INITIALIZED: () => Ov,
    IX2_SESSION_STARTED: () => Sv,
    IX2_SESSION_STOPPED: () => xv,
    IX2_STOP_REQUESTED: () => Pv,
    IX2_TEST_FRAME_RENDERED: () => Bv,
    IX2_VIEWPORT_WIDTH_CHANGED: () => Hv,
  });
  var wv,
    Ov,
    Sv,
    xv,
    Rv,
    Cv,
    Pv,
    Lv,
    Nv,
    Dv,
    Mv,
    Fv,
    qv,
    Gv,
    Xv,
    Vv,
    kv,
    Hv,
    Uv,
    Bv,
    Es = pe(() => {
      "use strict";
      (wv = "IX2_RAW_DATA_IMPORTED"),
        (Ov = "IX2_SESSION_INITIALIZED"),
        (Sv = "IX2_SESSION_STARTED"),
        (xv = "IX2_SESSION_STOPPED"),
        (Rv = "IX2_PREVIEW_REQUESTED"),
        (Cv = "IX2_PLAYBACK_REQUESTED"),
        (Pv = "IX2_STOP_REQUESTED"),
        (Lv = "IX2_CLEAR_REQUESTED"),
        (Nv = "IX2_EVENT_LISTENER_ADDED"),
        (Dv = "IX2_EVENT_STATE_CHANGED"),
        (Mv = "IX2_ANIMATION_FRAME_CHANGED"),
        (Fv = "IX2_PARAMETER_CHANGED"),
        (qv = "IX2_INSTANCE_ADDED"),
        (Gv = "IX2_INSTANCE_STARTED"),
        (Xv = "IX2_INSTANCE_REMOVED"),
        (Vv = "IX2_ELEMENT_STATE_CHANGED"),
        (kv = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
        (Hv = "IX2_VIEWPORT_WIDTH_CHANGED"),
        (Uv = "IX2_MEDIA_QUERIES_DEFINED"),
        (Bv = "IX2_TEST_FRAME_RENDERED");
    });
  var Oe = {};
  Ne(Oe, {
    ABSTRACT_NODE: () => Hm,
    AUTO: () => Pm,
    BACKGROUND: () => wm,
    BACKGROUND_COLOR: () => Am,
    BAR_DELIMITER: () => Dm,
    BORDER_COLOR: () => Om,
    BOUNDARY_SELECTOR: () => Yv,
    CHILDREN: () => Mm,
    COLON_DELIMITER: () => Nm,
    COLOR: () => Sm,
    COMMA_DELIMITER: () => Lm,
    CONFIG_UNIT: () => rm,
    CONFIG_VALUE: () => Jv,
    CONFIG_X_UNIT: () => em,
    CONFIG_X_VALUE: () => Qv,
    CONFIG_Y_UNIT: () => tm,
    CONFIG_Y_VALUE: () => $v,
    CONFIG_Z_UNIT: () => nm,
    CONFIG_Z_VALUE: () => Zv,
    DISPLAY: () => xm,
    FILTER: () => _m,
    FLEX: () => Rm,
    FONT_VARIATION_SETTINGS: () => Im,
    HEIGHT: () => bm,
    HTML_ELEMENT: () => Vm,
    IMMEDIATE_CHILDREN: () => Fm,
    IX2_ID_DELIMITER: () => Wv,
    OPACITY: () => mm,
    PARENT: () => Gm,
    PLAIN_OBJECT: () => km,
    PRESERVE_3D: () => Xm,
    RENDER_GENERAL: () => Bm,
    RENDER_PLUGIN: () => zm,
    RENDER_STYLE: () => Wm,
    RENDER_TRANSFORM: () => Um,
    ROTATE_X: () => pm,
    ROTATE_Y: () => gm,
    ROTATE_Z: () => hm,
    SCALE_3D: () => dm,
    SCALE_X: () => cm,
    SCALE_Y: () => lm,
    SCALE_Z: () => fm,
    SIBLINGS: () => qm,
    SKEW: () => Em,
    SKEW_X: () => ym,
    SKEW_Y: () => vm,
    TRANSFORM: () => im,
    TRANSLATE_3D: () => um,
    TRANSLATE_X: () => om,
    TRANSLATE_Y: () => am,
    TRANSLATE_Z: () => sm,
    WF_PAGE: () => zv,
    WIDTH: () => Tm,
    WILL_CHANGE: () => Cm,
    W_MOD_IX: () => jv,
    W_MOD_JS: () => Kv,
  });
  var Wv,
    zv,
    Kv,
    jv,
    Yv,
    Qv,
    $v,
    Zv,
    Jv,
    em,
    tm,
    nm,
    rm,
    im,
    om,
    am,
    sm,
    um,
    cm,
    lm,
    fm,
    dm,
    pm,
    gm,
    hm,
    Em,
    ym,
    vm,
    mm,
    _m,
    Im,
    Tm,
    bm,
    Am,
    wm,
    Om,
    Sm,
    xm,
    Rm,
    Cm,
    Pm,
    Lm,
    Nm,
    Dm,
    Mm,
    Fm,
    qm,
    Gm,
    Xm,
    Vm,
    km,
    Hm,
    Um,
    Bm,
    Wm,
    zm,
    ys = pe(() => {
      "use strict";
      (Wv = "|"),
        (zv = "data-wf-page"),
        (Kv = "w-mod-js"),
        (jv = "w-mod-ix"),
        (Yv = ".w-dyn-item"),
        (Qv = "xValue"),
        ($v = "yValue"),
        (Zv = "zValue"),
        (Jv = "value"),
        (em = "xUnit"),
        (tm = "yUnit"),
        (nm = "zUnit"),
        (rm = "unit"),
        (im = "transform"),
        (om = "translateX"),
        (am = "translateY"),
        (sm = "translateZ"),
        (um = "translate3d"),
        (cm = "scaleX"),
        (lm = "scaleY"),
        (fm = "scaleZ"),
        (dm = "scale3d"),
        (pm = "rotateX"),
        (gm = "rotateY"),
        (hm = "rotateZ"),
        (Em = "skew"),
        (ym = "skewX"),
        (vm = "skewY"),
        (mm = "opacity"),
        (_m = "filter"),
        (Im = "font-variation-settings"),
        (Tm = "width"),
        (bm = "height"),
        (Am = "backgroundColor"),
        (wm = "background"),
        (Om = "borderColor"),
        (Sm = "color"),
        (xm = "display"),
        (Rm = "flex"),
        (Cm = "willChange"),
        (Pm = "AUTO"),
        (Lm = ","),
        (Nm = ":"),
        (Dm = "|"),
        (Mm = "CHILDREN"),
        (Fm = "IMMEDIATE_CHILDREN"),
        (qm = "SIBLINGS"),
        (Gm = "PARENT"),
        (Xm = "preserve-3d"),
        (Vm = "HTML_ELEMENT"),
        (km = "PLAIN_OBJECT"),
        (Hm = "ABSTRACT_NODE"),
        (Um = "RENDER_TRANSFORM"),
        (Bm = "RENDER_GENERAL"),
        (Wm = "RENDER_STYLE"),
        (zm = "RENDER_PLUGIN");
    });
  var vs = {};
  Ne(vs, {
    ActionAppliesTo: () => Ev,
    ActionTypeConsts: () => Re,
    EventAppliesTo: () => yi,
    EventBasedOn: () => Ze,
    EventContinuousMouseAxes: () => pv,
    EventLimitAffectedElements: () => gv,
    EventTypeConsts: () => Be,
    IX2EngineActionTypes: () => Ie,
    IX2EngineConstants: () => Oe,
    InteractionTypeConsts: () => yv,
    QuickEffectDirectionConsts: () => hv,
    QuickEffectIds: () => Xn,
    ReducedMotionTypes: () => mi,
  });
  var De = pe(() => {
    "use strict";
    vi();
    Vn();
    gs();
    hs();
    Es();
    ys();
    Vn();
    vi();
  });
  var Km,
    ms,
    _s = pe(() => {
      "use strict";
      De();
      ({ IX2_RAW_DATA_IMPORTED: Km } = Ie),
        (ms = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case Km:
              return t.payload.ixData || Object.freeze({});
            default:
              return e;
          }
        });
    });
  var Ct = f((Ee) => {
    "use strict";
    Object.defineProperty(Ee, "__esModule", { value: !0 });
    var jm =
      typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              typeof Symbol == "function" &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          };
    Ee.clone = Hn;
    Ee.addLast = bs;
    Ee.addFirst = As;
    Ee.removeLast = ws;
    Ee.removeFirst = Os;
    Ee.insert = Ss;
    Ee.removeAt = xs;
    Ee.replaceAt = Rs;
    Ee.getIn = Un;
    Ee.set = Bn;
    Ee.setIn = Wn;
    Ee.update = Ps;
    Ee.updateIn = Ls;
    Ee.merge = Ns;
    Ee.mergeDeep = Ds;
    Ee.mergeIn = Ms;
    Ee.omit = Fs;
    Ee.addDefaults = qs;
    var Is = "INVALID_ARGS";
    function Ts(e) {
      throw new Error(e);
    }
    function _i(e) {
      var t = Object.keys(e);
      return Object.getOwnPropertySymbols
        ? t.concat(Object.getOwnPropertySymbols(e))
        : t;
    }
    var Ym = {}.hasOwnProperty;
    function Hn(e) {
      if (Array.isArray(e)) return e.slice();
      for (var t = _i(e), n = {}, r = 0; r < t.length; r++) {
        var i = t[r];
        n[i] = e[i];
      }
      return n;
    }
    function Me(e, t, n) {
      var r = n;
      r == null && Ts(Is);
      for (
        var i = !1, o = arguments.length, s = Array(o > 3 ? o - 3 : 0), a = 3;
        a < o;
        a++
      )
        s[a - 3] = arguments[a];
      for (var u = 0; u < s.length; u++) {
        var c = s[u];
        if (c != null) {
          var h = _i(c);
          if (h.length)
            for (var p = 0; p <= h.length; p++) {
              var d = h[p];
              if (!(e && r[d] !== void 0)) {
                var E = c[d];
                t && kn(r[d]) && kn(E) && (E = Me(e, t, r[d], E)),
                  !(E === void 0 || E === r[d]) &&
                    (i || ((i = !0), (r = Hn(r))), (r[d] = E));
              }
            }
        }
      }
      return r;
    }
    function kn(e) {
      var t = typeof e > "u" ? "undefined" : jm(e);
      return e != null && (t === "object" || t === "function");
    }
    function bs(e, t) {
      return Array.isArray(t) ? e.concat(t) : e.concat([t]);
    }
    function As(e, t) {
      return Array.isArray(t) ? t.concat(e) : [t].concat(e);
    }
    function ws(e) {
      return e.length ? e.slice(0, e.length - 1) : e;
    }
    function Os(e) {
      return e.length ? e.slice(1) : e;
    }
    function Ss(e, t, n) {
      return e
        .slice(0, t)
        .concat(Array.isArray(n) ? n : [n])
        .concat(e.slice(t));
    }
    function xs(e, t) {
      return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
    }
    function Rs(e, t, n) {
      if (e[t] === n) return e;
      for (var r = e.length, i = Array(r), o = 0; o < r; o++) i[o] = e[o];
      return (i[t] = n), i;
    }
    function Un(e, t) {
      if ((!Array.isArray(t) && Ts(Is), e != null)) {
        for (var n = e, r = 0; r < t.length; r++) {
          var i = t[r];
          if (((n = n?.[i]), n === void 0)) return n;
        }
        return n;
      }
    }
    function Bn(e, t, n) {
      var r = typeof t == "number" ? [] : {},
        i = e ?? r;
      if (i[t] === n) return i;
      var o = Hn(i);
      return (o[t] = n), o;
    }
    function Cs(e, t, n, r) {
      var i = void 0,
        o = t[r];
      if (r === t.length - 1) i = n;
      else {
        var s =
          kn(e) && kn(e[o]) ? e[o] : typeof t[r + 1] == "number" ? [] : {};
        i = Cs(s, t, n, r + 1);
      }
      return Bn(e, o, i);
    }
    function Wn(e, t, n) {
      return t.length ? Cs(e, t, n, 0) : n;
    }
    function Ps(e, t, n) {
      var r = e?.[t],
        i = n(r);
      return Bn(e, t, i);
    }
    function Ls(e, t, n) {
      var r = Un(e, t),
        i = n(r);
      return Wn(e, t, i);
    }
    function Ns(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Me.call.apply(Me, [null, !1, !1, e, t, n, r, i, o].concat(a))
        : Me(!1, !1, e, t, n, r, i, o);
    }
    function Ds(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Me.call.apply(Me, [null, !1, !0, e, t, n, r, i, o].concat(a))
        : Me(!1, !0, e, t, n, r, i, o);
    }
    function Ms(e, t, n, r, i, o, s) {
      var a = Un(e, t);
      a == null && (a = {});
      for (
        var u = void 0,
          c = arguments.length,
          h = Array(c > 7 ? c - 7 : 0),
          p = 7;
        p < c;
        p++
      )
        h[p - 7] = arguments[p];
      return (
        h.length
          ? (u = Me.call.apply(Me, [null, !1, !1, a, n, r, i, o, s].concat(h)))
          : (u = Me(!1, !1, a, n, r, i, o, s)),
        Wn(e, t, u)
      );
    }
    function Fs(e, t) {
      for (var n = Array.isArray(t) ? t : [t], r = !1, i = 0; i < n.length; i++)
        if (Ym.call(e, n[i])) {
          r = !0;
          break;
        }
      if (!r) return e;
      for (var o = {}, s = _i(e), a = 0; a < s.length; a++) {
        var u = s[a];
        n.indexOf(u) >= 0 || (o[u] = e[u]);
      }
      return o;
    }
    function qs(e, t, n, r, i, o) {
      for (
        var s = arguments.length, a = Array(s > 6 ? s - 6 : 0), u = 6;
        u < s;
        u++
      )
        a[u - 6] = arguments[u];
      return a.length
        ? Me.call.apply(Me, [null, !0, !1, e, t, n, r, i, o].concat(a))
        : Me(!0, !1, e, t, n, r, i, o);
    }
    var Qm = {
      clone: Hn,
      addLast: bs,
      addFirst: As,
      removeLast: ws,
      removeFirst: Os,
      insert: Ss,
      removeAt: xs,
      replaceAt: Rs,
      getIn: Un,
      set: Bn,
      setIn: Wn,
      update: Ps,
      updateIn: Ls,
      merge: Ns,
      mergeDeep: Ds,
      mergeIn: Ms,
      omit: Fs,
      addDefaults: qs,
    };
    Ee.default = Qm;
  });
  var Xs,
    $m,
    Zm,
    Jm,
    e_,
    t_,
    Gs,
    Vs,
    ks = pe(() => {
      "use strict";
      De();
      (Xs = ae(Ct())),
        ({
          IX2_PREVIEW_REQUESTED: $m,
          IX2_PLAYBACK_REQUESTED: Zm,
          IX2_STOP_REQUESTED: Jm,
          IX2_CLEAR_REQUESTED: e_,
        } = Ie),
        (t_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
        (Gs = Object.create(null, {
          [$m]: { value: "preview" },
          [Zm]: { value: "playback" },
          [Jm]: { value: "stop" },
          [e_]: { value: "clear" },
        })),
        (Vs = (e = t_, t) => {
          if (t.type in Gs) {
            let n = [Gs[t.type]];
            return (0, Xs.setIn)(e, [n], { ...t.payload });
          }
          return e;
        });
    });
  var Ce,
    n_,
    r_,
    i_,
    o_,
    a_,
    s_,
    u_,
    c_,
    l_,
    f_,
    Hs,
    d_,
    Us,
    Bs = pe(() => {
      "use strict";
      De();
      (Ce = ae(Ct())),
        ({
          IX2_SESSION_INITIALIZED: n_,
          IX2_SESSION_STARTED: r_,
          IX2_TEST_FRAME_RENDERED: i_,
          IX2_SESSION_STOPPED: o_,
          IX2_EVENT_LISTENER_ADDED: a_,
          IX2_EVENT_STATE_CHANGED: s_,
          IX2_ANIMATION_FRAME_CHANGED: u_,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: c_,
          IX2_VIEWPORT_WIDTH_CHANGED: l_,
          IX2_MEDIA_QUERIES_DEFINED: f_,
        } = Ie),
        (Hs = {
          active: !1,
          tick: 0,
          eventListeners: [],
          eventState: {},
          playbackState: {},
          viewportWidth: 0,
          mediaQueryKey: null,
          hasBoundaryNodes: !1,
          hasDefinedMediaQueries: !1,
          reducedMotion: !1,
        }),
        (d_ = 20),
        (Us = (e = Hs, t) => {
          switch (t.type) {
            case n_: {
              let { hasBoundaryNodes: n, reducedMotion: r } = t.payload;
              return (0, Ce.merge)(e, {
                hasBoundaryNodes: n,
                reducedMotion: r,
              });
            }
            case r_:
              return (0, Ce.set)(e, "active", !0);
            case i_: {
              let {
                payload: { step: n = d_ },
              } = t;
              return (0, Ce.set)(e, "tick", e.tick + n);
            }
            case o_:
              return Hs;
            case u_: {
              let {
                payload: { now: n },
              } = t;
              return (0, Ce.set)(e, "tick", n);
            }
            case a_: {
              let n = (0, Ce.addLast)(e.eventListeners, t.payload);
              return (0, Ce.set)(e, "eventListeners", n);
            }
            case s_: {
              let { stateKey: n, newState: r } = t.payload;
              return (0, Ce.setIn)(e, ["eventState", n], r);
            }
            case c_: {
              let { actionListId: n, isPlaying: r } = t.payload;
              return (0, Ce.setIn)(e, ["playbackState", n], r);
            }
            case l_: {
              let { width: n, mediaQueries: r } = t.payload,
                i = r.length,
                o = null;
              for (let s = 0; s < i; s++) {
                let { key: a, min: u, max: c } = r[s];
                if (n >= u && n <= c) {
                  o = a;
                  break;
                }
              }
              return (0, Ce.merge)(e, { viewportWidth: n, mediaQueryKey: o });
            }
            case f_:
              return (0, Ce.set)(e, "hasDefinedMediaQueries", !0);
            default:
              return e;
          }
        });
    });
  var zs = f((b2, Ws) => {
    function p_() {
      (this.__data__ = []), (this.size = 0);
    }
    Ws.exports = p_;
  });
  var zn = f((A2, Ks) => {
    function g_(e, t) {
      return e === t || (e !== e && t !== t);
    }
    Ks.exports = g_;
  });
  var on = f((w2, js) => {
    var h_ = zn();
    function E_(e, t) {
      for (var n = e.length; n--; ) if (h_(e[n][0], t)) return n;
      return -1;
    }
    js.exports = E_;
  });
  var Qs = f((O2, Ys) => {
    var y_ = on(),
      v_ = Array.prototype,
      m_ = v_.splice;
    function __(e) {
      var t = this.__data__,
        n = y_(t, e);
      if (n < 0) return !1;
      var r = t.length - 1;
      return n == r ? t.pop() : m_.call(t, n, 1), --this.size, !0;
    }
    Ys.exports = __;
  });
  var Zs = f((S2, $s) => {
    var I_ = on();
    function T_(e) {
      var t = this.__data__,
        n = I_(t, e);
      return n < 0 ? void 0 : t[n][1];
    }
    $s.exports = T_;
  });
  var eu = f((x2, Js) => {
    var b_ = on();
    function A_(e) {
      return b_(this.__data__, e) > -1;
    }
    Js.exports = A_;
  });
  var nu = f((R2, tu) => {
    var w_ = on();
    function O_(e, t) {
      var n = this.__data__,
        r = w_(n, e);
      return r < 0 ? (++this.size, n.push([e, t])) : (n[r][1] = t), this;
    }
    tu.exports = O_;
  });
  var an = f((C2, ru) => {
    var S_ = zs(),
      x_ = Qs(),
      R_ = Zs(),
      C_ = eu(),
      P_ = nu();
    function Pt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Pt.prototype.clear = S_;
    Pt.prototype.delete = x_;
    Pt.prototype.get = R_;
    Pt.prototype.has = C_;
    Pt.prototype.set = P_;
    ru.exports = Pt;
  });
  var ou = f((P2, iu) => {
    var L_ = an();
    function N_() {
      (this.__data__ = new L_()), (this.size = 0);
    }
    iu.exports = N_;
  });
  var su = f((L2, au) => {
    function D_(e) {
      var t = this.__data__,
        n = t.delete(e);
      return (this.size = t.size), n;
    }
    au.exports = D_;
  });
  var cu = f((N2, uu) => {
    function M_(e) {
      return this.__data__.get(e);
    }
    uu.exports = M_;
  });
  var fu = f((D2, lu) => {
    function F_(e) {
      return this.__data__.has(e);
    }
    lu.exports = F_;
  });
  var Je = f((M2, du) => {
    function q_(e) {
      var t = typeof e;
      return e != null && (t == "object" || t == "function");
    }
    du.exports = q_;
  });
  var Ii = f((F2, pu) => {
    var G_ = ct(),
      X_ = Je(),
      V_ = "[object AsyncFunction]",
      k_ = "[object Function]",
      H_ = "[object GeneratorFunction]",
      U_ = "[object Proxy]";
    function B_(e) {
      if (!X_(e)) return !1;
      var t = G_(e);
      return t == k_ || t == H_ || t == V_ || t == U_;
    }
    pu.exports = B_;
  });
  var hu = f((q2, gu) => {
    var W_ = Ue(),
      z_ = W_["__core-js_shared__"];
    gu.exports = z_;
  });
  var vu = f((G2, yu) => {
    var Ti = hu(),
      Eu = (function () {
        var e = /[^.]+$/.exec((Ti && Ti.keys && Ti.keys.IE_PROTO) || "");
        return e ? "Symbol(src)_1." + e : "";
      })();
    function K_(e) {
      return !!Eu && Eu in e;
    }
    yu.exports = K_;
  });
  var bi = f((X2, mu) => {
    var j_ = Function.prototype,
      Y_ = j_.toString;
    function Q_(e) {
      if (e != null) {
        try {
          return Y_.call(e);
        } catch {}
        try {
          return e + "";
        } catch {}
      }
      return "";
    }
    mu.exports = Q_;
  });
  var Iu = f((V2, _u) => {
    var $_ = Ii(),
      Z_ = vu(),
      J_ = Je(),
      eI = bi(),
      tI = /[\\^$.*+?()[\]{}|]/g,
      nI = /^\[object .+?Constructor\]$/,
      rI = Function.prototype,
      iI = Object.prototype,
      oI = rI.toString,
      aI = iI.hasOwnProperty,
      sI = RegExp(
        "^" +
          oI
            .call(aI)
            .replace(tI, "\\$&")
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              "$1.*?"
            ) +
          "$"
      );
    function uI(e) {
      if (!J_(e) || Z_(e)) return !1;
      var t = $_(e) ? sI : nI;
      return t.test(eI(e));
    }
    _u.exports = uI;
  });
  var bu = f((k2, Tu) => {
    function cI(e, t) {
      return e?.[t];
    }
    Tu.exports = cI;
  });
  var lt = f((H2, Au) => {
    var lI = Iu(),
      fI = bu();
    function dI(e, t) {
      var n = fI(e, t);
      return lI(n) ? n : void 0;
    }
    Au.exports = dI;
  });
  var Kn = f((U2, wu) => {
    var pI = lt(),
      gI = Ue(),
      hI = pI(gI, "Map");
    wu.exports = hI;
  });
  var sn = f((B2, Ou) => {
    var EI = lt(),
      yI = EI(Object, "create");
    Ou.exports = yI;
  });
  var Ru = f((W2, xu) => {
    var Su = sn();
    function vI() {
      (this.__data__ = Su ? Su(null) : {}), (this.size = 0);
    }
    xu.exports = vI;
  });
  var Pu = f((z2, Cu) => {
    function mI(e) {
      var t = this.has(e) && delete this.__data__[e];
      return (this.size -= t ? 1 : 0), t;
    }
    Cu.exports = mI;
  });
  var Nu = f((K2, Lu) => {
    var _I = sn(),
      II = "__lodash_hash_undefined__",
      TI = Object.prototype,
      bI = TI.hasOwnProperty;
    function AI(e) {
      var t = this.__data__;
      if (_I) {
        var n = t[e];
        return n === II ? void 0 : n;
      }
      return bI.call(t, e) ? t[e] : void 0;
    }
    Lu.exports = AI;
  });
  var Mu = f((j2, Du) => {
    var wI = sn(),
      OI = Object.prototype,
      SI = OI.hasOwnProperty;
    function xI(e) {
      var t = this.__data__;
      return wI ? t[e] !== void 0 : SI.call(t, e);
    }
    Du.exports = xI;
  });
  var qu = f((Y2, Fu) => {
    var RI = sn(),
      CI = "__lodash_hash_undefined__";
    function PI(e, t) {
      var n = this.__data__;
      return (
        (this.size += this.has(e) ? 0 : 1),
        (n[e] = RI && t === void 0 ? CI : t),
        this
      );
    }
    Fu.exports = PI;
  });
  var Xu = f((Q2, Gu) => {
    var LI = Ru(),
      NI = Pu(),
      DI = Nu(),
      MI = Mu(),
      FI = qu();
    function Lt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Lt.prototype.clear = LI;
    Lt.prototype.delete = NI;
    Lt.prototype.get = DI;
    Lt.prototype.has = MI;
    Lt.prototype.set = FI;
    Gu.exports = Lt;
  });
  var Hu = f(($2, ku) => {
    var Vu = Xu(),
      qI = an(),
      GI = Kn();
    function XI() {
      (this.size = 0),
        (this.__data__ = {
          hash: new Vu(),
          map: new (GI || qI)(),
          string: new Vu(),
        });
    }
    ku.exports = XI;
  });
  var Bu = f((Z2, Uu) => {
    function VI(e) {
      var t = typeof e;
      return t == "string" || t == "number" || t == "symbol" || t == "boolean"
        ? e !== "__proto__"
        : e === null;
    }
    Uu.exports = VI;
  });
  var un = f((J2, Wu) => {
    var kI = Bu();
    function HI(e, t) {
      var n = e.__data__;
      return kI(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
    }
    Wu.exports = HI;
  });
  var Ku = f((e1, zu) => {
    var UI = un();
    function BI(e) {
      var t = UI(this, e).delete(e);
      return (this.size -= t ? 1 : 0), t;
    }
    zu.exports = BI;
  });
  var Yu = f((t1, ju) => {
    var WI = un();
    function zI(e) {
      return WI(this, e).get(e);
    }
    ju.exports = zI;
  });
  var $u = f((n1, Qu) => {
    var KI = un();
    function jI(e) {
      return KI(this, e).has(e);
    }
    Qu.exports = jI;
  });
  var Ju = f((r1, Zu) => {
    var YI = un();
    function QI(e, t) {
      var n = YI(this, e),
        r = n.size;
      return n.set(e, t), (this.size += n.size == r ? 0 : 1), this;
    }
    Zu.exports = QI;
  });
  var jn = f((i1, ec) => {
    var $I = Hu(),
      ZI = Ku(),
      JI = Yu(),
      eT = $u(),
      tT = Ju();
    function Nt(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.clear(); ++t < n; ) {
        var r = e[t];
        this.set(r[0], r[1]);
      }
    }
    Nt.prototype.clear = $I;
    Nt.prototype.delete = ZI;
    Nt.prototype.get = JI;
    Nt.prototype.has = eT;
    Nt.prototype.set = tT;
    ec.exports = Nt;
  });
  var nc = f((o1, tc) => {
    var nT = an(),
      rT = Kn(),
      iT = jn(),
      oT = 200;
    function aT(e, t) {
      var n = this.__data__;
      if (n instanceof nT) {
        var r = n.__data__;
        if (!rT || r.length < oT - 1)
          return r.push([e, t]), (this.size = ++n.size), this;
        n = this.__data__ = new iT(r);
      }
      return n.set(e, t), (this.size = n.size), this;
    }
    tc.exports = aT;
  });
  var Ai = f((a1, rc) => {
    var sT = an(),
      uT = ou(),
      cT = su(),
      lT = cu(),
      fT = fu(),
      dT = nc();
    function Dt(e) {
      var t = (this.__data__ = new sT(e));
      this.size = t.size;
    }
    Dt.prototype.clear = uT;
    Dt.prototype.delete = cT;
    Dt.prototype.get = lT;
    Dt.prototype.has = fT;
    Dt.prototype.set = dT;
    rc.exports = Dt;
  });
  var oc = f((s1, ic) => {
    var pT = "__lodash_hash_undefined__";
    function gT(e) {
      return this.__data__.set(e, pT), this;
    }
    ic.exports = gT;
  });
  var sc = f((u1, ac) => {
    function hT(e) {
      return this.__data__.has(e);
    }
    ac.exports = hT;
  });
  var cc = f((c1, uc) => {
    var ET = jn(),
      yT = oc(),
      vT = sc();
    function Yn(e) {
      var t = -1,
        n = e == null ? 0 : e.length;
      for (this.__data__ = new ET(); ++t < n; ) this.add(e[t]);
    }
    Yn.prototype.add = Yn.prototype.push = yT;
    Yn.prototype.has = vT;
    uc.exports = Yn;
  });
  var fc = f((l1, lc) => {
    function mT(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
        if (t(e[n], n, e)) return !0;
      return !1;
    }
    lc.exports = mT;
  });
  var pc = f((f1, dc) => {
    function _T(e, t) {
      return e.has(t);
    }
    dc.exports = _T;
  });
  var wi = f((d1, gc) => {
    var IT = cc(),
      TT = fc(),
      bT = pc(),
      AT = 1,
      wT = 2;
    function OT(e, t, n, r, i, o) {
      var s = n & AT,
        a = e.length,
        u = t.length;
      if (a != u && !(s && u > a)) return !1;
      var c = o.get(e),
        h = o.get(t);
      if (c && h) return c == t && h == e;
      var p = -1,
        d = !0,
        E = n & wT ? new IT() : void 0;
      for (o.set(e, t), o.set(t, e); ++p < a; ) {
        var I = e[p],
          _ = t[p];
        if (r) var w = s ? r(_, I, p, t, e, o) : r(I, _, p, e, t, o);
        if (w !== void 0) {
          if (w) continue;
          d = !1;
          break;
        }
        if (E) {
          if (
            !TT(t, function (v, x) {
              if (!bT(E, x) && (I === v || i(I, v, n, r, o))) return E.push(x);
            })
          ) {
            d = !1;
            break;
          }
        } else if (!(I === _ || i(I, _, n, r, o))) {
          d = !1;
          break;
        }
      }
      return o.delete(e), o.delete(t), d;
    }
    gc.exports = OT;
  });
  var Ec = f((p1, hc) => {
    var ST = Ue(),
      xT = ST.Uint8Array;
    hc.exports = xT;
  });
  var vc = f((g1, yc) => {
    function RT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r, i) {
          n[++t] = [i, r];
        }),
        n
      );
    }
    yc.exports = RT;
  });
  var _c = f((h1, mc) => {
    function CT(e) {
      var t = -1,
        n = Array(e.size);
      return (
        e.forEach(function (r) {
          n[++t] = r;
        }),
        n
      );
    }
    mc.exports = CT;
  });
  var wc = f((E1, Ac) => {
    var Ic = St(),
      Tc = Ec(),
      PT = zn(),
      LT = wi(),
      NT = vc(),
      DT = _c(),
      MT = 1,
      FT = 2,
      qT = "[object Boolean]",
      GT = "[object Date]",
      XT = "[object Error]",
      VT = "[object Map]",
      kT = "[object Number]",
      HT = "[object RegExp]",
      UT = "[object Set]",
      BT = "[object String]",
      WT = "[object Symbol]",
      zT = "[object ArrayBuffer]",
      KT = "[object DataView]",
      bc = Ic ? Ic.prototype : void 0,
      Oi = bc ? bc.valueOf : void 0;
    function jT(e, t, n, r, i, o, s) {
      switch (n) {
        case KT:
          if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
            return !1;
          (e = e.buffer), (t = t.buffer);
        case zT:
          return !(e.byteLength != t.byteLength || !o(new Tc(e), new Tc(t)));
        case qT:
        case GT:
        case kT:
          return PT(+e, +t);
        case XT:
          return e.name == t.name && e.message == t.message;
        case HT:
        case BT:
          return e == t + "";
        case VT:
          var a = NT;
        case UT:
          var u = r & MT;
          if ((a || (a = DT), e.size != t.size && !u)) return !1;
          var c = s.get(e);
          if (c) return c == t;
          (r |= FT), s.set(e, t);
          var h = LT(a(e), a(t), r, i, o, s);
          return s.delete(e), h;
        case WT:
          if (Oi) return Oi.call(e) == Oi.call(t);
      }
      return !1;
    }
    Ac.exports = jT;
  });
  var Qn = f((y1, Oc) => {
    function YT(e, t) {
      for (var n = -1, r = t.length, i = e.length; ++n < r; ) e[i + n] = t[n];
      return e;
    }
    Oc.exports = YT;
  });
  var be = f((v1, Sc) => {
    var QT = Array.isArray;
    Sc.exports = QT;
  });
  var Si = f((m1, xc) => {
    var $T = Qn(),
      ZT = be();
    function JT(e, t, n) {
      var r = t(e);
      return ZT(e) ? r : $T(r, n(e));
    }
    xc.exports = JT;
  });
  var Cc = f((_1, Rc) => {
    function eb(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = 0, o = []; ++n < r; ) {
        var s = e[n];
        t(s, n, e) && (o[i++] = s);
      }
      return o;
    }
    Rc.exports = eb;
  });
  var xi = f((I1, Pc) => {
    function tb() {
      return [];
    }
    Pc.exports = tb;
  });
  var Ri = f((T1, Nc) => {
    var nb = Cc(),
      rb = xi(),
      ib = Object.prototype,
      ob = ib.propertyIsEnumerable,
      Lc = Object.getOwnPropertySymbols,
      ab = Lc
        ? function (e) {
            return e == null
              ? []
              : ((e = Object(e)),
                nb(Lc(e), function (t) {
                  return ob.call(e, t);
                }));
          }
        : rb;
    Nc.exports = ab;
  });
  var Mc = f((b1, Dc) => {
    function sb(e, t) {
      for (var n = -1, r = Array(e); ++n < e; ) r[n] = t(n);
      return r;
    }
    Dc.exports = sb;
  });
  var qc = f((A1, Fc) => {
    var ub = ct(),
      cb = rt(),
      lb = "[object Arguments]";
    function fb(e) {
      return cb(e) && ub(e) == lb;
    }
    Fc.exports = fb;
  });
  var cn = f((w1, Vc) => {
    var Gc = qc(),
      db = rt(),
      Xc = Object.prototype,
      pb = Xc.hasOwnProperty,
      gb = Xc.propertyIsEnumerable,
      hb = Gc(
        (function () {
          return arguments;
        })()
      )
        ? Gc
        : function (e) {
            return db(e) && pb.call(e, "callee") && !gb.call(e, "callee");
          };
    Vc.exports = hb;
  });
  var Hc = f((O1, kc) => {
    function Eb() {
      return !1;
    }
    kc.exports = Eb;
  });
  var $n = f((ln, Mt) => {
    var yb = Ue(),
      vb = Hc(),
      Wc = typeof ln == "object" && ln && !ln.nodeType && ln,
      Uc = Wc && typeof Mt == "object" && Mt && !Mt.nodeType && Mt,
      mb = Uc && Uc.exports === Wc,
      Bc = mb ? yb.Buffer : void 0,
      _b = Bc ? Bc.isBuffer : void 0,
      Ib = _b || vb;
    Mt.exports = Ib;
  });
  var Zn = f((S1, zc) => {
    var Tb = 9007199254740991,
      bb = /^(?:0|[1-9]\d*)$/;
    function Ab(e, t) {
      var n = typeof e;
      return (
        (t = t ?? Tb),
        !!t &&
          (n == "number" || (n != "symbol" && bb.test(e))) &&
          e > -1 &&
          e % 1 == 0 &&
          e < t
      );
    }
    zc.exports = Ab;
  });
  var Jn = f((x1, Kc) => {
    var wb = 9007199254740991;
    function Ob(e) {
      return typeof e == "number" && e > -1 && e % 1 == 0 && e <= wb;
    }
    Kc.exports = Ob;
  });
  var Yc = f((R1, jc) => {
    var Sb = ct(),
      xb = Jn(),
      Rb = rt(),
      Cb = "[object Arguments]",
      Pb = "[object Array]",
      Lb = "[object Boolean]",
      Nb = "[object Date]",
      Db = "[object Error]",
      Mb = "[object Function]",
      Fb = "[object Map]",
      qb = "[object Number]",
      Gb = "[object Object]",
      Xb = "[object RegExp]",
      Vb = "[object Set]",
      kb = "[object String]",
      Hb = "[object WeakMap]",
      Ub = "[object ArrayBuffer]",
      Bb = "[object DataView]",
      Wb = "[object Float32Array]",
      zb = "[object Float64Array]",
      Kb = "[object Int8Array]",
      jb = "[object Int16Array]",
      Yb = "[object Int32Array]",
      Qb = "[object Uint8Array]",
      $b = "[object Uint8ClampedArray]",
      Zb = "[object Uint16Array]",
      Jb = "[object Uint32Array]",
      le = {};
    le[Wb] =
      le[zb] =
      le[Kb] =
      le[jb] =
      le[Yb] =
      le[Qb] =
      le[$b] =
      le[Zb] =
      le[Jb] =
        !0;
    le[Cb] =
      le[Pb] =
      le[Ub] =
      le[Lb] =
      le[Bb] =
      le[Nb] =
      le[Db] =
      le[Mb] =
      le[Fb] =
      le[qb] =
      le[Gb] =
      le[Xb] =
      le[Vb] =
      le[kb] =
      le[Hb] =
        !1;
    function eA(e) {
      return Rb(e) && xb(e.length) && !!le[Sb(e)];
    }
    jc.exports = eA;
  });
  var $c = f((C1, Qc) => {
    function tA(e) {
      return function (t) {
        return e(t);
      };
    }
    Qc.exports = tA;
  });
  var Jc = f((fn, Ft) => {
    var nA = ti(),
      Zc = typeof fn == "object" && fn && !fn.nodeType && fn,
      dn = Zc && typeof Ft == "object" && Ft && !Ft.nodeType && Ft,
      rA = dn && dn.exports === Zc,
      Ci = rA && nA.process,
      iA = (function () {
        try {
          var e = dn && dn.require && dn.require("util").types;
          return e || (Ci && Ci.binding && Ci.binding("util"));
        } catch {}
      })();
    Ft.exports = iA;
  });
  var er = f((P1, nl) => {
    var oA = Yc(),
      aA = $c(),
      el = Jc(),
      tl = el && el.isTypedArray,
      sA = tl ? aA(tl) : oA;
    nl.exports = sA;
  });
  var Pi = f((L1, rl) => {
    var uA = Mc(),
      cA = cn(),
      lA = be(),
      fA = $n(),
      dA = Zn(),
      pA = er(),
      gA = Object.prototype,
      hA = gA.hasOwnProperty;
    function EA(e, t) {
      var n = lA(e),
        r = !n && cA(e),
        i = !n && !r && fA(e),
        o = !n && !r && !i && pA(e),
        s = n || r || i || o,
        a = s ? uA(e.length, String) : [],
        u = a.length;
      for (var c in e)
        (t || hA.call(e, c)) &&
          !(
            s &&
            (c == "length" ||
              (i && (c == "offset" || c == "parent")) ||
              (o &&
                (c == "buffer" || c == "byteLength" || c == "byteOffset")) ||
              dA(c, u))
          ) &&
          a.push(c);
      return a;
    }
    rl.exports = EA;
  });
  var tr = f((N1, il) => {
    var yA = Object.prototype;
    function vA(e) {
      var t = e && e.constructor,
        n = (typeof t == "function" && t.prototype) || yA;
      return e === n;
    }
    il.exports = vA;
  });
  var al = f((D1, ol) => {
    var mA = ni(),
      _A = mA(Object.keys, Object);
    ol.exports = _A;
  });
  var nr = f((M1, sl) => {
    var IA = tr(),
      TA = al(),
      bA = Object.prototype,
      AA = bA.hasOwnProperty;
    function wA(e) {
      if (!IA(e)) return TA(e);
      var t = [];
      for (var n in Object(e)) AA.call(e, n) && n != "constructor" && t.push(n);
      return t;
    }
    sl.exports = wA;
  });
  var yt = f((F1, ul) => {
    var OA = Ii(),
      SA = Jn();
    function xA(e) {
      return e != null && SA(e.length) && !OA(e);
    }
    ul.exports = xA;
  });
  var pn = f((q1, cl) => {
    var RA = Pi(),
      CA = nr(),
      PA = yt();
    function LA(e) {
      return PA(e) ? RA(e) : CA(e);
    }
    cl.exports = LA;
  });
  var fl = f((G1, ll) => {
    var NA = Si(),
      DA = Ri(),
      MA = pn();
    function FA(e) {
      return NA(e, MA, DA);
    }
    ll.exports = FA;
  });
  var gl = f((X1, pl) => {
    var dl = fl(),
      qA = 1,
      GA = Object.prototype,
      XA = GA.hasOwnProperty;
    function VA(e, t, n, r, i, o) {
      var s = n & qA,
        a = dl(e),
        u = a.length,
        c = dl(t),
        h = c.length;
      if (u != h && !s) return !1;
      for (var p = u; p--; ) {
        var d = a[p];
        if (!(s ? d in t : XA.call(t, d))) return !1;
      }
      var E = o.get(e),
        I = o.get(t);
      if (E && I) return E == t && I == e;
      var _ = !0;
      o.set(e, t), o.set(t, e);
      for (var w = s; ++p < u; ) {
        d = a[p];
        var v = e[d],
          x = t[d];
        if (r) var A = s ? r(x, v, d, t, e, o) : r(v, x, d, e, t, o);
        if (!(A === void 0 ? v === x || i(v, x, n, r, o) : A)) {
          _ = !1;
          break;
        }
        w || (w = d == "constructor");
      }
      if (_ && !w) {
        var S = e.constructor,
          P = t.constructor;
        S != P &&
          "constructor" in e &&
          "constructor" in t &&
          !(
            typeof S == "function" &&
            S instanceof S &&
            typeof P == "function" &&
            P instanceof P
          ) &&
          (_ = !1);
      }
      return o.delete(e), o.delete(t), _;
    }
    pl.exports = VA;
  });
  var El = f((V1, hl) => {
    var kA = lt(),
      HA = Ue(),
      UA = kA(HA, "DataView");
    hl.exports = UA;
  });
  var vl = f((k1, yl) => {
    var BA = lt(),
      WA = Ue(),
      zA = BA(WA, "Promise");
    yl.exports = zA;
  });
  var _l = f((H1, ml) => {
    var KA = lt(),
      jA = Ue(),
      YA = KA(jA, "Set");
    ml.exports = YA;
  });
  var Li = f((U1, Il) => {
    var QA = lt(),
      $A = Ue(),
      ZA = QA($A, "WeakMap");
    Il.exports = ZA;
  });
  var rr = f((B1, xl) => {
    var Ni = El(),
      Di = Kn(),
      Mi = vl(),
      Fi = _l(),
      qi = Li(),
      Sl = ct(),
      qt = bi(),
      Tl = "[object Map]",
      JA = "[object Object]",
      bl = "[object Promise]",
      Al = "[object Set]",
      wl = "[object WeakMap]",
      Ol = "[object DataView]",
      e0 = qt(Ni),
      t0 = qt(Di),
      n0 = qt(Mi),
      r0 = qt(Fi),
      i0 = qt(qi),
      vt = Sl;
    ((Ni && vt(new Ni(new ArrayBuffer(1))) != Ol) ||
      (Di && vt(new Di()) != Tl) ||
      (Mi && vt(Mi.resolve()) != bl) ||
      (Fi && vt(new Fi()) != Al) ||
      (qi && vt(new qi()) != wl)) &&
      (vt = function (e) {
        var t = Sl(e),
          n = t == JA ? e.constructor : void 0,
          r = n ? qt(n) : "";
        if (r)
          switch (r) {
            case e0:
              return Ol;
            case t0:
              return Tl;
            case n0:
              return bl;
            case r0:
              return Al;
            case i0:
              return wl;
          }
        return t;
      });
    xl.exports = vt;
  });
  var Fl = f((W1, Ml) => {
    var Gi = Ai(),
      o0 = wi(),
      a0 = wc(),
      s0 = gl(),
      Rl = rr(),
      Cl = be(),
      Pl = $n(),
      u0 = er(),
      c0 = 1,
      Ll = "[object Arguments]",
      Nl = "[object Array]",
      ir = "[object Object]",
      l0 = Object.prototype,
      Dl = l0.hasOwnProperty;
    function f0(e, t, n, r, i, o) {
      var s = Cl(e),
        a = Cl(t),
        u = s ? Nl : Rl(e),
        c = a ? Nl : Rl(t);
      (u = u == Ll ? ir : u), (c = c == Ll ? ir : c);
      var h = u == ir,
        p = c == ir,
        d = u == c;
      if (d && Pl(e)) {
        if (!Pl(t)) return !1;
        (s = !0), (h = !1);
      }
      if (d && !h)
        return (
          o || (o = new Gi()),
          s || u0(e) ? o0(e, t, n, r, i, o) : a0(e, t, u, n, r, i, o)
        );
      if (!(n & c0)) {
        var E = h && Dl.call(e, "__wrapped__"),
          I = p && Dl.call(t, "__wrapped__");
        if (E || I) {
          var _ = E ? e.value() : e,
            w = I ? t.value() : t;
          return o || (o = new Gi()), i(_, w, n, r, o);
        }
      }
      return d ? (o || (o = new Gi()), s0(e, t, n, r, i, o)) : !1;
    }
    Ml.exports = f0;
  });
  var Xi = f((z1, Xl) => {
    var d0 = Fl(),
      ql = rt();
    function Gl(e, t, n, r, i) {
      return e === t
        ? !0
        : e == null || t == null || (!ql(e) && !ql(t))
        ? e !== e && t !== t
        : d0(e, t, n, r, Gl, i);
    }
    Xl.exports = Gl;
  });
  var kl = f((K1, Vl) => {
    var p0 = Ai(),
      g0 = Xi(),
      h0 = 1,
      E0 = 2;
    function y0(e, t, n, r) {
      var i = n.length,
        o = i,
        s = !r;
      if (e == null) return !o;
      for (e = Object(e); i--; ) {
        var a = n[i];
        if (s && a[2] ? a[1] !== e[a[0]] : !(a[0] in e)) return !1;
      }
      for (; ++i < o; ) {
        a = n[i];
        var u = a[0],
          c = e[u],
          h = a[1];
        if (s && a[2]) {
          if (c === void 0 && !(u in e)) return !1;
        } else {
          var p = new p0();
          if (r) var d = r(c, h, u, e, t, p);
          if (!(d === void 0 ? g0(h, c, h0 | E0, r, p) : d)) return !1;
        }
      }
      return !0;
    }
    Vl.exports = y0;
  });
  var Vi = f((j1, Hl) => {
    var v0 = Je();
    function m0(e) {
      return e === e && !v0(e);
    }
    Hl.exports = m0;
  });
  var Bl = f((Y1, Ul) => {
    var _0 = Vi(),
      I0 = pn();
    function T0(e) {
      for (var t = I0(e), n = t.length; n--; ) {
        var r = t[n],
          i = e[r];
        t[n] = [r, i, _0(i)];
      }
      return t;
    }
    Ul.exports = T0;
  });
  var ki = f((Q1, Wl) => {
    function b0(e, t) {
      return function (n) {
        return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
      };
    }
    Wl.exports = b0;
  });
  var Kl = f(($1, zl) => {
    var A0 = kl(),
      w0 = Bl(),
      O0 = ki();
    function S0(e) {
      var t = w0(e);
      return t.length == 1 && t[0][2]
        ? O0(t[0][0], t[0][1])
        : function (n) {
            return n === e || A0(n, e, t);
          };
    }
    zl.exports = S0;
  });
  var gn = f((Z1, jl) => {
    var x0 = ct(),
      R0 = rt(),
      C0 = "[object Symbol]";
    function P0(e) {
      return typeof e == "symbol" || (R0(e) && x0(e) == C0);
    }
    jl.exports = P0;
  });
  var or = f((J1, Yl) => {
    var L0 = be(),
      N0 = gn(),
      D0 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      M0 = /^\w*$/;
    function F0(e, t) {
      if (L0(e)) return !1;
      var n = typeof e;
      return n == "number" ||
        n == "symbol" ||
        n == "boolean" ||
        e == null ||
        N0(e)
        ? !0
        : M0.test(e) || !D0.test(e) || (t != null && e in Object(t));
    }
    Yl.exports = F0;
  });
  var Zl = f((eq, $l) => {
    var Ql = jn(),
      q0 = "Expected a function";
    function Hi(e, t) {
      if (typeof e != "function" || (t != null && typeof t != "function"))
        throw new TypeError(q0);
      var n = function () {
        var r = arguments,
          i = t ? t.apply(this, r) : r[0],
          o = n.cache;
        if (o.has(i)) return o.get(i);
        var s = e.apply(this, r);
        return (n.cache = o.set(i, s) || o), s;
      };
      return (n.cache = new (Hi.Cache || Ql)()), n;
    }
    Hi.Cache = Ql;
    $l.exports = Hi;
  });
  var ef = f((tq, Jl) => {
    var G0 = Zl(),
      X0 = 500;
    function V0(e) {
      var t = G0(e, function (r) {
          return n.size === X0 && n.clear(), r;
        }),
        n = t.cache;
      return t;
    }
    Jl.exports = V0;
  });
  var nf = f((nq, tf) => {
    var k0 = ef(),
      H0 =
        /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
      U0 = /\\(\\)?/g,
      B0 = k0(function (e) {
        var t = [];
        return (
          e.charCodeAt(0) === 46 && t.push(""),
          e.replace(H0, function (n, r, i, o) {
            t.push(i ? o.replace(U0, "$1") : r || n);
          }),
          t
        );
      });
    tf.exports = B0;
  });
  var Ui = f((rq, rf) => {
    function W0(e, t) {
      for (var n = -1, r = e == null ? 0 : e.length, i = Array(r); ++n < r; )
        i[n] = t(e[n], n, e);
      return i;
    }
    rf.exports = W0;
  });
  var lf = f((iq, cf) => {
    var of = St(),
      z0 = Ui(),
      K0 = be(),
      j0 = gn(),
      Y0 = 1 / 0,
      af = of ? of.prototype : void 0,
      sf = af ? af.toString : void 0;
    function uf(e) {
      if (typeof e == "string") return e;
      if (K0(e)) return z0(e, uf) + "";
      if (j0(e)) return sf ? sf.call(e) : "";
      var t = e + "";
      return t == "0" && 1 / e == -Y0 ? "-0" : t;
    }
    cf.exports = uf;
  });
  var df = f((oq, ff) => {
    var Q0 = lf();
    function $0(e) {
      return e == null ? "" : Q0(e);
    }
    ff.exports = $0;
  });
  var hn = f((aq, pf) => {
    var Z0 = be(),
      J0 = or(),
      ew = nf(),
      tw = df();
    function nw(e, t) {
      return Z0(e) ? e : J0(e, t) ? [e] : ew(tw(e));
    }
    pf.exports = nw;
  });
  var Gt = f((sq, gf) => {
    var rw = gn(),
      iw = 1 / 0;
    function ow(e) {
      if (typeof e == "string" || rw(e)) return e;
      var t = e + "";
      return t == "0" && 1 / e == -iw ? "-0" : t;
    }
    gf.exports = ow;
  });
  var ar = f((uq, hf) => {
    var aw = hn(),
      sw = Gt();
    function uw(e, t) {
      t = aw(t, e);
      for (var n = 0, r = t.length; e != null && n < r; ) e = e[sw(t[n++])];
      return n && n == r ? e : void 0;
    }
    hf.exports = uw;
  });
  var sr = f((cq, Ef) => {
    var cw = ar();
    function lw(e, t, n) {
      var r = e == null ? void 0 : cw(e, t);
      return r === void 0 ? n : r;
    }
    Ef.exports = lw;
  });
  var vf = f((lq, yf) => {
    function fw(e, t) {
      return e != null && t in Object(e);
    }
    yf.exports = fw;
  });
  var _f = f((fq, mf) => {
    var dw = hn(),
      pw = cn(),
      gw = be(),
      hw = Zn(),
      Ew = Jn(),
      yw = Gt();
    function vw(e, t, n) {
      t = dw(t, e);
      for (var r = -1, i = t.length, o = !1; ++r < i; ) {
        var s = yw(t[r]);
        if (!(o = e != null && n(e, s))) break;
        e = e[s];
      }
      return o || ++r != i
        ? o
        : ((i = e == null ? 0 : e.length),
          !!i && Ew(i) && hw(s, i) && (gw(e) || pw(e)));
    }
    mf.exports = vw;
  });
  var Tf = f((dq, If) => {
    var mw = vf(),
      _w = _f();
    function Iw(e, t) {
      return e != null && _w(e, t, mw);
    }
    If.exports = Iw;
  });
  var Af = f((pq, bf) => {
    var Tw = Xi(),
      bw = sr(),
      Aw = Tf(),
      ww = or(),
      Ow = Vi(),
      Sw = ki(),
      xw = Gt(),
      Rw = 1,
      Cw = 2;
    function Pw(e, t) {
      return ww(e) && Ow(t)
        ? Sw(xw(e), t)
        : function (n) {
            var r = bw(n, e);
            return r === void 0 && r === t ? Aw(n, e) : Tw(t, r, Rw | Cw);
          };
    }
    bf.exports = Pw;
  });
  var ur = f((gq, wf) => {
    function Lw(e) {
      return e;
    }
    wf.exports = Lw;
  });
  var Bi = f((hq, Of) => {
    function Nw(e) {
      return function (t) {
        return t?.[e];
      };
    }
    Of.exports = Nw;
  });
  var xf = f((Eq, Sf) => {
    var Dw = ar();
    function Mw(e) {
      return function (t) {
        return Dw(t, e);
      };
    }
    Sf.exports = Mw;
  });
  var Cf = f((yq, Rf) => {
    var Fw = Bi(),
      qw = xf(),
      Gw = or(),
      Xw = Gt();
    function Vw(e) {
      return Gw(e) ? Fw(Xw(e)) : qw(e);
    }
    Rf.exports = Vw;
  });
  var ft = f((vq, Pf) => {
    var kw = Kl(),
      Hw = Af(),
      Uw = ur(),
      Bw = be(),
      Ww = Cf();
    function zw(e) {
      return typeof e == "function"
        ? e
        : e == null
        ? Uw
        : typeof e == "object"
        ? Bw(e)
          ? Hw(e[0], e[1])
          : kw(e)
        : Ww(e);
    }
    Pf.exports = zw;
  });
  var Wi = f((mq, Lf) => {
    var Kw = ft(),
      jw = yt(),
      Yw = pn();
    function Qw(e) {
      return function (t, n, r) {
        var i = Object(t);
        if (!jw(t)) {
          var o = Kw(n, 3);
          (t = Yw(t)),
            (n = function (a) {
              return o(i[a], a, i);
            });
        }
        var s = e(t, n, r);
        return s > -1 ? i[o ? t[s] : s] : void 0;
      };
    }
    Lf.exports = Qw;
  });
  var zi = f((_q, Nf) => {
    function $w(e, t, n, r) {
      for (var i = e.length, o = n + (r ? 1 : -1); r ? o-- : ++o < i; )
        if (t(e[o], o, e)) return o;
      return -1;
    }
    Nf.exports = $w;
  });
  var Mf = f((Iq, Df) => {
    var Zw = /\s/;
    function Jw(e) {
      for (var t = e.length; t-- && Zw.test(e.charAt(t)); );
      return t;
    }
    Df.exports = Jw;
  });
  var qf = f((Tq, Ff) => {
    var eO = Mf(),
      tO = /^\s+/;
    function nO(e) {
      return e && e.slice(0, eO(e) + 1).replace(tO, "");
    }
    Ff.exports = nO;
  });
  var cr = f((bq, Vf) => {
    var rO = qf(),
      Gf = Je(),
      iO = gn(),
      Xf = 0 / 0,
      oO = /^[-+]0x[0-9a-f]+$/i,
      aO = /^0b[01]+$/i,
      sO = /^0o[0-7]+$/i,
      uO = parseInt;
    function cO(e) {
      if (typeof e == "number") return e;
      if (iO(e)) return Xf;
      if (Gf(e)) {
        var t = typeof e.valueOf == "function" ? e.valueOf() : e;
        e = Gf(t) ? t + "" : t;
      }
      if (typeof e != "string") return e === 0 ? e : +e;
      e = rO(e);
      var n = aO.test(e);
      return n || sO.test(e) ? uO(e.slice(2), n ? 2 : 8) : oO.test(e) ? Xf : +e;
    }
    Vf.exports = cO;
  });
  var Uf = f((Aq, Hf) => {
    var lO = cr(),
      kf = 1 / 0,
      fO = 17976931348623157e292;
    function dO(e) {
      if (!e) return e === 0 ? e : 0;
      if (((e = lO(e)), e === kf || e === -kf)) {
        var t = e < 0 ? -1 : 1;
        return t * fO;
      }
      return e === e ? e : 0;
    }
    Hf.exports = dO;
  });
  var Ki = f((wq, Bf) => {
    var pO = Uf();
    function gO(e) {
      var t = pO(e),
        n = t % 1;
      return t === t ? (n ? t - n : t) : 0;
    }
    Bf.exports = gO;
  });
  var zf = f((Oq, Wf) => {
    var hO = zi(),
      EO = ft(),
      yO = Ki(),
      vO = Math.max;
    function mO(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = n == null ? 0 : yO(n);
      return i < 0 && (i = vO(r + i, 0)), hO(e, EO(t, 3), i);
    }
    Wf.exports = mO;
  });
  var ji = f((Sq, Kf) => {
    var _O = Wi(),
      IO = zf(),
      TO = _O(IO);
    Kf.exports = TO;
  });
  var Qf = {};
  Ne(Qf, {
    ELEMENT_MATCHES: () => bO,
    FLEX_PREFIXED: () => Yi,
    IS_BROWSER_ENV: () => We,
    TRANSFORM_PREFIXED: () => dt,
    TRANSFORM_STYLE_PREFIXED: () => fr,
    withBrowser: () => lr,
  });
  var Yf,
    We,
    lr,
    bO,
    Yi,
    dt,
    jf,
    fr,
    dr = pe(() => {
      "use strict";
      (Yf = ae(ji())),
        (We = typeof window < "u"),
        (lr = (e, t) => (We ? e() : t)),
        (bO = lr(() =>
          (0, Yf.default)(
            [
              "matches",
              "matchesSelector",
              "mozMatchesSelector",
              "msMatchesSelector",
              "oMatchesSelector",
              "webkitMatchesSelector",
            ],
            (e) => e in Element.prototype
          )
        )),
        (Yi = lr(() => {
          let e = document.createElement("i"),
            t = [
              "flex",
              "-webkit-flex",
              "-ms-flexbox",
              "-moz-box",
              "-webkit-box",
            ],
            n = "";
          try {
            let { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i];
              if (((e.style.display = o), e.style.display === o)) return o;
            }
            return n;
          } catch {
            return n;
          }
        }, "flex")),
        (dt = lr(() => {
          let e = document.createElement("i");
          if (e.style.transform == null) {
            let t = ["Webkit", "Moz", "ms"],
              n = "Transform",
              { length: r } = t;
            for (let i = 0; i < r; i++) {
              let o = t[i] + n;
              if (e.style[o] !== void 0) return o;
            }
          }
          return "transform";
        }, "transform")),
        (jf = dt.split("transform")[0]),
        (fr = jf ? jf + "TransformStyle" : "transformStyle");
    });
  var Qi = f((xq, td) => {
    var AO = 4,
      wO = 0.001,
      OO = 1e-7,
      SO = 10,
      En = 11,
      pr = 1 / (En - 1),
      xO = typeof Float32Array == "function";
    function $f(e, t) {
      return 1 - 3 * t + 3 * e;
    }
    function Zf(e, t) {
      return 3 * t - 6 * e;
    }
    function Jf(e) {
      return 3 * e;
    }
    function gr(e, t, n) {
      return (($f(t, n) * e + Zf(t, n)) * e + Jf(t)) * e;
    }
    function ed(e, t, n) {
      return 3 * $f(t, n) * e * e + 2 * Zf(t, n) * e + Jf(t);
    }
    function RO(e, t, n, r, i) {
      var o,
        s,
        a = 0;
      do
        (s = t + (n - t) / 2), (o = gr(s, r, i) - e), o > 0 ? (n = s) : (t = s);
      while (Math.abs(o) > OO && ++a < SO);
      return s;
    }
    function CO(e, t, n, r) {
      for (var i = 0; i < AO; ++i) {
        var o = ed(t, n, r);
        if (o === 0) return t;
        var s = gr(t, n, r) - e;
        t -= s / o;
      }
      return t;
    }
    td.exports = function (t, n, r, i) {
      if (!(0 <= t && t <= 1 && 0 <= r && r <= 1))
        throw new Error("bezier x values must be in [0, 1] range");
      var o = xO ? new Float32Array(En) : new Array(En);
      if (t !== n || r !== i)
        for (var s = 0; s < En; ++s) o[s] = gr(s * pr, t, r);
      function a(u) {
        for (var c = 0, h = 1, p = En - 1; h !== p && o[h] <= u; ++h) c += pr;
        --h;
        var d = (u - o[h]) / (o[h + 1] - o[h]),
          E = c + d * pr,
          I = ed(E, t, r);
        return I >= wO ? CO(u, E, t, r) : I === 0 ? E : RO(u, c, c + pr, t, r);
      }
      return function (c) {
        return t === n && r === i
          ? c
          : c === 0
          ? 0
          : c === 1
          ? 1
          : gr(a(c), n, i);
      };
    };
  });
  var vn = {};
  Ne(vn, {
    bounce: () => dS,
    bouncePast: () => pS,
    ease: () => PO,
    easeIn: () => LO,
    easeInOut: () => DO,
    easeOut: () => NO,
    inBack: () => rS,
    inCirc: () => JO,
    inCubic: () => GO,
    inElastic: () => aS,
    inExpo: () => QO,
    inOutBack: () => oS,
    inOutCirc: () => tS,
    inOutCubic: () => VO,
    inOutElastic: () => uS,
    inOutExpo: () => ZO,
    inOutQuad: () => qO,
    inOutQuart: () => UO,
    inOutQuint: () => zO,
    inOutSine: () => YO,
    inQuad: () => MO,
    inQuart: () => kO,
    inQuint: () => BO,
    inSine: () => KO,
    outBack: () => iS,
    outBounce: () => nS,
    outCirc: () => eS,
    outCubic: () => XO,
    outElastic: () => sS,
    outExpo: () => $O,
    outQuad: () => FO,
    outQuart: () => HO,
    outQuint: () => WO,
    outSine: () => jO,
    swingFrom: () => lS,
    swingFromTo: () => cS,
    swingTo: () => fS,
  });
  function MO(e) {
    return Math.pow(e, 2);
  }
  function FO(e) {
    return -(Math.pow(e - 1, 2) - 1);
  }
  function qO(e) {
    return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
  }
  function GO(e) {
    return Math.pow(e, 3);
  }
  function XO(e) {
    return Math.pow(e - 1, 3) + 1;
  }
  function VO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 3)
      : 0.5 * (Math.pow(e - 2, 3) + 2);
  }
  function kO(e) {
    return Math.pow(e, 4);
  }
  function HO(e) {
    return -(Math.pow(e - 1, 4) - 1);
  }
  function UO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 4)
      : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
  }
  function BO(e) {
    return Math.pow(e, 5);
  }
  function WO(e) {
    return Math.pow(e - 1, 5) + 1;
  }
  function zO(e) {
    return (e /= 0.5) < 1
      ? 0.5 * Math.pow(e, 5)
      : 0.5 * (Math.pow(e - 2, 5) + 2);
  }
  function KO(e) {
    return -Math.cos(e * (Math.PI / 2)) + 1;
  }
  function jO(e) {
    return Math.sin(e * (Math.PI / 2));
  }
  function YO(e) {
    return -0.5 * (Math.cos(Math.PI * e) - 1);
  }
  function QO(e) {
    return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
  }
  function $O(e) {
    return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
  }
  function ZO(e) {
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (e /= 0.5) < 1
      ? 0.5 * Math.pow(2, 10 * (e - 1))
      : 0.5 * (-Math.pow(2, -10 * --e) + 2);
  }
  function JO(e) {
    return -(Math.sqrt(1 - e * e) - 1);
  }
  function eS(e) {
    return Math.sqrt(1 - Math.pow(e - 1, 2));
  }
  function tS(e) {
    return (e /= 0.5) < 1
      ? -0.5 * (Math.sqrt(1 - e * e) - 1)
      : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
  }
  function nS(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function rS(e) {
    let t = it;
    return e * e * ((t + 1) * e - t);
  }
  function iS(e) {
    let t = it;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function oS(e) {
    let t = it;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function aS(e) {
    let t = it,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        -(
          r *
          Math.pow(2, 10 * (e -= 1)) *
          Math.sin(((e - t) * (2 * Math.PI)) / n)
        ));
  }
  function sS(e) {
    let t = it,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : e === 1
      ? 1
      : (n || (n = 0.3),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        r * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / n) + 1);
  }
  function uS(e) {
    let t = it,
      n = 0,
      r = 1;
    return e === 0
      ? 0
      : (e /= 1 / 2) === 2
      ? 1
      : (n || (n = 0.3 * 1.5),
        r < 1
          ? ((r = 1), (t = n / 4))
          : (t = (n / (2 * Math.PI)) * Math.asin(1 / r)),
        e < 1
          ? -0.5 *
            (r *
              Math.pow(2, 10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n))
          : r *
              Math.pow(2, -10 * (e -= 1)) *
              Math.sin(((e - t) * (2 * Math.PI)) / n) *
              0.5 +
            1);
  }
  function cS(e) {
    let t = it;
    return (e /= 0.5) < 1
      ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
      : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
  }
  function lS(e) {
    let t = it;
    return e * e * ((t + 1) * e - t);
  }
  function fS(e) {
    let t = it;
    return (e -= 1) * e * ((t + 1) * e + t) + 1;
  }
  function dS(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
      : e < 2.5 / 2.75
      ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
      : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
  }
  function pS(e) {
    return e < 1 / 2.75
      ? 7.5625 * e * e
      : e < 2 / 2.75
      ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
      : e < 2.5 / 2.75
      ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
      : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
  }
  var yn,
    it,
    PO,
    LO,
    NO,
    DO,
    $i = pe(() => {
      "use strict";
      (yn = ae(Qi())),
        (it = 1.70158),
        (PO = (0, yn.default)(0.25, 0.1, 0.25, 1)),
        (LO = (0, yn.default)(0.42, 0, 1, 1)),
        (NO = (0, yn.default)(0, 0, 0.58, 1)),
        (DO = (0, yn.default)(0.42, 0, 0.58, 1));
    });
  var rd = {};
  Ne(rd, {
    applyEasing: () => hS,
    createBezierEasing: () => gS,
    optimizeFloat: () => mn,
  });
  function mn(e, t = 5, n = 10) {
    let r = Math.pow(n, t),
      i = Number(Math.round(e * r) / r);
    return Math.abs(i) > 1e-4 ? i : 0;
  }
  function gS(e) {
    return (0, nd.default)(...e);
  }
  function hS(e, t, n) {
    return t === 0
      ? 0
      : t === 1
      ? 1
      : mn(n ? (t > 0 ? n(t) : t) : t > 0 && e && vn[e] ? vn[e](t) : t);
  }
  var nd,
    Zi = pe(() => {
      "use strict";
      $i();
      nd = ae(Qi());
    });
  var ad = {};
  Ne(ad, {
    createElementState: () => od,
    ixElements: () => RS,
    mergeActionState: () => Ji,
  });
  function od(e, t, n, r, i) {
    let o =
      n === ES ? (0, Xt.getIn)(i, ["config", "target", "objectId"]) : null;
    return (0, Xt.mergeIn)(e, [r], { id: r, ref: t, refId: o, refType: n });
  }
  function Ji(e, t, n, r, i) {
    let o = PS(i);
    return (0, Xt.mergeIn)(e, [t, xS, n], r, o);
  }
  function PS(e) {
    let { config: t } = e;
    return CS.reduce((n, r) => {
      let i = r[0],
        o = r[1],
        s = t[i],
        a = t[o];
      return s != null && a != null && (n[o] = a), n;
    }, {});
  }
  var Xt,
    Cq,
    ES,
    Pq,
    yS,
    vS,
    mS,
    _S,
    IS,
    TS,
    bS,
    AS,
    wS,
    OS,
    SS,
    id,
    xS,
    RS,
    CS,
    sd = pe(() => {
      "use strict";
      Xt = ae(Ct());
      De();
      ({
        HTML_ELEMENT: Cq,
        PLAIN_OBJECT: ES,
        ABSTRACT_NODE: Pq,
        CONFIG_X_VALUE: yS,
        CONFIG_Y_VALUE: vS,
        CONFIG_Z_VALUE: mS,
        CONFIG_VALUE: _S,
        CONFIG_X_UNIT: IS,
        CONFIG_Y_UNIT: TS,
        CONFIG_Z_UNIT: bS,
        CONFIG_UNIT: AS,
      } = Oe),
        ({
          IX2_SESSION_STOPPED: wS,
          IX2_INSTANCE_ADDED: OS,
          IX2_ELEMENT_STATE_CHANGED: SS,
        } = Ie),
        (id = {}),
        (xS = "refState"),
        (RS = (e = id, t = {}) => {
          switch (t.type) {
            case wS:
              return id;
            case OS: {
              let {
                  elementId: n,
                  element: r,
                  origin: i,
                  actionItem: o,
                  refType: s,
                } = t.payload,
                { actionTypeId: a } = o,
                u = e;
              return (
                (0, Xt.getIn)(u, [n, r]) !== r && (u = od(u, r, s, n, o)),
                Ji(u, n, a, i, o)
              );
            }
            case SS: {
              let {
                elementId: n,
                actionTypeId: r,
                current: i,
                actionItem: o,
              } = t.payload;
              return Ji(e, n, r, i, o);
            }
            default:
              return e;
          }
        });
      CS = [
        [yS, IS],
        [vS, TS],
        [mS, bS],
        [_S, AS],
      ];
    });
  var ud = f((eo) => {
    "use strict";
    Object.defineProperty(eo, "__esModule", { value: !0 });
    function LS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    LS(eo, {
      clearPlugin: function () {
        return XS;
      },
      createPluginInstance: function () {
        return qS;
      },
      getPluginConfig: function () {
        return NS;
      },
      getPluginDestination: function () {
        return FS;
      },
      getPluginDuration: function () {
        return DS;
      },
      getPluginOrigin: function () {
        return MS;
      },
      renderPlugin: function () {
        return GS;
      },
    });
    var NS = (e) => e.value,
      DS = (e, t) => {
        if (t.config.duration !== "auto") return null;
        let n = parseFloat(e.getAttribute("data-duration"));
        return n > 0
          ? n * 1e3
          : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
      },
      MS = (e) => e || { value: 0 },
      FS = (e) => ({ value: e.value }),
      qS = (e) => {
        let t = window.Webflow.require("lottie").createInstance(e);
        return t.stop(), t.setSubframe(!0), t;
      },
      GS = (e, t, n) => {
        if (!e) return;
        let r = t[n.actionTypeId].value / 100;
        e.goToFrame(e.frames * r);
      },
      XS = (e) => {
        window.Webflow.require("lottie").createInstance(e).stop();
      };
  });
  var ld = f((to) => {
    "use strict";
    Object.defineProperty(to, "__esModule", { value: !0 });
    function VS(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    VS(to, {
      clearPlugin: function () {
        return QS;
      },
      createPluginInstance: function () {
        return jS;
      },
      getPluginConfig: function () {
        return BS;
      },
      getPluginDestination: function () {
        return KS;
      },
      getPluginDuration: function () {
        return WS;
      },
      getPluginOrigin: function () {
        return zS;
      },
      renderPlugin: function () {
        return YS;
      },
    });
    var kS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      HS = () => window.Webflow.require("spline"),
      US = (e, t) => e.filter((n) => !t.includes(n)),
      BS = (e, t) => e.value[t],
      WS = () => null,
      cd = Object.freeze({
        positionX: 0,
        positionY: 0,
        positionZ: 0,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
      }),
      zS = (e, t) => {
        let n = t.config.value,
          r = Object.keys(n);
        if (e) {
          let o = Object.keys(e),
            s = US(r, o);
          return s.length ? s.reduce((u, c) => ((u[c] = cd[c]), u), e) : e;
        }
        return r.reduce((o, s) => ((o[s] = cd[s]), o), {});
      },
      KS = (e) => e.value,
      jS = (e, t) => {
        let n = t?.config?.target?.pluginElement;
        return n ? kS(n) : null;
      },
      YS = (e, t, n) => {
        let r = HS(),
          i = r.getInstance(e),
          o = n.config.target.objectId,
          s = (a) => {
            if (!a)
              throw new Error("Invalid spline app passed to renderSpline");
            let u = o && a.findObjectById(o);
            if (!u) return;
            let { PLUGIN_SPLINE: c } = t;
            c.positionX != null && (u.position.x = c.positionX),
              c.positionY != null && (u.position.y = c.positionY),
              c.positionZ != null && (u.position.z = c.positionZ),
              c.rotationX != null && (u.rotation.x = c.rotationX),
              c.rotationY != null && (u.rotation.y = c.rotationY),
              c.rotationZ != null && (u.rotation.z = c.rotationZ),
              c.scaleX != null && (u.scale.x = c.scaleX),
              c.scaleY != null && (u.scale.y = c.scaleY),
              c.scaleZ != null && (u.scale.z = c.scaleZ);
          };
        i ? s(i.spline) : r.setLoadHandler(e, s);
      },
      QS = () => null;
  });
  var fd = f((io) => {
    "use strict";
    Object.defineProperty(io, "__esModule", { value: !0 });
    function $S(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    $S(io, {
      clearPlugin: function () {
        return ax;
      },
      createPluginInstance: function () {
        return ix;
      },
      getPluginConfig: function () {
        return ex;
      },
      getPluginDestination: function () {
        return rx;
      },
      getPluginDuration: function () {
        return tx;
      },
      getPluginOrigin: function () {
        return nx;
      },
      renderPlugin: function () {
        return ox;
      },
    });
    var no = "--wf-rive-fit",
      ro = "--wf-rive-alignment",
      ZS = (e) => document.querySelector(`[data-w-id="${e}"]`),
      JS = () => window.Webflow.require("rive"),
      ex = (e, t) => e.value.inputs[t],
      tx = () => null,
      nx = (e, t) => {
        if (e) return e;
        let n = {},
          { inputs: r = {} } = t.config.value;
        for (let i in r) r[i] == null && (n[i] = 0);
        return n;
      },
      rx = (e) => e.value.inputs ?? {},
      ix = (e, t) => {
        if ((t.config?.target?.selectorGuids || []).length > 0) return e;
        let r = t?.config?.target?.pluginElement;
        return r ? ZS(r) : null;
      },
      ox = (e, { PLUGIN_RIVE: t }, n) => {
        let r = JS(),
          i = r.getInstance(e),
          o = r.rive.StateMachineInputType,
          { name: s, inputs: a = {} } = n.config.value || {};
        function u(c) {
          if (c.loaded) h();
          else {
            let p = () => {
              h(), c?.off("load", p);
            };
            c?.on("load", p);
          }
          function h() {
            let p = c.stateMachineInputs(s);
            if (p != null) {
              if ((c.isPlaying || c.play(s, !1), no in a || ro in a)) {
                let d = c.layout,
                  E = a[no] ?? d.fit,
                  I = a[ro] ?? d.alignment;
                (E !== d.fit || I !== d.alignment) &&
                  (c.layout = d.copyWith({ fit: E, alignment: I }));
              }
              for (let d in a) {
                if (d === no || d === ro) continue;
                let E = p.find((I) => I.name === d);
                if (E != null)
                  switch (E.type) {
                    case o.Boolean: {
                      if (a[d] != null) {
                        let I = !!a[d];
                        E.value = I;
                      }
                      break;
                    }
                    case o.Number: {
                      let I = t[d];
                      I != null && (E.value = I);
                      break;
                    }
                    case o.Trigger: {
                      a[d] && E.fire();
                      break;
                    }
                  }
              }
            }
          }
        }
        i?.rive ? u(i.rive) : r.setLoadHandler(e, u);
      },
      ax = (e, t) => null;
  });
  var ao = f((oo) => {
    "use strict";
    Object.defineProperty(oo, "__esModule", { value: !0 });
    Object.defineProperty(oo, "normalizeColor", {
      enumerable: !0,
      get: function () {
        return sx;
      },
    });
    var dd = {
      aliceblue: "#F0F8FF",
      antiquewhite: "#FAEBD7",
      aqua: "#00FFFF",
      aquamarine: "#7FFFD4",
      azure: "#F0FFFF",
      beige: "#F5F5DC",
      bisque: "#FFE4C4",
      black: "#000000",
      blanchedalmond: "#FFEBCD",
      blue: "#0000FF",
      blueviolet: "#8A2BE2",
      brown: "#A52A2A",
      burlywood: "#DEB887",
      cadetblue: "#5F9EA0",
      chartreuse: "#7FFF00",
      chocolate: "#D2691E",
      coral: "#FF7F50",
      cornflowerblue: "#6495ED",
      cornsilk: "#FFF8DC",
      crimson: "#DC143C",
      cyan: "#00FFFF",
      darkblue: "#00008B",
      darkcyan: "#008B8B",
      darkgoldenrod: "#B8860B",
      darkgray: "#A9A9A9",
      darkgreen: "#006400",
      darkgrey: "#A9A9A9",
      darkkhaki: "#BDB76B",
      darkmagenta: "#8B008B",
      darkolivegreen: "#556B2F",
      darkorange: "#FF8C00",
      darkorchid: "#9932CC",
      darkred: "#8B0000",
      darksalmon: "#E9967A",
      darkseagreen: "#8FBC8F",
      darkslateblue: "#483D8B",
      darkslategray: "#2F4F4F",
      darkslategrey: "#2F4F4F",
      darkturquoise: "#00CED1",
      darkviolet: "#9400D3",
      deeppink: "#FF1493",
      deepskyblue: "#00BFFF",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1E90FF",
      firebrick: "#B22222",
      floralwhite: "#FFFAF0",
      forestgreen: "#228B22",
      fuchsia: "#FF00FF",
      gainsboro: "#DCDCDC",
      ghostwhite: "#F8F8FF",
      gold: "#FFD700",
      goldenrod: "#DAA520",
      gray: "#808080",
      green: "#008000",
      greenyellow: "#ADFF2F",
      grey: "#808080",
      honeydew: "#F0FFF0",
      hotpink: "#FF69B4",
      indianred: "#CD5C5C",
      indigo: "#4B0082",
      ivory: "#FFFFF0",
      khaki: "#F0E68C",
      lavender: "#E6E6FA",
      lavenderblush: "#FFF0F5",
      lawngreen: "#7CFC00",
      lemonchiffon: "#FFFACD",
      lightblue: "#ADD8E6",
      lightcoral: "#F08080",
      lightcyan: "#E0FFFF",
      lightgoldenrodyellow: "#FAFAD2",
      lightgray: "#D3D3D3",
      lightgreen: "#90EE90",
      lightgrey: "#D3D3D3",
      lightpink: "#FFB6C1",
      lightsalmon: "#FFA07A",
      lightseagreen: "#20B2AA",
      lightskyblue: "#87CEFA",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#B0C4DE",
      lightyellow: "#FFFFE0",
      lime: "#00FF00",
      limegreen: "#32CD32",
      linen: "#FAF0E6",
      magenta: "#FF00FF",
      maroon: "#800000",
      mediumaquamarine: "#66CDAA",
      mediumblue: "#0000CD",
      mediumorchid: "#BA55D3",
      mediumpurple: "#9370DB",
      mediumseagreen: "#3CB371",
      mediumslateblue: "#7B68EE",
      mediumspringgreen: "#00FA9A",
      mediumturquoise: "#48D1CC",
      mediumvioletred: "#C71585",
      midnightblue: "#191970",
      mintcream: "#F5FFFA",
      mistyrose: "#FFE4E1",
      moccasin: "#FFE4B5",
      navajowhite: "#FFDEAD",
      navy: "#000080",
      oldlace: "#FDF5E6",
      olive: "#808000",
      olivedrab: "#6B8E23",
      orange: "#FFA500",
      orangered: "#FF4500",
      orchid: "#DA70D6",
      palegoldenrod: "#EEE8AA",
      palegreen: "#98FB98",
      paleturquoise: "#AFEEEE",
      palevioletred: "#DB7093",
      papayawhip: "#FFEFD5",
      peachpuff: "#FFDAB9",
      peru: "#CD853F",
      pink: "#FFC0CB",
      plum: "#DDA0DD",
      powderblue: "#B0E0E6",
      purple: "#800080",
      rebeccapurple: "#663399",
      red: "#FF0000",
      rosybrown: "#BC8F8F",
      royalblue: "#4169E1",
      saddlebrown: "#8B4513",
      salmon: "#FA8072",
      sandybrown: "#F4A460",
      seagreen: "#2E8B57",
      seashell: "#FFF5EE",
      sienna: "#A0522D",
      silver: "#C0C0C0",
      skyblue: "#87CEEB",
      slateblue: "#6A5ACD",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#FFFAFA",
      springgreen: "#00FF7F",
      steelblue: "#4682B4",
      tan: "#D2B48C",
      teal: "#008080",
      thistle: "#D8BFD8",
      tomato: "#FF6347",
      turquoise: "#40E0D0",
      violet: "#EE82EE",
      wheat: "#F5DEB3",
      white: "#FFFFFF",
      whitesmoke: "#F5F5F5",
      yellow: "#FFFF00",
      yellowgreen: "#9ACD32",
    };
    function sx(e) {
      let t,
        n,
        r,
        i = 1,
        o = e.replace(/\s/g, "").toLowerCase(),
        a = (typeof dd[o] == "string" ? dd[o].toLowerCase() : null) || o;
      if (a.startsWith("#")) {
        let u = a.substring(1);
        u.length === 3 || u.length === 4
          ? ((t = parseInt(u[0] + u[0], 16)),
            (n = parseInt(u[1] + u[1], 16)),
            (r = parseInt(u[2] + u[2], 16)),
            u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
          : (u.length === 6 || u.length === 8) &&
            ((t = parseInt(u.substring(0, 2), 16)),
            (n = parseInt(u.substring(2, 4), 16)),
            (r = parseInt(u.substring(4, 6), 16)),
            u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
      } else if (a.startsWith("rgba")) {
        let u = a.match(/rgba\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10)),
          (i = parseFloat(u[3]));
      } else if (a.startsWith("rgb")) {
        let u = a.match(/rgb\(([^)]+)\)/)[1].split(",");
        (t = parseInt(u[0], 10)),
          (n = parseInt(u[1], 10)),
          (r = parseInt(u[2], 10));
      } else if (a.startsWith("hsla")) {
        let u = a.match(/hsla\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          h = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100;
        i = parseFloat(u[3]);
        let d = (1 - Math.abs(2 * p - 1)) * h,
          E = d * (1 - Math.abs(((c / 60) % 2) - 1)),
          I = p - d / 2,
          _,
          w,
          v;
        c >= 0 && c < 60
          ? ((_ = d), (w = E), (v = 0))
          : c >= 60 && c < 120
          ? ((_ = E), (w = d), (v = 0))
          : c >= 120 && c < 180
          ? ((_ = 0), (w = d), (v = E))
          : c >= 180 && c < 240
          ? ((_ = 0), (w = E), (v = d))
          : c >= 240 && c < 300
          ? ((_ = E), (w = 0), (v = d))
          : ((_ = d), (w = 0), (v = E)),
          (t = Math.round((_ + I) * 255)),
          (n = Math.round((w + I) * 255)),
          (r = Math.round((v + I) * 255));
      } else if (a.startsWith("hsl")) {
        let u = a.match(/hsl\(([^)]+)\)/)[1].split(","),
          c = parseFloat(u[0]),
          h = parseFloat(u[1].replace("%", "")) / 100,
          p = parseFloat(u[2].replace("%", "")) / 100,
          d = (1 - Math.abs(2 * p - 1)) * h,
          E = d * (1 - Math.abs(((c / 60) % 2) - 1)),
          I = p - d / 2,
          _,
          w,
          v;
        c >= 0 && c < 60
          ? ((_ = d), (w = E), (v = 0))
          : c >= 60 && c < 120
          ? ((_ = E), (w = d), (v = 0))
          : c >= 120 && c < 180
          ? ((_ = 0), (w = d), (v = E))
          : c >= 180 && c < 240
          ? ((_ = 0), (w = E), (v = d))
          : c >= 240 && c < 300
          ? ((_ = E), (w = 0), (v = d))
          : ((_ = d), (w = 0), (v = E)),
          (t = Math.round((_ + I) * 255)),
          (n = Math.round((w + I) * 255)),
          (r = Math.round((v + I) * 255));
      }
      if (Number.isNaN(t) || Number.isNaN(n) || Number.isNaN(r))
        throw new Error(
          `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
        );
      return { red: t, green: n, blue: r, alpha: i };
    }
  });
  var pd = f((so) => {
    "use strict";
    Object.defineProperty(so, "__esModule", { value: !0 });
    function ux(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    ux(so, {
      clearPlugin: function () {
        return yx;
      },
      createPluginInstance: function () {
        return gx;
      },
      getPluginConfig: function () {
        return lx;
      },
      getPluginDestination: function () {
        return px;
      },
      getPluginDuration: function () {
        return fx;
      },
      getPluginOrigin: function () {
        return dx;
      },
      renderPlugin: function () {
        return Ex;
      },
    });
    var cx = ao(),
      lx = (e, t) => e.value[t],
      fx = () => null,
      dx = (e, t) => {
        if (e) return e;
        let n = t.config.value,
          r = t.config.target.objectId,
          i = getComputedStyle(document.documentElement).getPropertyValue(r);
        if (n.size != null) return { size: parseInt(i, 10) };
        if (n.unit === "%" || n.unit === "-") return { size: parseFloat(i) };
        if (n.red != null && n.green != null && n.blue != null)
          return (0, cx.normalizeColor)(i);
      },
      px = (e) => e.value,
      gx = () => null,
      hx = {
        color: {
          match: ({ red: e, green: t, blue: n, alpha: r }) =>
            [e, t, n, r].every((i) => i != null),
          getValue: ({ red: e, green: t, blue: n, alpha: r }) =>
            `rgba(${e}, ${t}, ${n}, ${r})`,
        },
        size: {
          match: ({ size: e }) => e != null,
          getValue: ({ size: e }, t) => {
            switch (t) {
              case "-":
                return e;
              default:
                return `${e}${t}`;
            }
          },
        },
      },
      Ex = (e, t, n) => {
        let {
            target: { objectId: r },
            value: { unit: i },
          } = n.config,
          o = t.PLUGIN_VARIABLE,
          s = Object.values(hx).find((a) => a.match(o, i));
        s && document.documentElement.style.setProperty(r, s.getValue(o, i));
      },
      yx = (e, t) => {
        let n = t.config.target.objectId;
        document.documentElement.style.removeProperty(n);
      };
  });
  var hd = f((uo) => {
    "use strict";
    Object.defineProperty(uo, "__esModule", { value: !0 });
    Object.defineProperty(uo, "pluginMethodMap", {
      enumerable: !0,
      get: function () {
        return Tx;
      },
    });
    var hr = (De(), Ye(vs)),
      vx = Er(ud()),
      mx = Er(ld()),
      _x = Er(fd()),
      Ix = Er(pd());
    function gd(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (gd = function (r) {
        return r ? n : t;
      })(e);
    }
    function Er(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = gd(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Tx = new Map([
      [hr.ActionTypeConsts.PLUGIN_LOTTIE, { ...vx }],
      [hr.ActionTypeConsts.PLUGIN_SPLINE, { ...mx }],
      [hr.ActionTypeConsts.PLUGIN_RIVE, { ..._x }],
      [hr.ActionTypeConsts.PLUGIN_VARIABLE, { ...Ix }],
    ]);
  });
  var Ed = {};
  Ne(Ed, {
    clearPlugin: () => ho,
    createPluginInstance: () => Ax,
    getPluginConfig: () => lo,
    getPluginDestination: () => po,
    getPluginDuration: () => bx,
    getPluginOrigin: () => fo,
    isPluginType: () => mt,
    renderPlugin: () => go,
  });
  function mt(e) {
    return co.pluginMethodMap.has(e);
  }
  var co,
    _t,
    lo,
    fo,
    bx,
    po,
    Ax,
    go,
    ho,
    Eo = pe(() => {
      "use strict";
      dr();
      co = ae(hd());
      (_t = (e) => (t) => {
        if (!We) return () => null;
        let n = co.pluginMethodMap.get(t);
        if (!n) throw new Error(`IX2 no plugin configured for: ${t}`);
        let r = n[e];
        if (!r) throw new Error(`IX2 invalid plugin method: ${e}`);
        return r;
      }),
        (lo = _t("getPluginConfig")),
        (fo = _t("getPluginOrigin")),
        (bx = _t("getPluginDuration")),
        (po = _t("getPluginDestination")),
        (Ax = _t("createPluginInstance")),
        (go = _t("renderPlugin")),
        (ho = _t("clearPlugin"));
    });
  var vd = f((Xq, yd) => {
    function wx(e, t) {
      return e == null || e !== e ? t : e;
    }
    yd.exports = wx;
  });
  var _d = f((Vq, md) => {
    function Ox(e, t, n, r) {
      var i = -1,
        o = e == null ? 0 : e.length;
      for (r && o && (n = e[++i]); ++i < o; ) n = t(n, e[i], i, e);
      return n;
    }
    md.exports = Ox;
  });
  var Td = f((kq, Id) => {
    function Sx(e) {
      return function (t, n, r) {
        for (var i = -1, o = Object(t), s = r(t), a = s.length; a--; ) {
          var u = s[e ? a : ++i];
          if (n(o[u], u, o) === !1) break;
        }
        return t;
      };
    }
    Id.exports = Sx;
  });
  var Ad = f((Hq, bd) => {
    var xx = Td(),
      Rx = xx();
    bd.exports = Rx;
  });
  var yo = f((Uq, wd) => {
    var Cx = Ad(),
      Px = pn();
    function Lx(e, t) {
      return e && Cx(e, t, Px);
    }
    wd.exports = Lx;
  });
  var Sd = f((Bq, Od) => {
    var Nx = yt();
    function Dx(e, t) {
      return function (n, r) {
        if (n == null) return n;
        if (!Nx(n)) return e(n, r);
        for (
          var i = n.length, o = t ? i : -1, s = Object(n);
          (t ? o-- : ++o < i) && r(s[o], o, s) !== !1;

        );
        return n;
      };
    }
    Od.exports = Dx;
  });
  var vo = f((Wq, xd) => {
    var Mx = yo(),
      Fx = Sd(),
      qx = Fx(Mx);
    xd.exports = qx;
  });
  var Cd = f((zq, Rd) => {
    function Gx(e, t, n, r, i) {
      return (
        i(e, function (o, s, a) {
          n = r ? ((r = !1), o) : t(n, o, s, a);
        }),
        n
      );
    }
    Rd.exports = Gx;
  });
  var Ld = f((Kq, Pd) => {
    var Xx = _d(),
      Vx = vo(),
      kx = ft(),
      Hx = Cd(),
      Ux = be();
    function Bx(e, t, n) {
      var r = Ux(e) ? Xx : Hx,
        i = arguments.length < 3;
      return r(e, kx(t, 4), n, i, Vx);
    }
    Pd.exports = Bx;
  });
  var Dd = f((jq, Nd) => {
    var Wx = zi(),
      zx = ft(),
      Kx = Ki(),
      jx = Math.max,
      Yx = Math.min;
    function Qx(e, t, n) {
      var r = e == null ? 0 : e.length;
      if (!r) return -1;
      var i = r - 1;
      return (
        n !== void 0 &&
          ((i = Kx(n)), (i = n < 0 ? jx(r + i, 0) : Yx(i, r - 1))),
        Wx(e, zx(t, 3), i, !0)
      );
    }
    Nd.exports = Qx;
  });
  var Fd = f((Yq, Md) => {
    var $x = Wi(),
      Zx = Dd(),
      Jx = $x(Zx);
    Md.exports = Jx;
  });
  function qd(e, t) {
    return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
  }
  function eR(e, t) {
    if (qd(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    let n = Object.keys(e),
      r = Object.keys(t);
    if (n.length !== r.length) return !1;
    for (let i = 0; i < n.length; i++)
      if (!Object.hasOwn(t, n[i]) || !qd(e[n[i]], t[n[i]])) return !1;
    return !0;
  }
  var mo,
    Gd = pe(() => {
      "use strict";
      mo = eR;
    });
  var np = {};
  Ne(np, {
    cleanupHTMLElement: () => $R,
    clearAllStyles: () => QR,
    clearObjectCache: () => yR,
    getActionListProgress: () => JR,
    getAffectedElements: () => Ao,
    getComputedStyle: () => wR,
    getDestinationValues: () => LR,
    getElementId: () => IR,
    getInstanceId: () => mR,
    getInstanceOrigin: () => xR,
    getItemConfigByKey: () => PR,
    getMaxDurationItemIndex: () => tp,
    getNamespacedParameterId: () => nC,
    getRenderType: () => Zd,
    getStyleProp: () => NR,
    mediaQueriesEqual: () => iC,
    observeStore: () => AR,
    reduceListToGroup: () => eC,
    reifyState: () => TR,
    renderHTMLElement: () => DR,
    shallowEqual: () => mo,
    shouldAllowMediaQuery: () => rC,
    shouldNamespaceEventParameter: () => tC,
    stringifyTarget: () => oC,
  });
  function yR() {
    yr.clear();
  }
  function mR() {
    return "i" + vR++;
  }
  function IR(e, t) {
    for (let n in e) {
      let r = e[n];
      if (r && r.ref === t) return r.id;
    }
    return "e" + _R++;
  }
  function TR({ events: e, actionLists: t, site: n } = {}) {
    let r = (0, Ir.default)(
        e,
        (s, a) => {
          let { eventTypeId: u } = a;
          return s[u] || (s[u] = {}), (s[u][a.id] = a), s;
        },
        {}
      ),
      i = n && n.mediaQueries,
      o = [];
    return (
      i
        ? (o = i.map((s) => s.key))
        : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
      {
        ixData: {
          events: e,
          actionLists: t,
          eventTypeMap: r,
          mediaQueries: i,
          mediaQueryKeys: o,
        },
      }
    );
  }
  function AR({ store: e, select: t, onChange: n, comparator: r = bR }) {
    let { getState: i, subscribe: o } = e,
      s = o(u),
      a = t(i());
    function u() {
      let c = t(i());
      if (c == null) {
        s();
        return;
      }
      r(c, a) || ((a = c), n(a, e));
    }
    return s;
  }
  function kd(e) {
    let t = typeof e;
    if (t === "string") return { id: e };
    if (e != null && t === "object") {
      let {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      } = e;
      return {
        id: n,
        objectId: r,
        selector: i,
        selectorGuids: o,
        appliesTo: s,
        useEventTarget: a,
      };
    }
    return {};
  }
  function Ao({
    config: e,
    event: t,
    eventTarget: n,
    elementRoot: r,
    elementApi: i,
  }) {
    if (!i) throw new Error("IX2 missing elementApi");
    let { targets: o } = e;
    if (Array.isArray(o) && o.length > 0)
      return o.reduce(
        (N, T) =>
          N.concat(
            Ao({
              config: { target: T },
              event: t,
              eventTarget: n,
              elementRoot: r,
              elementApi: i,
            })
          ),
        []
      );
    let {
        getValidDocument: s,
        getQuerySelector: a,
        queryDocument: u,
        getChildElements: c,
        getSiblingElements: h,
        matchSelector: p,
        elementContains: d,
        isSiblingNode: E,
      } = i,
      { target: I } = e;
    if (!I) return [];
    let {
      id: _,
      objectId: w,
      selector: v,
      selectorGuids: x,
      appliesTo: A,
      useEventTarget: S,
    } = kd(I);
    if (w) return [yr.has(w) ? yr.get(w) : yr.set(w, {}).get(w)];
    if (A === yi.PAGE) {
      let N = s(_);
      return N ? [N] : [];
    }
    let R = (t?.action?.config?.affectedElements ?? {})[_ || v] || {},
      X = !!(R.id || R.selector),
      V,
      U,
      W,
      j = t && a(kd(t.target));
    if (
      (X
        ? ((V = R.limitAffectedElements), (U = j), (W = a(R)))
        : (U = W = a({ id: _, selector: v, selectorGuids: x })),
      t && S)
    ) {
      let N = n && (W || S === !0) ? [n] : u(j);
      if (W) {
        if (S === gR) return u(W).filter((T) => N.some((D) => d(T, D)));
        if (S === Xd) return u(W).filter((T) => N.some((D) => d(D, T)));
        if (S === Vd) return u(W).filter((T) => N.some((D) => E(D, T)));
      }
      return N;
    }
    return U == null || W == null
      ? []
      : We && r
      ? u(W).filter((N) => r.contains(N))
      : V === Xd
      ? u(U, W)
      : V === pR
      ? c(u(U)).filter(p(W))
      : V === Vd
      ? h(u(U)).filter(p(W))
      : u(W);
  }
  function wR({ element: e, actionItem: t }) {
    if (!We) return {};
    let { actionTypeId: n } = t;
    switch (n) {
      case Bt:
      case Wt:
      case zt:
      case Kt:
      case br:
        return window.getComputedStyle(e);
      default:
        return {};
    }
  }
  function xR(e, t = {}, n = {}, r, i) {
    let { getStyle: o } = i,
      { actionTypeId: s } = r;
    if (mt(s)) return fo(s)(t[s], r);
    switch (r.actionTypeId) {
      case kt:
      case Ht:
      case Ut:
      case bn:
        return t[r.actionTypeId] || wo[r.actionTypeId];
      case An:
        return OR(t[r.actionTypeId], r.config.filters);
      case wn:
        return SR(t[r.actionTypeId], r.config.fontVariations);
      case Yd:
        return { value: (0, ot.default)(parseFloat(o(e, mr)), 1) };
      case Bt: {
        let a = o(e, et),
          u = o(e, tt),
          c,
          h;
        return (
          r.config.widthUnit === pt
            ? (c = Hd.test(a) ? parseFloat(a) : parseFloat(n.width))
            : (c = (0, ot.default)(parseFloat(a), parseFloat(n.width))),
          r.config.heightUnit === pt
            ? (h = Hd.test(u) ? parseFloat(u) : parseFloat(n.height))
            : (h = (0, ot.default)(parseFloat(u), parseFloat(n.height))),
          { widthValue: c, heightValue: h }
        );
      }
      case Wt:
      case zt:
      case Kt:
        return KR({
          element: e,
          actionTypeId: r.actionTypeId,
          computedStyle: n,
          getStyle: o,
        });
      case br:
        return { value: (0, ot.default)(o(e, _r), n.display) };
      case ER:
        return t[r.actionTypeId] || { value: 0 };
      default:
        return;
    }
  }
  function LR({ element: e, actionItem: t, elementApi: n }) {
    if (mt(t.actionTypeId)) return po(t.actionTypeId)(t.config);
    switch (t.actionTypeId) {
      case kt:
      case Ht:
      case Ut:
      case bn: {
        let { xValue: r, yValue: i, zValue: o } = t.config;
        return { xValue: r, yValue: i, zValue: o };
      }
      case Bt: {
        let { getStyle: r, setStyle: i, getProperty: o } = n,
          { widthUnit: s, heightUnit: a } = t.config,
          { widthValue: u, heightValue: c } = t.config;
        if (!We) return { widthValue: u, heightValue: c };
        if (s === pt) {
          let h = r(e, et);
          i(e, et, ""), (u = o(e, "offsetWidth")), i(e, et, h);
        }
        if (a === pt) {
          let h = r(e, tt);
          i(e, tt, ""), (c = o(e, "offsetHeight")), i(e, tt, h);
        }
        return { widthValue: u, heightValue: c };
      }
      case Wt:
      case zt:
      case Kt: {
        let {
          rValue: r,
          gValue: i,
          bValue: o,
          aValue: s,
          globalSwatchId: a,
        } = t.config;
        if (a && a.startsWith("--")) {
          let { getStyle: u } = n,
            c = u(e, a),
            h = (0, Wd.normalizeColor)(c);
          return {
            rValue: h.red,
            gValue: h.green,
            bValue: h.blue,
            aValue: h.alpha,
          };
        }
        return { rValue: r, gValue: i, bValue: o, aValue: s };
      }
      case An:
        return t.config.filters.reduce(RR, {});
      case wn:
        return t.config.fontVariations.reduce(CR, {});
      default: {
        let { value: r } = t.config;
        return { value: r };
      }
    }
  }
  function Zd(e) {
    if (/^TRANSFORM_/.test(e)) return Kd;
    if (/^STYLE_/.test(e)) return To;
    if (/^GENERAL_/.test(e)) return Io;
    if (/^PLUGIN_/.test(e)) return jd;
  }
  function NR(e, t) {
    return e === To ? t.replace("STYLE_", "").toLowerCase() : null;
  }
  function DR(e, t, n, r, i, o, s, a, u) {
    switch (a) {
      case Kd:
        return XR(e, t, n, i, s);
      case To:
        return jR(e, t, n, i, o, s);
      case Io:
        return YR(e, i, s);
      case jd: {
        let { actionTypeId: c } = i;
        if (mt(c)) return go(c)(u, t, i);
      }
    }
  }
  function XR(e, t, n, r, i) {
    let o = GR.map((a) => {
        let u = wo[a],
          {
            xValue: c = u.xValue,
            yValue: h = u.yValue,
            zValue: p = u.zValue,
            xUnit: d = "",
            yUnit: E = "",
            zUnit: I = "",
          } = t[a] || {};
        switch (a) {
          case kt:
            return `${rR}(${c}${d}, ${h}${E}, ${p}${I})`;
          case Ht:
            return `${iR}(${c}${d}, ${h}${E}, ${p}${I})`;
          case Ut:
            return `${oR}(${c}${d}) ${aR}(${h}${E}) ${sR}(${p}${I})`;
          case bn:
            return `${uR}(${c}${d}, ${h}${E})`;
          default:
            return "";
        }
      }).join(" "),
      { setStyle: s } = i;
    It(e, dt, i), s(e, dt, o), HR(r, n) && s(e, fr, cR);
  }
  function VR(e, t, n, r) {
    let i = (0, Ir.default)(t, (s, a, u) => `${s} ${u}(${a}${qR(u, n)})`, ""),
      { setStyle: o } = r;
    It(e, _n, r), o(e, _n, i);
  }
  function kR(e, t, n, r) {
    let i = (0, Ir.default)(
        t,
        (s, a, u) => (s.push(`"${u}" ${a}`), s),
        []
      ).join(", "),
      { setStyle: o } = r;
    It(e, In, r), o(e, In, i);
  }
  function HR({ actionTypeId: e }, { xValue: t, yValue: n, zValue: r }) {
    return (
      (e === kt && r !== void 0) ||
      (e === Ht && r !== void 0) ||
      (e === Ut && (t !== void 0 || n !== void 0))
    );
  }
  function zR(e, t) {
    let n = e.exec(t);
    return n ? n[1] : "";
  }
  function KR({ element: e, actionTypeId: t, computedStyle: n, getStyle: r }) {
    let i = bo[t],
      o = r(e, i),
      s = BR.test(o) ? o : n[i],
      a = zR(WR, s).split(Tn);
    return {
      rValue: (0, ot.default)(parseInt(a[0], 10), 255),
      gValue: (0, ot.default)(parseInt(a[1], 10), 255),
      bValue: (0, ot.default)(parseInt(a[2], 10), 255),
      aValue: (0, ot.default)(parseFloat(a[3]), 1),
    };
  }
  function jR(e, t, n, r, i, o) {
    let { setStyle: s } = o;
    switch (r.actionTypeId) {
      case Bt: {
        let { widthUnit: a = "", heightUnit: u = "" } = r.config,
          { widthValue: c, heightValue: h } = n;
        c !== void 0 && (a === pt && (a = "px"), It(e, et, o), s(e, et, c + a)),
          h !== void 0 &&
            (u === pt && (u = "px"), It(e, tt, o), s(e, tt, h + u));
        break;
      }
      case An: {
        VR(e, n, r.config, o);
        break;
      }
      case wn: {
        kR(e, n, r.config, o);
        break;
      }
      case Wt:
      case zt:
      case Kt: {
        let a = bo[r.actionTypeId],
          u = Math.round(n.rValue),
          c = Math.round(n.gValue),
          h = Math.round(n.bValue),
          p = n.aValue;
        It(e, a, o),
          s(e, a, p >= 1 ? `rgb(${u},${c},${h})` : `rgba(${u},${c},${h},${p})`);
        break;
      }
      default: {
        let { unit: a = "" } = r.config;
        It(e, i, o), s(e, i, n.value + a);
        break;
      }
    }
  }
  function YR(e, t, n) {
    let { setStyle: r } = n;
    switch (t.actionTypeId) {
      case br: {
        let { value: i } = t.config;
        i === lR && We ? r(e, _r, Yi) : r(e, _r, i);
        return;
      }
    }
  }
  function It(e, t, n) {
    if (!We) return;
    let r = $d[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Vt);
    if (!s) {
      o(e, Vt, r);
      return;
    }
    let a = s.split(Tn).map(Qd);
    a.indexOf(r) === -1 && o(e, Vt, a.concat(r).join(Tn));
  }
  function Jd(e, t, n) {
    if (!We) return;
    let r = $d[t];
    if (!r) return;
    let { getStyle: i, setStyle: o } = n,
      s = i(e, Vt);
    !s ||
      s.indexOf(r) === -1 ||
      o(
        e,
        Vt,
        s
          .split(Tn)
          .map(Qd)
          .filter((a) => a !== r)
          .join(Tn)
      );
  }
  function QR({ store: e, elementApi: t }) {
    let { ixData: n } = e.getState(),
      { events: r = {}, actionLists: i = {} } = n;
    Object.keys(r).forEach((o) => {
      let s = r[o],
        { config: a } = s.action,
        { actionListId: u } = a,
        c = i[u];
      c && Ud({ actionList: c, event: s, elementApi: t });
    }),
      Object.keys(i).forEach((o) => {
        Ud({ actionList: i[o], elementApi: t });
      });
  }
  function Ud({ actionList: e = {}, event: t, elementApi: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e;
    r &&
      r.forEach((o) => {
        Bd({ actionGroup: o, event: t, elementApi: n });
      }),
      i &&
        i.forEach((o) => {
          let { continuousActionGroups: s } = o;
          s.forEach((a) => {
            Bd({ actionGroup: a, event: t, elementApi: n });
          });
        });
  }
  function Bd({ actionGroup: e, event: t, elementApi: n }) {
    let { actionItems: r } = e;
    r.forEach((i) => {
      let { actionTypeId: o, config: s } = i,
        a;
      mt(o)
        ? (a = (u) => ho(o)(u, i))
        : (a = ep({ effect: ZR, actionTypeId: o, elementApi: n })),
        Ao({ config: s, event: t, elementApi: n }).forEach(a);
    });
  }
  function $R(e, t, n) {
    let { setStyle: r, getStyle: i } = n,
      { actionTypeId: o } = t;
    if (o === Bt) {
      let { config: s } = t;
      s.widthUnit === pt && r(e, et, ""), s.heightUnit === pt && r(e, tt, "");
    }
    i(e, Vt) && ep({ effect: Jd, actionTypeId: o, elementApi: n })(e);
  }
  function ZR(e, t, n) {
    let { setStyle: r } = n;
    Jd(e, t, n), r(e, t, ""), t === dt && r(e, fr, "");
  }
  function tp(e) {
    let t = 0,
      n = 0;
    return (
      e.forEach((r, i) => {
        let { config: o } = r,
          s = o.delay + o.duration;
        s >= t && ((t = s), (n = i));
      }),
      n
    );
  }
  function JR(e, t) {
    let { actionItemGroups: n, useFirstGroupAsInitialState: r } = e,
      { actionItem: i, verboseTimeElapsed: o = 0 } = t,
      s = 0,
      a = 0;
    return (
      n.forEach((u, c) => {
        if (r && c === 0) return;
        let { actionItems: h } = u,
          p = h[tp(h)],
          { config: d, actionTypeId: E } = p;
        i.id === p.id && (a = s + o);
        let I = Zd(E) === Io ? 0 : d.duration;
        s += d.delay + I;
      }),
      s > 0 ? mn(a / s) : 0
    );
  }
  function eC({ actionList: e, actionItemId: t, rawData: n }) {
    let { actionItemGroups: r, continuousParameterGroups: i } = e,
      o = [],
      s = (a) => (
        o.push((0, Tr.mergeIn)(a, ["config"], { delay: 0, duration: 0 })),
        a.id === t
      );
    return (
      r && r.some(({ actionItems: a }) => a.some(s)),
      i &&
        i.some((a) => {
          let { continuousActionGroups: u } = a;
          return u.some(({ actionItems: c }) => c.some(s));
        }),
      (0, Tr.setIn)(n, ["actionLists"], {
        [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
      })
    );
  }
  function tC(e, { basedOn: t }) {
    return (
      (e === Be.SCROLLING_IN_VIEW && (t === Ze.ELEMENT || t == null)) ||
      (e === Be.MOUSE_MOVE && t === Ze.ELEMENT)
    );
  }
  function nC(e, t) {
    return e + hR + t;
  }
  function rC(e, t) {
    return t == null ? !0 : e.indexOf(t) !== -1;
  }
  function iC(e, t) {
    return mo(e && e.sort(), t && t.sort());
  }
  function oC(e) {
    if (typeof e == "string") return e;
    if (e.pluginElement && e.objectId) return e.pluginElement + _o + e.objectId;
    if (e.objectId) return e.objectId;
    let { id: t = "", selector: n = "", useEventTarget: r = "" } = e;
    return t + _o + n + _o + r;
  }
  var ot,
    Ir,
    vr,
    Tr,
    Wd,
    tR,
    nR,
    rR,
    iR,
    oR,
    aR,
    sR,
    uR,
    cR,
    lR,
    mr,
    _n,
    In,
    et,
    tt,
    zd,
    fR,
    dR,
    Xd,
    pR,
    Vd,
    gR,
    _r,
    Vt,
    pt,
    Tn,
    hR,
    _o,
    Kd,
    Io,
    To,
    jd,
    kt,
    Ht,
    Ut,
    bn,
    Yd,
    An,
    wn,
    Bt,
    Wt,
    zt,
    Kt,
    br,
    ER,
    Qd,
    bo,
    $d,
    yr,
    vR,
    _R,
    bR,
    Hd,
    OR,
    SR,
    RR,
    CR,
    PR,
    wo,
    MR,
    FR,
    qR,
    GR,
    UR,
    BR,
    WR,
    ep,
    rp = pe(() => {
      "use strict";
      (ot = ae(vd())), (Ir = ae(Ld())), (vr = ae(Fd())), (Tr = ae(Ct()));
      De();
      Gd();
      Zi();
      Wd = ae(ao());
      Eo();
      dr();
      ({
        BACKGROUND: tR,
        TRANSFORM: nR,
        TRANSLATE_3D: rR,
        SCALE_3D: iR,
        ROTATE_X: oR,
        ROTATE_Y: aR,
        ROTATE_Z: sR,
        SKEW: uR,
        PRESERVE_3D: cR,
        FLEX: lR,
        OPACITY: mr,
        FILTER: _n,
        FONT_VARIATION_SETTINGS: In,
        WIDTH: et,
        HEIGHT: tt,
        BACKGROUND_COLOR: zd,
        BORDER_COLOR: fR,
        COLOR: dR,
        CHILDREN: Xd,
        IMMEDIATE_CHILDREN: pR,
        SIBLINGS: Vd,
        PARENT: gR,
        DISPLAY: _r,
        WILL_CHANGE: Vt,
        AUTO: pt,
        COMMA_DELIMITER: Tn,
        COLON_DELIMITER: hR,
        BAR_DELIMITER: _o,
        RENDER_TRANSFORM: Kd,
        RENDER_GENERAL: Io,
        RENDER_STYLE: To,
        RENDER_PLUGIN: jd,
      } = Oe),
        ({
          TRANSFORM_MOVE: kt,
          TRANSFORM_SCALE: Ht,
          TRANSFORM_ROTATE: Ut,
          TRANSFORM_SKEW: bn,
          STYLE_OPACITY: Yd,
          STYLE_FILTER: An,
          STYLE_FONT_VARIATION: wn,
          STYLE_SIZE: Bt,
          STYLE_BACKGROUND_COLOR: Wt,
          STYLE_BORDER: zt,
          STYLE_TEXT_COLOR: Kt,
          GENERAL_DISPLAY: br,
          OBJECT_VALUE: ER,
        } = Re),
        (Qd = (e) => e.trim()),
        (bo = Object.freeze({ [Wt]: zd, [zt]: fR, [Kt]: dR })),
        ($d = Object.freeze({
          [dt]: nR,
          [zd]: tR,
          [mr]: mr,
          [_n]: _n,
          [et]: et,
          [tt]: tt,
          [In]: In,
        })),
        (yr = new Map());
      vR = 1;
      _R = 1;
      bR = (e, t) => e === t;
      (Hd = /px/),
        (OR = (e, t) =>
          t.reduce(
            (n, r) => (n[r.type] == null && (n[r.type] = MR[r.type]), n),
            e || {}
          )),
        (SR = (e, t) =>
          t.reduce(
            (n, r) => (
              n[r.type] == null &&
                (n[r.type] = FR[r.type] || r.defaultValue || 0),
              n
            ),
            e || {}
          ));
      (RR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (CR = (e, t) => (t && (e[t.type] = t.value || 0), e)),
        (PR = (e, t, n) => {
          if (mt(e)) return lo(e)(n, t);
          switch (e) {
            case An: {
              let r = (0, vr.default)(n.filters, ({ type: i }) => i === t);
              return r ? r.value : 0;
            }
            case wn: {
              let r = (0, vr.default)(
                n.fontVariations,
                ({ type: i }) => i === t
              );
              return r ? r.value : 0;
            }
            default:
              return n[t];
          }
        });
      (wo = {
        [kt]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [Ht]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
        [Ut]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
        [bn]: Object.freeze({ xValue: 0, yValue: 0 }),
      }),
        (MR = Object.freeze({
          blur: 0,
          "hue-rotate": 0,
          invert: 0,
          grayscale: 0,
          saturate: 100,
          sepia: 0,
          contrast: 100,
          brightness: 100,
        })),
        (FR = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
        (qR = (e, t) => {
          let n = (0, vr.default)(t.filters, ({ type: r }) => r === e);
          if (n && n.unit) return n.unit;
          switch (e) {
            case "blur":
              return "px";
            case "hue-rotate":
              return "deg";
            default:
              return "%";
          }
        }),
        (GR = Object.keys(wo));
      (UR = "\\(([^)]+)\\)"), (BR = /^rgb/), (WR = RegExp(`rgba?${UR}`));
      ep =
        ({ effect: e, actionTypeId: t, elementApi: n }) =>
        (r) => {
          switch (t) {
            case kt:
            case Ht:
            case Ut:
            case bn:
              e(r, dt, n);
              break;
            case An:
              e(r, _n, n);
              break;
            case wn:
              e(r, In, n);
              break;
            case Yd:
              e(r, mr, n);
              break;
            case Bt:
              e(r, et, n), e(r, tt, n);
              break;
            case Wt:
            case zt:
            case Kt:
              e(r, bo[t], n);
              break;
            case br:
              e(r, _r, n);
              break;
          }
        };
    });
  var Tt = f((Oo) => {
    "use strict";
    Object.defineProperty(Oo, "__esModule", { value: !0 });
    function aC(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    aC(Oo, {
      IX2BrowserSupport: function () {
        return sC;
      },
      IX2EasingUtils: function () {
        return cC;
      },
      IX2Easings: function () {
        return uC;
      },
      IX2ElementsReducer: function () {
        return lC;
      },
      IX2VanillaPlugins: function () {
        return fC;
      },
      IX2VanillaUtils: function () {
        return dC;
      },
    });
    var sC = jt((dr(), Ye(Qf))),
      uC = jt(($i(), Ye(vn))),
      cC = jt((Zi(), Ye(rd))),
      lC = jt((sd(), Ye(ad))),
      fC = jt((Eo(), Ye(Ed))),
      dC = jt((rp(), Ye(np)));
    function ip(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (ip = function (r) {
        return r ? n : t;
      })(e);
    }
    function jt(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = ip(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
  });
  var wr,
    at,
    pC,
    gC,
    hC,
    EC,
    yC,
    vC,
    Ar,
    op,
    mC,
    _C,
    So,
    IC,
    TC,
    bC,
    AC,
    ap,
    sp = pe(() => {
      "use strict";
      De();
      (wr = ae(Tt())),
        (at = ae(Ct())),
        ({
          IX2_RAW_DATA_IMPORTED: pC,
          IX2_SESSION_STOPPED: gC,
          IX2_INSTANCE_ADDED: hC,
          IX2_INSTANCE_STARTED: EC,
          IX2_INSTANCE_REMOVED: yC,
          IX2_ANIMATION_FRAME_CHANGED: vC,
        } = Ie),
        ({
          optimizeFloat: Ar,
          applyEasing: op,
          createBezierEasing: mC,
        } = wr.IX2EasingUtils),
        ({ RENDER_GENERAL: _C } = Oe),
        ({
          getItemConfigByKey: So,
          getRenderType: IC,
          getStyleProp: TC,
        } = wr.IX2VanillaUtils),
        (bC = (e, t) => {
          let {
              position: n,
              parameterId: r,
              actionGroups: i,
              destinationKeys: o,
              smoothing: s,
              restingValue: a,
              actionTypeId: u,
              customEasingFn: c,
              skipMotion: h,
              skipToValue: p,
            } = e,
            { parameters: d } = t.payload,
            E = Math.max(1 - s, 0.01),
            I = d[r];
          I == null && ((E = 1), (I = a));
          let _ = Math.max(I, 0) || 0,
            w = Ar(_ - n),
            v = h ? p : Ar(n + w * E),
            x = v * 100;
          if (v === n && e.current) return e;
          let A, S, P, R;
          for (let V = 0, { length: U } = i; V < U; V++) {
            let { keyframe: W, actionItems: j } = i[V];
            if ((V === 0 && (A = j[0]), x >= W)) {
              A = j[0];
              let N = i[V + 1],
                T = N && x !== W;
              (S = T ? N.actionItems[0] : null),
                T && ((P = W / 100), (R = (N.keyframe - W) / 100));
            }
          }
          let X = {};
          if (A && !S)
            for (let V = 0, { length: U } = o; V < U; V++) {
              let W = o[V];
              X[W] = So(u, W, A.config);
            }
          else if (A && S && P !== void 0 && R !== void 0) {
            let V = (v - P) / R,
              U = A.config.easing,
              W = op(U, V, c);
            for (let j = 0, { length: N } = o; j < N; j++) {
              let T = o[j],
                D = So(u, T, A.config),
                Y = (So(u, T, S.config) - D) * W + D;
              X[T] = Y;
            }
          }
          return (0, at.merge)(e, { position: v, current: X });
        }),
        (AC = (e, t) => {
          let {
              active: n,
              origin: r,
              start: i,
              immediate: o,
              renderType: s,
              verbose: a,
              actionItem: u,
              destination: c,
              destinationKeys: h,
              pluginDuration: p,
              instanceDelay: d,
              customEasingFn: E,
              skipMotion: I,
            } = e,
            _ = u.config.easing,
            { duration: w, delay: v } = u.config;
          p != null && (w = p),
            (v = d ?? v),
            s === _C ? (w = 0) : (o || I) && (w = v = 0);
          let { now: x } = t.payload;
          if (n && r) {
            let A = x - (i + v);
            if (a) {
              let V = x - i,
                U = w + v,
                W = Ar(Math.min(Math.max(0, V / U), 1));
              e = (0, at.set)(e, "verboseTimeElapsed", U * W);
            }
            if (A < 0) return e;
            let S = Ar(Math.min(Math.max(0, A / w), 1)),
              P = op(_, S, E),
              R = {},
              X = null;
            return (
              h.length &&
                (X = h.reduce((V, U) => {
                  let W = c[U],
                    j = parseFloat(r[U]) || 0,
                    T = (parseFloat(W) - j) * P + j;
                  return (V[U] = T), V;
                }, {})),
              (R.current = X),
              (R.position = S),
              S === 1 && ((R.active = !1), (R.complete = !0)),
              (0, at.merge)(e, R)
            );
          }
          return e;
        }),
        (ap = (e = Object.freeze({}), t) => {
          switch (t.type) {
            case pC:
              return t.payload.ixInstances || Object.freeze({});
            case gC:
              return Object.freeze({});
            case hC: {
              let {
                  instanceId: n,
                  elementId: r,
                  actionItem: i,
                  eventId: o,
                  eventTarget: s,
                  eventStateKey: a,
                  actionListId: u,
                  groupIndex: c,
                  isCarrier: h,
                  origin: p,
                  destination: d,
                  immediate: E,
                  verbose: I,
                  continuous: _,
                  parameterId: w,
                  actionGroups: v,
                  smoothing: x,
                  restingValue: A,
                  pluginInstance: S,
                  pluginDuration: P,
                  instanceDelay: R,
                  skipMotion: X,
                  skipToValue: V,
                } = t.payload,
                { actionTypeId: U } = i,
                W = IC(U),
                j = TC(W, U),
                N = Object.keys(d).filter(
                  (D) => d[D] != null && typeof d[D] != "string"
                ),
                { easing: T } = i.config;
              return (0, at.set)(e, n, {
                id: n,
                elementId: r,
                active: !1,
                position: 0,
                start: 0,
                origin: p,
                destination: d,
                destinationKeys: N,
                immediate: E,
                verbose: I,
                current: null,
                actionItem: i,
                actionTypeId: U,
                eventId: o,
                eventTarget: s,
                eventStateKey: a,
                actionListId: u,
                groupIndex: c,
                renderType: W,
                isCarrier: h,
                styleProp: j,
                continuous: _,
                parameterId: w,
                actionGroups: v,
                smoothing: x,
                restingValue: A,
                pluginInstance: S,
                pluginDuration: P,
                instanceDelay: R,
                skipMotion: X,
                skipToValue: V,
                customEasingFn:
                  Array.isArray(T) && T.length === 4 ? mC(T) : void 0,
              });
            }
            case EC: {
              let { instanceId: n, time: r } = t.payload;
              return (0, at.mergeIn)(e, [n], {
                active: !0,
                complete: !1,
                start: r,
              });
            }
            case yC: {
              let { instanceId: n } = t.payload;
              if (!e[n]) return e;
              let r = {},
                i = Object.keys(e),
                { length: o } = i;
              for (let s = 0; s < o; s++) {
                let a = i[s];
                a !== n && (r[a] = e[a]);
              }
              return r;
            }
            case vC: {
              let n = e,
                r = Object.keys(e),
                { length: i } = r;
              for (let o = 0; o < i; o++) {
                let s = r[o],
                  a = e[s],
                  u = a.continuous ? bC : AC;
                n = (0, at.set)(n, s, u(a, t));
              }
              return n;
            }
            default:
              return e;
          }
        });
    });
  var wC,
    OC,
    SC,
    up,
    cp = pe(() => {
      "use strict";
      De();
      ({
        IX2_RAW_DATA_IMPORTED: wC,
        IX2_SESSION_STOPPED: OC,
        IX2_PARAMETER_CHANGED: SC,
      } = Ie),
        (up = (e = {}, t) => {
          switch (t.type) {
            case wC:
              return t.payload.ixParameters || {};
            case OC:
              return {};
            case SC: {
              let { key: n, value: r } = t.payload;
              return (e[n] = r), e;
            }
            default:
              return e;
          }
        });
    });
  var dp = {};
  Ne(dp, { default: () => RC });
  var lp,
    fp,
    xC,
    RC,
    pp = pe(() => {
      "use strict";
      lp = ae(Ei());
      _s();
      ks();
      Bs();
      fp = ae(Tt());
      sp();
      cp();
      ({ ixElements: xC } = fp.IX2ElementsReducer),
        (RC = (0, lp.combineReducers)({
          ixData: ms,
          ixRequest: Vs,
          ixSession: Us,
          ixElements: xC,
          ixInstances: ap,
          ixParameters: up,
        }));
    });
  var hp = f((pG, gp) => {
    var CC = ct(),
      PC = be(),
      LC = rt(),
      NC = "[object String]";
    function DC(e) {
      return typeof e == "string" || (!PC(e) && LC(e) && CC(e) == NC);
    }
    gp.exports = DC;
  });
  var yp = f((gG, Ep) => {
    var MC = Bi(),
      FC = MC("length");
    Ep.exports = FC;
  });
  var mp = f((hG, vp) => {
    var qC = "\\ud800-\\udfff",
      GC = "\\u0300-\\u036f",
      XC = "\\ufe20-\\ufe2f",
      VC = "\\u20d0-\\u20ff",
      kC = GC + XC + VC,
      HC = "\\ufe0e\\ufe0f",
      UC = "\\u200d",
      BC = RegExp("[" + UC + qC + kC + HC + "]");
    function WC(e) {
      return BC.test(e);
    }
    vp.exports = WC;
  });
  var xp = f((EG, Sp) => {
    var Ip = "\\ud800-\\udfff",
      zC = "\\u0300-\\u036f",
      KC = "\\ufe20-\\ufe2f",
      jC = "\\u20d0-\\u20ff",
      YC = zC + KC + jC,
      QC = "\\ufe0e\\ufe0f",
      $C = "[" + Ip + "]",
      xo = "[" + YC + "]",
      Ro = "\\ud83c[\\udffb-\\udfff]",
      ZC = "(?:" + xo + "|" + Ro + ")",
      Tp = "[^" + Ip + "]",
      bp = "(?:\\ud83c[\\udde6-\\uddff]){2}",
      Ap = "[\\ud800-\\udbff][\\udc00-\\udfff]",
      JC = "\\u200d",
      wp = ZC + "?",
      Op = "[" + QC + "]?",
      eP = "(?:" + JC + "(?:" + [Tp, bp, Ap].join("|") + ")" + Op + wp + ")*",
      tP = Op + wp + eP,
      nP = "(?:" + [Tp + xo + "?", xo, bp, Ap, $C].join("|") + ")",
      _p = RegExp(Ro + "(?=" + Ro + ")|" + nP + tP, "g");
    function rP(e) {
      for (var t = (_p.lastIndex = 0); _p.test(e); ) ++t;
      return t;
    }
    Sp.exports = rP;
  });
  var Cp = f((yG, Rp) => {
    var iP = yp(),
      oP = mp(),
      aP = xp();
    function sP(e) {
      return oP(e) ? aP(e) : iP(e);
    }
    Rp.exports = sP;
  });
  var Lp = f((vG, Pp) => {
    var uP = nr(),
      cP = rr(),
      lP = yt(),
      fP = hp(),
      dP = Cp(),
      pP = "[object Map]",
      gP = "[object Set]";
    function hP(e) {
      if (e == null) return 0;
      if (lP(e)) return fP(e) ? dP(e) : e.length;
      var t = cP(e);
      return t == pP || t == gP ? e.size : uP(e).length;
    }
    Pp.exports = hP;
  });
  var Dp = f((mG, Np) => {
    var EP = "Expected a function";
    function yP(e) {
      if (typeof e != "function") throw new TypeError(EP);
      return function () {
        var t = arguments;
        switch (t.length) {
          case 0:
            return !e.call(this);
          case 1:
            return !e.call(this, t[0]);
          case 2:
            return !e.call(this, t[0], t[1]);
          case 3:
            return !e.call(this, t[0], t[1], t[2]);
        }
        return !e.apply(this, t);
      };
    }
    Np.exports = yP;
  });
  var Co = f((_G, Mp) => {
    var vP = lt(),
      mP = (function () {
        try {
          var e = vP(Object, "defineProperty");
          return e({}, "", {}), e;
        } catch {}
      })();
    Mp.exports = mP;
  });
  var Po = f((IG, qp) => {
    var Fp = Co();
    function _P(e, t, n) {
      t == "__proto__" && Fp
        ? Fp(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 })
        : (e[t] = n);
    }
    qp.exports = _P;
  });
  var Xp = f((TG, Gp) => {
    var IP = Po(),
      TP = zn(),
      bP = Object.prototype,
      AP = bP.hasOwnProperty;
    function wP(e, t, n) {
      var r = e[t];
      (!(AP.call(e, t) && TP(r, n)) || (n === void 0 && !(t in e))) &&
        IP(e, t, n);
    }
    Gp.exports = wP;
  });
  var Hp = f((bG, kp) => {
    var OP = Xp(),
      SP = hn(),
      xP = Zn(),
      Vp = Je(),
      RP = Gt();
    function CP(e, t, n, r) {
      if (!Vp(e)) return e;
      t = SP(t, e);
      for (var i = -1, o = t.length, s = o - 1, a = e; a != null && ++i < o; ) {
        var u = RP(t[i]),
          c = n;
        if (u === "__proto__" || u === "constructor" || u === "prototype")
          return e;
        if (i != s) {
          var h = a[u];
          (c = r ? r(h, u, a) : void 0),
            c === void 0 && (c = Vp(h) ? h : xP(t[i + 1]) ? [] : {});
        }
        OP(a, u, c), (a = a[u]);
      }
      return e;
    }
    kp.exports = CP;
  });
  var Bp = f((AG, Up) => {
    var PP = ar(),
      LP = Hp(),
      NP = hn();
    function DP(e, t, n) {
      for (var r = -1, i = t.length, o = {}; ++r < i; ) {
        var s = t[r],
          a = PP(e, s);
        n(a, s) && LP(o, NP(s, e), a);
      }
      return o;
    }
    Up.exports = DP;
  });
  var zp = f((wG, Wp) => {
    var MP = Qn(),
      FP = ri(),
      qP = Ri(),
      GP = xi(),
      XP = Object.getOwnPropertySymbols,
      VP = XP
        ? function (e) {
            for (var t = []; e; ) MP(t, qP(e)), (e = FP(e));
            return t;
          }
        : GP;
    Wp.exports = VP;
  });
  var jp = f((OG, Kp) => {
    function kP(e) {
      var t = [];
      if (e != null) for (var n in Object(e)) t.push(n);
      return t;
    }
    Kp.exports = kP;
  });
  var Qp = f((SG, Yp) => {
    var HP = Je(),
      UP = tr(),
      BP = jp(),
      WP = Object.prototype,
      zP = WP.hasOwnProperty;
    function KP(e) {
      if (!HP(e)) return BP(e);
      var t = UP(e),
        n = [];
      for (var r in e)
        (r == "constructor" && (t || !zP.call(e, r))) || n.push(r);
      return n;
    }
    Yp.exports = KP;
  });
  var Zp = f((xG, $p) => {
    var jP = Pi(),
      YP = Qp(),
      QP = yt();
    function $P(e) {
      return QP(e) ? jP(e, !0) : YP(e);
    }
    $p.exports = $P;
  });
  var eg = f((RG, Jp) => {
    var ZP = Si(),
      JP = zp(),
      eL = Zp();
    function tL(e) {
      return ZP(e, eL, JP);
    }
    Jp.exports = tL;
  });
  var ng = f((CG, tg) => {
    var nL = Ui(),
      rL = ft(),
      iL = Bp(),
      oL = eg();
    function aL(e, t) {
      if (e == null) return {};
      var n = nL(oL(e), function (r) {
        return [r];
      });
      return (
        (t = rL(t)),
        iL(e, n, function (r, i) {
          return t(r, i[0]);
        })
      );
    }
    tg.exports = aL;
  });
  var ig = f((PG, rg) => {
    var sL = ft(),
      uL = Dp(),
      cL = ng();
    function lL(e, t) {
      return cL(e, uL(sL(t)));
    }
    rg.exports = lL;
  });
  var ag = f((LG, og) => {
    var fL = nr(),
      dL = rr(),
      pL = cn(),
      gL = be(),
      hL = yt(),
      EL = $n(),
      yL = tr(),
      vL = er(),
      mL = "[object Map]",
      _L = "[object Set]",
      IL = Object.prototype,
      TL = IL.hasOwnProperty;
    function bL(e) {
      if (e == null) return !0;
      if (
        hL(e) &&
        (gL(e) ||
          typeof e == "string" ||
          typeof e.splice == "function" ||
          EL(e) ||
          vL(e) ||
          pL(e))
      )
        return !e.length;
      var t = dL(e);
      if (t == mL || t == _L) return !e.size;
      if (yL(e)) return !fL(e).length;
      for (var n in e) if (TL.call(e, n)) return !1;
      return !0;
    }
    og.exports = bL;
  });
  var ug = f((NG, sg) => {
    var AL = Po(),
      wL = yo(),
      OL = ft();
    function SL(e, t) {
      var n = {};
      return (
        (t = OL(t, 3)),
        wL(e, function (r, i, o) {
          AL(n, i, t(r, i, o));
        }),
        n
      );
    }
    sg.exports = SL;
  });
  var lg = f((DG, cg) => {
    function xL(e, t) {
      for (
        var n = -1, r = e == null ? 0 : e.length;
        ++n < r && t(e[n], n, e) !== !1;

      );
      return e;
    }
    cg.exports = xL;
  });
  var dg = f((MG, fg) => {
    var RL = ur();
    function CL(e) {
      return typeof e == "function" ? e : RL;
    }
    fg.exports = CL;
  });
  var gg = f((FG, pg) => {
    var PL = lg(),
      LL = vo(),
      NL = dg(),
      DL = be();
    function ML(e, t) {
      var n = DL(e) ? PL : LL;
      return n(e, NL(t));
    }
    pg.exports = ML;
  });
  var Eg = f((qG, hg) => {
    var FL = Ue(),
      qL = function () {
        return FL.Date.now();
      };
    hg.exports = qL;
  });
  var mg = f((GG, vg) => {
    var GL = Je(),
      Lo = Eg(),
      yg = cr(),
      XL = "Expected a function",
      VL = Math.max,
      kL = Math.min;
    function HL(e, t, n) {
      var r,
        i,
        o,
        s,
        a,
        u,
        c = 0,
        h = !1,
        p = !1,
        d = !0;
      if (typeof e != "function") throw new TypeError(XL);
      (t = yg(t) || 0),
        GL(n) &&
          ((h = !!n.leading),
          (p = "maxWait" in n),
          (o = p ? VL(yg(n.maxWait) || 0, t) : o),
          (d = "trailing" in n ? !!n.trailing : d));
      function E(R) {
        var X = r,
          V = i;
        return (r = i = void 0), (c = R), (s = e.apply(V, X)), s;
      }
      function I(R) {
        return (c = R), (a = setTimeout(v, t)), h ? E(R) : s;
      }
      function _(R) {
        var X = R - u,
          V = R - c,
          U = t - X;
        return p ? kL(U, o - V) : U;
      }
      function w(R) {
        var X = R - u,
          V = R - c;
        return u === void 0 || X >= t || X < 0 || (p && V >= o);
      }
      function v() {
        var R = Lo();
        if (w(R)) return x(R);
        a = setTimeout(v, _(R));
      }
      function x(R) {
        return (a = void 0), d && r ? E(R) : ((r = i = void 0), s);
      }
      function A() {
        a !== void 0 && clearTimeout(a), (c = 0), (r = u = i = a = void 0);
      }
      function S() {
        return a === void 0 ? s : x(Lo());
      }
      function P() {
        var R = Lo(),
          X = w(R);
        if (((r = arguments), (i = this), (u = R), X)) {
          if (a === void 0) return I(u);
          if (p) return clearTimeout(a), (a = setTimeout(v, t)), E(u);
        }
        return a === void 0 && (a = setTimeout(v, t)), s;
      }
      return (P.cancel = A), (P.flush = S), P;
    }
    vg.exports = HL;
  });
  var Ig = f((XG, _g) => {
    var UL = mg(),
      BL = Je(),
      WL = "Expected a function";
    function zL(e, t, n) {
      var r = !0,
        i = !0;
      if (typeof e != "function") throw new TypeError(WL);
      return (
        BL(n) &&
          ((r = "leading" in n ? !!n.leading : r),
          (i = "trailing" in n ? !!n.trailing : i)),
        UL(e, t, { leading: r, maxWait: t, trailing: i })
      );
    }
    _g.exports = zL;
  });
  var bg = {};
  Ne(bg, {
    actionListPlaybackChanged: () => Qt,
    animationFrameChanged: () => Sr,
    clearRequested: () => yN,
    elementStateChanged: () => Vo,
    eventListenerAdded: () => Or,
    eventStateChanged: () => qo,
    instanceAdded: () => Go,
    instanceRemoved: () => Xo,
    instanceStarted: () => xr,
    mediaQueriesDefined: () => Ho,
    parameterChanged: () => Yt,
    playbackRequested: () => hN,
    previewRequested: () => gN,
    rawDataImported: () => No,
    sessionInitialized: () => Do,
    sessionStarted: () => Mo,
    sessionStopped: () => Fo,
    stopRequested: () => EN,
    testFrameRendered: () => vN,
    viewportWidthChanged: () => ko,
  });
  var Tg,
    KL,
    jL,
    YL,
    QL,
    $L,
    ZL,
    JL,
    eN,
    tN,
    nN,
    rN,
    iN,
    oN,
    aN,
    sN,
    uN,
    cN,
    lN,
    fN,
    dN,
    pN,
    No,
    Do,
    Mo,
    Fo,
    gN,
    hN,
    EN,
    yN,
    Or,
    vN,
    qo,
    Sr,
    Yt,
    Go,
    xr,
    Xo,
    Vo,
    Qt,
    ko,
    Ho,
    Rr = pe(() => {
      "use strict";
      De();
      (Tg = ae(Tt())),
        ({
          IX2_RAW_DATA_IMPORTED: KL,
          IX2_SESSION_INITIALIZED: jL,
          IX2_SESSION_STARTED: YL,
          IX2_SESSION_STOPPED: QL,
          IX2_PREVIEW_REQUESTED: $L,
          IX2_PLAYBACK_REQUESTED: ZL,
          IX2_STOP_REQUESTED: JL,
          IX2_CLEAR_REQUESTED: eN,
          IX2_EVENT_LISTENER_ADDED: tN,
          IX2_TEST_FRAME_RENDERED: nN,
          IX2_EVENT_STATE_CHANGED: rN,
          IX2_ANIMATION_FRAME_CHANGED: iN,
          IX2_PARAMETER_CHANGED: oN,
          IX2_INSTANCE_ADDED: aN,
          IX2_INSTANCE_STARTED: sN,
          IX2_INSTANCE_REMOVED: uN,
          IX2_ELEMENT_STATE_CHANGED: cN,
          IX2_ACTION_LIST_PLAYBACK_CHANGED: lN,
          IX2_VIEWPORT_WIDTH_CHANGED: fN,
          IX2_MEDIA_QUERIES_DEFINED: dN,
        } = Ie),
        ({ reifyState: pN } = Tg.IX2VanillaUtils),
        (No = (e) => ({ type: KL, payload: { ...pN(e) } })),
        (Do = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
          type: jL,
          payload: { hasBoundaryNodes: e, reducedMotion: t },
        })),
        (Mo = () => ({ type: YL })),
        (Fo = () => ({ type: QL })),
        (gN = ({ rawData: e, defer: t }) => ({
          type: $L,
          payload: { defer: t, rawData: e },
        })),
        (hN = ({
          actionTypeId: e = Re.GENERAL_START_ACTION,
          actionListId: t,
          actionItemId: n,
          eventId: r,
          allowEvents: i,
          immediate: o,
          testManual: s,
          verbose: a,
          rawData: u,
        }) => ({
          type: ZL,
          payload: {
            actionTypeId: e,
            actionListId: t,
            actionItemId: n,
            testManual: s,
            eventId: r,
            allowEvents: i,
            immediate: o,
            verbose: a,
            rawData: u,
          },
        })),
        (EN = (e) => ({ type: JL, payload: { actionListId: e } })),
        (yN = () => ({ type: eN })),
        (Or = (e, t) => ({
          type: tN,
          payload: { target: e, listenerParams: t },
        })),
        (vN = (e = 1) => ({ type: nN, payload: { step: e } })),
        (qo = (e, t) => ({ type: rN, payload: { stateKey: e, newState: t } })),
        (Sr = (e, t) => ({ type: iN, payload: { now: e, parameters: t } })),
        (Yt = (e, t) => ({ type: oN, payload: { key: e, value: t } })),
        (Go = (e) => ({ type: aN, payload: { ...e } })),
        (xr = (e, t) => ({ type: sN, payload: { instanceId: e, time: t } })),
        (Xo = (e) => ({ type: uN, payload: { instanceId: e } })),
        (Vo = (e, t, n, r) => ({
          type: cN,
          payload: { elementId: e, actionTypeId: t, current: n, actionItem: r },
        })),
        (Qt = ({ actionListId: e, isPlaying: t }) => ({
          type: lN,
          payload: { actionListId: e, isPlaying: t },
        })),
        (ko = ({ width: e, mediaQueries: t }) => ({
          type: fN,
          payload: { width: e, mediaQueries: t },
        })),
        (Ho = () => ({ type: dN }));
    });
  var Pe = {};
  Ne(Pe, {
    elementContains: () => Wo,
    getChildElements: () => xN,
    getClosestElement: () => On,
    getProperty: () => bN,
    getQuerySelector: () => Bo,
    getRefType: () => zo,
    getSiblingElements: () => RN,
    getStyle: () => TN,
    getValidDocument: () => wN,
    isSiblingNode: () => SN,
    matchSelector: () => AN,
    queryDocument: () => ON,
    setStyle: () => IN,
  });
  function IN(e, t, n) {
    e.style[t] = n;
  }
  function TN(e, t) {
    return t.startsWith("--")
      ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
      : e.style[t];
  }
  function bN(e, t) {
    return e[t];
  }
  function AN(e) {
    return (t) => t[Uo](e);
  }
  function Bo({ id: e, selector: t }) {
    if (e) {
      let n = e;
      if (e.indexOf(Ag) !== -1) {
        let r = e.split(Ag),
          i = r[0];
        if (((n = r[1]), i !== document.documentElement.getAttribute(Og)))
          return null;
      }
      return `[data-w-id="${n}"], [data-w-id^="${n}_instance"]`;
    }
    return t;
  }
  function wN(e) {
    return e == null || e === document.documentElement.getAttribute(Og)
      ? document
      : null;
  }
  function ON(e, t) {
    return Array.prototype.slice.call(
      document.querySelectorAll(t ? e + " " + t : e)
    );
  }
  function Wo(e, t) {
    return e.contains(t);
  }
  function SN(e, t) {
    return e !== t && e.parentNode === t.parentNode;
  }
  function xN(e) {
    let t = [];
    for (let n = 0, { length: r } = e || []; n < r; n++) {
      let { children: i } = e[n],
        { length: o } = i;
      if (o) for (let s = 0; s < o; s++) t.push(i[s]);
    }
    return t;
  }
  function RN(e = []) {
    let t = [],
      n = [];
    for (let r = 0, { length: i } = e; r < i; r++) {
      let { parentNode: o } = e[r];
      if (!o || !o.children || !o.children.length || n.indexOf(o) !== -1)
        continue;
      n.push(o);
      let s = o.firstElementChild;
      for (; s != null; )
        e.indexOf(s) === -1 && t.push(s), (s = s.nextElementSibling);
    }
    return t;
  }
  function zo(e) {
    return e != null && typeof e == "object"
      ? e instanceof Element
        ? mN
        : _N
      : null;
  }
  var wg,
    Uo,
    Ag,
    mN,
    _N,
    Og,
    On,
    Sg = pe(() => {
      "use strict";
      wg = ae(Tt());
      De();
      ({ ELEMENT_MATCHES: Uo } = wg.IX2BrowserSupport),
        ({
          IX2_ID_DELIMITER: Ag,
          HTML_ELEMENT: mN,
          PLAIN_OBJECT: _N,
          WF_PAGE: Og,
        } = Oe);
      On = Element.prototype.closest
        ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
        : (e, t) => {
            if (!document.documentElement.contains(e)) return null;
            let n = e;
            do {
              if (n[Uo] && n[Uo](t)) return n;
              n = n.parentNode;
            } while (n != null);
            return null;
          };
    });
  var Ko = f((HG, Rg) => {
    var CN = Je(),
      xg = Object.create,
      PN = (function () {
        function e() {}
        return function (t) {
          if (!CN(t)) return {};
          if (xg) return xg(t);
          e.prototype = t;
          var n = new e();
          return (e.prototype = void 0), n;
        };
      })();
    Rg.exports = PN;
  });
  var Cr = f((UG, Cg) => {
    function LN() {}
    Cg.exports = LN;
  });
  var Lr = f((BG, Pg) => {
    var NN = Ko(),
      DN = Cr();
    function Pr(e, t) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__chain__ = !!t),
        (this.__index__ = 0),
        (this.__values__ = void 0);
    }
    Pr.prototype = NN(DN.prototype);
    Pr.prototype.constructor = Pr;
    Pg.exports = Pr;
  });
  var Mg = f((WG, Dg) => {
    var Lg = St(),
      MN = cn(),
      FN = be(),
      Ng = Lg ? Lg.isConcatSpreadable : void 0;
    function qN(e) {
      return FN(e) || MN(e) || !!(Ng && e && e[Ng]);
    }
    Dg.exports = qN;
  });
  var Gg = f((zG, qg) => {
    var GN = Qn(),
      XN = Mg();
    function Fg(e, t, n, r, i) {
      var o = -1,
        s = e.length;
      for (n || (n = XN), i || (i = []); ++o < s; ) {
        var a = e[o];
        t > 0 && n(a)
          ? t > 1
            ? Fg(a, t - 1, n, r, i)
            : GN(i, a)
          : r || (i[i.length] = a);
      }
      return i;
    }
    qg.exports = Fg;
  });
  var Vg = f((KG, Xg) => {
    var VN = Gg();
    function kN(e) {
      var t = e == null ? 0 : e.length;
      return t ? VN(e, 1) : [];
    }
    Xg.exports = kN;
  });
  var Hg = f((jG, kg) => {
    function HN(e, t, n) {
      switch (n.length) {
        case 0:
          return e.call(t);
        case 1:
          return e.call(t, n[0]);
        case 2:
          return e.call(t, n[0], n[1]);
        case 3:
          return e.call(t, n[0], n[1], n[2]);
      }
      return e.apply(t, n);
    }
    kg.exports = HN;
  });
  var Wg = f((YG, Bg) => {
    var UN = Hg(),
      Ug = Math.max;
    function BN(e, t, n) {
      return (
        (t = Ug(t === void 0 ? e.length - 1 : t, 0)),
        function () {
          for (
            var r = arguments, i = -1, o = Ug(r.length - t, 0), s = Array(o);
            ++i < o;

          )
            s[i] = r[t + i];
          i = -1;
          for (var a = Array(t + 1); ++i < t; ) a[i] = r[i];
          return (a[t] = n(s)), UN(e, this, a);
        }
      );
    }
    Bg.exports = BN;
  });
  var Kg = f((QG, zg) => {
    function WN(e) {
      return function () {
        return e;
      };
    }
    zg.exports = WN;
  });
  var Qg = f(($G, Yg) => {
    var zN = Kg(),
      jg = Co(),
      KN = ur(),
      jN = jg
        ? function (e, t) {
            return jg(e, "toString", {
              configurable: !0,
              enumerable: !1,
              value: zN(t),
              writable: !0,
            });
          }
        : KN;
    Yg.exports = jN;
  });
  var Zg = f((ZG, $g) => {
    var YN = 800,
      QN = 16,
      $N = Date.now;
    function ZN(e) {
      var t = 0,
        n = 0;
      return function () {
        var r = $N(),
          i = QN - (r - n);
        if (((n = r), i > 0)) {
          if (++t >= YN) return arguments[0];
        } else t = 0;
        return e.apply(void 0, arguments);
      };
    }
    $g.exports = ZN;
  });
  var eh = f((JG, Jg) => {
    var JN = Qg(),
      eD = Zg(),
      tD = eD(JN);
    Jg.exports = tD;
  });
  var nh = f((eX, th) => {
    var nD = Vg(),
      rD = Wg(),
      iD = eh();
    function oD(e) {
      return iD(rD(e, void 0, nD), e + "");
    }
    th.exports = oD;
  });
  var oh = f((tX, ih) => {
    var rh = Li(),
      aD = rh && new rh();
    ih.exports = aD;
  });
  var sh = f((nX, ah) => {
    function sD() {}
    ah.exports = sD;
  });
  var jo = f((rX, ch) => {
    var uh = oh(),
      uD = sh(),
      cD = uh
        ? function (e) {
            return uh.get(e);
          }
        : uD;
    ch.exports = cD;
  });
  var fh = f((iX, lh) => {
    var lD = {};
    lh.exports = lD;
  });
  var Yo = f((oX, ph) => {
    var dh = fh(),
      fD = Object.prototype,
      dD = fD.hasOwnProperty;
    function pD(e) {
      for (
        var t = e.name + "", n = dh[t], r = dD.call(dh, t) ? n.length : 0;
        r--;

      ) {
        var i = n[r],
          o = i.func;
        if (o == null || o == e) return i.name;
      }
      return t;
    }
    ph.exports = pD;
  });
  var Dr = f((aX, gh) => {
    var gD = Ko(),
      hD = Cr(),
      ED = 4294967295;
    function Nr(e) {
      (this.__wrapped__ = e),
        (this.__actions__ = []),
        (this.__dir__ = 1),
        (this.__filtered__ = !1),
        (this.__iteratees__ = []),
        (this.__takeCount__ = ED),
        (this.__views__ = []);
    }
    Nr.prototype = gD(hD.prototype);
    Nr.prototype.constructor = Nr;
    gh.exports = Nr;
  });
  var Eh = f((sX, hh) => {
    function yD(e, t) {
      var n = -1,
        r = e.length;
      for (t || (t = Array(r)); ++n < r; ) t[n] = e[n];
      return t;
    }
    hh.exports = yD;
  });
  var vh = f((uX, yh) => {
    var vD = Dr(),
      mD = Lr(),
      _D = Eh();
    function ID(e) {
      if (e instanceof vD) return e.clone();
      var t = new mD(e.__wrapped__, e.__chain__);
      return (
        (t.__actions__ = _D(e.__actions__)),
        (t.__index__ = e.__index__),
        (t.__values__ = e.__values__),
        t
      );
    }
    yh.exports = ID;
  });
  var Ih = f((cX, _h) => {
    var TD = Dr(),
      mh = Lr(),
      bD = Cr(),
      AD = be(),
      wD = rt(),
      OD = vh(),
      SD = Object.prototype,
      xD = SD.hasOwnProperty;
    function Mr(e) {
      if (wD(e) && !AD(e) && !(e instanceof TD)) {
        if (e instanceof mh) return e;
        if (xD.call(e, "__wrapped__")) return OD(e);
      }
      return new mh(e);
    }
    Mr.prototype = bD.prototype;
    Mr.prototype.constructor = Mr;
    _h.exports = Mr;
  });
  var bh = f((lX, Th) => {
    var RD = Dr(),
      CD = jo(),
      PD = Yo(),
      LD = Ih();
    function ND(e) {
      var t = PD(e),
        n = LD[t];
      if (typeof n != "function" || !(t in RD.prototype)) return !1;
      if (e === n) return !0;
      var r = CD(n);
      return !!r && e === r[0];
    }
    Th.exports = ND;
  });
  var Sh = f((fX, Oh) => {
    var Ah = Lr(),
      DD = nh(),
      MD = jo(),
      Qo = Yo(),
      FD = be(),
      wh = bh(),
      qD = "Expected a function",
      GD = 8,
      XD = 32,
      VD = 128,
      kD = 256;
    function HD(e) {
      return DD(function (t) {
        var n = t.length,
          r = n,
          i = Ah.prototype.thru;
        for (e && t.reverse(); r--; ) {
          var o = t[r];
          if (typeof o != "function") throw new TypeError(qD);
          if (i && !s && Qo(o) == "wrapper") var s = new Ah([], !0);
        }
        for (r = s ? r : n; ++r < n; ) {
          o = t[r];
          var a = Qo(o),
            u = a == "wrapper" ? MD(o) : void 0;
          u &&
          wh(u[0]) &&
          u[1] == (VD | GD | XD | kD) &&
          !u[4].length &&
          u[9] == 1
            ? (s = s[Qo(u[0])].apply(s, u[3]))
            : (s = o.length == 1 && wh(o) ? s[a]() : s.thru(o));
        }
        return function () {
          var c = arguments,
            h = c[0];
          if (s && c.length == 1 && FD(h)) return s.plant(h).value();
          for (var p = 0, d = n ? t[p].apply(this, c) : h; ++p < n; )
            d = t[p].call(this, d);
          return d;
        };
      });
    }
    Oh.exports = HD;
  });
  var Rh = f((dX, xh) => {
    var UD = Sh(),
      BD = UD();
    xh.exports = BD;
  });
  var Ph = f((pX, Ch) => {
    function WD(e, t, n) {
      return (
        e === e &&
          (n !== void 0 && (e = e <= n ? e : n),
          t !== void 0 && (e = e >= t ? e : t)),
        e
      );
    }
    Ch.exports = WD;
  });
  var Nh = f((gX, Lh) => {
    var zD = Ph(),
      $o = cr();
    function KD(e, t, n) {
      return (
        n === void 0 && ((n = t), (t = void 0)),
        n !== void 0 && ((n = $o(n)), (n = n === n ? n : 0)),
        t !== void 0 && ((t = $o(t)), (t = t === t ? t : 0)),
        zD($o(e), t, n)
      );
    }
    Lh.exports = KD;
  });
  var Hh,
    Uh,
    Bh,
    Wh,
    jD,
    YD,
    QD,
    $D,
    ZD,
    JD,
    eM,
    tM,
    nM,
    rM,
    iM,
    oM,
    aM,
    sM,
    uM,
    zh,
    Kh,
    cM,
    lM,
    fM,
    jh,
    dM,
    pM,
    Yh,
    gM,
    Zo,
    Qh,
    Dh,
    Mh,
    $h,
    xn,
    hM,
    nt,
    Zh,
    EM,
    Fe,
    ze,
    Rn,
    Jh,
    Jo,
    Fh,
    ea,
    yM,
    Sn,
    vM,
    mM,
    _M,
    eE,
    qh,
    IM,
    Gh,
    TM,
    bM,
    AM,
    Xh,
    Fr,
    qr,
    Vh,
    kh,
    tE,
    nE = pe(() => {
      "use strict";
      (Hh = ae(Rh())), (Uh = ae(sr())), (Bh = ae(Nh()));
      De();
      ta();
      Rr();
      (Wh = ae(Tt())),
        ({
          MOUSE_CLICK: jD,
          MOUSE_SECOND_CLICK: YD,
          MOUSE_DOWN: QD,
          MOUSE_UP: $D,
          MOUSE_OVER: ZD,
          MOUSE_OUT: JD,
          DROPDOWN_CLOSE: eM,
          DROPDOWN_OPEN: tM,
          SLIDER_ACTIVE: nM,
          SLIDER_INACTIVE: rM,
          TAB_ACTIVE: iM,
          TAB_INACTIVE: oM,
          NAVBAR_CLOSE: aM,
          NAVBAR_OPEN: sM,
          MOUSE_MOVE: uM,
          PAGE_SCROLL_DOWN: zh,
          SCROLL_INTO_VIEW: Kh,
          SCROLL_OUT_OF_VIEW: cM,
          PAGE_SCROLL_UP: lM,
          SCROLLING_IN_VIEW: fM,
          PAGE_FINISH: jh,
          ECOMMERCE_CART_CLOSE: dM,
          ECOMMERCE_CART_OPEN: pM,
          PAGE_START: Yh,
          PAGE_SCROLL: gM,
        } = Be),
        (Zo = "COMPONENT_ACTIVE"),
        (Qh = "COMPONENT_INACTIVE"),
        ({ COLON_DELIMITER: Dh } = Oe),
        ({ getNamespacedParameterId: Mh } = Wh.IX2VanillaUtils),
        ($h = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
        (xn = $h(({ element: e, nativeEvent: t }) => e === t.target)),
        (hM = $h(({ element: e, nativeEvent: t }) => e.contains(t.target))),
        (nt = (0, Hh.default)([xn, hM])),
        (Zh = (e, t) => {
          if (t) {
            let { ixData: n } = e.getState(),
              { events: r } = n,
              i = r[t];
            if (i && !yM[i.eventTypeId]) return i;
          }
          return null;
        }),
        (EM = ({ store: e, event: t }) => {
          let { action: n } = t,
            { autoStopEventId: r } = n.config;
          return !!Zh(e, r);
        }),
        (Fe = ({ store: e, event: t, element: n, eventStateKey: r }, i) => {
          let { action: o, id: s } = t,
            { actionListId: a, autoStopEventId: u } = o.config,
            c = Zh(e, u);
          return (
            c &&
              $t({
                store: e,
                eventId: u,
                eventTarget: n,
                eventStateKey: u + Dh + r.split(Dh)[1],
                actionListId: (0, Uh.default)(c, "action.config.actionListId"),
              }),
            $t({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            Cn({
              store: e,
              eventId: s,
              eventTarget: n,
              eventStateKey: r,
              actionListId: a,
            }),
            i
          );
        }),
        (ze = (e, t) => (n, r) => e(n, r) === !0 ? t(n, r) : r),
        (Rn = { handler: ze(nt, Fe) }),
        (Jh = { ...Rn, types: [Zo, Qh].join(" ") }),
        (Jo = [
          { target: window, types: "resize orientationchange", throttle: !0 },
          {
            target: document,
            types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
            throttle: !0,
          },
        ]),
        (Fh = "mouseover mouseout"),
        (ea = { types: Jo }),
        (yM = { PAGE_START: Yh, PAGE_FINISH: jh }),
        (Sn = (() => {
          let e = window.pageXOffset !== void 0,
            n =
              document.compatMode === "CSS1Compat"
                ? document.documentElement
                : document.body;
          return () => ({
            scrollLeft: e ? window.pageXOffset : n.scrollLeft,
            scrollTop: e ? window.pageYOffset : n.scrollTop,
            stiffScrollTop: (0, Bh.default)(
              e ? window.pageYOffset : n.scrollTop,
              0,
              n.scrollHeight - window.innerHeight
            ),
            scrollWidth: n.scrollWidth,
            scrollHeight: n.scrollHeight,
            clientWidth: n.clientWidth,
            clientHeight: n.clientHeight,
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
          });
        })()),
        (vM = (e, t) =>
          !(
            e.left > t.right ||
            e.right < t.left ||
            e.top > t.bottom ||
            e.bottom < t.top
          )),
        (mM = ({ element: e, nativeEvent: t }) => {
          let { type: n, target: r, relatedTarget: i } = t,
            o = e.contains(r);
          if (n === "mouseover" && o) return !0;
          let s = e.contains(i);
          return !!(n === "mouseout" && o && s);
        }),
        (_M = (e) => {
          let {
              element: t,
              event: { config: n },
            } = e,
            { clientWidth: r, clientHeight: i } = Sn(),
            o = n.scrollOffsetValue,
            u = n.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
          return vM(t.getBoundingClientRect(), {
            left: 0,
            top: u,
            right: r,
            bottom: i - u,
          });
        }),
        (eE = (e) => (t, n) => {
          let { type: r } = t.nativeEvent,
            i = [Zo, Qh].indexOf(r) !== -1 ? r === Zo : n.isActive,
            o = { ...n, isActive: i };
          return ((!n || o.isActive !== n.isActive) && e(t, o)) || o;
        }),
        (qh = (e) => (t, n) => {
          let r = { elementHovered: mM(t) };
          return (
            ((n ? r.elementHovered !== n.elementHovered : r.elementHovered) &&
              e(t, r)) ||
            r
          );
        }),
        (IM = (e) => (t, n) => {
          let r = { ...n, elementVisible: _M(t) };
          return (
            ((n ? r.elementVisible !== n.elementVisible : r.elementVisible) &&
              e(t, r)) ||
            r
          );
        }),
        (Gh =
          (e) =>
          (t, n = {}) => {
            let { stiffScrollTop: r, scrollHeight: i, innerHeight: o } = Sn(),
              {
                event: { config: s, eventTypeId: a },
              } = t,
              { scrollOffsetValue: u, scrollOffsetUnit: c } = s,
              h = c === "PX",
              p = i - o,
              d = Number((r / p).toFixed(2));
            if (n && n.percentTop === d) return n;
            let E = (h ? u : (o * (u || 0)) / 100) / p,
              I,
              _,
              w = 0;
            n &&
              ((I = d > n.percentTop),
              (_ = n.scrollingDown !== I),
              (w = _ ? d : n.anchorTop));
            let v = a === zh ? d >= w + E : d <= w - E,
              x = {
                ...n,
                percentTop: d,
                inBounds: v,
                anchorTop: w,
                scrollingDown: I,
              };
            return (n && v && (_ || x.inBounds !== n.inBounds) && e(t, x)) || x;
          }),
        (TM = (e, t) =>
          e.left > t.left &&
          e.left < t.right &&
          e.top > t.top &&
          e.top < t.bottom),
        (bM = (e) => (t, n) => {
          let r = { finished: document.readyState === "complete" };
          return r.finished && !(n && n.finshed) && e(t), r;
        }),
        (AM = (e) => (t, n) => {
          let r = { started: !0 };
          return n || e(t), r;
        }),
        (Xh =
          (e) =>
          (t, n = { clickCount: 0 }) => {
            let r = { clickCount: (n.clickCount % 2) + 1 };
            return (r.clickCount !== n.clickCount && e(t, r)) || r;
          }),
        (Fr = (e = !0) => ({
          ...Jh,
          handler: ze(
            e ? nt : xn,
            eE((t, n) => (n.isActive ? Rn.handler(t, n) : n))
          ),
        })),
        (qr = (e = !0) => ({
          ...Jh,
          handler: ze(
            e ? nt : xn,
            eE((t, n) => (n.isActive ? n : Rn.handler(t, n)))
          ),
        })),
        (Vh = {
          ...ea,
          handler: IM((e, t) => {
            let { elementVisible: n } = t,
              { event: r, store: i } = e,
              { ixData: o } = i.getState(),
              { events: s } = o;
            return !s[r.action.config.autoStopEventId] && t.triggered
              ? t
              : (r.eventTypeId === Kh) === n
              ? (Fe(e), { ...t, triggered: !0 })
              : t;
          }),
        }),
        (kh = 0.05),
        (tE = {
          [nM]: Fr(),
          [rM]: qr(),
          [tM]: Fr(),
          [eM]: qr(),
          [sM]: Fr(!1),
          [aM]: qr(!1),
          [iM]: Fr(),
          [oM]: qr(),
          [pM]: { types: "ecommerce-cart-open", handler: ze(nt, Fe) },
          [dM]: { types: "ecommerce-cart-close", handler: ze(nt, Fe) },
          [jD]: {
            types: "click",
            handler: ze(
              nt,
              Xh((e, { clickCount: t }) => {
                EM(e) ? t === 1 && Fe(e) : Fe(e);
              })
            ),
          },
          [YD]: {
            types: "click",
            handler: ze(
              nt,
              Xh((e, { clickCount: t }) => {
                t === 2 && Fe(e);
              })
            ),
          },
          [QD]: { ...Rn, types: "mousedown" },
          [$D]: { ...Rn, types: "mouseup" },
          [ZD]: {
            types: Fh,
            handler: ze(
              nt,
              qh((e, t) => {
                t.elementHovered && Fe(e);
              })
            ),
          },
          [JD]: {
            types: Fh,
            handler: ze(
              nt,
              qh((e, t) => {
                t.elementHovered || Fe(e);
              })
            ),
          },
          [uM]: {
            types: "mousemove mouseout scroll",
            handler: (
              {
                store: e,
                element: t,
                eventConfig: n,
                nativeEvent: r,
                eventStateKey: i,
              },
              o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
            ) => {
              let {
                  basedOn: s,
                  selectedAxis: a,
                  continuousParameterGroupId: u,
                  reverse: c,
                  restingState: h = 0,
                } = n,
                {
                  clientX: p = o.clientX,
                  clientY: d = o.clientY,
                  pageX: E = o.pageX,
                  pageY: I = o.pageY,
                } = r,
                _ = a === "X_AXIS",
                w = r.type === "mouseout",
                v = h / 100,
                x = u,
                A = !1;
              switch (s) {
                case Ze.VIEWPORT: {
                  v = _
                    ? Math.min(p, window.innerWidth) / window.innerWidth
                    : Math.min(d, window.innerHeight) / window.innerHeight;
                  break;
                }
                case Ze.PAGE: {
                  let {
                    scrollLeft: S,
                    scrollTop: P,
                    scrollWidth: R,
                    scrollHeight: X,
                  } = Sn();
                  v = _ ? Math.min(S + E, R) / R : Math.min(P + I, X) / X;
                  break;
                }
                case Ze.ELEMENT:
                default: {
                  x = Mh(i, u);
                  let S = r.type.indexOf("mouse") === 0;
                  if (S && nt({ element: t, nativeEvent: r }) !== !0) break;
                  let P = t.getBoundingClientRect(),
                    { left: R, top: X, width: V, height: U } = P;
                  if (!S && !TM({ left: p, top: d }, P)) break;
                  (A = !0), (v = _ ? (p - R) / V : (d - X) / U);
                  break;
                }
              }
              return (
                w && (v > 1 - kh || v < kh) && (v = Math.round(v)),
                (s !== Ze.ELEMENT || A || A !== o.elementHovered) &&
                  ((v = c ? 1 - v : v), e.dispatch(Yt(x, v))),
                {
                  elementHovered: A,
                  clientX: p,
                  clientY: d,
                  pageX: E,
                  pageY: I,
                }
              );
            },
          },
          [gM]: {
            types: Jo,
            handler: ({ store: e, eventConfig: t }) => {
              let { continuousParameterGroupId: n, reverse: r } = t,
                { scrollTop: i, scrollHeight: o, clientHeight: s } = Sn(),
                a = i / (o - s);
              (a = r ? 1 - a : a), e.dispatch(Yt(n, a));
            },
          },
          [fM]: {
            types: Jo,
            handler: (
              { element: e, store: t, eventConfig: n, eventStateKey: r },
              i = { scrollPercent: 0 }
            ) => {
              let {
                  scrollLeft: o,
                  scrollTop: s,
                  scrollWidth: a,
                  scrollHeight: u,
                  clientHeight: c,
                } = Sn(),
                {
                  basedOn: h,
                  selectedAxis: p,
                  continuousParameterGroupId: d,
                  startsEntering: E,
                  startsExiting: I,
                  addEndOffset: _,
                  addStartOffset: w,
                  addOffsetValue: v = 0,
                  endOffsetValue: x = 0,
                } = n,
                A = p === "X_AXIS";
              if (h === Ze.VIEWPORT) {
                let S = A ? o / a : s / u;
                return (
                  S !== i.scrollPercent && t.dispatch(Yt(d, S)),
                  { scrollPercent: S }
                );
              } else {
                let S = Mh(r, d),
                  P = e.getBoundingClientRect(),
                  R = (w ? v : 0) / 100,
                  X = (_ ? x : 0) / 100;
                (R = E ? R : 1 - R), (X = I ? X : 1 - X);
                let V = P.top + Math.min(P.height * R, c),
                  W = P.top + P.height * X - V,
                  j = Math.min(c + W, u),
                  T = Math.min(Math.max(0, c - V), j) / j;
                return (
                  T !== i.scrollPercent && t.dispatch(Yt(S, T)),
                  { scrollPercent: T }
                );
              }
            },
          },
          [Kh]: Vh,
          [cM]: Vh,
          [zh]: {
            ...ea,
            handler: Gh((e, t) => {
              t.scrollingDown && Fe(e);
            }),
          },
          [lM]: {
            ...ea,
            handler: Gh((e, t) => {
              t.scrollingDown || Fe(e);
            }),
          },
          [jh]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: ze(xn, bM(Fe)),
          },
          [Yh]: {
            types: "readystatechange IX2_PAGE_UPDATE",
            handler: ze(xn, AM(Fe)),
          },
        });
    });
  var mE = {};
  Ne(mE, {
    observeRequests: () => BM,
    startActionGroup: () => Cn,
    startEngine: () => Ur,
    stopActionGroup: () => $t,
    stopAllActionGroups: () => EE,
    stopEngine: () => Br,
  });
  function BM(e) {
    bt({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: KM }),
      bt({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: jM }),
      bt({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: YM }),
      bt({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: QM });
  }
  function WM(e) {
    bt({
      store: e,
      select: ({ ixSession: t }) => t.mediaQueryKey,
      onChange: () => {
        Br(e),
          dE({ store: e, elementApi: Pe }),
          Ur({ store: e, allowEvents: !0 }),
          pE();
      },
    });
  }
  function zM(e, t) {
    let n = bt({
      store: e,
      select: ({ ixSession: r }) => r.tick,
      onChange: (r) => {
        t(r), n();
      },
    });
  }
  function KM({ rawData: e, defer: t }, n) {
    let r = () => {
      Ur({ store: n, rawData: e, allowEvents: !0 }), pE();
    };
    t ? setTimeout(r, 0) : r();
  }
  function pE() {
    document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
  }
  function jM(e, t) {
    let {
        actionTypeId: n,
        actionListId: r,
        actionItemId: i,
        eventId: o,
        allowEvents: s,
        immediate: a,
        testManual: u,
        verbose: c = !0,
      } = e,
      { rawData: h } = e;
    if (r && i && h && a) {
      let p = h.actionLists[r];
      p && (h = NM({ actionList: p, actionItemId: i, rawData: h }));
    }
    if (
      (Ur({ store: t, rawData: h, allowEvents: s, testManual: u }),
      (r && n === Re.GENERAL_START_ACTION) || na(n))
    ) {
      $t({ store: t, actionListId: r }),
        hE({ store: t, actionListId: r, eventId: o });
      let p = Cn({
        store: t,
        eventId: o,
        actionListId: r,
        immediate: a,
        verbose: c,
      });
      c && p && t.dispatch(Qt({ actionListId: r, isPlaying: !a }));
    }
  }
  function YM({ actionListId: e }, t) {
    e ? $t({ store: t, actionListId: e }) : EE({ store: t }), Br(t);
  }
  function QM(e, t) {
    Br(t), dE({ store: t, elementApi: Pe });
  }
  function Ur({ store: e, rawData: t, allowEvents: n, testManual: r }) {
    let { ixSession: i } = e.getState();
    t && e.dispatch(No(t)),
      i.active ||
        (e.dispatch(
          Do({
            hasBoundaryNodes: !!document.querySelector(Xr),
            reducedMotion:
              document.body.hasAttribute("data-wf-ix-vacation") &&
              window.matchMedia("(prefers-reduced-motion)").matches,
          })
        ),
        n &&
          (nF(e), $M(), e.getState().ixSession.hasDefinedMediaQueries && WM(e)),
        e.dispatch(Mo()),
        ZM(e, r));
  }
  function $M() {
    let { documentElement: e } = document;
    e.className.indexOf(rE) === -1 && (e.className += ` ${rE}`);
  }
  function ZM(e, t) {
    let n = (r) => {
      let { ixSession: i, ixParameters: o } = e.getState();
      i.active &&
        (e.dispatch(Sr(r, o)), t ? zM(e, n) : requestAnimationFrame(n));
    };
    n(window.performance.now());
  }
  function Br(e) {
    let { ixSession: t } = e.getState();
    if (t.active) {
      let { eventListeners: n } = t;
      n.forEach(JM), qM(), e.dispatch(Fo());
    }
  }
  function JM({ target: e, listenerParams: t }) {
    e.removeEventListener.apply(e, t);
  }
  function eF({
    store: e,
    eventStateKey: t,
    eventTarget: n,
    eventId: r,
    eventConfig: i,
    actionListId: o,
    parameterGroup: s,
    smoothing: a,
    restingValue: u,
  }) {
    let { ixData: c, ixSession: h } = e.getState(),
      { events: p } = c,
      d = p[r],
      { eventTypeId: E } = d,
      I = {},
      _ = {},
      w = [],
      { continuousActionGroups: v } = s,
      { id: x } = s;
    DM(E, i) && (x = MM(t, x));
    let A = h.hasBoundaryNodes && n ? On(n, Xr) : null;
    v.forEach((S) => {
      let { keyframe: P, actionItems: R } = S;
      R.forEach((X) => {
        let { actionTypeId: V } = X,
          { target: U } = X.config;
        if (!U) return;
        let W = U.boundaryMode ? A : null,
          j = GM(U) + ra + V;
        if (((_[j] = tF(_[j], P, X)), !I[j])) {
          I[j] = !0;
          let { config: N } = X;
          Vr({
            config: N,
            event: d,
            eventTarget: n,
            elementRoot: W,
            elementApi: Pe,
          }).forEach((T) => {
            w.push({ element: T, key: j });
          });
        }
      });
    }),
      w.forEach(({ element: S, key: P }) => {
        let R = _[P],
          X = (0, st.default)(R, "[0].actionItems[0]", {}),
          { actionTypeId: V } = X,
          W = (
            V === Re.PLUGIN_RIVE
              ? (X.config?.target?.selectorGuids || []).length === 0
              : Hr(V)
          )
            ? oa(V)(S, X)
            : null,
          j = ia({ element: S, actionItem: X, elementApi: Pe }, W);
        aa({
          store: e,
          element: S,
          eventId: r,
          actionListId: o,
          actionItem: X,
          destination: j,
          continuous: !0,
          parameterId: x,
          actionGroups: R,
          smoothing: a,
          restingValue: u,
          pluginInstance: W,
        });
      });
  }
  function tF(e = [], t, n) {
    let r = [...e],
      i;
    return (
      r.some((o, s) => (o.keyframe === t ? ((i = s), !0) : !1)),
      i == null && ((i = r.length), r.push({ keyframe: t, actionItems: [] })),
      r[i].actionItems.push(n),
      r
    );
  }
  function nF(e) {
    let { ixData: t } = e.getState(),
      { eventTypeMap: n } = t;
    gE(e),
      (0, Zt.default)(n, (i, o) => {
        let s = tE[o];
        if (!s) {
          console.warn(`IX2 event type not configured: ${o}`);
          return;
        }
        uF({ logic: s, store: e, events: i });
      });
    let { ixSession: r } = e.getState();
    r.eventListeners.length && iF(e);
  }
  function iF(e) {
    let t = () => {
      gE(e);
    };
    rF.forEach((n) => {
      window.addEventListener(n, t), e.dispatch(Or(window, [n, t]));
    }),
      t();
  }
  function gE(e) {
    let { ixSession: t, ixData: n } = e.getState(),
      r = window.innerWidth;
    if (r !== t.viewportWidth) {
      let { mediaQueries: i } = n;
      e.dispatch(ko({ width: r, mediaQueries: i }));
    }
  }
  function uF({ logic: e, store: t, events: n }) {
    cF(n);
    let { types: r, handler: i } = e,
      { ixData: o } = t.getState(),
      { actionLists: s } = o,
      a = oF(n, sF);
    if (!(0, aE.default)(a)) return;
    (0, Zt.default)(a, (p, d) => {
      let E = n[d],
        { action: I, id: _, mediaQueries: w = o.mediaQueryKeys } = E,
        { actionListId: v } = I.config;
      XM(w, o.mediaQueryKeys) || t.dispatch(Ho()),
        I.actionTypeId === Re.GENERAL_CONTINUOUS_ACTION &&
          (Array.isArray(E.config) ? E.config : [E.config]).forEach((A) => {
            let { continuousParameterGroupId: S } = A,
              P = (0, st.default)(s, `${v}.continuousParameterGroups`, []),
              R = (0, oE.default)(P, ({ id: U }) => U === S),
              X = (A.smoothing || 0) / 100,
              V = (A.restingState || 0) / 100;
            R &&
              p.forEach((U, W) => {
                let j = _ + ra + W;
                eF({
                  store: t,
                  eventStateKey: j,
                  eventTarget: U,
                  eventId: _,
                  eventConfig: A,
                  actionListId: v,
                  parameterGroup: R,
                  smoothing: X,
                  restingValue: V,
                });
              });
          }),
        (I.actionTypeId === Re.GENERAL_START_ACTION || na(I.actionTypeId)) &&
          hE({ store: t, actionListId: v, eventId: _ });
    });
    let u = (p) => {
        let { ixSession: d } = t.getState();
        aF(a, (E, I, _) => {
          let w = n[I],
            v = d.eventState[_],
            { action: x, mediaQueries: A = o.mediaQueryKeys } = w;
          if (!kr(A, d.mediaQueryKey)) return;
          let S = (P = {}) => {
            let R = i(
              {
                store: t,
                element: E,
                event: w,
                eventConfig: P,
                nativeEvent: p,
                eventStateKey: _,
              },
              v
            );
            VM(R, v) || t.dispatch(qo(_, R));
          };
          x.actionTypeId === Re.GENERAL_CONTINUOUS_ACTION
            ? (Array.isArray(w.config) ? w.config : [w.config]).forEach(S)
            : S();
        });
      },
      c = (0, lE.default)(u, UM),
      h = ({ target: p = document, types: d, throttle: E }) => {
        d.split(" ")
          .filter(Boolean)
          .forEach((I) => {
            let _ = E ? c : u;
            p.addEventListener(I, _), t.dispatch(Or(p, [I, _]));
          });
      };
    Array.isArray(r) ? r.forEach(h) : typeof r == "string" && h(e);
  }
  function cF(e) {
    if (!HM) return;
    let t = {},
      n = "";
    for (let r in e) {
      let { eventTypeId: i, target: o } = e[r],
        s = Bo(o);
      t[s] ||
        ((i === Be.MOUSE_CLICK || i === Be.MOUSE_SECOND_CLICK) &&
          ((t[s] = !0),
          (n += s + "{cursor: pointer;touch-action: manipulation;}")));
    }
    if (n) {
      let r = document.createElement("style");
      (r.textContent = n), document.body.appendChild(r);
    }
  }
  function hE({ store: e, actionListId: t, eventId: n }) {
    let { ixData: r, ixSession: i } = e.getState(),
      { actionLists: o, events: s } = r,
      a = s[n],
      u = o[t];
    if (u && u.useFirstGroupAsInitialState) {
      let c = (0, st.default)(u, "actionItemGroups[0].actionItems", []),
        h = (0, st.default)(a, "mediaQueries", r.mediaQueryKeys);
      if (!kr(h, i.mediaQueryKey)) return;
      c.forEach((p) => {
        let { config: d, actionTypeId: E } = p,
          I =
            d?.target?.useEventTarget === !0 && d?.target?.objectId == null
              ? { target: a.target, targets: a.targets }
              : d,
          _ = Vr({ config: I, event: a, elementApi: Pe }),
          w = Hr(E);
        _.forEach((v) => {
          let x = w ? oa(E)(v, p) : null;
          aa({
            destination: ia({ element: v, actionItem: p, elementApi: Pe }, x),
            immediate: !0,
            store: e,
            element: v,
            eventId: n,
            actionItem: p,
            actionListId: t,
            pluginInstance: x,
          });
        });
      });
    }
  }
  function EE({ store: e }) {
    let { ixInstances: t } = e.getState();
    (0, Zt.default)(t, (n) => {
      if (!n.continuous) {
        let { actionListId: r, verbose: i } = n;
        sa(n, e), i && e.dispatch(Qt({ actionListId: r, isPlaying: !1 }));
      }
    });
  }
  function $t({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
  }) {
    let { ixInstances: o, ixSession: s } = e.getState(),
      a = s.hasBoundaryNodes && n ? On(n, Xr) : null;
    (0, Zt.default)(o, (u) => {
      let c = (0, st.default)(u, "actionItem.config.target.boundaryMode"),
        h = r ? u.eventStateKey === r : !0;
      if (u.actionListId === i && u.eventId === t && h) {
        if (a && c && !Wo(a, u.element)) return;
        sa(u, e),
          u.verbose && e.dispatch(Qt({ actionListId: i, isPlaying: !1 }));
      }
    });
  }
  function Cn({
    store: e,
    eventId: t,
    eventTarget: n,
    eventStateKey: r,
    actionListId: i,
    groupIndex: o = 0,
    immediate: s,
    verbose: a,
  }) {
    let { ixData: u, ixSession: c } = e.getState(),
      { events: h } = u,
      p = h[t] || {},
      { mediaQueries: d = u.mediaQueryKeys } = p,
      E = (0, st.default)(u, `actionLists.${i}`, {}),
      { actionItemGroups: I, useFirstGroupAsInitialState: _ } = E;
    if (!I || !I.length) return !1;
    o >= I.length && (0, st.default)(p, "config.loop") && (o = 0),
      o === 0 && _ && o++;
    let v =
        (o === 0 || (o === 1 && _)) && na(p.action?.actionTypeId)
          ? p.config.delay
          : void 0,
      x = (0, st.default)(I, [o, "actionItems"], []);
    if (!x.length || !kr(d, c.mediaQueryKey)) return !1;
    let A = c.hasBoundaryNodes && n ? On(n, Xr) : null,
      S = CM(x),
      P = !1;
    return (
      x.forEach((R, X) => {
        let { config: V, actionTypeId: U } = R,
          W = Hr(U),
          { target: j } = V;
        if (!j) return;
        let N = j.boundaryMode ? A : null;
        Vr({
          config: V,
          event: p,
          eventTarget: n,
          elementRoot: N,
          elementApi: Pe,
        }).forEach((D, H) => {
          let G = W ? oa(U)(D, R) : null,
            Y = W ? kM(U)(D, R) : null;
          P = !0;
          let Q = S === X && H === 0,
            se = PM({ element: D, actionItem: R }),
            _e = ia({ element: D, actionItem: R, elementApi: Pe }, G);
          aa({
            store: e,
            element: D,
            actionItem: R,
            eventId: t,
            eventTarget: n,
            eventStateKey: r,
            actionListId: i,
            groupIndex: o,
            isCarrier: Q,
            computedStyle: se,
            destination: _e,
            immediate: s,
            verbose: a,
            pluginInstance: G,
            pluginDuration: Y,
            instanceDelay: v,
          });
        });
      }),
      P
    );
  }
  function aa(e) {
    let { store: t, computedStyle: n, ...r } = e,
      {
        element: i,
        actionItem: o,
        immediate: s,
        pluginInstance: a,
        continuous: u,
        restingValue: c,
        eventId: h,
      } = r,
      p = !u,
      d = xM(),
      { ixElements: E, ixSession: I, ixData: _ } = t.getState(),
      w = SM(E, i),
      { refState: v } = E[w] || {},
      x = zo(i),
      A = I.reducedMotion && mi[o.actionTypeId],
      S;
    if (A && u)
      switch (_.events[h]?.eventTypeId) {
        case Be.MOUSE_MOVE:
        case Be.MOUSE_MOVE_IN_VIEWPORT:
          S = c;
          break;
        default:
          S = 0.5;
          break;
      }
    let P = LM(i, v, n, o, Pe, a);
    if (
      (t.dispatch(
        Go({
          instanceId: d,
          elementId: w,
          origin: P,
          refType: x,
          skipMotion: A,
          skipToValue: S,
          ...r,
        })
      ),
      yE(document.body, "ix2-animation-started", d),
      s)
    ) {
      lF(t, d);
      return;
    }
    bt({ store: t, select: ({ ixInstances: R }) => R[d], onChange: vE }),
      p && t.dispatch(xr(d, I.tick));
  }
  function sa(e, t) {
    yE(document.body, "ix2-animation-stopping", {
      instanceId: e.id,
      state: t.getState(),
    });
    let { elementId: n, actionItem: r } = e,
      { ixElements: i } = t.getState(),
      { ref: o, refType: s } = i[n] || {};
    s === fE && FM(o, r, Pe), t.dispatch(Xo(e.id));
  }
  function yE(e, t, n) {
    let r = document.createEvent("CustomEvent");
    r.initCustomEvent(t, !0, !0, n), e.dispatchEvent(r);
  }
  function lF(e, t) {
    let { ixParameters: n } = e.getState();
    e.dispatch(xr(t, 0)), e.dispatch(Sr(performance.now(), n));
    let { ixInstances: r } = e.getState();
    vE(r[t], e);
  }
  function vE(e, t) {
    let {
        active: n,
        continuous: r,
        complete: i,
        elementId: o,
        actionItem: s,
        actionTypeId: a,
        renderType: u,
        current: c,
        groupIndex: h,
        eventId: p,
        eventTarget: d,
        eventStateKey: E,
        actionListId: I,
        isCarrier: _,
        styleProp: w,
        verbose: v,
        pluginInstance: x,
      } = e,
      { ixData: A, ixSession: S } = t.getState(),
      { events: P } = A,
      R = P && P[p] ? P[p] : {},
      { mediaQueries: X = A.mediaQueryKeys } = R;
    if (kr(X, S.mediaQueryKey) && (r || n || i)) {
      if (c || (u === OM && i)) {
        t.dispatch(Vo(o, a, c, s));
        let { ixElements: V } = t.getState(),
          { ref: U, refType: W, refState: j } = V[o] || {},
          N = j && j[a];
        (W === fE || Hr(a)) && RM(U, j, N, p, s, w, Pe, u, x);
      }
      if (i) {
        if (_) {
          let V = Cn({
            store: t,
            eventId: p,
            eventTarget: d,
            eventStateKey: E,
            actionListId: I,
            groupIndex: h + 1,
            verbose: v,
          });
          v && !V && t.dispatch(Qt({ actionListId: I, isPlaying: !1 }));
        }
        sa(e, t);
      }
    }
  }
  var oE,
    st,
    aE,
    sE,
    uE,
    cE,
    Zt,
    lE,
    Gr,
    wM,
    na,
    ra,
    Xr,
    fE,
    OM,
    rE,
    Vr,
    SM,
    ia,
    bt,
    xM,
    RM,
    dE,
    CM,
    PM,
    LM,
    NM,
    DM,
    MM,
    kr,
    FM,
    qM,
    GM,
    XM,
    VM,
    Hr,
    oa,
    kM,
    iE,
    HM,
    UM,
    rF,
    oF,
    aF,
    sF,
    ta = pe(() => {
      "use strict";
      (oE = ae(ji())),
        (st = ae(sr())),
        (aE = ae(Lp())),
        (sE = ae(ig())),
        (uE = ae(ag())),
        (cE = ae(ug())),
        (Zt = ae(gg())),
        (lE = ae(Ig()));
      De();
      Gr = ae(Tt());
      Rr();
      Sg();
      nE();
      (wM = Object.keys(Xn)),
        (na = (e) => wM.includes(e)),
        ({
          COLON_DELIMITER: ra,
          BOUNDARY_SELECTOR: Xr,
          HTML_ELEMENT: fE,
          RENDER_GENERAL: OM,
          W_MOD_IX: rE,
        } = Oe),
        ({
          getAffectedElements: Vr,
          getElementId: SM,
          getDestinationValues: ia,
          observeStore: bt,
          getInstanceId: xM,
          renderHTMLElement: RM,
          clearAllStyles: dE,
          getMaxDurationItemIndex: CM,
          getComputedStyle: PM,
          getInstanceOrigin: LM,
          reduceListToGroup: NM,
          shouldNamespaceEventParameter: DM,
          getNamespacedParameterId: MM,
          shouldAllowMediaQuery: kr,
          cleanupHTMLElement: FM,
          clearObjectCache: qM,
          stringifyTarget: GM,
          mediaQueriesEqual: XM,
          shallowEqual: VM,
        } = Gr.IX2VanillaUtils),
        ({
          isPluginType: Hr,
          createPluginInstance: oa,
          getPluginDuration: kM,
        } = Gr.IX2VanillaPlugins),
        (iE = navigator.userAgent),
        (HM = iE.match(/iPad/i) || iE.match(/iPhone/)),
        (UM = 12);
      rF = ["resize", "orientationchange"];
      (oF = (e, t) => (0, sE.default)((0, cE.default)(e, t), uE.default)),
        (aF = (e, t) => {
          (0, Zt.default)(e, (n, r) => {
            n.forEach((i, o) => {
              let s = r + ra + o;
              t(i, r, s);
            });
          });
        }),
        (sF = (e) => {
          let t = { target: e.target, targets: e.targets };
          return Vr({ config: t, elementApi: Pe });
        });
    });
  var TE = f((ca) => {
    "use strict";
    Object.defineProperty(ca, "__esModule", { value: !0 });
    function fF(e, t) {
      for (var n in t)
        Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
    }
    fF(ca, {
      actions: function () {
        return gF;
      },
      destroy: function () {
        return IE;
      },
      init: function () {
        return vF;
      },
      setEnv: function () {
        return yF;
      },
      store: function () {
        return Wr;
      },
    });
    var dF = Ei(),
      pF = hF((pp(), Ye(dp))),
      ua = (ta(), Ye(mE)),
      gF = EF((Rr(), Ye(bg)));
    function hF(e) {
      return e && e.__esModule ? e : { default: e };
    }
    function _E(e) {
      if (typeof WeakMap != "function") return null;
      var t = new WeakMap(),
        n = new WeakMap();
      return (_E = function (r) {
        return r ? n : t;
      })(e);
    }
    function EF(e, t) {
      if (!t && e && e.__esModule) return e;
      if (e === null || (typeof e != "object" && typeof e != "function"))
        return { default: e };
      var n = _E(t);
      if (n && n.has(e)) return n.get(e);
      var r = { __proto__: null },
        i = Object.defineProperty && Object.getOwnPropertyDescriptor;
      for (var o in e)
        if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set)
            ? Object.defineProperty(r, o, s)
            : (r[o] = e[o]);
        }
      return (r.default = e), n && n.set(e, r), r;
    }
    var Wr = (0, dF.createStore)(pF.default);
    function yF(e) {
      e() && (0, ua.observeRequests)(Wr);
    }
    function vF(e) {
      IE(), (0, ua.startEngine)({ store: Wr, rawData: e, allowEvents: !0 });
    }
    function IE() {
      (0, ua.stopEngine)(Wr);
    }
  });
  var OE = f((AX, wE) => {
    "use strict";
    var bE = He(),
      AE = TE();
    AE.setEnv(bE.env);
    bE.define(
      "ix2",
      (wE.exports = function () {
        return AE;
      })
    );
  });
  var xE = f((wX, SE) => {
    "use strict";
    var Jt = He();
    Jt.define(
      "links",
      (SE.exports = function (e, t) {
        var n = {},
          r = e(window),
          i,
          o = Jt.env(),
          s = window.location,
          a = document.createElement("a"),
          u = "w--current",
          c = /index\.(html|php)$/,
          h = /\/$/,
          p,
          d;
        n.ready = n.design = n.preview = E;
        function E() {
          (i = o && Jt.env("design")),
            (d = Jt.env("slug") || s.pathname || ""),
            Jt.scroll.off(_),
            (p = []);
          for (var v = document.links, x = 0; x < v.length; ++x) I(v[x]);
          p.length && (Jt.scroll.on(_), _());
        }
        function I(v) {
          if (!v.getAttribute("hreflang")) {
            var x =
              (i && v.getAttribute("href-disabled")) || v.getAttribute("href");
            if (((a.href = x), !(x.indexOf(":") >= 0))) {
              var A = e(v);
              if (
                a.hash.length > 1 &&
                a.host + a.pathname === s.host + s.pathname
              ) {
                if (!/^#[a-zA-Z0-9\-\_]+$/.test(a.hash)) return;
                var S = e(a.hash);
                S.length && p.push({ link: A, sec: S, active: !1 });
                return;
              }
              if (!(x === "#" || x === "")) {
                var P =
                  a.href === s.href || x === d || (c.test(x) && h.test(d));
                w(A, u, P);
              }
            }
          }
        }
        function _() {
          var v = r.scrollTop(),
            x = r.height();
          t.each(p, function (A) {
            if (!A.link.attr("hreflang")) {
              var S = A.link,
                P = A.sec,
                R = P.offset().top,
                X = P.outerHeight(),
                V = x * 0.5,
                U = P.is(":visible") && R + X - V >= v && R + V <= v + x;
              A.active !== U && ((A.active = U), w(S, u, U));
            }
          });
        }
        function w(v, x, A) {
          var S = v.hasClass(x);
          (A && S) || (!A && !S) || (A ? v.addClass(x) : v.removeClass(x));
        }
        return n;
      })
    );
  });
  var CE = f((OX, RE) => {
    "use strict";
    var zr = He();
    zr.define(
      "scroll",
      (RE.exports = function (e) {
        var t = {
            WF_CLICK_EMPTY: "click.wf-empty-link",
            WF_CLICK_SCROLL: "click.wf-scroll",
          },
          n = window.location,
          r = I() ? null : window.history,
          i = e(window),
          o = e(document),
          s = e(document.body),
          a =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (N) {
              window.setTimeout(N, 15);
            },
          u = zr.env("editor") ? ".w-editor-body" : "body",
          c =
            "header, " +
            u +
            " > .header, " +
            u +
            " > .w-nav:not([data-no-scroll])",
          h = 'a[href="#"]',
          p = 'a[href*="#"]:not(.w-tab-link):not(' + h + ")",
          d = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}',
          E = document.createElement("style");
        E.appendChild(document.createTextNode(d));
        function I() {
          try {
            return !!window.frameElement;
          } catch {
            return !0;
          }
        }
        var _ = /^#[a-zA-Z0-9][\w:.-]*$/;
        function w(N) {
          return _.test(N.hash) && N.host + N.pathname === n.host + n.pathname;
        }
        let v =
          typeof window.matchMedia == "function" &&
          window.matchMedia("(prefers-reduced-motion: reduce)");
        function x() {
          return (
            document.body.getAttribute("data-wf-scroll-motion") === "none" ||
            v.matches
          );
        }
        function A(N, T) {
          var D;
          switch (T) {
            case "add":
              (D = N.attr("tabindex")),
                D
                  ? N.attr("data-wf-tabindex-swap", D)
                  : N.attr("tabindex", "-1");
              break;
            case "remove":
              (D = N.attr("data-wf-tabindex-swap")),
                D
                  ? (N.attr("tabindex", D),
                    N.removeAttr("data-wf-tabindex-swap"))
                  : N.removeAttr("tabindex");
              break;
          }
          N.toggleClass("wf-force-outline-none", T === "add");
        }
        function S(N) {
          var T = N.currentTarget;
          if (
            !(
              zr.env("design") ||
              (window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(T.className))
            )
          ) {
            var D = w(T) ? T.hash : "";
            if (D !== "") {
              var H = e(D);
              H.length &&
                (N && (N.preventDefault(), N.stopPropagation()),
                P(D, N),
                window.setTimeout(
                  function () {
                    R(H, function () {
                      A(H, "add"),
                        H.get(0).focus({ preventScroll: !0 }),
                        A(H, "remove");
                    });
                  },
                  N ? 0 : 300
                ));
            }
          }
        }
        function P(N) {
          if (
            n.hash !== N &&
            r &&
            r.pushState &&
            !(zr.env.chrome && n.protocol === "file:")
          ) {
            var T = r.state && r.state.hash;
            T !== N && r.pushState({ hash: N }, "", N);
          }
        }
        function R(N, T) {
          var D = i.scrollTop(),
            H = X(N);
          if (D !== H) {
            var G = V(N, D, H),
              Y = Date.now(),
              Q = function () {
                var se = Date.now() - Y;
                window.scroll(0, U(D, H, se, G)),
                  se <= G ? a(Q) : typeof T == "function" && T();
              };
            a(Q);
          }
        }
        function X(N) {
          var T = e(c),
            D = T.css("position") === "fixed" ? T.outerHeight() : 0,
            H = N.offset().top - D;
          if (N.data("scroll") === "mid") {
            var G = i.height() - D,
              Y = N.outerHeight();
            Y < G && (H -= Math.round((G - Y) / 2));
          }
          return H;
        }
        function V(N, T, D) {
          if (x()) return 0;
          var H = 1;
          return (
            s.add(N).each(function (G, Y) {
              var Q = parseFloat(Y.getAttribute("data-scroll-time"));
              !isNaN(Q) && Q >= 0 && (H = Q);
            }),
            (472.143 * Math.log(Math.abs(T - D) + 125) - 2e3) * H
          );
        }
        function U(N, T, D, H) {
          return D > H ? T : N + (T - N) * W(D / H);
        }
        function W(N) {
          return N < 0.5
            ? 4 * N * N * N
            : (N - 1) * (2 * N - 2) * (2 * N - 2) + 1;
        }
        function j() {
          var { WF_CLICK_EMPTY: N, WF_CLICK_SCROLL: T } = t;
          o.on(T, p, S),
            o.on(N, h, function (D) {
              D.preventDefault();
            }),
            document.head.insertBefore(E, document.head.firstChild);
        }
        return { ready: j };
      })
    );
  });
  var LE = f((SX, PE) => {
    "use strict";
    var mF = He();
    mF.define(
      "touch",
      (PE.exports = function (e) {
        var t = {},
          n = window.getSelection;
        (e.event.special.tap = { bindType: "click", delegateType: "click" }),
          (t.init = function (o) {
            return (
              (o = typeof o == "string" ? e(o).get(0) : o), o ? new r(o) : null
            );
          });
        function r(o) {
          var s = !1,
            a = !1,
            u = Math.min(Math.round(window.innerWidth * 0.04), 40),
            c,
            h;
          o.addEventListener("touchstart", p, !1),
            o.addEventListener("touchmove", d, !1),
            o.addEventListener("touchend", E, !1),
            o.addEventListener("touchcancel", I, !1),
            o.addEventListener("mousedown", p, !1),
            o.addEventListener("mousemove", d, !1),
            o.addEventListener("mouseup", E, !1),
            o.addEventListener("mouseout", I, !1);
          function p(w) {
            var v = w.touches;
            (v && v.length > 1) ||
              ((s = !0),
              v ? ((a = !0), (c = v[0].clientX)) : (c = w.clientX),
              (h = c));
          }
          function d(w) {
            if (s) {
              if (a && w.type === "mousemove") {
                w.preventDefault(), w.stopPropagation();
                return;
              }
              var v = w.touches,
                x = v ? v[0].clientX : w.clientX,
                A = x - h;
              (h = x),
                Math.abs(A) > u &&
                  n &&
                  String(n()) === "" &&
                  (i("swipe", w, { direction: A > 0 ? "right" : "left" }), I());
            }
          }
          function E(w) {
            if (s && ((s = !1), a && w.type === "mouseup")) {
              w.preventDefault(), w.stopPropagation(), (a = !1);
              return;
            }
          }
          function I() {
            s = !1;
          }
          function _() {
            o.removeEventListener("touchstart", p, !1),
              o.removeEventListener("touchmove", d, !1),
              o.removeEventListener("touchend", E, !1),
              o.removeEventListener("touchcancel", I, !1),
              o.removeEventListener("mousedown", p, !1),
              o.removeEventListener("mousemove", d, !1),
              o.removeEventListener("mouseup", E, !1),
              o.removeEventListener("mouseout", I, !1),
              (o = null);
          }
          this.destroy = _;
        }
        function i(o, s, a) {
          var u = e.Event(o, { originalEvent: s });
          e(s.target).trigger(u, a);
        }
        return (t.instance = t.init(document)), t;
      })
    );
  });
  var ME = f((xX, DE) => {
    "use strict";
    var At = He(),
      _F = Gn(),
      Ke = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      },
      NE = !0,
      IF = /^#[a-zA-Z0-9\-_]+$/;
    At.define(
      "dropdown",
      (DE.exports = function (e, t) {
        var n = t.debounce,
          r = {},
          i = At.env(),
          o = !1,
          s,
          a = At.env.touch,
          u = ".w-dropdown",
          c = "w--open",
          h = _F.triggers,
          p = 900,
          d = "focusout" + u,
          E = "keydown" + u,
          I = "mouseenter" + u,
          _ = "mousemove" + u,
          w = "mouseleave" + u,
          v = (a ? "click" : "mouseup") + u,
          x = "w-close" + u,
          A = "setting" + u,
          S = e(document),
          P;
        (r.ready = R),
          (r.design = function () {
            o && T(), (o = !1), R();
          }),
          (r.preview = function () {
            (o = !0), R();
          });
        function R() {
          (s = i && At.env("design")), (P = S.find(u)), P.each(X);
        }
        function X(b, J) {
          var ne = e(J),
            F = e.data(J, u);
          F ||
            (F = e.data(J, u, {
              open: !1,
              el: ne,
              config: {},
              selectedIdx: -1,
            })),
            (F.toggle = F.el.children(".w-dropdown-toggle")),
            (F.list = F.el.children(".w-dropdown-list")),
            (F.links = F.list.find("a:not(.w-dropdown .w-dropdown a)")),
            (F.complete = G(F)),
            (F.mouseLeave = Q(F)),
            (F.mouseUpOutside = H(F)),
            (F.mouseMoveOutside = se(F)),
            V(F);
          var fe = F.toggle.attr("id"),
            Te = F.list.attr("id");
          fe || (fe = "w-dropdown-toggle-" + b),
            Te || (Te = "w-dropdown-list-" + b),
            F.toggle.attr("id", fe),
            F.toggle.attr("aria-controls", Te),
            F.toggle.attr("aria-haspopup", "menu"),
            F.toggle.attr("aria-expanded", "false"),
            F.toggle
              .find(".w-icon-dropdown-toggle")
              .attr("aria-hidden", "true"),
            F.toggle.prop("tagName") !== "BUTTON" &&
              (F.toggle.attr("role", "button"),
              F.toggle.attr("tabindex") || F.toggle.attr("tabindex", "0")),
            F.list.attr("id", Te),
            F.list.attr("aria-labelledby", fe),
            F.links.each(function (g, M) {
              M.hasAttribute("tabindex") || M.setAttribute("tabindex", "0"),
                IF.test(M.hash) && M.addEventListener("click", N.bind(null, F));
            }),
            F.el.off(u),
            F.toggle.off(u),
            F.nav && F.nav.off(u);
          var ie = W(F, NE);
          s && F.el.on(A, U(F)),
            s ||
              (i && ((F.hovering = !1), N(F)),
              F.config.hover && F.toggle.on(I, Y(F)),
              F.el.on(x, ie),
              F.el.on(E, _e(F)),
              F.el.on(d, Z(F)),
              F.toggle.on(v, ie),
              F.toggle.on(E, ye(F)),
              (F.nav = F.el.closest(".w-nav")),
              F.nav.on(x, ie));
        }
        function V(b) {
          var J = Number(b.el.css("z-index"));
          (b.manageZ = J === p || J === p + 1),
            (b.config = {
              hover: b.el.attr("data-hover") === "true" && !a,
              delay: b.el.attr("data-delay"),
            });
        }
        function U(b) {
          return function (J, ne) {
            (ne = ne || {}),
              V(b),
              ne.open === !0 && j(b),
              ne.open === !1 && N(b, { immediate: !0 });
          };
        }
        function W(b, J) {
          return n(function (ne) {
            if (b.open || (ne && ne.type === "w-close"))
              return N(b, { forceClose: J });
            j(b);
          });
        }
        function j(b) {
          if (!b.open) {
            D(b),
              (b.open = !0),
              b.list.addClass(c),
              b.toggle.addClass(c),
              b.toggle.attr("aria-expanded", "true"),
              h.intro(0, b.el[0]),
              At.redraw.up(),
              b.manageZ && b.el.css("z-index", p + 1);
            var J = At.env("editor");
            s || S.on(v, b.mouseUpOutside),
              b.hovering && !J && b.el.on(w, b.mouseLeave),
              b.hovering && J && S.on(_, b.mouseMoveOutside),
              window.clearTimeout(b.delayId);
          }
        }
        function N(b, { immediate: J, forceClose: ne } = {}) {
          if (b.open && !(b.config.hover && b.hovering && !ne)) {
            b.toggle.attr("aria-expanded", "false"), (b.open = !1);
            var F = b.config;
            if (
              (h.outro(0, b.el[0]),
              S.off(v, b.mouseUpOutside),
              S.off(_, b.mouseMoveOutside),
              b.el.off(w, b.mouseLeave),
              window.clearTimeout(b.delayId),
              !F.delay || J)
            )
              return b.complete();
            b.delayId = window.setTimeout(b.complete, F.delay);
          }
        }
        function T() {
          S.find(u).each(function (b, J) {
            e(J).triggerHandler(x);
          });
        }
        function D(b) {
          var J = b.el[0];
          P.each(function (ne, F) {
            var fe = e(F);
            fe.is(J) || fe.has(J).length || fe.triggerHandler(x);
          });
        }
        function H(b) {
          return (
            b.mouseUpOutside && S.off(v, b.mouseUpOutside),
            n(function (J) {
              if (b.open) {
                var ne = e(J.target);
                if (!ne.closest(".w-dropdown-toggle").length) {
                  var F = e.inArray(b.el[0], ne.parents(u)) === -1,
                    fe = At.env("editor");
                  if (F) {
                    if (fe) {
                      var Te =
                          ne.parents().length === 1 &&
                          ne.parents("svg").length === 1,
                        ie = ne.parents(
                          ".w-editor-bem-EditorHoverControls"
                        ).length;
                      if (Te || ie) return;
                    }
                    N(b);
                  }
                }
              }
            })
          );
        }
        function G(b) {
          return function () {
            b.list.removeClass(c),
              b.toggle.removeClass(c),
              b.manageZ && b.el.css("z-index", "");
          };
        }
        function Y(b) {
          return function () {
            (b.hovering = !0), j(b);
          };
        }
        function Q(b) {
          return function () {
            (b.hovering = !1), b.links.is(":focus") || N(b);
          };
        }
        function se(b) {
          return n(function (J) {
            if (b.open) {
              var ne = e(J.target),
                F = e.inArray(b.el[0], ne.parents(u)) === -1;
              if (F) {
                var fe = ne.parents(".w-editor-bem-EditorHoverControls").length,
                  Te = ne.parents(".w-editor-bem-RTToolbar").length,
                  ie = e(".w-editor-bem-EditorOverlay"),
                  g =
                    ie.find(".w-editor-edit-outline").length ||
                    ie.find(".w-editor-bem-RTToolbar").length;
                if (fe || Te || g) return;
                (b.hovering = !1), N(b);
              }
            }
          });
        }
        function _e(b) {
          return function (J) {
            if (!(s || !b.open))
              switch (
                ((b.selectedIdx = b.links.index(document.activeElement)),
                J.keyCode)
              ) {
                case Ke.HOME:
                  return b.open
                    ? ((b.selectedIdx = 0), we(b), J.preventDefault())
                    : void 0;
                case Ke.END:
                  return b.open
                    ? ((b.selectedIdx = b.links.length - 1),
                      we(b),
                      J.preventDefault())
                    : void 0;
                case Ke.ESCAPE:
                  return N(b), b.toggle.focus(), J.stopPropagation();
                case Ke.ARROW_RIGHT:
                case Ke.ARROW_DOWN:
                  return (
                    (b.selectedIdx = Math.min(
                      b.links.length - 1,
                      b.selectedIdx + 1
                    )),
                    we(b),
                    J.preventDefault()
                  );
                case Ke.ARROW_LEFT:
                case Ke.ARROW_UP:
                  return (
                    (b.selectedIdx = Math.max(-1, b.selectedIdx - 1)),
                    we(b),
                    J.preventDefault()
                  );
              }
          };
        }
        function we(b) {
          b.links[b.selectedIdx] && b.links[b.selectedIdx].focus();
        }
        function ye(b) {
          var J = W(b, NE);
          return function (ne) {
            if (!s) {
              if (!b.open)
                switch (ne.keyCode) {
                  case Ke.ARROW_UP:
                  case Ke.ARROW_DOWN:
                    return ne.stopPropagation();
                }
              switch (ne.keyCode) {
                case Ke.SPACE:
                case Ke.ENTER:
                  return J(), ne.stopPropagation(), ne.preventDefault();
              }
            }
          };
        }
        function Z(b) {
          return n(function (J) {
            var { relatedTarget: ne, target: F } = J,
              fe = b.el[0],
              Te = fe.contains(ne) || fe.contains(F);
            return Te || N(b), J.stopPropagation();
          });
        }
        return r;
      })
    );
  });
  var qE = f((RX, FE) => {
    "use strict";
    var gt = He(),
      TF = Gn(),
      Ae = {
        ARROW_LEFT: 37,
        ARROW_UP: 38,
        ARROW_RIGHT: 39,
        ARROW_DOWN: 40,
        ESCAPE: 27,
        SPACE: 32,
        ENTER: 13,
        HOME: 36,
        END: 35,
      };
    gt.define(
      "navbar",
      (FE.exports = function (e, t) {
        var n = {},
          r = e.tram,
          i = e(window),
          o = e(document),
          s = t.debounce,
          a,
          u,
          c,
          h,
          p = gt.env(),
          d = '<div class="w-nav-overlay" data-wf-ignore />',
          E = ".w-nav",
          I = "w--open",
          _ = "w--nav-dropdown-open",
          w = "w--nav-dropdown-toggle-open",
          v = "w--nav-dropdown-list-open",
          x = "w--nav-link-open",
          A = TF.triggers,
          S = e();
        (n.ready = n.design = n.preview = P),
          (n.destroy = function () {
            (S = e()), R(), u && u.length && u.each(W);
          });
        function P() {
          (c = p && gt.env("design")),
            (h = gt.env("editor")),
            (a = e(document.body)),
            (u = o.find(E)),
            u.length && (u.each(U), R(), X());
        }
        function R() {
          gt.resize.off(V);
        }
        function X() {
          gt.resize.on(V);
        }
        function V() {
          u.each(Z);
        }
        function U(g, M) {
          var B = e(M),
            k = e.data(M, E);
          k ||
            (k = e.data(M, E, {
              open: !1,
              el: B,
              config: {},
              selectedIdx: -1,
            })),
            (k.menu = B.find(".w-nav-menu")),
            (k.links = k.menu.find(".w-nav-link")),
            (k.dropdowns = k.menu.find(".w-dropdown")),
            (k.dropdownToggle = k.menu.find(".w-dropdown-toggle")),
            (k.dropdownList = k.menu.find(".w-dropdown-list")),
            (k.button = B.find(".w-nav-button")),
            (k.container = B.find(".w-container")),
            (k.overlayContainerId = "w-nav-overlay-" + g),
            (k.outside = we(k));
          var ge = B.find(".w-nav-brand");
          ge &&
            ge.attr("href") === "/" &&
            ge.attr("aria-label") == null &&
            ge.attr("aria-label", "home"),
            k.button.attr("style", "-webkit-user-select: text;"),
            k.button.attr("aria-label") == null &&
              k.button.attr("aria-label", "menu"),
            k.button.attr("role", "button"),
            k.button.attr("tabindex", "0"),
            k.button.attr("aria-controls", k.overlayContainerId),
            k.button.attr("aria-haspopup", "menu"),
            k.button.attr("aria-expanded", "false"),
            k.el.off(E),
            k.button.off(E),
            k.menu.off(E),
            T(k),
            c
              ? (j(k), k.el.on("setting" + E, D(k)))
              : (N(k),
                k.button.on("click" + E, se(k)),
                k.menu.on("click" + E, "a", _e(k)),
                k.button.on("keydown" + E, H(k)),
                k.el.on("keydown" + E, G(k))),
            Z(g, M);
        }
        function W(g, M) {
          var B = e.data(M, E);
          B && (j(B), e.removeData(M, E));
        }
        function j(g) {
          g.overlay && (ie(g, !0), g.overlay.remove(), (g.overlay = null));
        }
        function N(g) {
          g.overlay ||
            ((g.overlay = e(d).appendTo(g.el)),
            g.overlay.attr("id", g.overlayContainerId),
            (g.parent = g.menu.parent()),
            ie(g, !0));
        }
        function T(g) {
          var M = {},
            B = g.config || {},
            k = (M.animation = g.el.attr("data-animation") || "default");
          (M.animOver = /^over/.test(k)),
            (M.animDirect = /left$/.test(k) ? -1 : 1),
            B.animation !== k && g.open && t.defer(Q, g),
            (M.easing = g.el.attr("data-easing") || "ease"),
            (M.easing2 = g.el.attr("data-easing2") || "ease");
          var ge = g.el.attr("data-duration");
          (M.duration = ge != null ? Number(ge) : 400),
            (M.docHeight = g.el.attr("data-doc-height")),
            (g.config = M);
        }
        function D(g) {
          return function (M, B) {
            B = B || {};
            var k = i.width();
            T(g),
              B.open === !0 && fe(g, !0),
              B.open === !1 && ie(g, !0),
              g.open &&
                t.defer(function () {
                  k !== i.width() && Q(g);
                });
          };
        }
        function H(g) {
          return function (M) {
            switch (M.keyCode) {
              case Ae.SPACE:
              case Ae.ENTER:
                return se(g)(), M.preventDefault(), M.stopPropagation();
              case Ae.ESCAPE:
                return ie(g), M.preventDefault(), M.stopPropagation();
              case Ae.ARROW_RIGHT:
              case Ae.ARROW_DOWN:
              case Ae.HOME:
              case Ae.END:
                return g.open
                  ? (M.keyCode === Ae.END
                      ? (g.selectedIdx = g.links.length - 1)
                      : (g.selectedIdx = 0),
                    Y(g),
                    M.preventDefault(),
                    M.stopPropagation())
                  : (M.preventDefault(), M.stopPropagation());
            }
          };
        }
        function G(g) {
          return function (M) {
            if (g.open)
              switch (
                ((g.selectedIdx = g.links.index(document.activeElement)),
                M.keyCode)
              ) {
                case Ae.HOME:
                case Ae.END:
                  return (
                    M.keyCode === Ae.END
                      ? (g.selectedIdx = g.links.length - 1)
                      : (g.selectedIdx = 0),
                    Y(g),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case Ae.ESCAPE:
                  return (
                    ie(g),
                    g.button.focus(),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case Ae.ARROW_LEFT:
                case Ae.ARROW_UP:
                  return (
                    (g.selectedIdx = Math.max(-1, g.selectedIdx - 1)),
                    Y(g),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
                case Ae.ARROW_RIGHT:
                case Ae.ARROW_DOWN:
                  return (
                    (g.selectedIdx = Math.min(
                      g.links.length - 1,
                      g.selectedIdx + 1
                    )),
                    Y(g),
                    M.preventDefault(),
                    M.stopPropagation()
                  );
              }
          };
        }
        function Y(g) {
          if (g.links[g.selectedIdx]) {
            var M = g.links[g.selectedIdx];
            M.focus(), _e(M);
          }
        }
        function Q(g) {
          g.open && (ie(g, !0), fe(g, !0));
        }
        function se(g) {
          return s(function () {
            g.open ? ie(g) : fe(g);
          });
        }
        function _e(g) {
          return function (M) {
            var B = e(this),
              k = B.attr("href");
            if (!gt.validClick(M.currentTarget)) {
              M.preventDefault();
              return;
            }
            k && k.indexOf("#") === 0 && g.open && ie(g);
          };
        }
        function we(g) {
          return (
            g.outside && o.off("click" + E, g.outside),
            function (M) {
              var B = e(M.target);
              (h && B.closest(".w-editor-bem-EditorOverlay").length) ||
                ye(g, B);
            }
          );
        }
        var ye = s(function (g, M) {
          if (g.open) {
            var B = M.closest(".w-nav-menu");
            g.menu.is(B) || ie(g);
          }
        });
        function Z(g, M) {
          var B = e.data(M, E),
            k = (B.collapsed = B.button.css("display") !== "none");
          if ((B.open && !k && !c && ie(B, !0), B.container.length)) {
            var ge = J(B);
            B.links.each(ge), B.dropdowns.each(ge);
          }
          B.open && Te(B);
        }
        var b = "max-width";
        function J(g) {
          var M = g.container.css(b);
          return (
            M === "none" && (M = ""),
            function (B, k) {
              (k = e(k)), k.css(b, ""), k.css(b) === "none" && k.css(b, M);
            }
          );
        }
        function ne(g, M) {
          M.setAttribute("data-nav-menu-open", "");
        }
        function F(g, M) {
          M.removeAttribute("data-nav-menu-open");
        }
        function fe(g, M) {
          if (g.open) return;
          (g.open = !0),
            g.menu.each(ne),
            g.links.addClass(x),
            g.dropdowns.addClass(_),
            g.dropdownToggle.addClass(w),
            g.dropdownList.addClass(v),
            g.button.addClass(I);
          var B = g.config,
            k = B.animation;
          (k === "none" || !r.support.transform || B.duration <= 0) && (M = !0);
          var ge = Te(g),
            en = g.menu.outerHeight(!0),
            ht = g.menu.outerWidth(!0),
            l = g.el.height(),
            y = g.el[0];
          if (
            (Z(0, y),
            A.intro(0, y),
            gt.redraw.up(),
            c || o.on("click" + E, g.outside),
            M)
          ) {
            L();
            return;
          }
          var m = "transform " + B.duration + "ms " + B.easing;
          if (
            (g.overlay &&
              ((S = g.menu.prev()), g.overlay.show().append(g.menu)),
            B.animOver)
          ) {
            r(g.menu)
              .add(m)
              .set({ x: B.animDirect * ht, height: ge })
              .start({ x: 0 })
              .then(L),
              g.overlay && g.overlay.width(ht);
            return;
          }
          var O = l + en;
          r(g.menu).add(m).set({ y: -O }).start({ y: 0 }).then(L);
          function L() {
            g.button.attr("aria-expanded", "true");
          }
        }
        function Te(g) {
          var M = g.config,
            B = M.docHeight ? o.height() : a.height();
          return (
            M.animOver
              ? g.menu.height(B)
              : g.el.css("position") !== "fixed" && (B -= g.el.outerHeight(!0)),
            g.overlay && g.overlay.height(B),
            B
          );
        }
        function ie(g, M) {
          if (!g.open) return;
          (g.open = !1), g.button.removeClass(I);
          var B = g.config;
          if (
            ((B.animation === "none" ||
              !r.support.transform ||
              B.duration <= 0) &&
              (M = !0),
            A.outro(0, g.el[0]),
            o.off("click" + E, g.outside),
            M)
          ) {
            r(g.menu).stop(), y();
            return;
          }
          var k = "transform " + B.duration + "ms " + B.easing2,
            ge = g.menu.outerHeight(!0),
            en = g.menu.outerWidth(!0),
            ht = g.el.height();
          if (B.animOver) {
            r(g.menu)
              .add(k)
              .start({ x: en * B.animDirect })
              .then(y);
            return;
          }
          var l = ht + ge;
          r(g.menu).add(k).start({ y: -l }).then(y);
          function y() {
            g.menu.height(""),
              r(g.menu).set({ x: 0, y: 0 }),
              g.menu.each(F),
              g.links.removeClass(x),
              g.dropdowns.removeClass(_),
              g.dropdownToggle.removeClass(w),
              g.dropdownList.removeClass(v),
              g.overlay &&
                g.overlay.children().length &&
                (S.length ? g.menu.insertAfter(S) : g.menu.prependTo(g.parent),
                g.overlay.attr("style", "").hide()),
              g.el.triggerHandler("w-close"),
              g.button.attr("aria-expanded", "false");
          }
        }
        return n;
      })
    );
  });
  fa();
  da();
  wa();
  Sa();
  Ra();
  La();
  Gn();
  OE();
  xE();
  CE();
  LE();
  ME();
  qE();
})();
/*!
 * tram.js v0.8.2-global
 * Cross-browser CSS3 transitions in JavaScript
 * https://github.com/bkwld/tram
 * MIT License
 */
/*!
 * Webflow._ (aka) Underscore.js 1.6.0 (custom build)
 *
 * http://underscorejs.org
 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Underscore may be freely distributed under the MIT license.
 * @license MIT
 */
/*! Bundled license information:
    
    timm/lib/timm.js:
      (*!
       * Timm
       *
       * Immutability helpers with fast reads and acceptable writes.
       *
       * @copyright Guillermo Grau Panea 2016
       * @license MIT
       *)
    */
/**
 * ----------------------------------------------------------------------
 * Webflow: Interactions 2.0: Init
 */
Webflow.require("ix2").init({
  events: {
    e: {
      id: "e",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-2",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: true,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731476372800,
    },
    "e-3": {
      id: "e-3",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-2",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-4",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455ed9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455ed9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731496527502,
    },
    "e-4": {
      id: "e-4",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-3",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-3",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455ed9",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455ed9",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731496527503,
    },
    "e-5": {
      id: "e-5",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-4",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-6",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".link-block-2",
        originalId:
          "6731eb232fcc314baee41b06|fbd91c05-932d-2d2b-e69d-9d5760c8b854",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".link-block-2",
          originalId:
            "6731eb232fcc314baee41b06|fbd91c05-932d-2d2b-e69d-9d5760c8b854",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731497106520,
    },
    "e-6": {
      id: "e-6",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-5",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-5",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".link-block-2",
        originalId:
          "6731eb232fcc314baee41b06|fbd91c05-932d-2d2b-e69d-9d5760c8b854",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".link-block-2",
          originalId:
            "6731eb232fcc314baee41b06|fbd91c05-932d-2d2b-e69d-9d5760c8b854",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731497106520,
    },
    "e-7": {
      id: "e-7",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-6",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-8",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-link-dropdown",
        originalId:
          "6731eb232fcc314baee41b06|ae618872-7ed1-a78a-e185-d900943222fb",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-link-dropdown",
          originalId:
            "6731eb232fcc314baee41b06|ae618872-7ed1-a78a-e185-d900943222fb",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731522100923,
    },
    "e-8": {
      id: "e-8",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-7",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-7",
        },
      },
      mediaQueries: ["main"],
      target: {
        selector: ".nav-link-dropdown",
        originalId:
          "6731eb232fcc314baee41b06|ae618872-7ed1-a78a-e185-d900943222fb",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-link-dropdown",
          originalId:
            "6731eb232fcc314baee41b06|ae618872-7ed1-a78a-e185-d900943222fb",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731522100923,
    },
    "e-9": {
      id: "e-9",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-8",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-10",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|2b45172b-979d-3df4-68e3-07428c4217e5",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|2b45172b-979d-3df4-68e3-07428c4217e5",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 40,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731553892566,
    },
    "e-11": {
      id: "e-11",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-9",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-12",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|2f120bfb-8d4f-9f2a-7456-a94adcf1ec21",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|2f120bfb-8d4f-9f2a-7456-a94adcf1ec21",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 40,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731556371778,
    },
    "e-13": {
      id: "e-13",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-10",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-14",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|310b2922-9472-722f-af6a-945ddbe06477",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|310b2922-9472-722f-af6a-945ddbe06477",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 20,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731557016922,
    },
    "e-15": {
      id: "e-15",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-11",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-16",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|a66c30c2-2c1a-ca3d-be5a-7db3cff1485c",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|a66c30c2-2c1a-ca3d-be5a-7db3cff1485c",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 50,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731559820955,
    },
    "e-17": {
      id: "e-17",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-12",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-18",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|b63c2ee8-26a3-7a65-7854-db8e83b98133",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|b63c2ee8-26a3-7a65-7854-db8e83b98133",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 40,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731561082888,
    },
    "e-19": {
      id: "e-19",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-13",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-20",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        id: "6731eb232fcc314baee41b06|70b474f5-29d4-05f4-845c-ab3d9fa709ba",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|70b474f5-29d4-05f4-845c-ab3d9fa709ba",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 40,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731570289772,
    },
    "e-21": {
      id: "e-21",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OVER",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-14",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-22",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".work-img-wrapper",
        originalId:
          "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".work-img-wrapper",
          originalId:
            "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731571430232,
    },
    "e-22": {
      id: "e-22",
      name: "",
      animationType: "custom",
      eventTypeId: "MOUSE_OUT",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-15",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-21",
        },
      },
      mediaQueries: ["main", "medium"],
      target: {
        selector: ".work-img-wrapper",
        originalId:
          "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".work-img-wrapper",
          originalId:
            "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731571430232,
    },
    "e-23": {
      id: "e-23",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-16", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "6731eb232fcc314baee41b06|ba658e22-4722-03b1-fe6a-ad4614eaa1d0",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|ba658e22-4722-03b1-fe6a-ad4614eaa1d0",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-16-p",
          smoothing: 50,
          startsEntering: true,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1731584969565,
    },
    "e-24": {
      id: "e-24",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLLING_IN_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_CONTINUOUS_ACTION",
        config: { actionListId: "a-17", affectedElements: {}, duration: 0 },
      },
      mediaQueries: ["main"],
      target: {
        id: "6731eb232fcc314baee41b06|ba658e22-4722-03b1-fe6a-ad4614eaa1d1",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|ba658e22-4722-03b1-fe6a-ad4614eaa1d1",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: [
        {
          continuousParameterGroupId: "a-17-p",
          smoothing: 50,
          startsEntering: false,
          addStartOffset: false,
          addOffsetValue: 50,
          startsExiting: false,
          addEndOffset: false,
          endOffsetValue: 50,
        },
      ],
      createdOn: 1731607220617,
    },
    "e-25": {
      id: "e-25",
      name: "",
      animationType: "custom",
      eventTypeId: "SCROLL_INTO_VIEW",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-18",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-26",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|2f114a2c-5246-e176-bac9-0d7f2d317647",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|2f114a2c-5246-e176-bac9-0d7f2d317647",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: 40,
        scrollOffsetUnit: "%",
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731617061397,
    },
    "e-27": {
      id: "e-27",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-30",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-28",
        },
      },
      mediaQueries: ["main"],
      target: {
        id: "6731eb232fcc314baee41b06",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731652902518,
    },
    "e-29": {
      id: "e-29",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-20",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-30",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731664426816,
    },
    "e-30": {
      id: "e-30",
      name: "",
      animationType: "custom",
      eventTypeId: "NAVBAR_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-21",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-29",
        },
      },
      mediaQueries: ["main", "medium", "small", "tiny"],
      target: {
        id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
        appliesTo: "ELEMENT",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
          appliesTo: "ELEMENT",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731664426818,
    },
    "e-31": {
      id: "e-31",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_OPEN",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-22",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-32",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        selector: ".nav-link-dropdown.mobile",
        originalId:
          "6731eb232fcc314baee41b06|c85a508f-3e6d-861c-b579-a9e9fc6e6131",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-link-dropdown.mobile",
          originalId:
            "6731eb232fcc314baee41b06|c85a508f-3e6d-861c-b579-a9e9fc6e6131",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731667098041,
    },
    "e-32": {
      id: "e-32",
      name: "",
      animationType: "custom",
      eventTypeId: "DROPDOWN_CLOSE",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-23",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-31",
        },
      },
      mediaQueries: ["medium", "small", "tiny"],
      target: {
        selector: ".nav-link-dropdown.mobile",
        originalId:
          "6731eb232fcc314baee41b06|c85a508f-3e6d-861c-b579-a9e9fc6e6131",
        appliesTo: "CLASS",
      },
      targets: [
        {
          selector: ".nav-link-dropdown.mobile",
          originalId:
            "6731eb232fcc314baee41b06|c85a508f-3e6d-861c-b579-a9e9fc6e6131",
          appliesTo: "CLASS",
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731667098042,
    },
    "e-33": {
      id: "e-33",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-28",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-34",
        },
      },
      mediaQueries: ["medium"],
      target: {
        id: "6731eb232fcc314baee41b06",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731761968853,
    },
    "e-35": {
      id: "e-35",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-27",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-36",
        },
      },
      mediaQueries: ["small"],
      target: {
        id: "6731eb232fcc314baee41b06",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731762337628,
    },
    "e-37": {
      id: "e-37",
      name: "",
      animationType: "custom",
      eventTypeId: "PAGE_START",
      action: {
        id: "",
        actionTypeId: "GENERAL_START_ACTION",
        config: {
          delay: 0,
          easing: "",
          duration: 0,
          actionListId: "a-26",
          affectedElements: {},
          playInReverse: false,
          autoStopEventId: "e-38",
        },
      },
      mediaQueries: ["tiny"],
      target: {
        id: "6731eb232fcc314baee41b06",
        appliesTo: "PAGE",
        styleBlockIds: [],
      },
      targets: [
        {
          id: "6731eb232fcc314baee41b06",
          appliesTo: "PAGE",
          styleBlockIds: [],
        },
      ],
      config: {
        loop: false,
        playInReverse: false,
        scrollOffsetValue: null,
        scrollOffsetUnit: null,
        delay: null,
        direction: null,
        effectIn: null,
      },
      createdOn: 1731762635675,
    },
  },
  actionLists: {
    a: {
      id: "a",
      title: "Infinite Loop",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 10000,
                target: {
                  selector: ".logos-row",
                  selectorGuids: ["25a40b5a-d78e-44fa-56ba-59b4e4e5f71a"],
                },
                xValue: -100,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".logos-row",
                  selectorGuids: ["25a40b5a-d78e-44fa-56ba-59b4e4e5f71a"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731476417460,
    },
    "a-2": {
      id: "a-2",
      title: "Arrow Invert Color HoverIn",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-2-n",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455f04",
                },
                filters: [
                  { type: "invert", filterId: "59df", value: 100, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731496550736,
    },
    "a-3": {
      id: "a-3",
      title: "Arrow Invert Color HoverOut",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-3-n",
              actionTypeId: "STYLE_FILTER",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|893770b4-5004-a058-1425-87f24c455f04",
                },
                filters: [
                  { type: "invert", filterId: "59df", value: 0, unit: "%" },
                ],
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731496550736,
    },
    "a-4": {
      id: "a-4",
      title: "Link Block 2 HoveIn",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-4-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-4-n-2",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                xValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-4-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".title",
                  selectorGuids: ["74e13b82-f170-4b42-cf3f-c0b978c32a34"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.white.auto",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "e119628f-5f9c-801a-5821-9bfcb4bbe51d",
                    "6c49b3b0-2ccd-a12f-1604-805b9b6d2658",
                  ],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-4-n-3",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                xValue: 18,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-4-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".title",
                  selectorGuids: ["74e13b82-f170-4b42-cf3f-c0b978c32a34"],
                },
                xValue: 24,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.white.auto",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "e119628f-5f9c-801a-5821-9bfcb4bbe51d",
                    "6c49b3b0-2ccd-a12f-1604-805b9b6d2658",
                  ],
                },
                xValue: 24,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-4-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 150,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731497111829,
    },
    "a-5": {
      id: "a-5",
      title: "Link Block 2 HoveOut",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-5-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-5-n-2",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                xValue: 18,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-5-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".title",
                  selectorGuids: ["74e13b82-f170-4b42-cf3f-c0b978c32a34"],
                },
                xValue: 24,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.white.auto",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "e119628f-5f9c-801a-5821-9bfcb4bbe51d",
                    "6c49b3b0-2ccd-a12f-1604-805b9b6d2658",
                  ],
                },
                xValue: 24,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-5-n-6",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                xValue: 0,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-5-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".title",
                  selectorGuids: ["74e13b82-f170-4b42-cf3f-c0b978c32a34"],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 250,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.white.auto",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "e119628f-5f9c-801a-5821-9bfcb4bbe51d",
                    "6c49b3b0-2ccd-a12f-1604-805b9b6d2658",
                  ],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-5-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 150,
                easing: "",
                duration: 150,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-lg.not-tilted",
                  selectorGuids: [
                    "3fb792c5-ddb1-37d2-df16-a65e030e3977",
                    "9ff8a178-72cc-db5f-a362-e6ea9cb80a8a",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731497111829,
    },
    "a-6": {
      id: "a-6",
      title: "Nav Drop Down Opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-6-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-6-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link-dropdown",
                  selectorGuids: ["a22588da-0ce7-2246-9c94-51ff0676086d"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link",
                  selectorGuids: ["388e7092-9e9e-af04-7e1a-f156382c4ae8"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".primary-button",
                  selectorGuids: ["1a650abc-0a66-4412-5dad-e8acf7604f5d"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".hero-h1",
                  selectorGuids: ["066a37b8-0b79-d73b-26e2-b3ebece6138a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-9",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-11",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line",
                  selectorGuids: ["21c3928b-3f2b-af6f-b952-f492ea1e8953"],
                },
                widthValue: 50,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-6-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                yValue: 32,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-img",
                  selectorGuids: ["22304837-8586-b061-ac9a-649b608b350b"],
                },
                xValue: -20,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-content",
                  selectorGuids: ["21bb82d5-f24e-b47e-0f30-177deb5f705a"],
                },
                xValue: null,
                yValue: 92,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-24",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.dropdown-line",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "e68d9743-c564-4c72-5943-daa60a871fbf",
                  ],
                },
                heightValue: 0,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-6-n-26",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-block",
                  selectorGuids: ["856ed1f1-0c5a-991a-ee47-2a3307c31925"],
                },
                yValue: 20,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-23",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-6-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link-dropdown",
                  selectorGuids: ["a22588da-0ce7-2246-9c94-51ff0676086d"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-6-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link",
                  selectorGuids: ["388e7092-9e9e-af04-7e1a-f156382c4ae8"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-6-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".primary-button",
                  selectorGuids: ["1a650abc-0a66-4412-5dad-e8acf7604f5d"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-6-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".hero-h1",
                  selectorGuids: ["066a37b8-0b79-d73b-26e2-b3ebece6138a"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-6-n-10",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-6-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line",
                  selectorGuids: ["21c3928b-3f2b-af6f-b952-f492ea1e8953"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-6-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 200,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-6-n-16",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-img",
                  selectorGuids: ["22304837-8586-b061-ac9a-649b608b350b"],
                },
                xValue: 0,
                xUnit: "%",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".card-content",
                  selectorGuids: ["21bb82d5-f24e-b47e-0f30-177deb5f705a"],
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-6-n-25",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.dropdown-line",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "e68d9743-c564-4c72-5943-daa60a871fbf",
                  ],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-6-n-27",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".link-block",
                  selectorGuids: ["856ed1f1-0c5a-991a-ee47-2a3307c31925"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731522108603,
    },
    "a-7": {
      id: "a-7",
      title: "Nav Drop Down Closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-7-n-13",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link-dropdown",
                  selectorGuids: ["a22588da-0ce7-2246-9c94-51ff0676086d"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-7-n-14",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link",
                  selectorGuids: ["388e7092-9e9e-af04-7e1a-f156382c4ae8"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-7-n-15",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".primary-button",
                  selectorGuids: ["1a650abc-0a66-4412-5dad-e8acf7604f5d"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-7-n-16",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".hero-h1",
                  selectorGuids: ["066a37b8-0b79-d73b-26e2-b3ebece6138a"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-7-n-17",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-7-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                xValue: 0,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-7-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link-dropdown",
                  selectorGuids: ["a22588da-0ce7-2246-9c94-51ff0676086d"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "SIBLINGS",
                  selector: ".nav-link",
                  selectorGuids: ["388e7092-9e9e-af04-7e1a-f156382c4ae8"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-4",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".primary-button",
                  selectorGuids: ["1a650abc-0a66-4412-5dad-e8acf7604f5d"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-5",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".hero-h1",
                  selectorGuids: ["066a37b8-0b79-d73b-26e2-b3ebece6138a"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-6",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-7-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                xValue: 0,
                yValue: 32,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-7-n-12",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731522108603,
    },
    "a-8": {
      id: "a-8",
      title: "Text Parallax 1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-8-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 2,
                yValue: 2,
                locked: true,
              },
            },
            {
              id: "a-8-n-2",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 20,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-8-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.parallax-anim",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "6aefc76c-0c49-4866-6fb8-7d87386aba05",
                  ],
                },
                yValue: 24,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".sec3-score-wrapper",
                  selectorGuids: ["f355d0a7-acb6-24ad-a622-19c0b6ce1de4"],
                },
                heightValue: 240,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-8-n-3",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-8-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.parallax-anim",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "6aefc76c-0c49-4866-6fb8-7d87386aba05",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-8-n-7",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".sec3-score-wrapper",
                  selectorGuids: ["f355d0a7-acb6-24ad-a622-19c0b6ce1de4"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731553903588,
    },
    "a-9": {
      id: "a-9",
      title: "Text Parallax 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-9-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 2,
                yValue: 2,
                locked: true,
              },
            },
            {
              id: "a-9-n-2",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 20,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-9-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.less-white.paralax-anim.parallax-anim",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "77607d67-1550-87fa-c7bc-072f4b50b3d2",
                    "bcec458e-e990-81a9-39ad-6a28689e6ed2",
                    "6aefc76c-0c49-4866-6fb8-7d87386aba05",
                  ],
                },
                yValue: 24,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-9-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|e90772f5-d9e6-ad07-ef48-c29bb42ac158",
                },
                yValue: 54,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-9-n-6",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line1",
                  selectorGuids: ["b8833912-f2c7-a340-80ca-830edbbfe97a"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-9-n-7",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line3",
                  selectorGuids: ["31970314-365c-132f-5811-0606aa125e58"],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-9-n-8",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line4",
                  selectorGuids: ["2c6dc419-43b1-f2ba-ee1c-08bd7f83f913"],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-9-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line2",
                  selectorGuids: ["389c43a1-8bc2-d8db-a621-b61fee2c22ac"],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-9-n-10",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-9-n-11",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para.less-white.paralax-anim.parallax-anim",
                  selectorGuids: [
                    "55b06630-7370-20f2-4071-98674bcb4510",
                    "77607d67-1550-87fa-c7bc-072f4b50b3d2",
                    "bcec458e-e990-81a9-39ad-6a28689e6ed2",
                    "6aefc76c-0c49-4866-6fb8-7d87386aba05",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-9-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|e90772f5-d9e6-ad07-ef48-c29bb42ac158",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-9-n-14",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line1",
                  selectorGuids: ["b8833912-f2c7-a340-80ca-830edbbfe97a"],
                },
                widthValue: 126,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-9-n-15",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line3",
                  selectorGuids: ["31970314-365c-132f-5811-0606aa125e58"],
                },
                widthValue: 126,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-9-n-16",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line4",
                  selectorGuids: ["2c6dc419-43b1-f2ba-ee1c-08bd7f83f913"],
                },
                heightValue: 140,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-9-n-17",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  selector: ".line2",
                  selectorGuids: ["389c43a1-8bc2-d8db-a621-b61fee2c22ac"],
                },
                heightValue: 140,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731553903588,
    },
    "a-10": {
      id: "a-10",
      title: "Text Parallax 3",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-10-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".h2-5",
                  selectorGuids: ["00990c2f-1688-4f9a-f26c-48358cf4f5af"],
                },
                xValue: 1.2,
                yValue: 1.2,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-10-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".h2-5",
                  selectorGuids: ["00990c2f-1688-4f9a-f26c-48358cf4f5af"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731553903588,
    },
    "a-11": {
      id: "a-11",
      title: "Text Parallax 4",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-11-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                yValue: 24,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-11-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: "._1-div-block",
                  selectorGuids: ["168decb5-db81-63d9-4e9f-d2b92d57e5cc"],
                },
                heightValue: 280,
                widthUnit: "PX",
                heightUnit: "px",
                locked: false,
              },
            },
            {
              id: "a-11-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|d4d24b4b-8511-a824-00bf-01a654fc21b4",
                },
                yValue: 40,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-11-n-10",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line._2",
                  selectorGuids: [
                    "21c3928b-3f2b-af6f-b952-f492ea1e8953",
                    "c23b33ee-315c-cf69-dc72-b6936893c6f0",
                  ],
                },
                widthValue: 50,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-11-n-12",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.absolute",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "83567cab-05a7-0b19-371a-ea539afb7ee6",
                  ],
                },
                heightValue: 50,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-11-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-11-n-7",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: "._1-div-block",
                  selectorGuids: ["168decb5-db81-63d9-4e9f-d2b92d57e5cc"],
                },
                widthUnit: "PX",
                heightUnit: "AUTO",
                locked: false,
              },
            },
            {
              id: "a-11-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|d4d24b4b-8511-a824-00bf-01a654fc21b4",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-11-n-11",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line._2",
                  selectorGuids: [
                    "21c3928b-3f2b-af6f-b952-f492ea1e8953",
                    "c23b33ee-315c-cf69-dc72-b6936893c6f0",
                  ],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-11-n-13",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.absolute",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "83567cab-05a7-0b19-371a-ea539afb7ee6",
                  ],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731553903588,
    },
    "a-12": {
      id: "a-12",
      title: "Text Parallax 5",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-12-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                yValue: 24,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-4",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line._2",
                  selectorGuids: [
                    "21c3928b-3f2b-af6f-b952-f492ea1e8953",
                    "c23b33ee-315c-cf69-dc72-b6936893c6f0",
                  ],
                },
                widthValue: 50,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-12-n-5",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.absolute",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "83567cab-05a7-0b19-371a-ea539afb7ee6",
                  ],
                },
                heightValue: 50,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-12-n-11",
              actionTypeId: "TRANSFORM_SKEW",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 20,
                xUnit: "deg",
                yUnit: "DEG",
                zUnit: "DEG",
              },
            },
            {
              id: "a-12-n-12",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 2,
                yValue: 2,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-12-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".hero-para",
                  selectorGuids: ["55b06630-7370-20f2-4071-98674bcb4510"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-12-n-9",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line._2",
                  selectorGuids: [
                    "21c3928b-3f2b-af6f-b952-f492ea1e8953",
                    "c23b33ee-315c-cf69-dc72-b6936893c6f0",
                  ],
                },
                widthValue: 100,
                widthUnit: "%",
                heightUnit: "PX",
                locked: false,
              },
            },
            {
              id: "a-12-n-10",
              actionTypeId: "STYLE_SIZE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".line-v.absolute",
                  selectorGuids: [
                    "8733da6d-21a8-7ea6-6277-16cbff217e5e",
                    "83567cab-05a7-0b19-371a-ea539afb7ee6",
                  ],
                },
                heightValue: 100,
                widthUnit: "PX",
                heightUnit: "%",
                locked: false,
              },
            },
            {
              id: "a-12-n-13",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".tilted-small",
                  selectorGuids: ["598737df-7a91-dfad-034d-252172eb707f"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731553903588,
    },
    "a-13": {
      id: "a-13",
      title: "Work Images Animation",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-13-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
                },
                xValue: 150,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|d196ca1c-9f55-c65e-19a3-ef8af0f80c25",
                },
                xValue: 350,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|b3b8e459-8daa-9117-45aa-b56f85ed8d36",
                },
                xValue: 550,
                yValue: null,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-7",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".work-img-wrapper",
                  selectorGuids: ["038bc401-6222-19ea-ba7a-0de2150d8c83"],
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-13-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|b3b8e459-8daa-9117-45aa-b56f85ed8d36",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 600,
                target: {
                  useEventTarget: "CHILDREN",
                  id: "6731eb232fcc314baee41b06|d196ca1c-9f55-c65e-19a3-ef8af0f80c25",
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-13-n-8",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 800,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".work-img-wrapper",
                  selectorGuids: ["038bc401-6222-19ea-ba7a-0de2150d8c83"],
                },
                value: 0.32,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731570342827,
    },
    "a-14": {
      id: "a-14",
      title: "Hover Opacity Full",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-14-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-14-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-14-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-14-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-14-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                xValue: 4,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731571443504,
    },
    "a-15": {
      id: "a-15",
      title: "Hover Opacity Less",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-15-n",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: true,
                  id: "6731eb232fcc314baee41b06|6754c14f-c310-3f58-c9ed-2f9a8a670401",
                },
                value: 0.3,
                unit: "",
              },
            },
            {
              id: "a-15-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                xValue: 0,
                xUnit: "px",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-15-n-3",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".arrow-icon._2",
                  selectorGuids: [
                    "d9ec5bf4-96cb-a9b6-2d3c-272b108c599c",
                    "7f759545-236b-6d32-cd82-07e68a9c9462",
                  ],
                },
                value: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731571443504,
    },
    "a-16": {
      id: "a-16",
      title: "Our Projects Animation Section",
      continuousParameterGroups: [
        {
          id: "a-16-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-16-n",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    value: 0.3,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".projects",
                      selectorGuids: ["5c156b84-3b34-9d35-be17-3f3587b3e7d2"],
                    },
                    xValue: -35,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-16-n-6",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".h2-7.margin",
                      selectorGuids: [
                        "0a744c33-e872-460c-b2a9-7cf2b5889db9",
                        "eea67c8d-e5cd-039d-7179-969547f0e5f2",
                      ],
                    },
                    xValue: 6,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-16-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-11",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-12",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 8,
              actionItems: [
                {
                  id: "a-16-n-3",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    value: 0.3,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".projects",
                      selectorGuids: ["5c156b84-3b34-9d35-be17-3f3587b3e7d2"],
                    },
                    xValue: 8,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 15,
              actionItems: [
                {
                  id: "a-16-n-2",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-7",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".h2-7.margin",
                      selectorGuids: [
                        "0a744c33-e872-460c-b2a9-7cf2b5889db9",
                        "eea67c8d-e5cd-039d-7179-969547f0e5f2",
                      ],
                    },
                    xValue: 0,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-16-n-8",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".projects",
                      selectorGuids: ["5c156b84-3b34-9d35-be17-3f3587b3e7d2"],
                    },
                    xValue: 0,
                    xUnit: "vw",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 20,
              actionItems: [
                {
                  id: "a-16-n-10",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-13",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-16-n-14",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 100,
              actionItems: [
                {
                  id: "a-16-n-15",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1731584977473,
    },
    "a-17": {
      id: "a-17",
      title: "Our Projects Animation Container",
      continuousParameterGroups: [
        {
          id: "a-17-p",
          type: "SCROLL_PROGRESS",
          parameterLabel: "Scroll",
          continuousActionGroups: [
            {
              keyframe: 0,
              actionItems: [
                {
                  id: "a-17-n-6",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-45",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-7",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-46",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-8",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-25",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-26",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-27",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-29",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    xValue: 0,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-47",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|07a94047-d60d-7bf5-4656-dbb4223a9881",
                    },
                    widthValue: 52,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-56",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-57",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 8,
              actionItems: [
                {
                  id: "a-17-n-28",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-30",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    xValue: 8,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 16,
              actionItems: [
                {
                  id: "a-17-n",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    xValue: 0,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-9",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|07a94047-d60d-7bf5-4656-dbb4223a9881",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-11",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-48",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|07a94047-d60d-7bf5-4656-dbb4223a9881",
                    },
                    widthValue: 52,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-50",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 20,
              actionItems: [
                {
                  id: "a-17-n-33",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-32",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    xValue: 0,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-42",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 26,
              actionItems: [
                {
                  id: "a-17-n-2",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    xValue: -56,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-10",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|07a94047-d60d-7bf5-4656-dbb4223a9881",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-12",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-31",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-34",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    xValue: 8,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-39",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|c15ac6a5-840b-c76f-bbad-510efb469c3d",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-49",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|07a94047-d60d-7bf5-4656-dbb4223a9881",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-51",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 52,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 46,
              actionItems: [
                {
                  id: "a-17-n-4",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    xValue: -56,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-13",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-15",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-52",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-54",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 52,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 52,
              actionItems: [
                {
                  id: "a-17-n-35",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-36",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    xValue: 0,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-43",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 58,
              actionItems: [
                {
                  id: "a-17-n-5",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      selector: ".our-projects-wrapper-mover",
                      selectorGuids: ["139093e1-e1dd-3c96-2053-05f176848a8e"],
                    },
                    xValue: -104,
                    xUnit: "%",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-14",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    value: 0.3,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-16",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-37",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-38",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    xValue: 8,
                    xUnit: "px",
                    yUnit: "PX",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-40",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|dccf90d9-798d-57d7-2067-c0a51ab59dcf",
                    },
                    value: 0,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-53",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    widthValue: 52,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-55",
                  actionTypeId: "STYLE_SIZE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    locked: false,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|7950b8d4-0b04-4eb3-fe9a-a70031e600ba",
                    },
                    widthValue: 28,
                    widthUnit: "vw",
                    heightUnit: "PX",
                  },
                },
              ],
            },
            {
              keyframe: 66,
              actionItems: [
                {
                  id: "a-17-n-17",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-19",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-21",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|27fc751c-7ffb-284b-5c52-4df6c1caa4d5",
                    },
                    xValue: null,
                    yValue: 50,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-23",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|27fc751c-7ffb-284b-5c52-4df6c1caa4d7",
                    },
                    yValue: 100,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-44",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    value: 1,
                    unit: "",
                  },
                },
              ],
            },
            {
              keyframe: 72,
              actionItems: [
                {
                  id: "a-17-n-18",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|a7a11673-624a-12e6-913d-85dd30338083",
                    },
                    value: 0.2,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-20",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|346c0e79-85a3-040e-d763-b3231f91a150",
                    },
                    value: 1,
                    unit: "",
                  },
                },
                {
                  id: "a-17-n-22",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|27fc751c-7ffb-284b-5c52-4df6c1caa4d5",
                    },
                    xValue: null,
                    yValue: 0,
                    xUnit: "px",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-24",
                  actionTypeId: "TRANSFORM_MOVE",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|27fc751c-7ffb-284b-5c52-4df6c1caa4d7",
                    },
                    yValue: 0,
                    xUnit: "PX",
                    yUnit: "px",
                    zUnit: "PX",
                  },
                },
                {
                  id: "a-17-n-41",
                  actionTypeId: "STYLE_OPACITY",
                  config: {
                    delay: 0,
                    easing: "",
                    duration: 500,
                    target: {
                      useEventTarget: "CHILDREN",
                      id: "6731eb232fcc314baee41b06|14f22fd6-b45b-126b-9f85-cab4ac9ea820",
                    },
                    value: 0,
                    unit: "",
                  },
                },
              ],
            },
          ],
        },
      ],
      createdOn: 1731607334573,
    },
    "a-18": {
      id: "a-18",
      title: "Image Parallax 1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-18-n",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".office-img",
                  selectorGuids: ["18f661a1-4252-2e76-62e1-6888360713c1"],
                },
                xValue: 1.24,
                yValue: 1.24,
                locked: true,
              },
            },
            {
              id: "a-18-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lines._1",
                  selectorGuids: [
                    "f3da2733-347c-4ec9-a68e-ccde01f7c2df",
                    "dd82515a-63fa-0440-aea2-f10ae064b1f9",
                  ],
                },
                yValue: -100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lines._2",
                  selectorGuids: [
                    "f3da2733-347c-4ec9-a68e-ccde01f7c2df",
                    "0b84d863-a930-a3c2-e6e1-f983c685eb8c",
                  ],
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-18-n-2",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".office-img",
                  selectorGuids: ["18f661a1-4252-2e76-62e1-6888360713c1"],
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-18-n-4",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lines._1",
                  selectorGuids: [
                    "f3da2733-347c-4ec9-a68e-ccde01f7c2df",
                    "dd82515a-63fa-0440-aea2-f10ae064b1f9",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-18-n-6",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 400,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".lines._2",
                  selectorGuids: [
                    "f3da2733-347c-4ec9-a68e-ccde01f7c2df",
                    "0b84d863-a930-a3c2-e6e1-f983c685eb8c",
                  ],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731617344342,
    },
    "a-30": {
      id: "a-30",
      title: "Page Load Animation 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-30-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "block",
              },
            },
            {
              id: "a-30-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-30-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 4,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 50,
                yValue: 50,
                locked: true,
              },
            },
            {
              id: "a-30-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-30-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 400,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 600,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-15",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 360,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 8,
                yValue: 8,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-16",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-30-n-20",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-25",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-28",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-30-n-29",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-30-n-30",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-31",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-32",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 400,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-30-n-33",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-34",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-30-n-35",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-36",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-37",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-38",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-39",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-40",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-41",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-42",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-43",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-44",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-30-n-45",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 10,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731652910484,
    },
    "a-20": {
      id: "a-20",
      title: "Nav Opens",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-20-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  useEventTarget: true,
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
                },
                globalSwatchId: "",
                rValue: 24,
                bValue: 24,
                gValue: 24,
                aValue: 1,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731664451031,
    },
    "a-21": {
      id: "a-21",
      title: "Nav Closes",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-21-n",
              actionTypeId: "STYLE_BACKGROUND_COLOR",
              config: {
                delay: 300,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: true,
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a2",
                },
                globalSwatchId: "",
                rValue: 24,
                bValue: 24,
                gValue: 24,
                aValue: 0,
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731664451031,
    },
    "a-22": {
      id: "a-22",
      title: "Nav Drop Down Opens Mobile",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-22-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list-main",
                  selectorGuids: ["497d0def-725d-490b-2ea3-6d8c2e0a18a1"],
                },
                yValue: -220,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-22-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-22-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list-main",
                  selectorGuids: ["497d0def-725d-490b-2ea3-6d8c2e0a18a1"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731667183103,
    },
    "a-23": {
      id: "a-23",
      title: "Nav Drop Down Closes Mobile 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-23-n",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list-main",
                  selectorGuids: ["497d0def-725d-490b-2ea3-6d8c2e0a18a1"],
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-23-n-3",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "flex",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-2",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list-main",
                  selectorGuids: ["497d0def-725d-490b-2ea3-6d8c2e0a18a1"],
                },
                yValue: -120,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-23-n-4",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  useEventTarget: "CHILDREN",
                  selector: ".nav-link-dropdown-list",
                  selectorGuids: ["aa7ad841-7a60-82fe-3176-53325ee98356"],
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: false,
      createdOn: 1731667183103,
    },
    "a-28": {
      id: "a-28",
      title: "Page Load Animation Tab",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-28-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "block",
              },
            },
            {
              id: "a-28-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-28-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 34,
                yValue: 46,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1.6,
                yValue: 1.6,
                locked: true,
              },
            },
            {
              id: "a-28-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 4,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 50,
                yValue: 50,
                locked: true,
              },
            },
            {
              id: "a-28-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 400,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 600,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-49",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                value: "none",
              },
            },
            {
              id: "a-28-n-51",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-16",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 360,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 8,
                yValue: 8,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-17",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-19",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-20",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-28-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-25",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-26",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-27",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-50",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                value: "block",
              },
            },
            {
              id: "a-28-n-52",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-28",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-29",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-28-n-30",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-31",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-32",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-33",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-34",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 400,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-28-n-35",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-36",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-37",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-28-n-38",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-39",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-40",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-41",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-42",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-43",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-44",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-45",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-46",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-47",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-28-n-48",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 10,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731652910484,
    },
    "a-27": {
      id: "a-27",
      title: "Page Load Animation Mobile 1",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-27-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "block",
              },
            },
            {
              id: "a-27-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 30,
                yValue: 46,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1.6,
                yValue: 1.6,
                locked: true,
              },
            },
            {
              id: "a-27-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 4,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 50,
                yValue: 50,
                locked: true,
              },
            },
            {
              id: "a-27-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 400,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 600,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-15",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-49",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-16",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 360,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 8,
                yValue: 8,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-17",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-19",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-20",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-27-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-25",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-26",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-27",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-50",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-28",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-29",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-27-n-30",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-31",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-32",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-33",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-34",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 400,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-27-n-35",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-36",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-37",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-27-n-38",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-39",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-40",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-41",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-42",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-43",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-44",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-45",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-46",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-47",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-27-n-48",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 10,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731652910484,
    },
    "a-26": {
      id: "a-26",
      title: "Page Load Animation Mobile 2",
      actionItemGroups: [
        {
          actionItems: [
            {
              id: "a-26-n",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "block",
              },
            },
            {
              id: "a-26-n-2",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-26-n-3",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 22,
                yValue: 46,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-4",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1.6,
                yValue: 1.6,
                locked: true,
              },
            },
            {
              id: "a-26-n-5",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 4,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-6",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 50,
                yValue: 50,
                locked: true,
              },
            },
            {
              id: "a-26-n-7",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-8",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 30,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-9",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-10",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-11",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-26-n-12",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-13",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 400,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-14",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 600,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-46",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-49",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "none",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-15",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 0,
                easing: "",
                duration: 360,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 8,
                yValue: 8,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-16",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-17",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|88be718f-ca88-6c18-bf39-e0cb9e8a8db3",
                },
                xValue: 0,
                xUnit: "vw",
                yUnit: "PX",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-18",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|1887f2e1-cbcd-1552-9ac6-ee61c95dadd0",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-19",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 1,
                unit: "",
              },
            },
            {
              id: "a-26-n-20",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 100,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-21",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 300,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-22",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 0,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 200,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-23",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 300,
                target: {
                  id: "6731eb232fcc314baee41b06|89430729-d319-1730-40d0-a00715395cd5",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-24",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-25",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-47",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: -80,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-50",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 200,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ad",
                },
                value: "block",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-26",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 0,
                yValue: 0,
                xUnit: "vw",
                yUnit: "vh",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-27",
              actionTypeId: "TRANSFORM_SCALE",
              config: {
                delay: 1000,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a4",
                },
                xValue: 1,
                yValue: 1,
                locked: true,
              },
            },
            {
              id: "a-26-n-28",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1100,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-26-n-29",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 1000,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-26-n-30",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8a5",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-31",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|edb6610b-b4f3-4989-1849-37d86ba64e5e",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-32",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 1200,
                easing: "",
                duration: 400,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0,
                unit: "",
              },
            },
            {
              id: "a-26-n-33",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|c98c3766-7de6-deff-29e1-e4e9babb70f7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-34",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|74baf184-60c4-537e-d278-237f67b6b3b7",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-35",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 500,
                target: {
                  id: "6731eb232fcc314baee41b06|337758a9-b403-6ba0-6096-b4e2923800e4",
                },
                yValue: 0,
                xUnit: "PX",
                yUnit: "px",
                zUnit: "PX",
              },
            },
            {
              id: "a-26-n-48",
              actionTypeId: "TRANSFORM_MOVE",
              config: {
                delay: 1200,
                easing: "",
                duration: 600,
                target: {
                  id: "6731eb232fcc314baee41b06|d210aff6-50c9-1211-2555-c39c706be8ac",
                },
                xValue: null,
                yValue: 0,
                xUnit: "px",
                yUnit: "px",
                zUnit: "PX",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-36",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-37",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-38",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-39",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-40",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-41",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-42",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-43",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 1,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-44",
              actionTypeId: "STYLE_OPACITY",
              config: {
                delay: 0,
                easing: "",
                duration: 100,
                target: {
                  id: "6731eb232fcc314baee41b06|181c2952-3e78-faf2-d983-06f0159206c6",
                },
                value: 0.2,
                unit: "",
              },
            },
          ],
        },
        {
          actionItems: [
            {
              id: "a-26-n-45",
              actionTypeId: "GENERAL_DISPLAY",
              config: {
                delay: 10,
                easing: "",
                duration: 0,
                target: {
                  id: "6731eb232fcc314baee41b06|f7339a0f-726c-ee40-f7b1-6393d1aa4f68",
                },
                value: "none",
              },
            },
          ],
        },
      ],
      useFirstGroupAsInitialState: true,
      createdOn: 1731652910484,
    },
  },
  site: {
    mediaQueries: [
      { key: "main", min: 992, max: 10000 },
      { key: "medium", min: 768, max: 991 },
      { key: "small", min: 480, max: 767 },
      { key: "tiny", min: 0, max: 479 },
    ],
  },
});
