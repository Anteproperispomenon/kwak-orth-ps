#!/usr/bin/env node
(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };
  var compose = function(dict) {
    return dict.compose;
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result2 = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result2[i2] = f(arr[i2]);
      }
      return result2;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map115($$const(x))(f);
      };
    };
  };
  var functorFn = {
    map: /* @__PURE__ */ compose(semigroupoidFn)
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map33 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map33($$const(identity2))(a2))(b2);
      };
    };
  };
  var lift2 = function(dictApply) {
    var apply1 = apply(dictApply);
    var map33 = map(dictApply.Functor0());
    return function(f) {
      return function(a2) {
        return function(b2) {
          return apply1(map33(f)(a2))(b2);
        };
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure110 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure110(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure110 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply3(pure110(f))(a2);
      };
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind110 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind110(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq7) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq7 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqUnit = {
    eq: function(v) {
      return function(v1) {
        return true;
      };
    }
  };
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordUnit = {
    compare: function(v) {
      return function(v1) {
        return EQ.value;
      };
    },
    Eq0: function() {
      return eqUnit;
    }
  };
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showCharImpl = function(c) {
    var code2 = c.charCodeAt(0);
    if (code2 < 32 || code2 === 127) {
      switch (c) {
        case "\x07":
          return "'\\a'";
        case "\b":
          return "'\\b'";
        case "\f":
          return "'\\f'";
        case "\n":
          return "'\\n'";
        case "\r":
          return "'\\r'";
        case "	":
          return "'\\t'";
        case "\v":
          return "'\\v'";
      }
      return "'\\" + code2.toString(10) + "'";
    }
    return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i2) {
        switch (c) {
          case '"':
          case "\\":
            return "\\" + c;
          case "\x07":
            return "\\a";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "	":
            return "\\t";
          case "\v":
            return "\\v";
        }
        var k = i2 + 1;
        var empty8 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty8;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showRecordFields = function(dict) {
    return dict.showRecordFields;
  };
  var showRecord = function() {
    return function() {
      return function(dictShowRecordFields) {
        var showRecordFields1 = showRecordFields(dictShowRecordFields);
        return {
          show: function(record) {
            return "{" + (showRecordFields1($$Proxy.value)(record) + "}");
          }
        };
      };
    };
  };
  var showInt = {
    show: showIntImpl
  };
  var showChar = {
    show: showCharImpl
  };
  var show = function(dict) {
    return dict.show;
  };
  var showRecordFieldsCons = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShowRecordFields) {
      var showRecordFields1 = showRecordFields(dictShowRecordFields);
      return function(dictShow) {
        var show13 = show(dictShow);
        return {
          showRecordFields: function(v) {
            return function(record) {
              var tail2 = showRecordFields1($$Proxy.value)(record);
              var key = reflectSymbol2($$Proxy.value);
              var focus3 = unsafeGet(key)(record);
              return " " + (key + (": " + (show13(focus3) + ("," + tail2))));
            };
          }
        };
      };
    };
  };
  var showRecordFieldsConsNil = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function(dictShow) {
      var show13 = show(dictShow);
      return {
        showRecordFields: function(v) {
          return function(record) {
            var key = reflectSymbol2($$Proxy.value);
            var focus3 = unsafeGet(key)(record);
            return " " + (key + (": " + (show13(focus3) + " ")));
          };
        }
      };
    };
  };

  // output/Data.Generic.Rep/index.js
  var from = function(dict) {
    return dict.from;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error5) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error5) {
        setTimeout(function() {
          throw error5;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error5) {
        return left(error5);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error5) {
        k(left(error5))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result2) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result2) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result2) && util.fromLeft(result2)) {
                    setTimeout(function() {
                      throw util.fromLeft(result2);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error5) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail3 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result2, attempt2;
        while (true) {
          tmp = null;
          result2 = null;
          attempt2 = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail3 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail3 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result3) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result3;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail3 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail3 || step4;
              } else {
                tmp = attempts._3;
                attempt2 = attempts._1;
                attempts = attempts._2;
                switch (attempt2.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail3) {
                      status = CONTINUE;
                      step4 = attempt2._2(util.fromLeft(fail3));
                      fail3 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail3) {
                      status = RETURN;
                    } else {
                      bhead = attempt2._1;
                      btail = attempt2._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail3 === null) {
                      result2 = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt2._2, result2), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt2._3(result2);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt2._1.killed(util.fromLeft(interrupt))(attempt2._2);
                    } else if (fail3) {
                      step4 = attempt2._1.failed(util.fromLeft(fail3))(attempt2._2);
                    } else {
                      step4 = attempt2._1.completed(util.fromRight(step4))(attempt2._2);
                    }
                    fail3 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt2._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt2._1;
                    fail3 = attempt2._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail3) {
                setTimeout(function() {
                  throw util.fromLeft(fail3);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error5, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error5);
              status = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error5)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail3 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error5);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail3 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error5, par2, cb2) {
        var step4 = par2;
        var head5 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error5, function(result2) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result2)();
                      }
                    };
                  });
                }
                if (head5 === null) {
                  break loop;
                }
                step4 = head5._2;
                if (tail2 === null) {
                  head5 = null;
                } else {
                  head5 = tail2._1;
                  tail2 = tail2._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head5) {
                  tail2 = new Aff2(CONS, head5, tail2);
                }
                head5 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result2, head5, tail2) {
        var fail3, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result2)) {
          fail3 = result2;
          step4 = null;
        } else {
          step4 = result2;
          fail3 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head5 === null) {
              cb(fail3 || step4)();
              return;
            }
            if (head5._3 !== EMPTY) {
              return;
            }
            switch (head5.tag) {
              case MAP:
                if (fail3 === null) {
                  head5._3 = util.right(head5._1(util.fromRight(step4)));
                  step4 = head5._3;
                } else {
                  head5._3 = fail3;
                }
                break;
              case APPLY:
                lhs = head5._1._3;
                rhs = head5._2._3;
                if (fail3) {
                  head5._3 = fail3;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail3 === lhs ? head5._2 : head5._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(fail3, null, null);
                      } else {
                        join3(fail3, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head5._3 = step4;
                }
                break;
              case ALT:
                lhs = head5._1._3;
                rhs = head5._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail3 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head5._3 = fail3;
                } else {
                  head5._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step4 === lhs ? head5._2 : head5._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail2 === null) {
                        join3(step4, null, null);
                      } else {
                        join3(step4, tail2._1, tail2._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail2 === null) {
              head5 = null;
            } else {
              head5 = tail2._1;
              tail2 = tail2._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result2) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result2;
            join3(result2, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step4 = par;
        var head5 = null;
        var tail2 = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head5) {
                      tail2 = new Aff2(CONS, head5, tail2);
                    }
                    head5 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head5, tail2), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head5 === null) {
                  break loop;
                }
                if (head5._1 === EMPTY) {
                  head5._1 = step4;
                  status = CONTINUE;
                  step4 = head5._2;
                  head5._2 = EMPTY;
                } else {
                  head5._2 = step4;
                  step4 = head5;
                  if (tail2 === null) {
                    head5 = null;
                  } else {
                    head5 = tail2._1;
                    tail2 = tail2._2;
                  }
                }
            }
          }
        root = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error5, cb2) {
        interrupt = util.left(error5);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error5, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value19) {
          return Aff.Pure(f(value19));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind25 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind25(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind25 = bind(dictMonad.Bind1());
    var pure29 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind25(f)(function(f$prime) {
          return bind25(a2)(function(a$prime) {
            return pure29(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var fromRight = function(v) {
    return function(v1) {
      if (v1 instanceof Right) {
        return v1.value0;
      }
      ;
      return v;
    };
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map33 = map(Monad0.Bind1().Apply0().Functor0());
    var pure29 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map33(Right.create)(a2))(function($52) {
        return pure29(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var tailRec = function(f) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Loop) {
          $copy_v = f(v.value0);
          return;
        }
        ;
        if (v instanceof Done) {
          $tco_done = true;
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 103, column 3 - line 103, column 25): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go2(f($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f) {
      var runIdentity = function(v) {
        return v;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do2() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do3() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map3(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };
  var bifunctorStep = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Loop) {
            return new Loop(v(v2.value0));
          }
          ;
          if (v2 instanceof Done) {
            return new Done(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 33, column 1 - line 35, column 34): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj15 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj15(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq7 = eq(dictEq);
    return function(dictEq1) {
      var eq17 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq7(x.value0)(y.value0) && eq17(x.value1)(y.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare3 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x) {
          return function(y) {
            var v = compare3(x.value0)(y.value0);
            if (v instanceof LT) {
              return LT.value;
            }
            ;
            if (v instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x.value1)(y.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var put = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(s) {
      return state1(function(v) {
        return new Tuple(unit, s);
      });
    };
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var modify2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        var s$prime = f(s);
        return new Tuple(s$prime, s$prime);
      });
    };
  };
  var gets = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(f(s), s);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Control.Monad.Trans.Class/index.js
  var lift = function(dict) {
    return dict.lift;
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map4 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map115 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map115(map4(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind25 = bind(dictMonad.Bind1());
    var pure29 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind25(v)(either(function($187) {
            return pure29(Left.create($187));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond7 = applySecond(dictApplicative.Apply0());
    var pure29 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond7(f($454));
        })(pure29(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var intercalate = function(dictFoldable) {
    var foldl2 = foldl(dictFoldable);
    return function(dictMonoid) {
      var append10 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(sep) {
        return function(xs) {
          var go2 = function(v) {
            return function(v1) {
              if (v.init) {
                return {
                  init: false,
                  acc: v1
                };
              }
              ;
              return {
                init: false,
                acc: append10(v.acc)(append10(sep)(v1))
              };
            };
          };
          return foldl2(go2)({
            init: true,
            acc: mempty3
          })(xs).acc;
        };
      };
    };
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty3;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append10 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append10(f(x))(acc);
          };
        })(mempty3);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat22(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map33) {
        return function(pure29) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure29([]);
                  case 1:
                    return map33(array1)(f(array[bot]));
                  case 2:
                    return apply3(map33(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map33(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply3(map33(concat22)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Control.Parallel/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var parallel4 = parallel(dictParallel);
    return function(dictApplicative) {
      var traverse_7 = traverse_(dictApplicative);
      return function(dictFoldable) {
        var traverse_14 = traverse_7(dictFoldable);
        return function(f) {
          var $51 = traverse_14(function($53) {
            return parallel4(f($53));
          });
          return function($52) {
            return sequential3($51($52));
          };
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictApplicative) {
      var parTraverse_2 = parTraverse_1(dictApplicative);
      return function(dictFoldable) {
        return parTraverse_2(dictFoldable)(identity4);
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map5 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do2() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Apply0: function() {
      return applyAff;
    },
    Apply1: function() {
      return applyParAff;
    }
  };
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var applicativeParAff = {
    pure: function($76) {
      return parallel2(pure22($76));
    },
    Apply0: function() {
      return applyParAff;
    }
  };
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableArray);
  var semigroupCanceler = {
    append: function(v) {
      return function(v1) {
        return function(err) {
          return parSequence_2([v(err), v1(err)]);
        };
      };
    }
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($77) {
    return Canceler($$const(liftEffect2($77)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map5(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map5(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var attempt = $$try2;
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));
  var monoidCanceler = {
    mempty: nonCanceler,
    Semigroup0: function() {
      return semigroupCanceler;
    }
  };

  // output/Control.Monad.State.Trans/index.js
  var monadTransStateT = {
    lift: function(dictMonad) {
      var bind25 = bind(dictMonad.Bind1());
      var pure29 = pure(dictMonad.Applicative0());
      return function(m) {
        return function(s) {
          return bind25(m)(function(x) {
            return pure29(new Tuple(x, s));
          });
        };
      };
    }
  };
  var functorStateT = function(dictFunctor) {
    var map33 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map33(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var evalStateT = function(dictFunctor) {
    var map33 = map(dictFunctor);
    return function(v) {
      return function(s) {
        return map33(fst)(v(s));
      };
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    var bind25 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind25(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure29 = pure(dictMonad.Applicative0());
    return {
      pure: function(a2) {
        return function(s) {
          return pure29(new Tuple(a2, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadRecStateT = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var bind25 = bind(Monad0.Bind1());
    var pure29 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    var monadStateT1 = monadStateT(Monad0);
    return {
      tailRecM: function(f) {
        return function(a2) {
          var f$prime = function(v) {
            var v1 = f(v.value0);
            return bind25(v1(v.value1))(function(v2) {
              return pure29(function() {
                if (v2.value0 instanceof Loop) {
                  return new Loop(new Tuple(v2.value0.value0, v2.value1));
                }
                ;
                if (v2.value0 instanceof Done) {
                  return new Done(new Tuple(v2.value0.value0, v2.value1));
                }
                ;
                throw new Error("Failed pattern match at Control.Monad.State.Trans (line 87, column 16 - line 89, column 40): " + [v2.value0.constructor.name]);
              }());
            });
          };
          return function(s) {
            return tailRecM4(f$prime)(new Tuple(a2, s));
          };
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure29 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure29(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };
  var altStateT = function(dictMonad) {
    return function(dictAlt) {
      var alt13 = alt(dictAlt);
      var functorStateT1 = functorStateT(dictAlt.Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return function(s) {
              return alt13(v(s))(v1(s));
            };
          };
        },
        Functor0: function() {
          return functorStateT1;
        }
      };
    };
  };
  var plusStateT = function(dictMonad) {
    var altStateT1 = altStateT(dictMonad);
    return function(dictPlus) {
      var empty8 = empty(dictPlus);
      var altStateT2 = altStateT1(dictPlus.Alt0());
      return {
        empty: function(v) {
          return empty8;
        },
        Alt0: function() {
          return altStateT2;
        }
      };
    };
  };
  var alternativeStateT = function(dictMonad) {
    var applicativeStateT1 = applicativeStateT(dictMonad);
    var plusStateT1 = plusStateT(dictMonad);
    return function(dictAlternative) {
      var plusStateT2 = plusStateT1(dictAlternative.Plus1());
      return {
        Applicative0: function() {
          return applicativeStateT1;
        },
        Plus1: function() {
          return plusStateT2;
        }
      };
    };
  };

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.DOM.ParentNode/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map6(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target7) {
          return function() {
            return target7.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name17, value19) {
    if (typeof window !== "undefined") {
      var ty = window[name17];
      if (ty != null && value19 instanceof ty) {
        return just(value19);
      }
    }
    var obj = value19;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name17) {
        return just(value19);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name17) {
    return function(value19) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name17, value19);
    };
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map7 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map7(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value19) {
    var tag = Object.prototype.toString.call(value19);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value19);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.HTMLInputElement/foreign.js
  function _files(input3) {
    return function() {
      return input3.files;
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var map8 = /* @__PURE__ */ map(functorEffect);
  var fromEventTarget = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");
  var files = /* @__PURE__ */ function() {
    var $6 = map8(toMaybe);
    return function($7) {
      return $6(_files($7));
    };
  }();

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result2 = [];
              var value19 = b2;
              while (true) {
                var maybe2 = f(value19);
                if (isNothing2(maybe2))
                  return result2;
                var tuple = fromJust6(maybe2);
                result2.push(fst2(tuple));
                value19 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result2 = [];
              var value19 = b2;
              while (true) {
                var tuple = f(value19);
                result2.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result2;
                value19 = fromJust6(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };
  var none = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)($$const(Nothing.value))(unit);
  };

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    var toEnum1 = toEnum(dictBoundedEnum);
    var fromEnum1 = fromEnum(dictBoundedEnum);
    var bottom22 = bottom(dictBoundedEnum.Bounded0());
    return function(low2) {
      return function(high2) {
        return function(x) {
          var v = toEnum1(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $140 = x < fromEnum1(bottom22);
            if ($140) {
              return low2;
            }
            ;
            return high2;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a2) {
        return toEnum$prime(fromEnum$prime(a2) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.HTML.Event.EventTypes/index.js
  var load2 = "load";
  var error2 = "error";
  var domcontentloaded = "DOMContentLoaded";
  var change = "change";

  // output/Halogen.Aff.Util/index.js
  var bind2 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure3 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure1 = /* @__PURE__ */ pure(applicativeEffect);
  var map9 = /* @__PURE__ */ map(functorEffect);
  var discard2 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query4) {
    return bind2(liftEffect3(bindFlipped4(composeKleisliFlipped2(function() {
      var $16 = querySelector(query4);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure3(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure1(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do2() {
      var rs = bindFlipped4(readyState)(bindFlipped4(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map9(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard2(bindAff)(awaitLoad)(function() {
    return bind2(selectElement("body"))(function(body2) {
      return maybe(throwError2(error("Could not find body")))(pure3)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork = function(dict) {
    return dict.fork;
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty8 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty8);
    };
  };
  var showNonEmpty = function(dictShow) {
    var show6 = show(dictShow);
    return function(dictShow1) {
      var show13 = show(dictShow1);
      return {
        show: function(v) {
          return "(NonEmpty " + (show6(v.value0) + (" " + (show13(v.value1) + ")")));
        }
      };
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var map10 = /* @__PURE__ */ map(functorList);
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty3 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty3);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var intercalate2 = /* @__PURE__ */ intercalate(foldableList)(monoidString);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var showList = function(dictShow) {
    var show6 = show(dictShow);
    return {
      show: function(v) {
        if (v instanceof Nil) {
          return "Nil";
        }
        ;
        return "(" + (intercalate2(" : ")(map10(show6)(v)) + " : Nil)");
      }
    };
  };
  var showNonEmptyList = function(dictShow) {
    var show6 = show(showNonEmpty(dictShow)(showList(dictShow)));
    return {
      show: function(v) {
        return "(NonEmptyList " + (show6(v) + ")");
      }
    };
  };
  var applyList = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(map10(v.value0)(v1))(apply(applyList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 157, column 1 - line 159, column 48): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorList;
    }
  };
  var bindList = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Nil) {
          return Nil.value;
        }
        ;
        if (v instanceof Cons) {
          return append1(v1(v.value0))(bind(bindList)(v.value1)(v1));
        }
        ;
        throw new Error("Failed pattern match at Data.List.Types (line 164, column 1 - line 166, column 37): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyList;
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var bimap2 = /* @__PURE__ */ bimap(bifunctorStep);
  var bind3 = /* @__PURE__ */ bind(bindList);
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var uncons = function(v) {
    if (v instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v instanceof Cons) {
      return new Just({
        head: v.value0,
        tail: v.value1
      });
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
  };
  var singleton3 = function(a2) {
    return new Cons(a2, Nil.value);
  };
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var manyRec = function(dictMonadRec) {
    var bind110 = bind(dictMonadRec.Monad0().Bind1());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(dictAlternative) {
      var Alt0 = dictAlternative.Plus1().Alt0();
      var alt13 = alt(Alt0);
      var map115 = map(Alt0.Functor0());
      var pure29 = pure(dictAlternative.Applicative0());
      return function(p2) {
        var go2 = function(acc) {
          return bind110(alt13(map115(Loop.create)(p2))(pure29(new Done(unit))))(function(aa) {
            return pure29(bimap2(function(v) {
              return new Cons(v, acc);
            })(function(v) {
              return reverse(acc);
            })(aa));
          });
        };
        return tailRecM4(go2)(Nil.value);
      };
    };
  };
  var someRec = function(dictMonadRec) {
    var manyRec1 = manyRec(dictMonadRec);
    return function(dictAlternative) {
      var apply3 = apply(dictAlternative.Applicative0().Apply0());
      var map115 = map(dictAlternative.Plus1().Alt0().Functor0());
      var manyRec22 = manyRec1(dictAlternative);
      return function(v) {
        return apply3(map115(Cons.create)(v))(manyRec22(v));
      };
    };
  };
  var concat = function(v) {
    return bind3(v)(identity5);
  };

  // output/Data.Map.Internal/index.js
  var $runtime_lazy3 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var map11 = /* @__PURE__ */ map(functorMaybe);
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  }();
  var Split = /* @__PURE__ */ function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  }();
  var SplitLast = /* @__PURE__ */ function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 680, column 5 - line 684, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $277 = l.value0 > r.value0;
          if ($277) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 686, column 5 - line 690, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 678, column 32 - line 690, column 68): " + [l.constructor.name]);
  };
  var singleton4 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 735, column 12 - line 737, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton4(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 695, column 40 - line 716, column 34): " + [l.constructor.name]);
    };
  }();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy3("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(771)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(774)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 769, column 5 - line 777, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 765, column 34 - line 777, column 30): " + [m.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(764);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy3("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(757)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 754, column 37 - line 758, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(753);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 742, column 25 - line 746, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var pop = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(m) {
        var v = unsafeSplit(compare3, k, m);
        return map11(function(a2) {
          return new Tuple(a2, unsafeJoinNodes(v.value1, v.value2));
        })(v.value0);
      };
    };
  };
  var lookup = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Node) {
            var v1 = compare3(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value3);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 281, column 7 - line 284, column 22): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 278, column 8 - line 284, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var insert = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton4(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare3(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 469, column 7 - line 472, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 466, column 8 - line 472, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(170)(m$prime.value4, f(m$prime.value3)($lazy_go(170)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 167, column 26 - line 170, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(167);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy3("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(176)(f($lazy_go(176)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 173, column 26 - line 176, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(173);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty3 = mempty(dictMonoid);
      var append12 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty3;
          }
          ;
          if (v instanceof Node) {
            return append12(go2(v.value4))(append12(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 179, column 10 - line 182, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare3(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go2(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go2(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            return unsafeJoinNodes(v.value4, v.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 496, column 7 - line 499, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 493, column 8 - line 499, column 43): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var alter = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = unsafeSplit(compare3, k, m);
          var v2 = f(v.value0);
          if (v2 instanceof Nothing) {
            return unsafeJoinNodes(v.value1, v.value2);
          }
          ;
          if (v2 instanceof Just) {
            return unsafeBalancedNode(k, v2.value0, v.value1, v.value2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 512, column 3 - line 516, column 41): " + [v2.constructor.name]);
        };
      };
    };
  };

  // output/Effect.Console/foreign.js
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v) {
      return function(v1) {
        return v.value0(v.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v) {
      return function(v1) {
        return v.value1(v.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup(ordTuple2);
  var insert1 = /* @__PURE__ */ insert(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v);
            };
          };
        };
      };
    };
  };
  var lookup2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(v) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(v);
            };
          };
        };
      };
    };
  };
  var insert2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key) {
            return function(val) {
              return function(v) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key)))(val)(v);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty3 = empty2;

  // output/Data.String.Common/foreign.js
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.String.Common/index.js
  var $$null2 = function(s) {
    return s === "";
  };

  // output/DOM.HTML.Indexed.InputAcceptType/index.js
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var map12 = /* @__PURE__ */ map(functorArray);
  var AcceptMediaType = /* @__PURE__ */ function() {
    function AcceptMediaType2(value0) {
      this.value0 = value0;
    }
    ;
    AcceptMediaType2.create = function(value0) {
      return new AcceptMediaType2(value0);
    };
    return AcceptMediaType2;
  }();
  var AcceptFileExtension = /* @__PURE__ */ function() {
    function AcceptFileExtension2(value0) {
      this.value0 = value0;
    }
    ;
    AcceptFileExtension2.create = function(value0) {
      return new AcceptFileExtension2(value0);
    };
    return AcceptFileExtension2;
  }();
  var semigroupInputAcceptType = {
    append: function(v) {
      return function(v1) {
        return append2(v)(v1);
      };
    }
  };
  var renderInputAcceptTypeAtom = function(v) {
    if (v instanceof AcceptMediaType) {
      return v.value0;
    }
    ;
    if (v instanceof AcceptFileExtension) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputAcceptType (line 34, column 29 - line 36, column 33): " + [v.constructor.name]);
  };
  var renderInputAcceptType = function(v) {
    return joinWith(",")(map12(renderInputAcceptTypeAtom)(v));
  };
  var mediaType = function(mt) {
    return [new AcceptMediaType(mt)];
  };

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v) {
    if (v instanceof InputButton) {
      return "button";
    }
    ;
    if (v instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v instanceof InputColor) {
      return "color";
    }
    ;
    if (v instanceof InputDate) {
      return "date";
    }
    ;
    if (v instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v instanceof InputEmail) {
      return "email";
    }
    ;
    if (v instanceof InputFile) {
      return "file";
    }
    ;
    if (v instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v instanceof InputImage) {
      return "image";
    }
    ;
    if (v instanceof InputMonth) {
      return "month";
    }
    ;
    if (v instanceof InputNumber) {
      return "number";
    }
    ;
    if (v instanceof InputPassword) {
      return "password";
    }
    ;
    if (v instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v instanceof InputRange) {
      return "range";
    }
    ;
    if (v instanceof InputReset) {
      return "reset";
    }
    ;
    if (v instanceof InputSearch) {
      return "search";
    }
    ;
    if (v instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v instanceof InputTel) {
      return "tel";
    }
    ;
    if (v instanceof InputText) {
      return "text";
    }
    ;
    if (v instanceof InputTime) {
      return "time";
    }
    ;
    if (v instanceof InputUrl) {
      return "url";
    }
    ;
    if (v instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();

  // output/Data.Array/foreign.js
  var replicateFill = function(count, value19) {
    if (count < 1) {
      return [];
    }
    var result2 = new Array(count);
    return result2.fill(value19);
  };
  var replicatePolyfill = function(count, value19) {
    var result2 = [];
    var n = 0;
    for (var i2 = 0; i2 < count; i2++) {
      result2[n++] = value19;
    }
    return result2;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head5) {
      return function(tail2) {
        return new Cons3(head5, tail2);
      };
    }
    function listToArray(list) {
      var result2 = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result2[count++] = xs.head;
        xs = xs.tail;
      }
      return result2;
    }
    return function(foldr5, xs) {
      return listToArray(foldr5(curryCons)(emptyList)(xs));
    };
  }();
  var length3 = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just, nothing, xs, i2) {
    return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (f(xs[i2]))
        return just(i2);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i2, l) {
    if (i2 < 0 || i2 >= l.length)
      return nothing;
    var l1 = l.slice();
    l1.splice(i2, 1);
    return just(l1);
  };
  var sortByImpl = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3, fromOrdering, xs) {
      var out;
      if (xs.length < 2)
        return xs;
      out = xs.slice(0);
      mergeFromTo(compare3, fromOrdering, out, xs.slice(0), 0, xs.length);
      return out;
    };
  }();
  var unsafeIndexImpl = function(xs, n) {
    return xs[n];
  };

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare3, fromOrdering, xs1, xs2, from3, to) {
      var mid;
      var i2;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from3 + (to - from3 >> 1);
      if (mid - from3 > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, from3, mid);
      if (to - mid > 1)
        mergeFromTo(compare3, fromOrdering, xs2, xs1, mid, to);
      i2 = from3;
      j = mid;
      k = from3;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare3(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare3, fromOrdering, xs) {
      if (xs.length < 2)
        return xs;
      mergeFromTo(compare3, fromOrdering, xs, xs.slice(0), 0, xs.length);
      return xs;
    };
  }();

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a2, b2, c, d, e) {
      return fn(a2)(b2)(c)(d)(e);
    };
  };
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b2) {
        return fn(a2, b2);
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Data.Array/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var unsafeIndex = function() {
    return runFn2(unsafeIndexImpl);
  };
  var index2 = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var head = function(xs) {
    return index2(xs)(0);
  };
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var elemIndex = function(dictEq) {
    var eq22 = eq(dictEq);
    return function(x) {
      return findIndex(function(v) {
        return eq22(v)(x);
      });
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return runFn4(_deleteAt)(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step2 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map13 = /* @__PURE__ */ map(functorArray);
  var map14 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap3 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map13(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map13(map14(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap3(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name17, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name17);
    } else {
      return doc.createElement(name17);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener2(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener2(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name17) {
    return function(doctype) {
      return doctype[name17];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.Element/index.js
  var toNode2 = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy4 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy4("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy4("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy4("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        var v1 = length3(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step2(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy4("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length3(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step2(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length3(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode2(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy4("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value19) {
    return typeof value19;
  }
  function tagOf(value19) {
    return Object.prototype.toString.call(value19).slice(8, -1);
  }
  var isArray = Array.isArray || function(value19) {
    return Object.prototype.toString.call(value19) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor = Math.floor;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.List.NonEmpty/index.js
  var singleton5 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var cons$prime = function(x) {
    return function(xs) {
      return new NonEmpty(x, xs);
    };
  };
  var cons = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton6 = function(c) {
    return c;
  };
  var length5 = function(s) {
    return s.length;
  };
  var drop2 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i2) {
    return function(s) {
      if (i2 >= 0 && i2 < s.length)
        return s.charAt(i2);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Foreign/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var ErrorAtIndex = /* @__PURE__ */ function() {
    function ErrorAtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtIndex2.create = function(value0) {
      return function(value1) {
        return new ErrorAtIndex2(value0, value1);
      };
    };
    return ErrorAtIndex2;
  }();
  var ErrorAtProperty = /* @__PURE__ */ function() {
    function ErrorAtProperty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ErrorAtProperty2.create = function(value0) {
      return function(value1) {
        return new ErrorAtProperty2(value0, value1);
      };
    };
    return ErrorAtProperty2;
  }();
  var unsafeFromForeign = unsafeCoerce2;
  var showForeignError = {
    show: function(v) {
      if (v instanceof ForeignError) {
        return "(ForeignError " + (show2(v.value0) + ")");
      }
      ;
      if (v instanceof ErrorAtIndex) {
        return "(ErrorAtIndex " + (show1(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
      }
      ;
      if (v instanceof ErrorAtProperty) {
        return "(ErrorAtProperty " + (show2(v.value0) + (" " + (show(showForeignError)(v.value1) + ")")));
      }
      ;
      if (v instanceof TypeMismatch) {
        return "(TypeMismatch " + (show2(v.value0) + (" " + (show2(v.value1) + ")")));
      }
      ;
      throw new Error("Failed pattern match at Foreign (line 69, column 1 - line 73, column 89): " + [v.constructor.name]);
    }
  };
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton5($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure110 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value19) {
        if (tagOf(value19) === tag) {
          return pure110(unsafeFromForeign(value19));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value19)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value19.constructor.name]);
      };
    };
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Foreign.Object/foreign.js
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Foreign.Object/index.js
  var lookup3 = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy5 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el) {
    var v = hasAttribute(nullImpl, key, el);
    if (v) {
      return removeAttribute(nullImpl, key, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromInt = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener2(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup3("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do2() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener2(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy5("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x) {
    return x;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text5 = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropMediaType = {
    toPropValue: /* @__PURE__ */ function() {
      var $42 = unwrap();
      return function($43) {
        return propFromString($42($43));
      };
    }()
  };
  var isPropInt = {
    toPropValue: propFromInt
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropInputAcceptType = {
    toPropValue: function($46) {
      return propFromString(renderInputAcceptType($46));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name17) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name17, props, children2);
        };
      };
    };
  };
  var attr = function(ns) {
    return function(v) {
      return Attribute.create(ns)(v);
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure29 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure29(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply3(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure29 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure29(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton5(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity6);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc2 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null3 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc2(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl2 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl2(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null3(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append3 = link;
  var semigroupCatList = {
    append: append3
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append3(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy6 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var append4 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append4(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc3(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy6("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure4 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure4($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map115 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map115(Done.create)(pure110(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map115(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var ChildQuery = /* @__PURE__ */ function() {
    function ChildQuery3(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ChildQuery3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ChildQuery3(value0, value1, value22);
        };
      };
    };
    return ChildQuery3;
  }();
  var unChildQueryBox = unsafeCoerce2;
  var mkChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind4 = /* @__PURE__ */ bind(bindEffect);
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create3 = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do2() {
          modify_(function(v) {
            return append5(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind4(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var lookup4 = /* @__PURE__ */ lookup2();
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenM = function(x) {
    return x;
  };
  var raise = function(o) {
    return liftF(new Raise(o, unit));
  };
  var query = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(q2) {
              return liftF(new ChildQuery2(mkChildQueryBox(new ChildQuery(function(dictApplicative) {
                var pure110 = pure(dictApplicative);
                return function(k) {
                  var $177 = maybe(pure110(Nothing.value))(k);
                  var $178 = lookup23(label5)(p2);
                  return function($179) {
                    return $177($178($179));
                  };
                };
              }, q2, identity7))));
            };
          };
        };
      };
    };
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize2(value0) {
      this.value0 = value0;
    }
    ;
    Initialize2.create = function(value0) {
      return new Initialize2(value0);
    };
    return Initialize2;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy7 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy7("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map15 = /* @__PURE__ */ map(functorHalogenM);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup5 = /* @__PURE__ */ lookup2();
  var pop3 = /* @__PURE__ */ pop2();
  var insert3 = /* @__PURE__ */ insert2();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map15(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure5(unit)),
      handleQuery: $$const(pure5(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup5(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert3(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var h1 = /* @__PURE__ */ element2("h1");
  var h1_ = /* @__PURE__ */ h1([]);
  var input = function(props) {
    return element2("input")(props)([]);
  };
  var label4 = /* @__PURE__ */ element2("label");
  var p = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p([]);
  var span3 = /* @__PURE__ */ element2("span");
  var textarea = function(es) {
    return element2("textarea")(es)([]);
  };
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");
  var a = /* @__PURE__ */ element2("a");

  // output/Halogen.HTML.Properties/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var prop3 = /* @__PURE__ */ prop2(isPropInt);
  var readOnly3 = /* @__PURE__ */ prop1("readOnly");
  var rows4 = /* @__PURE__ */ prop3("rows");
  var target5 = /* @__PURE__ */ prop22("target");
  var type_17 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value12 = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var name15 = /* @__PURE__ */ prop22("name");
  var multiple3 = /* @__PURE__ */ prop1("multiple");
  var id2 = /* @__PURE__ */ prop22("id");
  var href4 = /* @__PURE__ */ prop22("href");
  var $$for = /* @__PURE__ */ prop22("htmlFor");
  var download3 = /* @__PURE__ */ prop22("download");
  var disabled10 = /* @__PURE__ */ prop1("disabled");
  var cols2 = /* @__PURE__ */ prop3("cols");
  var class_ = /* @__PURE__ */ function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap2($37));
    };
  }();
  var checked2 = /* @__PURE__ */ prop1("checked");
  var attr2 = /* @__PURE__ */ function() {
    return attr(Nothing.value);
  }();
  var style = /* @__PURE__ */ attr2("style");
  var accept2 = /* @__PURE__ */ prop2(isPropInputAcceptType)("accept");

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot_ = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component) {
              return function(input3) {
                return widget(new ComponentSlot(componentSlot22(label5)(p2)(component)(input3)($$const(Nothing.value))));
              };
            };
          };
        };
      };
    };
  };
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p2)(component)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do2() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty3)();
            var childrenOut = $$new(empty3)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty2))();
            var forks = $$new(empty2)();
            var ds = {
              component,
              state: component.initialState(input3),
              refs: empty2,
              children: empty3,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup6 = /* @__PURE__ */ lookup(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard3(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork(monadForkAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var pure6 = /* @__PURE__ */ pure(applicativeAff);
  var map17 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel3 = /* @__PURE__ */ parallel(parallelAff);
  var map18 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map22 = /* @__PURE__ */ map(functorMaybe);
  var insert4 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete2 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do2() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped5(lookup6(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect4(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect4(f))(function(result2) {
          return bind12(liftEffect4(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_3(v.initializers))(function() {
                return pure6(result2);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect4(read(ref2)))(function(v) {
        return liftEffect4(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render) {
    return function(ref2) {
      return function(q2) {
        return bind12(liftEffect4(read(ref2)))(function(v) {
          return evalM(render)(ref2)(v["component"]["eval"](new Query(map17(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect4(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel3(bind12(liftEffect4(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map18(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure6(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect4(write({
                    component: v2.component,
                    state: v3.value1,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure6(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect4(read(ref2)))(function(v2) {
                    return discard1(liftEffect4(modify_(map22(insert4(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure6(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure6(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $119 = evalM(render)(ref2);
                return function($120) {
                  return parallel3($119($120));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect4(read(ref2)))(function(v2) {
                  return bind12(liftEffect4($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect4(function __do2() {
                      modify_($$delete2(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect4(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v2.forks))))(function() {
                        return pure6(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return bind12(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure6(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect4(read(ref2)))(function(v2) {
                return pure6(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect4(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v.value1))(v.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind12(liftEffect4(read(ref2)))(function(v1) {
            return evalM(render)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork(monadForkAff);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard4(bindAff);
  var parSequence_4 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure7 = /* @__PURE__ */ pure(applicativeEffect);
  var map19 = /* @__PURE__ */ map(functorEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do2() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $59 = traverse_5(fork4);
        return function($60) {
          return handleAff($59(reverse($60)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do2() {
      bindFlipped6(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped6(traverse_33(function() {
        var $61 = killFiber(error("finalized"));
        return function($62) {
          return handleAff($61($62));
        };
      }()))(read(v.forks))();
      return write(empty2)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_4(reverse(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect5(function __do2() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do2() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped6(unDriverStateX(function() {
                    var $63 = render(lchs);
                    return function($64) {
                      return $63(function(v) {
                        return v.selfRef;
                      }($64));
                    };
                  }()))(read($$var2))();
                  bindFlipped6(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot5) {
                  return function __do2() {
                    var childrenIn = map19(slot5.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do3() {
                            flip(write)(st.handlerRef)(function() {
                              var $65 = maybe(pure12(unit))(handler3);
                              return function($66) {
                                return $65(slot5.output($66));
                              };
                            }())();
                            return handleAff(evalM(render)(st.selfRef)(st["component"]["eval"](new Receive(slot5.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $67 = maybe(pure12(unit))(handler3);
                          return function($68) {
                            return $67(slot5.output($68));
                          };
                        }())(slot5.input)(slot5.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map19(function($69) {
                      return isJust(slot5.get($69));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot5.set($$var2))(childrenOutRef)();
                    return bind5(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure7(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render = function(lchs) {
          return function($$var2) {
            return function __do2() {
              var v = read($$var2)();
              var shouldProcessHandlers = map19(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty3)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $70 = queueOrRun(v.pendingHandlers);
                var $71 = evalF(render)(v.selfRef);
                return function($72) {
                  return $70($$void5($71($72)));
                };
              }();
              var childHandler = function() {
                var $73 = queueOrRun(v.pendingQueries);
                return function($74) {
                  return $73(handler3(Action.create($74)));
                };
              }();
              var rendering = renderSpec2.render(function($75) {
                return handleAff(handler3($75));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do3() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do3() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $76 = traverse_5(fork4);
                    return function($77) {
                      return handleAff($76(reverse($77)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $52 = maybe(false)($$null)(mmore);
                  if ($52) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do2() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do3() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind13(liftEffect5(read(disposed)))(function(v) {
                if (v) {
                  return pure12(Nothing.value);
                }
                ;
                return evalQ(render)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do2() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do3() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect5(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect5($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do2() {
              var sio = create3();
              var dsx = bindFlipped6(read)(runComponent(lchs)(function() {
                var $78 = notify(sio.listener);
                return function($79) {
                  return liftEffect5($78($79));
                };
              }())(i2)(component))();
              return unDriverStateX(function(st) {
                return pure7({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map20 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map20(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map20(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy8 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap3 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map21 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void6(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void6(appendChild(v)(v2.value0));
        }
        ;
        return pure8(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do2() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap3)(spec);
          var $lazy_patch = $runtime_lazy8("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot5) {
              if (st instanceof Just) {
                if (slot5 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot5.value0);
                }
                ;
                if (slot5 instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot5.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot5.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot5);
            };
          });
          var $lazy_render = $runtime_lazy8("render", "Halogen.VDom.Driver", function() {
            return function(slot5) {
              if (slot5 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot5.value0);
              }
              ;
              if (slot5 instanceof ThunkSlot) {
                var step4 = buildThunk2(slot5.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot5.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy8("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch = $lazy_patch(91);
          var render = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do2() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void6(appendChild(node)(toNode(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do2() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render,
        renderChild: identity8,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component) {
    return function(i2) {
      return function(element3) {
        return bind14(liftEffect6(map21(toDocument)(bindFlipped7(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element3))(component)(i2);
        });
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap4(runExceptT($3));
  };

  // output/Web.Event.Event/foreign.js
  function _target(e) {
    return e.target;
  }

  // output/Web.Event.Event/index.js
  var target6 = function($3) {
    return toMaybe(_target($3));
  };

  // output/Web.File.FileList/foreign.js
  function _item(index4) {
    return function(fileList) {
      return fileList.item(index4);
    };
  }

  // output/Web.File.FileList/index.js
  var map23 = /* @__PURE__ */ map(functorMaybe);
  var item = function(i2) {
    var $5 = _item(i2);
    return function($6) {
      return toMaybe($5($6));
    };
  };
  var items = function(dictUnfoldable) {
    var unfoldr2 = unfoldr(dictUnfoldable);
    return function(fl) {
      return unfoldr2(function(i2) {
        return map23(flip(Tuple.create)(i2 + 1 | 0))(item(i2)(fl));
      })(0);
    };
  };

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click2 = "click";

  // output/Halogen.HTML.Events/index.js
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var mouseHandler = unsafeCoerce2;
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click2);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var onFileUpload = function(dictUnfoldable) {
    var none2 = none(dictUnfoldable);
    var items2 = items(dictUnfoldable);
    return function(f) {
      return handler2(change)(function() {
        var $19 = maybe(none2)(items2);
        var $20 = composeKleisli2(target6)(composeKleisli2(fromEventTarget)(function($22) {
          return unsafePerformEffect(files($22));
        }));
        return function($21) {
          return f($19($20($21)));
        };
      }());
    };
  };

  // output/Kwakwala.Types/index.js
  var Av = /* @__PURE__ */ function() {
    function Av2() {
    }
    ;
    Av2.value = new Av2();
    return Av2;
  }();
  var Ev = /* @__PURE__ */ function() {
    function Ev2() {
    }
    ;
    Ev2.value = new Ev2();
    return Ev2;
  }();
  var Iv = /* @__PURE__ */ function() {
    function Iv2() {
    }
    ;
    Iv2.value = new Iv2();
    return Iv2;
  }();
  var Ov = /* @__PURE__ */ function() {
    function Ov2() {
    }
    ;
    Ov2.value = new Ov2();
    return Ov2;
  }();
  var Uv = /* @__PURE__ */ function() {
    function Uv2() {
    }
    ;
    Uv2.value = new Uv2();
    return Uv2;
  }();
  var AUv = /* @__PURE__ */ function() {
    function AUv2() {
    }
    ;
    AUv2.value = new AUv2();
    return AUv2;
  }();
  var M = /* @__PURE__ */ function() {
    function M2() {
    }
    ;
    M2.value = new M2();
    return M2;
  }();
  var MY = /* @__PURE__ */ function() {
    function MY2() {
    }
    ;
    MY2.value = new MY2();
    return MY2;
  }();
  var N = /* @__PURE__ */ function() {
    function N2() {
    }
    ;
    N2.value = new N2();
    return N2;
  }();
  var NY = /* @__PURE__ */ function() {
    function NY2() {
    }
    ;
    NY2.value = new NY2();
    return NY2;
  }();
  var P = /* @__PURE__ */ function() {
    function P2() {
    }
    ;
    P2.value = new P2();
    return P2;
  }();
  var T = /* @__PURE__ */ function() {
    function T2() {
    }
    ;
    T2.value = new T2();
    return T2;
  }();
  var B = /* @__PURE__ */ function() {
    function B2() {
    }
    ;
    B2.value = new B2();
    return B2;
  }();
  var D = /* @__PURE__ */ function() {
    function D2() {
    }
    ;
    D2.value = new D2();
    return D2;
  }();
  var PY = /* @__PURE__ */ function() {
    function PY2() {
    }
    ;
    PY2.value = new PY2();
    return PY2;
  }();
  var TY = /* @__PURE__ */ function() {
    function TY2() {
    }
    ;
    TY2.value = new TY2();
    return TY2;
  }();
  var TS = /* @__PURE__ */ function() {
    function TS2() {
    }
    ;
    TS2.value = new TS2();
    return TS2;
  }();
  var TL = /* @__PURE__ */ function() {
    function TL2() {
    }
    ;
    TL2.value = new TL2();
    return TL2;
  }();
  var DZ = /* @__PURE__ */ function() {
    function DZ2() {
    }
    ;
    DZ2.value = new DZ2();
    return DZ2;
  }();
  var DL = /* @__PURE__ */ function() {
    function DL2() {
    }
    ;
    DL2.value = new DL2();
    return DL2;
  }();
  var TSY = /* @__PURE__ */ function() {
    function TSY2() {
    }
    ;
    TSY2.value = new TSY2();
    return TSY2;
  }();
  var TLY = /* @__PURE__ */ function() {
    function TLY2() {
    }
    ;
    TLY2.value = new TLY2();
    return TLY2;
  }();
  var S = /* @__PURE__ */ function() {
    function S2() {
    }
    ;
    S2.value = new S2();
    return S2;
  }();
  var LH = /* @__PURE__ */ function() {
    function LH2() {
    }
    ;
    LH2.value = new LH2();
    return LH2;
  }();
  var L = /* @__PURE__ */ function() {
    function L2() {
    }
    ;
    L2.value = new L2();
    return L2;
  }();
  var LY = /* @__PURE__ */ function() {
    function LY2() {
    }
    ;
    LY2.value = new LY2();
    return LY2;
  }();
  var J = /* @__PURE__ */ function() {
    function J2() {
    }
    ;
    J2.value = new J2();
    return J2;
  }();
  var JY = /* @__PURE__ */ function() {
    function JY2() {
    }
    ;
    JY2.value = new JY2();
    return JY2;
  }();
  var K = /* @__PURE__ */ function() {
    function K2() {
    }
    ;
    K2.value = new K2();
    return K2;
  }();
  var KW = /* @__PURE__ */ function() {
    function KW2() {
    }
    ;
    KW2.value = new KW2();
    return KW2;
  }();
  var G = /* @__PURE__ */ function() {
    function G2() {
    }
    ;
    G2.value = new G2();
    return G2;
  }();
  var GW = /* @__PURE__ */ function() {
    function GW2() {
    }
    ;
    GW2.value = new GW2();
    return GW2;
  }();
  var KY = /* @__PURE__ */ function() {
    function KY2() {
    }
    ;
    KY2.value = new KY2();
    return KY2;
  }();
  var KWY = /* @__PURE__ */ function() {
    function KWY2() {
    }
    ;
    KWY2.value = new KWY2();
    return KWY2;
  }();
  var Q = /* @__PURE__ */ function() {
    function Q2() {
    }
    ;
    Q2.value = new Q2();
    return Q2;
  }();
  var QW = /* @__PURE__ */ function() {
    function QW2() {
    }
    ;
    QW2.value = new QW2();
    return QW2;
  }();
  var GU = /* @__PURE__ */ function() {
    function GU2() {
    }
    ;
    GU2.value = new GU2();
    return GU2;
  }();
  var GUW = /* @__PURE__ */ function() {
    function GUW2() {
    }
    ;
    GUW2.value = new GUW2();
    return GUW2;
  }();
  var QY = /* @__PURE__ */ function() {
    function QY2() {
    }
    ;
    QY2.value = new QY2();
    return QY2;
  }();
  var QWY = /* @__PURE__ */ function() {
    function QWY2() {
    }
    ;
    QWY2.value = new QWY2();
    return QWY2;
  }();
  var X = /* @__PURE__ */ function() {
    function X2() {
    }
    ;
    X2.value = new X2();
    return X2;
  }();
  var XW = /* @__PURE__ */ function() {
    function XW2() {
    }
    ;
    XW2.value = new XW2();
    return XW2;
  }();
  var XU = /* @__PURE__ */ function() {
    function XU2() {
    }
    ;
    XU2.value = new XU2();
    return XU2;
  }();
  var XUW = /* @__PURE__ */ function() {
    function XUW2() {
    }
    ;
    XUW2.value = new XUW2();
    return XUW2;
  }();
  var W = /* @__PURE__ */ function() {
    function W2() {
    }
    ;
    W2.value = new W2();
    return W2;
  }();
  var WY = /* @__PURE__ */ function() {
    function WY2() {
    }
    ;
    WY2.value = new WY2();
    return WY2;
  }();
  var Y = /* @__PURE__ */ function() {
    function Y2() {
    }
    ;
    Y2.value = new Y2();
    return Y2;
  }();
  var H = /* @__PURE__ */ function() {
    function H2() {
    }
    ;
    H2.value = new H2();
    return H2;
  }();
  var A = /* @__PURE__ */ function() {
    function A2() {
    }
    ;
    A2.value = new A2();
    return A2;
  }();
  var E = /* @__PURE__ */ function() {
    function E2() {
    }
    ;
    E2.value = new E2();
    return E2;
  }();
  var I = /* @__PURE__ */ function() {
    function I2() {
    }
    ;
    I2.value = new I2();
    return I2;
  }();
  var O = /* @__PURE__ */ function() {
    function O2() {
    }
    ;
    O2.value = new O2();
    return O2;
  }();
  var U = /* @__PURE__ */ function() {
    function U2() {
    }
    ;
    U2.value = new U2();
    return U2;
  }();
  var AU = /* @__PURE__ */ function() {
    function AU2() {
    }
    ;
    AU2.value = new AU2();
    return AU2;
  }();
  var Mc = /* @__PURE__ */ function() {
    function Mc2() {
    }
    ;
    Mc2.value = new Mc2();
    return Mc2;
  }();
  var MYc = /* @__PURE__ */ function() {
    function MYc2() {
    }
    ;
    MYc2.value = new MYc2();
    return MYc2;
  }();
  var Nc = /* @__PURE__ */ function() {
    function Nc2() {
    }
    ;
    Nc2.value = new Nc2();
    return Nc2;
  }();
  var NYc = /* @__PURE__ */ function() {
    function NYc2() {
    }
    ;
    NYc2.value = new NYc2();
    return NYc2;
  }();
  var Pc = /* @__PURE__ */ function() {
    function Pc2() {
    }
    ;
    Pc2.value = new Pc2();
    return Pc2;
  }();
  var Tc = /* @__PURE__ */ function() {
    function Tc2() {
    }
    ;
    Tc2.value = new Tc2();
    return Tc2;
  }();
  var Bc = /* @__PURE__ */ function() {
    function Bc2() {
    }
    ;
    Bc2.value = new Bc2();
    return Bc2;
  }();
  var Dc = /* @__PURE__ */ function() {
    function Dc2() {
    }
    ;
    Dc2.value = new Dc2();
    return Dc2;
  }();
  var PYc = /* @__PURE__ */ function() {
    function PYc2() {
    }
    ;
    PYc2.value = new PYc2();
    return PYc2;
  }();
  var TYc = /* @__PURE__ */ function() {
    function TYc2() {
    }
    ;
    TYc2.value = new TYc2();
    return TYc2;
  }();
  var TSc = /* @__PURE__ */ function() {
    function TSc2() {
    }
    ;
    TSc2.value = new TSc2();
    return TSc2;
  }();
  var TLc = /* @__PURE__ */ function() {
    function TLc2() {
    }
    ;
    TLc2.value = new TLc2();
    return TLc2;
  }();
  var DZc = /* @__PURE__ */ function() {
    function DZc2() {
    }
    ;
    DZc2.value = new DZc2();
    return DZc2;
  }();
  var DLc = /* @__PURE__ */ function() {
    function DLc2() {
    }
    ;
    DLc2.value = new DLc2();
    return DLc2;
  }();
  var TSYc = /* @__PURE__ */ function() {
    function TSYc2() {
    }
    ;
    TSYc2.value = new TSYc2();
    return TSYc2;
  }();
  var TLYc = /* @__PURE__ */ function() {
    function TLYc2() {
    }
    ;
    TLYc2.value = new TLYc2();
    return TLYc2;
  }();
  var Sc = /* @__PURE__ */ function() {
    function Sc2() {
    }
    ;
    Sc2.value = new Sc2();
    return Sc2;
  }();
  var LHc = /* @__PURE__ */ function() {
    function LHc2() {
    }
    ;
    LHc2.value = new LHc2();
    return LHc2;
  }();
  var Lc = /* @__PURE__ */ function() {
    function Lc2() {
    }
    ;
    Lc2.value = new Lc2();
    return Lc2;
  }();
  var LYc = /* @__PURE__ */ function() {
    function LYc2() {
    }
    ;
    LYc2.value = new LYc2();
    return LYc2;
  }();
  var Jc = /* @__PURE__ */ function() {
    function Jc2() {
    }
    ;
    Jc2.value = new Jc2();
    return Jc2;
  }();
  var JYc = /* @__PURE__ */ function() {
    function JYc2() {
    }
    ;
    JYc2.value = new JYc2();
    return JYc2;
  }();
  var Kc = /* @__PURE__ */ function() {
    function Kc2() {
    }
    ;
    Kc2.value = new Kc2();
    return Kc2;
  }();
  var KWc = /* @__PURE__ */ function() {
    function KWc2() {
    }
    ;
    KWc2.value = new KWc2();
    return KWc2;
  }();
  var Gc = /* @__PURE__ */ function() {
    function Gc2() {
    }
    ;
    Gc2.value = new Gc2();
    return Gc2;
  }();
  var GWc = /* @__PURE__ */ function() {
    function GWc2() {
    }
    ;
    GWc2.value = new GWc2();
    return GWc2;
  }();
  var KYc = /* @__PURE__ */ function() {
    function KYc2() {
    }
    ;
    KYc2.value = new KYc2();
    return KYc2;
  }();
  var KWYc = /* @__PURE__ */ function() {
    function KWYc2() {
    }
    ;
    KWYc2.value = new KWYc2();
    return KWYc2;
  }();
  var Qc = /* @__PURE__ */ function() {
    function Qc2() {
    }
    ;
    Qc2.value = new Qc2();
    return Qc2;
  }();
  var QWc = /* @__PURE__ */ function() {
    function QWc2() {
    }
    ;
    QWc2.value = new QWc2();
    return QWc2;
  }();
  var GUc = /* @__PURE__ */ function() {
    function GUc2() {
    }
    ;
    GUc2.value = new GUc2();
    return GUc2;
  }();
  var GUWc = /* @__PURE__ */ function() {
    function GUWc2() {
    }
    ;
    GUWc2.value = new GUWc2();
    return GUWc2;
  }();
  var QYc = /* @__PURE__ */ function() {
    function QYc2() {
    }
    ;
    QYc2.value = new QYc2();
    return QYc2;
  }();
  var QWYc = /* @__PURE__ */ function() {
    function QWYc2() {
    }
    ;
    QWYc2.value = new QWYc2();
    return QWYc2;
  }();
  var Xc = /* @__PURE__ */ function() {
    function Xc2() {
    }
    ;
    Xc2.value = new Xc2();
    return Xc2;
  }();
  var XWc = /* @__PURE__ */ function() {
    function XWc2() {
    }
    ;
    XWc2.value = new XWc2();
    return XWc2;
  }();
  var XUc = /* @__PURE__ */ function() {
    function XUc2() {
    }
    ;
    XUc2.value = new XUc2();
    return XUc2;
  }();
  var XUWc = /* @__PURE__ */ function() {
    function XUWc2() {
    }
    ;
    XUWc2.value = new XUWc2();
    return XUWc2;
  }();
  var Wc = /* @__PURE__ */ function() {
    function Wc2() {
    }
    ;
    Wc2.value = new Wc2();
    return Wc2;
  }();
  var WYc = /* @__PURE__ */ function() {
    function WYc2() {
    }
    ;
    WYc2.value = new WYc2();
    return WYc2;
  }();
  var Yc = /* @__PURE__ */ function() {
    function Yc2() {
    }
    ;
    Yc2.value = new Yc2();
    return Yc2;
  }();
  var Hc = /* @__PURE__ */ function() {
    function Hc2() {
    }
    ;
    Hc2.value = new Hc2();
    return Hc2;
  }();
  var Maj = /* @__PURE__ */ function() {
    function Maj2(value0) {
      this.value0 = value0;
    }
    ;
    Maj2.create = function(value0) {
      return new Maj2(value0);
    };
    return Maj2;
  }();
  var Min2 = /* @__PURE__ */ function() {
    function Min3(value0) {
      this.value0 = value0;
    }
    ;
    Min3.create = function(value0) {
      return new Min3(value0);
    };
    return Min3;
  }();
  var Kwak = /* @__PURE__ */ function() {
    function Kwak2(value0) {
      this.value0 = value0;
    }
    ;
    Kwak2.create = function(value0) {
      return new Kwak2(value0);
    };
    return Kwak2;
  }();
  var Punct = /* @__PURE__ */ function() {
    function Punct2(value0) {
      this.value0 = value0;
    }
    ;
    Punct2.create = function(value0) {
      return new Punct2(value0);
    };
    return Punct2;
  }();
  var makeCase = function(v) {
    return function(v1) {
      if (v) {
        return new Maj(v1);
      }
      ;
      if (!v) {
        return new Min2(v1);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Types (line 258, column 1 - line 258, column 49): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var isKwkVow = function(v) {
    if (v instanceof A) {
      return true;
    }
    ;
    if (v instanceof E) {
      return true;
    }
    ;
    if (v instanceof I) {
      return true;
    }
    ;
    if (v instanceof O) {
      return true;
    }
    ;
    if (v instanceof U) {
      return true;
    }
    ;
    if (v instanceof AU) {
      return true;
    }
    ;
    return false;
  };
  var isKwkVow$prime = function(v) {
    if (v instanceof Maj) {
      return isKwkVow(v.value0);
    }
    ;
    if (v instanceof Min2) {
      return isKwkVow(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Types (line 295, column 1 - line 295, column 36): " + [v.constructor.name]);
  };
  var isKwkVow$prime$prime = function(v) {
    if (v instanceof Kwak) {
      return isKwkVow$prime(v.value0);
    }
    ;
    return false;
  };
  var eqKwakLetter = {
    eq: function(x) {
      return function(y) {
        if (x instanceof M && y instanceof M) {
          return true;
        }
        ;
        if (x instanceof MY && y instanceof MY) {
          return true;
        }
        ;
        if (x instanceof N && y instanceof N) {
          return true;
        }
        ;
        if (x instanceof NY && y instanceof NY) {
          return true;
        }
        ;
        if (x instanceof P && y instanceof P) {
          return true;
        }
        ;
        if (x instanceof T && y instanceof T) {
          return true;
        }
        ;
        if (x instanceof B && y instanceof B) {
          return true;
        }
        ;
        if (x instanceof D && y instanceof D) {
          return true;
        }
        ;
        if (x instanceof PY && y instanceof PY) {
          return true;
        }
        ;
        if (x instanceof TY && y instanceof TY) {
          return true;
        }
        ;
        if (x instanceof TS && y instanceof TS) {
          return true;
        }
        ;
        if (x instanceof TL && y instanceof TL) {
          return true;
        }
        ;
        if (x instanceof DZ && y instanceof DZ) {
          return true;
        }
        ;
        if (x instanceof DL && y instanceof DL) {
          return true;
        }
        ;
        if (x instanceof TSY && y instanceof TSY) {
          return true;
        }
        ;
        if (x instanceof TLY && y instanceof TLY) {
          return true;
        }
        ;
        if (x instanceof S && y instanceof S) {
          return true;
        }
        ;
        if (x instanceof LH && y instanceof LH) {
          return true;
        }
        ;
        if (x instanceof L && y instanceof L) {
          return true;
        }
        ;
        if (x instanceof LY && y instanceof LY) {
          return true;
        }
        ;
        if (x instanceof J && y instanceof J) {
          return true;
        }
        ;
        if (x instanceof JY && y instanceof JY) {
          return true;
        }
        ;
        if (x instanceof K && y instanceof K) {
          return true;
        }
        ;
        if (x instanceof KW && y instanceof KW) {
          return true;
        }
        ;
        if (x instanceof G && y instanceof G) {
          return true;
        }
        ;
        if (x instanceof GW && y instanceof GW) {
          return true;
        }
        ;
        if (x instanceof KY && y instanceof KY) {
          return true;
        }
        ;
        if (x instanceof KWY && y instanceof KWY) {
          return true;
        }
        ;
        if (x instanceof Q && y instanceof Q) {
          return true;
        }
        ;
        if (x instanceof QW && y instanceof QW) {
          return true;
        }
        ;
        if (x instanceof GU && y instanceof GU) {
          return true;
        }
        ;
        if (x instanceof GUW && y instanceof GUW) {
          return true;
        }
        ;
        if (x instanceof QY && y instanceof QY) {
          return true;
        }
        ;
        if (x instanceof QWY && y instanceof QWY) {
          return true;
        }
        ;
        if (x instanceof X && y instanceof X) {
          return true;
        }
        ;
        if (x instanceof XW && y instanceof XW) {
          return true;
        }
        ;
        if (x instanceof XU && y instanceof XU) {
          return true;
        }
        ;
        if (x instanceof XUW && y instanceof XUW) {
          return true;
        }
        ;
        if (x instanceof W && y instanceof W) {
          return true;
        }
        ;
        if (x instanceof WY && y instanceof WY) {
          return true;
        }
        ;
        if (x instanceof Y && y instanceof Y) {
          return true;
        }
        ;
        if (x instanceof H && y instanceof H) {
          return true;
        }
        ;
        if (x instanceof A && y instanceof A) {
          return true;
        }
        ;
        if (x instanceof E && y instanceof E) {
          return true;
        }
        ;
        if (x instanceof I && y instanceof I) {
          return true;
        }
        ;
        if (x instanceof O && y instanceof O) {
          return true;
        }
        ;
        if (x instanceof U && y instanceof U) {
          return true;
        }
        ;
        if (x instanceof AU && y instanceof AU) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq12 = /* @__PURE__ */ eq(eqKwakLetter);
  var isCharLetter = function(v) {
    return function(v1) {
      if (v1 instanceof Kwak && v1.value0 instanceof Min2) {
        return eq12(v)(v1.value0.value0);
      }
      ;
      if (v1 instanceof Kwak && v1.value0 instanceof Maj) {
        return eq12(v)(v1.value0.value0);
      }
      ;
      return false;
    };
  };

  // output/Kwakwala.Output.Grubb/index.js
  var outputGrubbAsciiY = function(v) {
    return function(v1) {
      if (v1 instanceof M) {
        return "M";
      }
      ;
      if (v1 instanceof MY) {
        if (v.grbUse7) {
          return "7M";
        }
        ;
        if (otherwise) {
          return "'M";
        }
        ;
      }
      ;
      if (v1 instanceof N) {
        return "N";
      }
      ;
      if (v1 instanceof NY) {
        if (v.grbUse7) {
          return "7N";
        }
        ;
        if (otherwise) {
          return "'N";
        }
        ;
      }
      ;
      if (v1 instanceof P) {
        return "P";
      }
      ;
      if (v1 instanceof T) {
        return "T";
      }
      ;
      if (v1 instanceof B) {
        return "B";
      }
      ;
      if (v1 instanceof D) {
        return "D";
      }
      ;
      if (v1 instanceof PY) {
        if (v.grbUse7) {
          return "P7";
        }
        ;
        if (otherwise) {
          return "P'";
        }
        ;
      }
      ;
      if (v1 instanceof TY) {
        if (v.grbUse7) {
          return "T7";
        }
        ;
        if (otherwise) {
          return "T'";
        }
        ;
      }
      ;
      if (v1 instanceof TS) {
        return "Ts";
      }
      ;
      if (v1 instanceof TL) {
        return "Tl";
      }
      ;
      if (v1 instanceof DZ) {
        return "Dz";
      }
      ;
      if (v1 instanceof DL) {
        return "Dl";
      }
      ;
      if (v1 instanceof TSY) {
        if (v.grbUse7) {
          return "Ts7";
        }
        ;
        if (otherwise) {
          return "Ts'";
        }
        ;
      }
      ;
      if (v1 instanceof TLY) {
        if (v.grbUse7) {
          return "Tl7";
        }
        ;
        if (otherwise) {
          return "Tl'";
        }
        ;
      }
      ;
      if (v1 instanceof S) {
        return "S";
      }
      ;
      if (v1 instanceof LH) {
        return "Lh";
      }
      ;
      if (v1 instanceof L) {
        return "L";
      }
      ;
      if (v1 instanceof LY) {
        if (v.grbUse7) {
          return "7L";
        }
        ;
        if (otherwise) {
          return "'L";
        }
        ;
      }
      ;
      if (v1 instanceof J) {
        return "Y";
      }
      ;
      if (v1 instanceof JY) {
        if (v.grbUse7) {
          return "7Y";
        }
        ;
        if (otherwise) {
          return "'Y";
        }
        ;
      }
      ;
      if (v1 instanceof K) {
        return "K";
      }
      ;
      if (v1 instanceof KW) {
        return "Kw";
      }
      ;
      if (v1 instanceof G) {
        return "G";
      }
      ;
      if (v1 instanceof GW) {
        return "Gw";
      }
      ;
      if (v1 instanceof KY) {
        if (v.grbUse7) {
          return "K7";
        }
        ;
        if (otherwise) {
          return "K'";
        }
        ;
      }
      ;
      if (v1 instanceof KWY) {
        if (v.grbUse7) {
          return "Kw7";
        }
        ;
        if (otherwise) {
          return "Kw'";
        }
        ;
      }
      ;
      if (v1 instanceof Q) {
        return "Kh";
      }
      ;
      if (v1 instanceof QW) {
        return "Khw";
      }
      ;
      if (v1 instanceof GU) {
        return "Gh";
      }
      ;
      if (v1 instanceof GUW) {
        return "Ghw";
      }
      ;
      if (v1 instanceof QY) {
        if (v.grbUse7) {
          return "Kh7";
        }
        ;
        if (otherwise) {
          return "Kh'";
        }
        ;
      }
      ;
      if (v1 instanceof QWY) {
        if (v.grbUse7) {
          return "Khw7";
        }
        ;
        if (otherwise) {
          return "Khw'";
        }
        ;
      }
      ;
      if (v1 instanceof X) {
        return "X";
      }
      ;
      if (v1 instanceof XW) {
        return "Xw";
      }
      ;
      if (v1 instanceof XU) {
        return "Xh";
      }
      ;
      if (v1 instanceof XUW) {
        return "Xhw";
      }
      ;
      if (v1 instanceof W) {
        return "W";
      }
      ;
      if (v1 instanceof WY) {
        if (v.grbUse7) {
          return "7W";
        }
        ;
        if (otherwise) {
          return "'W";
        }
        ;
      }
      ;
      if (v1 instanceof Y) {
        return "'";
      }
      ;
      if (v1 instanceof H) {
        if (v.grbUseJ) {
          return "J";
        }
        ;
        if (otherwise) {
          return "H";
        }
        ;
      }
      ;
      if (v1 instanceof A) {
        return "A";
      }
      ;
      if (v1 instanceof E) {
        return "Eh";
      }
      ;
      if (v1 instanceof I) {
        return "I";
      }
      ;
      if (v1 instanceof O) {
        return "O";
      }
      ;
      if (v1 instanceof U) {
        return "U";
      }
      ;
      if (v1 instanceof AU) {
        return "E";
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Grubb (line 129, column 1 - line 129, column 58): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputGrubbAsciiX = function(v) {
    return function(v1) {
      if (v1 instanceof M) {
        return "m";
      }
      ;
      if (v1 instanceof MY) {
        if (v.grbUse7) {
          return "7m";
        }
        ;
        if (otherwise) {
          return "'m";
        }
        ;
      }
      ;
      if (v1 instanceof N) {
        return "n";
      }
      ;
      if (v1 instanceof NY) {
        if (v.grbUse7) {
          return "7n";
        }
        ;
        if (otherwise) {
          return "'n";
        }
        ;
      }
      ;
      if (v1 instanceof P) {
        return "p";
      }
      ;
      if (v1 instanceof T) {
        return "t";
      }
      ;
      if (v1 instanceof B) {
        return "b";
      }
      ;
      if (v1 instanceof D) {
        return "d";
      }
      ;
      if (v1 instanceof PY) {
        if (v.grbUse7) {
          return "p7";
        }
        ;
        if (otherwise) {
          return "p'";
        }
        ;
      }
      ;
      if (v1 instanceof TY) {
        if (v.grbUse7) {
          return "t7";
        }
        ;
        if (otherwise) {
          return "t'";
        }
        ;
      }
      ;
      if (v1 instanceof TS) {
        return "ts";
      }
      ;
      if (v1 instanceof TL) {
        return "tl";
      }
      ;
      if (v1 instanceof DZ) {
        return "dz";
      }
      ;
      if (v1 instanceof DL) {
        return "dl";
      }
      ;
      if (v1 instanceof TSY) {
        if (v.grbUse7) {
          return "ts7";
        }
        ;
        if (otherwise) {
          return "ts'";
        }
        ;
      }
      ;
      if (v1 instanceof TLY) {
        if (v.grbUse7) {
          return "tl7";
        }
        ;
        if (otherwise) {
          return "tl'";
        }
        ;
      }
      ;
      if (v1 instanceof S) {
        return "s";
      }
      ;
      if (v1 instanceof LH) {
        return "lh";
      }
      ;
      if (v1 instanceof L) {
        return "l";
      }
      ;
      if (v1 instanceof LY) {
        if (v.grbUse7) {
          return "7l";
        }
        ;
        if (otherwise) {
          return "'l";
        }
        ;
      }
      ;
      if (v1 instanceof J) {
        return "y";
      }
      ;
      if (v1 instanceof JY) {
        if (v.grbUse7) {
          return "7y";
        }
        ;
        if (otherwise) {
          return "'y";
        }
        ;
      }
      ;
      if (v1 instanceof K) {
        return "k";
      }
      ;
      if (v1 instanceof KW) {
        return "kw";
      }
      ;
      if (v1 instanceof G) {
        return "g";
      }
      ;
      if (v1 instanceof GW) {
        return "gw";
      }
      ;
      if (v1 instanceof KY) {
        if (v.grbUse7) {
          return "k7";
        }
        ;
        if (otherwise) {
          return "k'";
        }
        ;
      }
      ;
      if (v1 instanceof KWY) {
        if (v.grbUse7) {
          return "kw7";
        }
        ;
        if (otherwise) {
          return "kw'";
        }
        ;
      }
      ;
      if (v1 instanceof Q) {
        return "kh";
      }
      ;
      if (v1 instanceof QW) {
        return "khw";
      }
      ;
      if (v1 instanceof GU) {
        return "gh";
      }
      ;
      if (v1 instanceof GUW) {
        return "ghw";
      }
      ;
      if (v1 instanceof QY) {
        if (v.grbUse7) {
          return "kh7";
        }
        ;
        if (otherwise) {
          return "kh'";
        }
        ;
      }
      ;
      if (v1 instanceof QWY) {
        if (v.grbUse7) {
          return "khw7";
        }
        ;
        if (otherwise) {
          return "khw'";
        }
        ;
      }
      ;
      if (v1 instanceof X) {
        return "x";
      }
      ;
      if (v1 instanceof XW) {
        return "xw";
      }
      ;
      if (v1 instanceof XU) {
        return "xh";
      }
      ;
      if (v1 instanceof XUW) {
        return "xhw";
      }
      ;
      if (v1 instanceof W) {
        return "w";
      }
      ;
      if (v1 instanceof WY) {
        if (v.grbUse7) {
          return "7w";
        }
        ;
        if (otherwise) {
          return "'w";
        }
        ;
      }
      ;
      if (v1 instanceof Y) {
        return "'";
      }
      ;
      if (v1 instanceof H) {
        if (v.grbUseJ) {
          return "j";
        }
        ;
        if (otherwise) {
          return "h";
        }
        ;
      }
      ;
      if (v1 instanceof A) {
        return "a";
      }
      ;
      if (v1 instanceof E) {
        return "eh";
      }
      ;
      if (v1 instanceof I) {
        return "i";
      }
      ;
      if (v1 instanceof O) {
        return "o";
      }
      ;
      if (v1 instanceof U) {
        return "u";
      }
      ;
      if (v1 instanceof AU) {
        return "e";
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Grubb (line 50, column 1 - line 50, column 58): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputGrubbAsciiLetter = function(v) {
    return function(v1) {
      if (v1 instanceof Maj) {
        return outputGrubbAsciiY(v)(v1.value0);
      }
      ;
      if (v1 instanceof Min2) {
        return outputGrubbAsciiX(v)(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Grubb (line 207, column 1 - line 207, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputGrubbAsciiChars$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nil) {
        return "";
      }
      ;
      if (v1 instanceof Cons && (v1.value0 instanceof Punct && (v1.value1 instanceof Cons && v1.value1.value0 instanceof Kwak))) {
        if (isCharLetter(Y.value)(v1.value1.value0) && !v["grbUse'"]) {
          return v1.value0.value0 + outputGrubbAsciiChars$prime(v)(v1.value1.value1);
        }
        ;
        if (otherwise) {
          return v1.value0.value0 + (outputGrubbAsciiLetter(v)(v1.value1.value0.value0) + outputGrubbAsciiChars$prime(v)(v1.value1.value1));
        }
        ;
      }
      ;
      if (v1 instanceof Cons && v1.value0 instanceof Punct) {
        return v1.value0.value0 + outputGrubbAsciiChars$prime(v)(v1.value1);
      }
      ;
      if (v1 instanceof Cons && v1.value0 instanceof Kwak) {
        return outputGrubbAsciiLetter(v)(v1.value0.value0) + outputGrubbAsciiChars$prime(v)(v1.value1);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Grubb (line 227, column 1 - line 227, column 67): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputGrubbAsciiChars = function(v) {
    return function(v1) {
      if (v1 instanceof Nil) {
        return "";
      }
      ;
      if (v1 instanceof Cons && v1.value0 instanceof Kwak) {
        if (isCharLetter(Y.value)(v1.value0) && !v["grbUse'"]) {
          return outputGrubbAsciiChars$prime(v)(v1.value1);
        }
        ;
        if (otherwise) {
          return outputGrubbAsciiLetter(v)(v1.value0.value0) + outputGrubbAsciiChars$prime(v)(v1.value1);
        }
        ;
      }
      ;
      return outputGrubbAsciiChars$prime(v)(v1);
    };
  };
  var defGrubbOptions = {
    grbUseJ: false,
    "grbUse'": true,
    grbUse7: false
  };

  // output/Kwakwala.Output.IPA/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList)(monoidString);
  var outputIpaX = function(v) {
    return function(v1) {
      if (v1 instanceof M) {
        return "m";
      }
      ;
      if (v1 instanceof MY) {
        return "m\u02C0";
      }
      ;
      if (v1 instanceof N) {
        return "n";
      }
      ;
      if (v1 instanceof NY) {
        return "n\u02C0";
      }
      ;
      if (v1 instanceof P) {
        return "p";
      }
      ;
      if (v1 instanceof T) {
        return "t";
      }
      ;
      if (v1 instanceof B) {
        return "b";
      }
      ;
      if (v1 instanceof D) {
        return "d";
      }
      ;
      if (v1 instanceof PY) {
        return "p\u02BC";
      }
      ;
      if (v1 instanceof TY) {
        return "t\u02BC";
      }
      ;
      if (v1 instanceof TS) {
        if (v.ipaUseTies) {
          return "t\u0361s";
        }
        ;
        if (otherwise) {
          return "ts";
        }
        ;
      }
      ;
      if (v1 instanceof TL) {
        if (v.ipaUseTies) {
          return "t\u0361\u026C";
        }
        ;
        if (otherwise) {
          return "t\u026C";
        }
        ;
      }
      ;
      if (v1 instanceof DZ) {
        if (v.ipaUseTies) {
          return "d\u0361z";
        }
        ;
        if (otherwise) {
          return "dz";
        }
        ;
      }
      ;
      if (v1 instanceof DL) {
        if (v.ipaUseTies) {
          return "d\u0361\u026E";
        }
        ;
        if (otherwise) {
          return "d\u026E";
        }
        ;
      }
      ;
      if (v1 instanceof TSY) {
        if (v.ipaUseTies) {
          return "t\u0361s\u02BC";
        }
        ;
        if (otherwise) {
          return "ts\u02BC";
        }
        ;
      }
      ;
      if (v1 instanceof TLY) {
        if (v.ipaUseTies) {
          return "t\u0361\u026C\u02BC";
        }
        ;
        if (otherwise) {
          return "t\u026C\u02BC";
        }
        ;
      }
      ;
      if (v1 instanceof S) {
        return "s";
      }
      ;
      if (v1 instanceof LH) {
        return "\u026C";
      }
      ;
      if (v1 instanceof L) {
        return "l";
      }
      ;
      if (v1 instanceof LY) {
        return "l\u02C0";
      }
      ;
      if (v1 instanceof J) {
        return "j";
      }
      ;
      if (v1 instanceof JY) {
        return "j\u02C0";
      }
      ;
      if (v1 instanceof K) {
        if (v.ipaShowPal) {
          return "k\u02B2";
        }
        ;
        if (otherwise) {
          return "k";
        }
        ;
      }
      ;
      if (v1 instanceof KW) {
        return "k\u02B7";
      }
      ;
      if (v1 instanceof G) {
        if (v.ipaShowPal) {
          return "g\u02B2";
        }
        ;
        if (otherwise) {
          return "g";
        }
        ;
      }
      ;
      if (v1 instanceof GW) {
        return "g\u02B7";
      }
      ;
      if (v1 instanceof KY) {
        if (v.ipaShowPal) {
          return "k\u02B2\u02BC";
        }
        ;
        if (otherwise) {
          return "k\u02BC";
        }
        ;
      }
      ;
      if (v1 instanceof KWY) {
        return "k\u02B7\u02BC";
      }
      ;
      if (v1 instanceof Q) {
        return "q";
      }
      ;
      if (v1 instanceof QW) {
        return "q\u02B7";
      }
      ;
      if (v1 instanceof GU) {
        return "\u0262";
      }
      ;
      if (v1 instanceof GUW) {
        return "\u0262\u02B7";
      }
      ;
      if (v1 instanceof QY) {
        return "q\u02BC";
      }
      ;
      if (v1 instanceof QWY) {
        return "q\u02B7\u02BC";
      }
      ;
      if (v1 instanceof X) {
        if (v.ipaShowPal) {
          return "x\u02B2";
        }
        ;
        if (otherwise) {
          return "x";
        }
        ;
      }
      ;
      if (v1 instanceof XW) {
        return "x\u02B7";
      }
      ;
      if (v1 instanceof XU) {
        return "\u03C7";
      }
      ;
      if (v1 instanceof XUW) {
        return "\u03C7\u02B7";
      }
      ;
      if (v1 instanceof W) {
        return "w";
      }
      ;
      if (v1 instanceof WY) {
        return "w\u02C0";
      }
      ;
      if (v1 instanceof Y) {
        return "\u0294";
      }
      ;
      if (v1 instanceof H) {
        return "h";
      }
      ;
      if (v1 instanceof A) {
        return "a";
      }
      ;
      if (v1 instanceof E) {
        return "e";
      }
      ;
      if (v1 instanceof I) {
        return "i";
      }
      ;
      if (v1 instanceof O) {
        return "o";
      }
      ;
      if (v1 instanceof U) {
        return "u";
      }
      ;
      if (v1 instanceof AU) {
        return "\u0259";
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.IPA (line 70, column 1 - line 70, column 49): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputIPALetter = function(v) {
    return function(v1) {
      if (v1 instanceof Maj) {
        return outputIpaX(v)(v1.value0);
      }
      ;
      if (v1 instanceof Min2) {
        return outputIpaX(v)(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.IPA (line 147, column 1 - line 147, column 55): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputIPAChar = function(v) {
    return function(v1) {
      if (v1 instanceof Kwak) {
        return outputIPALetter(v)(v1.value0);
      }
      ;
      if (v1 instanceof Punct) {
        return v1.value0;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.IPA (line 152, column 1 - line 152, column 51): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var outputIPAChars = function(ops) {
    return function(xs) {
      return foldMap2(outputIPAChar(ops))(xs);
    };
  };
  var defIPAOptions = {
    ipaUseTies: true,
    ipaShowPal: true
  };

  // output/Kwakwala.GUI.Types/index.js
  var OutGrubb = /* @__PURE__ */ function() {
    function OutGrubb2() {
    }
    ;
    OutGrubb2.value = new OutGrubb2();
    return OutGrubb2;
  }();
  var OutNapa = /* @__PURE__ */ function() {
    function OutNapa2() {
    }
    ;
    OutNapa2.value = new OutNapa2();
    return OutNapa2;
  }();
  var OutUmista = /* @__PURE__ */ function() {
    function OutUmista2() {
    }
    ;
    OutUmista2.value = new OutUmista2();
    return OutUmista2;
  }();
  var OutIPA = /* @__PURE__ */ function() {
    function OutIPA2() {
    }
    ;
    OutIPA2.value = new OutIPA2();
    return OutIPA2;
  }();
  var OutSyllabic = /* @__PURE__ */ function() {
    function OutSyllabic2() {
    }
    ;
    OutSyllabic2.value = new OutSyllabic2();
    return OutSyllabic2;
  }();
  var InGrubb = /* @__PURE__ */ function() {
    function InGrubb2() {
    }
    ;
    InGrubb2.value = new InGrubb2();
    return InGrubb2;
  }();
  var InNapa = /* @__PURE__ */ function() {
    function InNapa2() {
    }
    ;
    InNapa2.value = new InNapa2();
    return InNapa2;
  }();
  var InUmista = /* @__PURE__ */ function() {
    function InUmista2() {
    }
    ;
    InUmista2.value = new InUmista2();
    return InUmista2;
  }();
  var InIsland = /* @__PURE__ */ function() {
    function InIsland2() {
    }
    ;
    InIsland2.value = new InIsland2();
    return InIsland2;
  }();
  var InBoas = /* @__PURE__ */ function() {
    function InBoas2() {
    }
    ;
    InBoas2.value = new InBoas2();
    return InBoas2;
  }();
  var eqKwakOutType = {
    eq: function(x) {
      return function(y) {
        if (x instanceof OutGrubb && y instanceof OutGrubb) {
          return true;
        }
        ;
        if (x instanceof OutNapa && y instanceof OutNapa) {
          return true;
        }
        ;
        if (x instanceof OutUmista && y instanceof OutUmista) {
          return true;
        }
        ;
        if (x instanceof OutIPA && y instanceof OutIPA) {
          return true;
        }
        ;
        if (x instanceof OutSyllabic && y instanceof OutSyllabic) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eqKwakInType = {
    eq: function(x) {
      return function(y) {
        if (x instanceof InGrubb && y instanceof InGrubb) {
          return true;
        }
        ;
        if (x instanceof InNapa && y instanceof InNapa) {
          return true;
        }
        ;
        if (x instanceof InUmista && y instanceof InUmista) {
          return true;
        }
        ;
        if (x instanceof InIsland && y instanceof InIsland) {
          return true;
        }
        ;
        if (x instanceof InBoas && y instanceof InBoas) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var defAllOrthOptions = {
    grubbOrthOptions: defGrubbOptions,
    ipaOrthOptions: defIPAOptions
  };

  // output/Kwakwala.GUI.Components.InSelect/index.js
  var type_19 = /* @__PURE__ */ type_17(isPropInputType);
  var value13 = /* @__PURE__ */ value12(isPropString);
  var eq3 = /* @__PURE__ */ eq(eqKwakInType);
  var bind6 = /* @__PURE__ */ bind(bindHalogenM);
  var get2 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure9 = /* @__PURE__ */ pure(applicativeHalogenM);
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put2 = /* @__PURE__ */ put(monadStateHalogenM);
  var radioButtonsI = function(kwk) {
    return div2([class_("radio-in")])([input([type_19(InputRadio.value), id2("grubb-in"), name15("RInput"), value13("uh1"), onClick(function(v) {
      return InGrubb.value;
    }), checked2(eq3(kwk)(InGrubb.value))]), label4([$$for("grubb-in")])([text5("Grubb")]), input([type_19(InputRadio.value), id2("umista-in"), name15("RInput"), value13("uh2"), onClick(function(v) {
      return InUmista.value;
    }), checked2(eq3(kwk)(InUmista.value))]), label4([$$for("umista-in")])([text5("Umista")]), input([type_19(InputRadio.value), id2("napa-in"), name15("RInput"), value13("uh3"), onClick(function(v) {
      return InNapa.value;
    }), checked2(eq3(kwk)(InNapa.value))]), label4([$$for("napa-in")])([text5("NAPA")]), input([type_19(InputRadio.value), id2("boas-in"), name15("RInput"), value13("uh4"), onClick(function(v) {
      return InBoas.value;
    }), checked2(eq3(kwk)(InBoas.value))]), label4([$$for("boas-in")])([text5("Boas")]), input([type_19(InputRadio.value), id2("island-in"), name15("RInput"), value13("uh5"), onClick(function(v) {
      return InIsland.value;
    }), checked2(eq3(kwk)(InIsland.value))]), label4([$$for("island-in")])([text5("Island")])]);
  };
  var handleOrthInQuery = function(dictMonad) {
    return function(v) {
      return bind6(get2)(function(kit) {
        return pure9(new Just(v.value0(kit)));
      });
    };
  };
  var handleOrthIn = function(kit) {
    return discard5(put2(kit))(function() {
      return raise(kit);
    });
  };
  var inputComp = function(dictMonadEffect) {
    return mkComponent({
      initialState: function(x) {
        return x;
      },
      render: radioButtonsI,
      "eval": mkEval({
        handleAction: handleOrthIn,
        handleQuery: handleOrthInQuery(dictMonadEffect.Monad0()),
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _inputSelect = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Data.MediaType.Common/index.js
  var textPlain = "text/plain";
  var textCSV = "text/csv";

  // output/Web.File.Blob/foreign.js
  function typeImpl(blob) {
    return blob.type;
  }
  function blobImpl(args) {
    return function(mediaType2) {
      return new Blob(args, { type: mediaType2 });
    };
  }

  // output/Web.File.Blob/index.js
  var type_20 = function(blob) {
    var blobType = typeImpl(blob);
    var $2 = blobType === "";
    if ($2) {
      return Nothing.value;
    }
    ;
    return new Just(blobType);
  };
  var fromString = function(str) {
    return function(ct) {
      return blobImpl([str])(ct);
    };
  };

  // output/Web.File.File/index.js
  var type_21 = function($1) {
    return type_20($1);
  };
  var toBlob = unsafeCoerce2;

  // output/Web.File.FileReader/foreign.js
  function fileReader() {
    return new FileReader();
  }
  function result(fr) {
    return function() {
      return fr.result;
    };
  }
  function readAsText(blob) {
    return function(fr) {
      return function() {
        fr.readAsText(blob);
      };
    };
  }

  // output/Web.File.FileReader/index.js
  var toEventTarget2 = unsafeCoerce2;

  // output/Web.File.FileReader.Aff/index.js
  var show3 = /* @__PURE__ */ show(/* @__PURE__ */ showNonEmptyList(showForeignError));
  var mempty2 = /* @__PURE__ */ mempty(monoidCanceler);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var readAs = function(readMethod) {
    return function(getResult) {
      return function(blob) {
        return makeAff(function(fun) {
          var succ = function($12) {
            return fun(Right.create($12));
          };
          var err = function($13) {
            return fun(Left.create($13));
          };
          return function __do2() {
            var fr = fileReader();
            var et = toEventTarget2(fr);
            var errorListener = eventListener(function(v) {
              return err(error("error"));
            })();
            var loadListener = eventListener(function(v) {
              return function __do3() {
                var res = result(fr)();
                return either(function(errs) {
                  return err(error(show3(errs)));
                })(succ)(runExcept(readMethod(res)))();
              };
            })();
            addEventListener(error2)(errorListener)(false)(et)();
            addEventListener(load2)(loadListener)(false)(et)();
            getResult(blob)(fr)();
            return mempty2;
          };
        });
      };
    };
  };
  var readAsText2 = /* @__PURE__ */ readAs(readString2)(readAsText);

  // output/Kwakwala.GUI.Components.InputFile/index.js
  var type_22 = /* @__PURE__ */ type_17(isPropInputType);
  var onFileUpload2 = /* @__PURE__ */ onFileUpload(unfoldableArray);
  var value14 = /* @__PURE__ */ value12(isPropString);
  var bind7 = /* @__PURE__ */ bind(bindHalogenM);
  var get3 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure10 = /* @__PURE__ */ pure(applicativeHalogenM);
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put3 = /* @__PURE__ */ put(monadStateHalogenM);
  var gets2 = /* @__PURE__ */ gets(monadStateHalogenM);
  var InputString = /* @__PURE__ */ function() {
    function InputString2(value0) {
      this.value0 = value0;
    }
    ;
    InputString2.create = function(value0) {
      return new InputString2(value0);
    };
    return InputString2;
  }();
  var InputFileIsland = /* @__PURE__ */ function() {
    function InputFileIsland2(value0) {
      this.value0 = value0;
    }
    ;
    InputFileIsland2.create = function(value0) {
      return new InputFileIsland2(value0);
    };
    return InputFileIsland2;
  }();
  var InputFileNonIsland = /* @__PURE__ */ function() {
    function InputFileNonIsland2(value0) {
      this.value0 = value0;
    }
    ;
    InputFileNonIsland2.create = function(value0) {
      return new InputFileNonIsland2(value0);
    };
    return InputFileNonIsland2;
  }();
  var ChangeFile = /* @__PURE__ */ function() {
    function ChangeFile2(value0) {
      this.value0 = value0;
    }
    ;
    ChangeFile2.create = function(value0) {
      return new ChangeFile2(value0);
    };
    return ChangeFile2;
  }();
  var Reconvert = /* @__PURE__ */ function() {
    function Reconvert2() {
    }
    ;
    Reconvert2.value = new Reconvert2();
    return Reconvert2;
  }();
  var DoNothing = /* @__PURE__ */ function() {
    function DoNothing2() {
    }
    ;
    DoNothing2.value = new DoNothing2();
    return DoNothing2;
  }();
  var renderError = function(v) {
    if (v instanceof Nothing) {
      return "No Errors";
    }
    ;
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.InputFile (line 106, column 1 - line 106, column 38): " + [v.constructor.name]);
  };
  var makeFileData = function(stt) {
    return {
      fileStr: stt.input,
      fileTyp: stt.ftype
    };
  };
  var inputTypes = /* @__PURE__ */ append(semigroupInputAcceptType)(/* @__PURE__ */ mediaType(textPlain))(/* @__PURE__ */ mediaType(textCSV));
  var handleUpload = function(xs) {
    var v = head(xs);
    if (v instanceof Nothing) {
      return DoNothing.value;
    }
    ;
    if (v instanceof Just) {
      return new ChangeFile(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.InputFile (line 111, column 19 - line 113, column 27): " + [v.constructor.name]);
  };
  var inputFileGUI = function(dictMonad) {
    return function(stt) {
      return div_([p_([text5("Input")]), p_([input([type_22(InputFile.value), accept2(inputTypes), multiple3(false), onFileUpload2(handleUpload)])]), p_([textarea([rows4(12), cols2(100), id2("output-box"), name15("output-box"), readOnly3(true), value14(stt.input), class_(stt.style)])]), p_([text5("Errors")]), p_([textarea([rows4(3), cols2(100), id2("error-box"), name15("error-box"), readOnly3(true), value14(renderError(stt.error))])]), p_([button([id2("convert-button"), name15("convert-button"), onClick(function(v) {
        return Reconvert.value;
      }), disabled10($$null2(stt.input))])([text5("Reconvert")])])]);
    };
  };
  var handleInputFileQuery = function(dictMonad) {
    return function(v) {
      if (v instanceof InputString) {
        return bind7(get3)(function(stt) {
          return pure10(new Just(v.value0(makeFileData(stt))));
        });
      }
      ;
      if (v instanceof InputFileIsland) {
        return bind7(get3)(function(stt) {
          return discard6(put3(function() {
            var $40 = {};
            for (var $41 in stt) {
              if ({}.hasOwnProperty.call(stt, $41)) {
                $40[$41] = stt[$41];
              }
              ;
            }
            ;
            $40.style = "island";
            return $40;
          }()))(function() {
            return pure10(new Just(v.value0));
          });
        });
      }
      ;
      if (v instanceof InputFileNonIsland) {
        return bind7(get3)(function(stt) {
          return discard6(put3(function() {
            var $44 = {};
            for (var $45 in stt) {
              if ({}.hasOwnProperty.call(stt, $45)) {
                $44[$45] = stt[$45];
              }
              ;
            }
            ;
            $44.style = "normal";
            return $44;
          }()))(function() {
            return pure10(new Just(v.value0));
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Components.InputFile (line 118, column 1 - line 118, column 136): " + [v.constructor.name]);
    };
  };
  var handleInputFileAction = function(dictMonadAff) {
    var liftAff2 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(v) {
      if (v instanceof DoNothing) {
        return pure10(unit);
      }
      ;
      if (v instanceof ChangeFile) {
        return bind7(liftAff2(attempt(readAsText2(toBlob(v.value0)))))(function(estr) {
          return bind7(pure10(type_21(v.value0)))(function(ftyp) {
            if (estr instanceof Left) {
              return bind7(get3)(function(stt) {
                return put3(function() {
                  var $50 = {};
                  for (var $51 in stt) {
                    if ({}.hasOwnProperty.call(stt, $51)) {
                      $50[$51] = stt[$51];
                    }
                    ;
                  }
                  ;
                  $50.error = new Just(message(estr.value0));
                  return $50;
                }());
              });
            }
            ;
            if (estr instanceof Right) {
              return bind7(gets2(function(v1) {
                return v1.style;
              }))(function(sty) {
                return discard6(put3({
                  input: estr.value0,
                  error: Nothing.value,
                  ftype: ftyp,
                  style: sty
                }))(function() {
                  return raise({
                    fileStr: estr.value0,
                    fileTyp: ftyp
                  });
                });
              });
            }
            ;
            throw new Error("Failed pattern match at Kwakwala.GUI.Components.InputFile (line 137, column 3 - line 145, column 50): " + [estr.constructor.name]);
          });
        });
      }
      ;
      if (v instanceof Reconvert) {
        return bind7(gets2(function(v1) {
          return v1.input;
        }))(function(str) {
          return bind7(gets2(function(v1) {
            return v1.ftype;
          }))(function(typ) {
            return raise({
              fileStr: str,
              fileTyp: typ
            });
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Components.InputFile (line 131, column 1 - line 131, column 134): " + [v.constructor.name]);
    };
  };
  var inputFileComp = function(dictMonadAff) {
    var Monad0 = dictMonadAff.MonadEffect0().Monad0();
    return mkComponent({
      initialState: function(x) {
        return {
          input: x,
          error: Nothing.value,
          ftype: Nothing.value,
          style: "normal"
        };
      },
      render: inputFileGUI(Monad0),
      "eval": mkEval({
        handleAction: handleInputFileAction(dictMonadAff),
        handleQuery: handleInputFileQuery(Monad0),
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _inputFile = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.GUI.Components.GrubbOptions/index.js
  var bind8 = /* @__PURE__ */ bind(bindHalogenM);
  var get4 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure11 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify5 = /* @__PURE__ */ modify2(monadStateHalogenM);
  var type_23 = /* @__PURE__ */ type_17(isPropInputType);
  var value15 = /* @__PURE__ */ value12(isPropString);
  var GrbTogJ = /* @__PURE__ */ function() {
    function GrbTogJ2() {
    }
    ;
    GrbTogJ2.value = new GrbTogJ2();
    return GrbTogJ2;
  }();
  var GrbTog$prime = /* @__PURE__ */ function() {
    function GrbTog$prime2() {
    }
    ;
    GrbTog$prime2.value = new GrbTog$prime2();
    return GrbTog$prime2;
  }();
  var GrbTog7 = /* @__PURE__ */ function() {
    function GrbTog72() {
    }
    ;
    GrbTog72.value = new GrbTog72();
    return GrbTog72;
  }();
  var GetGrubb = /* @__PURE__ */ function() {
    function GetGrubb2(value0) {
      this.value0 = value0;
    }
    ;
    GetGrubb2.create = function(value0) {
      return new GetGrubb2(value0);
    };
    return GetGrubb2;
  }();
  var toggleGrubb = function(v) {
    return function(v1) {
      if (v instanceof GrbTogJ) {
        return {
          grbUseJ: !v1.grbUseJ,
          "grbUse'": v1["grbUse'"],
          grbUse7: v1.grbUse7
        };
      }
      ;
      if (v instanceof GrbTog$prime) {
        return {
          grbUseJ: v1.grbUseJ,
          "grbUse'": !v1["grbUse'"],
          grbUse7: v1.grbUse7
        };
      }
      ;
      if (v instanceof GrbTog7) {
        return {
          grbUseJ: v1.grbUseJ,
          "grbUse'": v1["grbUse'"],
          grbUse7: !v1.grbUse7
        };
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Components.GrubbOptions (line 103, column 1 - line 103, column 59): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var handleGrubbQuery = function(v) {
    return bind8(get4)(function(x) {
      return pure11(new Just(v.value0(x)));
    });
  };
  var handleGrubbChange_ = function(tog) {
    return bind8(modify5(toggleGrubb(tog)))(function(x) {
      return raise(x);
    });
  };
  var grubbOptionsGUI = function(grb) {
    return div2([class_("orth-options")])([p_([label4([$$for("grubb-j"), class_("orth-span")])([input([type_23(InputCheckbox.value), id2("grubb-j"), name15("CGrubb"), value15("grb1"), onClick(function(v) {
      return GrbTogJ.value;
    }), checked2(grb.grbUseJ)]), text5("Use J for /h/")])]), p_([label4([$$for("grubb-e"), class_("orth-span")])([input([type_23(InputCheckbox.value), id2("grubb-e"), name15("CGrubb"), value15("grb2"), onClick(function(v) {
      return GrbTog$prime.value;
    }), checked2(grb["grbUse'"])]), text5("Include apostrophes at word start")])]), p_([label4([$$for("grubb-7")])([input([type_23(InputCheckbox.value), id2("grubb-7"), name15("CGrubb"), value15("grb3"), onClick(function(v) {
      return GrbTog7.value;
    }), checked2(grb.grbUse7)]), text5("Replace apostrophes with 7s")])])]);
  };
  var grubbComp = function(dictMonadEffect) {
    return mkComponent({
      initialState: function(x) {
        return x;
      },
      render: function(st) {
        return grubbOptionsGUI(st);
      },
      "eval": mkEval({
        handleAction: handleGrubbChange_,
        handleQuery: handleGrubbQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _grubbOptions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.GUI.Components.IPAOptions/index.js
  var bind9 = /* @__PURE__ */ bind(bindHalogenM);
  var get5 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure13 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify6 = /* @__PURE__ */ modify2(monadStateHalogenM);
  var type_24 = /* @__PURE__ */ type_17(isPropInputType);
  var value16 = /* @__PURE__ */ value12(isPropString);
  var IpaTogPal = /* @__PURE__ */ function() {
    function IpaTogPal2() {
    }
    ;
    IpaTogPal2.value = new IpaTogPal2();
    return IpaTogPal2;
  }();
  var IpaTogTie = /* @__PURE__ */ function() {
    function IpaTogTie2() {
    }
    ;
    IpaTogTie2.value = new IpaTogTie2();
    return IpaTogTie2;
  }();
  var GetIPA = /* @__PURE__ */ function() {
    function GetIPA2(value0) {
      this.value0 = value0;
    }
    ;
    GetIPA2.create = function(value0) {
      return new GetIPA2(value0);
    };
    return GetIPA2;
  }();
  var toggleIPA = function(v) {
    return function(v1) {
      if (v instanceof IpaTogPal) {
        return {
          ipaUseTies: v1.ipaUseTies,
          ipaShowPal: !v1.ipaShowPal
        };
      }
      ;
      if (v instanceof IpaTogTie) {
        return {
          ipaUseTies: !v1.ipaUseTies,
          ipaShowPal: v1.ipaShowPal
        };
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Components.IPAOptions (line 92, column 1 - line 92, column 51): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var handleIPAQuery = function(v) {
    return bind9(get5)(function(x) {
      return pure13(new Just(v.value0(x)));
    });
  };
  var handleIPAChange_ = function(tog) {
    return bind9(modify6(toggleIPA(tog)))(function(x) {
      return raise(x);
    });
  };
  var grubbOptionsGUI2 = function(ops) {
    return div2([class_("orth-options")])([p_([span3([class_("orth-span")])([label4([$$for("ipa-tie")])([input([type_24(InputCheckbox.value), id2("ipa-tie"), name15("CIPA"), value16("ipa1"), onClick(function(v) {
      return IpaTogTie.value;
    }), checked2(ops.ipaUseTies)]), text5("Include ties in the middle of affricates")])])]), p_([span3([class_("orth-span")])([label4([$$for("ipa-pal")])([input([type_24(InputCheckbox.value), id2("ipa-pal"), name15("CIPA"), value16("ipa2"), onClick(function(v) {
      return IpaTogPal.value;
    }), checked2(ops.ipaShowPal)]), text5("Include palatalisation marks for velar consonants")])])])]);
  };
  var ipaComp = function(dictMonadEffect) {
    return mkComponent({
      initialState: function(x) {
        return x;
      },
      render: function(st) {
        return grubbOptionsGUI2(st);
      },
      "eval": mkEval({
        handleAction: handleIPAChange_,
        handleQuery: handleIPAQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _ipaOptions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.GUI.Components.OrthOptions/index.js
  var bind10 = /* @__PURE__ */ bind(bindHalogenM);
  var query2 = /* @__PURE__ */ query();
  var grubbOptionsIsSymbol = {
    reflectSymbol: function() {
      return "grubbOptions";
    }
  };
  var query1 = /* @__PURE__ */ query2(grubbOptionsIsSymbol)(ordUnit);
  var pure14 = /* @__PURE__ */ pure(applicativeHalogenM);
  var map24 = /* @__PURE__ */ map(functorMaybe);
  var ipaOptionsIsSymbol = {
    reflectSymbol: function() {
      return "ipaOptions";
    }
  };
  var query22 = /* @__PURE__ */ query2(ipaOptionsIsSymbol)(ordUnit);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var slot2 = /* @__PURE__ */ slot();
  var slot1 = /* @__PURE__ */ slot2(grubbOptionsIsSymbol)(ordUnit);
  var slot22 = /* @__PURE__ */ slot2(ipaOptionsIsSymbol)(ordUnit);
  var OrthGetGrubb = /* @__PURE__ */ function() {
    function OrthGetGrubb2(value0) {
      this.value0 = value0;
    }
    ;
    OrthGetGrubb2.create = function(value0) {
      return new OrthGetGrubb2(value0);
    };
    return OrthGetGrubb2;
  }();
  var OrthGetIPA = /* @__PURE__ */ function() {
    function OrthGetIPA2(value0) {
      this.value0 = value0;
    }
    ;
    OrthGetIPA2.create = function(value0) {
      return new OrthGetIPA2(value0);
    };
    return OrthGetIPA2;
  }();
  var OrthGrubbOptions = /* @__PURE__ */ function() {
    function OrthGrubbOptions2(value0) {
      this.value0 = value0;
    }
    ;
    OrthGrubbOptions2.create = function(value0) {
      return new OrthGrubbOptions2(value0);
    };
    return OrthGrubbOptions2;
  }();
  var OrthIPAOptions = /* @__PURE__ */ function() {
    function OrthIPAOptions2(value0) {
      this.value0 = value0;
    }
    ;
    OrthIPAOptions2.create = function(value0) {
      return new OrthIPAOptions2(value0);
    };
    return OrthIPAOptions2;
  }();
  var OrthToggleBox = /* @__PURE__ */ function() {
    function OrthToggleBox2() {
    }
    ;
    OrthToggleBox2.value = new OrthToggleBox2();
    return OrthToggleBox2;
  }();
  var OrthRaiseOptions = /* @__PURE__ */ function() {
    function OrthRaiseOptions2(value0) {
      this.value0 = value0;
    }
    ;
    OrthRaiseOptions2.create = function(value0) {
      return new OrthRaiseOptions2(value0);
    };
    return OrthRaiseOptions2;
  }();
  var orthRaiseIPA = function($42) {
    return OrthRaiseOptions.create(OrthIPAOptions.create($42));
  };
  var orthRaiseGrubb = function($43) {
    return OrthRaiseOptions.create(OrthGrubbOptions.create($43));
  };
  var handleOrthQuery = function(dictMonad) {
    return function(v) {
      if (v instanceof OrthGetGrubb) {
        return bind10(query1(_grubbOptions)(unit)(new GetGrubb(function(x) {
          return x;
        })))(function(rslt) {
          return pure14(map24(v.value0)(rslt));
        });
      }
      ;
      if (v instanceof OrthGetIPA) {
        return bind10(query22(_ipaOptions)(unit)(new GetIPA(function(x) {
          return x;
        })))(function(rslt) {
          return pure14(map24(v.value0)(rslt));
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Components.OrthOptions (line 123, column 1 - line 123, column 125): " + [v.constructor.name]);
    };
  };
  var handleOrthChange_ = function(v) {
    if (v instanceof OrthToggleBox) {
      return modify_3(function(x) {
        var $36 = {};
        for (var $37 in x) {
          if ({}.hasOwnProperty.call(x, $37)) {
            $36[$37] = x[$37];
          }
          ;
        }
        ;
        $36.orthOpen = !x.orthOpen;
        return $36;
      });
    }
    ;
    if (v instanceof OrthRaiseOptions) {
      return raise(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.OrthOptions (line 82, column 1 - line 82, column 108): " + [v.constructor.name]);
  };
  var buttonText = function(orst) {
    if (orst.orthOpen) {
      return "Hide Specific Orthography Options";
    }
    ;
    if (otherwise) {
      return "Show Specific Orhtography Options";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.OrthOptions (line 118, column 1 - line 118, column 34): " + [orst.constructor.name]);
  };
  var blockStyle = function(orst) {
    if (orst.orthOpen) {
      return "display : block";
    }
    ;
    if (otherwise) {
      return "display : none";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.OrthOptions (line 111, column 1 - line 111, column 34): " + [orst.constructor.name]);
  };
  var orthOptionsGUI = function(dictMonadEffect) {
    var grubbComp2 = grubbComp(dictMonadEffect);
    var ipaComp2 = ipaComp(dictMonadEffect);
    return function(orst) {
      return div_([button([class_("collapsible"), onClick(function(v) {
        return OrthToggleBox.value;
      })])([text5(buttonText(orst))]), div2([class_("hid-content"), style(blockStyle(orst))])([p_([text5("Grubb Options")]), p_([slot1(_grubbOptions)(unit)(grubbComp2)(defGrubbOptions)(orthRaiseGrubb)]), p_([text5("IPA Options")]), p_([slot22(_ipaOptions)(unit)(ipaComp2)(defIPAOptions)(orthRaiseIPA)])])]);
    };
  };
  var orthComp = function(dictMonadEffect) {
    var orthOptionsGUI1 = orthOptionsGUI(dictMonadEffect);
    return mkComponent({
      initialState: function(v) {
        return {
          orthOpen: false
        };
      },
      render: function(st) {
        return orthOptionsGUI1(st);
      },
      "eval": mkEval({
        handleAction: handleOrthChange_,
        handleQuery: handleOrthQuery(dictMonadEffect.Monad0()),
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _orthOptions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.GUI.Components.OutSelect/index.js
  var type_25 = /* @__PURE__ */ type_17(isPropInputType);
  var value17 = /* @__PURE__ */ value12(isPropString);
  var eq4 = /* @__PURE__ */ eq(eqKwakOutType);
  var bind11 = /* @__PURE__ */ bind(bindHalogenM);
  var get6 = /* @__PURE__ */ get(monadStateHalogenM);
  var pure15 = /* @__PURE__ */ pure(applicativeHalogenM);
  var discard7 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put4 = /* @__PURE__ */ put(monadStateHalogenM);
  var radioButtonsO = function(kwk) {
    return div2([class_("radio-in")])([input([type_25(InputRadio.value), id2("grubb-out"), name15("ROutput"), value17("guh1"), onClick(function(v) {
      return OutGrubb.value;
    }), checked2(eq4(kwk)(OutGrubb.value))]), label4([$$for("grubb-out")])([text5("Grubb")]), input([type_25(InputRadio.value), id2("umista-out"), name15("ROutput"), value17("guh2"), onClick(function(v) {
      return OutUmista.value;
    }), checked2(eq4(kwk)(OutUmista.value))]), label4([$$for("umista-out")])([text5("Umista")]), input([type_25(InputRadio.value), id2("napa-out"), name15("ROutput"), value17("guh3"), onClick(function(v) {
      return OutNapa.value;
    }), checked2(eq4(kwk)(OutNapa.value))]), label4([$$for("napa-out")])([text5("NAPA")]), input([type_25(InputRadio.value), id2("ipa-out"), name15("ROutput"), value17("guh4"), onClick(function(v) {
      return OutIPA.value;
    }), checked2(eq4(kwk)(OutIPA.value))]), label4([$$for("ipa-out")])([text5("IPA")]), input([type_25(InputRadio.value), id2("syll-out"), name15("ROutput"), value17("guh5"), onClick(function(v) {
      return OutSyllabic.value;
    }), checked2(eq4(kwk)(OutSyllabic.value))]), label4([$$for("syll-out")])([text5("Syllabic (Carrier)")])]);
  };
  var handleOrthOutQuery = function(dictMonad) {
    return function(v) {
      return bind11(get6)(function(kit) {
        return pure15(new Just(v.value0(kit)));
      });
    };
  };
  var handleOrthOut = function(kot) {
    return discard7(put4(kot))(function() {
      return raise(kot);
    });
  };
  var outputComp = function(dictMonadEffect) {
    return mkComponent({
      initialState: function(v) {
        return OutGrubb.value;
      },
      render: radioButtonsO,
      "eval": mkEval({
        handleAction: handleOrthOut,
        handleQuery: handleOrthOutQuery(dictMonadEffect.Monad0()),
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _outputSelect = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Web.File.Url/foreign.js
  function createObjectURL(blob) {
    return function() {
      return URL.createObjectURL(blob);
    };
  }

  // output/Kwakwala.GUI.Components.OutputFile/index.js
  var type_26 = /* @__PURE__ */ type_17(isPropMediaType);
  var pure16 = /* @__PURE__ */ pure(applicativeHalogenM);
  var bind15 = /* @__PURE__ */ bind(bindHalogenM);
  var discard8 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put5 = /* @__PURE__ */ put(monadStateHalogenM);
  var ReceiveFileData = /* @__PURE__ */ function() {
    function ReceiveFileData2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ReceiveFileData2.create = function(value0) {
      return function(value1) {
        return new ReceiveFileData2(value0, value1);
      };
    };
    return ReceiveFileData2;
  }();
  var outputFileGUI = function(dictMonad) {
    return function(stt) {
      return div_([p_([a([href4(stt.ofUrl), download3("output_text"), type_26(stt.ofTyp), target5("_blank")])([text5("Download")])])]);
    };
  };
  var handleOutputFileAction = function(dictMonadAff) {
    return function(v) {
      return pure16(unit);
    };
  };
  var fdType = function(fd) {
    if (fd.fileTyp instanceof Nothing) {
      return textPlain;
    }
    ;
    if (fd.fileTyp instanceof Just) {
      return fd.fileTyp.value0;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components.OutputFile (line 101, column 13 - line 103, column 16): " + [fd.fileTyp.constructor.name]);
  };
  var handleOutputFileQuery = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadEffect));
    return function(v) {
      return bind15(pure16(fdType(v.value0)))(function(ftp) {
        return bind15(pure16(fromString(v.value0.fileStr)(ftp)))(function(blb) {
          return bind15(liftEffect7(createObjectURL(blb)))(function(str) {
            return discard8(put5({
              ofUrl: str,
              ofTyp: ftp
            }))(function() {
              return pure16(new Just(v.value1));
            });
          });
        });
      });
    };
  };
  var outputFileComp = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    return mkComponent({
      initialState: function(v) {
        return {
          ofUrl: "",
          ofTyp: textPlain
        };
      },
      render: outputFileGUI(MonadEffect0.Monad0()),
      "eval": mkEval({
        handleAction: handleOutputFileAction(dictMonadAff),
        handleQuery: handleOutputFileQuery(MonadEffect0),
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _outputFile = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.GUI.Components.OutputText/index.js
  var value18 = /* @__PURE__ */ value12(isPropString);
  var discard9 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var put6 = /* @__PURE__ */ put(monadStateHalogenM);
  var pure17 = /* @__PURE__ */ pure(applicativeHalogenM);
  var OutputString = /* @__PURE__ */ function() {
    function OutputString2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    OutputString2.create = function(value0) {
      return function(value1) {
        return new OutputString2(value0, value1);
      };
    };
    return OutputString2;
  }();
  var outputTextGUI = function(dictMonad) {
    return function(str) {
      return div_([p_([text5("Output")]), p_([textarea([rows4(12), cols2(100), id2("output-box"), name15("output-box"), readOnly3(true), value18(str)])])]);
    };
  };
  var handleOutputTextQuery = function(dictMonad) {
    return function(v) {
      return discard9(put6(v.value0))(function() {
        return pure17(new Just(v.value1));
      });
    };
  };
  var handleOutputAction = function(dictMonad) {
    return function(str) {
      return put6(str);
    };
  };
  var outputTextComp = function(dictMonad) {
    return mkComponent({
      initialState: function(x) {
        return x;
      },
      render: outputTextGUI(dictMonad),
      "eval": mkEval({
        handleAction: handleOutputAction(dictMonad),
        handleQuery: handleOutputTextQuery(dictMonad),
        receive: function(str) {
          return new Just(str);
        },
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };
  var _outputText = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();

  // output/Kwakwala.Output.Napa/index.js
  var foldMap3 = /* @__PURE__ */ foldMap(foldableList)(monoidString);
  var outputNAPA$prime = function(v) {
    if (v instanceof M) {
      return "M";
    }
    ;
    if (v instanceof MY) {
      return "M\u0313";
    }
    ;
    if (v instanceof N) {
      return "N";
    }
    ;
    if (v instanceof NY) {
      return "N\u0313";
    }
    ;
    if (v instanceof P) {
      return "P";
    }
    ;
    if (v instanceof T) {
      return "T";
    }
    ;
    if (v instanceof B) {
      return "B";
    }
    ;
    if (v instanceof D) {
      return "D";
    }
    ;
    if (v instanceof PY) {
      return "P\u0313";
    }
    ;
    if (v instanceof TY) {
      return "T\u0313";
    }
    ;
    if (v instanceof TS) {
      return "C";
    }
    ;
    if (v instanceof TL) {
      return "\u019B";
    }
    ;
    if (v instanceof DZ) {
      return "D\u1DBB";
    }
    ;
    if (v instanceof DL) {
      return "\u039B";
    }
    ;
    if (v instanceof TSY) {
      return "C\u0313";
    }
    ;
    if (v instanceof TLY) {
      return "\u019B\u0313";
    }
    ;
    if (v instanceof S) {
      return "S";
    }
    ;
    if (v instanceof LH) {
      return "\u0141";
    }
    ;
    if (v instanceof L) {
      return "L";
    }
    ;
    if (v instanceof LY) {
      return "L\u0313";
    }
    ;
    if (v instanceof J) {
      return "Y";
    }
    ;
    if (v instanceof JY) {
      return "Y\u0313";
    }
    ;
    if (v instanceof K) {
      return "K";
    }
    ;
    if (v instanceof KW) {
      return "K\u02B7";
    }
    ;
    if (v instanceof G) {
      return "G";
    }
    ;
    if (v instanceof GW) {
      return "G\u02B7";
    }
    ;
    if (v instanceof KY) {
      return "K\u0313";
    }
    ;
    if (v instanceof KWY) {
      return "K\u0313\u02B7";
    }
    ;
    if (v instanceof Q) {
      return "Q";
    }
    ;
    if (v instanceof QW) {
      return "Q\u02B7";
    }
    ;
    if (v instanceof GU) {
      return "\u01E6";
    }
    ;
    if (v instanceof GUW) {
      return "\u01E6\u02B7";
    }
    ;
    if (v instanceof QY) {
      return "Q\u0313";
    }
    ;
    if (v instanceof QWY) {
      return "Q\u0313\u02B7";
    }
    ;
    if (v instanceof X) {
      return "X";
    }
    ;
    if (v instanceof XW) {
      return "X\u02B7";
    }
    ;
    if (v instanceof XU) {
      return "X\u030C";
    }
    ;
    if (v instanceof XUW) {
      return "X\u030C\u02B7";
    }
    ;
    if (v instanceof W) {
      return "W";
    }
    ;
    if (v instanceof WY) {
      return "W\u0313";
    }
    ;
    if (v instanceof Y) {
      return "\u0294";
    }
    ;
    if (v instanceof H) {
      return "H";
    }
    ;
    if (v instanceof A) {
      return "A";
    }
    ;
    if (v instanceof E) {
      return "E";
    }
    ;
    if (v instanceof I) {
      return "I";
    }
    ;
    if (v instanceof O) {
      return "O";
    }
    ;
    if (v instanceof U) {
      return "U";
    }
    ;
    if (v instanceof AU) {
      return "\u018F";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Napa (line 86, column 1 - line 86, column 36): " + [v.constructor.name]);
  };
  var outputNAPA = function(v) {
    if (v instanceof M) {
      return "m";
    }
    ;
    if (v instanceof MY) {
      return "m\u0313";
    }
    ;
    if (v instanceof N) {
      return "n";
    }
    ;
    if (v instanceof NY) {
      return "n\u0313";
    }
    ;
    if (v instanceof P) {
      return "p";
    }
    ;
    if (v instanceof T) {
      return "t";
    }
    ;
    if (v instanceof B) {
      return "b";
    }
    ;
    if (v instanceof D) {
      return "d";
    }
    ;
    if (v instanceof PY) {
      return "p\u0313";
    }
    ;
    if (v instanceof TY) {
      return "t\u0313";
    }
    ;
    if (v instanceof TS) {
      return "c";
    }
    ;
    if (v instanceof TL) {
      return "\u019B";
    }
    ;
    if (v instanceof DZ) {
      return "d\u1DBB";
    }
    ;
    if (v instanceof DL) {
      return "\u03BB";
    }
    ;
    if (v instanceof TSY) {
      return "c\u0313";
    }
    ;
    if (v instanceof TLY) {
      return "\u019B\u0313";
    }
    ;
    if (v instanceof S) {
      return "s";
    }
    ;
    if (v instanceof LH) {
      return "\u0142";
    }
    ;
    if (v instanceof L) {
      return "l";
    }
    ;
    if (v instanceof LY) {
      return "l\u0313";
    }
    ;
    if (v instanceof J) {
      return "y";
    }
    ;
    if (v instanceof JY) {
      return "y\u0313";
    }
    ;
    if (v instanceof K) {
      return "k";
    }
    ;
    if (v instanceof KW) {
      return "k\u02B7";
    }
    ;
    if (v instanceof G) {
      return "g";
    }
    ;
    if (v instanceof GW) {
      return "g\u02B7";
    }
    ;
    if (v instanceof KY) {
      return "k\u0313";
    }
    ;
    if (v instanceof KWY) {
      return "k\u0313\u02B7";
    }
    ;
    if (v instanceof Q) {
      return "q";
    }
    ;
    if (v instanceof QW) {
      return "q\u02B7";
    }
    ;
    if (v instanceof GU) {
      return "\u01E7";
    }
    ;
    if (v instanceof GUW) {
      return "\u01E7\u02B7";
    }
    ;
    if (v instanceof QY) {
      return "q\u0313";
    }
    ;
    if (v instanceof QWY) {
      return "q\u0313\u02B7";
    }
    ;
    if (v instanceof X) {
      return "x";
    }
    ;
    if (v instanceof XW) {
      return "x\u02B7";
    }
    ;
    if (v instanceof XU) {
      return "x\u030C";
    }
    ;
    if (v instanceof XUW) {
      return "x\u030C\u02B7";
    }
    ;
    if (v instanceof W) {
      return "w";
    }
    ;
    if (v instanceof WY) {
      return "w\u0313";
    }
    ;
    if (v instanceof Y) {
      return "\u0294";
    }
    ;
    if (v instanceof H) {
      return "h";
    }
    ;
    if (v instanceof A) {
      return "a";
    }
    ;
    if (v instanceof E) {
      return "e";
    }
    ;
    if (v instanceof I) {
      return "i";
    }
    ;
    if (v instanceof O) {
      return "o";
    }
    ;
    if (v instanceof U) {
      return "u";
    }
    ;
    if (v instanceof AU) {
      return "\u0259";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Napa (line 36, column 1 - line 36, column 35): " + [v.constructor.name]);
  };
  var outputNapaLetter = function(v) {
    if (v instanceof Maj) {
      return outputNAPA$prime(v.value0);
    }
    ;
    if (v instanceof Min2) {
      return outputNAPA(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Napa (line 136, column 1 - line 136, column 42): " + [v.constructor.name]);
  };
  var outputNapaChar = function(v) {
    if (v instanceof Kwak) {
      return outputNapaLetter(v.value0);
    }
    ;
    if (v instanceof Punct) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Napa (line 140, column 1 - line 140, column 38): " + [v.constructor.name]);
  };
  var outputNapaChars = function(xs) {
    return foldMap3(outputNapaChar)(xs);
  };

  // output/Kwakwala.Output.Syllabic.Tables/index.js
  var mergeLetters = function(cns) {
    return function(vwl) {
      if (cns instanceof Mc) {
        if (vwl instanceof Av) {
          return "\u160D";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u160B";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u160C";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1609";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1608";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u160A";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 23, column 11 - line 29, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof MYc) {
        if (vwl instanceof Av) {
          return "\u1427\u160D";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u160B";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u160C";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u1609";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u1608";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u160A";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 30, column 11 - line 36, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Nc) {
        if (vwl instanceof Av) {
          return "\u1607";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1605";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1606";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1603";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1602";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1604";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 37, column 11 - line 43, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof NYc) {
        if (vwl instanceof Av) {
          return "\u1427\u1607";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u1605";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u1606";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u1603";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u1602";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u1604";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 44, column 11 - line 50, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Pc) {
        if (vwl instanceof Av) {
          return "\u1645";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1643";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1644";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1641";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1640";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1642";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 53, column 11 - line 59, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Tc) {
        if (vwl instanceof Av) {
          return "\u15E1";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15DF";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15E0";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15DD";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15DC";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15DE";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 60, column 11 - line 66, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Bc) {
        if (vwl instanceof Av) {
          return "\u15ED";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15EB";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15EC";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15E9";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15E8";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15EA";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 67, column 11 - line 73, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Dc) {
        if (vwl instanceof Av) {
          return "\u1455";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1453";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1454";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u144E";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u144C";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1450";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 74, column 11 - line 80, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof PYc) {
        if (vwl instanceof Av) {
          return "\u164D";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u164B";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u164C";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1649";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1648";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u164A";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 81, column 11 - line 87, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof TYc) {
        if (vwl instanceof Av) {
          return "\u15E7";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15E5";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15E6";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15E3";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15E2";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15E4";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 88, column 11 - line 94, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof TSc) {
        if (vwl instanceof Av) {
          return "\u1666";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1664";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1665";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1662";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1661";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1663";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 97, column 12 - line 103, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof TLc) {
        if (vwl instanceof Av) {
          return "\u1639";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1637";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1638";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1635";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1634";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1636";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 104, column 12 - line 110, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof DZc) {
        if (vwl instanceof Av) {
          return "\u1659";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1657";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1658";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1655";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1654";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1656";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 111, column 12 - line 117, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof DLc) {
        if (vwl instanceof Av) {
          return "\u162D";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u162B";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u162C";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1629";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1628";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u162A";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 118, column 12 - line 124, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof TSYc) {
        if (vwl instanceof Av) {
          return "\u166C";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u166A";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u166B";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1668";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1667";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1669";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 125, column 12 - line 131, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof TLYc) {
        if (vwl instanceof Av) {
          return "\u163F";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u163D";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u163E";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u163B";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u163A";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u163C";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 132, column 12 - line 138, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Sc) {
        if (vwl instanceof Av) {
          return "\u1653";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1651";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1652";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u164F";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u164E";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1650";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 141, column 11 - line 147, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof LHc) {
        if (vwl instanceof Av) {
          return "\u1633";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1631";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1632";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u162F";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u162E";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1630";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 148, column 11 - line 154, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Lc) {
        if (vwl instanceof Av) {
          return "\u1627";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1625";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1626";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1623";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1622";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1624";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 157, column 11 - line 163, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof LYc) {
        if (vwl instanceof Av) {
          return "\u1427\u1627";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u1625";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u1626";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u1623";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u1622";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u1624";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 164, column 11 - line 170, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Jc) {
        if (vwl instanceof Av) {
          return "\u1613";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1611";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1612";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u160F";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u160E";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1610";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 171, column 11 - line 177, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof JYc) {
        if (vwl instanceof Av) {
          return "\u1427\u1613";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u1611";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u1612";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u160F";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u160E";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u1610";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 178, column 11 - line 184, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Kc) {
        if (vwl instanceof Av) {
          return "\u15FA";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15F8";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15F9";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15F6";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15F5";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15F7";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 187, column 12 - line 193, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof KWc) {
        if (vwl instanceof Av) {
          return "\u15FA\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15F8\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15F9\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15F6\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15F5\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15F7\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 194, column 12 - line 200, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Gc) {
        if (vwl instanceof Av) {
          return "\u15F4";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15F2";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15F3";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15F0";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15EF";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15F1";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 201, column 12 - line 207, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof GWc) {
        if (vwl instanceof Av) {
          return "\u15F4\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15F2\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15F3\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15F0\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15EF\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15F1\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 208, column 12 - line 214, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof KYc) {
        if (vwl instanceof Av) {
          return "\u1600";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15FE";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15FF";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15FC";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15FB";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15FD";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 215, column 12 - line 221, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof KWYc) {
        if (vwl instanceof Av) {
          return "\u1600\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15FE\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15FF\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15FC\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15FB\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15FD\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 222, column 12 - line 228, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Qc) {
        if (vwl instanceof Av) {
          return "\u161B";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1618";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1619";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1616";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1614";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1617";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 232, column 12 - line 238, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof QWc) {
        if (vwl instanceof Av) {
          return "\u161B\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1618\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1619\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1616\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1614\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1617\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 239, column 12 - line 245, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof GUc) {
        if (vwl instanceof Av) {
          return "\u15CF";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15CD";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15CE";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15CB";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15CA";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15CC";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 246, column 12 - line 252, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof GUWc) {
        if (vwl instanceof Av) {
          return "\u15CF\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15CD\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15CE\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15CB\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15CA\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15CC\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 253, column 12 - line 259, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof QYc) {
        if (vwl instanceof Av) {
          return "\u1621";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u161F";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1620";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u161D";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u161C";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u161E";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 260, column 12 - line 266, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof QWYc) {
        if (vwl instanceof Av) {
          return "\u1621\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u161F\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1620\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u161D\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u161C\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u161E\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 267, column 12 - line 273, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Xc) {
        if (vwl instanceof Av) {
          return "\u15C9";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15C7";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15C8";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15C5";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15C4";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15C6";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 277, column 12 - line 283, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof XWc) {
        if (vwl instanceof Av) {
          return "\u15C9\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15C7\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15C8\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15C5\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15C4\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15C6\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 284, column 12 - line 290, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof XUc) {
        if (vwl instanceof Av) {
          return "\u15DB";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15D9";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15DA";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15D7";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15D6";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15D8";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 291, column 12 - line 297, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof XUWc) {
        if (vwl instanceof Av) {
          return "\u15DB\u1424";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15D9\u1424";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15DA\u1424";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15D7\u1424";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15D6\u1424";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15D8\u1424";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 298, column 12 - line 304, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Wc) {
        if (vwl instanceof Av) {
          return "\u15D5";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u15D3";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u15D4";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u15D1";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u15D0";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u15D2";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 307, column 11 - line 313, column 16): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof WYc) {
        if (vwl instanceof Av) {
          return "\u1427\u15D5";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u15D3";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u15D4";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u15D1";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u15D0";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u15D2";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 314, column 11 - line 320, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Yc) {
        if (vwl instanceof Av) {
          return "\u1427\u140A";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1427\u1408";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1427\u1409";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1427\u1403";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u1427\u1401";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1427\u1405";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 323, column 10 - line 329, column 17): " + [vwl.constructor.name]);
      }
      ;
      if (cns instanceof Hc) {
        if (vwl instanceof Av) {
          return "\u1438";
        }
        ;
        if (vwl instanceof Ev) {
          return "\u1436";
        }
        ;
        if (vwl instanceof Iv) {
          return "\u1437";
        }
        ;
        if (vwl instanceof Ov) {
          return "\u1431";
        }
        ;
        if (vwl instanceof Uv) {
          return "\u142F";
        }
        ;
        if (vwl instanceof AUv) {
          return "\u1433";
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 330, column 10 - line 336, column 16): " + [vwl.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 21, column 24 - line 336, column 16): " + [cns.constructor.name]);
    };
  };
  var makeVowel = function(v) {
    if (v instanceof Av) {
      return "\u140A";
    }
    ;
    if (v instanceof Ev) {
      return "\u1408";
    }
    ;
    if (v instanceof Iv) {
      return "\u1409";
    }
    ;
    if (v instanceof Ov) {
      return "\u1403";
    }
    ;
    if (v instanceof Uv) {
      return "\u1401";
    }
    ;
    if (v instanceof AUv) {
      return "\u1405";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 12, column 1 - line 12, column 33): " + [v.constructor.name]);
  };
  var letterCoda = function(kwc) {
    if (kwc instanceof Mc) {
      return "\u1466";
    }
    ;
    if (kwc instanceof MYc) {
      return "\u1427\u1466";
    }
    ;
    if (kwc instanceof Nc) {
      return "\u1423";
    }
    ;
    if (kwc instanceof NYc) {
      return "\u1427\u1423";
    }
    ;
    if (kwc instanceof Pc) {
      return "\u15EE\u15EE";
    }
    ;
    if (kwc instanceof Tc) {
      return "\u142A\u142A";
    }
    ;
    if (kwc instanceof Bc) {
      return "\u15EE";
    }
    ;
    if (kwc instanceof Dc) {
      return "\u142A";
    }
    ;
    if (kwc instanceof PYc) {
      return "\u1429";
    }
    ;
    if (kwc instanceof TYc) {
      return "\u167E";
    }
    ;
    if (kwc instanceof TSc) {
      return "\u1646\u1646";
    }
    ;
    if (kwc instanceof TLc) {
      return "\u153E";
    }
    ;
    if (kwc instanceof DZc) {
      return "\u1646";
    }
    ;
    if (kwc instanceof DLc) {
      return "\u1550";
    }
    ;
    if (kwc instanceof TSYc) {
      return "\u1647";
    }
    ;
    if (kwc instanceof TLYc) {
      return "\u14EB";
    }
    ;
    if (kwc instanceof Sc) {
      return "\u1506";
    }
    ;
    if (kwc instanceof LHc) {
      return "\u14A1";
    }
    ;
    if (kwc instanceof Lc) {
      return "\u144A";
    }
    ;
    if (kwc instanceof LYc) {
      return "\u1427\u144A";
    }
    ;
    if (kwc instanceof Jc) {
      return "\u156A";
    }
    ;
    if (kwc instanceof JYc) {
      return "\u1427\u156A";
    }
    ;
    if (kwc instanceof Kc) {
      return "\u1420";
    }
    ;
    if (kwc instanceof KWc) {
      return "\u1420\u1424";
    }
    ;
    if (kwc instanceof Gc) {
      return "\u141C";
    }
    ;
    if (kwc instanceof GWc) {
      return "\u141C\u1424";
    }
    ;
    if (kwc instanceof KYc) {
      return "\u1601";
    }
    ;
    if (kwc instanceof KWYc) {
      return "\u1601\u1424";
    }
    ;
    if (kwc instanceof Qc) {
      return "\u14BD";
    }
    ;
    if (kwc instanceof QWc) {
      return "\u14BD\u1424";
    }
    ;
    if (kwc instanceof GUc) {
      return "\u141F";
    }
    ;
    if (kwc instanceof GUWc) {
      return "\u141F\u1424";
    }
    ;
    if (kwc instanceof QYc) {
      return "\u14BE";
    }
    ;
    if (kwc instanceof QWYc) {
      return "\u14BE\u1424";
    }
    ;
    if (kwc instanceof Xc) {
      return "\u1425";
    }
    ;
    if (kwc instanceof XWc) {
      return "\u1425";
    }
    ;
    if (kwc instanceof XUc) {
      return "\u1426";
    }
    ;
    if (kwc instanceof XUWc) {
      return "\u1426";
    }
    ;
    if (kwc instanceof Wc) {
      return "\u141E";
    }
    ;
    if (kwc instanceof WYc) {
      return "\u1427\u141E";
    }
    ;
    if (kwc instanceof Yc) {
      return "\u1427";
    }
    ;
    if (kwc instanceof Hc) {
      return "\u144B";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Syllabic.Tables (line 339, column 18 - line 399, column 16): " + [kwc.constructor.name]);
  };

  // output/Kwakwala.Types.Tables/index.js
  var letterToVowel = function(x) {
    if (x instanceof A) {
      return new Just(Av.value);
    }
    ;
    if (x instanceof E) {
      return new Just(Ev.value);
    }
    ;
    if (x instanceof I) {
      return new Just(Iv.value);
    }
    ;
    if (x instanceof O) {
      return new Just(Ov.value);
    }
    ;
    if (x instanceof U) {
      return new Just(Uv.value);
    }
    ;
    if (x instanceof AU) {
      return new Just(AUv.value);
    }
    ;
    return Nothing.value;
  };
  var tryVowelCL = function(v) {
    if (v instanceof Maj) {
      return letterToVowel(v.value0);
    }
    ;
    if (v instanceof Min2) {
      return letterToVowel(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Types.Tables (line 18, column 1 - line 18, column 45): " + [v.constructor.name]);
  };
  var tryVowelCC = function(v) {
    if (v instanceof Kwak) {
      return tryVowelCL(v.value0);
    }
    ;
    return Nothing.value;
  };
  var letterToCons = function(kwk) {
    if (kwk instanceof M) {
      return new Just(Mc.value);
    }
    ;
    if (kwk instanceof MY) {
      return new Just(MYc.value);
    }
    ;
    if (kwk instanceof N) {
      return new Just(Nc.value);
    }
    ;
    if (kwk instanceof NY) {
      return new Just(NYc.value);
    }
    ;
    if (kwk instanceof P) {
      return new Just(Pc.value);
    }
    ;
    if (kwk instanceof T) {
      return new Just(Tc.value);
    }
    ;
    if (kwk instanceof B) {
      return new Just(Bc.value);
    }
    ;
    if (kwk instanceof D) {
      return new Just(Dc.value);
    }
    ;
    if (kwk instanceof PY) {
      return new Just(PYc.value);
    }
    ;
    if (kwk instanceof TY) {
      return new Just(TYc.value);
    }
    ;
    if (kwk instanceof TS) {
      return new Just(TSc.value);
    }
    ;
    if (kwk instanceof TL) {
      return new Just(TLc.value);
    }
    ;
    if (kwk instanceof DZ) {
      return new Just(DZc.value);
    }
    ;
    if (kwk instanceof DL) {
      return new Just(DLc.value);
    }
    ;
    if (kwk instanceof TSY) {
      return new Just(TSYc.value);
    }
    ;
    if (kwk instanceof TLY) {
      return new Just(TLYc.value);
    }
    ;
    if (kwk instanceof S) {
      return new Just(Sc.value);
    }
    ;
    if (kwk instanceof LH) {
      return new Just(LHc.value);
    }
    ;
    if (kwk instanceof L) {
      return new Just(Lc.value);
    }
    ;
    if (kwk instanceof LY) {
      return new Just(LYc.value);
    }
    ;
    if (kwk instanceof J) {
      return new Just(Jc.value);
    }
    ;
    if (kwk instanceof JY) {
      return new Just(JYc.value);
    }
    ;
    if (kwk instanceof K) {
      return new Just(Kc.value);
    }
    ;
    if (kwk instanceof KW) {
      return new Just(KWc.value);
    }
    ;
    if (kwk instanceof G) {
      return new Just(Gc.value);
    }
    ;
    if (kwk instanceof GW) {
      return new Just(GWc.value);
    }
    ;
    if (kwk instanceof KY) {
      return new Just(KYc.value);
    }
    ;
    if (kwk instanceof KWY) {
      return new Just(KWYc.value);
    }
    ;
    if (kwk instanceof Q) {
      return new Just(Qc.value);
    }
    ;
    if (kwk instanceof QW) {
      return new Just(QWc.value);
    }
    ;
    if (kwk instanceof GU) {
      return new Just(GUc.value);
    }
    ;
    if (kwk instanceof GUW) {
      return new Just(GUWc.value);
    }
    ;
    if (kwk instanceof QY) {
      return new Just(QYc.value);
    }
    ;
    if (kwk instanceof QWY) {
      return new Just(QWYc.value);
    }
    ;
    if (kwk instanceof X) {
      return new Just(Xc.value);
    }
    ;
    if (kwk instanceof XW) {
      return new Just(XWc.value);
    }
    ;
    if (kwk instanceof XU) {
      return new Just(XUc.value);
    }
    ;
    if (kwk instanceof XUW) {
      return new Just(XUWc.value);
    }
    ;
    if (kwk instanceof W) {
      return new Just(Wc.value);
    }
    ;
    if (kwk instanceof WY) {
      return new Just(WYc.value);
    }
    ;
    if (kwk instanceof Y) {
      return new Just(Yc.value);
    }
    ;
    if (kwk instanceof H) {
      return new Just(Hc.value);
    }
    ;
    return Nothing.value;
  };
  var tryConsCL = function(v) {
    if (v instanceof Maj) {
      return letterToCons(v.value0);
    }
    ;
    if (v instanceof Min2) {
      return letterToCons(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Types.Tables (line 26, column 1 - line 26, column 48): " + [v.constructor.name]);
  };
  var tryConsCC = function(v) {
    if (v instanceof Kwak) {
      return tryConsCL(v.value0);
    }
    ;
    return Nothing.value;
  };

  // output/Data.Show.Generic/foreign.js
  var intercalate3 = function(separator) {
    return function(xs) {
      return xs.join(separator);
    };
  };

  // output/Data.Show.Generic/index.js
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var genericShowArgsArgument = function(dictShow) {
    var show6 = show(dictShow);
    return {
      genericShowArgs: function(v) {
        return [show6(v)];
      }
    };
  };
  var genericShowArgs = function(dict) {
    return dict.genericShowArgs;
  };
  var genericShowConstructor = function(dictGenericShowArgs) {
    var genericShowArgs1 = genericShowArgs(dictGenericShowArgs);
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return {
        "genericShow'": function(v) {
          var ctor = reflectSymbol2($$Proxy.value);
          var v1 = genericShowArgs1(v);
          if (v1.length === 0) {
            return ctor;
          }
          ;
          return "(" + (intercalate3(" ")(append6([ctor])(v1)) + ")");
        }
      };
    };
  };
  var genericShow$prime = function(dict) {
    return dict["genericShow'"];
  };
  var genericShow = function(dictGeneric) {
    var from3 = from(dictGeneric);
    return function(dictGenericShow) {
      var genericShow$prime1 = genericShow$prime(dictGenericShow);
      return function(x) {
        return genericShow$prime1(from3(x));
      };
    };
  };

  // output/Parsing/index.js
  var $runtime_lazy9 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var show4 = /* @__PURE__ */ show(showString);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift3 = /* @__PURE__ */ function() {
    function Lift4(value0) {
      this.value0 = value0;
    }
    ;
    Lift4.create = function(value0) {
      return new Lift4(value0);
    };
    return Lift4;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var genericPosition_ = {
    to: function(x) {
      return x;
    },
    from: function(x) {
      return x;
    }
  };
  var genericShow2 = /* @__PURE__ */ genericShow(genericPosition_)(/* @__PURE__ */ genericShowConstructor(/* @__PURE__ */ genericShowArgsArgument(/* @__PURE__ */ showRecord()()(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "column";
    }
  })(/* @__PURE__ */ showRecordFieldsCons({
    reflectSymbol: function() {
      return "index";
    }
  })(/* @__PURE__ */ showRecordFieldsConsNil({
    reflectSymbol: function() {
      return "line";
    }
  })(showInt))(showInt))(showInt))))({
    reflectSymbol: function() {
      return "Position";
    }
  }));
  var showPosition = {
    show: function(x) {
      return genericShow2(x);
    }
  };
  var show12 = /* @__PURE__ */ show(showPosition);
  var functorParserT = {
    map: function(f) {
      return function(v) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw2, function(state22, a2) {
              return more(function(v2) {
                return done(state22, f(a2));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v) {
      return function(v1) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v2) {
            return v(state1, more, lift1, $$throw2, function(state22, f) {
              return more(function(v3) {
                return v1(state22, more, lift1, $$throw2, function(state3, a2) {
                  return more(function(v4) {
                    return done(state3, f(a2));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v) {
      return function(next) {
        return function(state1, more, lift1, $$throw2, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw2, function(state22, a2) {
              return more(function(v2) {
                var v3 = next(a2);
                return v3(state22, more, lift1, $$throw2, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a2) {
      return function(state1, v, v1, v2, done) {
        return done(state1, a2);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadRecParserT = {
    tailRecM: function(next) {
      return function(initArg) {
        return function(state1, more, lift1, $$throw2, done) {
          var $lazy_loop = $runtime_lazy9("loop", "Parsing", function() {
            return function(state22, arg, gas) {
              var v = next(arg);
              return v(state22, more, lift1, $$throw2, function(state3, step4) {
                if (step4 instanceof Loop) {
                  var $206 = gas === 0;
                  if ($206) {
                    return more(function(v1) {
                      return $lazy_loop(277)(state3, step4.value0, 30);
                    });
                  }
                  ;
                  return $lazy_loop(279)(state3, step4.value0, gas - 1 | 0);
                }
                ;
                if (step4 instanceof Done) {
                  return done(state3, step4.value0);
                }
                ;
                throw new Error("Failed pattern match at Parsing (line 273, column 39 - line 281, column 43): " + [step4.constructor.name]);
              });
            };
          });
          var loop2 = $lazy_loop(270);
          return loop2(state1, initArg, 30);
        };
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v, v1, $$throw2, v2) {
        return $$throw2(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError3 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v) {
      return function(v1) {
        return function(v2, more, lift1, $$throw2, done) {
          return more(function(v3) {
            return v(new ParseState(v2.value0, v2.value1, false), more, lift1, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw2(v4, err);
                }
                ;
                return v1(v2, more, lift1, $$throw2, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k) {
    return function(state1, v, v1, v2, done) {
      var v3 = k(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var showParseError = {
    show: function(v) {
      return "(ParseError " + (show4(v.value0) + (" " + (show12(v.value1) + ")")));
    }
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map33 = map(Monad0.Bind1().Apply0().Functor0());
    var pure110 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v) {
        var go2 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step4) {
            var v1 = step4(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift3) {
              $tco_done = true;
              return map33(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure110(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 152, column 13 - line 158, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM4(go2)(function(v1) {
          return v(state1, More.create, Lift3.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position2 = /* @__PURE__ */ stateParserT(function(v) {
    return new Tuple(v.value1, v);
  });
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map33 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s) {
      return function(p2) {
        var initialState = new ParseState(s, initialPos, false);
        return map33(fst)(runParserT$prime1(initialState)(p2));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser = function(s) {
    var $281 = runParserT1(s);
    return function($282) {
      return unwrap5($281($282));
    };
  };
  var getParserT = function(state1, v, v1, v2, done) {
    return done(state1, state1);
  };
  var failWithPosition = function(message2) {
    return function(pos) {
      return throwError3(new ParseError(message2, pos));
    };
  };
  var fail2 = function(message2) {
    return bindFlipped8(failWithPosition(message2))(position2);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail2("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
    }
  };
  var consume = /* @__PURE__ */ stateParserT(function(v) {
    return new Tuple(unit, new ParseState(v.value0, v.value1, true));
  });

  // output/Parsing.Combinators/index.js
  var alt5 = /* @__PURE__ */ alt(altParserT);
  var pure18 = /* @__PURE__ */ pure(applicativeParserT);
  var map25 = /* @__PURE__ */ map(functorParserT);
  var manyRec2 = /* @__PURE__ */ manyRec(monadRecParserT)(alternativeParserT);
  var apply2 = /* @__PURE__ */ apply(applyParserT);
  var empty7 = /* @__PURE__ */ empty(plusParserT);
  var withErrorMessage = function(p2) {
    return function(msg) {
      return alt5(p2)(fail2("Expected " + msg));
    };
  };
  var option2 = function(a2) {
    return function(p2) {
      return alt5(p2)(pure18(a2));
    };
  };
  var optionMaybe = function(p2) {
    return option2(Nothing.value)(map25(Just.create)(p2));
  };
  var many1 = function(p2) {
    return apply2(map25(cons$prime)(p2))(manyRec2(p2));
  };
  var many = manyRec2;
  var lookAhead = function(v) {
    return function(state1, more, lift4, $$throw2, done) {
      return v(state1, more, lift4, function(v1, err) {
        return $$throw2(state1, err);
      }, function(v1, res) {
        return done(state1, res);
      });
    };
  };
  var choice = function(dictFoldable) {
    var go2 = function(p1) {
      return function(v) {
        if (v instanceof Nothing) {
          return new Just(p1);
        }
        ;
        if (v instanceof Just) {
          return new Just(alt5(p1)(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Parsing.Combinators (line 358, column 11 - line 360, column 32): " + [v.constructor.name]);
      };
    };
    var $95 = fromMaybe(empty7);
    var $96 = foldr(dictFoldable)(go2)(Nothing.value);
    return function($97) {
      return $95($96($97));
    };
  };

  // output/Data.CodePoint.Unicode.Internal/index.js
  var unsafeIndex2 = /* @__PURE__ */ unsafeIndex();
  var elemIndex2 = /* @__PURE__ */ elemIndex(eqInt);
  var NUMCAT_LU = /* @__PURE__ */ function() {
    function NUMCAT_LU2() {
    }
    ;
    NUMCAT_LU2.value = new NUMCAT_LU2();
    return NUMCAT_LU2;
  }();
  var NUMCAT_LL = /* @__PURE__ */ function() {
    function NUMCAT_LL2() {
    }
    ;
    NUMCAT_LL2.value = new NUMCAT_LL2();
    return NUMCAT_LL2;
  }();
  var NUMCAT_LT = /* @__PURE__ */ function() {
    function NUMCAT_LT2() {
    }
    ;
    NUMCAT_LT2.value = new NUMCAT_LT2();
    return NUMCAT_LT2;
  }();
  var NUMCAT_LM = /* @__PURE__ */ function() {
    function NUMCAT_LM2() {
    }
    ;
    NUMCAT_LM2.value = new NUMCAT_LM2();
    return NUMCAT_LM2;
  }();
  var NUMCAT_LO = /* @__PURE__ */ function() {
    function NUMCAT_LO2() {
    }
    ;
    NUMCAT_LO2.value = new NUMCAT_LO2();
    return NUMCAT_LO2;
  }();
  var NUMCAT_MN = /* @__PURE__ */ function() {
    function NUMCAT_MN2() {
    }
    ;
    NUMCAT_MN2.value = new NUMCAT_MN2();
    return NUMCAT_MN2;
  }();
  var NUMCAT_MC = /* @__PURE__ */ function() {
    function NUMCAT_MC2() {
    }
    ;
    NUMCAT_MC2.value = new NUMCAT_MC2();
    return NUMCAT_MC2;
  }();
  var NUMCAT_ME = /* @__PURE__ */ function() {
    function NUMCAT_ME2() {
    }
    ;
    NUMCAT_ME2.value = new NUMCAT_ME2();
    return NUMCAT_ME2;
  }();
  var NUMCAT_ND = /* @__PURE__ */ function() {
    function NUMCAT_ND2() {
    }
    ;
    NUMCAT_ND2.value = new NUMCAT_ND2();
    return NUMCAT_ND2;
  }();
  var NUMCAT_NL = /* @__PURE__ */ function() {
    function NUMCAT_NL2() {
    }
    ;
    NUMCAT_NL2.value = new NUMCAT_NL2();
    return NUMCAT_NL2;
  }();
  var NUMCAT_NO = /* @__PURE__ */ function() {
    function NUMCAT_NO2() {
    }
    ;
    NUMCAT_NO2.value = new NUMCAT_NO2();
    return NUMCAT_NO2;
  }();
  var NUMCAT_PC = /* @__PURE__ */ function() {
    function NUMCAT_PC2() {
    }
    ;
    NUMCAT_PC2.value = new NUMCAT_PC2();
    return NUMCAT_PC2;
  }();
  var NUMCAT_PD = /* @__PURE__ */ function() {
    function NUMCAT_PD2() {
    }
    ;
    NUMCAT_PD2.value = new NUMCAT_PD2();
    return NUMCAT_PD2;
  }();
  var NUMCAT_PS = /* @__PURE__ */ function() {
    function NUMCAT_PS2() {
    }
    ;
    NUMCAT_PS2.value = new NUMCAT_PS2();
    return NUMCAT_PS2;
  }();
  var NUMCAT_PE = /* @__PURE__ */ function() {
    function NUMCAT_PE2() {
    }
    ;
    NUMCAT_PE2.value = new NUMCAT_PE2();
    return NUMCAT_PE2;
  }();
  var NUMCAT_PI = /* @__PURE__ */ function() {
    function NUMCAT_PI2() {
    }
    ;
    NUMCAT_PI2.value = new NUMCAT_PI2();
    return NUMCAT_PI2;
  }();
  var NUMCAT_PF = /* @__PURE__ */ function() {
    function NUMCAT_PF2() {
    }
    ;
    NUMCAT_PF2.value = new NUMCAT_PF2();
    return NUMCAT_PF2;
  }();
  var NUMCAT_PO = /* @__PURE__ */ function() {
    function NUMCAT_PO2() {
    }
    ;
    NUMCAT_PO2.value = new NUMCAT_PO2();
    return NUMCAT_PO2;
  }();
  var NUMCAT_SM = /* @__PURE__ */ function() {
    function NUMCAT_SM2() {
    }
    ;
    NUMCAT_SM2.value = new NUMCAT_SM2();
    return NUMCAT_SM2;
  }();
  var NUMCAT_SC = /* @__PURE__ */ function() {
    function NUMCAT_SC2() {
    }
    ;
    NUMCAT_SC2.value = new NUMCAT_SC2();
    return NUMCAT_SC2;
  }();
  var NUMCAT_SK = /* @__PURE__ */ function() {
    function NUMCAT_SK2() {
    }
    ;
    NUMCAT_SK2.value = new NUMCAT_SK2();
    return NUMCAT_SK2;
  }();
  var NUMCAT_SO = /* @__PURE__ */ function() {
    function NUMCAT_SO2() {
    }
    ;
    NUMCAT_SO2.value = new NUMCAT_SO2();
    return NUMCAT_SO2;
  }();
  var NUMCAT_ZS = /* @__PURE__ */ function() {
    function NUMCAT_ZS2() {
    }
    ;
    NUMCAT_ZS2.value = new NUMCAT_ZS2();
    return NUMCAT_ZS2;
  }();
  var NUMCAT_ZL = /* @__PURE__ */ function() {
    function NUMCAT_ZL2() {
    }
    ;
    NUMCAT_ZL2.value = new NUMCAT_ZL2();
    return NUMCAT_ZL2;
  }();
  var NUMCAT_ZP = /* @__PURE__ */ function() {
    function NUMCAT_ZP2() {
    }
    ;
    NUMCAT_ZP2.value = new NUMCAT_ZP2();
    return NUMCAT_ZP2;
  }();
  var NUMCAT_CC = /* @__PURE__ */ function() {
    function NUMCAT_CC2() {
    }
    ;
    NUMCAT_CC2.value = new NUMCAT_CC2();
    return NUMCAT_CC2;
  }();
  var NUMCAT_CF = /* @__PURE__ */ function() {
    function NUMCAT_CF2() {
    }
    ;
    NUMCAT_CF2.value = new NUMCAT_CF2();
    return NUMCAT_CF2;
  }();
  var NUMCAT_CS = /* @__PURE__ */ function() {
    function NUMCAT_CS2() {
    }
    ;
    NUMCAT_CS2.value = new NUMCAT_CS2();
    return NUMCAT_CS2;
  }();
  var NUMCAT_CO = /* @__PURE__ */ function() {
    function NUMCAT_CO2() {
    }
    ;
    NUMCAT_CO2.value = new NUMCAT_CO2();
    return NUMCAT_CO2;
  }();
  var NUMCAT_CN = /* @__PURE__ */ function() {
    function NUMCAT_CN2() {
    }
    ;
    NUMCAT_CN2.value = new NUMCAT_CN2();
    return NUMCAT_CN2;
  }();
  var numLat1Blocks = 63;
  var numBlocks = 3396;
  var gencatZS = 2;
  var rule1 = /* @__PURE__ */ function() {
    return {
      category: gencatZS,
      unicodeCat: NUMCAT_ZS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatZP = 67108864;
  var rule162 = /* @__PURE__ */ function() {
    return {
      category: gencatZP,
      unicodeCat: NUMCAT_ZP.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatZL = 33554432;
  var rule161 = /* @__PURE__ */ function() {
    return {
      category: gencatZL,
      unicodeCat: NUMCAT_ZL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSO = 8192;
  var rule13 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule170 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 1,
      updist: 0,
      lowdist: 26,
      titledist: 0
    };
  }();
  var rule171 = /* @__PURE__ */ function() {
    return {
      category: gencatSO,
      unicodeCat: NUMCAT_SO.value,
      possible: 1,
      updist: -26 | 0,
      lowdist: 0,
      titledist: -26 | 0
    };
  }();
  var gencatSM = 64;
  var rule6 = /* @__PURE__ */ function() {
    return {
      category: gencatSM,
      unicodeCat: NUMCAT_SM.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSK = 1024;
  var rule10 = /* @__PURE__ */ function() {
    return {
      category: gencatSK,
      unicodeCat: NUMCAT_SK.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatSC = 8;
  var rule3 = /* @__PURE__ */ function() {
    return {
      category: gencatSC,
      unicodeCat: NUMCAT_SC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPS = 16;
  var rule4 = /* @__PURE__ */ function() {
    return {
      category: gencatPS,
      unicodeCat: NUMCAT_PS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPO = 4;
  var rule2 = /* @__PURE__ */ function() {
    return {
      category: gencatPO,
      unicodeCat: NUMCAT_PO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPI = 32768;
  var rule15 = /* @__PURE__ */ function() {
    return {
      category: gencatPI,
      unicodeCat: NUMCAT_PI.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPF = 262144;
  var rule19 = /* @__PURE__ */ function() {
    return {
      category: gencatPF,
      unicodeCat: NUMCAT_PF.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPE = 32;
  var rule5 = /* @__PURE__ */ function() {
    return {
      category: gencatPE,
      unicodeCat: NUMCAT_PE.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPD = 128;
  var rule7 = /* @__PURE__ */ function() {
    return {
      category: gencatPD,
      unicodeCat: NUMCAT_PD.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatPC = 2048;
  var rule11 = /* @__PURE__ */ function() {
    return {
      category: gencatPC,
      unicodeCat: NUMCAT_PC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatNO = 131072;
  var rule17 = /* @__PURE__ */ function() {
    return {
      category: gencatNO,
      unicodeCat: NUMCAT_NO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatNL = 16777216;
  var rule128 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule168 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 1,
      updist: 0,
      lowdist: 16,
      titledist: 0
    };
  }();
  var rule169 = /* @__PURE__ */ function() {
    return {
      category: gencatNL,
      unicodeCat: NUMCAT_NL.value,
      possible: 1,
      updist: -16 | 0,
      lowdist: 0,
      titledist: -16 | 0
    };
  }();
  var gencatND = 256;
  var rule8 = /* @__PURE__ */ function() {
    return {
      category: gencatND,
      unicodeCat: NUMCAT_ND.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatMN = 2097152;
  var rule92 = /* @__PURE__ */ function() {
    return {
      category: gencatMN,
      unicodeCat: NUMCAT_MN.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule93 = /* @__PURE__ */ function() {
    return {
      category: gencatMN,
      unicodeCat: NUMCAT_MN.value,
      possible: 1,
      updist: 84,
      lowdist: 0,
      titledist: 84
    };
  }();
  var gencatME = 4194304;
  var rule119 = /* @__PURE__ */ function() {
    return {
      category: gencatME,
      unicodeCat: NUMCAT_ME.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatMC = 8388608;
  var rule124 = /* @__PURE__ */ function() {
    return {
      category: gencatMC,
      unicodeCat: NUMCAT_MC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLU = 512;
  var nullrule = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_CN.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule104 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 8,
      titledist: 0
    };
  }();
  var rule107 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule115 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -60 | 0,
      titledist: 0
    };
  }();
  var rule117 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7 | 0,
      titledist: 0
    };
  }();
  var rule118 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 80,
      titledist: 0
    };
  }();
  var rule120 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 15,
      titledist: 0
    };
  }();
  var rule122 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 48,
      titledist: 0
    };
  }();
  var rule125 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 7264,
      titledist: 0
    };
  }();
  var rule127 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 38864,
      titledist: 0
    };
  }();
  var rule137 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -3008 | 0,
      titledist: 0
    };
  }();
  var rule142 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7615 | 0,
      titledist: 0
    };
  }();
  var rule144 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8 | 0,
      titledist: 0
    };
  }();
  var rule153 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -74 | 0,
      titledist: 0
    };
  }();
  var rule156 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -86 | 0,
      titledist: 0
    };
  }();
  var rule157 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -100 | 0,
      titledist: 0
    };
  }();
  var rule158 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -112 | 0,
      titledist: 0
    };
  }();
  var rule159 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -128 | 0,
      titledist: 0
    };
  }();
  var rule160 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -126 | 0,
      titledist: 0
    };
  }();
  var rule163 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -7517 | 0,
      titledist: 0
    };
  }();
  var rule164 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8383 | 0,
      titledist: 0
    };
  }();
  var rule165 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -8262 | 0,
      titledist: 0
    };
  }();
  var rule166 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 28,
      titledist: 0
    };
  }();
  var rule172 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10743 | 0,
      titledist: 0
    };
  }();
  var rule173 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -3814 | 0,
      titledist: 0
    };
  }();
  var rule174 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10727 | 0,
      titledist: 0
    };
  }();
  var rule177 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10780 | 0,
      titledist: 0
    };
  }();
  var rule178 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10749 | 0,
      titledist: 0
    };
  }();
  var rule179 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10783 | 0,
      titledist: 0
    };
  }();
  var rule180 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10782 | 0,
      titledist: 0
    };
  }();
  var rule181 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -10815 | 0,
      titledist: 0
    };
  }();
  var rule183 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -35332 | 0,
      titledist: 0
    };
  }();
  var rule184 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42280 | 0,
      titledist: 0
    };
  }();
  var rule186 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42308 | 0,
      titledist: 0
    };
  }();
  var rule187 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42319 | 0,
      titledist: 0
    };
  }();
  var rule188 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42315 | 0,
      titledist: 0
    };
  }();
  var rule189 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42305 | 0,
      titledist: 0
    };
  }();
  var rule190 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42258 | 0,
      titledist: 0
    };
  }();
  var rule191 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42282 | 0,
      titledist: 0
    };
  }();
  var rule192 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42261 | 0,
      titledist: 0
    };
  }();
  var rule193 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 928,
      titledist: 0
    };
  }();
  var rule194 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -48 | 0,
      titledist: 0
    };
  }();
  var rule195 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -42307 | 0,
      titledist: 0
    };
  }();
  var rule196 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -35384 | 0,
      titledist: 0
    };
  }();
  var rule201 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 40,
      titledist: 0
    };
  }();
  var rule203 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 34,
      titledist: 0
    };
  }();
  var rule22 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 1,
      titledist: 0
    };
  }();
  var rule24 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -199 | 0,
      titledist: 0
    };
  }();
  var rule26 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -121 | 0,
      titledist: 0
    };
  }();
  var rule29 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 210,
      titledist: 0
    };
  }();
  var rule30 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 206,
      titledist: 0
    };
  }();
  var rule31 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 205,
      titledist: 0
    };
  }();
  var rule32 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 79,
      titledist: 0
    };
  }();
  var rule33 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 202,
      titledist: 0
    };
  }();
  var rule34 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 203,
      titledist: 0
    };
  }();
  var rule35 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 207,
      titledist: 0
    };
  }();
  var rule37 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 211,
      titledist: 0
    };
  }();
  var rule38 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 209,
      titledist: 0
    };
  }();
  var rule40 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 213,
      titledist: 0
    };
  }();
  var rule42 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 214,
      titledist: 0
    };
  }();
  var rule43 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 218,
      titledist: 0
    };
  }();
  var rule44 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 217,
      titledist: 0
    };
  }();
  var rule45 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 219,
      titledist: 0
    };
  }();
  var rule47 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 2,
      titledist: 1
    };
  }();
  var rule51 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -97 | 0,
      titledist: 0
    };
  }();
  var rule52 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -56 | 0,
      titledist: 0
    };
  }();
  var rule53 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -130 | 0,
      titledist: 0
    };
  }();
  var rule54 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 10795,
      titledist: 0
    };
  }();
  var rule55 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -163 | 0,
      titledist: 0
    };
  }();
  var rule56 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 10792,
      titledist: 0
    };
  }();
  var rule58 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: -195 | 0,
      titledist: 0
    };
  }();
  var rule59 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 69,
      titledist: 0
    };
  }();
  var rule60 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 71,
      titledist: 0
    };
  }();
  var rule9 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 32,
      titledist: 0
    };
  }();
  var rule94 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 116,
      titledist: 0
    };
  }();
  var rule95 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 38,
      titledist: 0
    };
  }();
  var rule96 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 37,
      titledist: 0
    };
  }();
  var rule97 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 64,
      titledist: 0
    };
  }();
  var rule98 = /* @__PURE__ */ function() {
    return {
      category: gencatLU,
      unicodeCat: NUMCAT_LU.value,
      possible: 1,
      updist: 0,
      lowdist: 63,
      titledist: 0
    };
  }();
  var gencatLT = 524288;
  var rule151 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: 0,
      lowdist: -8 | 0,
      titledist: 0
    };
  }();
  var rule154 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: 0,
      lowdist: -9 | 0,
      titledist: 0
    };
  }();
  var rule48 = /* @__PURE__ */ function() {
    return {
      category: gencatLT,
      unicodeCat: NUMCAT_LT.value,
      possible: 1,
      updist: -1 | 0,
      lowdist: 1,
      titledist: 0
    };
  }();
  var gencatLO = 16384;
  var rule14 = /* @__PURE__ */ function() {
    return {
      category: gencatLO,
      unicodeCat: NUMCAT_LO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLM = 1048576;
  var rule91 = /* @__PURE__ */ function() {
    return {
      category: gencatLM,
      unicodeCat: NUMCAT_LM.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatLL = 4096;
  var rule100 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -37 | 0,
      lowdist: 0,
      titledist: -37 | 0
    };
  }();
  var rule101 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -31 | 0,
      lowdist: 0,
      titledist: -31 | 0
    };
  }();
  var rule102 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -64 | 0,
      lowdist: 0,
      titledist: -64 | 0
    };
  }();
  var rule103 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -63 | 0,
      lowdist: 0,
      titledist: -63 | 0
    };
  }();
  var rule105 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -62 | 0,
      lowdist: 0,
      titledist: -62 | 0
    };
  }();
  var rule106 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -57 | 0,
      lowdist: 0,
      titledist: -57 | 0
    };
  }();
  var rule108 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -47 | 0,
      lowdist: 0,
      titledist: -47 | 0
    };
  }();
  var rule109 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -54 | 0,
      lowdist: 0,
      titledist: -54 | 0
    };
  }();
  var rule110 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -8 | 0,
      lowdist: 0,
      titledist: -8 | 0
    };
  }();
  var rule111 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -86 | 0,
      lowdist: 0,
      titledist: -86 | 0
    };
  }();
  var rule112 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -80 | 0,
      lowdist: 0,
      titledist: -80 | 0
    };
  }();
  var rule113 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 7,
      lowdist: 0,
      titledist: 7
    };
  }();
  var rule114 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -116 | 0,
      lowdist: 0,
      titledist: -116 | 0
    };
  }();
  var rule116 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -96 | 0,
      lowdist: 0,
      titledist: -96 | 0
    };
  }();
  var rule12 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -32 | 0,
      lowdist: 0,
      titledist: -32 | 0
    };
  }();
  var rule121 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -15 | 0,
      lowdist: 0,
      titledist: -15 | 0
    };
  }();
  var rule123 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -48 | 0,
      lowdist: 0,
      titledist: -48 | 0
    };
  }();
  var rule126 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 3008,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule129 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6254 | 0,
      lowdist: 0,
      titledist: -6254 | 0
    };
  }();
  var rule130 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6253 | 0,
      lowdist: 0,
      titledist: -6253 | 0
    };
  }();
  var rule131 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6244 | 0,
      lowdist: 0,
      titledist: -6244 | 0
    };
  }();
  var rule132 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6242 | 0,
      lowdist: 0,
      titledist: -6242 | 0
    };
  }();
  var rule133 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6243 | 0,
      lowdist: 0,
      titledist: -6243 | 0
    };
  }();
  var rule134 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6236 | 0,
      lowdist: 0,
      titledist: -6236 | 0
    };
  }();
  var rule135 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -6181 | 0,
      lowdist: 0,
      titledist: -6181 | 0
    };
  }();
  var rule136 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35266,
      lowdist: 0,
      titledist: 35266
    };
  }();
  var rule138 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35332,
      lowdist: 0,
      titledist: 35332
    };
  }();
  var rule139 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 3814,
      lowdist: 0,
      titledist: 3814
    };
  }();
  var rule140 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 35384,
      lowdist: 0,
      titledist: 35384
    };
  }();
  var rule141 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -59 | 0,
      lowdist: 0,
      titledist: -59 | 0
    };
  }();
  var rule143 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 8,
      lowdist: 0,
      titledist: 8
    };
  }();
  var rule145 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 74,
      lowdist: 0,
      titledist: 74
    };
  }();
  var rule146 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 86,
      lowdist: 0,
      titledist: 86
    };
  }();
  var rule147 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 100,
      lowdist: 0,
      titledist: 100
    };
  }();
  var rule148 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 128,
      lowdist: 0,
      titledist: 128
    };
  }();
  var rule149 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 112,
      lowdist: 0,
      titledist: 112
    };
  }();
  var rule150 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 126,
      lowdist: 0,
      titledist: 126
    };
  }();
  var rule152 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 9,
      lowdist: 0,
      titledist: 9
    };
  }();
  var rule155 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -7205 | 0,
      lowdist: 0,
      titledist: -7205 | 0
    };
  }();
  var rule167 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -28 | 0,
      lowdist: 0,
      titledist: -28 | 0
    };
  }();
  var rule175 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -10795 | 0,
      lowdist: 0,
      titledist: -10795 | 0
    };
  }();
  var rule176 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -10792 | 0,
      lowdist: 0,
      titledist: -10792 | 0
    };
  }();
  var rule18 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 743,
      lowdist: 0,
      titledist: 743
    };
  }();
  var rule182 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -7264 | 0,
      lowdist: 0,
      titledist: -7264 | 0
    };
  }();
  var rule185 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 48,
      lowdist: 0,
      titledist: 48
    };
  }();
  var rule197 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -928 | 0,
      lowdist: 0,
      titledist: -928 | 0
    };
  }();
  var rule198 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -38864 | 0,
      lowdist: 0,
      titledist: -38864 | 0
    };
  }();
  var rule20 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var rule202 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -40 | 0,
      lowdist: 0,
      titledist: -40 | 0
    };
  }();
  var rule204 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -34 | 0,
      lowdist: 0,
      titledist: -34 | 0
    };
  }();
  var rule21 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 121,
      lowdist: 0,
      titledist: 121
    };
  }();
  var rule23 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -1 | 0,
      lowdist: 0,
      titledist: -1 | 0
    };
  }();
  var rule25 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -232 | 0,
      lowdist: 0,
      titledist: -232 | 0
    };
  }();
  var rule27 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -300 | 0,
      lowdist: 0,
      titledist: -300 | 0
    };
  }();
  var rule28 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 195,
      lowdist: 0,
      titledist: 195
    };
  }();
  var rule36 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 97,
      lowdist: 0,
      titledist: 97
    };
  }();
  var rule39 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 163,
      lowdist: 0,
      titledist: 163
    };
  }();
  var rule41 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 130,
      lowdist: 0,
      titledist: 130
    };
  }();
  var rule46 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 56,
      lowdist: 0,
      titledist: 56
    };
  }();
  var rule49 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -2 | 0,
      lowdist: 0,
      titledist: -1 | 0
    };
  }();
  var rule50 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -79 | 0,
      lowdist: 0,
      titledist: -79 | 0
    };
  }();
  var rule57 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10815,
      lowdist: 0,
      titledist: 10815
    };
  }();
  var rule61 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10783,
      lowdist: 0,
      titledist: 10783
    };
  }();
  var rule62 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10780,
      lowdist: 0,
      titledist: 10780
    };
  }();
  var rule63 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10782,
      lowdist: 0,
      titledist: 10782
    };
  }();
  var rule64 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -210 | 0,
      lowdist: 0,
      titledist: -210 | 0
    };
  }();
  var rule65 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -206 | 0,
      lowdist: 0,
      titledist: -206 | 0
    };
  }();
  var rule66 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -205 | 0,
      lowdist: 0,
      titledist: -205 | 0
    };
  }();
  var rule67 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -202 | 0,
      lowdist: 0,
      titledist: -202 | 0
    };
  }();
  var rule68 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -203 | 0,
      lowdist: 0,
      titledist: -203 | 0
    };
  }();
  var rule69 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42319,
      lowdist: 0,
      titledist: 42319
    };
  }();
  var rule70 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42315,
      lowdist: 0,
      titledist: 42315
    };
  }();
  var rule71 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -207 | 0,
      lowdist: 0,
      titledist: -207 | 0
    };
  }();
  var rule72 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42280,
      lowdist: 0,
      titledist: 42280
    };
  }();
  var rule73 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42308,
      lowdist: 0,
      titledist: 42308
    };
  }();
  var rule74 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -209 | 0,
      lowdist: 0,
      titledist: -209 | 0
    };
  }();
  var rule75 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -211 | 0,
      lowdist: 0,
      titledist: -211 | 0
    };
  }();
  var rule76 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10743,
      lowdist: 0,
      titledist: 10743
    };
  }();
  var rule77 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42305,
      lowdist: 0,
      titledist: 42305
    };
  }();
  var rule78 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10749,
      lowdist: 0,
      titledist: 10749
    };
  }();
  var rule79 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -213 | 0,
      lowdist: 0,
      titledist: -213 | 0
    };
  }();
  var rule80 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -214 | 0,
      lowdist: 0,
      titledist: -214 | 0
    };
  }();
  var rule81 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 10727,
      lowdist: 0,
      titledist: 10727
    };
  }();
  var rule82 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -218 | 0,
      lowdist: 0,
      titledist: -218 | 0
    };
  }();
  var rule83 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42307,
      lowdist: 0,
      titledist: 42307
    };
  }();
  var rule84 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42282,
      lowdist: 0,
      titledist: 42282
    };
  }();
  var rule85 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -69 | 0,
      lowdist: 0,
      titledist: -69 | 0
    };
  }();
  var rule86 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -217 | 0,
      lowdist: 0,
      titledist: -217 | 0
    };
  }();
  var rule87 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -71 | 0,
      lowdist: 0,
      titledist: -71 | 0
    };
  }();
  var rule88 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -219 | 0,
      lowdist: 0,
      titledist: -219 | 0
    };
  }();
  var rule89 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42261,
      lowdist: 0,
      titledist: 42261
    };
  }();
  var rule90 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: 42258,
      lowdist: 0,
      titledist: 42258
    };
  }();
  var rule99 = /* @__PURE__ */ function() {
    return {
      category: gencatLL,
      unicodeCat: NUMCAT_LL.value,
      possible: 1,
      updist: -38 | 0,
      lowdist: 0,
      titledist: -38 | 0
    };
  }();
  var gencatCS = 134217728;
  var rule199 = /* @__PURE__ */ function() {
    return {
      category: gencatCS,
      unicodeCat: NUMCAT_CS.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCO = 268435456;
  var rule200 = /* @__PURE__ */ function() {
    return {
      category: gencatCO,
      unicodeCat: NUMCAT_CO.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCF = 65536;
  var rule16 = /* @__PURE__ */ function() {
    return {
      category: gencatCF,
      unicodeCat: NUMCAT_CF.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var gencatCC = 1;
  var rule0 = /* @__PURE__ */ function() {
    return {
      category: gencatCC,
      unicodeCat: NUMCAT_CC.value,
      possible: 0,
      updist: 0,
      lowdist: 0,
      titledist: 0
    };
  }();
  var bsearch = function(a2) {
    return function(array) {
      return function(size5) {
        return function(compare3) {
          var go2 = function($copy_i) {
            return function($copy_k) {
              var $tco_var_i = $copy_i;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(i2, k) {
                if (i2 > k || i2 >= length3(array)) {
                  $tco_done = true;
                  return Nothing.value;
                }
                ;
                if (otherwise) {
                  var j = floor2(toNumber(i2 + k | 0) / 2);
                  var b2 = unsafeIndex2(array)(j);
                  var v = compare3(a2)(b2);
                  if (v instanceof EQ) {
                    $tco_done = true;
                    return new Just(b2);
                  }
                  ;
                  if (v instanceof GT) {
                    $tco_var_i = j + 1 | 0;
                    $copy_k = k;
                    return;
                  }
                  ;
                  $tco_var_i = i2;
                  $copy_k = j - 1 | 0;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5622, column 3 - line 5632, column 30): " + [i2.constructor.name, k.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_i, $copy_k);
              }
              ;
              return $tco_result;
            };
          };
          return go2(0)(size5);
        };
      };
    };
  };
  var blkCmp = function(v) {
    return function(v1) {
      if (v.start >= v1.start && v.start < (v1.start + v1.length | 0)) {
        return EQ.value;
      }
      ;
      if (v.start > v1.start) {
        return GT.value;
      }
      ;
      if (otherwise) {
        return LT.value;
      }
      ;
      throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5598, column 1 - line 5598, column 45): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var getRule = function(blocks) {
    return function(unichar) {
      return function(size5) {
        var key = {
          start: unichar,
          length: 1,
          convRule: nullrule
        };
        var maybeCharBlock = bsearch(key)(blocks)(size5)(blkCmp);
        if (maybeCharBlock instanceof Nothing) {
          return Nothing.value;
        }
        ;
        if (maybeCharBlock instanceof Just) {
          return new Just(maybeCharBlock.value0.convRule);
        }
        ;
        throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5612, column 5 - line 5614, column 60): " + [maybeCharBlock.constructor.name]);
      };
    };
  };
  var allchars = [{
    start: 0,
    length: 32,
    convRule: rule0
  }, {
    start: 32,
    length: 1,
    convRule: rule1
  }, {
    start: 33,
    length: 3,
    convRule: rule2
  }, {
    start: 36,
    length: 1,
    convRule: rule3
  }, {
    start: 37,
    length: 3,
    convRule: rule2
  }, {
    start: 40,
    length: 1,
    convRule: rule4
  }, {
    start: 41,
    length: 1,
    convRule: rule5
  }, {
    start: 42,
    length: 1,
    convRule: rule2
  }, {
    start: 43,
    length: 1,
    convRule: rule6
  }, {
    start: 44,
    length: 1,
    convRule: rule2
  }, {
    start: 45,
    length: 1,
    convRule: rule7
  }, {
    start: 46,
    length: 2,
    convRule: rule2
  }, {
    start: 48,
    length: 10,
    convRule: rule8
  }, {
    start: 58,
    length: 2,
    convRule: rule2
  }, {
    start: 60,
    length: 3,
    convRule: rule6
  }, {
    start: 63,
    length: 2,
    convRule: rule2
  }, {
    start: 65,
    length: 26,
    convRule: rule9
  }, {
    start: 91,
    length: 1,
    convRule: rule4
  }, {
    start: 92,
    length: 1,
    convRule: rule2
  }, {
    start: 93,
    length: 1,
    convRule: rule5
  }, {
    start: 94,
    length: 1,
    convRule: rule10
  }, {
    start: 95,
    length: 1,
    convRule: rule11
  }, {
    start: 96,
    length: 1,
    convRule: rule10
  }, {
    start: 97,
    length: 26,
    convRule: rule12
  }, {
    start: 123,
    length: 1,
    convRule: rule4
  }, {
    start: 124,
    length: 1,
    convRule: rule6
  }, {
    start: 125,
    length: 1,
    convRule: rule5
  }, {
    start: 126,
    length: 1,
    convRule: rule6
  }, {
    start: 127,
    length: 33,
    convRule: rule0
  }, {
    start: 160,
    length: 1,
    convRule: rule1
  }, {
    start: 161,
    length: 1,
    convRule: rule2
  }, {
    start: 162,
    length: 4,
    convRule: rule3
  }, {
    start: 166,
    length: 1,
    convRule: rule13
  }, {
    start: 167,
    length: 1,
    convRule: rule2
  }, {
    start: 168,
    length: 1,
    convRule: rule10
  }, {
    start: 169,
    length: 1,
    convRule: rule13
  }, {
    start: 170,
    length: 1,
    convRule: rule14
  }, {
    start: 171,
    length: 1,
    convRule: rule15
  }, {
    start: 172,
    length: 1,
    convRule: rule6
  }, {
    start: 173,
    length: 1,
    convRule: rule16
  }, {
    start: 174,
    length: 1,
    convRule: rule13
  }, {
    start: 175,
    length: 1,
    convRule: rule10
  }, {
    start: 176,
    length: 1,
    convRule: rule13
  }, {
    start: 177,
    length: 1,
    convRule: rule6
  }, {
    start: 178,
    length: 2,
    convRule: rule17
  }, {
    start: 180,
    length: 1,
    convRule: rule10
  }, {
    start: 181,
    length: 1,
    convRule: rule18
  }, {
    start: 182,
    length: 2,
    convRule: rule2
  }, {
    start: 184,
    length: 1,
    convRule: rule10
  }, {
    start: 185,
    length: 1,
    convRule: rule17
  }, {
    start: 186,
    length: 1,
    convRule: rule14
  }, {
    start: 187,
    length: 1,
    convRule: rule19
  }, {
    start: 188,
    length: 3,
    convRule: rule17
  }, {
    start: 191,
    length: 1,
    convRule: rule2
  }, {
    start: 192,
    length: 23,
    convRule: rule9
  }, {
    start: 215,
    length: 1,
    convRule: rule6
  }, {
    start: 216,
    length: 7,
    convRule: rule9
  }, {
    start: 223,
    length: 1,
    convRule: rule20
  }, {
    start: 224,
    length: 23,
    convRule: rule12
  }, {
    start: 247,
    length: 1,
    convRule: rule6
  }, {
    start: 248,
    length: 7,
    convRule: rule12
  }, {
    start: 255,
    length: 1,
    convRule: rule21
  }, {
    start: 256,
    length: 1,
    convRule: rule22
  }, {
    start: 257,
    length: 1,
    convRule: rule23
  }, {
    start: 258,
    length: 1,
    convRule: rule22
  }, {
    start: 259,
    length: 1,
    convRule: rule23
  }, {
    start: 260,
    length: 1,
    convRule: rule22
  }, {
    start: 261,
    length: 1,
    convRule: rule23
  }, {
    start: 262,
    length: 1,
    convRule: rule22
  }, {
    start: 263,
    length: 1,
    convRule: rule23
  }, {
    start: 264,
    length: 1,
    convRule: rule22
  }, {
    start: 265,
    length: 1,
    convRule: rule23
  }, {
    start: 266,
    length: 1,
    convRule: rule22
  }, {
    start: 267,
    length: 1,
    convRule: rule23
  }, {
    start: 268,
    length: 1,
    convRule: rule22
  }, {
    start: 269,
    length: 1,
    convRule: rule23
  }, {
    start: 270,
    length: 1,
    convRule: rule22
  }, {
    start: 271,
    length: 1,
    convRule: rule23
  }, {
    start: 272,
    length: 1,
    convRule: rule22
  }, {
    start: 273,
    length: 1,
    convRule: rule23
  }, {
    start: 274,
    length: 1,
    convRule: rule22
  }, {
    start: 275,
    length: 1,
    convRule: rule23
  }, {
    start: 276,
    length: 1,
    convRule: rule22
  }, {
    start: 277,
    length: 1,
    convRule: rule23
  }, {
    start: 278,
    length: 1,
    convRule: rule22
  }, {
    start: 279,
    length: 1,
    convRule: rule23
  }, {
    start: 280,
    length: 1,
    convRule: rule22
  }, {
    start: 281,
    length: 1,
    convRule: rule23
  }, {
    start: 282,
    length: 1,
    convRule: rule22
  }, {
    start: 283,
    length: 1,
    convRule: rule23
  }, {
    start: 284,
    length: 1,
    convRule: rule22
  }, {
    start: 285,
    length: 1,
    convRule: rule23
  }, {
    start: 286,
    length: 1,
    convRule: rule22
  }, {
    start: 287,
    length: 1,
    convRule: rule23
  }, {
    start: 288,
    length: 1,
    convRule: rule22
  }, {
    start: 289,
    length: 1,
    convRule: rule23
  }, {
    start: 290,
    length: 1,
    convRule: rule22
  }, {
    start: 291,
    length: 1,
    convRule: rule23
  }, {
    start: 292,
    length: 1,
    convRule: rule22
  }, {
    start: 293,
    length: 1,
    convRule: rule23
  }, {
    start: 294,
    length: 1,
    convRule: rule22
  }, {
    start: 295,
    length: 1,
    convRule: rule23
  }, {
    start: 296,
    length: 1,
    convRule: rule22
  }, {
    start: 297,
    length: 1,
    convRule: rule23
  }, {
    start: 298,
    length: 1,
    convRule: rule22
  }, {
    start: 299,
    length: 1,
    convRule: rule23
  }, {
    start: 300,
    length: 1,
    convRule: rule22
  }, {
    start: 301,
    length: 1,
    convRule: rule23
  }, {
    start: 302,
    length: 1,
    convRule: rule22
  }, {
    start: 303,
    length: 1,
    convRule: rule23
  }, {
    start: 304,
    length: 1,
    convRule: rule24
  }, {
    start: 305,
    length: 1,
    convRule: rule25
  }, {
    start: 306,
    length: 1,
    convRule: rule22
  }, {
    start: 307,
    length: 1,
    convRule: rule23
  }, {
    start: 308,
    length: 1,
    convRule: rule22
  }, {
    start: 309,
    length: 1,
    convRule: rule23
  }, {
    start: 310,
    length: 1,
    convRule: rule22
  }, {
    start: 311,
    length: 1,
    convRule: rule23
  }, {
    start: 312,
    length: 1,
    convRule: rule20
  }, {
    start: 313,
    length: 1,
    convRule: rule22
  }, {
    start: 314,
    length: 1,
    convRule: rule23
  }, {
    start: 315,
    length: 1,
    convRule: rule22
  }, {
    start: 316,
    length: 1,
    convRule: rule23
  }, {
    start: 317,
    length: 1,
    convRule: rule22
  }, {
    start: 318,
    length: 1,
    convRule: rule23
  }, {
    start: 319,
    length: 1,
    convRule: rule22
  }, {
    start: 320,
    length: 1,
    convRule: rule23
  }, {
    start: 321,
    length: 1,
    convRule: rule22
  }, {
    start: 322,
    length: 1,
    convRule: rule23
  }, {
    start: 323,
    length: 1,
    convRule: rule22
  }, {
    start: 324,
    length: 1,
    convRule: rule23
  }, {
    start: 325,
    length: 1,
    convRule: rule22
  }, {
    start: 326,
    length: 1,
    convRule: rule23
  }, {
    start: 327,
    length: 1,
    convRule: rule22
  }, {
    start: 328,
    length: 1,
    convRule: rule23
  }, {
    start: 329,
    length: 1,
    convRule: rule20
  }, {
    start: 330,
    length: 1,
    convRule: rule22
  }, {
    start: 331,
    length: 1,
    convRule: rule23
  }, {
    start: 332,
    length: 1,
    convRule: rule22
  }, {
    start: 333,
    length: 1,
    convRule: rule23
  }, {
    start: 334,
    length: 1,
    convRule: rule22
  }, {
    start: 335,
    length: 1,
    convRule: rule23
  }, {
    start: 336,
    length: 1,
    convRule: rule22
  }, {
    start: 337,
    length: 1,
    convRule: rule23
  }, {
    start: 338,
    length: 1,
    convRule: rule22
  }, {
    start: 339,
    length: 1,
    convRule: rule23
  }, {
    start: 340,
    length: 1,
    convRule: rule22
  }, {
    start: 341,
    length: 1,
    convRule: rule23
  }, {
    start: 342,
    length: 1,
    convRule: rule22
  }, {
    start: 343,
    length: 1,
    convRule: rule23
  }, {
    start: 344,
    length: 1,
    convRule: rule22
  }, {
    start: 345,
    length: 1,
    convRule: rule23
  }, {
    start: 346,
    length: 1,
    convRule: rule22
  }, {
    start: 347,
    length: 1,
    convRule: rule23
  }, {
    start: 348,
    length: 1,
    convRule: rule22
  }, {
    start: 349,
    length: 1,
    convRule: rule23
  }, {
    start: 350,
    length: 1,
    convRule: rule22
  }, {
    start: 351,
    length: 1,
    convRule: rule23
  }, {
    start: 352,
    length: 1,
    convRule: rule22
  }, {
    start: 353,
    length: 1,
    convRule: rule23
  }, {
    start: 354,
    length: 1,
    convRule: rule22
  }, {
    start: 355,
    length: 1,
    convRule: rule23
  }, {
    start: 356,
    length: 1,
    convRule: rule22
  }, {
    start: 357,
    length: 1,
    convRule: rule23
  }, {
    start: 358,
    length: 1,
    convRule: rule22
  }, {
    start: 359,
    length: 1,
    convRule: rule23
  }, {
    start: 360,
    length: 1,
    convRule: rule22
  }, {
    start: 361,
    length: 1,
    convRule: rule23
  }, {
    start: 362,
    length: 1,
    convRule: rule22
  }, {
    start: 363,
    length: 1,
    convRule: rule23
  }, {
    start: 364,
    length: 1,
    convRule: rule22
  }, {
    start: 365,
    length: 1,
    convRule: rule23
  }, {
    start: 366,
    length: 1,
    convRule: rule22
  }, {
    start: 367,
    length: 1,
    convRule: rule23
  }, {
    start: 368,
    length: 1,
    convRule: rule22
  }, {
    start: 369,
    length: 1,
    convRule: rule23
  }, {
    start: 370,
    length: 1,
    convRule: rule22
  }, {
    start: 371,
    length: 1,
    convRule: rule23
  }, {
    start: 372,
    length: 1,
    convRule: rule22
  }, {
    start: 373,
    length: 1,
    convRule: rule23
  }, {
    start: 374,
    length: 1,
    convRule: rule22
  }, {
    start: 375,
    length: 1,
    convRule: rule23
  }, {
    start: 376,
    length: 1,
    convRule: rule26
  }, {
    start: 377,
    length: 1,
    convRule: rule22
  }, {
    start: 378,
    length: 1,
    convRule: rule23
  }, {
    start: 379,
    length: 1,
    convRule: rule22
  }, {
    start: 380,
    length: 1,
    convRule: rule23
  }, {
    start: 381,
    length: 1,
    convRule: rule22
  }, {
    start: 382,
    length: 1,
    convRule: rule23
  }, {
    start: 383,
    length: 1,
    convRule: rule27
  }, {
    start: 384,
    length: 1,
    convRule: rule28
  }, {
    start: 385,
    length: 1,
    convRule: rule29
  }, {
    start: 386,
    length: 1,
    convRule: rule22
  }, {
    start: 387,
    length: 1,
    convRule: rule23
  }, {
    start: 388,
    length: 1,
    convRule: rule22
  }, {
    start: 389,
    length: 1,
    convRule: rule23
  }, {
    start: 390,
    length: 1,
    convRule: rule30
  }, {
    start: 391,
    length: 1,
    convRule: rule22
  }, {
    start: 392,
    length: 1,
    convRule: rule23
  }, {
    start: 393,
    length: 2,
    convRule: rule31
  }, {
    start: 395,
    length: 1,
    convRule: rule22
  }, {
    start: 396,
    length: 1,
    convRule: rule23
  }, {
    start: 397,
    length: 1,
    convRule: rule20
  }, {
    start: 398,
    length: 1,
    convRule: rule32
  }, {
    start: 399,
    length: 1,
    convRule: rule33
  }, {
    start: 400,
    length: 1,
    convRule: rule34
  }, {
    start: 401,
    length: 1,
    convRule: rule22
  }, {
    start: 402,
    length: 1,
    convRule: rule23
  }, {
    start: 403,
    length: 1,
    convRule: rule31
  }, {
    start: 404,
    length: 1,
    convRule: rule35
  }, {
    start: 405,
    length: 1,
    convRule: rule36
  }, {
    start: 406,
    length: 1,
    convRule: rule37
  }, {
    start: 407,
    length: 1,
    convRule: rule38
  }, {
    start: 408,
    length: 1,
    convRule: rule22
  }, {
    start: 409,
    length: 1,
    convRule: rule23
  }, {
    start: 410,
    length: 1,
    convRule: rule39
  }, {
    start: 411,
    length: 1,
    convRule: rule20
  }, {
    start: 412,
    length: 1,
    convRule: rule37
  }, {
    start: 413,
    length: 1,
    convRule: rule40
  }, {
    start: 414,
    length: 1,
    convRule: rule41
  }, {
    start: 415,
    length: 1,
    convRule: rule42
  }, {
    start: 416,
    length: 1,
    convRule: rule22
  }, {
    start: 417,
    length: 1,
    convRule: rule23
  }, {
    start: 418,
    length: 1,
    convRule: rule22
  }, {
    start: 419,
    length: 1,
    convRule: rule23
  }, {
    start: 420,
    length: 1,
    convRule: rule22
  }, {
    start: 421,
    length: 1,
    convRule: rule23
  }, {
    start: 422,
    length: 1,
    convRule: rule43
  }, {
    start: 423,
    length: 1,
    convRule: rule22
  }, {
    start: 424,
    length: 1,
    convRule: rule23
  }, {
    start: 425,
    length: 1,
    convRule: rule43
  }, {
    start: 426,
    length: 2,
    convRule: rule20
  }, {
    start: 428,
    length: 1,
    convRule: rule22
  }, {
    start: 429,
    length: 1,
    convRule: rule23
  }, {
    start: 430,
    length: 1,
    convRule: rule43
  }, {
    start: 431,
    length: 1,
    convRule: rule22
  }, {
    start: 432,
    length: 1,
    convRule: rule23
  }, {
    start: 433,
    length: 2,
    convRule: rule44
  }, {
    start: 435,
    length: 1,
    convRule: rule22
  }, {
    start: 436,
    length: 1,
    convRule: rule23
  }, {
    start: 437,
    length: 1,
    convRule: rule22
  }, {
    start: 438,
    length: 1,
    convRule: rule23
  }, {
    start: 439,
    length: 1,
    convRule: rule45
  }, {
    start: 440,
    length: 1,
    convRule: rule22
  }, {
    start: 441,
    length: 1,
    convRule: rule23
  }, {
    start: 442,
    length: 1,
    convRule: rule20
  }, {
    start: 443,
    length: 1,
    convRule: rule14
  }, {
    start: 444,
    length: 1,
    convRule: rule22
  }, {
    start: 445,
    length: 1,
    convRule: rule23
  }, {
    start: 446,
    length: 1,
    convRule: rule20
  }, {
    start: 447,
    length: 1,
    convRule: rule46
  }, {
    start: 448,
    length: 4,
    convRule: rule14
  }, {
    start: 452,
    length: 1,
    convRule: rule47
  }, {
    start: 453,
    length: 1,
    convRule: rule48
  }, {
    start: 454,
    length: 1,
    convRule: rule49
  }, {
    start: 455,
    length: 1,
    convRule: rule47
  }, {
    start: 456,
    length: 1,
    convRule: rule48
  }, {
    start: 457,
    length: 1,
    convRule: rule49
  }, {
    start: 458,
    length: 1,
    convRule: rule47
  }, {
    start: 459,
    length: 1,
    convRule: rule48
  }, {
    start: 460,
    length: 1,
    convRule: rule49
  }, {
    start: 461,
    length: 1,
    convRule: rule22
  }, {
    start: 462,
    length: 1,
    convRule: rule23
  }, {
    start: 463,
    length: 1,
    convRule: rule22
  }, {
    start: 464,
    length: 1,
    convRule: rule23
  }, {
    start: 465,
    length: 1,
    convRule: rule22
  }, {
    start: 466,
    length: 1,
    convRule: rule23
  }, {
    start: 467,
    length: 1,
    convRule: rule22
  }, {
    start: 468,
    length: 1,
    convRule: rule23
  }, {
    start: 469,
    length: 1,
    convRule: rule22
  }, {
    start: 470,
    length: 1,
    convRule: rule23
  }, {
    start: 471,
    length: 1,
    convRule: rule22
  }, {
    start: 472,
    length: 1,
    convRule: rule23
  }, {
    start: 473,
    length: 1,
    convRule: rule22
  }, {
    start: 474,
    length: 1,
    convRule: rule23
  }, {
    start: 475,
    length: 1,
    convRule: rule22
  }, {
    start: 476,
    length: 1,
    convRule: rule23
  }, {
    start: 477,
    length: 1,
    convRule: rule50
  }, {
    start: 478,
    length: 1,
    convRule: rule22
  }, {
    start: 479,
    length: 1,
    convRule: rule23
  }, {
    start: 480,
    length: 1,
    convRule: rule22
  }, {
    start: 481,
    length: 1,
    convRule: rule23
  }, {
    start: 482,
    length: 1,
    convRule: rule22
  }, {
    start: 483,
    length: 1,
    convRule: rule23
  }, {
    start: 484,
    length: 1,
    convRule: rule22
  }, {
    start: 485,
    length: 1,
    convRule: rule23
  }, {
    start: 486,
    length: 1,
    convRule: rule22
  }, {
    start: 487,
    length: 1,
    convRule: rule23
  }, {
    start: 488,
    length: 1,
    convRule: rule22
  }, {
    start: 489,
    length: 1,
    convRule: rule23
  }, {
    start: 490,
    length: 1,
    convRule: rule22
  }, {
    start: 491,
    length: 1,
    convRule: rule23
  }, {
    start: 492,
    length: 1,
    convRule: rule22
  }, {
    start: 493,
    length: 1,
    convRule: rule23
  }, {
    start: 494,
    length: 1,
    convRule: rule22
  }, {
    start: 495,
    length: 1,
    convRule: rule23
  }, {
    start: 496,
    length: 1,
    convRule: rule20
  }, {
    start: 497,
    length: 1,
    convRule: rule47
  }, {
    start: 498,
    length: 1,
    convRule: rule48
  }, {
    start: 499,
    length: 1,
    convRule: rule49
  }, {
    start: 500,
    length: 1,
    convRule: rule22
  }, {
    start: 501,
    length: 1,
    convRule: rule23
  }, {
    start: 502,
    length: 1,
    convRule: rule51
  }, {
    start: 503,
    length: 1,
    convRule: rule52
  }, {
    start: 504,
    length: 1,
    convRule: rule22
  }, {
    start: 505,
    length: 1,
    convRule: rule23
  }, {
    start: 506,
    length: 1,
    convRule: rule22
  }, {
    start: 507,
    length: 1,
    convRule: rule23
  }, {
    start: 508,
    length: 1,
    convRule: rule22
  }, {
    start: 509,
    length: 1,
    convRule: rule23
  }, {
    start: 510,
    length: 1,
    convRule: rule22
  }, {
    start: 511,
    length: 1,
    convRule: rule23
  }, {
    start: 512,
    length: 1,
    convRule: rule22
  }, {
    start: 513,
    length: 1,
    convRule: rule23
  }, {
    start: 514,
    length: 1,
    convRule: rule22
  }, {
    start: 515,
    length: 1,
    convRule: rule23
  }, {
    start: 516,
    length: 1,
    convRule: rule22
  }, {
    start: 517,
    length: 1,
    convRule: rule23
  }, {
    start: 518,
    length: 1,
    convRule: rule22
  }, {
    start: 519,
    length: 1,
    convRule: rule23
  }, {
    start: 520,
    length: 1,
    convRule: rule22
  }, {
    start: 521,
    length: 1,
    convRule: rule23
  }, {
    start: 522,
    length: 1,
    convRule: rule22
  }, {
    start: 523,
    length: 1,
    convRule: rule23
  }, {
    start: 524,
    length: 1,
    convRule: rule22
  }, {
    start: 525,
    length: 1,
    convRule: rule23
  }, {
    start: 526,
    length: 1,
    convRule: rule22
  }, {
    start: 527,
    length: 1,
    convRule: rule23
  }, {
    start: 528,
    length: 1,
    convRule: rule22
  }, {
    start: 529,
    length: 1,
    convRule: rule23
  }, {
    start: 530,
    length: 1,
    convRule: rule22
  }, {
    start: 531,
    length: 1,
    convRule: rule23
  }, {
    start: 532,
    length: 1,
    convRule: rule22
  }, {
    start: 533,
    length: 1,
    convRule: rule23
  }, {
    start: 534,
    length: 1,
    convRule: rule22
  }, {
    start: 535,
    length: 1,
    convRule: rule23
  }, {
    start: 536,
    length: 1,
    convRule: rule22
  }, {
    start: 537,
    length: 1,
    convRule: rule23
  }, {
    start: 538,
    length: 1,
    convRule: rule22
  }, {
    start: 539,
    length: 1,
    convRule: rule23
  }, {
    start: 540,
    length: 1,
    convRule: rule22
  }, {
    start: 541,
    length: 1,
    convRule: rule23
  }, {
    start: 542,
    length: 1,
    convRule: rule22
  }, {
    start: 543,
    length: 1,
    convRule: rule23
  }, {
    start: 544,
    length: 1,
    convRule: rule53
  }, {
    start: 545,
    length: 1,
    convRule: rule20
  }, {
    start: 546,
    length: 1,
    convRule: rule22
  }, {
    start: 547,
    length: 1,
    convRule: rule23
  }, {
    start: 548,
    length: 1,
    convRule: rule22
  }, {
    start: 549,
    length: 1,
    convRule: rule23
  }, {
    start: 550,
    length: 1,
    convRule: rule22
  }, {
    start: 551,
    length: 1,
    convRule: rule23
  }, {
    start: 552,
    length: 1,
    convRule: rule22
  }, {
    start: 553,
    length: 1,
    convRule: rule23
  }, {
    start: 554,
    length: 1,
    convRule: rule22
  }, {
    start: 555,
    length: 1,
    convRule: rule23
  }, {
    start: 556,
    length: 1,
    convRule: rule22
  }, {
    start: 557,
    length: 1,
    convRule: rule23
  }, {
    start: 558,
    length: 1,
    convRule: rule22
  }, {
    start: 559,
    length: 1,
    convRule: rule23
  }, {
    start: 560,
    length: 1,
    convRule: rule22
  }, {
    start: 561,
    length: 1,
    convRule: rule23
  }, {
    start: 562,
    length: 1,
    convRule: rule22
  }, {
    start: 563,
    length: 1,
    convRule: rule23
  }, {
    start: 564,
    length: 6,
    convRule: rule20
  }, {
    start: 570,
    length: 1,
    convRule: rule54
  }, {
    start: 571,
    length: 1,
    convRule: rule22
  }, {
    start: 572,
    length: 1,
    convRule: rule23
  }, {
    start: 573,
    length: 1,
    convRule: rule55
  }, {
    start: 574,
    length: 1,
    convRule: rule56
  }, {
    start: 575,
    length: 2,
    convRule: rule57
  }, {
    start: 577,
    length: 1,
    convRule: rule22
  }, {
    start: 578,
    length: 1,
    convRule: rule23
  }, {
    start: 579,
    length: 1,
    convRule: rule58
  }, {
    start: 580,
    length: 1,
    convRule: rule59
  }, {
    start: 581,
    length: 1,
    convRule: rule60
  }, {
    start: 582,
    length: 1,
    convRule: rule22
  }, {
    start: 583,
    length: 1,
    convRule: rule23
  }, {
    start: 584,
    length: 1,
    convRule: rule22
  }, {
    start: 585,
    length: 1,
    convRule: rule23
  }, {
    start: 586,
    length: 1,
    convRule: rule22
  }, {
    start: 587,
    length: 1,
    convRule: rule23
  }, {
    start: 588,
    length: 1,
    convRule: rule22
  }, {
    start: 589,
    length: 1,
    convRule: rule23
  }, {
    start: 590,
    length: 1,
    convRule: rule22
  }, {
    start: 591,
    length: 1,
    convRule: rule23
  }, {
    start: 592,
    length: 1,
    convRule: rule61
  }, {
    start: 593,
    length: 1,
    convRule: rule62
  }, {
    start: 594,
    length: 1,
    convRule: rule63
  }, {
    start: 595,
    length: 1,
    convRule: rule64
  }, {
    start: 596,
    length: 1,
    convRule: rule65
  }, {
    start: 597,
    length: 1,
    convRule: rule20
  }, {
    start: 598,
    length: 2,
    convRule: rule66
  }, {
    start: 600,
    length: 1,
    convRule: rule20
  }, {
    start: 601,
    length: 1,
    convRule: rule67
  }, {
    start: 602,
    length: 1,
    convRule: rule20
  }, {
    start: 603,
    length: 1,
    convRule: rule68
  }, {
    start: 604,
    length: 1,
    convRule: rule69
  }, {
    start: 605,
    length: 3,
    convRule: rule20
  }, {
    start: 608,
    length: 1,
    convRule: rule66
  }, {
    start: 609,
    length: 1,
    convRule: rule70
  }, {
    start: 610,
    length: 1,
    convRule: rule20
  }, {
    start: 611,
    length: 1,
    convRule: rule71
  }, {
    start: 612,
    length: 1,
    convRule: rule20
  }, {
    start: 613,
    length: 1,
    convRule: rule72
  }, {
    start: 614,
    length: 1,
    convRule: rule73
  }, {
    start: 615,
    length: 1,
    convRule: rule20
  }, {
    start: 616,
    length: 1,
    convRule: rule74
  }, {
    start: 617,
    length: 1,
    convRule: rule75
  }, {
    start: 618,
    length: 1,
    convRule: rule73
  }, {
    start: 619,
    length: 1,
    convRule: rule76
  }, {
    start: 620,
    length: 1,
    convRule: rule77
  }, {
    start: 621,
    length: 2,
    convRule: rule20
  }, {
    start: 623,
    length: 1,
    convRule: rule75
  }, {
    start: 624,
    length: 1,
    convRule: rule20
  }, {
    start: 625,
    length: 1,
    convRule: rule78
  }, {
    start: 626,
    length: 1,
    convRule: rule79
  }, {
    start: 627,
    length: 2,
    convRule: rule20
  }, {
    start: 629,
    length: 1,
    convRule: rule80
  }, {
    start: 630,
    length: 7,
    convRule: rule20
  }, {
    start: 637,
    length: 1,
    convRule: rule81
  }, {
    start: 638,
    length: 2,
    convRule: rule20
  }, {
    start: 640,
    length: 1,
    convRule: rule82
  }, {
    start: 641,
    length: 1,
    convRule: rule20
  }, {
    start: 642,
    length: 1,
    convRule: rule83
  }, {
    start: 643,
    length: 1,
    convRule: rule82
  }, {
    start: 644,
    length: 3,
    convRule: rule20
  }, {
    start: 647,
    length: 1,
    convRule: rule84
  }, {
    start: 648,
    length: 1,
    convRule: rule82
  }, {
    start: 649,
    length: 1,
    convRule: rule85
  }, {
    start: 650,
    length: 2,
    convRule: rule86
  }, {
    start: 652,
    length: 1,
    convRule: rule87
  }, {
    start: 653,
    length: 5,
    convRule: rule20
  }, {
    start: 658,
    length: 1,
    convRule: rule88
  }, {
    start: 659,
    length: 1,
    convRule: rule20
  }, {
    start: 660,
    length: 1,
    convRule: rule14
  }, {
    start: 661,
    length: 8,
    convRule: rule20
  }, {
    start: 669,
    length: 1,
    convRule: rule89
  }, {
    start: 670,
    length: 1,
    convRule: rule90
  }, {
    start: 671,
    length: 17,
    convRule: rule20
  }, {
    start: 688,
    length: 18,
    convRule: rule91
  }, {
    start: 706,
    length: 4,
    convRule: rule10
  }, {
    start: 710,
    length: 12,
    convRule: rule91
  }, {
    start: 722,
    length: 14,
    convRule: rule10
  }, {
    start: 736,
    length: 5,
    convRule: rule91
  }, {
    start: 741,
    length: 7,
    convRule: rule10
  }, {
    start: 748,
    length: 1,
    convRule: rule91
  }, {
    start: 749,
    length: 1,
    convRule: rule10
  }, {
    start: 750,
    length: 1,
    convRule: rule91
  }, {
    start: 751,
    length: 17,
    convRule: rule10
  }, {
    start: 768,
    length: 69,
    convRule: rule92
  }, {
    start: 837,
    length: 1,
    convRule: rule93
  }, {
    start: 838,
    length: 42,
    convRule: rule92
  }, {
    start: 880,
    length: 1,
    convRule: rule22
  }, {
    start: 881,
    length: 1,
    convRule: rule23
  }, {
    start: 882,
    length: 1,
    convRule: rule22
  }, {
    start: 883,
    length: 1,
    convRule: rule23
  }, {
    start: 884,
    length: 1,
    convRule: rule91
  }, {
    start: 885,
    length: 1,
    convRule: rule10
  }, {
    start: 886,
    length: 1,
    convRule: rule22
  }, {
    start: 887,
    length: 1,
    convRule: rule23
  }, {
    start: 890,
    length: 1,
    convRule: rule91
  }, {
    start: 891,
    length: 3,
    convRule: rule41
  }, {
    start: 894,
    length: 1,
    convRule: rule2
  }, {
    start: 895,
    length: 1,
    convRule: rule94
  }, {
    start: 900,
    length: 2,
    convRule: rule10
  }, {
    start: 902,
    length: 1,
    convRule: rule95
  }, {
    start: 903,
    length: 1,
    convRule: rule2
  }, {
    start: 904,
    length: 3,
    convRule: rule96
  }, {
    start: 908,
    length: 1,
    convRule: rule97
  }, {
    start: 910,
    length: 2,
    convRule: rule98
  }, {
    start: 912,
    length: 1,
    convRule: rule20
  }, {
    start: 913,
    length: 17,
    convRule: rule9
  }, {
    start: 931,
    length: 9,
    convRule: rule9
  }, {
    start: 940,
    length: 1,
    convRule: rule99
  }, {
    start: 941,
    length: 3,
    convRule: rule100
  }, {
    start: 944,
    length: 1,
    convRule: rule20
  }, {
    start: 945,
    length: 17,
    convRule: rule12
  }, {
    start: 962,
    length: 1,
    convRule: rule101
  }, {
    start: 963,
    length: 9,
    convRule: rule12
  }, {
    start: 972,
    length: 1,
    convRule: rule102
  }, {
    start: 973,
    length: 2,
    convRule: rule103
  }, {
    start: 975,
    length: 1,
    convRule: rule104
  }, {
    start: 976,
    length: 1,
    convRule: rule105
  }, {
    start: 977,
    length: 1,
    convRule: rule106
  }, {
    start: 978,
    length: 3,
    convRule: rule107
  }, {
    start: 981,
    length: 1,
    convRule: rule108
  }, {
    start: 982,
    length: 1,
    convRule: rule109
  }, {
    start: 983,
    length: 1,
    convRule: rule110
  }, {
    start: 984,
    length: 1,
    convRule: rule22
  }, {
    start: 985,
    length: 1,
    convRule: rule23
  }, {
    start: 986,
    length: 1,
    convRule: rule22
  }, {
    start: 987,
    length: 1,
    convRule: rule23
  }, {
    start: 988,
    length: 1,
    convRule: rule22
  }, {
    start: 989,
    length: 1,
    convRule: rule23
  }, {
    start: 990,
    length: 1,
    convRule: rule22
  }, {
    start: 991,
    length: 1,
    convRule: rule23
  }, {
    start: 992,
    length: 1,
    convRule: rule22
  }, {
    start: 993,
    length: 1,
    convRule: rule23
  }, {
    start: 994,
    length: 1,
    convRule: rule22
  }, {
    start: 995,
    length: 1,
    convRule: rule23
  }, {
    start: 996,
    length: 1,
    convRule: rule22
  }, {
    start: 997,
    length: 1,
    convRule: rule23
  }, {
    start: 998,
    length: 1,
    convRule: rule22
  }, {
    start: 999,
    length: 1,
    convRule: rule23
  }, {
    start: 1e3,
    length: 1,
    convRule: rule22
  }, {
    start: 1001,
    length: 1,
    convRule: rule23
  }, {
    start: 1002,
    length: 1,
    convRule: rule22
  }, {
    start: 1003,
    length: 1,
    convRule: rule23
  }, {
    start: 1004,
    length: 1,
    convRule: rule22
  }, {
    start: 1005,
    length: 1,
    convRule: rule23
  }, {
    start: 1006,
    length: 1,
    convRule: rule22
  }, {
    start: 1007,
    length: 1,
    convRule: rule23
  }, {
    start: 1008,
    length: 1,
    convRule: rule111
  }, {
    start: 1009,
    length: 1,
    convRule: rule112
  }, {
    start: 1010,
    length: 1,
    convRule: rule113
  }, {
    start: 1011,
    length: 1,
    convRule: rule114
  }, {
    start: 1012,
    length: 1,
    convRule: rule115
  }, {
    start: 1013,
    length: 1,
    convRule: rule116
  }, {
    start: 1014,
    length: 1,
    convRule: rule6
  }, {
    start: 1015,
    length: 1,
    convRule: rule22
  }, {
    start: 1016,
    length: 1,
    convRule: rule23
  }, {
    start: 1017,
    length: 1,
    convRule: rule117
  }, {
    start: 1018,
    length: 1,
    convRule: rule22
  }, {
    start: 1019,
    length: 1,
    convRule: rule23
  }, {
    start: 1020,
    length: 1,
    convRule: rule20
  }, {
    start: 1021,
    length: 3,
    convRule: rule53
  }, {
    start: 1024,
    length: 16,
    convRule: rule118
  }, {
    start: 1040,
    length: 32,
    convRule: rule9
  }, {
    start: 1072,
    length: 32,
    convRule: rule12
  }, {
    start: 1104,
    length: 16,
    convRule: rule112
  }, {
    start: 1120,
    length: 1,
    convRule: rule22
  }, {
    start: 1121,
    length: 1,
    convRule: rule23
  }, {
    start: 1122,
    length: 1,
    convRule: rule22
  }, {
    start: 1123,
    length: 1,
    convRule: rule23
  }, {
    start: 1124,
    length: 1,
    convRule: rule22
  }, {
    start: 1125,
    length: 1,
    convRule: rule23
  }, {
    start: 1126,
    length: 1,
    convRule: rule22
  }, {
    start: 1127,
    length: 1,
    convRule: rule23
  }, {
    start: 1128,
    length: 1,
    convRule: rule22
  }, {
    start: 1129,
    length: 1,
    convRule: rule23
  }, {
    start: 1130,
    length: 1,
    convRule: rule22
  }, {
    start: 1131,
    length: 1,
    convRule: rule23
  }, {
    start: 1132,
    length: 1,
    convRule: rule22
  }, {
    start: 1133,
    length: 1,
    convRule: rule23
  }, {
    start: 1134,
    length: 1,
    convRule: rule22
  }, {
    start: 1135,
    length: 1,
    convRule: rule23
  }, {
    start: 1136,
    length: 1,
    convRule: rule22
  }, {
    start: 1137,
    length: 1,
    convRule: rule23
  }, {
    start: 1138,
    length: 1,
    convRule: rule22
  }, {
    start: 1139,
    length: 1,
    convRule: rule23
  }, {
    start: 1140,
    length: 1,
    convRule: rule22
  }, {
    start: 1141,
    length: 1,
    convRule: rule23
  }, {
    start: 1142,
    length: 1,
    convRule: rule22
  }, {
    start: 1143,
    length: 1,
    convRule: rule23
  }, {
    start: 1144,
    length: 1,
    convRule: rule22
  }, {
    start: 1145,
    length: 1,
    convRule: rule23
  }, {
    start: 1146,
    length: 1,
    convRule: rule22
  }, {
    start: 1147,
    length: 1,
    convRule: rule23
  }, {
    start: 1148,
    length: 1,
    convRule: rule22
  }, {
    start: 1149,
    length: 1,
    convRule: rule23
  }, {
    start: 1150,
    length: 1,
    convRule: rule22
  }, {
    start: 1151,
    length: 1,
    convRule: rule23
  }, {
    start: 1152,
    length: 1,
    convRule: rule22
  }, {
    start: 1153,
    length: 1,
    convRule: rule23
  }, {
    start: 1154,
    length: 1,
    convRule: rule13
  }, {
    start: 1155,
    length: 5,
    convRule: rule92
  }, {
    start: 1160,
    length: 2,
    convRule: rule119
  }, {
    start: 1162,
    length: 1,
    convRule: rule22
  }, {
    start: 1163,
    length: 1,
    convRule: rule23
  }, {
    start: 1164,
    length: 1,
    convRule: rule22
  }, {
    start: 1165,
    length: 1,
    convRule: rule23
  }, {
    start: 1166,
    length: 1,
    convRule: rule22
  }, {
    start: 1167,
    length: 1,
    convRule: rule23
  }, {
    start: 1168,
    length: 1,
    convRule: rule22
  }, {
    start: 1169,
    length: 1,
    convRule: rule23
  }, {
    start: 1170,
    length: 1,
    convRule: rule22
  }, {
    start: 1171,
    length: 1,
    convRule: rule23
  }, {
    start: 1172,
    length: 1,
    convRule: rule22
  }, {
    start: 1173,
    length: 1,
    convRule: rule23
  }, {
    start: 1174,
    length: 1,
    convRule: rule22
  }, {
    start: 1175,
    length: 1,
    convRule: rule23
  }, {
    start: 1176,
    length: 1,
    convRule: rule22
  }, {
    start: 1177,
    length: 1,
    convRule: rule23
  }, {
    start: 1178,
    length: 1,
    convRule: rule22
  }, {
    start: 1179,
    length: 1,
    convRule: rule23
  }, {
    start: 1180,
    length: 1,
    convRule: rule22
  }, {
    start: 1181,
    length: 1,
    convRule: rule23
  }, {
    start: 1182,
    length: 1,
    convRule: rule22
  }, {
    start: 1183,
    length: 1,
    convRule: rule23
  }, {
    start: 1184,
    length: 1,
    convRule: rule22
  }, {
    start: 1185,
    length: 1,
    convRule: rule23
  }, {
    start: 1186,
    length: 1,
    convRule: rule22
  }, {
    start: 1187,
    length: 1,
    convRule: rule23
  }, {
    start: 1188,
    length: 1,
    convRule: rule22
  }, {
    start: 1189,
    length: 1,
    convRule: rule23
  }, {
    start: 1190,
    length: 1,
    convRule: rule22
  }, {
    start: 1191,
    length: 1,
    convRule: rule23
  }, {
    start: 1192,
    length: 1,
    convRule: rule22
  }, {
    start: 1193,
    length: 1,
    convRule: rule23
  }, {
    start: 1194,
    length: 1,
    convRule: rule22
  }, {
    start: 1195,
    length: 1,
    convRule: rule23
  }, {
    start: 1196,
    length: 1,
    convRule: rule22
  }, {
    start: 1197,
    length: 1,
    convRule: rule23
  }, {
    start: 1198,
    length: 1,
    convRule: rule22
  }, {
    start: 1199,
    length: 1,
    convRule: rule23
  }, {
    start: 1200,
    length: 1,
    convRule: rule22
  }, {
    start: 1201,
    length: 1,
    convRule: rule23
  }, {
    start: 1202,
    length: 1,
    convRule: rule22
  }, {
    start: 1203,
    length: 1,
    convRule: rule23
  }, {
    start: 1204,
    length: 1,
    convRule: rule22
  }, {
    start: 1205,
    length: 1,
    convRule: rule23
  }, {
    start: 1206,
    length: 1,
    convRule: rule22
  }, {
    start: 1207,
    length: 1,
    convRule: rule23
  }, {
    start: 1208,
    length: 1,
    convRule: rule22
  }, {
    start: 1209,
    length: 1,
    convRule: rule23
  }, {
    start: 1210,
    length: 1,
    convRule: rule22
  }, {
    start: 1211,
    length: 1,
    convRule: rule23
  }, {
    start: 1212,
    length: 1,
    convRule: rule22
  }, {
    start: 1213,
    length: 1,
    convRule: rule23
  }, {
    start: 1214,
    length: 1,
    convRule: rule22
  }, {
    start: 1215,
    length: 1,
    convRule: rule23
  }, {
    start: 1216,
    length: 1,
    convRule: rule120
  }, {
    start: 1217,
    length: 1,
    convRule: rule22
  }, {
    start: 1218,
    length: 1,
    convRule: rule23
  }, {
    start: 1219,
    length: 1,
    convRule: rule22
  }, {
    start: 1220,
    length: 1,
    convRule: rule23
  }, {
    start: 1221,
    length: 1,
    convRule: rule22
  }, {
    start: 1222,
    length: 1,
    convRule: rule23
  }, {
    start: 1223,
    length: 1,
    convRule: rule22
  }, {
    start: 1224,
    length: 1,
    convRule: rule23
  }, {
    start: 1225,
    length: 1,
    convRule: rule22
  }, {
    start: 1226,
    length: 1,
    convRule: rule23
  }, {
    start: 1227,
    length: 1,
    convRule: rule22
  }, {
    start: 1228,
    length: 1,
    convRule: rule23
  }, {
    start: 1229,
    length: 1,
    convRule: rule22
  }, {
    start: 1230,
    length: 1,
    convRule: rule23
  }, {
    start: 1231,
    length: 1,
    convRule: rule121
  }, {
    start: 1232,
    length: 1,
    convRule: rule22
  }, {
    start: 1233,
    length: 1,
    convRule: rule23
  }, {
    start: 1234,
    length: 1,
    convRule: rule22
  }, {
    start: 1235,
    length: 1,
    convRule: rule23
  }, {
    start: 1236,
    length: 1,
    convRule: rule22
  }, {
    start: 1237,
    length: 1,
    convRule: rule23
  }, {
    start: 1238,
    length: 1,
    convRule: rule22
  }, {
    start: 1239,
    length: 1,
    convRule: rule23
  }, {
    start: 1240,
    length: 1,
    convRule: rule22
  }, {
    start: 1241,
    length: 1,
    convRule: rule23
  }, {
    start: 1242,
    length: 1,
    convRule: rule22
  }, {
    start: 1243,
    length: 1,
    convRule: rule23
  }, {
    start: 1244,
    length: 1,
    convRule: rule22
  }, {
    start: 1245,
    length: 1,
    convRule: rule23
  }, {
    start: 1246,
    length: 1,
    convRule: rule22
  }, {
    start: 1247,
    length: 1,
    convRule: rule23
  }, {
    start: 1248,
    length: 1,
    convRule: rule22
  }, {
    start: 1249,
    length: 1,
    convRule: rule23
  }, {
    start: 1250,
    length: 1,
    convRule: rule22
  }, {
    start: 1251,
    length: 1,
    convRule: rule23
  }, {
    start: 1252,
    length: 1,
    convRule: rule22
  }, {
    start: 1253,
    length: 1,
    convRule: rule23
  }, {
    start: 1254,
    length: 1,
    convRule: rule22
  }, {
    start: 1255,
    length: 1,
    convRule: rule23
  }, {
    start: 1256,
    length: 1,
    convRule: rule22
  }, {
    start: 1257,
    length: 1,
    convRule: rule23
  }, {
    start: 1258,
    length: 1,
    convRule: rule22
  }, {
    start: 1259,
    length: 1,
    convRule: rule23
  }, {
    start: 1260,
    length: 1,
    convRule: rule22
  }, {
    start: 1261,
    length: 1,
    convRule: rule23
  }, {
    start: 1262,
    length: 1,
    convRule: rule22
  }, {
    start: 1263,
    length: 1,
    convRule: rule23
  }, {
    start: 1264,
    length: 1,
    convRule: rule22
  }, {
    start: 1265,
    length: 1,
    convRule: rule23
  }, {
    start: 1266,
    length: 1,
    convRule: rule22
  }, {
    start: 1267,
    length: 1,
    convRule: rule23
  }, {
    start: 1268,
    length: 1,
    convRule: rule22
  }, {
    start: 1269,
    length: 1,
    convRule: rule23
  }, {
    start: 1270,
    length: 1,
    convRule: rule22
  }, {
    start: 1271,
    length: 1,
    convRule: rule23
  }, {
    start: 1272,
    length: 1,
    convRule: rule22
  }, {
    start: 1273,
    length: 1,
    convRule: rule23
  }, {
    start: 1274,
    length: 1,
    convRule: rule22
  }, {
    start: 1275,
    length: 1,
    convRule: rule23
  }, {
    start: 1276,
    length: 1,
    convRule: rule22
  }, {
    start: 1277,
    length: 1,
    convRule: rule23
  }, {
    start: 1278,
    length: 1,
    convRule: rule22
  }, {
    start: 1279,
    length: 1,
    convRule: rule23
  }, {
    start: 1280,
    length: 1,
    convRule: rule22
  }, {
    start: 1281,
    length: 1,
    convRule: rule23
  }, {
    start: 1282,
    length: 1,
    convRule: rule22
  }, {
    start: 1283,
    length: 1,
    convRule: rule23
  }, {
    start: 1284,
    length: 1,
    convRule: rule22
  }, {
    start: 1285,
    length: 1,
    convRule: rule23
  }, {
    start: 1286,
    length: 1,
    convRule: rule22
  }, {
    start: 1287,
    length: 1,
    convRule: rule23
  }, {
    start: 1288,
    length: 1,
    convRule: rule22
  }, {
    start: 1289,
    length: 1,
    convRule: rule23
  }, {
    start: 1290,
    length: 1,
    convRule: rule22
  }, {
    start: 1291,
    length: 1,
    convRule: rule23
  }, {
    start: 1292,
    length: 1,
    convRule: rule22
  }, {
    start: 1293,
    length: 1,
    convRule: rule23
  }, {
    start: 1294,
    length: 1,
    convRule: rule22
  }, {
    start: 1295,
    length: 1,
    convRule: rule23
  }, {
    start: 1296,
    length: 1,
    convRule: rule22
  }, {
    start: 1297,
    length: 1,
    convRule: rule23
  }, {
    start: 1298,
    length: 1,
    convRule: rule22
  }, {
    start: 1299,
    length: 1,
    convRule: rule23
  }, {
    start: 1300,
    length: 1,
    convRule: rule22
  }, {
    start: 1301,
    length: 1,
    convRule: rule23
  }, {
    start: 1302,
    length: 1,
    convRule: rule22
  }, {
    start: 1303,
    length: 1,
    convRule: rule23
  }, {
    start: 1304,
    length: 1,
    convRule: rule22
  }, {
    start: 1305,
    length: 1,
    convRule: rule23
  }, {
    start: 1306,
    length: 1,
    convRule: rule22
  }, {
    start: 1307,
    length: 1,
    convRule: rule23
  }, {
    start: 1308,
    length: 1,
    convRule: rule22
  }, {
    start: 1309,
    length: 1,
    convRule: rule23
  }, {
    start: 1310,
    length: 1,
    convRule: rule22
  }, {
    start: 1311,
    length: 1,
    convRule: rule23
  }, {
    start: 1312,
    length: 1,
    convRule: rule22
  }, {
    start: 1313,
    length: 1,
    convRule: rule23
  }, {
    start: 1314,
    length: 1,
    convRule: rule22
  }, {
    start: 1315,
    length: 1,
    convRule: rule23
  }, {
    start: 1316,
    length: 1,
    convRule: rule22
  }, {
    start: 1317,
    length: 1,
    convRule: rule23
  }, {
    start: 1318,
    length: 1,
    convRule: rule22
  }, {
    start: 1319,
    length: 1,
    convRule: rule23
  }, {
    start: 1320,
    length: 1,
    convRule: rule22
  }, {
    start: 1321,
    length: 1,
    convRule: rule23
  }, {
    start: 1322,
    length: 1,
    convRule: rule22
  }, {
    start: 1323,
    length: 1,
    convRule: rule23
  }, {
    start: 1324,
    length: 1,
    convRule: rule22
  }, {
    start: 1325,
    length: 1,
    convRule: rule23
  }, {
    start: 1326,
    length: 1,
    convRule: rule22
  }, {
    start: 1327,
    length: 1,
    convRule: rule23
  }, {
    start: 1329,
    length: 38,
    convRule: rule122
  }, {
    start: 1369,
    length: 1,
    convRule: rule91
  }, {
    start: 1370,
    length: 6,
    convRule: rule2
  }, {
    start: 1376,
    length: 1,
    convRule: rule20
  }, {
    start: 1377,
    length: 38,
    convRule: rule123
  }, {
    start: 1415,
    length: 2,
    convRule: rule20
  }, {
    start: 1417,
    length: 1,
    convRule: rule2
  }, {
    start: 1418,
    length: 1,
    convRule: rule7
  }, {
    start: 1421,
    length: 2,
    convRule: rule13
  }, {
    start: 1423,
    length: 1,
    convRule: rule3
  }, {
    start: 1425,
    length: 45,
    convRule: rule92
  }, {
    start: 1470,
    length: 1,
    convRule: rule7
  }, {
    start: 1471,
    length: 1,
    convRule: rule92
  }, {
    start: 1472,
    length: 1,
    convRule: rule2
  }, {
    start: 1473,
    length: 2,
    convRule: rule92
  }, {
    start: 1475,
    length: 1,
    convRule: rule2
  }, {
    start: 1476,
    length: 2,
    convRule: rule92
  }, {
    start: 1478,
    length: 1,
    convRule: rule2
  }, {
    start: 1479,
    length: 1,
    convRule: rule92
  }, {
    start: 1488,
    length: 27,
    convRule: rule14
  }, {
    start: 1519,
    length: 4,
    convRule: rule14
  }, {
    start: 1523,
    length: 2,
    convRule: rule2
  }, {
    start: 1536,
    length: 6,
    convRule: rule16
  }, {
    start: 1542,
    length: 3,
    convRule: rule6
  }, {
    start: 1545,
    length: 2,
    convRule: rule2
  }, {
    start: 1547,
    length: 1,
    convRule: rule3
  }, {
    start: 1548,
    length: 2,
    convRule: rule2
  }, {
    start: 1550,
    length: 2,
    convRule: rule13
  }, {
    start: 1552,
    length: 11,
    convRule: rule92
  }, {
    start: 1563,
    length: 1,
    convRule: rule2
  }, {
    start: 1564,
    length: 1,
    convRule: rule16
  }, {
    start: 1566,
    length: 2,
    convRule: rule2
  }, {
    start: 1568,
    length: 32,
    convRule: rule14
  }, {
    start: 1600,
    length: 1,
    convRule: rule91
  }, {
    start: 1601,
    length: 10,
    convRule: rule14
  }, {
    start: 1611,
    length: 21,
    convRule: rule92
  }, {
    start: 1632,
    length: 10,
    convRule: rule8
  }, {
    start: 1642,
    length: 4,
    convRule: rule2
  }, {
    start: 1646,
    length: 2,
    convRule: rule14
  }, {
    start: 1648,
    length: 1,
    convRule: rule92
  }, {
    start: 1649,
    length: 99,
    convRule: rule14
  }, {
    start: 1748,
    length: 1,
    convRule: rule2
  }, {
    start: 1749,
    length: 1,
    convRule: rule14
  }, {
    start: 1750,
    length: 7,
    convRule: rule92
  }, {
    start: 1757,
    length: 1,
    convRule: rule16
  }, {
    start: 1758,
    length: 1,
    convRule: rule13
  }, {
    start: 1759,
    length: 6,
    convRule: rule92
  }, {
    start: 1765,
    length: 2,
    convRule: rule91
  }, {
    start: 1767,
    length: 2,
    convRule: rule92
  }, {
    start: 1769,
    length: 1,
    convRule: rule13
  }, {
    start: 1770,
    length: 4,
    convRule: rule92
  }, {
    start: 1774,
    length: 2,
    convRule: rule14
  }, {
    start: 1776,
    length: 10,
    convRule: rule8
  }, {
    start: 1786,
    length: 3,
    convRule: rule14
  }, {
    start: 1789,
    length: 2,
    convRule: rule13
  }, {
    start: 1791,
    length: 1,
    convRule: rule14
  }, {
    start: 1792,
    length: 14,
    convRule: rule2
  }, {
    start: 1807,
    length: 1,
    convRule: rule16
  }, {
    start: 1808,
    length: 1,
    convRule: rule14
  }, {
    start: 1809,
    length: 1,
    convRule: rule92
  }, {
    start: 1810,
    length: 30,
    convRule: rule14
  }, {
    start: 1840,
    length: 27,
    convRule: rule92
  }, {
    start: 1869,
    length: 89,
    convRule: rule14
  }, {
    start: 1958,
    length: 11,
    convRule: rule92
  }, {
    start: 1969,
    length: 1,
    convRule: rule14
  }, {
    start: 1984,
    length: 10,
    convRule: rule8
  }, {
    start: 1994,
    length: 33,
    convRule: rule14
  }, {
    start: 2027,
    length: 9,
    convRule: rule92
  }, {
    start: 2036,
    length: 2,
    convRule: rule91
  }, {
    start: 2038,
    length: 1,
    convRule: rule13
  }, {
    start: 2039,
    length: 3,
    convRule: rule2
  }, {
    start: 2042,
    length: 1,
    convRule: rule91
  }, {
    start: 2045,
    length: 1,
    convRule: rule92
  }, {
    start: 2046,
    length: 2,
    convRule: rule3
  }, {
    start: 2048,
    length: 22,
    convRule: rule14
  }, {
    start: 2070,
    length: 4,
    convRule: rule92
  }, {
    start: 2074,
    length: 1,
    convRule: rule91
  }, {
    start: 2075,
    length: 9,
    convRule: rule92
  }, {
    start: 2084,
    length: 1,
    convRule: rule91
  }, {
    start: 2085,
    length: 3,
    convRule: rule92
  }, {
    start: 2088,
    length: 1,
    convRule: rule91
  }, {
    start: 2089,
    length: 5,
    convRule: rule92
  }, {
    start: 2096,
    length: 15,
    convRule: rule2
  }, {
    start: 2112,
    length: 25,
    convRule: rule14
  }, {
    start: 2137,
    length: 3,
    convRule: rule92
  }, {
    start: 2142,
    length: 1,
    convRule: rule2
  }, {
    start: 2144,
    length: 11,
    convRule: rule14
  }, {
    start: 2208,
    length: 21,
    convRule: rule14
  }, {
    start: 2230,
    length: 18,
    convRule: rule14
  }, {
    start: 2259,
    length: 15,
    convRule: rule92
  }, {
    start: 2274,
    length: 1,
    convRule: rule16
  }, {
    start: 2275,
    length: 32,
    convRule: rule92
  }, {
    start: 2307,
    length: 1,
    convRule: rule124
  }, {
    start: 2308,
    length: 54,
    convRule: rule14
  }, {
    start: 2362,
    length: 1,
    convRule: rule92
  }, {
    start: 2363,
    length: 1,
    convRule: rule124
  }, {
    start: 2364,
    length: 1,
    convRule: rule92
  }, {
    start: 2365,
    length: 1,
    convRule: rule14
  }, {
    start: 2366,
    length: 3,
    convRule: rule124
  }, {
    start: 2369,
    length: 8,
    convRule: rule92
  }, {
    start: 2377,
    length: 4,
    convRule: rule124
  }, {
    start: 2381,
    length: 1,
    convRule: rule92
  }, {
    start: 2382,
    length: 2,
    convRule: rule124
  }, {
    start: 2384,
    length: 1,
    convRule: rule14
  }, {
    start: 2385,
    length: 7,
    convRule: rule92
  }, {
    start: 2392,
    length: 10,
    convRule: rule14
  }, {
    start: 2402,
    length: 2,
    convRule: rule92
  }, {
    start: 2404,
    length: 2,
    convRule: rule2
  }, {
    start: 2406,
    length: 10,
    convRule: rule8
  }, {
    start: 2416,
    length: 1,
    convRule: rule2
  }, {
    start: 2417,
    length: 1,
    convRule: rule91
  }, {
    start: 2418,
    length: 15,
    convRule: rule14
  }, {
    start: 2433,
    length: 1,
    convRule: rule92
  }, {
    start: 2434,
    length: 2,
    convRule: rule124
  }, {
    start: 2437,
    length: 8,
    convRule: rule14
  }, {
    start: 2447,
    length: 2,
    convRule: rule14
  }, {
    start: 2451,
    length: 22,
    convRule: rule14
  }, {
    start: 2474,
    length: 7,
    convRule: rule14
  }, {
    start: 2482,
    length: 1,
    convRule: rule14
  }, {
    start: 2486,
    length: 4,
    convRule: rule14
  }, {
    start: 2492,
    length: 1,
    convRule: rule92
  }, {
    start: 2493,
    length: 1,
    convRule: rule14
  }, {
    start: 2494,
    length: 3,
    convRule: rule124
  }, {
    start: 2497,
    length: 4,
    convRule: rule92
  }, {
    start: 2503,
    length: 2,
    convRule: rule124
  }, {
    start: 2507,
    length: 2,
    convRule: rule124
  }, {
    start: 2509,
    length: 1,
    convRule: rule92
  }, {
    start: 2510,
    length: 1,
    convRule: rule14
  }, {
    start: 2519,
    length: 1,
    convRule: rule124
  }, {
    start: 2524,
    length: 2,
    convRule: rule14
  }, {
    start: 2527,
    length: 3,
    convRule: rule14
  }, {
    start: 2530,
    length: 2,
    convRule: rule92
  }, {
    start: 2534,
    length: 10,
    convRule: rule8
  }, {
    start: 2544,
    length: 2,
    convRule: rule14
  }, {
    start: 2546,
    length: 2,
    convRule: rule3
  }, {
    start: 2548,
    length: 6,
    convRule: rule17
  }, {
    start: 2554,
    length: 1,
    convRule: rule13
  }, {
    start: 2555,
    length: 1,
    convRule: rule3
  }, {
    start: 2556,
    length: 1,
    convRule: rule14
  }, {
    start: 2557,
    length: 1,
    convRule: rule2
  }, {
    start: 2558,
    length: 1,
    convRule: rule92
  }, {
    start: 2561,
    length: 2,
    convRule: rule92
  }, {
    start: 2563,
    length: 1,
    convRule: rule124
  }, {
    start: 2565,
    length: 6,
    convRule: rule14
  }, {
    start: 2575,
    length: 2,
    convRule: rule14
  }, {
    start: 2579,
    length: 22,
    convRule: rule14
  }, {
    start: 2602,
    length: 7,
    convRule: rule14
  }, {
    start: 2610,
    length: 2,
    convRule: rule14
  }, {
    start: 2613,
    length: 2,
    convRule: rule14
  }, {
    start: 2616,
    length: 2,
    convRule: rule14
  }, {
    start: 2620,
    length: 1,
    convRule: rule92
  }, {
    start: 2622,
    length: 3,
    convRule: rule124
  }, {
    start: 2625,
    length: 2,
    convRule: rule92
  }, {
    start: 2631,
    length: 2,
    convRule: rule92
  }, {
    start: 2635,
    length: 3,
    convRule: rule92
  }, {
    start: 2641,
    length: 1,
    convRule: rule92
  }, {
    start: 2649,
    length: 4,
    convRule: rule14
  }, {
    start: 2654,
    length: 1,
    convRule: rule14
  }, {
    start: 2662,
    length: 10,
    convRule: rule8
  }, {
    start: 2672,
    length: 2,
    convRule: rule92
  }, {
    start: 2674,
    length: 3,
    convRule: rule14
  }, {
    start: 2677,
    length: 1,
    convRule: rule92
  }, {
    start: 2678,
    length: 1,
    convRule: rule2
  }, {
    start: 2689,
    length: 2,
    convRule: rule92
  }, {
    start: 2691,
    length: 1,
    convRule: rule124
  }, {
    start: 2693,
    length: 9,
    convRule: rule14
  }, {
    start: 2703,
    length: 3,
    convRule: rule14
  }, {
    start: 2707,
    length: 22,
    convRule: rule14
  }, {
    start: 2730,
    length: 7,
    convRule: rule14
  }, {
    start: 2738,
    length: 2,
    convRule: rule14
  }, {
    start: 2741,
    length: 5,
    convRule: rule14
  }, {
    start: 2748,
    length: 1,
    convRule: rule92
  }, {
    start: 2749,
    length: 1,
    convRule: rule14
  }, {
    start: 2750,
    length: 3,
    convRule: rule124
  }, {
    start: 2753,
    length: 5,
    convRule: rule92
  }, {
    start: 2759,
    length: 2,
    convRule: rule92
  }, {
    start: 2761,
    length: 1,
    convRule: rule124
  }, {
    start: 2763,
    length: 2,
    convRule: rule124
  }, {
    start: 2765,
    length: 1,
    convRule: rule92
  }, {
    start: 2768,
    length: 1,
    convRule: rule14
  }, {
    start: 2784,
    length: 2,
    convRule: rule14
  }, {
    start: 2786,
    length: 2,
    convRule: rule92
  }, {
    start: 2790,
    length: 10,
    convRule: rule8
  }, {
    start: 2800,
    length: 1,
    convRule: rule2
  }, {
    start: 2801,
    length: 1,
    convRule: rule3
  }, {
    start: 2809,
    length: 1,
    convRule: rule14
  }, {
    start: 2810,
    length: 6,
    convRule: rule92
  }, {
    start: 2817,
    length: 1,
    convRule: rule92
  }, {
    start: 2818,
    length: 2,
    convRule: rule124
  }, {
    start: 2821,
    length: 8,
    convRule: rule14
  }, {
    start: 2831,
    length: 2,
    convRule: rule14
  }, {
    start: 2835,
    length: 22,
    convRule: rule14
  }, {
    start: 2858,
    length: 7,
    convRule: rule14
  }, {
    start: 2866,
    length: 2,
    convRule: rule14
  }, {
    start: 2869,
    length: 5,
    convRule: rule14
  }, {
    start: 2876,
    length: 1,
    convRule: rule92
  }, {
    start: 2877,
    length: 1,
    convRule: rule14
  }, {
    start: 2878,
    length: 1,
    convRule: rule124
  }, {
    start: 2879,
    length: 1,
    convRule: rule92
  }, {
    start: 2880,
    length: 1,
    convRule: rule124
  }, {
    start: 2881,
    length: 4,
    convRule: rule92
  }, {
    start: 2887,
    length: 2,
    convRule: rule124
  }, {
    start: 2891,
    length: 2,
    convRule: rule124
  }, {
    start: 2893,
    length: 1,
    convRule: rule92
  }, {
    start: 2901,
    length: 2,
    convRule: rule92
  }, {
    start: 2903,
    length: 1,
    convRule: rule124
  }, {
    start: 2908,
    length: 2,
    convRule: rule14
  }, {
    start: 2911,
    length: 3,
    convRule: rule14
  }, {
    start: 2914,
    length: 2,
    convRule: rule92
  }, {
    start: 2918,
    length: 10,
    convRule: rule8
  }, {
    start: 2928,
    length: 1,
    convRule: rule13
  }, {
    start: 2929,
    length: 1,
    convRule: rule14
  }, {
    start: 2930,
    length: 6,
    convRule: rule17
  }, {
    start: 2946,
    length: 1,
    convRule: rule92
  }, {
    start: 2947,
    length: 1,
    convRule: rule14
  }, {
    start: 2949,
    length: 6,
    convRule: rule14
  }, {
    start: 2958,
    length: 3,
    convRule: rule14
  }, {
    start: 2962,
    length: 4,
    convRule: rule14
  }, {
    start: 2969,
    length: 2,
    convRule: rule14
  }, {
    start: 2972,
    length: 1,
    convRule: rule14
  }, {
    start: 2974,
    length: 2,
    convRule: rule14
  }, {
    start: 2979,
    length: 2,
    convRule: rule14
  }, {
    start: 2984,
    length: 3,
    convRule: rule14
  }, {
    start: 2990,
    length: 12,
    convRule: rule14
  }, {
    start: 3006,
    length: 2,
    convRule: rule124
  }, {
    start: 3008,
    length: 1,
    convRule: rule92
  }, {
    start: 3009,
    length: 2,
    convRule: rule124
  }, {
    start: 3014,
    length: 3,
    convRule: rule124
  }, {
    start: 3018,
    length: 3,
    convRule: rule124
  }, {
    start: 3021,
    length: 1,
    convRule: rule92
  }, {
    start: 3024,
    length: 1,
    convRule: rule14
  }, {
    start: 3031,
    length: 1,
    convRule: rule124
  }, {
    start: 3046,
    length: 10,
    convRule: rule8
  }, {
    start: 3056,
    length: 3,
    convRule: rule17
  }, {
    start: 3059,
    length: 6,
    convRule: rule13
  }, {
    start: 3065,
    length: 1,
    convRule: rule3
  }, {
    start: 3066,
    length: 1,
    convRule: rule13
  }, {
    start: 3072,
    length: 1,
    convRule: rule92
  }, {
    start: 3073,
    length: 3,
    convRule: rule124
  }, {
    start: 3076,
    length: 1,
    convRule: rule92
  }, {
    start: 3077,
    length: 8,
    convRule: rule14
  }, {
    start: 3086,
    length: 3,
    convRule: rule14
  }, {
    start: 3090,
    length: 23,
    convRule: rule14
  }, {
    start: 3114,
    length: 16,
    convRule: rule14
  }, {
    start: 3133,
    length: 1,
    convRule: rule14
  }, {
    start: 3134,
    length: 3,
    convRule: rule92
  }, {
    start: 3137,
    length: 4,
    convRule: rule124
  }, {
    start: 3142,
    length: 3,
    convRule: rule92
  }, {
    start: 3146,
    length: 4,
    convRule: rule92
  }, {
    start: 3157,
    length: 2,
    convRule: rule92
  }, {
    start: 3160,
    length: 3,
    convRule: rule14
  }, {
    start: 3168,
    length: 2,
    convRule: rule14
  }, {
    start: 3170,
    length: 2,
    convRule: rule92
  }, {
    start: 3174,
    length: 10,
    convRule: rule8
  }, {
    start: 3191,
    length: 1,
    convRule: rule2
  }, {
    start: 3192,
    length: 7,
    convRule: rule17
  }, {
    start: 3199,
    length: 1,
    convRule: rule13
  }, {
    start: 3200,
    length: 1,
    convRule: rule14
  }, {
    start: 3201,
    length: 1,
    convRule: rule92
  }, {
    start: 3202,
    length: 2,
    convRule: rule124
  }, {
    start: 3204,
    length: 1,
    convRule: rule2
  }, {
    start: 3205,
    length: 8,
    convRule: rule14
  }, {
    start: 3214,
    length: 3,
    convRule: rule14
  }, {
    start: 3218,
    length: 23,
    convRule: rule14
  }, {
    start: 3242,
    length: 10,
    convRule: rule14
  }, {
    start: 3253,
    length: 5,
    convRule: rule14
  }, {
    start: 3260,
    length: 1,
    convRule: rule92
  }, {
    start: 3261,
    length: 1,
    convRule: rule14
  }, {
    start: 3262,
    length: 1,
    convRule: rule124
  }, {
    start: 3263,
    length: 1,
    convRule: rule92
  }, {
    start: 3264,
    length: 5,
    convRule: rule124
  }, {
    start: 3270,
    length: 1,
    convRule: rule92
  }, {
    start: 3271,
    length: 2,
    convRule: rule124
  }, {
    start: 3274,
    length: 2,
    convRule: rule124
  }, {
    start: 3276,
    length: 2,
    convRule: rule92
  }, {
    start: 3285,
    length: 2,
    convRule: rule124
  }, {
    start: 3294,
    length: 1,
    convRule: rule14
  }, {
    start: 3296,
    length: 2,
    convRule: rule14
  }, {
    start: 3298,
    length: 2,
    convRule: rule92
  }, {
    start: 3302,
    length: 10,
    convRule: rule8
  }, {
    start: 3313,
    length: 2,
    convRule: rule14
  }, {
    start: 3328,
    length: 2,
    convRule: rule92
  }, {
    start: 3330,
    length: 2,
    convRule: rule124
  }, {
    start: 3332,
    length: 9,
    convRule: rule14
  }, {
    start: 3342,
    length: 3,
    convRule: rule14
  }, {
    start: 3346,
    length: 41,
    convRule: rule14
  }, {
    start: 3387,
    length: 2,
    convRule: rule92
  }, {
    start: 3389,
    length: 1,
    convRule: rule14
  }, {
    start: 3390,
    length: 3,
    convRule: rule124
  }, {
    start: 3393,
    length: 4,
    convRule: rule92
  }, {
    start: 3398,
    length: 3,
    convRule: rule124
  }, {
    start: 3402,
    length: 3,
    convRule: rule124
  }, {
    start: 3405,
    length: 1,
    convRule: rule92
  }, {
    start: 3406,
    length: 1,
    convRule: rule14
  }, {
    start: 3407,
    length: 1,
    convRule: rule13
  }, {
    start: 3412,
    length: 3,
    convRule: rule14
  }, {
    start: 3415,
    length: 1,
    convRule: rule124
  }, {
    start: 3416,
    length: 7,
    convRule: rule17
  }, {
    start: 3423,
    length: 3,
    convRule: rule14
  }, {
    start: 3426,
    length: 2,
    convRule: rule92
  }, {
    start: 3430,
    length: 10,
    convRule: rule8
  }, {
    start: 3440,
    length: 9,
    convRule: rule17
  }, {
    start: 3449,
    length: 1,
    convRule: rule13
  }, {
    start: 3450,
    length: 6,
    convRule: rule14
  }, {
    start: 3457,
    length: 1,
    convRule: rule92
  }, {
    start: 3458,
    length: 2,
    convRule: rule124
  }, {
    start: 3461,
    length: 18,
    convRule: rule14
  }, {
    start: 3482,
    length: 24,
    convRule: rule14
  }, {
    start: 3507,
    length: 9,
    convRule: rule14
  }, {
    start: 3517,
    length: 1,
    convRule: rule14
  }, {
    start: 3520,
    length: 7,
    convRule: rule14
  }, {
    start: 3530,
    length: 1,
    convRule: rule92
  }, {
    start: 3535,
    length: 3,
    convRule: rule124
  }, {
    start: 3538,
    length: 3,
    convRule: rule92
  }, {
    start: 3542,
    length: 1,
    convRule: rule92
  }, {
    start: 3544,
    length: 8,
    convRule: rule124
  }, {
    start: 3558,
    length: 10,
    convRule: rule8
  }, {
    start: 3570,
    length: 2,
    convRule: rule124
  }, {
    start: 3572,
    length: 1,
    convRule: rule2
  }, {
    start: 3585,
    length: 48,
    convRule: rule14
  }, {
    start: 3633,
    length: 1,
    convRule: rule92
  }, {
    start: 3634,
    length: 2,
    convRule: rule14
  }, {
    start: 3636,
    length: 7,
    convRule: rule92
  }, {
    start: 3647,
    length: 1,
    convRule: rule3
  }, {
    start: 3648,
    length: 6,
    convRule: rule14
  }, {
    start: 3654,
    length: 1,
    convRule: rule91
  }, {
    start: 3655,
    length: 8,
    convRule: rule92
  }, {
    start: 3663,
    length: 1,
    convRule: rule2
  }, {
    start: 3664,
    length: 10,
    convRule: rule8
  }, {
    start: 3674,
    length: 2,
    convRule: rule2
  }, {
    start: 3713,
    length: 2,
    convRule: rule14
  }, {
    start: 3716,
    length: 1,
    convRule: rule14
  }, {
    start: 3718,
    length: 5,
    convRule: rule14
  }, {
    start: 3724,
    length: 24,
    convRule: rule14
  }, {
    start: 3749,
    length: 1,
    convRule: rule14
  }, {
    start: 3751,
    length: 10,
    convRule: rule14
  }, {
    start: 3761,
    length: 1,
    convRule: rule92
  }, {
    start: 3762,
    length: 2,
    convRule: rule14
  }, {
    start: 3764,
    length: 9,
    convRule: rule92
  }, {
    start: 3773,
    length: 1,
    convRule: rule14
  }, {
    start: 3776,
    length: 5,
    convRule: rule14
  }, {
    start: 3782,
    length: 1,
    convRule: rule91
  }, {
    start: 3784,
    length: 6,
    convRule: rule92
  }, {
    start: 3792,
    length: 10,
    convRule: rule8
  }, {
    start: 3804,
    length: 4,
    convRule: rule14
  }, {
    start: 3840,
    length: 1,
    convRule: rule14
  }, {
    start: 3841,
    length: 3,
    convRule: rule13
  }, {
    start: 3844,
    length: 15,
    convRule: rule2
  }, {
    start: 3859,
    length: 1,
    convRule: rule13
  }, {
    start: 3860,
    length: 1,
    convRule: rule2
  }, {
    start: 3861,
    length: 3,
    convRule: rule13
  }, {
    start: 3864,
    length: 2,
    convRule: rule92
  }, {
    start: 3866,
    length: 6,
    convRule: rule13
  }, {
    start: 3872,
    length: 10,
    convRule: rule8
  }, {
    start: 3882,
    length: 10,
    convRule: rule17
  }, {
    start: 3892,
    length: 1,
    convRule: rule13
  }, {
    start: 3893,
    length: 1,
    convRule: rule92
  }, {
    start: 3894,
    length: 1,
    convRule: rule13
  }, {
    start: 3895,
    length: 1,
    convRule: rule92
  }, {
    start: 3896,
    length: 1,
    convRule: rule13
  }, {
    start: 3897,
    length: 1,
    convRule: rule92
  }, {
    start: 3898,
    length: 1,
    convRule: rule4
  }, {
    start: 3899,
    length: 1,
    convRule: rule5
  }, {
    start: 3900,
    length: 1,
    convRule: rule4
  }, {
    start: 3901,
    length: 1,
    convRule: rule5
  }, {
    start: 3902,
    length: 2,
    convRule: rule124
  }, {
    start: 3904,
    length: 8,
    convRule: rule14
  }, {
    start: 3913,
    length: 36,
    convRule: rule14
  }, {
    start: 3953,
    length: 14,
    convRule: rule92
  }, {
    start: 3967,
    length: 1,
    convRule: rule124
  }, {
    start: 3968,
    length: 5,
    convRule: rule92
  }, {
    start: 3973,
    length: 1,
    convRule: rule2
  }, {
    start: 3974,
    length: 2,
    convRule: rule92
  }, {
    start: 3976,
    length: 5,
    convRule: rule14
  }, {
    start: 3981,
    length: 11,
    convRule: rule92
  }, {
    start: 3993,
    length: 36,
    convRule: rule92
  }, {
    start: 4030,
    length: 8,
    convRule: rule13
  }, {
    start: 4038,
    length: 1,
    convRule: rule92
  }, {
    start: 4039,
    length: 6,
    convRule: rule13
  }, {
    start: 4046,
    length: 2,
    convRule: rule13
  }, {
    start: 4048,
    length: 5,
    convRule: rule2
  }, {
    start: 4053,
    length: 4,
    convRule: rule13
  }, {
    start: 4057,
    length: 2,
    convRule: rule2
  }, {
    start: 4096,
    length: 43,
    convRule: rule14
  }, {
    start: 4139,
    length: 2,
    convRule: rule124
  }, {
    start: 4141,
    length: 4,
    convRule: rule92
  }, {
    start: 4145,
    length: 1,
    convRule: rule124
  }, {
    start: 4146,
    length: 6,
    convRule: rule92
  }, {
    start: 4152,
    length: 1,
    convRule: rule124
  }, {
    start: 4153,
    length: 2,
    convRule: rule92
  }, {
    start: 4155,
    length: 2,
    convRule: rule124
  }, {
    start: 4157,
    length: 2,
    convRule: rule92
  }, {
    start: 4159,
    length: 1,
    convRule: rule14
  }, {
    start: 4160,
    length: 10,
    convRule: rule8
  }, {
    start: 4170,
    length: 6,
    convRule: rule2
  }, {
    start: 4176,
    length: 6,
    convRule: rule14
  }, {
    start: 4182,
    length: 2,
    convRule: rule124
  }, {
    start: 4184,
    length: 2,
    convRule: rule92
  }, {
    start: 4186,
    length: 4,
    convRule: rule14
  }, {
    start: 4190,
    length: 3,
    convRule: rule92
  }, {
    start: 4193,
    length: 1,
    convRule: rule14
  }, {
    start: 4194,
    length: 3,
    convRule: rule124
  }, {
    start: 4197,
    length: 2,
    convRule: rule14
  }, {
    start: 4199,
    length: 7,
    convRule: rule124
  }, {
    start: 4206,
    length: 3,
    convRule: rule14
  }, {
    start: 4209,
    length: 4,
    convRule: rule92
  }, {
    start: 4213,
    length: 13,
    convRule: rule14
  }, {
    start: 4226,
    length: 1,
    convRule: rule92
  }, {
    start: 4227,
    length: 2,
    convRule: rule124
  }, {
    start: 4229,
    length: 2,
    convRule: rule92
  }, {
    start: 4231,
    length: 6,
    convRule: rule124
  }, {
    start: 4237,
    length: 1,
    convRule: rule92
  }, {
    start: 4238,
    length: 1,
    convRule: rule14
  }, {
    start: 4239,
    length: 1,
    convRule: rule124
  }, {
    start: 4240,
    length: 10,
    convRule: rule8
  }, {
    start: 4250,
    length: 3,
    convRule: rule124
  }, {
    start: 4253,
    length: 1,
    convRule: rule92
  }, {
    start: 4254,
    length: 2,
    convRule: rule13
  }, {
    start: 4256,
    length: 38,
    convRule: rule125
  }, {
    start: 4295,
    length: 1,
    convRule: rule125
  }, {
    start: 4301,
    length: 1,
    convRule: rule125
  }, {
    start: 4304,
    length: 43,
    convRule: rule126
  }, {
    start: 4347,
    length: 1,
    convRule: rule2
  }, {
    start: 4348,
    length: 1,
    convRule: rule91
  }, {
    start: 4349,
    length: 3,
    convRule: rule126
  }, {
    start: 4352,
    length: 329,
    convRule: rule14
  }, {
    start: 4682,
    length: 4,
    convRule: rule14
  }, {
    start: 4688,
    length: 7,
    convRule: rule14
  }, {
    start: 4696,
    length: 1,
    convRule: rule14
  }, {
    start: 4698,
    length: 4,
    convRule: rule14
  }, {
    start: 4704,
    length: 41,
    convRule: rule14
  }, {
    start: 4746,
    length: 4,
    convRule: rule14
  }, {
    start: 4752,
    length: 33,
    convRule: rule14
  }, {
    start: 4786,
    length: 4,
    convRule: rule14
  }, {
    start: 4792,
    length: 7,
    convRule: rule14
  }, {
    start: 4800,
    length: 1,
    convRule: rule14
  }, {
    start: 4802,
    length: 4,
    convRule: rule14
  }, {
    start: 4808,
    length: 15,
    convRule: rule14
  }, {
    start: 4824,
    length: 57,
    convRule: rule14
  }, {
    start: 4882,
    length: 4,
    convRule: rule14
  }, {
    start: 4888,
    length: 67,
    convRule: rule14
  }, {
    start: 4957,
    length: 3,
    convRule: rule92
  }, {
    start: 4960,
    length: 9,
    convRule: rule2
  }, {
    start: 4969,
    length: 20,
    convRule: rule17
  }, {
    start: 4992,
    length: 16,
    convRule: rule14
  }, {
    start: 5008,
    length: 10,
    convRule: rule13
  }, {
    start: 5024,
    length: 80,
    convRule: rule127
  }, {
    start: 5104,
    length: 6,
    convRule: rule104
  }, {
    start: 5112,
    length: 6,
    convRule: rule110
  }, {
    start: 5120,
    length: 1,
    convRule: rule7
  }, {
    start: 5121,
    length: 620,
    convRule: rule14
  }, {
    start: 5741,
    length: 1,
    convRule: rule13
  }, {
    start: 5742,
    length: 1,
    convRule: rule2
  }, {
    start: 5743,
    length: 17,
    convRule: rule14
  }, {
    start: 5760,
    length: 1,
    convRule: rule1
  }, {
    start: 5761,
    length: 26,
    convRule: rule14
  }, {
    start: 5787,
    length: 1,
    convRule: rule4
  }, {
    start: 5788,
    length: 1,
    convRule: rule5
  }, {
    start: 5792,
    length: 75,
    convRule: rule14
  }, {
    start: 5867,
    length: 3,
    convRule: rule2
  }, {
    start: 5870,
    length: 3,
    convRule: rule128
  }, {
    start: 5873,
    length: 8,
    convRule: rule14
  }, {
    start: 5888,
    length: 13,
    convRule: rule14
  }, {
    start: 5902,
    length: 4,
    convRule: rule14
  }, {
    start: 5906,
    length: 3,
    convRule: rule92
  }, {
    start: 5920,
    length: 18,
    convRule: rule14
  }, {
    start: 5938,
    length: 3,
    convRule: rule92
  }, {
    start: 5941,
    length: 2,
    convRule: rule2
  }, {
    start: 5952,
    length: 18,
    convRule: rule14
  }, {
    start: 5970,
    length: 2,
    convRule: rule92
  }, {
    start: 5984,
    length: 13,
    convRule: rule14
  }, {
    start: 5998,
    length: 3,
    convRule: rule14
  }, {
    start: 6002,
    length: 2,
    convRule: rule92
  }, {
    start: 6016,
    length: 52,
    convRule: rule14
  }, {
    start: 6068,
    length: 2,
    convRule: rule92
  }, {
    start: 6070,
    length: 1,
    convRule: rule124
  }, {
    start: 6071,
    length: 7,
    convRule: rule92
  }, {
    start: 6078,
    length: 8,
    convRule: rule124
  }, {
    start: 6086,
    length: 1,
    convRule: rule92
  }, {
    start: 6087,
    length: 2,
    convRule: rule124
  }, {
    start: 6089,
    length: 11,
    convRule: rule92
  }, {
    start: 6100,
    length: 3,
    convRule: rule2
  }, {
    start: 6103,
    length: 1,
    convRule: rule91
  }, {
    start: 6104,
    length: 3,
    convRule: rule2
  }, {
    start: 6107,
    length: 1,
    convRule: rule3
  }, {
    start: 6108,
    length: 1,
    convRule: rule14
  }, {
    start: 6109,
    length: 1,
    convRule: rule92
  }, {
    start: 6112,
    length: 10,
    convRule: rule8
  }, {
    start: 6128,
    length: 10,
    convRule: rule17
  }, {
    start: 6144,
    length: 6,
    convRule: rule2
  }, {
    start: 6150,
    length: 1,
    convRule: rule7
  }, {
    start: 6151,
    length: 4,
    convRule: rule2
  }, {
    start: 6155,
    length: 3,
    convRule: rule92
  }, {
    start: 6158,
    length: 1,
    convRule: rule16
  }, {
    start: 6160,
    length: 10,
    convRule: rule8
  }, {
    start: 6176,
    length: 35,
    convRule: rule14
  }, {
    start: 6211,
    length: 1,
    convRule: rule91
  }, {
    start: 6212,
    length: 53,
    convRule: rule14
  }, {
    start: 6272,
    length: 5,
    convRule: rule14
  }, {
    start: 6277,
    length: 2,
    convRule: rule92
  }, {
    start: 6279,
    length: 34,
    convRule: rule14
  }, {
    start: 6313,
    length: 1,
    convRule: rule92
  }, {
    start: 6314,
    length: 1,
    convRule: rule14
  }, {
    start: 6320,
    length: 70,
    convRule: rule14
  }, {
    start: 6400,
    length: 31,
    convRule: rule14
  }, {
    start: 6432,
    length: 3,
    convRule: rule92
  }, {
    start: 6435,
    length: 4,
    convRule: rule124
  }, {
    start: 6439,
    length: 2,
    convRule: rule92
  }, {
    start: 6441,
    length: 3,
    convRule: rule124
  }, {
    start: 6448,
    length: 2,
    convRule: rule124
  }, {
    start: 6450,
    length: 1,
    convRule: rule92
  }, {
    start: 6451,
    length: 6,
    convRule: rule124
  }, {
    start: 6457,
    length: 3,
    convRule: rule92
  }, {
    start: 6464,
    length: 1,
    convRule: rule13
  }, {
    start: 6468,
    length: 2,
    convRule: rule2
  }, {
    start: 6470,
    length: 10,
    convRule: rule8
  }, {
    start: 6480,
    length: 30,
    convRule: rule14
  }, {
    start: 6512,
    length: 5,
    convRule: rule14
  }, {
    start: 6528,
    length: 44,
    convRule: rule14
  }, {
    start: 6576,
    length: 26,
    convRule: rule14
  }, {
    start: 6608,
    length: 10,
    convRule: rule8
  }, {
    start: 6618,
    length: 1,
    convRule: rule17
  }, {
    start: 6622,
    length: 34,
    convRule: rule13
  }, {
    start: 6656,
    length: 23,
    convRule: rule14
  }, {
    start: 6679,
    length: 2,
    convRule: rule92
  }, {
    start: 6681,
    length: 2,
    convRule: rule124
  }, {
    start: 6683,
    length: 1,
    convRule: rule92
  }, {
    start: 6686,
    length: 2,
    convRule: rule2
  }, {
    start: 6688,
    length: 53,
    convRule: rule14
  }, {
    start: 6741,
    length: 1,
    convRule: rule124
  }, {
    start: 6742,
    length: 1,
    convRule: rule92
  }, {
    start: 6743,
    length: 1,
    convRule: rule124
  }, {
    start: 6744,
    length: 7,
    convRule: rule92
  }, {
    start: 6752,
    length: 1,
    convRule: rule92
  }, {
    start: 6753,
    length: 1,
    convRule: rule124
  }, {
    start: 6754,
    length: 1,
    convRule: rule92
  }, {
    start: 6755,
    length: 2,
    convRule: rule124
  }, {
    start: 6757,
    length: 8,
    convRule: rule92
  }, {
    start: 6765,
    length: 6,
    convRule: rule124
  }, {
    start: 6771,
    length: 10,
    convRule: rule92
  }, {
    start: 6783,
    length: 1,
    convRule: rule92
  }, {
    start: 6784,
    length: 10,
    convRule: rule8
  }, {
    start: 6800,
    length: 10,
    convRule: rule8
  }, {
    start: 6816,
    length: 7,
    convRule: rule2
  }, {
    start: 6823,
    length: 1,
    convRule: rule91
  }, {
    start: 6824,
    length: 6,
    convRule: rule2
  }, {
    start: 6832,
    length: 14,
    convRule: rule92
  }, {
    start: 6846,
    length: 1,
    convRule: rule119
  }, {
    start: 6847,
    length: 2,
    convRule: rule92
  }, {
    start: 6912,
    length: 4,
    convRule: rule92
  }, {
    start: 6916,
    length: 1,
    convRule: rule124
  }, {
    start: 6917,
    length: 47,
    convRule: rule14
  }, {
    start: 6964,
    length: 1,
    convRule: rule92
  }, {
    start: 6965,
    length: 1,
    convRule: rule124
  }, {
    start: 6966,
    length: 5,
    convRule: rule92
  }, {
    start: 6971,
    length: 1,
    convRule: rule124
  }, {
    start: 6972,
    length: 1,
    convRule: rule92
  }, {
    start: 6973,
    length: 5,
    convRule: rule124
  }, {
    start: 6978,
    length: 1,
    convRule: rule92
  }, {
    start: 6979,
    length: 2,
    convRule: rule124
  }, {
    start: 6981,
    length: 7,
    convRule: rule14
  }, {
    start: 6992,
    length: 10,
    convRule: rule8
  }, {
    start: 7002,
    length: 7,
    convRule: rule2
  }, {
    start: 7009,
    length: 10,
    convRule: rule13
  }, {
    start: 7019,
    length: 9,
    convRule: rule92
  }, {
    start: 7028,
    length: 9,
    convRule: rule13
  }, {
    start: 7040,
    length: 2,
    convRule: rule92
  }, {
    start: 7042,
    length: 1,
    convRule: rule124
  }, {
    start: 7043,
    length: 30,
    convRule: rule14
  }, {
    start: 7073,
    length: 1,
    convRule: rule124
  }, {
    start: 7074,
    length: 4,
    convRule: rule92
  }, {
    start: 7078,
    length: 2,
    convRule: rule124
  }, {
    start: 7080,
    length: 2,
    convRule: rule92
  }, {
    start: 7082,
    length: 1,
    convRule: rule124
  }, {
    start: 7083,
    length: 3,
    convRule: rule92
  }, {
    start: 7086,
    length: 2,
    convRule: rule14
  }, {
    start: 7088,
    length: 10,
    convRule: rule8
  }, {
    start: 7098,
    length: 44,
    convRule: rule14
  }, {
    start: 7142,
    length: 1,
    convRule: rule92
  }, {
    start: 7143,
    length: 1,
    convRule: rule124
  }, {
    start: 7144,
    length: 2,
    convRule: rule92
  }, {
    start: 7146,
    length: 3,
    convRule: rule124
  }, {
    start: 7149,
    length: 1,
    convRule: rule92
  }, {
    start: 7150,
    length: 1,
    convRule: rule124
  }, {
    start: 7151,
    length: 3,
    convRule: rule92
  }, {
    start: 7154,
    length: 2,
    convRule: rule124
  }, {
    start: 7164,
    length: 4,
    convRule: rule2
  }, {
    start: 7168,
    length: 36,
    convRule: rule14
  }, {
    start: 7204,
    length: 8,
    convRule: rule124
  }, {
    start: 7212,
    length: 8,
    convRule: rule92
  }, {
    start: 7220,
    length: 2,
    convRule: rule124
  }, {
    start: 7222,
    length: 2,
    convRule: rule92
  }, {
    start: 7227,
    length: 5,
    convRule: rule2
  }, {
    start: 7232,
    length: 10,
    convRule: rule8
  }, {
    start: 7245,
    length: 3,
    convRule: rule14
  }, {
    start: 7248,
    length: 10,
    convRule: rule8
  }, {
    start: 7258,
    length: 30,
    convRule: rule14
  }, {
    start: 7288,
    length: 6,
    convRule: rule91
  }, {
    start: 7294,
    length: 2,
    convRule: rule2
  }, {
    start: 7296,
    length: 1,
    convRule: rule129
  }, {
    start: 7297,
    length: 1,
    convRule: rule130
  }, {
    start: 7298,
    length: 1,
    convRule: rule131
  }, {
    start: 7299,
    length: 2,
    convRule: rule132
  }, {
    start: 7301,
    length: 1,
    convRule: rule133
  }, {
    start: 7302,
    length: 1,
    convRule: rule134
  }, {
    start: 7303,
    length: 1,
    convRule: rule135
  }, {
    start: 7304,
    length: 1,
    convRule: rule136
  }, {
    start: 7312,
    length: 43,
    convRule: rule137
  }, {
    start: 7357,
    length: 3,
    convRule: rule137
  }, {
    start: 7360,
    length: 8,
    convRule: rule2
  }, {
    start: 7376,
    length: 3,
    convRule: rule92
  }, {
    start: 7379,
    length: 1,
    convRule: rule2
  }, {
    start: 7380,
    length: 13,
    convRule: rule92
  }, {
    start: 7393,
    length: 1,
    convRule: rule124
  }, {
    start: 7394,
    length: 7,
    convRule: rule92
  }, {
    start: 7401,
    length: 4,
    convRule: rule14
  }, {
    start: 7405,
    length: 1,
    convRule: rule92
  }, {
    start: 7406,
    length: 6,
    convRule: rule14
  }, {
    start: 7412,
    length: 1,
    convRule: rule92
  }, {
    start: 7413,
    length: 2,
    convRule: rule14
  }, {
    start: 7415,
    length: 1,
    convRule: rule124
  }, {
    start: 7416,
    length: 2,
    convRule: rule92
  }, {
    start: 7418,
    length: 1,
    convRule: rule14
  }, {
    start: 7424,
    length: 44,
    convRule: rule20
  }, {
    start: 7468,
    length: 63,
    convRule: rule91
  }, {
    start: 7531,
    length: 13,
    convRule: rule20
  }, {
    start: 7544,
    length: 1,
    convRule: rule91
  }, {
    start: 7545,
    length: 1,
    convRule: rule138
  }, {
    start: 7546,
    length: 3,
    convRule: rule20
  }, {
    start: 7549,
    length: 1,
    convRule: rule139
  }, {
    start: 7550,
    length: 16,
    convRule: rule20
  }, {
    start: 7566,
    length: 1,
    convRule: rule140
  }, {
    start: 7567,
    length: 12,
    convRule: rule20
  }, {
    start: 7579,
    length: 37,
    convRule: rule91
  }, {
    start: 7616,
    length: 58,
    convRule: rule92
  }, {
    start: 7675,
    length: 5,
    convRule: rule92
  }, {
    start: 7680,
    length: 1,
    convRule: rule22
  }, {
    start: 7681,
    length: 1,
    convRule: rule23
  }, {
    start: 7682,
    length: 1,
    convRule: rule22
  }, {
    start: 7683,
    length: 1,
    convRule: rule23
  }, {
    start: 7684,
    length: 1,
    convRule: rule22
  }, {
    start: 7685,
    length: 1,
    convRule: rule23
  }, {
    start: 7686,
    length: 1,
    convRule: rule22
  }, {
    start: 7687,
    length: 1,
    convRule: rule23
  }, {
    start: 7688,
    length: 1,
    convRule: rule22
  }, {
    start: 7689,
    length: 1,
    convRule: rule23
  }, {
    start: 7690,
    length: 1,
    convRule: rule22
  }, {
    start: 7691,
    length: 1,
    convRule: rule23
  }, {
    start: 7692,
    length: 1,
    convRule: rule22
  }, {
    start: 7693,
    length: 1,
    convRule: rule23
  }, {
    start: 7694,
    length: 1,
    convRule: rule22
  }, {
    start: 7695,
    length: 1,
    convRule: rule23
  }, {
    start: 7696,
    length: 1,
    convRule: rule22
  }, {
    start: 7697,
    length: 1,
    convRule: rule23
  }, {
    start: 7698,
    length: 1,
    convRule: rule22
  }, {
    start: 7699,
    length: 1,
    convRule: rule23
  }, {
    start: 7700,
    length: 1,
    convRule: rule22
  }, {
    start: 7701,
    length: 1,
    convRule: rule23
  }, {
    start: 7702,
    length: 1,
    convRule: rule22
  }, {
    start: 7703,
    length: 1,
    convRule: rule23
  }, {
    start: 7704,
    length: 1,
    convRule: rule22
  }, {
    start: 7705,
    length: 1,
    convRule: rule23
  }, {
    start: 7706,
    length: 1,
    convRule: rule22
  }, {
    start: 7707,
    length: 1,
    convRule: rule23
  }, {
    start: 7708,
    length: 1,
    convRule: rule22
  }, {
    start: 7709,
    length: 1,
    convRule: rule23
  }, {
    start: 7710,
    length: 1,
    convRule: rule22
  }, {
    start: 7711,
    length: 1,
    convRule: rule23
  }, {
    start: 7712,
    length: 1,
    convRule: rule22
  }, {
    start: 7713,
    length: 1,
    convRule: rule23
  }, {
    start: 7714,
    length: 1,
    convRule: rule22
  }, {
    start: 7715,
    length: 1,
    convRule: rule23
  }, {
    start: 7716,
    length: 1,
    convRule: rule22
  }, {
    start: 7717,
    length: 1,
    convRule: rule23
  }, {
    start: 7718,
    length: 1,
    convRule: rule22
  }, {
    start: 7719,
    length: 1,
    convRule: rule23
  }, {
    start: 7720,
    length: 1,
    convRule: rule22
  }, {
    start: 7721,
    length: 1,
    convRule: rule23
  }, {
    start: 7722,
    length: 1,
    convRule: rule22
  }, {
    start: 7723,
    length: 1,
    convRule: rule23
  }, {
    start: 7724,
    length: 1,
    convRule: rule22
  }, {
    start: 7725,
    length: 1,
    convRule: rule23
  }, {
    start: 7726,
    length: 1,
    convRule: rule22
  }, {
    start: 7727,
    length: 1,
    convRule: rule23
  }, {
    start: 7728,
    length: 1,
    convRule: rule22
  }, {
    start: 7729,
    length: 1,
    convRule: rule23
  }, {
    start: 7730,
    length: 1,
    convRule: rule22
  }, {
    start: 7731,
    length: 1,
    convRule: rule23
  }, {
    start: 7732,
    length: 1,
    convRule: rule22
  }, {
    start: 7733,
    length: 1,
    convRule: rule23
  }, {
    start: 7734,
    length: 1,
    convRule: rule22
  }, {
    start: 7735,
    length: 1,
    convRule: rule23
  }, {
    start: 7736,
    length: 1,
    convRule: rule22
  }, {
    start: 7737,
    length: 1,
    convRule: rule23
  }, {
    start: 7738,
    length: 1,
    convRule: rule22
  }, {
    start: 7739,
    length: 1,
    convRule: rule23
  }, {
    start: 7740,
    length: 1,
    convRule: rule22
  }, {
    start: 7741,
    length: 1,
    convRule: rule23
  }, {
    start: 7742,
    length: 1,
    convRule: rule22
  }, {
    start: 7743,
    length: 1,
    convRule: rule23
  }, {
    start: 7744,
    length: 1,
    convRule: rule22
  }, {
    start: 7745,
    length: 1,
    convRule: rule23
  }, {
    start: 7746,
    length: 1,
    convRule: rule22
  }, {
    start: 7747,
    length: 1,
    convRule: rule23
  }, {
    start: 7748,
    length: 1,
    convRule: rule22
  }, {
    start: 7749,
    length: 1,
    convRule: rule23
  }, {
    start: 7750,
    length: 1,
    convRule: rule22
  }, {
    start: 7751,
    length: 1,
    convRule: rule23
  }, {
    start: 7752,
    length: 1,
    convRule: rule22
  }, {
    start: 7753,
    length: 1,
    convRule: rule23
  }, {
    start: 7754,
    length: 1,
    convRule: rule22
  }, {
    start: 7755,
    length: 1,
    convRule: rule23
  }, {
    start: 7756,
    length: 1,
    convRule: rule22
  }, {
    start: 7757,
    length: 1,
    convRule: rule23
  }, {
    start: 7758,
    length: 1,
    convRule: rule22
  }, {
    start: 7759,
    length: 1,
    convRule: rule23
  }, {
    start: 7760,
    length: 1,
    convRule: rule22
  }, {
    start: 7761,
    length: 1,
    convRule: rule23
  }, {
    start: 7762,
    length: 1,
    convRule: rule22
  }, {
    start: 7763,
    length: 1,
    convRule: rule23
  }, {
    start: 7764,
    length: 1,
    convRule: rule22
  }, {
    start: 7765,
    length: 1,
    convRule: rule23
  }, {
    start: 7766,
    length: 1,
    convRule: rule22
  }, {
    start: 7767,
    length: 1,
    convRule: rule23
  }, {
    start: 7768,
    length: 1,
    convRule: rule22
  }, {
    start: 7769,
    length: 1,
    convRule: rule23
  }, {
    start: 7770,
    length: 1,
    convRule: rule22
  }, {
    start: 7771,
    length: 1,
    convRule: rule23
  }, {
    start: 7772,
    length: 1,
    convRule: rule22
  }, {
    start: 7773,
    length: 1,
    convRule: rule23
  }, {
    start: 7774,
    length: 1,
    convRule: rule22
  }, {
    start: 7775,
    length: 1,
    convRule: rule23
  }, {
    start: 7776,
    length: 1,
    convRule: rule22
  }, {
    start: 7777,
    length: 1,
    convRule: rule23
  }, {
    start: 7778,
    length: 1,
    convRule: rule22
  }, {
    start: 7779,
    length: 1,
    convRule: rule23
  }, {
    start: 7780,
    length: 1,
    convRule: rule22
  }, {
    start: 7781,
    length: 1,
    convRule: rule23
  }, {
    start: 7782,
    length: 1,
    convRule: rule22
  }, {
    start: 7783,
    length: 1,
    convRule: rule23
  }, {
    start: 7784,
    length: 1,
    convRule: rule22
  }, {
    start: 7785,
    length: 1,
    convRule: rule23
  }, {
    start: 7786,
    length: 1,
    convRule: rule22
  }, {
    start: 7787,
    length: 1,
    convRule: rule23
  }, {
    start: 7788,
    length: 1,
    convRule: rule22
  }, {
    start: 7789,
    length: 1,
    convRule: rule23
  }, {
    start: 7790,
    length: 1,
    convRule: rule22
  }, {
    start: 7791,
    length: 1,
    convRule: rule23
  }, {
    start: 7792,
    length: 1,
    convRule: rule22
  }, {
    start: 7793,
    length: 1,
    convRule: rule23
  }, {
    start: 7794,
    length: 1,
    convRule: rule22
  }, {
    start: 7795,
    length: 1,
    convRule: rule23
  }, {
    start: 7796,
    length: 1,
    convRule: rule22
  }, {
    start: 7797,
    length: 1,
    convRule: rule23
  }, {
    start: 7798,
    length: 1,
    convRule: rule22
  }, {
    start: 7799,
    length: 1,
    convRule: rule23
  }, {
    start: 7800,
    length: 1,
    convRule: rule22
  }, {
    start: 7801,
    length: 1,
    convRule: rule23
  }, {
    start: 7802,
    length: 1,
    convRule: rule22
  }, {
    start: 7803,
    length: 1,
    convRule: rule23
  }, {
    start: 7804,
    length: 1,
    convRule: rule22
  }, {
    start: 7805,
    length: 1,
    convRule: rule23
  }, {
    start: 7806,
    length: 1,
    convRule: rule22
  }, {
    start: 7807,
    length: 1,
    convRule: rule23
  }, {
    start: 7808,
    length: 1,
    convRule: rule22
  }, {
    start: 7809,
    length: 1,
    convRule: rule23
  }, {
    start: 7810,
    length: 1,
    convRule: rule22
  }, {
    start: 7811,
    length: 1,
    convRule: rule23
  }, {
    start: 7812,
    length: 1,
    convRule: rule22
  }, {
    start: 7813,
    length: 1,
    convRule: rule23
  }, {
    start: 7814,
    length: 1,
    convRule: rule22
  }, {
    start: 7815,
    length: 1,
    convRule: rule23
  }, {
    start: 7816,
    length: 1,
    convRule: rule22
  }, {
    start: 7817,
    length: 1,
    convRule: rule23
  }, {
    start: 7818,
    length: 1,
    convRule: rule22
  }, {
    start: 7819,
    length: 1,
    convRule: rule23
  }, {
    start: 7820,
    length: 1,
    convRule: rule22
  }, {
    start: 7821,
    length: 1,
    convRule: rule23
  }, {
    start: 7822,
    length: 1,
    convRule: rule22
  }, {
    start: 7823,
    length: 1,
    convRule: rule23
  }, {
    start: 7824,
    length: 1,
    convRule: rule22
  }, {
    start: 7825,
    length: 1,
    convRule: rule23
  }, {
    start: 7826,
    length: 1,
    convRule: rule22
  }, {
    start: 7827,
    length: 1,
    convRule: rule23
  }, {
    start: 7828,
    length: 1,
    convRule: rule22
  }, {
    start: 7829,
    length: 1,
    convRule: rule23
  }, {
    start: 7830,
    length: 5,
    convRule: rule20
  }, {
    start: 7835,
    length: 1,
    convRule: rule141
  }, {
    start: 7836,
    length: 2,
    convRule: rule20
  }, {
    start: 7838,
    length: 1,
    convRule: rule142
  }, {
    start: 7839,
    length: 1,
    convRule: rule20
  }, {
    start: 7840,
    length: 1,
    convRule: rule22
  }, {
    start: 7841,
    length: 1,
    convRule: rule23
  }, {
    start: 7842,
    length: 1,
    convRule: rule22
  }, {
    start: 7843,
    length: 1,
    convRule: rule23
  }, {
    start: 7844,
    length: 1,
    convRule: rule22
  }, {
    start: 7845,
    length: 1,
    convRule: rule23
  }, {
    start: 7846,
    length: 1,
    convRule: rule22
  }, {
    start: 7847,
    length: 1,
    convRule: rule23
  }, {
    start: 7848,
    length: 1,
    convRule: rule22
  }, {
    start: 7849,
    length: 1,
    convRule: rule23
  }, {
    start: 7850,
    length: 1,
    convRule: rule22
  }, {
    start: 7851,
    length: 1,
    convRule: rule23
  }, {
    start: 7852,
    length: 1,
    convRule: rule22
  }, {
    start: 7853,
    length: 1,
    convRule: rule23
  }, {
    start: 7854,
    length: 1,
    convRule: rule22
  }, {
    start: 7855,
    length: 1,
    convRule: rule23
  }, {
    start: 7856,
    length: 1,
    convRule: rule22
  }, {
    start: 7857,
    length: 1,
    convRule: rule23
  }, {
    start: 7858,
    length: 1,
    convRule: rule22
  }, {
    start: 7859,
    length: 1,
    convRule: rule23
  }, {
    start: 7860,
    length: 1,
    convRule: rule22
  }, {
    start: 7861,
    length: 1,
    convRule: rule23
  }, {
    start: 7862,
    length: 1,
    convRule: rule22
  }, {
    start: 7863,
    length: 1,
    convRule: rule23
  }, {
    start: 7864,
    length: 1,
    convRule: rule22
  }, {
    start: 7865,
    length: 1,
    convRule: rule23
  }, {
    start: 7866,
    length: 1,
    convRule: rule22
  }, {
    start: 7867,
    length: 1,
    convRule: rule23
  }, {
    start: 7868,
    length: 1,
    convRule: rule22
  }, {
    start: 7869,
    length: 1,
    convRule: rule23
  }, {
    start: 7870,
    length: 1,
    convRule: rule22
  }, {
    start: 7871,
    length: 1,
    convRule: rule23
  }, {
    start: 7872,
    length: 1,
    convRule: rule22
  }, {
    start: 7873,
    length: 1,
    convRule: rule23
  }, {
    start: 7874,
    length: 1,
    convRule: rule22
  }, {
    start: 7875,
    length: 1,
    convRule: rule23
  }, {
    start: 7876,
    length: 1,
    convRule: rule22
  }, {
    start: 7877,
    length: 1,
    convRule: rule23
  }, {
    start: 7878,
    length: 1,
    convRule: rule22
  }, {
    start: 7879,
    length: 1,
    convRule: rule23
  }, {
    start: 7880,
    length: 1,
    convRule: rule22
  }, {
    start: 7881,
    length: 1,
    convRule: rule23
  }, {
    start: 7882,
    length: 1,
    convRule: rule22
  }, {
    start: 7883,
    length: 1,
    convRule: rule23
  }, {
    start: 7884,
    length: 1,
    convRule: rule22
  }, {
    start: 7885,
    length: 1,
    convRule: rule23
  }, {
    start: 7886,
    length: 1,
    convRule: rule22
  }, {
    start: 7887,
    length: 1,
    convRule: rule23
  }, {
    start: 7888,
    length: 1,
    convRule: rule22
  }, {
    start: 7889,
    length: 1,
    convRule: rule23
  }, {
    start: 7890,
    length: 1,
    convRule: rule22
  }, {
    start: 7891,
    length: 1,
    convRule: rule23
  }, {
    start: 7892,
    length: 1,
    convRule: rule22
  }, {
    start: 7893,
    length: 1,
    convRule: rule23
  }, {
    start: 7894,
    length: 1,
    convRule: rule22
  }, {
    start: 7895,
    length: 1,
    convRule: rule23
  }, {
    start: 7896,
    length: 1,
    convRule: rule22
  }, {
    start: 7897,
    length: 1,
    convRule: rule23
  }, {
    start: 7898,
    length: 1,
    convRule: rule22
  }, {
    start: 7899,
    length: 1,
    convRule: rule23
  }, {
    start: 7900,
    length: 1,
    convRule: rule22
  }, {
    start: 7901,
    length: 1,
    convRule: rule23
  }, {
    start: 7902,
    length: 1,
    convRule: rule22
  }, {
    start: 7903,
    length: 1,
    convRule: rule23
  }, {
    start: 7904,
    length: 1,
    convRule: rule22
  }, {
    start: 7905,
    length: 1,
    convRule: rule23
  }, {
    start: 7906,
    length: 1,
    convRule: rule22
  }, {
    start: 7907,
    length: 1,
    convRule: rule23
  }, {
    start: 7908,
    length: 1,
    convRule: rule22
  }, {
    start: 7909,
    length: 1,
    convRule: rule23
  }, {
    start: 7910,
    length: 1,
    convRule: rule22
  }, {
    start: 7911,
    length: 1,
    convRule: rule23
  }, {
    start: 7912,
    length: 1,
    convRule: rule22
  }, {
    start: 7913,
    length: 1,
    convRule: rule23
  }, {
    start: 7914,
    length: 1,
    convRule: rule22
  }, {
    start: 7915,
    length: 1,
    convRule: rule23
  }, {
    start: 7916,
    length: 1,
    convRule: rule22
  }, {
    start: 7917,
    length: 1,
    convRule: rule23
  }, {
    start: 7918,
    length: 1,
    convRule: rule22
  }, {
    start: 7919,
    length: 1,
    convRule: rule23
  }, {
    start: 7920,
    length: 1,
    convRule: rule22
  }, {
    start: 7921,
    length: 1,
    convRule: rule23
  }, {
    start: 7922,
    length: 1,
    convRule: rule22
  }, {
    start: 7923,
    length: 1,
    convRule: rule23
  }, {
    start: 7924,
    length: 1,
    convRule: rule22
  }, {
    start: 7925,
    length: 1,
    convRule: rule23
  }, {
    start: 7926,
    length: 1,
    convRule: rule22
  }, {
    start: 7927,
    length: 1,
    convRule: rule23
  }, {
    start: 7928,
    length: 1,
    convRule: rule22
  }, {
    start: 7929,
    length: 1,
    convRule: rule23
  }, {
    start: 7930,
    length: 1,
    convRule: rule22
  }, {
    start: 7931,
    length: 1,
    convRule: rule23
  }, {
    start: 7932,
    length: 1,
    convRule: rule22
  }, {
    start: 7933,
    length: 1,
    convRule: rule23
  }, {
    start: 7934,
    length: 1,
    convRule: rule22
  }, {
    start: 7935,
    length: 1,
    convRule: rule23
  }, {
    start: 7936,
    length: 8,
    convRule: rule143
  }, {
    start: 7944,
    length: 8,
    convRule: rule144
  }, {
    start: 7952,
    length: 6,
    convRule: rule143
  }, {
    start: 7960,
    length: 6,
    convRule: rule144
  }, {
    start: 7968,
    length: 8,
    convRule: rule143
  }, {
    start: 7976,
    length: 8,
    convRule: rule144
  }, {
    start: 7984,
    length: 8,
    convRule: rule143
  }, {
    start: 7992,
    length: 8,
    convRule: rule144
  }, {
    start: 8e3,
    length: 6,
    convRule: rule143
  }, {
    start: 8008,
    length: 6,
    convRule: rule144
  }, {
    start: 8016,
    length: 1,
    convRule: rule20
  }, {
    start: 8017,
    length: 1,
    convRule: rule143
  }, {
    start: 8018,
    length: 1,
    convRule: rule20
  }, {
    start: 8019,
    length: 1,
    convRule: rule143
  }, {
    start: 8020,
    length: 1,
    convRule: rule20
  }, {
    start: 8021,
    length: 1,
    convRule: rule143
  }, {
    start: 8022,
    length: 1,
    convRule: rule20
  }, {
    start: 8023,
    length: 1,
    convRule: rule143
  }, {
    start: 8025,
    length: 1,
    convRule: rule144
  }, {
    start: 8027,
    length: 1,
    convRule: rule144
  }, {
    start: 8029,
    length: 1,
    convRule: rule144
  }, {
    start: 8031,
    length: 1,
    convRule: rule144
  }, {
    start: 8032,
    length: 8,
    convRule: rule143
  }, {
    start: 8040,
    length: 8,
    convRule: rule144
  }, {
    start: 8048,
    length: 2,
    convRule: rule145
  }, {
    start: 8050,
    length: 4,
    convRule: rule146
  }, {
    start: 8054,
    length: 2,
    convRule: rule147
  }, {
    start: 8056,
    length: 2,
    convRule: rule148
  }, {
    start: 8058,
    length: 2,
    convRule: rule149
  }, {
    start: 8060,
    length: 2,
    convRule: rule150
  }, {
    start: 8064,
    length: 8,
    convRule: rule143
  }, {
    start: 8072,
    length: 8,
    convRule: rule151
  }, {
    start: 8080,
    length: 8,
    convRule: rule143
  }, {
    start: 8088,
    length: 8,
    convRule: rule151
  }, {
    start: 8096,
    length: 8,
    convRule: rule143
  }, {
    start: 8104,
    length: 8,
    convRule: rule151
  }, {
    start: 8112,
    length: 2,
    convRule: rule143
  }, {
    start: 8114,
    length: 1,
    convRule: rule20
  }, {
    start: 8115,
    length: 1,
    convRule: rule152
  }, {
    start: 8116,
    length: 1,
    convRule: rule20
  }, {
    start: 8118,
    length: 2,
    convRule: rule20
  }, {
    start: 8120,
    length: 2,
    convRule: rule144
  }, {
    start: 8122,
    length: 2,
    convRule: rule153
  }, {
    start: 8124,
    length: 1,
    convRule: rule154
  }, {
    start: 8125,
    length: 1,
    convRule: rule10
  }, {
    start: 8126,
    length: 1,
    convRule: rule155
  }, {
    start: 8127,
    length: 3,
    convRule: rule10
  }, {
    start: 8130,
    length: 1,
    convRule: rule20
  }, {
    start: 8131,
    length: 1,
    convRule: rule152
  }, {
    start: 8132,
    length: 1,
    convRule: rule20
  }, {
    start: 8134,
    length: 2,
    convRule: rule20
  }, {
    start: 8136,
    length: 4,
    convRule: rule156
  }, {
    start: 8140,
    length: 1,
    convRule: rule154
  }, {
    start: 8141,
    length: 3,
    convRule: rule10
  }, {
    start: 8144,
    length: 2,
    convRule: rule143
  }, {
    start: 8146,
    length: 2,
    convRule: rule20
  }, {
    start: 8150,
    length: 2,
    convRule: rule20
  }, {
    start: 8152,
    length: 2,
    convRule: rule144
  }, {
    start: 8154,
    length: 2,
    convRule: rule157
  }, {
    start: 8157,
    length: 3,
    convRule: rule10
  }, {
    start: 8160,
    length: 2,
    convRule: rule143
  }, {
    start: 8162,
    length: 3,
    convRule: rule20
  }, {
    start: 8165,
    length: 1,
    convRule: rule113
  }, {
    start: 8166,
    length: 2,
    convRule: rule20
  }, {
    start: 8168,
    length: 2,
    convRule: rule144
  }, {
    start: 8170,
    length: 2,
    convRule: rule158
  }, {
    start: 8172,
    length: 1,
    convRule: rule117
  }, {
    start: 8173,
    length: 3,
    convRule: rule10
  }, {
    start: 8178,
    length: 1,
    convRule: rule20
  }, {
    start: 8179,
    length: 1,
    convRule: rule152
  }, {
    start: 8180,
    length: 1,
    convRule: rule20
  }, {
    start: 8182,
    length: 2,
    convRule: rule20
  }, {
    start: 8184,
    length: 2,
    convRule: rule159
  }, {
    start: 8186,
    length: 2,
    convRule: rule160
  }, {
    start: 8188,
    length: 1,
    convRule: rule154
  }, {
    start: 8189,
    length: 2,
    convRule: rule10
  }, {
    start: 8192,
    length: 11,
    convRule: rule1
  }, {
    start: 8203,
    length: 5,
    convRule: rule16
  }, {
    start: 8208,
    length: 6,
    convRule: rule7
  }, {
    start: 8214,
    length: 2,
    convRule: rule2
  }, {
    start: 8216,
    length: 1,
    convRule: rule15
  }, {
    start: 8217,
    length: 1,
    convRule: rule19
  }, {
    start: 8218,
    length: 1,
    convRule: rule4
  }, {
    start: 8219,
    length: 2,
    convRule: rule15
  }, {
    start: 8221,
    length: 1,
    convRule: rule19
  }, {
    start: 8222,
    length: 1,
    convRule: rule4
  }, {
    start: 8223,
    length: 1,
    convRule: rule15
  }, {
    start: 8224,
    length: 8,
    convRule: rule2
  }, {
    start: 8232,
    length: 1,
    convRule: rule161
  }, {
    start: 8233,
    length: 1,
    convRule: rule162
  }, {
    start: 8234,
    length: 5,
    convRule: rule16
  }, {
    start: 8239,
    length: 1,
    convRule: rule1
  }, {
    start: 8240,
    length: 9,
    convRule: rule2
  }, {
    start: 8249,
    length: 1,
    convRule: rule15
  }, {
    start: 8250,
    length: 1,
    convRule: rule19
  }, {
    start: 8251,
    length: 4,
    convRule: rule2
  }, {
    start: 8255,
    length: 2,
    convRule: rule11
  }, {
    start: 8257,
    length: 3,
    convRule: rule2
  }, {
    start: 8260,
    length: 1,
    convRule: rule6
  }, {
    start: 8261,
    length: 1,
    convRule: rule4
  }, {
    start: 8262,
    length: 1,
    convRule: rule5
  }, {
    start: 8263,
    length: 11,
    convRule: rule2
  }, {
    start: 8274,
    length: 1,
    convRule: rule6
  }, {
    start: 8275,
    length: 1,
    convRule: rule2
  }, {
    start: 8276,
    length: 1,
    convRule: rule11
  }, {
    start: 8277,
    length: 10,
    convRule: rule2
  }, {
    start: 8287,
    length: 1,
    convRule: rule1
  }, {
    start: 8288,
    length: 5,
    convRule: rule16
  }, {
    start: 8294,
    length: 10,
    convRule: rule16
  }, {
    start: 8304,
    length: 1,
    convRule: rule17
  }, {
    start: 8305,
    length: 1,
    convRule: rule91
  }, {
    start: 8308,
    length: 6,
    convRule: rule17
  }, {
    start: 8314,
    length: 3,
    convRule: rule6
  }, {
    start: 8317,
    length: 1,
    convRule: rule4
  }, {
    start: 8318,
    length: 1,
    convRule: rule5
  }, {
    start: 8319,
    length: 1,
    convRule: rule91
  }, {
    start: 8320,
    length: 10,
    convRule: rule17
  }, {
    start: 8330,
    length: 3,
    convRule: rule6
  }, {
    start: 8333,
    length: 1,
    convRule: rule4
  }, {
    start: 8334,
    length: 1,
    convRule: rule5
  }, {
    start: 8336,
    length: 13,
    convRule: rule91
  }, {
    start: 8352,
    length: 32,
    convRule: rule3
  }, {
    start: 8400,
    length: 13,
    convRule: rule92
  }, {
    start: 8413,
    length: 4,
    convRule: rule119
  }, {
    start: 8417,
    length: 1,
    convRule: rule92
  }, {
    start: 8418,
    length: 3,
    convRule: rule119
  }, {
    start: 8421,
    length: 12,
    convRule: rule92
  }, {
    start: 8448,
    length: 2,
    convRule: rule13
  }, {
    start: 8450,
    length: 1,
    convRule: rule107
  }, {
    start: 8451,
    length: 4,
    convRule: rule13
  }, {
    start: 8455,
    length: 1,
    convRule: rule107
  }, {
    start: 8456,
    length: 2,
    convRule: rule13
  }, {
    start: 8458,
    length: 1,
    convRule: rule20
  }, {
    start: 8459,
    length: 3,
    convRule: rule107
  }, {
    start: 8462,
    length: 2,
    convRule: rule20
  }, {
    start: 8464,
    length: 3,
    convRule: rule107
  }, {
    start: 8467,
    length: 1,
    convRule: rule20
  }, {
    start: 8468,
    length: 1,
    convRule: rule13
  }, {
    start: 8469,
    length: 1,
    convRule: rule107
  }, {
    start: 8470,
    length: 2,
    convRule: rule13
  }, {
    start: 8472,
    length: 1,
    convRule: rule6
  }, {
    start: 8473,
    length: 5,
    convRule: rule107
  }, {
    start: 8478,
    length: 6,
    convRule: rule13
  }, {
    start: 8484,
    length: 1,
    convRule: rule107
  }, {
    start: 8485,
    length: 1,
    convRule: rule13
  }, {
    start: 8486,
    length: 1,
    convRule: rule163
  }, {
    start: 8487,
    length: 1,
    convRule: rule13
  }, {
    start: 8488,
    length: 1,
    convRule: rule107
  }, {
    start: 8489,
    length: 1,
    convRule: rule13
  }, {
    start: 8490,
    length: 1,
    convRule: rule164
  }, {
    start: 8491,
    length: 1,
    convRule: rule165
  }, {
    start: 8492,
    length: 2,
    convRule: rule107
  }, {
    start: 8494,
    length: 1,
    convRule: rule13
  }, {
    start: 8495,
    length: 1,
    convRule: rule20
  }, {
    start: 8496,
    length: 2,
    convRule: rule107
  }, {
    start: 8498,
    length: 1,
    convRule: rule166
  }, {
    start: 8499,
    length: 1,
    convRule: rule107
  }, {
    start: 8500,
    length: 1,
    convRule: rule20
  }, {
    start: 8501,
    length: 4,
    convRule: rule14
  }, {
    start: 8505,
    length: 1,
    convRule: rule20
  }, {
    start: 8506,
    length: 2,
    convRule: rule13
  }, {
    start: 8508,
    length: 2,
    convRule: rule20
  }, {
    start: 8510,
    length: 2,
    convRule: rule107
  }, {
    start: 8512,
    length: 5,
    convRule: rule6
  }, {
    start: 8517,
    length: 1,
    convRule: rule107
  }, {
    start: 8518,
    length: 4,
    convRule: rule20
  }, {
    start: 8522,
    length: 1,
    convRule: rule13
  }, {
    start: 8523,
    length: 1,
    convRule: rule6
  }, {
    start: 8524,
    length: 2,
    convRule: rule13
  }, {
    start: 8526,
    length: 1,
    convRule: rule167
  }, {
    start: 8527,
    length: 1,
    convRule: rule13
  }, {
    start: 8528,
    length: 16,
    convRule: rule17
  }, {
    start: 8544,
    length: 16,
    convRule: rule168
  }, {
    start: 8560,
    length: 16,
    convRule: rule169
  }, {
    start: 8576,
    length: 3,
    convRule: rule128
  }, {
    start: 8579,
    length: 1,
    convRule: rule22
  }, {
    start: 8580,
    length: 1,
    convRule: rule23
  }, {
    start: 8581,
    length: 4,
    convRule: rule128
  }, {
    start: 8585,
    length: 1,
    convRule: rule17
  }, {
    start: 8586,
    length: 2,
    convRule: rule13
  }, {
    start: 8592,
    length: 5,
    convRule: rule6
  }, {
    start: 8597,
    length: 5,
    convRule: rule13
  }, {
    start: 8602,
    length: 2,
    convRule: rule6
  }, {
    start: 8604,
    length: 4,
    convRule: rule13
  }, {
    start: 8608,
    length: 1,
    convRule: rule6
  }, {
    start: 8609,
    length: 2,
    convRule: rule13
  }, {
    start: 8611,
    length: 1,
    convRule: rule6
  }, {
    start: 8612,
    length: 2,
    convRule: rule13
  }, {
    start: 8614,
    length: 1,
    convRule: rule6
  }, {
    start: 8615,
    length: 7,
    convRule: rule13
  }, {
    start: 8622,
    length: 1,
    convRule: rule6
  }, {
    start: 8623,
    length: 31,
    convRule: rule13
  }, {
    start: 8654,
    length: 2,
    convRule: rule6
  }, {
    start: 8656,
    length: 2,
    convRule: rule13
  }, {
    start: 8658,
    length: 1,
    convRule: rule6
  }, {
    start: 8659,
    length: 1,
    convRule: rule13
  }, {
    start: 8660,
    length: 1,
    convRule: rule6
  }, {
    start: 8661,
    length: 31,
    convRule: rule13
  }, {
    start: 8692,
    length: 268,
    convRule: rule6
  }, {
    start: 8960,
    length: 8,
    convRule: rule13
  }, {
    start: 8968,
    length: 1,
    convRule: rule4
  }, {
    start: 8969,
    length: 1,
    convRule: rule5
  }, {
    start: 8970,
    length: 1,
    convRule: rule4
  }, {
    start: 8971,
    length: 1,
    convRule: rule5
  }, {
    start: 8972,
    length: 20,
    convRule: rule13
  }, {
    start: 8992,
    length: 2,
    convRule: rule6
  }, {
    start: 8994,
    length: 7,
    convRule: rule13
  }, {
    start: 9001,
    length: 1,
    convRule: rule4
  }, {
    start: 9002,
    length: 1,
    convRule: rule5
  }, {
    start: 9003,
    length: 81,
    convRule: rule13
  }, {
    start: 9084,
    length: 1,
    convRule: rule6
  }, {
    start: 9085,
    length: 30,
    convRule: rule13
  }, {
    start: 9115,
    length: 25,
    convRule: rule6
  }, {
    start: 9140,
    length: 40,
    convRule: rule13
  }, {
    start: 9180,
    length: 6,
    convRule: rule6
  }, {
    start: 9186,
    length: 69,
    convRule: rule13
  }, {
    start: 9280,
    length: 11,
    convRule: rule13
  }, {
    start: 9312,
    length: 60,
    convRule: rule17
  }, {
    start: 9372,
    length: 26,
    convRule: rule13
  }, {
    start: 9398,
    length: 26,
    convRule: rule170
  }, {
    start: 9424,
    length: 26,
    convRule: rule171
  }, {
    start: 9450,
    length: 22,
    convRule: rule17
  }, {
    start: 9472,
    length: 183,
    convRule: rule13
  }, {
    start: 9655,
    length: 1,
    convRule: rule6
  }, {
    start: 9656,
    length: 9,
    convRule: rule13
  }, {
    start: 9665,
    length: 1,
    convRule: rule6
  }, {
    start: 9666,
    length: 54,
    convRule: rule13
  }, {
    start: 9720,
    length: 8,
    convRule: rule6
  }, {
    start: 9728,
    length: 111,
    convRule: rule13
  }, {
    start: 9839,
    length: 1,
    convRule: rule6
  }, {
    start: 9840,
    length: 248,
    convRule: rule13
  }, {
    start: 10088,
    length: 1,
    convRule: rule4
  }, {
    start: 10089,
    length: 1,
    convRule: rule5
  }, {
    start: 10090,
    length: 1,
    convRule: rule4
  }, {
    start: 10091,
    length: 1,
    convRule: rule5
  }, {
    start: 10092,
    length: 1,
    convRule: rule4
  }, {
    start: 10093,
    length: 1,
    convRule: rule5
  }, {
    start: 10094,
    length: 1,
    convRule: rule4
  }, {
    start: 10095,
    length: 1,
    convRule: rule5
  }, {
    start: 10096,
    length: 1,
    convRule: rule4
  }, {
    start: 10097,
    length: 1,
    convRule: rule5
  }, {
    start: 10098,
    length: 1,
    convRule: rule4
  }, {
    start: 10099,
    length: 1,
    convRule: rule5
  }, {
    start: 10100,
    length: 1,
    convRule: rule4
  }, {
    start: 10101,
    length: 1,
    convRule: rule5
  }, {
    start: 10102,
    length: 30,
    convRule: rule17
  }, {
    start: 10132,
    length: 44,
    convRule: rule13
  }, {
    start: 10176,
    length: 5,
    convRule: rule6
  }, {
    start: 10181,
    length: 1,
    convRule: rule4
  }, {
    start: 10182,
    length: 1,
    convRule: rule5
  }, {
    start: 10183,
    length: 31,
    convRule: rule6
  }, {
    start: 10214,
    length: 1,
    convRule: rule4
  }, {
    start: 10215,
    length: 1,
    convRule: rule5
  }, {
    start: 10216,
    length: 1,
    convRule: rule4
  }, {
    start: 10217,
    length: 1,
    convRule: rule5
  }, {
    start: 10218,
    length: 1,
    convRule: rule4
  }, {
    start: 10219,
    length: 1,
    convRule: rule5
  }, {
    start: 10220,
    length: 1,
    convRule: rule4
  }, {
    start: 10221,
    length: 1,
    convRule: rule5
  }, {
    start: 10222,
    length: 1,
    convRule: rule4
  }, {
    start: 10223,
    length: 1,
    convRule: rule5
  }, {
    start: 10224,
    length: 16,
    convRule: rule6
  }, {
    start: 10240,
    length: 256,
    convRule: rule13
  }, {
    start: 10496,
    length: 131,
    convRule: rule6
  }, {
    start: 10627,
    length: 1,
    convRule: rule4
  }, {
    start: 10628,
    length: 1,
    convRule: rule5
  }, {
    start: 10629,
    length: 1,
    convRule: rule4
  }, {
    start: 10630,
    length: 1,
    convRule: rule5
  }, {
    start: 10631,
    length: 1,
    convRule: rule4
  }, {
    start: 10632,
    length: 1,
    convRule: rule5
  }, {
    start: 10633,
    length: 1,
    convRule: rule4
  }, {
    start: 10634,
    length: 1,
    convRule: rule5
  }, {
    start: 10635,
    length: 1,
    convRule: rule4
  }, {
    start: 10636,
    length: 1,
    convRule: rule5
  }, {
    start: 10637,
    length: 1,
    convRule: rule4
  }, {
    start: 10638,
    length: 1,
    convRule: rule5
  }, {
    start: 10639,
    length: 1,
    convRule: rule4
  }, {
    start: 10640,
    length: 1,
    convRule: rule5
  }, {
    start: 10641,
    length: 1,
    convRule: rule4
  }, {
    start: 10642,
    length: 1,
    convRule: rule5
  }, {
    start: 10643,
    length: 1,
    convRule: rule4
  }, {
    start: 10644,
    length: 1,
    convRule: rule5
  }, {
    start: 10645,
    length: 1,
    convRule: rule4
  }, {
    start: 10646,
    length: 1,
    convRule: rule5
  }, {
    start: 10647,
    length: 1,
    convRule: rule4
  }, {
    start: 10648,
    length: 1,
    convRule: rule5
  }, {
    start: 10649,
    length: 63,
    convRule: rule6
  }, {
    start: 10712,
    length: 1,
    convRule: rule4
  }, {
    start: 10713,
    length: 1,
    convRule: rule5
  }, {
    start: 10714,
    length: 1,
    convRule: rule4
  }, {
    start: 10715,
    length: 1,
    convRule: rule5
  }, {
    start: 10716,
    length: 32,
    convRule: rule6
  }, {
    start: 10748,
    length: 1,
    convRule: rule4
  }, {
    start: 10749,
    length: 1,
    convRule: rule5
  }, {
    start: 10750,
    length: 258,
    convRule: rule6
  }, {
    start: 11008,
    length: 48,
    convRule: rule13
  }, {
    start: 11056,
    length: 21,
    convRule: rule6
  }, {
    start: 11077,
    length: 2,
    convRule: rule13
  }, {
    start: 11079,
    length: 6,
    convRule: rule6
  }, {
    start: 11085,
    length: 39,
    convRule: rule13
  }, {
    start: 11126,
    length: 32,
    convRule: rule13
  }, {
    start: 11159,
    length: 105,
    convRule: rule13
  }, {
    start: 11264,
    length: 47,
    convRule: rule122
  }, {
    start: 11312,
    length: 47,
    convRule: rule123
  }, {
    start: 11360,
    length: 1,
    convRule: rule22
  }, {
    start: 11361,
    length: 1,
    convRule: rule23
  }, {
    start: 11362,
    length: 1,
    convRule: rule172
  }, {
    start: 11363,
    length: 1,
    convRule: rule173
  }, {
    start: 11364,
    length: 1,
    convRule: rule174
  }, {
    start: 11365,
    length: 1,
    convRule: rule175
  }, {
    start: 11366,
    length: 1,
    convRule: rule176
  }, {
    start: 11367,
    length: 1,
    convRule: rule22
  }, {
    start: 11368,
    length: 1,
    convRule: rule23
  }, {
    start: 11369,
    length: 1,
    convRule: rule22
  }, {
    start: 11370,
    length: 1,
    convRule: rule23
  }, {
    start: 11371,
    length: 1,
    convRule: rule22
  }, {
    start: 11372,
    length: 1,
    convRule: rule23
  }, {
    start: 11373,
    length: 1,
    convRule: rule177
  }, {
    start: 11374,
    length: 1,
    convRule: rule178
  }, {
    start: 11375,
    length: 1,
    convRule: rule179
  }, {
    start: 11376,
    length: 1,
    convRule: rule180
  }, {
    start: 11377,
    length: 1,
    convRule: rule20
  }, {
    start: 11378,
    length: 1,
    convRule: rule22
  }, {
    start: 11379,
    length: 1,
    convRule: rule23
  }, {
    start: 11380,
    length: 1,
    convRule: rule20
  }, {
    start: 11381,
    length: 1,
    convRule: rule22
  }, {
    start: 11382,
    length: 1,
    convRule: rule23
  }, {
    start: 11383,
    length: 5,
    convRule: rule20
  }, {
    start: 11388,
    length: 2,
    convRule: rule91
  }, {
    start: 11390,
    length: 2,
    convRule: rule181
  }, {
    start: 11392,
    length: 1,
    convRule: rule22
  }, {
    start: 11393,
    length: 1,
    convRule: rule23
  }, {
    start: 11394,
    length: 1,
    convRule: rule22
  }, {
    start: 11395,
    length: 1,
    convRule: rule23
  }, {
    start: 11396,
    length: 1,
    convRule: rule22
  }, {
    start: 11397,
    length: 1,
    convRule: rule23
  }, {
    start: 11398,
    length: 1,
    convRule: rule22
  }, {
    start: 11399,
    length: 1,
    convRule: rule23
  }, {
    start: 11400,
    length: 1,
    convRule: rule22
  }, {
    start: 11401,
    length: 1,
    convRule: rule23
  }, {
    start: 11402,
    length: 1,
    convRule: rule22
  }, {
    start: 11403,
    length: 1,
    convRule: rule23
  }, {
    start: 11404,
    length: 1,
    convRule: rule22
  }, {
    start: 11405,
    length: 1,
    convRule: rule23
  }, {
    start: 11406,
    length: 1,
    convRule: rule22
  }, {
    start: 11407,
    length: 1,
    convRule: rule23
  }, {
    start: 11408,
    length: 1,
    convRule: rule22
  }, {
    start: 11409,
    length: 1,
    convRule: rule23
  }, {
    start: 11410,
    length: 1,
    convRule: rule22
  }, {
    start: 11411,
    length: 1,
    convRule: rule23
  }, {
    start: 11412,
    length: 1,
    convRule: rule22
  }, {
    start: 11413,
    length: 1,
    convRule: rule23
  }, {
    start: 11414,
    length: 1,
    convRule: rule22
  }, {
    start: 11415,
    length: 1,
    convRule: rule23
  }, {
    start: 11416,
    length: 1,
    convRule: rule22
  }, {
    start: 11417,
    length: 1,
    convRule: rule23
  }, {
    start: 11418,
    length: 1,
    convRule: rule22
  }, {
    start: 11419,
    length: 1,
    convRule: rule23
  }, {
    start: 11420,
    length: 1,
    convRule: rule22
  }, {
    start: 11421,
    length: 1,
    convRule: rule23
  }, {
    start: 11422,
    length: 1,
    convRule: rule22
  }, {
    start: 11423,
    length: 1,
    convRule: rule23
  }, {
    start: 11424,
    length: 1,
    convRule: rule22
  }, {
    start: 11425,
    length: 1,
    convRule: rule23
  }, {
    start: 11426,
    length: 1,
    convRule: rule22
  }, {
    start: 11427,
    length: 1,
    convRule: rule23
  }, {
    start: 11428,
    length: 1,
    convRule: rule22
  }, {
    start: 11429,
    length: 1,
    convRule: rule23
  }, {
    start: 11430,
    length: 1,
    convRule: rule22
  }, {
    start: 11431,
    length: 1,
    convRule: rule23
  }, {
    start: 11432,
    length: 1,
    convRule: rule22
  }, {
    start: 11433,
    length: 1,
    convRule: rule23
  }, {
    start: 11434,
    length: 1,
    convRule: rule22
  }, {
    start: 11435,
    length: 1,
    convRule: rule23
  }, {
    start: 11436,
    length: 1,
    convRule: rule22
  }, {
    start: 11437,
    length: 1,
    convRule: rule23
  }, {
    start: 11438,
    length: 1,
    convRule: rule22
  }, {
    start: 11439,
    length: 1,
    convRule: rule23
  }, {
    start: 11440,
    length: 1,
    convRule: rule22
  }, {
    start: 11441,
    length: 1,
    convRule: rule23
  }, {
    start: 11442,
    length: 1,
    convRule: rule22
  }, {
    start: 11443,
    length: 1,
    convRule: rule23
  }, {
    start: 11444,
    length: 1,
    convRule: rule22
  }, {
    start: 11445,
    length: 1,
    convRule: rule23
  }, {
    start: 11446,
    length: 1,
    convRule: rule22
  }, {
    start: 11447,
    length: 1,
    convRule: rule23
  }, {
    start: 11448,
    length: 1,
    convRule: rule22
  }, {
    start: 11449,
    length: 1,
    convRule: rule23
  }, {
    start: 11450,
    length: 1,
    convRule: rule22
  }, {
    start: 11451,
    length: 1,
    convRule: rule23
  }, {
    start: 11452,
    length: 1,
    convRule: rule22
  }, {
    start: 11453,
    length: 1,
    convRule: rule23
  }, {
    start: 11454,
    length: 1,
    convRule: rule22
  }, {
    start: 11455,
    length: 1,
    convRule: rule23
  }, {
    start: 11456,
    length: 1,
    convRule: rule22
  }, {
    start: 11457,
    length: 1,
    convRule: rule23
  }, {
    start: 11458,
    length: 1,
    convRule: rule22
  }, {
    start: 11459,
    length: 1,
    convRule: rule23
  }, {
    start: 11460,
    length: 1,
    convRule: rule22
  }, {
    start: 11461,
    length: 1,
    convRule: rule23
  }, {
    start: 11462,
    length: 1,
    convRule: rule22
  }, {
    start: 11463,
    length: 1,
    convRule: rule23
  }, {
    start: 11464,
    length: 1,
    convRule: rule22
  }, {
    start: 11465,
    length: 1,
    convRule: rule23
  }, {
    start: 11466,
    length: 1,
    convRule: rule22
  }, {
    start: 11467,
    length: 1,
    convRule: rule23
  }, {
    start: 11468,
    length: 1,
    convRule: rule22
  }, {
    start: 11469,
    length: 1,
    convRule: rule23
  }, {
    start: 11470,
    length: 1,
    convRule: rule22
  }, {
    start: 11471,
    length: 1,
    convRule: rule23
  }, {
    start: 11472,
    length: 1,
    convRule: rule22
  }, {
    start: 11473,
    length: 1,
    convRule: rule23
  }, {
    start: 11474,
    length: 1,
    convRule: rule22
  }, {
    start: 11475,
    length: 1,
    convRule: rule23
  }, {
    start: 11476,
    length: 1,
    convRule: rule22
  }, {
    start: 11477,
    length: 1,
    convRule: rule23
  }, {
    start: 11478,
    length: 1,
    convRule: rule22
  }, {
    start: 11479,
    length: 1,
    convRule: rule23
  }, {
    start: 11480,
    length: 1,
    convRule: rule22
  }, {
    start: 11481,
    length: 1,
    convRule: rule23
  }, {
    start: 11482,
    length: 1,
    convRule: rule22
  }, {
    start: 11483,
    length: 1,
    convRule: rule23
  }, {
    start: 11484,
    length: 1,
    convRule: rule22
  }, {
    start: 11485,
    length: 1,
    convRule: rule23
  }, {
    start: 11486,
    length: 1,
    convRule: rule22
  }, {
    start: 11487,
    length: 1,
    convRule: rule23
  }, {
    start: 11488,
    length: 1,
    convRule: rule22
  }, {
    start: 11489,
    length: 1,
    convRule: rule23
  }, {
    start: 11490,
    length: 1,
    convRule: rule22
  }, {
    start: 11491,
    length: 1,
    convRule: rule23
  }, {
    start: 11492,
    length: 1,
    convRule: rule20
  }, {
    start: 11493,
    length: 6,
    convRule: rule13
  }, {
    start: 11499,
    length: 1,
    convRule: rule22
  }, {
    start: 11500,
    length: 1,
    convRule: rule23
  }, {
    start: 11501,
    length: 1,
    convRule: rule22
  }, {
    start: 11502,
    length: 1,
    convRule: rule23
  }, {
    start: 11503,
    length: 3,
    convRule: rule92
  }, {
    start: 11506,
    length: 1,
    convRule: rule22
  }, {
    start: 11507,
    length: 1,
    convRule: rule23
  }, {
    start: 11513,
    length: 4,
    convRule: rule2
  }, {
    start: 11517,
    length: 1,
    convRule: rule17
  }, {
    start: 11518,
    length: 2,
    convRule: rule2
  }, {
    start: 11520,
    length: 38,
    convRule: rule182
  }, {
    start: 11559,
    length: 1,
    convRule: rule182
  }, {
    start: 11565,
    length: 1,
    convRule: rule182
  }, {
    start: 11568,
    length: 56,
    convRule: rule14
  }, {
    start: 11631,
    length: 1,
    convRule: rule91
  }, {
    start: 11632,
    length: 1,
    convRule: rule2
  }, {
    start: 11647,
    length: 1,
    convRule: rule92
  }, {
    start: 11648,
    length: 23,
    convRule: rule14
  }, {
    start: 11680,
    length: 7,
    convRule: rule14
  }, {
    start: 11688,
    length: 7,
    convRule: rule14
  }, {
    start: 11696,
    length: 7,
    convRule: rule14
  }, {
    start: 11704,
    length: 7,
    convRule: rule14
  }, {
    start: 11712,
    length: 7,
    convRule: rule14
  }, {
    start: 11720,
    length: 7,
    convRule: rule14
  }, {
    start: 11728,
    length: 7,
    convRule: rule14
  }, {
    start: 11736,
    length: 7,
    convRule: rule14
  }, {
    start: 11744,
    length: 32,
    convRule: rule92
  }, {
    start: 11776,
    length: 2,
    convRule: rule2
  }, {
    start: 11778,
    length: 1,
    convRule: rule15
  }, {
    start: 11779,
    length: 1,
    convRule: rule19
  }, {
    start: 11780,
    length: 1,
    convRule: rule15
  }, {
    start: 11781,
    length: 1,
    convRule: rule19
  }, {
    start: 11782,
    length: 3,
    convRule: rule2
  }, {
    start: 11785,
    length: 1,
    convRule: rule15
  }, {
    start: 11786,
    length: 1,
    convRule: rule19
  }, {
    start: 11787,
    length: 1,
    convRule: rule2
  }, {
    start: 11788,
    length: 1,
    convRule: rule15
  }, {
    start: 11789,
    length: 1,
    convRule: rule19
  }, {
    start: 11790,
    length: 9,
    convRule: rule2
  }, {
    start: 11799,
    length: 1,
    convRule: rule7
  }, {
    start: 11800,
    length: 2,
    convRule: rule2
  }, {
    start: 11802,
    length: 1,
    convRule: rule7
  }, {
    start: 11803,
    length: 1,
    convRule: rule2
  }, {
    start: 11804,
    length: 1,
    convRule: rule15
  }, {
    start: 11805,
    length: 1,
    convRule: rule19
  }, {
    start: 11806,
    length: 2,
    convRule: rule2
  }, {
    start: 11808,
    length: 1,
    convRule: rule15
  }, {
    start: 11809,
    length: 1,
    convRule: rule19
  }, {
    start: 11810,
    length: 1,
    convRule: rule4
  }, {
    start: 11811,
    length: 1,
    convRule: rule5
  }, {
    start: 11812,
    length: 1,
    convRule: rule4
  }, {
    start: 11813,
    length: 1,
    convRule: rule5
  }, {
    start: 11814,
    length: 1,
    convRule: rule4
  }, {
    start: 11815,
    length: 1,
    convRule: rule5
  }, {
    start: 11816,
    length: 1,
    convRule: rule4
  }, {
    start: 11817,
    length: 1,
    convRule: rule5
  }, {
    start: 11818,
    length: 5,
    convRule: rule2
  }, {
    start: 11823,
    length: 1,
    convRule: rule91
  }, {
    start: 11824,
    length: 10,
    convRule: rule2
  }, {
    start: 11834,
    length: 2,
    convRule: rule7
  }, {
    start: 11836,
    length: 4,
    convRule: rule2
  }, {
    start: 11840,
    length: 1,
    convRule: rule7
  }, {
    start: 11841,
    length: 1,
    convRule: rule2
  }, {
    start: 11842,
    length: 1,
    convRule: rule4
  }, {
    start: 11843,
    length: 13,
    convRule: rule2
  }, {
    start: 11856,
    length: 2,
    convRule: rule13
  }, {
    start: 11858,
    length: 1,
    convRule: rule2
  }, {
    start: 11904,
    length: 26,
    convRule: rule13
  }, {
    start: 11931,
    length: 89,
    convRule: rule13
  }, {
    start: 12032,
    length: 214,
    convRule: rule13
  }, {
    start: 12272,
    length: 12,
    convRule: rule13
  }, {
    start: 12288,
    length: 1,
    convRule: rule1
  }, {
    start: 12289,
    length: 3,
    convRule: rule2
  }, {
    start: 12292,
    length: 1,
    convRule: rule13
  }, {
    start: 12293,
    length: 1,
    convRule: rule91
  }, {
    start: 12294,
    length: 1,
    convRule: rule14
  }, {
    start: 12295,
    length: 1,
    convRule: rule128
  }, {
    start: 12296,
    length: 1,
    convRule: rule4
  }, {
    start: 12297,
    length: 1,
    convRule: rule5
  }, {
    start: 12298,
    length: 1,
    convRule: rule4
  }, {
    start: 12299,
    length: 1,
    convRule: rule5
  }, {
    start: 12300,
    length: 1,
    convRule: rule4
  }, {
    start: 12301,
    length: 1,
    convRule: rule5
  }, {
    start: 12302,
    length: 1,
    convRule: rule4
  }, {
    start: 12303,
    length: 1,
    convRule: rule5
  }, {
    start: 12304,
    length: 1,
    convRule: rule4
  }, {
    start: 12305,
    length: 1,
    convRule: rule5
  }, {
    start: 12306,
    length: 2,
    convRule: rule13
  }, {
    start: 12308,
    length: 1,
    convRule: rule4
  }, {
    start: 12309,
    length: 1,
    convRule: rule5
  }, {
    start: 12310,
    length: 1,
    convRule: rule4
  }, {
    start: 12311,
    length: 1,
    convRule: rule5
  }, {
    start: 12312,
    length: 1,
    convRule: rule4
  }, {
    start: 12313,
    length: 1,
    convRule: rule5
  }, {
    start: 12314,
    length: 1,
    convRule: rule4
  }, {
    start: 12315,
    length: 1,
    convRule: rule5
  }, {
    start: 12316,
    length: 1,
    convRule: rule7
  }, {
    start: 12317,
    length: 1,
    convRule: rule4
  }, {
    start: 12318,
    length: 2,
    convRule: rule5
  }, {
    start: 12320,
    length: 1,
    convRule: rule13
  }, {
    start: 12321,
    length: 9,
    convRule: rule128
  }, {
    start: 12330,
    length: 4,
    convRule: rule92
  }, {
    start: 12334,
    length: 2,
    convRule: rule124
  }, {
    start: 12336,
    length: 1,
    convRule: rule7
  }, {
    start: 12337,
    length: 5,
    convRule: rule91
  }, {
    start: 12342,
    length: 2,
    convRule: rule13
  }, {
    start: 12344,
    length: 3,
    convRule: rule128
  }, {
    start: 12347,
    length: 1,
    convRule: rule91
  }, {
    start: 12348,
    length: 1,
    convRule: rule14
  }, {
    start: 12349,
    length: 1,
    convRule: rule2
  }, {
    start: 12350,
    length: 2,
    convRule: rule13
  }, {
    start: 12353,
    length: 86,
    convRule: rule14
  }, {
    start: 12441,
    length: 2,
    convRule: rule92
  }, {
    start: 12443,
    length: 2,
    convRule: rule10
  }, {
    start: 12445,
    length: 2,
    convRule: rule91
  }, {
    start: 12447,
    length: 1,
    convRule: rule14
  }, {
    start: 12448,
    length: 1,
    convRule: rule7
  }, {
    start: 12449,
    length: 90,
    convRule: rule14
  }, {
    start: 12539,
    length: 1,
    convRule: rule2
  }, {
    start: 12540,
    length: 3,
    convRule: rule91
  }, {
    start: 12543,
    length: 1,
    convRule: rule14
  }, {
    start: 12549,
    length: 43,
    convRule: rule14
  }, {
    start: 12593,
    length: 94,
    convRule: rule14
  }, {
    start: 12688,
    length: 2,
    convRule: rule13
  }, {
    start: 12690,
    length: 4,
    convRule: rule17
  }, {
    start: 12694,
    length: 10,
    convRule: rule13
  }, {
    start: 12704,
    length: 32,
    convRule: rule14
  }, {
    start: 12736,
    length: 36,
    convRule: rule13
  }, {
    start: 12784,
    length: 16,
    convRule: rule14
  }, {
    start: 12800,
    length: 31,
    convRule: rule13
  }, {
    start: 12832,
    length: 10,
    convRule: rule17
  }, {
    start: 12842,
    length: 30,
    convRule: rule13
  }, {
    start: 12872,
    length: 8,
    convRule: rule17
  }, {
    start: 12880,
    length: 1,
    convRule: rule13
  }, {
    start: 12881,
    length: 15,
    convRule: rule17
  }, {
    start: 12896,
    length: 32,
    convRule: rule13
  }, {
    start: 12928,
    length: 10,
    convRule: rule17
  }, {
    start: 12938,
    length: 39,
    convRule: rule13
  }, {
    start: 12977,
    length: 15,
    convRule: rule17
  }, {
    start: 12992,
    length: 320,
    convRule: rule13
  }, {
    start: 13312,
    length: 6592,
    convRule: rule14
  }, {
    start: 19904,
    length: 64,
    convRule: rule13
  }, {
    start: 19968,
    length: 20989,
    convRule: rule14
  }, {
    start: 40960,
    length: 21,
    convRule: rule14
  }, {
    start: 40981,
    length: 1,
    convRule: rule91
  }, {
    start: 40982,
    length: 1143,
    convRule: rule14
  }, {
    start: 42128,
    length: 55,
    convRule: rule13
  }, {
    start: 42192,
    length: 40,
    convRule: rule14
  }, {
    start: 42232,
    length: 6,
    convRule: rule91
  }, {
    start: 42238,
    length: 2,
    convRule: rule2
  }, {
    start: 42240,
    length: 268,
    convRule: rule14
  }, {
    start: 42508,
    length: 1,
    convRule: rule91
  }, {
    start: 42509,
    length: 3,
    convRule: rule2
  }, {
    start: 42512,
    length: 16,
    convRule: rule14
  }, {
    start: 42528,
    length: 10,
    convRule: rule8
  }, {
    start: 42538,
    length: 2,
    convRule: rule14
  }, {
    start: 42560,
    length: 1,
    convRule: rule22
  }, {
    start: 42561,
    length: 1,
    convRule: rule23
  }, {
    start: 42562,
    length: 1,
    convRule: rule22
  }, {
    start: 42563,
    length: 1,
    convRule: rule23
  }, {
    start: 42564,
    length: 1,
    convRule: rule22
  }, {
    start: 42565,
    length: 1,
    convRule: rule23
  }, {
    start: 42566,
    length: 1,
    convRule: rule22
  }, {
    start: 42567,
    length: 1,
    convRule: rule23
  }, {
    start: 42568,
    length: 1,
    convRule: rule22
  }, {
    start: 42569,
    length: 1,
    convRule: rule23
  }, {
    start: 42570,
    length: 1,
    convRule: rule22
  }, {
    start: 42571,
    length: 1,
    convRule: rule23
  }, {
    start: 42572,
    length: 1,
    convRule: rule22
  }, {
    start: 42573,
    length: 1,
    convRule: rule23
  }, {
    start: 42574,
    length: 1,
    convRule: rule22
  }, {
    start: 42575,
    length: 1,
    convRule: rule23
  }, {
    start: 42576,
    length: 1,
    convRule: rule22
  }, {
    start: 42577,
    length: 1,
    convRule: rule23
  }, {
    start: 42578,
    length: 1,
    convRule: rule22
  }, {
    start: 42579,
    length: 1,
    convRule: rule23
  }, {
    start: 42580,
    length: 1,
    convRule: rule22
  }, {
    start: 42581,
    length: 1,
    convRule: rule23
  }, {
    start: 42582,
    length: 1,
    convRule: rule22
  }, {
    start: 42583,
    length: 1,
    convRule: rule23
  }, {
    start: 42584,
    length: 1,
    convRule: rule22
  }, {
    start: 42585,
    length: 1,
    convRule: rule23
  }, {
    start: 42586,
    length: 1,
    convRule: rule22
  }, {
    start: 42587,
    length: 1,
    convRule: rule23
  }, {
    start: 42588,
    length: 1,
    convRule: rule22
  }, {
    start: 42589,
    length: 1,
    convRule: rule23
  }, {
    start: 42590,
    length: 1,
    convRule: rule22
  }, {
    start: 42591,
    length: 1,
    convRule: rule23
  }, {
    start: 42592,
    length: 1,
    convRule: rule22
  }, {
    start: 42593,
    length: 1,
    convRule: rule23
  }, {
    start: 42594,
    length: 1,
    convRule: rule22
  }, {
    start: 42595,
    length: 1,
    convRule: rule23
  }, {
    start: 42596,
    length: 1,
    convRule: rule22
  }, {
    start: 42597,
    length: 1,
    convRule: rule23
  }, {
    start: 42598,
    length: 1,
    convRule: rule22
  }, {
    start: 42599,
    length: 1,
    convRule: rule23
  }, {
    start: 42600,
    length: 1,
    convRule: rule22
  }, {
    start: 42601,
    length: 1,
    convRule: rule23
  }, {
    start: 42602,
    length: 1,
    convRule: rule22
  }, {
    start: 42603,
    length: 1,
    convRule: rule23
  }, {
    start: 42604,
    length: 1,
    convRule: rule22
  }, {
    start: 42605,
    length: 1,
    convRule: rule23
  }, {
    start: 42606,
    length: 1,
    convRule: rule14
  }, {
    start: 42607,
    length: 1,
    convRule: rule92
  }, {
    start: 42608,
    length: 3,
    convRule: rule119
  }, {
    start: 42611,
    length: 1,
    convRule: rule2
  }, {
    start: 42612,
    length: 10,
    convRule: rule92
  }, {
    start: 42622,
    length: 1,
    convRule: rule2
  }, {
    start: 42623,
    length: 1,
    convRule: rule91
  }, {
    start: 42624,
    length: 1,
    convRule: rule22
  }, {
    start: 42625,
    length: 1,
    convRule: rule23
  }, {
    start: 42626,
    length: 1,
    convRule: rule22
  }, {
    start: 42627,
    length: 1,
    convRule: rule23
  }, {
    start: 42628,
    length: 1,
    convRule: rule22
  }, {
    start: 42629,
    length: 1,
    convRule: rule23
  }, {
    start: 42630,
    length: 1,
    convRule: rule22
  }, {
    start: 42631,
    length: 1,
    convRule: rule23
  }, {
    start: 42632,
    length: 1,
    convRule: rule22
  }, {
    start: 42633,
    length: 1,
    convRule: rule23
  }, {
    start: 42634,
    length: 1,
    convRule: rule22
  }, {
    start: 42635,
    length: 1,
    convRule: rule23
  }, {
    start: 42636,
    length: 1,
    convRule: rule22
  }, {
    start: 42637,
    length: 1,
    convRule: rule23
  }, {
    start: 42638,
    length: 1,
    convRule: rule22
  }, {
    start: 42639,
    length: 1,
    convRule: rule23
  }, {
    start: 42640,
    length: 1,
    convRule: rule22
  }, {
    start: 42641,
    length: 1,
    convRule: rule23
  }, {
    start: 42642,
    length: 1,
    convRule: rule22
  }, {
    start: 42643,
    length: 1,
    convRule: rule23
  }, {
    start: 42644,
    length: 1,
    convRule: rule22
  }, {
    start: 42645,
    length: 1,
    convRule: rule23
  }, {
    start: 42646,
    length: 1,
    convRule: rule22
  }, {
    start: 42647,
    length: 1,
    convRule: rule23
  }, {
    start: 42648,
    length: 1,
    convRule: rule22
  }, {
    start: 42649,
    length: 1,
    convRule: rule23
  }, {
    start: 42650,
    length: 1,
    convRule: rule22
  }, {
    start: 42651,
    length: 1,
    convRule: rule23
  }, {
    start: 42652,
    length: 2,
    convRule: rule91
  }, {
    start: 42654,
    length: 2,
    convRule: rule92
  }, {
    start: 42656,
    length: 70,
    convRule: rule14
  }, {
    start: 42726,
    length: 10,
    convRule: rule128
  }, {
    start: 42736,
    length: 2,
    convRule: rule92
  }, {
    start: 42738,
    length: 6,
    convRule: rule2
  }, {
    start: 42752,
    length: 23,
    convRule: rule10
  }, {
    start: 42775,
    length: 9,
    convRule: rule91
  }, {
    start: 42784,
    length: 2,
    convRule: rule10
  }, {
    start: 42786,
    length: 1,
    convRule: rule22
  }, {
    start: 42787,
    length: 1,
    convRule: rule23
  }, {
    start: 42788,
    length: 1,
    convRule: rule22
  }, {
    start: 42789,
    length: 1,
    convRule: rule23
  }, {
    start: 42790,
    length: 1,
    convRule: rule22
  }, {
    start: 42791,
    length: 1,
    convRule: rule23
  }, {
    start: 42792,
    length: 1,
    convRule: rule22
  }, {
    start: 42793,
    length: 1,
    convRule: rule23
  }, {
    start: 42794,
    length: 1,
    convRule: rule22
  }, {
    start: 42795,
    length: 1,
    convRule: rule23
  }, {
    start: 42796,
    length: 1,
    convRule: rule22
  }, {
    start: 42797,
    length: 1,
    convRule: rule23
  }, {
    start: 42798,
    length: 1,
    convRule: rule22
  }, {
    start: 42799,
    length: 1,
    convRule: rule23
  }, {
    start: 42800,
    length: 2,
    convRule: rule20
  }, {
    start: 42802,
    length: 1,
    convRule: rule22
  }, {
    start: 42803,
    length: 1,
    convRule: rule23
  }, {
    start: 42804,
    length: 1,
    convRule: rule22
  }, {
    start: 42805,
    length: 1,
    convRule: rule23
  }, {
    start: 42806,
    length: 1,
    convRule: rule22
  }, {
    start: 42807,
    length: 1,
    convRule: rule23
  }, {
    start: 42808,
    length: 1,
    convRule: rule22
  }, {
    start: 42809,
    length: 1,
    convRule: rule23
  }, {
    start: 42810,
    length: 1,
    convRule: rule22
  }, {
    start: 42811,
    length: 1,
    convRule: rule23
  }, {
    start: 42812,
    length: 1,
    convRule: rule22
  }, {
    start: 42813,
    length: 1,
    convRule: rule23
  }, {
    start: 42814,
    length: 1,
    convRule: rule22
  }, {
    start: 42815,
    length: 1,
    convRule: rule23
  }, {
    start: 42816,
    length: 1,
    convRule: rule22
  }, {
    start: 42817,
    length: 1,
    convRule: rule23
  }, {
    start: 42818,
    length: 1,
    convRule: rule22
  }, {
    start: 42819,
    length: 1,
    convRule: rule23
  }, {
    start: 42820,
    length: 1,
    convRule: rule22
  }, {
    start: 42821,
    length: 1,
    convRule: rule23
  }, {
    start: 42822,
    length: 1,
    convRule: rule22
  }, {
    start: 42823,
    length: 1,
    convRule: rule23
  }, {
    start: 42824,
    length: 1,
    convRule: rule22
  }, {
    start: 42825,
    length: 1,
    convRule: rule23
  }, {
    start: 42826,
    length: 1,
    convRule: rule22
  }, {
    start: 42827,
    length: 1,
    convRule: rule23
  }, {
    start: 42828,
    length: 1,
    convRule: rule22
  }, {
    start: 42829,
    length: 1,
    convRule: rule23
  }, {
    start: 42830,
    length: 1,
    convRule: rule22
  }, {
    start: 42831,
    length: 1,
    convRule: rule23
  }, {
    start: 42832,
    length: 1,
    convRule: rule22
  }, {
    start: 42833,
    length: 1,
    convRule: rule23
  }, {
    start: 42834,
    length: 1,
    convRule: rule22
  }, {
    start: 42835,
    length: 1,
    convRule: rule23
  }, {
    start: 42836,
    length: 1,
    convRule: rule22
  }, {
    start: 42837,
    length: 1,
    convRule: rule23
  }, {
    start: 42838,
    length: 1,
    convRule: rule22
  }, {
    start: 42839,
    length: 1,
    convRule: rule23
  }, {
    start: 42840,
    length: 1,
    convRule: rule22
  }, {
    start: 42841,
    length: 1,
    convRule: rule23
  }, {
    start: 42842,
    length: 1,
    convRule: rule22
  }, {
    start: 42843,
    length: 1,
    convRule: rule23
  }, {
    start: 42844,
    length: 1,
    convRule: rule22
  }, {
    start: 42845,
    length: 1,
    convRule: rule23
  }, {
    start: 42846,
    length: 1,
    convRule: rule22
  }, {
    start: 42847,
    length: 1,
    convRule: rule23
  }, {
    start: 42848,
    length: 1,
    convRule: rule22
  }, {
    start: 42849,
    length: 1,
    convRule: rule23
  }, {
    start: 42850,
    length: 1,
    convRule: rule22
  }, {
    start: 42851,
    length: 1,
    convRule: rule23
  }, {
    start: 42852,
    length: 1,
    convRule: rule22
  }, {
    start: 42853,
    length: 1,
    convRule: rule23
  }, {
    start: 42854,
    length: 1,
    convRule: rule22
  }, {
    start: 42855,
    length: 1,
    convRule: rule23
  }, {
    start: 42856,
    length: 1,
    convRule: rule22
  }, {
    start: 42857,
    length: 1,
    convRule: rule23
  }, {
    start: 42858,
    length: 1,
    convRule: rule22
  }, {
    start: 42859,
    length: 1,
    convRule: rule23
  }, {
    start: 42860,
    length: 1,
    convRule: rule22
  }, {
    start: 42861,
    length: 1,
    convRule: rule23
  }, {
    start: 42862,
    length: 1,
    convRule: rule22
  }, {
    start: 42863,
    length: 1,
    convRule: rule23
  }, {
    start: 42864,
    length: 1,
    convRule: rule91
  }, {
    start: 42865,
    length: 8,
    convRule: rule20
  }, {
    start: 42873,
    length: 1,
    convRule: rule22
  }, {
    start: 42874,
    length: 1,
    convRule: rule23
  }, {
    start: 42875,
    length: 1,
    convRule: rule22
  }, {
    start: 42876,
    length: 1,
    convRule: rule23
  }, {
    start: 42877,
    length: 1,
    convRule: rule183
  }, {
    start: 42878,
    length: 1,
    convRule: rule22
  }, {
    start: 42879,
    length: 1,
    convRule: rule23
  }, {
    start: 42880,
    length: 1,
    convRule: rule22
  }, {
    start: 42881,
    length: 1,
    convRule: rule23
  }, {
    start: 42882,
    length: 1,
    convRule: rule22
  }, {
    start: 42883,
    length: 1,
    convRule: rule23
  }, {
    start: 42884,
    length: 1,
    convRule: rule22
  }, {
    start: 42885,
    length: 1,
    convRule: rule23
  }, {
    start: 42886,
    length: 1,
    convRule: rule22
  }, {
    start: 42887,
    length: 1,
    convRule: rule23
  }, {
    start: 42888,
    length: 1,
    convRule: rule91
  }, {
    start: 42889,
    length: 2,
    convRule: rule10
  }, {
    start: 42891,
    length: 1,
    convRule: rule22
  }, {
    start: 42892,
    length: 1,
    convRule: rule23
  }, {
    start: 42893,
    length: 1,
    convRule: rule184
  }, {
    start: 42894,
    length: 1,
    convRule: rule20
  }, {
    start: 42895,
    length: 1,
    convRule: rule14
  }, {
    start: 42896,
    length: 1,
    convRule: rule22
  }, {
    start: 42897,
    length: 1,
    convRule: rule23
  }, {
    start: 42898,
    length: 1,
    convRule: rule22
  }, {
    start: 42899,
    length: 1,
    convRule: rule23
  }, {
    start: 42900,
    length: 1,
    convRule: rule185
  }, {
    start: 42901,
    length: 1,
    convRule: rule20
  }, {
    start: 42902,
    length: 1,
    convRule: rule22
  }, {
    start: 42903,
    length: 1,
    convRule: rule23
  }, {
    start: 42904,
    length: 1,
    convRule: rule22
  }, {
    start: 42905,
    length: 1,
    convRule: rule23
  }, {
    start: 42906,
    length: 1,
    convRule: rule22
  }, {
    start: 42907,
    length: 1,
    convRule: rule23
  }, {
    start: 42908,
    length: 1,
    convRule: rule22
  }, {
    start: 42909,
    length: 1,
    convRule: rule23
  }, {
    start: 42910,
    length: 1,
    convRule: rule22
  }, {
    start: 42911,
    length: 1,
    convRule: rule23
  }, {
    start: 42912,
    length: 1,
    convRule: rule22
  }, {
    start: 42913,
    length: 1,
    convRule: rule23
  }, {
    start: 42914,
    length: 1,
    convRule: rule22
  }, {
    start: 42915,
    length: 1,
    convRule: rule23
  }, {
    start: 42916,
    length: 1,
    convRule: rule22
  }, {
    start: 42917,
    length: 1,
    convRule: rule23
  }, {
    start: 42918,
    length: 1,
    convRule: rule22
  }, {
    start: 42919,
    length: 1,
    convRule: rule23
  }, {
    start: 42920,
    length: 1,
    convRule: rule22
  }, {
    start: 42921,
    length: 1,
    convRule: rule23
  }, {
    start: 42922,
    length: 1,
    convRule: rule186
  }, {
    start: 42923,
    length: 1,
    convRule: rule187
  }, {
    start: 42924,
    length: 1,
    convRule: rule188
  }, {
    start: 42925,
    length: 1,
    convRule: rule189
  }, {
    start: 42926,
    length: 1,
    convRule: rule186
  }, {
    start: 42927,
    length: 1,
    convRule: rule20
  }, {
    start: 42928,
    length: 1,
    convRule: rule190
  }, {
    start: 42929,
    length: 1,
    convRule: rule191
  }, {
    start: 42930,
    length: 1,
    convRule: rule192
  }, {
    start: 42931,
    length: 1,
    convRule: rule193
  }, {
    start: 42932,
    length: 1,
    convRule: rule22
  }, {
    start: 42933,
    length: 1,
    convRule: rule23
  }, {
    start: 42934,
    length: 1,
    convRule: rule22
  }, {
    start: 42935,
    length: 1,
    convRule: rule23
  }, {
    start: 42936,
    length: 1,
    convRule: rule22
  }, {
    start: 42937,
    length: 1,
    convRule: rule23
  }, {
    start: 42938,
    length: 1,
    convRule: rule22
  }, {
    start: 42939,
    length: 1,
    convRule: rule23
  }, {
    start: 42940,
    length: 1,
    convRule: rule22
  }, {
    start: 42941,
    length: 1,
    convRule: rule23
  }, {
    start: 42942,
    length: 1,
    convRule: rule22
  }, {
    start: 42943,
    length: 1,
    convRule: rule23
  }, {
    start: 42946,
    length: 1,
    convRule: rule22
  }, {
    start: 42947,
    length: 1,
    convRule: rule23
  }, {
    start: 42948,
    length: 1,
    convRule: rule194
  }, {
    start: 42949,
    length: 1,
    convRule: rule195
  }, {
    start: 42950,
    length: 1,
    convRule: rule196
  }, {
    start: 42951,
    length: 1,
    convRule: rule22
  }, {
    start: 42952,
    length: 1,
    convRule: rule23
  }, {
    start: 42953,
    length: 1,
    convRule: rule22
  }, {
    start: 42954,
    length: 1,
    convRule: rule23
  }, {
    start: 42997,
    length: 1,
    convRule: rule22
  }, {
    start: 42998,
    length: 1,
    convRule: rule23
  }, {
    start: 42999,
    length: 1,
    convRule: rule14
  }, {
    start: 43e3,
    length: 2,
    convRule: rule91
  }, {
    start: 43002,
    length: 1,
    convRule: rule20
  }, {
    start: 43003,
    length: 7,
    convRule: rule14
  }, {
    start: 43010,
    length: 1,
    convRule: rule92
  }, {
    start: 43011,
    length: 3,
    convRule: rule14
  }, {
    start: 43014,
    length: 1,
    convRule: rule92
  }, {
    start: 43015,
    length: 4,
    convRule: rule14
  }, {
    start: 43019,
    length: 1,
    convRule: rule92
  }, {
    start: 43020,
    length: 23,
    convRule: rule14
  }, {
    start: 43043,
    length: 2,
    convRule: rule124
  }, {
    start: 43045,
    length: 2,
    convRule: rule92
  }, {
    start: 43047,
    length: 1,
    convRule: rule124
  }, {
    start: 43048,
    length: 4,
    convRule: rule13
  }, {
    start: 43052,
    length: 1,
    convRule: rule92
  }, {
    start: 43056,
    length: 6,
    convRule: rule17
  }, {
    start: 43062,
    length: 2,
    convRule: rule13
  }, {
    start: 43064,
    length: 1,
    convRule: rule3
  }, {
    start: 43065,
    length: 1,
    convRule: rule13
  }, {
    start: 43072,
    length: 52,
    convRule: rule14
  }, {
    start: 43124,
    length: 4,
    convRule: rule2
  }, {
    start: 43136,
    length: 2,
    convRule: rule124
  }, {
    start: 43138,
    length: 50,
    convRule: rule14
  }, {
    start: 43188,
    length: 16,
    convRule: rule124
  }, {
    start: 43204,
    length: 2,
    convRule: rule92
  }, {
    start: 43214,
    length: 2,
    convRule: rule2
  }, {
    start: 43216,
    length: 10,
    convRule: rule8
  }, {
    start: 43232,
    length: 18,
    convRule: rule92
  }, {
    start: 43250,
    length: 6,
    convRule: rule14
  }, {
    start: 43256,
    length: 3,
    convRule: rule2
  }, {
    start: 43259,
    length: 1,
    convRule: rule14
  }, {
    start: 43260,
    length: 1,
    convRule: rule2
  }, {
    start: 43261,
    length: 2,
    convRule: rule14
  }, {
    start: 43263,
    length: 1,
    convRule: rule92
  }, {
    start: 43264,
    length: 10,
    convRule: rule8
  }, {
    start: 43274,
    length: 28,
    convRule: rule14
  }, {
    start: 43302,
    length: 8,
    convRule: rule92
  }, {
    start: 43310,
    length: 2,
    convRule: rule2
  }, {
    start: 43312,
    length: 23,
    convRule: rule14
  }, {
    start: 43335,
    length: 11,
    convRule: rule92
  }, {
    start: 43346,
    length: 2,
    convRule: rule124
  }, {
    start: 43359,
    length: 1,
    convRule: rule2
  }, {
    start: 43360,
    length: 29,
    convRule: rule14
  }, {
    start: 43392,
    length: 3,
    convRule: rule92
  }, {
    start: 43395,
    length: 1,
    convRule: rule124
  }, {
    start: 43396,
    length: 47,
    convRule: rule14
  }, {
    start: 43443,
    length: 1,
    convRule: rule92
  }, {
    start: 43444,
    length: 2,
    convRule: rule124
  }, {
    start: 43446,
    length: 4,
    convRule: rule92
  }, {
    start: 43450,
    length: 2,
    convRule: rule124
  }, {
    start: 43452,
    length: 2,
    convRule: rule92
  }, {
    start: 43454,
    length: 3,
    convRule: rule124
  }, {
    start: 43457,
    length: 13,
    convRule: rule2
  }, {
    start: 43471,
    length: 1,
    convRule: rule91
  }, {
    start: 43472,
    length: 10,
    convRule: rule8
  }, {
    start: 43486,
    length: 2,
    convRule: rule2
  }, {
    start: 43488,
    length: 5,
    convRule: rule14
  }, {
    start: 43493,
    length: 1,
    convRule: rule92
  }, {
    start: 43494,
    length: 1,
    convRule: rule91
  }, {
    start: 43495,
    length: 9,
    convRule: rule14
  }, {
    start: 43504,
    length: 10,
    convRule: rule8
  }, {
    start: 43514,
    length: 5,
    convRule: rule14
  }, {
    start: 43520,
    length: 41,
    convRule: rule14
  }, {
    start: 43561,
    length: 6,
    convRule: rule92
  }, {
    start: 43567,
    length: 2,
    convRule: rule124
  }, {
    start: 43569,
    length: 2,
    convRule: rule92
  }, {
    start: 43571,
    length: 2,
    convRule: rule124
  }, {
    start: 43573,
    length: 2,
    convRule: rule92
  }, {
    start: 43584,
    length: 3,
    convRule: rule14
  }, {
    start: 43587,
    length: 1,
    convRule: rule92
  }, {
    start: 43588,
    length: 8,
    convRule: rule14
  }, {
    start: 43596,
    length: 1,
    convRule: rule92
  }, {
    start: 43597,
    length: 1,
    convRule: rule124
  }, {
    start: 43600,
    length: 10,
    convRule: rule8
  }, {
    start: 43612,
    length: 4,
    convRule: rule2
  }, {
    start: 43616,
    length: 16,
    convRule: rule14
  }, {
    start: 43632,
    length: 1,
    convRule: rule91
  }, {
    start: 43633,
    length: 6,
    convRule: rule14
  }, {
    start: 43639,
    length: 3,
    convRule: rule13
  }, {
    start: 43642,
    length: 1,
    convRule: rule14
  }, {
    start: 43643,
    length: 1,
    convRule: rule124
  }, {
    start: 43644,
    length: 1,
    convRule: rule92
  }, {
    start: 43645,
    length: 1,
    convRule: rule124
  }, {
    start: 43646,
    length: 50,
    convRule: rule14
  }, {
    start: 43696,
    length: 1,
    convRule: rule92
  }, {
    start: 43697,
    length: 1,
    convRule: rule14
  }, {
    start: 43698,
    length: 3,
    convRule: rule92
  }, {
    start: 43701,
    length: 2,
    convRule: rule14
  }, {
    start: 43703,
    length: 2,
    convRule: rule92
  }, {
    start: 43705,
    length: 5,
    convRule: rule14
  }, {
    start: 43710,
    length: 2,
    convRule: rule92
  }, {
    start: 43712,
    length: 1,
    convRule: rule14
  }, {
    start: 43713,
    length: 1,
    convRule: rule92
  }, {
    start: 43714,
    length: 1,
    convRule: rule14
  }, {
    start: 43739,
    length: 2,
    convRule: rule14
  }, {
    start: 43741,
    length: 1,
    convRule: rule91
  }, {
    start: 43742,
    length: 2,
    convRule: rule2
  }, {
    start: 43744,
    length: 11,
    convRule: rule14
  }, {
    start: 43755,
    length: 1,
    convRule: rule124
  }, {
    start: 43756,
    length: 2,
    convRule: rule92
  }, {
    start: 43758,
    length: 2,
    convRule: rule124
  }, {
    start: 43760,
    length: 2,
    convRule: rule2
  }, {
    start: 43762,
    length: 1,
    convRule: rule14
  }, {
    start: 43763,
    length: 2,
    convRule: rule91
  }, {
    start: 43765,
    length: 1,
    convRule: rule124
  }, {
    start: 43766,
    length: 1,
    convRule: rule92
  }, {
    start: 43777,
    length: 6,
    convRule: rule14
  }, {
    start: 43785,
    length: 6,
    convRule: rule14
  }, {
    start: 43793,
    length: 6,
    convRule: rule14
  }, {
    start: 43808,
    length: 7,
    convRule: rule14
  }, {
    start: 43816,
    length: 7,
    convRule: rule14
  }, {
    start: 43824,
    length: 35,
    convRule: rule20
  }, {
    start: 43859,
    length: 1,
    convRule: rule197
  }, {
    start: 43860,
    length: 7,
    convRule: rule20
  }, {
    start: 43867,
    length: 1,
    convRule: rule10
  }, {
    start: 43868,
    length: 4,
    convRule: rule91
  }, {
    start: 43872,
    length: 9,
    convRule: rule20
  }, {
    start: 43881,
    length: 1,
    convRule: rule91
  }, {
    start: 43882,
    length: 2,
    convRule: rule10
  }, {
    start: 43888,
    length: 80,
    convRule: rule198
  }, {
    start: 43968,
    length: 35,
    convRule: rule14
  }, {
    start: 44003,
    length: 2,
    convRule: rule124
  }, {
    start: 44005,
    length: 1,
    convRule: rule92
  }, {
    start: 44006,
    length: 2,
    convRule: rule124
  }, {
    start: 44008,
    length: 1,
    convRule: rule92
  }, {
    start: 44009,
    length: 2,
    convRule: rule124
  }, {
    start: 44011,
    length: 1,
    convRule: rule2
  }, {
    start: 44012,
    length: 1,
    convRule: rule124
  }, {
    start: 44013,
    length: 1,
    convRule: rule92
  }, {
    start: 44016,
    length: 10,
    convRule: rule8
  }, {
    start: 44032,
    length: 11172,
    convRule: rule14
  }, {
    start: 55216,
    length: 23,
    convRule: rule14
  }, {
    start: 55243,
    length: 49,
    convRule: rule14
  }, {
    start: 55296,
    length: 896,
    convRule: rule199
  }, {
    start: 56192,
    length: 128,
    convRule: rule199
  }, {
    start: 56320,
    length: 1024,
    convRule: rule199
  }, {
    start: 57344,
    length: 6400,
    convRule: rule200
  }, {
    start: 63744,
    length: 366,
    convRule: rule14
  }, {
    start: 64112,
    length: 106,
    convRule: rule14
  }, {
    start: 64256,
    length: 7,
    convRule: rule20
  }, {
    start: 64275,
    length: 5,
    convRule: rule20
  }, {
    start: 64285,
    length: 1,
    convRule: rule14
  }, {
    start: 64286,
    length: 1,
    convRule: rule92
  }, {
    start: 64287,
    length: 10,
    convRule: rule14
  }, {
    start: 64297,
    length: 1,
    convRule: rule6
  }, {
    start: 64298,
    length: 13,
    convRule: rule14
  }, {
    start: 64312,
    length: 5,
    convRule: rule14
  }, {
    start: 64318,
    length: 1,
    convRule: rule14
  }, {
    start: 64320,
    length: 2,
    convRule: rule14
  }, {
    start: 64323,
    length: 2,
    convRule: rule14
  }, {
    start: 64326,
    length: 108,
    convRule: rule14
  }, {
    start: 64434,
    length: 16,
    convRule: rule10
  }, {
    start: 64467,
    length: 363,
    convRule: rule14
  }, {
    start: 64830,
    length: 1,
    convRule: rule5
  }, {
    start: 64831,
    length: 1,
    convRule: rule4
  }, {
    start: 64848,
    length: 64,
    convRule: rule14
  }, {
    start: 64914,
    length: 54,
    convRule: rule14
  }, {
    start: 65008,
    length: 12,
    convRule: rule14
  }, {
    start: 65020,
    length: 1,
    convRule: rule3
  }, {
    start: 65021,
    length: 1,
    convRule: rule13
  }, {
    start: 65024,
    length: 16,
    convRule: rule92
  }, {
    start: 65040,
    length: 7,
    convRule: rule2
  }, {
    start: 65047,
    length: 1,
    convRule: rule4
  }, {
    start: 65048,
    length: 1,
    convRule: rule5
  }, {
    start: 65049,
    length: 1,
    convRule: rule2
  }, {
    start: 65056,
    length: 16,
    convRule: rule92
  }, {
    start: 65072,
    length: 1,
    convRule: rule2
  }, {
    start: 65073,
    length: 2,
    convRule: rule7
  }, {
    start: 65075,
    length: 2,
    convRule: rule11
  }, {
    start: 65077,
    length: 1,
    convRule: rule4
  }, {
    start: 65078,
    length: 1,
    convRule: rule5
  }, {
    start: 65079,
    length: 1,
    convRule: rule4
  }, {
    start: 65080,
    length: 1,
    convRule: rule5
  }, {
    start: 65081,
    length: 1,
    convRule: rule4
  }, {
    start: 65082,
    length: 1,
    convRule: rule5
  }, {
    start: 65083,
    length: 1,
    convRule: rule4
  }, {
    start: 65084,
    length: 1,
    convRule: rule5
  }, {
    start: 65085,
    length: 1,
    convRule: rule4
  }, {
    start: 65086,
    length: 1,
    convRule: rule5
  }, {
    start: 65087,
    length: 1,
    convRule: rule4
  }, {
    start: 65088,
    length: 1,
    convRule: rule5
  }, {
    start: 65089,
    length: 1,
    convRule: rule4
  }, {
    start: 65090,
    length: 1,
    convRule: rule5
  }, {
    start: 65091,
    length: 1,
    convRule: rule4
  }, {
    start: 65092,
    length: 1,
    convRule: rule5
  }, {
    start: 65093,
    length: 2,
    convRule: rule2
  }, {
    start: 65095,
    length: 1,
    convRule: rule4
  }, {
    start: 65096,
    length: 1,
    convRule: rule5
  }, {
    start: 65097,
    length: 4,
    convRule: rule2
  }, {
    start: 65101,
    length: 3,
    convRule: rule11
  }, {
    start: 65104,
    length: 3,
    convRule: rule2
  }, {
    start: 65108,
    length: 4,
    convRule: rule2
  }, {
    start: 65112,
    length: 1,
    convRule: rule7
  }, {
    start: 65113,
    length: 1,
    convRule: rule4
  }, {
    start: 65114,
    length: 1,
    convRule: rule5
  }, {
    start: 65115,
    length: 1,
    convRule: rule4
  }, {
    start: 65116,
    length: 1,
    convRule: rule5
  }, {
    start: 65117,
    length: 1,
    convRule: rule4
  }, {
    start: 65118,
    length: 1,
    convRule: rule5
  }, {
    start: 65119,
    length: 3,
    convRule: rule2
  }, {
    start: 65122,
    length: 1,
    convRule: rule6
  }, {
    start: 65123,
    length: 1,
    convRule: rule7
  }, {
    start: 65124,
    length: 3,
    convRule: rule6
  }, {
    start: 65128,
    length: 1,
    convRule: rule2
  }, {
    start: 65129,
    length: 1,
    convRule: rule3
  }, {
    start: 65130,
    length: 2,
    convRule: rule2
  }, {
    start: 65136,
    length: 5,
    convRule: rule14
  }, {
    start: 65142,
    length: 135,
    convRule: rule14
  }, {
    start: 65279,
    length: 1,
    convRule: rule16
  }, {
    start: 65281,
    length: 3,
    convRule: rule2
  }, {
    start: 65284,
    length: 1,
    convRule: rule3
  }, {
    start: 65285,
    length: 3,
    convRule: rule2
  }, {
    start: 65288,
    length: 1,
    convRule: rule4
  }, {
    start: 65289,
    length: 1,
    convRule: rule5
  }, {
    start: 65290,
    length: 1,
    convRule: rule2
  }, {
    start: 65291,
    length: 1,
    convRule: rule6
  }, {
    start: 65292,
    length: 1,
    convRule: rule2
  }, {
    start: 65293,
    length: 1,
    convRule: rule7
  }, {
    start: 65294,
    length: 2,
    convRule: rule2
  }, {
    start: 65296,
    length: 10,
    convRule: rule8
  }, {
    start: 65306,
    length: 2,
    convRule: rule2
  }, {
    start: 65308,
    length: 3,
    convRule: rule6
  }, {
    start: 65311,
    length: 2,
    convRule: rule2
  }, {
    start: 65313,
    length: 26,
    convRule: rule9
  }, {
    start: 65339,
    length: 1,
    convRule: rule4
  }, {
    start: 65340,
    length: 1,
    convRule: rule2
  }, {
    start: 65341,
    length: 1,
    convRule: rule5
  }, {
    start: 65342,
    length: 1,
    convRule: rule10
  }, {
    start: 65343,
    length: 1,
    convRule: rule11
  }, {
    start: 65344,
    length: 1,
    convRule: rule10
  }, {
    start: 65345,
    length: 26,
    convRule: rule12
  }, {
    start: 65371,
    length: 1,
    convRule: rule4
  }, {
    start: 65372,
    length: 1,
    convRule: rule6
  }, {
    start: 65373,
    length: 1,
    convRule: rule5
  }, {
    start: 65374,
    length: 1,
    convRule: rule6
  }, {
    start: 65375,
    length: 1,
    convRule: rule4
  }, {
    start: 65376,
    length: 1,
    convRule: rule5
  }, {
    start: 65377,
    length: 1,
    convRule: rule2
  }, {
    start: 65378,
    length: 1,
    convRule: rule4
  }, {
    start: 65379,
    length: 1,
    convRule: rule5
  }, {
    start: 65380,
    length: 2,
    convRule: rule2
  }, {
    start: 65382,
    length: 10,
    convRule: rule14
  }, {
    start: 65392,
    length: 1,
    convRule: rule91
  }, {
    start: 65393,
    length: 45,
    convRule: rule14
  }, {
    start: 65438,
    length: 2,
    convRule: rule91
  }, {
    start: 65440,
    length: 31,
    convRule: rule14
  }, {
    start: 65474,
    length: 6,
    convRule: rule14
  }, {
    start: 65482,
    length: 6,
    convRule: rule14
  }, {
    start: 65490,
    length: 6,
    convRule: rule14
  }, {
    start: 65498,
    length: 3,
    convRule: rule14
  }, {
    start: 65504,
    length: 2,
    convRule: rule3
  }, {
    start: 65506,
    length: 1,
    convRule: rule6
  }, {
    start: 65507,
    length: 1,
    convRule: rule10
  }, {
    start: 65508,
    length: 1,
    convRule: rule13
  }, {
    start: 65509,
    length: 2,
    convRule: rule3
  }, {
    start: 65512,
    length: 1,
    convRule: rule13
  }, {
    start: 65513,
    length: 4,
    convRule: rule6
  }, {
    start: 65517,
    length: 2,
    convRule: rule13
  }, {
    start: 65529,
    length: 3,
    convRule: rule16
  }, {
    start: 65532,
    length: 2,
    convRule: rule13
  }, {
    start: 65536,
    length: 12,
    convRule: rule14
  }, {
    start: 65549,
    length: 26,
    convRule: rule14
  }, {
    start: 65576,
    length: 19,
    convRule: rule14
  }, {
    start: 65596,
    length: 2,
    convRule: rule14
  }, {
    start: 65599,
    length: 15,
    convRule: rule14
  }, {
    start: 65616,
    length: 14,
    convRule: rule14
  }, {
    start: 65664,
    length: 123,
    convRule: rule14
  }, {
    start: 65792,
    length: 3,
    convRule: rule2
  }, {
    start: 65799,
    length: 45,
    convRule: rule17
  }, {
    start: 65847,
    length: 9,
    convRule: rule13
  }, {
    start: 65856,
    length: 53,
    convRule: rule128
  }, {
    start: 65909,
    length: 4,
    convRule: rule17
  }, {
    start: 65913,
    length: 17,
    convRule: rule13
  }, {
    start: 65930,
    length: 2,
    convRule: rule17
  }, {
    start: 65932,
    length: 3,
    convRule: rule13
  }, {
    start: 65936,
    length: 13,
    convRule: rule13
  }, {
    start: 65952,
    length: 1,
    convRule: rule13
  }, {
    start: 66e3,
    length: 45,
    convRule: rule13
  }, {
    start: 66045,
    length: 1,
    convRule: rule92
  }, {
    start: 66176,
    length: 29,
    convRule: rule14
  }, {
    start: 66208,
    length: 49,
    convRule: rule14
  }, {
    start: 66272,
    length: 1,
    convRule: rule92
  }, {
    start: 66273,
    length: 27,
    convRule: rule17
  }, {
    start: 66304,
    length: 32,
    convRule: rule14
  }, {
    start: 66336,
    length: 4,
    convRule: rule17
  }, {
    start: 66349,
    length: 20,
    convRule: rule14
  }, {
    start: 66369,
    length: 1,
    convRule: rule128
  }, {
    start: 66370,
    length: 8,
    convRule: rule14
  }, {
    start: 66378,
    length: 1,
    convRule: rule128
  }, {
    start: 66384,
    length: 38,
    convRule: rule14
  }, {
    start: 66422,
    length: 5,
    convRule: rule92
  }, {
    start: 66432,
    length: 30,
    convRule: rule14
  }, {
    start: 66463,
    length: 1,
    convRule: rule2
  }, {
    start: 66464,
    length: 36,
    convRule: rule14
  }, {
    start: 66504,
    length: 8,
    convRule: rule14
  }, {
    start: 66512,
    length: 1,
    convRule: rule2
  }, {
    start: 66513,
    length: 5,
    convRule: rule128
  }, {
    start: 66560,
    length: 40,
    convRule: rule201
  }, {
    start: 66600,
    length: 40,
    convRule: rule202
  }, {
    start: 66640,
    length: 78,
    convRule: rule14
  }, {
    start: 66720,
    length: 10,
    convRule: rule8
  }, {
    start: 66736,
    length: 36,
    convRule: rule201
  }, {
    start: 66776,
    length: 36,
    convRule: rule202
  }, {
    start: 66816,
    length: 40,
    convRule: rule14
  }, {
    start: 66864,
    length: 52,
    convRule: rule14
  }, {
    start: 66927,
    length: 1,
    convRule: rule2
  }, {
    start: 67072,
    length: 311,
    convRule: rule14
  }, {
    start: 67392,
    length: 22,
    convRule: rule14
  }, {
    start: 67424,
    length: 8,
    convRule: rule14
  }, {
    start: 67584,
    length: 6,
    convRule: rule14
  }, {
    start: 67592,
    length: 1,
    convRule: rule14
  }, {
    start: 67594,
    length: 44,
    convRule: rule14
  }, {
    start: 67639,
    length: 2,
    convRule: rule14
  }, {
    start: 67644,
    length: 1,
    convRule: rule14
  }, {
    start: 67647,
    length: 23,
    convRule: rule14
  }, {
    start: 67671,
    length: 1,
    convRule: rule2
  }, {
    start: 67672,
    length: 8,
    convRule: rule17
  }, {
    start: 67680,
    length: 23,
    convRule: rule14
  }, {
    start: 67703,
    length: 2,
    convRule: rule13
  }, {
    start: 67705,
    length: 7,
    convRule: rule17
  }, {
    start: 67712,
    length: 31,
    convRule: rule14
  }, {
    start: 67751,
    length: 9,
    convRule: rule17
  }, {
    start: 67808,
    length: 19,
    convRule: rule14
  }, {
    start: 67828,
    length: 2,
    convRule: rule14
  }, {
    start: 67835,
    length: 5,
    convRule: rule17
  }, {
    start: 67840,
    length: 22,
    convRule: rule14
  }, {
    start: 67862,
    length: 6,
    convRule: rule17
  }, {
    start: 67871,
    length: 1,
    convRule: rule2
  }, {
    start: 67872,
    length: 26,
    convRule: rule14
  }, {
    start: 67903,
    length: 1,
    convRule: rule2
  }, {
    start: 67968,
    length: 56,
    convRule: rule14
  }, {
    start: 68028,
    length: 2,
    convRule: rule17
  }, {
    start: 68030,
    length: 2,
    convRule: rule14
  }, {
    start: 68032,
    length: 16,
    convRule: rule17
  }, {
    start: 68050,
    length: 46,
    convRule: rule17
  }, {
    start: 68096,
    length: 1,
    convRule: rule14
  }, {
    start: 68097,
    length: 3,
    convRule: rule92
  }, {
    start: 68101,
    length: 2,
    convRule: rule92
  }, {
    start: 68108,
    length: 4,
    convRule: rule92
  }, {
    start: 68112,
    length: 4,
    convRule: rule14
  }, {
    start: 68117,
    length: 3,
    convRule: rule14
  }, {
    start: 68121,
    length: 29,
    convRule: rule14
  }, {
    start: 68152,
    length: 3,
    convRule: rule92
  }, {
    start: 68159,
    length: 1,
    convRule: rule92
  }, {
    start: 68160,
    length: 9,
    convRule: rule17
  }, {
    start: 68176,
    length: 9,
    convRule: rule2
  }, {
    start: 68192,
    length: 29,
    convRule: rule14
  }, {
    start: 68221,
    length: 2,
    convRule: rule17
  }, {
    start: 68223,
    length: 1,
    convRule: rule2
  }, {
    start: 68224,
    length: 29,
    convRule: rule14
  }, {
    start: 68253,
    length: 3,
    convRule: rule17
  }, {
    start: 68288,
    length: 8,
    convRule: rule14
  }, {
    start: 68296,
    length: 1,
    convRule: rule13
  }, {
    start: 68297,
    length: 28,
    convRule: rule14
  }, {
    start: 68325,
    length: 2,
    convRule: rule92
  }, {
    start: 68331,
    length: 5,
    convRule: rule17
  }, {
    start: 68336,
    length: 7,
    convRule: rule2
  }, {
    start: 68352,
    length: 54,
    convRule: rule14
  }, {
    start: 68409,
    length: 7,
    convRule: rule2
  }, {
    start: 68416,
    length: 22,
    convRule: rule14
  }, {
    start: 68440,
    length: 8,
    convRule: rule17
  }, {
    start: 68448,
    length: 19,
    convRule: rule14
  }, {
    start: 68472,
    length: 8,
    convRule: rule17
  }, {
    start: 68480,
    length: 18,
    convRule: rule14
  }, {
    start: 68505,
    length: 4,
    convRule: rule2
  }, {
    start: 68521,
    length: 7,
    convRule: rule17
  }, {
    start: 68608,
    length: 73,
    convRule: rule14
  }, {
    start: 68736,
    length: 51,
    convRule: rule97
  }, {
    start: 68800,
    length: 51,
    convRule: rule102
  }, {
    start: 68858,
    length: 6,
    convRule: rule17
  }, {
    start: 68864,
    length: 36,
    convRule: rule14
  }, {
    start: 68900,
    length: 4,
    convRule: rule92
  }, {
    start: 68912,
    length: 10,
    convRule: rule8
  }, {
    start: 69216,
    length: 31,
    convRule: rule17
  }, {
    start: 69248,
    length: 42,
    convRule: rule14
  }, {
    start: 69291,
    length: 2,
    convRule: rule92
  }, {
    start: 69293,
    length: 1,
    convRule: rule7
  }, {
    start: 69296,
    length: 2,
    convRule: rule14
  }, {
    start: 69376,
    length: 29,
    convRule: rule14
  }, {
    start: 69405,
    length: 10,
    convRule: rule17
  }, {
    start: 69415,
    length: 1,
    convRule: rule14
  }, {
    start: 69424,
    length: 22,
    convRule: rule14
  }, {
    start: 69446,
    length: 11,
    convRule: rule92
  }, {
    start: 69457,
    length: 4,
    convRule: rule17
  }, {
    start: 69461,
    length: 5,
    convRule: rule2
  }, {
    start: 69552,
    length: 21,
    convRule: rule14
  }, {
    start: 69573,
    length: 7,
    convRule: rule17
  }, {
    start: 69600,
    length: 23,
    convRule: rule14
  }, {
    start: 69632,
    length: 1,
    convRule: rule124
  }, {
    start: 69633,
    length: 1,
    convRule: rule92
  }, {
    start: 69634,
    length: 1,
    convRule: rule124
  }, {
    start: 69635,
    length: 53,
    convRule: rule14
  }, {
    start: 69688,
    length: 15,
    convRule: rule92
  }, {
    start: 69703,
    length: 7,
    convRule: rule2
  }, {
    start: 69714,
    length: 20,
    convRule: rule17
  }, {
    start: 69734,
    length: 10,
    convRule: rule8
  }, {
    start: 69759,
    length: 3,
    convRule: rule92
  }, {
    start: 69762,
    length: 1,
    convRule: rule124
  }, {
    start: 69763,
    length: 45,
    convRule: rule14
  }, {
    start: 69808,
    length: 3,
    convRule: rule124
  }, {
    start: 69811,
    length: 4,
    convRule: rule92
  }, {
    start: 69815,
    length: 2,
    convRule: rule124
  }, {
    start: 69817,
    length: 2,
    convRule: rule92
  }, {
    start: 69819,
    length: 2,
    convRule: rule2
  }, {
    start: 69821,
    length: 1,
    convRule: rule16
  }, {
    start: 69822,
    length: 4,
    convRule: rule2
  }, {
    start: 69837,
    length: 1,
    convRule: rule16
  }, {
    start: 69840,
    length: 25,
    convRule: rule14
  }, {
    start: 69872,
    length: 10,
    convRule: rule8
  }, {
    start: 69888,
    length: 3,
    convRule: rule92
  }, {
    start: 69891,
    length: 36,
    convRule: rule14
  }, {
    start: 69927,
    length: 5,
    convRule: rule92
  }, {
    start: 69932,
    length: 1,
    convRule: rule124
  }, {
    start: 69933,
    length: 8,
    convRule: rule92
  }, {
    start: 69942,
    length: 10,
    convRule: rule8
  }, {
    start: 69952,
    length: 4,
    convRule: rule2
  }, {
    start: 69956,
    length: 1,
    convRule: rule14
  }, {
    start: 69957,
    length: 2,
    convRule: rule124
  }, {
    start: 69959,
    length: 1,
    convRule: rule14
  }, {
    start: 69968,
    length: 35,
    convRule: rule14
  }, {
    start: 70003,
    length: 1,
    convRule: rule92
  }, {
    start: 70004,
    length: 2,
    convRule: rule2
  }, {
    start: 70006,
    length: 1,
    convRule: rule14
  }, {
    start: 70016,
    length: 2,
    convRule: rule92
  }, {
    start: 70018,
    length: 1,
    convRule: rule124
  }, {
    start: 70019,
    length: 48,
    convRule: rule14
  }, {
    start: 70067,
    length: 3,
    convRule: rule124
  }, {
    start: 70070,
    length: 9,
    convRule: rule92
  }, {
    start: 70079,
    length: 2,
    convRule: rule124
  }, {
    start: 70081,
    length: 4,
    convRule: rule14
  }, {
    start: 70085,
    length: 4,
    convRule: rule2
  }, {
    start: 70089,
    length: 4,
    convRule: rule92
  }, {
    start: 70093,
    length: 1,
    convRule: rule2
  }, {
    start: 70094,
    length: 1,
    convRule: rule124
  }, {
    start: 70095,
    length: 1,
    convRule: rule92
  }, {
    start: 70096,
    length: 10,
    convRule: rule8
  }, {
    start: 70106,
    length: 1,
    convRule: rule14
  }, {
    start: 70107,
    length: 1,
    convRule: rule2
  }, {
    start: 70108,
    length: 1,
    convRule: rule14
  }, {
    start: 70109,
    length: 3,
    convRule: rule2
  }, {
    start: 70113,
    length: 20,
    convRule: rule17
  }, {
    start: 70144,
    length: 18,
    convRule: rule14
  }, {
    start: 70163,
    length: 25,
    convRule: rule14
  }, {
    start: 70188,
    length: 3,
    convRule: rule124
  }, {
    start: 70191,
    length: 3,
    convRule: rule92
  }, {
    start: 70194,
    length: 2,
    convRule: rule124
  }, {
    start: 70196,
    length: 1,
    convRule: rule92
  }, {
    start: 70197,
    length: 1,
    convRule: rule124
  }, {
    start: 70198,
    length: 2,
    convRule: rule92
  }, {
    start: 70200,
    length: 6,
    convRule: rule2
  }, {
    start: 70206,
    length: 1,
    convRule: rule92
  }, {
    start: 70272,
    length: 7,
    convRule: rule14
  }, {
    start: 70280,
    length: 1,
    convRule: rule14
  }, {
    start: 70282,
    length: 4,
    convRule: rule14
  }, {
    start: 70287,
    length: 15,
    convRule: rule14
  }, {
    start: 70303,
    length: 10,
    convRule: rule14
  }, {
    start: 70313,
    length: 1,
    convRule: rule2
  }, {
    start: 70320,
    length: 47,
    convRule: rule14
  }, {
    start: 70367,
    length: 1,
    convRule: rule92
  }, {
    start: 70368,
    length: 3,
    convRule: rule124
  }, {
    start: 70371,
    length: 8,
    convRule: rule92
  }, {
    start: 70384,
    length: 10,
    convRule: rule8
  }, {
    start: 70400,
    length: 2,
    convRule: rule92
  }, {
    start: 70402,
    length: 2,
    convRule: rule124
  }, {
    start: 70405,
    length: 8,
    convRule: rule14
  }, {
    start: 70415,
    length: 2,
    convRule: rule14
  }, {
    start: 70419,
    length: 22,
    convRule: rule14
  }, {
    start: 70442,
    length: 7,
    convRule: rule14
  }, {
    start: 70450,
    length: 2,
    convRule: rule14
  }, {
    start: 70453,
    length: 5,
    convRule: rule14
  }, {
    start: 70459,
    length: 2,
    convRule: rule92
  }, {
    start: 70461,
    length: 1,
    convRule: rule14
  }, {
    start: 70462,
    length: 2,
    convRule: rule124
  }, {
    start: 70464,
    length: 1,
    convRule: rule92
  }, {
    start: 70465,
    length: 4,
    convRule: rule124
  }, {
    start: 70471,
    length: 2,
    convRule: rule124
  }, {
    start: 70475,
    length: 3,
    convRule: rule124
  }, {
    start: 70480,
    length: 1,
    convRule: rule14
  }, {
    start: 70487,
    length: 1,
    convRule: rule124
  }, {
    start: 70493,
    length: 5,
    convRule: rule14
  }, {
    start: 70498,
    length: 2,
    convRule: rule124
  }, {
    start: 70502,
    length: 7,
    convRule: rule92
  }, {
    start: 70512,
    length: 5,
    convRule: rule92
  }, {
    start: 70656,
    length: 53,
    convRule: rule14
  }, {
    start: 70709,
    length: 3,
    convRule: rule124
  }, {
    start: 70712,
    length: 8,
    convRule: rule92
  }, {
    start: 70720,
    length: 2,
    convRule: rule124
  }, {
    start: 70722,
    length: 3,
    convRule: rule92
  }, {
    start: 70725,
    length: 1,
    convRule: rule124
  }, {
    start: 70726,
    length: 1,
    convRule: rule92
  }, {
    start: 70727,
    length: 4,
    convRule: rule14
  }, {
    start: 70731,
    length: 5,
    convRule: rule2
  }, {
    start: 70736,
    length: 10,
    convRule: rule8
  }, {
    start: 70746,
    length: 2,
    convRule: rule2
  }, {
    start: 70749,
    length: 1,
    convRule: rule2
  }, {
    start: 70750,
    length: 1,
    convRule: rule92
  }, {
    start: 70751,
    length: 3,
    convRule: rule14
  }, {
    start: 70784,
    length: 48,
    convRule: rule14
  }, {
    start: 70832,
    length: 3,
    convRule: rule124
  }, {
    start: 70835,
    length: 6,
    convRule: rule92
  }, {
    start: 70841,
    length: 1,
    convRule: rule124
  }, {
    start: 70842,
    length: 1,
    convRule: rule92
  }, {
    start: 70843,
    length: 4,
    convRule: rule124
  }, {
    start: 70847,
    length: 2,
    convRule: rule92
  }, {
    start: 70849,
    length: 1,
    convRule: rule124
  }, {
    start: 70850,
    length: 2,
    convRule: rule92
  }, {
    start: 70852,
    length: 2,
    convRule: rule14
  }, {
    start: 70854,
    length: 1,
    convRule: rule2
  }, {
    start: 70855,
    length: 1,
    convRule: rule14
  }, {
    start: 70864,
    length: 10,
    convRule: rule8
  }, {
    start: 71040,
    length: 47,
    convRule: rule14
  }, {
    start: 71087,
    length: 3,
    convRule: rule124
  }, {
    start: 71090,
    length: 4,
    convRule: rule92
  }, {
    start: 71096,
    length: 4,
    convRule: rule124
  }, {
    start: 71100,
    length: 2,
    convRule: rule92
  }, {
    start: 71102,
    length: 1,
    convRule: rule124
  }, {
    start: 71103,
    length: 2,
    convRule: rule92
  }, {
    start: 71105,
    length: 23,
    convRule: rule2
  }, {
    start: 71128,
    length: 4,
    convRule: rule14
  }, {
    start: 71132,
    length: 2,
    convRule: rule92
  }, {
    start: 71168,
    length: 48,
    convRule: rule14
  }, {
    start: 71216,
    length: 3,
    convRule: rule124
  }, {
    start: 71219,
    length: 8,
    convRule: rule92
  }, {
    start: 71227,
    length: 2,
    convRule: rule124
  }, {
    start: 71229,
    length: 1,
    convRule: rule92
  }, {
    start: 71230,
    length: 1,
    convRule: rule124
  }, {
    start: 71231,
    length: 2,
    convRule: rule92
  }, {
    start: 71233,
    length: 3,
    convRule: rule2
  }, {
    start: 71236,
    length: 1,
    convRule: rule14
  }, {
    start: 71248,
    length: 10,
    convRule: rule8
  }, {
    start: 71264,
    length: 13,
    convRule: rule2
  }, {
    start: 71296,
    length: 43,
    convRule: rule14
  }, {
    start: 71339,
    length: 1,
    convRule: rule92
  }, {
    start: 71340,
    length: 1,
    convRule: rule124
  }, {
    start: 71341,
    length: 1,
    convRule: rule92
  }, {
    start: 71342,
    length: 2,
    convRule: rule124
  }, {
    start: 71344,
    length: 6,
    convRule: rule92
  }, {
    start: 71350,
    length: 1,
    convRule: rule124
  }, {
    start: 71351,
    length: 1,
    convRule: rule92
  }, {
    start: 71352,
    length: 1,
    convRule: rule14
  }, {
    start: 71360,
    length: 10,
    convRule: rule8
  }, {
    start: 71424,
    length: 27,
    convRule: rule14
  }, {
    start: 71453,
    length: 3,
    convRule: rule92
  }, {
    start: 71456,
    length: 2,
    convRule: rule124
  }, {
    start: 71458,
    length: 4,
    convRule: rule92
  }, {
    start: 71462,
    length: 1,
    convRule: rule124
  }, {
    start: 71463,
    length: 5,
    convRule: rule92
  }, {
    start: 71472,
    length: 10,
    convRule: rule8
  }, {
    start: 71482,
    length: 2,
    convRule: rule17
  }, {
    start: 71484,
    length: 3,
    convRule: rule2
  }, {
    start: 71487,
    length: 1,
    convRule: rule13
  }, {
    start: 71680,
    length: 44,
    convRule: rule14
  }, {
    start: 71724,
    length: 3,
    convRule: rule124
  }, {
    start: 71727,
    length: 9,
    convRule: rule92
  }, {
    start: 71736,
    length: 1,
    convRule: rule124
  }, {
    start: 71737,
    length: 2,
    convRule: rule92
  }, {
    start: 71739,
    length: 1,
    convRule: rule2
  }, {
    start: 71840,
    length: 32,
    convRule: rule9
  }, {
    start: 71872,
    length: 32,
    convRule: rule12
  }, {
    start: 71904,
    length: 10,
    convRule: rule8
  }, {
    start: 71914,
    length: 9,
    convRule: rule17
  }, {
    start: 71935,
    length: 8,
    convRule: rule14
  }, {
    start: 71945,
    length: 1,
    convRule: rule14
  }, {
    start: 71948,
    length: 8,
    convRule: rule14
  }, {
    start: 71957,
    length: 2,
    convRule: rule14
  }, {
    start: 71960,
    length: 24,
    convRule: rule14
  }, {
    start: 71984,
    length: 6,
    convRule: rule124
  }, {
    start: 71991,
    length: 2,
    convRule: rule124
  }, {
    start: 71995,
    length: 2,
    convRule: rule92
  }, {
    start: 71997,
    length: 1,
    convRule: rule124
  }, {
    start: 71998,
    length: 1,
    convRule: rule92
  }, {
    start: 71999,
    length: 1,
    convRule: rule14
  }, {
    start: 72e3,
    length: 1,
    convRule: rule124
  }, {
    start: 72001,
    length: 1,
    convRule: rule14
  }, {
    start: 72002,
    length: 1,
    convRule: rule124
  }, {
    start: 72003,
    length: 1,
    convRule: rule92
  }, {
    start: 72004,
    length: 3,
    convRule: rule2
  }, {
    start: 72016,
    length: 10,
    convRule: rule8
  }, {
    start: 72096,
    length: 8,
    convRule: rule14
  }, {
    start: 72106,
    length: 39,
    convRule: rule14
  }, {
    start: 72145,
    length: 3,
    convRule: rule124
  }, {
    start: 72148,
    length: 4,
    convRule: rule92
  }, {
    start: 72154,
    length: 2,
    convRule: rule92
  }, {
    start: 72156,
    length: 4,
    convRule: rule124
  }, {
    start: 72160,
    length: 1,
    convRule: rule92
  }, {
    start: 72161,
    length: 1,
    convRule: rule14
  }, {
    start: 72162,
    length: 1,
    convRule: rule2
  }, {
    start: 72163,
    length: 1,
    convRule: rule14
  }, {
    start: 72164,
    length: 1,
    convRule: rule124
  }, {
    start: 72192,
    length: 1,
    convRule: rule14
  }, {
    start: 72193,
    length: 10,
    convRule: rule92
  }, {
    start: 72203,
    length: 40,
    convRule: rule14
  }, {
    start: 72243,
    length: 6,
    convRule: rule92
  }, {
    start: 72249,
    length: 1,
    convRule: rule124
  }, {
    start: 72250,
    length: 1,
    convRule: rule14
  }, {
    start: 72251,
    length: 4,
    convRule: rule92
  }, {
    start: 72255,
    length: 8,
    convRule: rule2
  }, {
    start: 72263,
    length: 1,
    convRule: rule92
  }, {
    start: 72272,
    length: 1,
    convRule: rule14
  }, {
    start: 72273,
    length: 6,
    convRule: rule92
  }, {
    start: 72279,
    length: 2,
    convRule: rule124
  }, {
    start: 72281,
    length: 3,
    convRule: rule92
  }, {
    start: 72284,
    length: 46,
    convRule: rule14
  }, {
    start: 72330,
    length: 13,
    convRule: rule92
  }, {
    start: 72343,
    length: 1,
    convRule: rule124
  }, {
    start: 72344,
    length: 2,
    convRule: rule92
  }, {
    start: 72346,
    length: 3,
    convRule: rule2
  }, {
    start: 72349,
    length: 1,
    convRule: rule14
  }, {
    start: 72350,
    length: 5,
    convRule: rule2
  }, {
    start: 72384,
    length: 57,
    convRule: rule14
  }, {
    start: 72704,
    length: 9,
    convRule: rule14
  }, {
    start: 72714,
    length: 37,
    convRule: rule14
  }, {
    start: 72751,
    length: 1,
    convRule: rule124
  }, {
    start: 72752,
    length: 7,
    convRule: rule92
  }, {
    start: 72760,
    length: 6,
    convRule: rule92
  }, {
    start: 72766,
    length: 1,
    convRule: rule124
  }, {
    start: 72767,
    length: 1,
    convRule: rule92
  }, {
    start: 72768,
    length: 1,
    convRule: rule14
  }, {
    start: 72769,
    length: 5,
    convRule: rule2
  }, {
    start: 72784,
    length: 10,
    convRule: rule8
  }, {
    start: 72794,
    length: 19,
    convRule: rule17
  }, {
    start: 72816,
    length: 2,
    convRule: rule2
  }, {
    start: 72818,
    length: 30,
    convRule: rule14
  }, {
    start: 72850,
    length: 22,
    convRule: rule92
  }, {
    start: 72873,
    length: 1,
    convRule: rule124
  }, {
    start: 72874,
    length: 7,
    convRule: rule92
  }, {
    start: 72881,
    length: 1,
    convRule: rule124
  }, {
    start: 72882,
    length: 2,
    convRule: rule92
  }, {
    start: 72884,
    length: 1,
    convRule: rule124
  }, {
    start: 72885,
    length: 2,
    convRule: rule92
  }, {
    start: 72960,
    length: 7,
    convRule: rule14
  }, {
    start: 72968,
    length: 2,
    convRule: rule14
  }, {
    start: 72971,
    length: 38,
    convRule: rule14
  }, {
    start: 73009,
    length: 6,
    convRule: rule92
  }, {
    start: 73018,
    length: 1,
    convRule: rule92
  }, {
    start: 73020,
    length: 2,
    convRule: rule92
  }, {
    start: 73023,
    length: 7,
    convRule: rule92
  }, {
    start: 73030,
    length: 1,
    convRule: rule14
  }, {
    start: 73031,
    length: 1,
    convRule: rule92
  }, {
    start: 73040,
    length: 10,
    convRule: rule8
  }, {
    start: 73056,
    length: 6,
    convRule: rule14
  }, {
    start: 73063,
    length: 2,
    convRule: rule14
  }, {
    start: 73066,
    length: 32,
    convRule: rule14
  }, {
    start: 73098,
    length: 5,
    convRule: rule124
  }, {
    start: 73104,
    length: 2,
    convRule: rule92
  }, {
    start: 73107,
    length: 2,
    convRule: rule124
  }, {
    start: 73109,
    length: 1,
    convRule: rule92
  }, {
    start: 73110,
    length: 1,
    convRule: rule124
  }, {
    start: 73111,
    length: 1,
    convRule: rule92
  }, {
    start: 73112,
    length: 1,
    convRule: rule14
  }, {
    start: 73120,
    length: 10,
    convRule: rule8
  }, {
    start: 73440,
    length: 19,
    convRule: rule14
  }, {
    start: 73459,
    length: 2,
    convRule: rule92
  }, {
    start: 73461,
    length: 2,
    convRule: rule124
  }, {
    start: 73463,
    length: 2,
    convRule: rule2
  }, {
    start: 73648,
    length: 1,
    convRule: rule14
  }, {
    start: 73664,
    length: 21,
    convRule: rule17
  }, {
    start: 73685,
    length: 8,
    convRule: rule13
  }, {
    start: 73693,
    length: 4,
    convRule: rule3
  }, {
    start: 73697,
    length: 17,
    convRule: rule13
  }, {
    start: 73727,
    length: 1,
    convRule: rule2
  }, {
    start: 73728,
    length: 922,
    convRule: rule14
  }, {
    start: 74752,
    length: 111,
    convRule: rule128
  }, {
    start: 74864,
    length: 5,
    convRule: rule2
  }, {
    start: 74880,
    length: 196,
    convRule: rule14
  }, {
    start: 77824,
    length: 1071,
    convRule: rule14
  }, {
    start: 78896,
    length: 9,
    convRule: rule16
  }, {
    start: 82944,
    length: 583,
    convRule: rule14
  }, {
    start: 92160,
    length: 569,
    convRule: rule14
  }, {
    start: 92736,
    length: 31,
    convRule: rule14
  }, {
    start: 92768,
    length: 10,
    convRule: rule8
  }, {
    start: 92782,
    length: 2,
    convRule: rule2
  }, {
    start: 92880,
    length: 30,
    convRule: rule14
  }, {
    start: 92912,
    length: 5,
    convRule: rule92
  }, {
    start: 92917,
    length: 1,
    convRule: rule2
  }, {
    start: 92928,
    length: 48,
    convRule: rule14
  }, {
    start: 92976,
    length: 7,
    convRule: rule92
  }, {
    start: 92983,
    length: 5,
    convRule: rule2
  }, {
    start: 92988,
    length: 4,
    convRule: rule13
  }, {
    start: 92992,
    length: 4,
    convRule: rule91
  }, {
    start: 92996,
    length: 1,
    convRule: rule2
  }, {
    start: 92997,
    length: 1,
    convRule: rule13
  }, {
    start: 93008,
    length: 10,
    convRule: rule8
  }, {
    start: 93019,
    length: 7,
    convRule: rule17
  }, {
    start: 93027,
    length: 21,
    convRule: rule14
  }, {
    start: 93053,
    length: 19,
    convRule: rule14
  }, {
    start: 93760,
    length: 32,
    convRule: rule9
  }, {
    start: 93792,
    length: 32,
    convRule: rule12
  }, {
    start: 93824,
    length: 23,
    convRule: rule17
  }, {
    start: 93847,
    length: 4,
    convRule: rule2
  }, {
    start: 93952,
    length: 75,
    convRule: rule14
  }, {
    start: 94031,
    length: 1,
    convRule: rule92
  }, {
    start: 94032,
    length: 1,
    convRule: rule14
  }, {
    start: 94033,
    length: 55,
    convRule: rule124
  }, {
    start: 94095,
    length: 4,
    convRule: rule92
  }, {
    start: 94099,
    length: 13,
    convRule: rule91
  }, {
    start: 94176,
    length: 2,
    convRule: rule91
  }, {
    start: 94178,
    length: 1,
    convRule: rule2
  }, {
    start: 94179,
    length: 1,
    convRule: rule91
  }, {
    start: 94180,
    length: 1,
    convRule: rule92
  }, {
    start: 94192,
    length: 2,
    convRule: rule124
  }, {
    start: 94208,
    length: 6136,
    convRule: rule14
  }, {
    start: 100352,
    length: 1238,
    convRule: rule14
  }, {
    start: 101632,
    length: 9,
    convRule: rule14
  }, {
    start: 110592,
    length: 287,
    convRule: rule14
  }, {
    start: 110928,
    length: 3,
    convRule: rule14
  }, {
    start: 110948,
    length: 4,
    convRule: rule14
  }, {
    start: 110960,
    length: 396,
    convRule: rule14
  }, {
    start: 113664,
    length: 107,
    convRule: rule14
  }, {
    start: 113776,
    length: 13,
    convRule: rule14
  }, {
    start: 113792,
    length: 9,
    convRule: rule14
  }, {
    start: 113808,
    length: 10,
    convRule: rule14
  }, {
    start: 113820,
    length: 1,
    convRule: rule13
  }, {
    start: 113821,
    length: 2,
    convRule: rule92
  }, {
    start: 113823,
    length: 1,
    convRule: rule2
  }, {
    start: 113824,
    length: 4,
    convRule: rule16
  }, {
    start: 118784,
    length: 246,
    convRule: rule13
  }, {
    start: 119040,
    length: 39,
    convRule: rule13
  }, {
    start: 119081,
    length: 60,
    convRule: rule13
  }, {
    start: 119141,
    length: 2,
    convRule: rule124
  }, {
    start: 119143,
    length: 3,
    convRule: rule92
  }, {
    start: 119146,
    length: 3,
    convRule: rule13
  }, {
    start: 119149,
    length: 6,
    convRule: rule124
  }, {
    start: 119155,
    length: 8,
    convRule: rule16
  }, {
    start: 119163,
    length: 8,
    convRule: rule92
  }, {
    start: 119171,
    length: 2,
    convRule: rule13
  }, {
    start: 119173,
    length: 7,
    convRule: rule92
  }, {
    start: 119180,
    length: 30,
    convRule: rule13
  }, {
    start: 119210,
    length: 4,
    convRule: rule92
  }, {
    start: 119214,
    length: 59,
    convRule: rule13
  }, {
    start: 119296,
    length: 66,
    convRule: rule13
  }, {
    start: 119362,
    length: 3,
    convRule: rule92
  }, {
    start: 119365,
    length: 1,
    convRule: rule13
  }, {
    start: 119520,
    length: 20,
    convRule: rule17
  }, {
    start: 119552,
    length: 87,
    convRule: rule13
  }, {
    start: 119648,
    length: 25,
    convRule: rule17
  }, {
    start: 119808,
    length: 26,
    convRule: rule107
  }, {
    start: 119834,
    length: 26,
    convRule: rule20
  }, {
    start: 119860,
    length: 26,
    convRule: rule107
  }, {
    start: 119886,
    length: 7,
    convRule: rule20
  }, {
    start: 119894,
    length: 18,
    convRule: rule20
  }, {
    start: 119912,
    length: 26,
    convRule: rule107
  }, {
    start: 119938,
    length: 26,
    convRule: rule20
  }, {
    start: 119964,
    length: 1,
    convRule: rule107
  }, {
    start: 119966,
    length: 2,
    convRule: rule107
  }, {
    start: 119970,
    length: 1,
    convRule: rule107
  }, {
    start: 119973,
    length: 2,
    convRule: rule107
  }, {
    start: 119977,
    length: 4,
    convRule: rule107
  }, {
    start: 119982,
    length: 8,
    convRule: rule107
  }, {
    start: 119990,
    length: 4,
    convRule: rule20
  }, {
    start: 119995,
    length: 1,
    convRule: rule20
  }, {
    start: 119997,
    length: 7,
    convRule: rule20
  }, {
    start: 120005,
    length: 11,
    convRule: rule20
  }, {
    start: 120016,
    length: 26,
    convRule: rule107
  }, {
    start: 120042,
    length: 26,
    convRule: rule20
  }, {
    start: 120068,
    length: 2,
    convRule: rule107
  }, {
    start: 120071,
    length: 4,
    convRule: rule107
  }, {
    start: 120077,
    length: 8,
    convRule: rule107
  }, {
    start: 120086,
    length: 7,
    convRule: rule107
  }, {
    start: 120094,
    length: 26,
    convRule: rule20
  }, {
    start: 120120,
    length: 2,
    convRule: rule107
  }, {
    start: 120123,
    length: 4,
    convRule: rule107
  }, {
    start: 120128,
    length: 5,
    convRule: rule107
  }, {
    start: 120134,
    length: 1,
    convRule: rule107
  }, {
    start: 120138,
    length: 7,
    convRule: rule107
  }, {
    start: 120146,
    length: 26,
    convRule: rule20
  }, {
    start: 120172,
    length: 26,
    convRule: rule107
  }, {
    start: 120198,
    length: 26,
    convRule: rule20
  }, {
    start: 120224,
    length: 26,
    convRule: rule107
  }, {
    start: 120250,
    length: 26,
    convRule: rule20
  }, {
    start: 120276,
    length: 26,
    convRule: rule107
  }, {
    start: 120302,
    length: 26,
    convRule: rule20
  }, {
    start: 120328,
    length: 26,
    convRule: rule107
  }, {
    start: 120354,
    length: 26,
    convRule: rule20
  }, {
    start: 120380,
    length: 26,
    convRule: rule107
  }, {
    start: 120406,
    length: 26,
    convRule: rule20
  }, {
    start: 120432,
    length: 26,
    convRule: rule107
  }, {
    start: 120458,
    length: 28,
    convRule: rule20
  }, {
    start: 120488,
    length: 25,
    convRule: rule107
  }, {
    start: 120513,
    length: 1,
    convRule: rule6
  }, {
    start: 120514,
    length: 25,
    convRule: rule20
  }, {
    start: 120539,
    length: 1,
    convRule: rule6
  }, {
    start: 120540,
    length: 6,
    convRule: rule20
  }, {
    start: 120546,
    length: 25,
    convRule: rule107
  }, {
    start: 120571,
    length: 1,
    convRule: rule6
  }, {
    start: 120572,
    length: 25,
    convRule: rule20
  }, {
    start: 120597,
    length: 1,
    convRule: rule6
  }, {
    start: 120598,
    length: 6,
    convRule: rule20
  }, {
    start: 120604,
    length: 25,
    convRule: rule107
  }, {
    start: 120629,
    length: 1,
    convRule: rule6
  }, {
    start: 120630,
    length: 25,
    convRule: rule20
  }, {
    start: 120655,
    length: 1,
    convRule: rule6
  }, {
    start: 120656,
    length: 6,
    convRule: rule20
  }, {
    start: 120662,
    length: 25,
    convRule: rule107
  }, {
    start: 120687,
    length: 1,
    convRule: rule6
  }, {
    start: 120688,
    length: 25,
    convRule: rule20
  }, {
    start: 120713,
    length: 1,
    convRule: rule6
  }, {
    start: 120714,
    length: 6,
    convRule: rule20
  }, {
    start: 120720,
    length: 25,
    convRule: rule107
  }, {
    start: 120745,
    length: 1,
    convRule: rule6
  }, {
    start: 120746,
    length: 25,
    convRule: rule20
  }, {
    start: 120771,
    length: 1,
    convRule: rule6
  }, {
    start: 120772,
    length: 6,
    convRule: rule20
  }, {
    start: 120778,
    length: 1,
    convRule: rule107
  }, {
    start: 120779,
    length: 1,
    convRule: rule20
  }, {
    start: 120782,
    length: 50,
    convRule: rule8
  }, {
    start: 120832,
    length: 512,
    convRule: rule13
  }, {
    start: 121344,
    length: 55,
    convRule: rule92
  }, {
    start: 121399,
    length: 4,
    convRule: rule13
  }, {
    start: 121403,
    length: 50,
    convRule: rule92
  }, {
    start: 121453,
    length: 8,
    convRule: rule13
  }, {
    start: 121461,
    length: 1,
    convRule: rule92
  }, {
    start: 121462,
    length: 14,
    convRule: rule13
  }, {
    start: 121476,
    length: 1,
    convRule: rule92
  }, {
    start: 121477,
    length: 2,
    convRule: rule13
  }, {
    start: 121479,
    length: 5,
    convRule: rule2
  }, {
    start: 121499,
    length: 5,
    convRule: rule92
  }, {
    start: 121505,
    length: 15,
    convRule: rule92
  }, {
    start: 122880,
    length: 7,
    convRule: rule92
  }, {
    start: 122888,
    length: 17,
    convRule: rule92
  }, {
    start: 122907,
    length: 7,
    convRule: rule92
  }, {
    start: 122915,
    length: 2,
    convRule: rule92
  }, {
    start: 122918,
    length: 5,
    convRule: rule92
  }, {
    start: 123136,
    length: 45,
    convRule: rule14
  }, {
    start: 123184,
    length: 7,
    convRule: rule92
  }, {
    start: 123191,
    length: 7,
    convRule: rule91
  }, {
    start: 123200,
    length: 10,
    convRule: rule8
  }, {
    start: 123214,
    length: 1,
    convRule: rule14
  }, {
    start: 123215,
    length: 1,
    convRule: rule13
  }, {
    start: 123584,
    length: 44,
    convRule: rule14
  }, {
    start: 123628,
    length: 4,
    convRule: rule92
  }, {
    start: 123632,
    length: 10,
    convRule: rule8
  }, {
    start: 123647,
    length: 1,
    convRule: rule3
  }, {
    start: 124928,
    length: 197,
    convRule: rule14
  }, {
    start: 125127,
    length: 9,
    convRule: rule17
  }, {
    start: 125136,
    length: 7,
    convRule: rule92
  }, {
    start: 125184,
    length: 34,
    convRule: rule203
  }, {
    start: 125218,
    length: 34,
    convRule: rule204
  }, {
    start: 125252,
    length: 7,
    convRule: rule92
  }, {
    start: 125259,
    length: 1,
    convRule: rule91
  }, {
    start: 125264,
    length: 10,
    convRule: rule8
  }, {
    start: 125278,
    length: 2,
    convRule: rule2
  }, {
    start: 126065,
    length: 59,
    convRule: rule17
  }, {
    start: 126124,
    length: 1,
    convRule: rule13
  }, {
    start: 126125,
    length: 3,
    convRule: rule17
  }, {
    start: 126128,
    length: 1,
    convRule: rule3
  }, {
    start: 126129,
    length: 4,
    convRule: rule17
  }, {
    start: 126209,
    length: 45,
    convRule: rule17
  }, {
    start: 126254,
    length: 1,
    convRule: rule13
  }, {
    start: 126255,
    length: 15,
    convRule: rule17
  }, {
    start: 126464,
    length: 4,
    convRule: rule14
  }, {
    start: 126469,
    length: 27,
    convRule: rule14
  }, {
    start: 126497,
    length: 2,
    convRule: rule14
  }, {
    start: 126500,
    length: 1,
    convRule: rule14
  }, {
    start: 126503,
    length: 1,
    convRule: rule14
  }, {
    start: 126505,
    length: 10,
    convRule: rule14
  }, {
    start: 126516,
    length: 4,
    convRule: rule14
  }, {
    start: 126521,
    length: 1,
    convRule: rule14
  }, {
    start: 126523,
    length: 1,
    convRule: rule14
  }, {
    start: 126530,
    length: 1,
    convRule: rule14
  }, {
    start: 126535,
    length: 1,
    convRule: rule14
  }, {
    start: 126537,
    length: 1,
    convRule: rule14
  }, {
    start: 126539,
    length: 1,
    convRule: rule14
  }, {
    start: 126541,
    length: 3,
    convRule: rule14
  }, {
    start: 126545,
    length: 2,
    convRule: rule14
  }, {
    start: 126548,
    length: 1,
    convRule: rule14
  }, {
    start: 126551,
    length: 1,
    convRule: rule14
  }, {
    start: 126553,
    length: 1,
    convRule: rule14
  }, {
    start: 126555,
    length: 1,
    convRule: rule14
  }, {
    start: 126557,
    length: 1,
    convRule: rule14
  }, {
    start: 126559,
    length: 1,
    convRule: rule14
  }, {
    start: 126561,
    length: 2,
    convRule: rule14
  }, {
    start: 126564,
    length: 1,
    convRule: rule14
  }, {
    start: 126567,
    length: 4,
    convRule: rule14
  }, {
    start: 126572,
    length: 7,
    convRule: rule14
  }, {
    start: 126580,
    length: 4,
    convRule: rule14
  }, {
    start: 126585,
    length: 4,
    convRule: rule14
  }, {
    start: 126590,
    length: 1,
    convRule: rule14
  }, {
    start: 126592,
    length: 10,
    convRule: rule14
  }, {
    start: 126603,
    length: 17,
    convRule: rule14
  }, {
    start: 126625,
    length: 3,
    convRule: rule14
  }, {
    start: 126629,
    length: 5,
    convRule: rule14
  }, {
    start: 126635,
    length: 17,
    convRule: rule14
  }, {
    start: 126704,
    length: 2,
    convRule: rule6
  }, {
    start: 126976,
    length: 44,
    convRule: rule13
  }, {
    start: 127024,
    length: 100,
    convRule: rule13
  }, {
    start: 127136,
    length: 15,
    convRule: rule13
  }, {
    start: 127153,
    length: 15,
    convRule: rule13
  }, {
    start: 127169,
    length: 15,
    convRule: rule13
  }, {
    start: 127185,
    length: 37,
    convRule: rule13
  }, {
    start: 127232,
    length: 13,
    convRule: rule17
  }, {
    start: 127245,
    length: 161,
    convRule: rule13
  }, {
    start: 127462,
    length: 29,
    convRule: rule13
  }, {
    start: 127504,
    length: 44,
    convRule: rule13
  }, {
    start: 127552,
    length: 9,
    convRule: rule13
  }, {
    start: 127568,
    length: 2,
    convRule: rule13
  }, {
    start: 127584,
    length: 6,
    convRule: rule13
  }, {
    start: 127744,
    length: 251,
    convRule: rule13
  }, {
    start: 127995,
    length: 5,
    convRule: rule10
  }, {
    start: 128e3,
    length: 728,
    convRule: rule13
  }, {
    start: 128736,
    length: 13,
    convRule: rule13
  }, {
    start: 128752,
    length: 13,
    convRule: rule13
  }, {
    start: 128768,
    length: 116,
    convRule: rule13
  }, {
    start: 128896,
    length: 89,
    convRule: rule13
  }, {
    start: 128992,
    length: 12,
    convRule: rule13
  }, {
    start: 129024,
    length: 12,
    convRule: rule13
  }, {
    start: 129040,
    length: 56,
    convRule: rule13
  }, {
    start: 129104,
    length: 10,
    convRule: rule13
  }, {
    start: 129120,
    length: 40,
    convRule: rule13
  }, {
    start: 129168,
    length: 30,
    convRule: rule13
  }, {
    start: 129200,
    length: 2,
    convRule: rule13
  }, {
    start: 129280,
    length: 121,
    convRule: rule13
  }, {
    start: 129402,
    length: 82,
    convRule: rule13
  }, {
    start: 129485,
    length: 135,
    convRule: rule13
  }, {
    start: 129632,
    length: 14,
    convRule: rule13
  }, {
    start: 129648,
    length: 5,
    convRule: rule13
  }, {
    start: 129656,
    length: 3,
    convRule: rule13
  }, {
    start: 129664,
    length: 7,
    convRule: rule13
  }, {
    start: 129680,
    length: 25,
    convRule: rule13
  }, {
    start: 129712,
    length: 7,
    convRule: rule13
  }, {
    start: 129728,
    length: 3,
    convRule: rule13
  }, {
    start: 129744,
    length: 7,
    convRule: rule13
  }, {
    start: 129792,
    length: 147,
    convRule: rule13
  }, {
    start: 129940,
    length: 55,
    convRule: rule13
  }, {
    start: 130032,
    length: 10,
    convRule: rule8
  }, {
    start: 131072,
    length: 42718,
    convRule: rule14
  }, {
    start: 173824,
    length: 4149,
    convRule: rule14
  }, {
    start: 177984,
    length: 222,
    convRule: rule14
  }, {
    start: 178208,
    length: 5762,
    convRule: rule14
  }, {
    start: 183984,
    length: 7473,
    convRule: rule14
  }, {
    start: 194560,
    length: 542,
    convRule: rule14
  }, {
    start: 196608,
    length: 4939,
    convRule: rule14
  }, {
    start: 917505,
    length: 1,
    convRule: rule16
  }, {
    start: 917536,
    length: 96,
    convRule: rule16
  }, {
    start: 917760,
    length: 240,
    convRule: rule92
  }, {
    start: 983040,
    length: 65534,
    convRule: rule200
  }, {
    start: 1048576,
    length: 65534,
    convRule: rule200
  }];
  var checkAttr = function(categories) {
    return function($$char2) {
      var numOfBlocks = function() {
        var $43 = $$char2 < 256;
        if ($43) {
          return numLat1Blocks;
        }
        ;
        return numBlocks;
      }();
      var maybeConversionRule = getRule(allchars)($$char2)(numOfBlocks);
      if (maybeConversionRule instanceof Nothing) {
        return false;
      }
      ;
      if (maybeConversionRule instanceof Just) {
        return isJust(elemIndex2(maybeConversionRule.value0.category)(categories));
      }
      ;
      throw new Error("Failed pattern match at Data.CodePoint.Unicode.Internal (line 5645, column 5 - line 5647, column 86): " + [maybeConversionRule.constructor.name]);
    };
  };
  var uIswalpha = /* @__PURE__ */ checkAttr([gencatLL, gencatLU, gencatLT, gencatLM, gencatLO]);
  var uIswupper = /* @__PURE__ */ checkAttr([gencatLU, gencatLT]);

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index4) {
            return function(str) {
              var length9 = str.length;
              if (index4 < 0 || index4 >= length9)
                return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i2 = index4; ; --i2) {
                  var o = iter.next();
                  if (o.done)
                    return Nothing2;
                  if (i2 === 0)
                    return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index4)(str);
            };
          };
        };
      };
    };
  };
  var _countPrefix = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasStringIterator) {
        return function(pred) {
          return function(str) {
            var iter = str[Symbol.iterator]();
            for (var cpCount = 0; ; ++cpCount) {
              var o = iter.next();
              if (o.done)
                return cpCount;
              var cp = unsafeCodePointAt02(o.value);
              if (!pred(cp))
                return cpCount;
            }
          };
        };
      }
      return fallback;
    };
  };
  var _singleton = function(fallback) {
    return hasFromCodePoint ? String.fromCodePoint : fallback;
  };
  var _take = function(fallback) {
    return function(n) {
      if (hasStringIterator) {
        return function(str) {
          var accum = "";
          var iter = str[Symbol.iterator]();
          for (var i2 = 0; i2 < n; ++i2) {
            var o = iter.next();
            if (o.done)
              return accum;
            accum += o.value;
          }
          return accum;
        };
      }
      return fallback(n);
    };
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy10 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var compare2 = /* @__PURE__ */ compare(ordInt);
  var CodePoint = function(x) {
    return x;
  };
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons4 = function(s) {
    var v = length5(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop2(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop2(1)(s)
    });
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length5(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $75 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($76) {
      return singleton6($75($76));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div3(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod2(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var singleton7 = /* @__PURE__ */ _singleton(singletonFallback);
  var takeFallback = function(v) {
    return function(v1) {
      if (v < 1) {
        return "";
      }
      ;
      var v2 = uncons4(v1);
      if (v2 instanceof Just) {
        return singleton7(v2.value0.head) + takeFallback(v - 1 | 0)(v2.value0.tail);
      }
      ;
      return v1;
    };
  };
  var take3 = /* @__PURE__ */ _take(takeFallback);
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare2(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var countTail = function($copy_p) {
    return function($copy_s) {
      return function($copy_accum) {
        var $tco_var_p = $copy_p;
        var $tco_var_s = $copy_s;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(p2, s, accum) {
          var v = uncons4(s);
          if (v instanceof Just) {
            var $61 = p2(v.value0.head);
            if ($61) {
              $tco_var_p = p2;
              $tco_var_s = v.value0.tail;
              $copy_accum = accum + 1 | 0;
              return;
            }
            ;
            $tco_done = true;
            return accum;
          }
          ;
          $tco_done = true;
          return accum;
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_p, $tco_var_s, $copy_accum);
        }
        ;
        return $tco_result;
      };
    };
  };
  var countFallback = function(p2) {
    return function(s) {
      return countTail(p2)(s)(0);
    };
  };
  var countPrefix2 = /* @__PURE__ */ _countPrefix(countFallback)(unsafeCodePointAt0);
  var takeWhile2 = function(p2) {
    return function(s) {
      return take3(countPrefix2(p2)(s))(s);
    };
  };
  var codePointFromChar = function($77) {
    return CodePoint(fromEnum2($77));
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n, s) {
        var v = uncons4(s);
        if (v instanceof Just) {
          var $66 = n === 0;
          if ($66) {
            $tco_done = true;
            return new Just(v.value0.head);
          }
          ;
          $tco_var_n = n - 1 | 0;
          $copy_s = v.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v) {
    return function(v1) {
      if (v < 0) {
        return Nothing.value;
      }
      ;
      if (v === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy10("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Data.CodePoint.Unicode/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var isUpper = function($66) {
    return uIswupper(fromEnum3($66));
  };
  var isAlpha = function($71) {
    return uIswalpha(fromEnum3($71));
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head5, tail2) {
      this.head = head5;
      this.tail = tail2;
    };
    function finalCell(head5) {
      return new ConsCell(head5, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply3, map33, f) {
      var buildFrom = function(x, ys) {
        return apply3(map33(consList)(f(x)))(ys);
      };
      var go2 = function(acc, currentLen, xs) {
        if (currentLen === 0) {
          return acc;
        } else {
          var last3 = xs[currentLen - 1];
          return new Cont(function() {
            var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
            return built;
          });
        }
      };
      return function(array) {
        var acc = map33(finalCell)(f(array[array.length - 1]));
        var result2 = go2(acc, array.length - 1, array);
        while (result2 instanceof Cont) {
          result2 = result2.fn();
        }
        return map33(listToArray)(result2);
      };
    };
  }();

  // output/Parsing.String/index.js
  var fromEnum4 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var toEnum2 = /* @__PURE__ */ toEnum(boundedEnumChar);
  var show22 = /* @__PURE__ */ show(showChar);
  var updatePosSingle = function(v) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum4(cp);
        if (v1 === 10) {
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v2 = codePointAt(0)(after);
          if (v2 instanceof Just && fromEnum4(v2.value0) === 10) {
            return {
              index: v.index + 1 | 0,
              line: v.line,
              column: v.column
            };
          }
          ;
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v.index + 1 | 0,
            line: v.line,
            column: (v.column + 8 | 0) - mod3(v.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v.index + 1 | 0,
          line: v.line,
          column: v.column + 1 | 0
        };
      };
    };
  };
  var updatePosString = function($copy_pos) {
    return function($copy_before) {
      return function($copy_after) {
        var $tco_var_pos = $copy_pos;
        var $tco_var_before = $copy_before;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(pos, before, after) {
          var v = uncons4(before);
          if (v instanceof Nothing) {
            $tco_done = true;
            return pos;
          }
          ;
          if (v instanceof Just) {
            var newPos = function() {
              if ($$null2(v.value0.tail)) {
                return updatePosSingle(pos)(v.value0.head)(after);
              }
              ;
              if (otherwise) {
                return updatePosSingle(pos)(v.value0.head)(v.value0.tail);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 165, column 7 - line 167, column 52): " + []);
            }();
            $tco_var_pos = newPos;
            $tco_var_before = v.value0.tail;
            $copy_after = after;
            return;
          }
          ;
          throw new Error("Failed pattern match at Parsing.String (line 161, column 36 - line 168, column 38): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_pos, $tco_var_before, $copy_after);
        }
        ;
        return $tco_result;
      };
    };
  };
  var satisfyCodePoint = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw2) {
            return function(done) {
              var v3 = uncons4(v.value0);
              if (v3 instanceof Nothing) {
                return $$throw2(v, new ParseError("Unexpected EOF", v.value1));
              }
              ;
              if (v3 instanceof Just) {
                var $76 = f(v3.value0.head);
                if ($76) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v.value1)(v3.value0.head)(v3.value0.tail), true), v3.value0.head);
                }
                ;
                return $$throw2(v, new ParseError("Predicate unsatisfied", v.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 136, column 7 - line 143, column 73): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var satisfy = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw2) {
            return function(done) {
              var v3 = uncons4(v.value0);
              if (v3 instanceof Nothing) {
                return $$throw2(v, new ParseError("Unexpected EOF", v.value1));
              }
              ;
              if (v3 instanceof Just) {
                var cp = fromEnum4(v3.value0.head);
                var $85 = cp < 0 || cp > 65535;
                if ($85) {
                  return $$throw2(v, new ParseError("Expected Char", v.value1));
                }
                ;
                var ch = fromJust5(toEnum2(cp));
                var $86 = f(ch);
                if ($86) {
                  return done(new ParseState(v3.value0.tail, updatePosSingle(v.value1)(v3.value0.head)(v3.value0.tail), true), ch);
                }
                ;
                return $$throw2(v, new ParseError("Predicate unsatisfied", v.value1));
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 114, column 7 - line 129, column 75): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var eof = /* @__PURE__ */ mkFn5(function(v) {
    return function(v1) {
      return function(v2) {
        return function($$throw2) {
          return function(done) {
            var $133 = $$null2(v.value0);
            if ($133) {
              return done(new ParseState(v.value0, v.value1, true), unit);
            }
            ;
            return $$throw2(v, new ParseError("Expected EOF", v.value1));
          };
        };
      };
    };
  });
  var consumeWith = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw2) {
            return function(done) {
              var v3 = f(v.value0);
              if (v3 instanceof Left) {
                return $$throw2(v, new ParseError(v3.value0, v.value1));
              }
              ;
              if (v3 instanceof Right) {
                return done(new ParseState(v3.value0.remainder, updatePosString(v.value1)(v3.value0.consumed)(v3.value0.remainder), !$$null2(v3.value0.consumed)), v3.value0.value);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 286, column 7 - line 290, column 121): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var $$char = function(c) {
    return withErrorMessage(satisfy(function(v) {
      return v === c;
    }))(show22(c));
  };
  var anyCodePoint = /* @__PURE__ */ satisfyCodePoint(/* @__PURE__ */ $$const(true));
  var anyChar = /* @__PURE__ */ satisfy(/* @__PURE__ */ $$const(true));

  // output/Parsing.String.Basic/index.js
  var takeWhile1 = function(predicate) {
    return consumeWith(function(s) {
      var value19 = takeWhile2(predicate)(s);
      var len = length5(value19);
      var $27 = len > 0;
      if ($27) {
        return new Right({
          consumed: value19,
          remainder: drop2(length5(value19))(s),
          value: value19
        });
      }
      ;
      return new Left("Expected character satisfying predicate");
    });
  };

  // output/Parsing.Token/index.js
  var bind16 = /* @__PURE__ */ bind(bindParserT);
  var discard10 = /* @__PURE__ */ discard(discardUnit)(bindParserT);
  var pure19 = /* @__PURE__ */ pure(applicativeParserT);
  var token = function(tokpos) {
    return bind16(getParserT)(function(v) {
      var v1 = uncons(v.value0);
      if (v1 instanceof Nothing) {
        return fail2("Unexpected EOF");
      }
      ;
      if (v1 instanceof Just) {
        return discard10(stateParserT(function(v2) {
          return new Tuple(unit, new ParseState(v1.value0.tail, tokpos(v1.value0.head), true));
        }))(function() {
          return pure19(v1.value0.head);
        });
      }
      ;
      throw new Error("Failed pattern match at Parsing.Token (line 55, column 3 - line 59, column 16): " + [v1.constructor.name]);
    });
  };
  var eof2 = /* @__PURE__ */ bind16(getParserT)(function(v) {
    var $147 = $$null(v.value0);
    if ($147) {
      return consume;
    }
    ;
    return fail2("Expected EOF");
  });

  // output/Kwakwala.Output.Syllabic/index.js
  var evalStateT2 = /* @__PURE__ */ evalStateT(functorParserT);
  var bindStateT2 = /* @__PURE__ */ bindStateT(monadParserT);
  var bind17 = /* @__PURE__ */ bind(bindStateT2);
  var pure20 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeStateT(monadParserT));
  var foldr4 = /* @__PURE__ */ foldr(foldableList);
  var lift3 = /* @__PURE__ */ lift(monadTransStateT)(monadParserT);
  var discard11 = /* @__PURE__ */ discard(discardUnit)(bindStateT2);
  var monadStateStateT2 = /* @__PURE__ */ monadStateStateT(monadParserT);
  var get7 = /* @__PURE__ */ get(monadStateStateT2);
  var functorStateT2 = /* @__PURE__ */ functorStateT(functorParserT);
  var voidLeft4 = /* @__PURE__ */ voidLeft(functorStateT2);
  var put7 = /* @__PURE__ */ put(monadStateStateT2);
  var $$void7 = /* @__PURE__ */ $$void(functorStateT2);
  var alt6 = /* @__PURE__ */ alt(/* @__PURE__ */ altStateT(monadParserT)(altParserT));
  var show5 = /* @__PURE__ */ show(showParseError);
  var WordStart = /* @__PURE__ */ function() {
    function WordStart2() {
    }
    ;
    WordStart2.value = new WordStart2();
    return WordStart2;
  }();
  var AfterVowel = /* @__PURE__ */ function() {
    function AfterVowel2() {
    }
    ;
    AfterVowel2.value = new AfterVowel2();
    return AfterVowel2;
  }();
  var AfterLetter = /* @__PURE__ */ function() {
    function AfterLetter2(value0) {
      this.value0 = value0;
    }
    ;
    AfterLetter2.create = function(value0) {
      return new AfterLetter2(value0);
    };
    return AfterLetter2;
  }();
  var EndOfFile = /* @__PURE__ */ function() {
    function EndOfFile2() {
    }
    ;
    EndOfFile2.value = new EndOfFile2();
    return EndOfFile2;
  }();
  var runSyllabicEmitter = function(chrs) {
    return function(sem) {
      return runParser(chrs)(evalStateT2(sem)(WordStart.value));
    };
  };
  var peek = /* @__PURE__ */ lookAhead(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ token(function(v) {
    return initialPos;
  })));
  var many12 = /* @__PURE__ */ someRec(/* @__PURE__ */ monadRecStateT(monadRecParserT))(/* @__PURE__ */ alternativeStateT(monadParserT)(alternativeParserT));
  var many1ThenFold = function(dictSemigroup) {
    var append12 = append(dictSemigroup);
    return function(rpt) {
      return function(fnl) {
        return bind17(many12(rpt))(function(xs) {
          return bind17(fnl)(function(x) {
            return pure20(foldr4(append12)(x)(xs));
          });
        });
      };
    };
  };
  var liftEmit = lift3;
  var parseEOF = /* @__PURE__ */ discard11(/* @__PURE__ */ liftEmit(eof2))(function() {
    return bind17(get7)(function(st) {
      if (st instanceof WordStart) {
        return voidLeft4(put7(EndOfFile.value))("");
      }
      ;
      if (st instanceof AfterVowel) {
        return voidLeft4(put7(EndOfFile.value))("");
      }
      ;
      if (st instanceof AfterLetter) {
        return voidLeft4(put7(EndOfFile.value))(letterCoda(st.value0));
      }
      ;
      if (st instanceof EndOfFile) {
        return lift3(fail2("Already reached EOF."));
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 194, column 3 - line 198, column 58): " + [st.constructor.name]);
    });
  });
  var getVowel = /* @__PURE__ */ bind17(/* @__PURE__ */ lift3(peek))(function(rslt) {
    if (rslt instanceof Nothing) {
      return lift3(fail2("Can't get vowel; End of File."));
    }
    ;
    if (rslt instanceof Just) {
      var v = tryVowelCC(rslt.value0);
      if (v instanceof Nothing) {
        return lift3(fail2("Next character is not a vowel."));
      }
      ;
      if (v instanceof Just) {
        return discard11($$void7(lift3(token(function(v2) {
          return initialPos;
        }))))(function() {
          return pure20(v.value0);
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 114, column 17 - line 118, column 15): " + [v.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 112, column 3 - line 118, column 15): " + [rslt.constructor.name]);
  });
  var parseVowel = /* @__PURE__ */ bind17(getVowel)(function(v) {
    return bind17(get7)(function(c) {
      if (c instanceof AfterVowel) {
        return pure20(makeVowel(v));
      }
      ;
      if (c instanceof AfterLetter) {
        return discard11(put7(AfterVowel.value))(function() {
          return pure20(mergeLetters(c.value0)(v));
        });
      }
      ;
      if (c instanceof WordStart) {
        return discard11(put7(AfterVowel.value))(function() {
          return pure20(makeVowel(v));
        });
      }
      ;
      if (c instanceof EndOfFile) {
        return lift3(fail2("Already reached End of File"));
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 170, column 3 - line 178, column 59): " + [c.constructor.name]);
    });
  });
  var getPunct = /* @__PURE__ */ bind17(/* @__PURE__ */ lift3(peek))(function(rslt) {
    if (rslt instanceof Nothing) {
      return lift3(fail2("Can't get Punctuation; End of File."));
    }
    ;
    if (rslt instanceof Just && rslt.value0 instanceof Punct) {
      return discard11($$void7(lift3(token(function(v) {
        return initialPos;
      }))))(function() {
        return pure20(rslt.value0.value0);
      });
    }
    ;
    return lift3(fail2("Expected Punctuation; got Letter."));
  });
  var parsePuncts = /* @__PURE__ */ bind17(getPunct)(function(str) {
    return bind17(get7)(function(st) {
      if (st instanceof WordStart) {
        return pure20(str);
      }
      ;
      if (st instanceof AfterVowel) {
        return discard11(put7(WordStart.value))(function() {
          return pure20(str);
        });
      }
      ;
      if (st instanceof AfterLetter) {
        return discard11(put7(WordStart.value))(function() {
          return pure20(letterCoda(st.value0) + str);
        });
      }
      ;
      if (st instanceof EndOfFile) {
        return discard11(put7(WordStart.value))(function() {
          return pure20(str);
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 153, column 3 - line 164, column 17): " + [st.constructor.name]);
    });
  });
  var getCons = /* @__PURE__ */ bind17(/* @__PURE__ */ lift3(peek))(function(rslt) {
    if (rslt instanceof Nothing) {
      return lift3(fail2("Can't get Consonant; End of File."));
    }
    ;
    if (rslt instanceof Just) {
      var v = tryConsCC(rslt.value0);
      if (v instanceof Nothing) {
        return lift3(fail2("Next character is not a consonant."));
      }
      ;
      if (v instanceof Just) {
        return discard11($$void7(lift3(token(function(v1) {
          return initialPos;
        }))))(function() {
          return pure20(v.value0);
        });
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 129, column 17 - line 133, column 15): " + [v.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 127, column 3 - line 133, column 15): " + [rslt.constructor.name]);
  });
  var parseCons = /* @__PURE__ */ bind17(getCons)(function(c) {
    return bind17(get7)(function(s) {
      if (s instanceof AfterVowel) {
        return voidLeft4(put7(new AfterLetter(c)))("");
      }
      ;
      if (s instanceof WordStart) {
        return voidLeft4(put7(new AfterLetter(c)))("");
      }
      ;
      if (s instanceof AfterLetter) {
        return voidLeft4(put7(new AfterLetter(c)))(letterCoda(s.value0));
      }
      ;
      if (s instanceof EndOfFile) {
        return lift3(fail2("Already reached End of File."));
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 184, column 3 - line 188, column 66): " + [s.constructor.name]);
    });
  });
  var emitSyllabic = /* @__PURE__ */ alt6(parseCons)(/* @__PURE__ */ alt6(parseVowel)(parsePuncts));
  var emitSyllabics = /* @__PURE__ */ many1ThenFold(semigroupString)(emitSyllabic)(parseEOF);
  var outputSyllabics = function(lst) {
    var v = runSyllabicEmitter(lst)(emitSyllabics);
    if (v instanceof Left) {
      return show5(v.value0);
    }
    ;
    if (v instanceof Right) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Syllabic (line 70, column 23 - line 72, column 19): " + [v.constructor.name]);
  };

  // output/Kwakwala.Output.Umista/index.js
  var outputUmista$prime = function(v) {
    if (v instanceof M) {
      return "M";
    }
    ;
    if (v instanceof MY) {
      return "'M";
    }
    ;
    if (v instanceof N) {
      return "N";
    }
    ;
    if (v instanceof NY) {
      return "'N";
    }
    ;
    if (v instanceof P) {
      return "P";
    }
    ;
    if (v instanceof T) {
      return "T";
    }
    ;
    if (v instanceof B) {
      return "B";
    }
    ;
    if (v instanceof D) {
      return "D";
    }
    ;
    if (v instanceof PY) {
      return "P\u0313";
    }
    ;
    if (v instanceof TY) {
      return "T\u0313";
    }
    ;
    if (v instanceof TS) {
      return "Ts";
    }
    ;
    if (v instanceof TL) {
      return "T\u0142";
    }
    ;
    if (v instanceof DZ) {
      return "Dz";
    }
    ;
    if (v instanceof DL) {
      return "D\u0142";
    }
    ;
    if (v instanceof TSY) {
      return "T\u0315s";
    }
    ;
    if (v instanceof TLY) {
      return "T\u0315\u0142";
    }
    ;
    if (v instanceof S) {
      return "S";
    }
    ;
    if (v instanceof LH) {
      return "\u0141";
    }
    ;
    if (v instanceof L) {
      return "L";
    }
    ;
    if (v instanceof LY) {
      return "'L";
    }
    ;
    if (v instanceof J) {
      return "Y";
    }
    ;
    if (v instanceof JY) {
      return "'Y";
    }
    ;
    if (v instanceof K) {
      return "K";
    }
    ;
    if (v instanceof KW) {
      return "Kw";
    }
    ;
    if (v instanceof G) {
      return "G";
    }
    ;
    if (v instanceof GW) {
      return "Gw";
    }
    ;
    if (v instanceof KY) {
      return "K\u0313";
    }
    ;
    if (v instanceof KWY) {
      return "K\u0315w";
    }
    ;
    if (v instanceof Q) {
      return "\u1E34";
    }
    ;
    if (v instanceof QW) {
      return "\u1E34w";
    }
    ;
    if (v instanceof GU) {
      return "G\u0331";
    }
    ;
    if (v instanceof GUW) {
      return "G\u0331w";
    }
    ;
    if (v instanceof QY) {
      return "\u1E34\u0313";
    }
    ;
    if (v instanceof QWY) {
      return "\u1E34\u0315w";
    }
    ;
    if (v instanceof X) {
      return "X";
    }
    ;
    if (v instanceof XW) {
      return "Xw";
    }
    ;
    if (v instanceof XU) {
      return "X\u0331";
    }
    ;
    if (v instanceof XUW) {
      return "X\u0331w";
    }
    ;
    if (v instanceof W) {
      return "W";
    }
    ;
    if (v instanceof WY) {
      return "'W";
    }
    ;
    if (v instanceof Y) {
      return "'";
    }
    ;
    if (v instanceof H) {
      return "H";
    }
    ;
    if (v instanceof A) {
      return "A";
    }
    ;
    if (v instanceof E) {
      return "E";
    }
    ;
    if (v instanceof I) {
      return "I";
    }
    ;
    if (v instanceof O) {
      return "O";
    }
    ;
    if (v instanceof U) {
      return "U";
    }
    ;
    if (v instanceof AU) {
      return "A\u0331";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Umista (line 110, column 1 - line 110, column 38): " + [v.constructor.name]);
  };
  var outputUmista = function(v) {
    if (v instanceof M) {
      return "m";
    }
    ;
    if (v instanceof MY) {
      return "'m";
    }
    ;
    if (v instanceof N) {
      return "n";
    }
    ;
    if (v instanceof NY) {
      return "'n";
    }
    ;
    if (v instanceof P) {
      return "p";
    }
    ;
    if (v instanceof T) {
      return "t";
    }
    ;
    if (v instanceof B) {
      return "b";
    }
    ;
    if (v instanceof D) {
      return "d";
    }
    ;
    if (v instanceof PY) {
      return "p\u0313";
    }
    ;
    if (v instanceof TY) {
      return "t\u0313";
    }
    ;
    if (v instanceof TS) {
      return "ts";
    }
    ;
    if (v instanceof TL) {
      return "t\u0142";
    }
    ;
    if (v instanceof DZ) {
      return "dz";
    }
    ;
    if (v instanceof DL) {
      return "d\u0142";
    }
    ;
    if (v instanceof TSY) {
      return "t\u0315s";
    }
    ;
    if (v instanceof TLY) {
      return "t\u0315\u0142";
    }
    ;
    if (v instanceof S) {
      return "s";
    }
    ;
    if (v instanceof LH) {
      return "\u0142";
    }
    ;
    if (v instanceof L) {
      return "l";
    }
    ;
    if (v instanceof LY) {
      return "'l";
    }
    ;
    if (v instanceof J) {
      return "y";
    }
    ;
    if (v instanceof JY) {
      return "'y";
    }
    ;
    if (v instanceof K) {
      return "k";
    }
    ;
    if (v instanceof KW) {
      return "kw";
    }
    ;
    if (v instanceof G) {
      return "g";
    }
    ;
    if (v instanceof GW) {
      return "gw";
    }
    ;
    if (v instanceof KY) {
      return "k\u0313";
    }
    ;
    if (v instanceof KWY) {
      return "k\u0315w";
    }
    ;
    if (v instanceof Q) {
      return "\u1E35";
    }
    ;
    if (v instanceof QW) {
      return "\u1E35w";
    }
    ;
    if (v instanceof GU) {
      return "g\u0331";
    }
    ;
    if (v instanceof GUW) {
      return "g\u0331w";
    }
    ;
    if (v instanceof QY) {
      return "\u1E35\u0313";
    }
    ;
    if (v instanceof QWY) {
      return "\u1E35\u0315w";
    }
    ;
    if (v instanceof X) {
      return "x";
    }
    ;
    if (v instanceof XW) {
      return "xw";
    }
    ;
    if (v instanceof XU) {
      return "x\u0331";
    }
    ;
    if (v instanceof XUW) {
      return "x\u0331w";
    }
    ;
    if (v instanceof W) {
      return "w";
    }
    ;
    if (v instanceof WY) {
      return "'w";
    }
    ;
    if (v instanceof Y) {
      return "'";
    }
    ;
    if (v instanceof H) {
      return "h";
    }
    ;
    if (v instanceof A) {
      return "a";
    }
    ;
    if (v instanceof E) {
      return "e";
    }
    ;
    if (v instanceof I) {
      return "i";
    }
    ;
    if (v instanceof O) {
      return "o";
    }
    ;
    if (v instanceof U) {
      return "u";
    }
    ;
    if (v instanceof AU) {
      return "a\u0331";
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Umista (line 59, column 1 - line 59, column 37): " + [v.constructor.name]);
  };
  var outputUmistaLetter = function(v) {
    if (v instanceof Maj) {
      return outputUmista$prime(v.value0);
    }
    ;
    if (v instanceof Min2) {
      return outputUmista(v.value0);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Umista (line 161, column 1 - line 161, column 44): " + [v.constructor.name]);
  };
  var outputUmistaChars$prime = function(v) {
    if (v instanceof Nil) {
      return "";
    }
    ;
    if (v instanceof Cons && (v.value0 instanceof Punct && (v.value1 instanceof Cons && v.value1.value0 instanceof Kwak))) {
      if (isCharLetter(Y.value)(v.value1.value0)) {
        return v.value0.value0 + outputUmistaChars$prime(v.value1.value1);
      }
      ;
      if (otherwise) {
        return v.value0.value0 + (outputUmistaLetter(v.value1.value0.value0) + outputUmistaChars$prime(v.value1.value1));
      }
      ;
    }
    ;
    if (v instanceof Cons && v.value0 instanceof Punct) {
      return v.value0.value0 + outputUmistaChars$prime(v.value1);
    }
    ;
    if (v instanceof Cons && v.value0 instanceof Kwak) {
      return outputUmistaLetter(v.value0.value0) + outputUmistaChars$prime(v.value1);
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Output.Umista (line 181, column 1 - line 181, column 47): " + [v.constructor.name]);
  };
  var outputUmistaChars = function(v) {
    if (v instanceof Nil) {
      return "";
    }
    ;
    if (v instanceof Cons && v.value0 instanceof Kwak) {
      if (isCharLetter(Y.value)(v.value0)) {
        return outputUmistaChars$prime(v.value1);
      }
      ;
      if (otherwise) {
        return outputUmistaLetter(v.value0.value0) + outputUmistaChars$prime(v.value1);
      }
      ;
    }
    ;
    return outputUmistaChars$prime(v);
  };

  // output/Kwakwala.Parsing.Helpers/index.js
  var map26 = /* @__PURE__ */ map(functorParserT);
  var alt7 = /* @__PURE__ */ alt(altParserT);
  var voidLeft5 = /* @__PURE__ */ voidLeft(functorParserT);
  var bind18 = /* @__PURE__ */ bind(bindParserT);
  var pure21 = /* @__PURE__ */ pure(applicativeParserT);
  var eq5 = /* @__PURE__ */ eq(eqCodePoint);
  var lift22 = /* @__PURE__ */ lift2(applyParserT);
  var notEq2 = /* @__PURE__ */ notEq(eqCodePoint);
  var snocC = function(str) {
    return function(c) {
      return str + singleton7(c);
    };
  };
  var peekCode = function(dictMonadRec) {
    return alt7(map26(Just.create)(lookAhead(anyCodePoint)))(voidLeft5(eof)(Nothing.value));
  };
  var peek2 = function(dictMonadRec) {
    return alt7(map26(Just.create)(lookAhead(anyChar)))(voidLeft5(eof)(Nothing.value));
  };
  var peekChar = function(dictMonadRec) {
    return peek2(dictMonadRec);
  };
  var peekChar1 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var satisfyMaybe = function(p2) {
    var fx = function(v) {
      if (v instanceof Nothing) {
        return Nothing.value;
      }
      ;
      if (v instanceof Just) {
        var $18 = p2(v.value0);
        if ($18) {
          return new Just(v.value0);
        }
        ;
        return Nothing.value;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Helpers (line 68, column 11 - line 68, column 32): " + [v.constructor.name]);
    };
    return bind18(map26(fx)(peekChar1))(maybe(pure21(Nothing.value))(function(x) {
      return voidLeft5(anyChar)(new Just(x));
    }));
  };
  var liftP = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return false;
      }
      ;
      if (v1 instanceof Just) {
        return v(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Helpers (line 73, column 1 - line 73, column 58): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var isUpperC = function(c) {
    return isUpper(codePointFromChar(c));
  };
  var eqCP = function(chr) {
    return function(cp) {
      return eq5(codePointFromChar(chr))(cp);
    };
  };
  var consC = function(c) {
    return function(str) {
      return singleton7(c) + str;
    };
  };
  var codePointC = function(c) {
    return satisfyCodePoint(function(x) {
      return eq5(codePointFromChar(c))(x);
    });
  };
  var parsePipe = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    var comb2 = lift22(snocC);
    var comb1 = lift22(consC);
    return map26(Punct.create)(comb2(comb1(codePointC("|"))(takeWhile1(function(x) {
      return notEq2(x)(pip);
    })))(codePointC("|")));
  }();

  // output/Kwakwala.Parsing.Boas/index.js
  var alt8 = /* @__PURE__ */ alt(altParserT);
  var voidLeft6 = /* @__PURE__ */ voidLeft(functorParserT);
  var pure23 = /* @__PURE__ */ pure(applicativeParserT);
  var applySecond2 = /* @__PURE__ */ applySecond(applyParserT);
  var map27 = /* @__PURE__ */ map(functorParserT);
  var notEq3 = /* @__PURE__ */ notEq(eqCodePoint);
  var bind19 = /* @__PURE__ */ bind(bindParserT);
  var peekChar2 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var map110 = /* @__PURE__ */ map(functorFn);
  var append7 = /* @__PURE__ */ append(semigroupList);
  var parseZ = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("z"))(new Min2(DZ.value)))(voidLeft6($$char("Z"))(new Maj(DZ.value)));
  }();
  var parseY$prime = function(v) {
    if (v instanceof Nothing) {
      return pure23(new Min2(Y.value));
    }
    ;
    if (v instanceof Just) {
      if (v.value0 === "m" || v.value0 === "M") {
        return applySecond2(anyChar)(pure23(makeCase(isUpperC(v.value0))(MY.value)));
      }
      ;
      if (v.value0 === "n" || v.value0 === "N") {
        return applySecond2(anyChar)(pure23(makeCase(isUpperC(v.value0))(NY.value)));
      }
      ;
      if (v.value0 === "l" || v.value0 === "L") {
        return applySecond2(anyChar)(pure23(makeCase(isUpperC(v.value0))(LY.value)));
      }
      ;
      if (v.value0 === "y" || v.value0 === "Y") {
        return applySecond2(anyChar)(pure23(makeCase(isUpperC(v.value0))(JY.value)));
      }
      ;
      if (v.value0 === "w" || v.value0 === "W") {
        return applySecond2(anyChar)(pure23(makeCase(isUpperC(v.value0))(WY.value)));
      }
      ;
      if (otherwise) {
        return pure23(makeCase(isUpperC(v.value0))(Y.value));
      }
      ;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 381, column 1 - line 381, column 53): " + [v.constructor.name]);
  };
  var parseW = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("w"))(new Min2(W.value)))(voidLeft6($$char("W"))(new Maj(W.value)));
  }();
  var parseTY = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(TY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "s" || v1.value0 === "S") {
          return voidLeft6(anyChar)(makeCase(v)(TSY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(TY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 241, column 1 - line 241, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseS = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("s"))(new Min2(S.value)))(voidLeft6($$char("S"))(new Maj(S.value)));
  }();
  var parsePuncts2 = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    return map27(Punct.create)(takeWhile1(function(x) {
      return notEq3(x)(pip) && !isAlpha(x);
    }));
  }();
  var parseO = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("\xE2"))(new Min2(O.value)))(voidLeft6($$char("\xC2"))(new Maj(O.value)));
  }();
  var parseN = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("n"))(new Min2(N.value)))(voidLeft6($$char("N"))(new Maj(N.value)));
  }();
  var parseM = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("m"))(new Min2(M.value)))(voidLeft6($$char("M"))(new Maj(M.value)));
  }();
  var parseLH = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("\u0142"))(new Min2(LH.value)))(voidLeft6($$char("\u0141"))(new Maj(LH.value)));
  }();
  var parseL = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("l"))(new Min2(L.value)))(voidLeft6($$char("L"))(new Maj(L.value)));
  }();
  var parseJ = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("y"))(new Min2(J.value)))(voidLeft6($$char("Y"))(new Maj(J.value)));
  }();
  var parseH = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("h"))(new Min2(H.value)))(voidLeft6($$char("H"))(new Maj(H.value)));
  }();
  var parseE = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("\xE4"))(new Min2(E.value)))(voidLeft6($$char("\xC4"))(new Maj(E.value)));
  }();
  var parseD$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(D.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "z" || v1.value0 === "Z") {
          return voidLeft6(anyChar)(makeCase(v)(DZ.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(D.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 211, column 1 - line 211, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseD = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "d" || x === "D";
  })))(function(b2) {
    return bind19(peekChar2)(parseD$prime(b2));
  });
  var parseB = /* @__PURE__ */ function() {
    return alt8(voidLeft6($$char("b"))(new Min2(B.value)))(voidLeft6($$char("B"))(new Maj(B.value)));
  }();
  var parseAU = /* @__PURE__ */ function() {
    return alt8(voidLeft6(satisfy(function(x) {
      return x === "\u1D07" || (x === "\xEE" || x === "\xFB");
    }))(new Min2(AU.value)))(voidLeft6(satisfy(function(x) {
      return x === "\xCE" || x === "\xDB";
    }))(new Maj(AU.value)));
  }();
  var isUmlaut = function(v) {
    if (v === "\u0308") {
      return true;
    }
    ;
    if (v === "\u030E") {
      return true;
    }
    ;
    if (v === "\u030B") {
      return true;
    }
    ;
    if (v === "\u030F") {
      return true;
    }
    ;
    return false;
  };
  var isLabial = function(v) {
    if (v === "\u1D58") {
      return true;
    }
    ;
    if (v === "w") {
      return true;
    }
    ;
    return false;
  };
  var parseGU = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(GU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(GUW.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(GU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 325, column 1 - line 325, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseKE = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(KY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(KWY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(KY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 269, column 1 - line 269, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQE = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(QY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(QWY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(QY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 296, column 1 - line 296, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXU = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(X.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(XW.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(X.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 353, column 1 - line 353, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var isGlottal = function(v) {
    if (v === "\u1D4B") {
      return true;
    }
    ;
    if (v === "\u03B5") {
      return true;
    }
    ;
    return false;
  };
  var parseY = /* @__PURE__ */ bind19(/* @__PURE__ */ applySecond2(/* @__PURE__ */ satisfy(isGlottal))(peekChar2))(parseY$prime);
  var isEject = function(v) {
    return v === "!";
  };
  var parseKD = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isEject(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(KY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 263, column 1 - line 263, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseKW = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isEject(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(KWY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(KW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 275, column 1 - line 275, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseP = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "p" || x === "P";
  })))(function(b2) {
    return bind19(satisfyMaybe(isEject))(function(z) {
      return maybe(pure23(makeCase(b2)(P.value)))($$const(pure23(makeCase(b2)(PY.value))))(z);
    });
  });
  var parseQW = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(QW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isEject(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(QWY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(QW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 302, column 1 - line 302, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(Q.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseQW(v));
        }
        ;
        if (isEject(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseQE(v));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(Q.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 289, column 1 - line 289, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "q" || x === "Q";
  })))(function(b2) {
    return bind19(peekChar2)(parseQ$prime(b2));
  });
  var parseTS = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isEject(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(TSY.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(TS.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 235, column 1 - line 235, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "s" || v1.value0 === "S") {
          return bind19(applySecond2(anyChar)(peekChar2))(parseTS(v));
        }
        ;
        if (isEject(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseTY(v));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(T.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 228, column 1 - line 228, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "t" || x === "T";
  })))(function(b2) {
    return bind19(peekChar2)(parseT$prime(b2));
  });
  var isDotBelow = function(v) {
    if (v === "\u0323") {
      return true;
    }
    ;
    return false;
  };
  var parseGW = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(GW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isDotBelow(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(GUW.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(GW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 331, column 1 - line 331, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTL$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(TL.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "!") {
          return voidLeft6(anyChar)(makeCase(v)(TLY.value));
        }
        ;
        if (isDotBelow(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(DL.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(TL.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 367, column 1 - line 367, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTL = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "\u029F" || (x === "\u2C60" || x === "\u023D");
  })))(function(b2) {
    return bind19(peekChar2)(parseTL$prime(b2));
  });
  var isDotAfter = function(v) {
    if (v === "\xB7") {
      return true;
    }
    ;
    if (v === "\u02D9") {
      return true;
    }
    ;
    if (v === "\u0358") {
      return true;
    }
    ;
    if (v === "\u18DF") {
      return true;
    }
    ;
    if (v === "\u2022") {
      return true;
    }
    ;
    if (v === "\u22C5") {
      return true;
    }
    ;
    return false;
  };
  var parseG$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(G.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseGW(v));
        }
        ;
        if (isDotBelow(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseGU(v));
        }
        ;
        if (isDotAfter(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(G.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(G.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 316, column 1 - line 316, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "g" || x === "G";
  })))(function(b2) {
    return bind19(peekChar2)(parseG$prime(b2));
  });
  var parseK$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isLabial(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseKW(v));
        }
        ;
        if (isEject(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseKE(v));
        }
        ;
        if (isDotAfter(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseKD(v));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 255, column 1 - line 255, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "k" || x === "K";
  })))(function(b2) {
    return bind19(peekChar2)(parseK$prime(b2));
  });
  var parseX$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(XU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isDotBelow(v1.value0)) {
          return bind19(applySecond2(anyChar)(peekChar2))(parseXU(v));
        }
        ;
        if (isLabial(v1.value0)) {
          return applySecond2(anyChar)(pure23(makeCase(v)(XUW.value)));
        }
        ;
        if (isDotAfter(v1.value0)) {
          return applySecond2(anyChar)(pure23(makeCase(v)(X.value)));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(XU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 345, column 1 - line 345, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "x" || x === "X";
  })))(function(b2) {
    return bind19(peekChar2)(parseX$prime(b2));
  });
  var isCircumflex = function(v) {
    if (v === "\u0302") {
      return true;
    }
    ;
    return false;
  };
  var parseA$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(A.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isUmlaut(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(E.value));
        }
        ;
        if (isCircumflex(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(O.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(A.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 399, column 1 - line 399, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseA = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "a" || (x === "A" || (x === "\xE1" || (x === "\xC1" || (x === "\xE0" || x === "\xC0"))));
  })))(function(b2) {
    return bind19(peekChar2)(parseA$prime(b2));
  });
  var parseI$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(I.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isCircumflex(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(AU.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(I.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 414, column 1 - line 414, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseI = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "i" || x === "I";
  })))(function(b2) {
    return bind19(peekChar2)(parseI$prime(b2));
  });
  var parseU$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure23(makeCase(v)(U.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isCircumflex(v1.value0)) {
          return voidLeft6(anyChar)(makeCase(v)(AU.value));
        }
        ;
        if (otherwise) {
          return pure23(makeCase(v)(U.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 428, column 1 - line 428, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseU = /* @__PURE__ */ bind19(/* @__PURE__ */ map27(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "u" || x === "U";
  })))(function(b2) {
    return bind19(peekChar2)(parseU$prime(b2));
  });
  var parseBoasLetter = /* @__PURE__ */ choice(foldableArray)([parseA, parseE, parseI, parseO, parseU, parseAU, parseY, parseTL, parseQ, parseK, parseG, parseX, parseP, parseT, parseM, parseN, parseL, parseW, parseY, parseB, parseH, parseD, parseLH, parseJ, parseS, parseZ]);
  var fixVowels = function(v) {
    if (v instanceof Nil) {
      return Nil.value;
    }
    ;
    if (v instanceof Cons && v.value1 instanceof Nil) {
      return new Cons(v.value0, Nil.value);
    }
    ;
    if (v instanceof Cons && v.value1 instanceof Cons) {
      if (isKwkVow$prime$prime(v.value0) && isKwkVow$prime$prime(v.value1.value0)) {
        return new Cons(v.value0, new Cons(new Kwak(new Min2(Y.value)), fixVowels(new Cons(v.value1.value0, v.value1.value1))));
      }
      ;
      if (otherwise) {
        return new Cons(v.value0, fixVowels(new Cons(v.value1.value0, v.value1.value1)));
      }
      ;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 153, column 1 - line 153, column 50): " + [v.constructor.name]);
  };
  var caseOf = function(v) {
    if (v instanceof Maj) {
      return Maj.create;
    }
    ;
    if (v instanceof Min2) {
      return Min2.create;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 111, column 1 - line 111, column 51): " + [v.constructor.name]);
  };
  var parseBoasWord$prime = function(ltr) {
    if (isKwkVow$prime(ltr)) {
      return map27(function(v) {
        return append7(new Cons(caseOf(ltr)(Y.value), new Cons(ltr, Nil.value)))(v);
      })(many(parseBoasLetter));
    }
    ;
    if (otherwise) {
      return map27(function(v) {
        return new Cons(ltr, v);
      })(many(parseBoasLetter));
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Boas (line 106, column 1 - line 106, column 66): " + [ltr.constructor.name]);
  };
  var parseBoasWord = /* @__PURE__ */ bind19(parseBoasLetter)(parseBoasWord$prime);
  var parseBoasMain = /* @__PURE__ */ function() {
    return alt8(map27(map(functorList)(Kwak.create))(parseBoasWord))(alt8(map27(function(v) {
      return new Cons(v, Nil.value);
    })(parsePipe))(alt8(map27(function(v) {
      return new Cons(v, Nil.value);
    })(parsePuncts2))(map27(map110(map110(function(v) {
      return new Cons(v, Nil.value);
    })(Punct.create))(singleton7))(anyCodePoint))));
  }();
  var parseBoas = /* @__PURE__ */ map27(function($153) {
    return concat(toList($153));
  })(/* @__PURE__ */ many1(parseBoasMain));
  var encodeFromBoas = function(txt) {
    return fixVowels(fromRight(Nil.value)(runParser(txt)(parseBoas)));
  };

  // output/Kwakwala.Parsing.Grubb/index.js
  var bind20 = /* @__PURE__ */ bind(bindParserT);
  var map28 = /* @__PURE__ */ map(functorParserT);
  var pure24 = /* @__PURE__ */ pure(applicativeParserT);
  var alt9 = /* @__PURE__ */ alt(altParserT);
  var voidLeft7 = /* @__PURE__ */ voidLeft(functorParserT);
  var applySecond3 = /* @__PURE__ */ applySecond(applyParserT);
  var peekChar3 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var choice2 = /* @__PURE__ */ choice(foldableArray);
  var discard12 = /* @__PURE__ */ discard(discardUnit)(bindParserT);
  var $$void8 = /* @__PURE__ */ $$void(functorParserT);
  var when4 = /* @__PURE__ */ when(applicativeParserT);
  var disj1 = /* @__PURE__ */ disj(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean));
  var eq13 = /* @__PURE__ */ eq(eqCodePoint);
  var map111 = /* @__PURE__ */ map(functorFn);
  var append8 = /* @__PURE__ */ append(semigroupList);
  var map29 = /* @__PURE__ */ map(functorList);
  var parseZ2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "z" || (x === "Z" || (x === "\u01F3" || (x === "\u01F1" || x === "\u01F2")));
  })))(function(b2) {
    return pure24(makeCase(b2)(DZ.value));
  });
  var parseWonly = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "w" || x === "W";
  })))(function(b2) {
    return pure24(makeCase(b2)(W.value));
  });
  var parseU2 = /* @__PURE__ */ function() {
    return alt9(voidLeft7($$char("u"))(new Min2(U.value)))(voidLeft7($$char("U"))(new Maj(U.value)));
  }();
  var parseTY2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(TY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "s" || v1.value0 === "S") {
          return applySecond3(anyChar)(pure24(makeCase(v)(TSY.value)));
        }
        ;
        if (v1.value0 === "l" || v1.value0 === "L") {
          return applySecond3(anyChar)(pure24(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(TY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 296, column 1 - line 296, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseS2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "s" || x === "S";
  })))(function(b2) {
    return pure24(makeCase(b2)(S.value));
  });
  var parseO2 = /* @__PURE__ */ function() {
    return alt9(voidLeft7($$char("o"))(new Min2(O.value)))(voidLeft7($$char("O"))(new Maj(O.value)));
  }();
  var parseNonly = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "n" || x === "N";
  })))(function(b2) {
    return pure24(makeCase(b2)(N.value));
  });
  var parseMonly = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "m" || x === "M";
  })))(function(b2) {
    return pure24(makeCase(b2)(M.value));
  });
  var parseJonly = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "y" || x === "Y";
  })))(function(b2) {
    return pure24(makeCase(b2)(J.value));
  });
  var parseI2 = /* @__PURE__ */ function() {
    return alt9(voidLeft7($$char("i"))(new Min2(I.value)))(voidLeft7($$char("I"))(new Maj(I.value)));
  }();
  var parseH2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "h" || (x === "H" || (x === "j" || x === "J"));
  })))(function(b2) {
    return pure24(makeCase(b2)(H.value));
  });
  var parseD$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(D.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "z" || (v1.value0 === "Z" || v1.value0 === "\u1DBB")) {
          return applySecond3(anyChar)(pure24(makeCase(v)(DZ.value)));
        }
        ;
        if (v1.value0 === "l" || v1.value0 === "L") {
          return applySecond3(anyChar)(pure24(makeCase(v)(DL.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(D.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 229, column 1 - line 229, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseD2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "d" || x === "D";
  })))(function(b2) {
    return bind20(peekChar3)(parseD$prime2(b2));
  });
  var parseB2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "b" || x === "B";
  })))(function(b2) {
    return pure24(makeCase(b2)(B.value));
  });
  var parseA2 = /* @__PURE__ */ function() {
    return alt9(voidLeft7($$char("a"))(new Min2(A.value)))(voidLeft7($$char("A"))(new Maj(A.value)));
  }();
  var isLabial2 = function(v) {
    if (v === "w") {
      return true;
    }
    ;
    if (v === "W") {
      return true;
    }
    ;
    if (v === "\u1D42") {
      return true;
    }
    ;
    if (v === "\u02B7") {
      return true;
    }
    ;
    return false;
  };
  var isW = isLabial2;
  var parseGH = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(GU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(GUW.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(GU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 179, column 1 - line 179, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseKHY = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(QY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(QY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 146, column 1 - line 146, column 65): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXU2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(XU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(XU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 209, column 1 - line 209, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXW = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(XW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(XW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 215, column 1 - line 215, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var isH = function(v) {
    if (v === "h") {
      return true;
    }
    ;
    if (v === "H") {
      return true;
    }
    ;
    return false;
  };
  var parseE$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(AU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isH(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(E.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(AU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 476, column 1 - line 476, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseE2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "e" || x === "E";
  })))(function(b2) {
    return bind20(peekChar3)(parseE$prime(b2));
  });
  var parseGW2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(GW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isH(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(GUW.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(GW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 185, column 1 - line 185, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(G.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isH(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseGH(v));
        }
        ;
        if (isW(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseGW2(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(G.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 172, column 1 - line 172, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "g" || x === "G";
  })))(function(b2) {
    return bind20(peekChar3)(parseG$prime2(b2));
  });
  var parseKY = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(KY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(KWY.value)));
        }
        ;
        if (isH(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKHY(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(KY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 139, column 1 - line 139, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseLonly$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(L.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isH(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(LH.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(L.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 400, column 1 - line 400, column 66): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseLonly = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "l" || x === "L";
  })))(function(b2) {
    return bind20(peekChar3)(parseLonly$prime(b2));
  });
  var parseX$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(X.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isH(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseXU2(v));
        }
        ;
        if (isW(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseXW(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(X.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 202, column 1 - line 202, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "x" || x === "X";
  })))(function(b2) {
    return bind20(peekChar3)(parseX$prime2(b2));
  });
  var parseY$prime2 = function(v) {
    if (v instanceof Nothing) {
      return pure24(new Min2(Y.value));
    }
    ;
    if (v instanceof Just) {
      if (v.value0 === "m" || v.value0 === "M") {
        return applySecond3(anyChar)(pure24(makeCase(isUpperC(v.value0))(MY.value)));
      }
      ;
      if (v.value0 === "n" || v.value0 === "N") {
        return applySecond3(anyChar)(pure24(makeCase(isUpperC(v.value0))(NY.value)));
      }
      ;
      if (v.value0 === "y" || v.value0 === "Y") {
        return applySecond3(anyChar)(pure24(makeCase(isUpperC(v.value0))(JY.value)));
      }
      ;
      if (v.value0 === "w" || v.value0 === "W") {
        return applySecond3(anyChar)(pure24(makeCase(isUpperC(v.value0))(WY.value)));
      }
      ;
      if (v.value0 === "l" || v.value0 === "L") {
        return choice2([discard12($$void8(anyChar))(function() {
          return bind20(peekChar3)(function(y) {
            return discard12(when4(liftP(isH)(y))(fail2(`"'lh" error`)))(function() {
              return pure24(makeCase(isUpperC(v.value0))(LY.value));
            });
          });
        }), pure24(makeCase(isUpperC(v.value0))(Y.value))]);
      }
      ;
      if (otherwise) {
        var b2 = isUpperC(v.value0);
        return pure24(makeCase(b2)(Y.value));
      }
      ;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 430, column 1 - line 430, column 53): " + [v.constructor.name]);
  };
  var isApostCP = /* @__PURE__ */ disj1(/* @__PURE__ */ eqCP("'"))(/* @__PURE__ */ disj1(/* @__PURE__ */ eqCP("`"))(/* @__PURE__ */ disj1(/* @__PURE__ */ eqCP("\u0315"))(/* @__PURE__ */ disj1(/* @__PURE__ */ eqCP("\u0313"))(/* @__PURE__ */ disj1(/* @__PURE__ */ eqCP("\u02BC"))(/* @__PURE__ */ eqCP("7"))))));
  var parsePuncts3 = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    return map28(Punct.create)(takeWhile1(function(x) {
      return !(isAlpha(x) || (isApostCP(x) || eq13(x)(pip)));
    }));
  }();
  var isApost = function(v) {
    if (v === "'") {
      return true;
    }
    ;
    if (v === "`") {
      return true;
    }
    ;
    if (v === "\u0315") {
      return true;
    }
    ;
    if (v === "\u0313") {
      return true;
    }
    ;
    if (v === "\u02BC") {
      return true;
    }
    ;
    if (v === "7") {
      return true;
    }
    ;
    return false;
  };
  var parseKHW = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(QW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 158, column 1 - line 158, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseKH = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(Q.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKHY(v));
        }
        ;
        if (isW(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKHW(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(Q.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 132, column 1 - line 132, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "q" || x === "Q";
  })))(function(b2) {
    return bind20(peekChar3)(parseKH(b2));
  });
  var parseKW2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(KW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 152, column 1 - line 152, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKY(v));
        }
        ;
        if (isW(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKW2(v));
        }
        ;
        if (isH(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseKH(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 124, column 1 - line 124, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "k" || x === "K";
  })))(function(b2) {
    return bind20(peekChar3)(parseK$prime2(b2));
  });
  var parseP$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(P.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(PY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(P.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 262, column 1 - line 262, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseP2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "p" || x === "P";
  })))(function(b2) {
    return bind20(peekChar3)(parseP$prime(b2));
  });
  var parseTL2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(TL.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(TL.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 290, column 1 - line 290, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTS2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return applySecond3(anyChar)(pure24(makeCase(v)(TSY.value)));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(TS.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 284, column 1 - line 284, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseC = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "c" || x === "C";
  })))(function(b2) {
    return bind20(peekChar3)(parseTS2(b2));
  });
  var parseT$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure24(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost(v1.value0)) {
          return bind20(applySecond3(anyChar)(peekChar3))(parseTY2(v));
        }
        ;
        if (v1.value0 === "s" || v1.value0 === "S") {
          return bind20(applySecond3(anyChar)(peekChar3))(parseTS2(v));
        }
        ;
        if (v1.value0 === "l" || v1.value0 === "L") {
          return bind20(applySecond3(anyChar)(peekChar3))(parseTL2(v));
        }
        ;
        if (otherwise) {
          return pure24(makeCase(v)(T.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 276, column 1 - line 276, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT2 = /* @__PURE__ */ bind20(/* @__PURE__ */ map28(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "t" || x === "T";
  })))(function(b2) {
    return bind20(peekChar3)(parseT$prime2(b2));
  });
  var parseY2 = /* @__PURE__ */ bind20(/* @__PURE__ */ applySecond3(/* @__PURE__ */ satisfy(isApost))(peekChar3))(parseY$prime2);
  var parseGrubbLetter = /* @__PURE__ */ choice2([parseA2, parseE2, parseI2, parseO2, parseU2, parseK2, parseQ2, parseG2, parseX2, parseP2, parseT2, parseMonly, parseNonly, parseC, parseLonly, parseWonly, parseY2, parseB2, parseD2, parseJonly, parseS2, parseZ2, parseH2]);
  var caseOf2 = function(v) {
    return function(v1) {
      if (v instanceof Maj) {
        return new Maj(v1);
      }
      ;
      if (v instanceof Min2) {
        return new Min2(v1);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 524, column 1 - line 524, column 25): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseGrubbWord$prime = function(ltr) {
    if (isKwkVow$prime(ltr)) {
      return map28(append8(new Cons(caseOf2(ltr)(Y.value), new Cons(ltr, Nil.value))))(many(parseGrubbLetter));
    }
    ;
    if (otherwise) {
      return map28(Cons.create(ltr))(many(parseGrubbLetter));
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Grubb (line 518, column 1 - line 518, column 67): " + [ltr.constructor.name]);
  };
  var parseGrubbWord = /* @__PURE__ */ bind20(parseGrubbLetter)(parseGrubbWord$prime);
  var parseGrubbMain = /* @__PURE__ */ function() {
    return alt9(map28(map29(Kwak.create))(parseGrubbWord))(alt9(map28(singleton3)(parsePipe))(alt9(map28(singleton3)(parsePuncts3))(map28(map111(map111(map111(singleton3)(Punct.create))(singleton7))(codePointFromChar))(anyChar))));
  }();
  var parseGrubbAscii = /* @__PURE__ */ map28(/* @__PURE__ */ map111(concat)(toList))(/* @__PURE__ */ many1(parseGrubbMain));
  var encodeFromGrubbAscii = function(txt) {
    return fromRight(Nil.value)(runParser(txt)(parseGrubbAscii));
  };

  // output/Kwakwala.Parsing.Island/index.js
  var bind21 = /* @__PURE__ */ bind(bindParserT);
  var map30 = /* @__PURE__ */ map(functorParserT);
  var pure25 = /* @__PURE__ */ pure(applicativeParserT);
  var peekChar4 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var alt10 = /* @__PURE__ */ alt(altParserT);
  var voidLeft8 = /* @__PURE__ */ voidLeft(functorParserT);
  var applySecond4 = /* @__PURE__ */ applySecond(applyParserT);
  var disj12 = /* @__PURE__ */ disj(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean));
  var eq14 = /* @__PURE__ */ eq(eqCodePoint);
  var map112 = /* @__PURE__ */ map(functorFn);
  var tstm = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return false;
      }
      ;
      if (v1 instanceof Just) {
        return v(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 417, column 1 - line 417, column 57): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseZ3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "z" || (x === "Z" || (x === "\u01F3" || (x === "\u01F1" || x === "\u01F2")));
  })))(function(b2) {
    return pure25(makeCase(b2)(DZ.value));
  });
  var parseY3 = /* @__PURE__ */ discard(discardUnit)(bindParserT)(/* @__PURE__ */ $$void(functorParserT)(/* @__PURE__ */ $$char("%")))(function() {
    return bind21(map30(tstm(isUpperC))(peekChar4))(function(b2) {
      return pure25(makeCase(b2)(Y.value));
    });
  });
  var parseU3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("u"))(new Min2(U.value)))(voidLeft8($$char("U"))(new Maj(U.value)));
  }();
  var parseS3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("s"))(new Min2(S.value)))(voidLeft8($$char("S"))(new Maj(S.value)));
  }();
  var parseO3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("o"))(new Min2(O.value)))(voidLeft8($$char("O"))(new Maj(O.value)));
  }();
  var parseLH2 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char(">"))(new Min2(LH.value)))(voidLeft8($$char("<"))(new Maj(LH.value)));
  }();
  var parseI3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("i"))(new Min2(I.value)))(voidLeft8($$char("I"))(new Maj(I.value)));
  }();
  var parseH3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("h"))(new Min2(H.value)))(voidLeft8($$char("H"))(new Maj(H.value)));
  }();
  var parseE3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("e"))(new Min2(E.value)))(voidLeft8($$char("E"))(new Maj(E.value)));
  }();
  var parseDL = /* @__PURE__ */ function() {
    return voidLeft8($$char("]"))(new Min2(DL.value));
  }();
  var parseD$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(D.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "z" || (v1.value0 === "Z" || v1.value0 === "+")) {
          return applySecond4(anyChar)(pure25(makeCase(v)(DZ.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(D.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 237, column 1 - line 237, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseD3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpper)(/* @__PURE__ */ satisfyCodePoint(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("d"))(/* @__PURE__ */ eqCP("D")))))(function(b2) {
    return bind21(peekChar4)(parseD$prime3(b2));
  });
  var parseB3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "b" || x === "B";
  })))(function(b2) {
    return pure25(makeCase(b2)(B.value));
  });
  var parseAU2 = /* @__PURE__ */ function() {
    return voidLeft8($$char("@"))(new Min2(AU.value));
  }();
  var parseA3 = /* @__PURE__ */ function() {
    return alt10(voidLeft8($$char("a"))(new Min2(A.value)))(voidLeft8($$char("A"))(new Maj(A.value)));
  }();
  var isWedge = function(v) {
    if (v === "}") {
      return true;
    }
    ;
    if (v === "^") {
      return true;
    }
    ;
    return false;
  };
  var isOtherAlphCP = /* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("["))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("]"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("{"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("}"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("%"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP(">"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("<"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("+"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("@"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("#"))(/* @__PURE__ */ eqCP("^")))))))))));
  var isMacron = function(v) {
    if (v === "-") {
      return true;
    }
    ;
    if (v === "=") {
      return true;
    }
    ;
    return false;
  };
  var parseMacron = /* @__PURE__ */ function() {
    return voidLeft8(satisfy(isMacron))(new Punct("\u0304"));
  }();
  var isLabial3 = function(v) {
    if (v === "#") {
      return true;
    }
    ;
    if (v === "w") {
      return true;
    }
    ;
    return false;
  };
  var isW2 = isLabial3;
  var parseGU2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(GU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(GUW.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(GU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 185, column 1 - line 185, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(G.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isWedge(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseGU2(v));
        }
        ;
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(GW.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(G.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 178, column 1 - line 178, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "g" || x === "G";
  })))(function(b2) {
    return bind21(peekChar4)(parseG$prime3(b2));
  });
  var parseKY2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(KY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(KY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 127, column 1 - line 127, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQY = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(QY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(QY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 156, column 1 - line 156, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXU3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(XU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(XU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 220, column 1 - line 220, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(X.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isWedge(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseXU3(v));
        }
        ;
        if (isW2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(XW.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(X.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 213, column 1 - line 213, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "x" || x === "X";
  })))(function(b2) {
    return bind21(peekChar4)(parseX$prime3(b2));
  });
  var isApostCP2 = /* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("{"))(/* @__PURE__ */ disj12(/* @__PURE__ */ eqCP("`"))(/* @__PURE__ */ eqCP("|")));
  var parsePuncts4 = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    return map30(Punct.create)(takeWhile1(function(x) {
      return !(isAlpha(x) || (isApostCP2(x) || (isOtherAlphCP(x) || eq14(x)(pip))));
    }));
  }();
  var isApost2 = function(v) {
    if (v === "{") {
      return true;
    }
    ;
    if (v === "`") {
      return true;
    }
    ;
    if (v === "|") {
      return true;
    }
    ;
    return false;
  };
  var parseC$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(TSY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(TS.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 293, column 1 - line 293, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseC2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "c" || x === "C";
  })))(function(b2) {
    return bind21(peekChar4)(parseC$prime(b2));
  });
  var parseJ$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(J.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(JY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(J.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 343, column 1 - line 343, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseJ2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "y" || (x === "Y" || (x === "j" || x === "J"));
  })))(function(b2) {
    return bind21(peekChar4)(parseJ$prime(b2));
  });
  var parseKW3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(KW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 133, column 1 - line 133, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseKY2(v));
        }
        ;
        if (isW2(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseKW3(v));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 120, column 1 - line 120, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "k" || x === "K";
  })))(function(b2) {
    return bind21(peekChar4)(parseK$prime3(b2));
  });
  var parseL$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(L.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(LY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(L.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 356, column 1 - line 356, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseL2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "l" || x === "L";
  })))(function(b2) {
    return bind21(peekChar4)(parseL$prime(b2));
  });
  var parseM$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(M.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(MY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(M.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 314, column 1 - line 314, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseM2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "m" || x === "M";
  })))(function(b2) {
    return bind21(peekChar4)(parseM$prime(b2));
  });
  var parseN$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(N.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(NY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(N.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 327, column 1 - line 327, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseN2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "n" || x === "N";
  })))(function(b2) {
    return bind21(peekChar4)(parseN$prime(b2));
  });
  var parseP$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(P.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(PY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(P.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 267, column 1 - line 267, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseP3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "p" || x === "P";
  })))(function(b2) {
    return bind21(peekChar4)(parseP$prime2(b2));
  });
  var parseQW2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(QW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(QW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 162, column 1 - line 162, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(Q.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseQY(v));
        }
        ;
        if (isW2(v1.value0)) {
          return bind21(applySecond4(anyChar)(peekChar4))(parseQW2(v));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(Q.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 149, column 1 - line 149, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "q" || x === "Q";
  })))(function(b2) {
    return bind21(peekChar4)(parseQ$prime2(b2));
  });
  var parseT$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(TY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(T.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 280, column 1 - line 280, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "t" || x === "T";
  })))(function(b2) {
    return bind21(peekChar4)(parseT$prime3(b2));
  });
  var parseTL$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(TL.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(TL.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 400, column 1 - line 400, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTL3 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "[";
  })))(function(b2) {
    return bind21(peekChar4)(parseTL$prime2(b2));
  });
  var parseW$prime = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure25(makeCase(v)(W.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost2(v1.value0)) {
          return applySecond4(anyChar)(pure25(makeCase(v)(WY.value)));
        }
        ;
        if (otherwise) {
          return pure25(makeCase(v)(W.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Island (line 379, column 1 - line 379, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseW2 = /* @__PURE__ */ bind21(/* @__PURE__ */ map30(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "w" || x === "W";
  })))(function(b2) {
    return bind21(peekChar4)(parseW$prime(b2));
  });
  var parseIslandLetter = /* @__PURE__ */ choice(foldableArray)([parseA3, parseE3, parseI3, parseO3, parseU3, parseAU2, parseK3, parseQ3, parseG3, parseX3, parseP3, parseT3, parseM2, parseN2, parseL2, parseW2, parseY3, parseB3, parseH3, parseD3, parseLH2, parseJ2, parseS3, parseZ3, parseDL, parseTL3, parseC2]);
  var parseIslandLetter$prime = /* @__PURE__ */ function() {
    return alt10(map30(Kwak.create)(parseIslandLetter))(parseMacron);
  }();
  var parseIslandCharNew = /* @__PURE__ */ function() {
    return alt10(parseIslandLetter$prime)(alt10(parsePipe)(alt10(parsePuncts4)(map30(map112(Punct.create)(singleton7))(anyCodePoint))));
  }();
  var parseIsland = /* @__PURE__ */ map30(toList)(/* @__PURE__ */ many1(parseIslandCharNew));
  var encodeFromIsland = function(txt) {
    return fromRight(Nil.value)(runParser(txt)(parseIsland));
  };

  // output/Kwakwala.Parsing.Napa/index.js
  var bind22 = /* @__PURE__ */ bind(bindParserT);
  var pure26 = /* @__PURE__ */ pure(applicativeParserT);
  var map31 = /* @__PURE__ */ map(functorParserT);
  var peekCode2 = /* @__PURE__ */ peekCode(monadRecIdentity);
  var alt11 = /* @__PURE__ */ alt(altParserT);
  var voidLeft9 = /* @__PURE__ */ voidLeft(functorParserT);
  var applySecond5 = /* @__PURE__ */ applySecond(applyParserT);
  var peekChar5 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var disj13 = /* @__PURE__ */ disj(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean));
  var eq15 = /* @__PURE__ */ eq(eqCodePoint);
  var map113 = /* @__PURE__ */ map(functorFn);
  var parseZ4 = /* @__PURE__ */ bind22(/* @__PURE__ */ satisfy(function(x) {
    return x === "z" || (x === "Z" || (x === "\u01F3" || (x === "\u01F1" || x === "\u01F2")));
  }))(function(c) {
    return bind22(pure26(isUpper(codePointFromChar(c))))(function(b2) {
      return pure26(makeCase(b2)(DZ.value));
    });
  });
  var parseY4 = /* @__PURE__ */ function() {
    var tstm2 = function(v) {
      return function(v1) {
        if (v1 instanceof Nothing) {
          return false;
        }
        ;
        if (v1 instanceof Just) {
          return v(v1.value0);
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 410, column 9 - line 410, column 32): " + [v.constructor.name, v1.constructor.name]);
      };
    };
    return discard(discardUnit)(bindParserT)($$void(functorParserT)($$char("\u0294")))(function() {
      return bind22(map31(tstm2(isUpper))(peekCode2))(function(b2) {
        return pure26(makeCase(b2)(Y.value));
      });
    });
  }();
  var parseU4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("u"))(new Min2(U.value)))(voidLeft9($$char("U"))(new Maj(U.value)));
  }();
  var parseS4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("s"))(new Min2(S.value)))(voidLeft9($$char("S"))(new Maj(S.value)));
  }();
  var parseO4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("o"))(new Min2(O.value)))(voidLeft9($$char("O"))(new Maj(O.value)));
  }();
  var parseLH3 = /* @__PURE__ */ function() {
    return alt11(voidLeft9(satisfy(function(x) {
      return x === "\u0142" || (x === "\u019A" || (x === "\u026B" || x === "\u026C"));
    }))(new Min2(LH.value)))(alt11(voidLeft9($$char("\u0141"))(new Maj(LH.value)))(voidLeft9($$char("\u2C62"))(new Maj(LH.value))));
  }();
  var parseI4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("i"))(new Min2(I.value)))(voidLeft9($$char("I"))(new Maj(I.value)));
  }();
  var parseH4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("h"))(new Min2(H.value)))(voidLeft9($$char("H"))(new Maj(H.value)));
  }();
  var parseE4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("e"))(new Min2(E.value)))(voidLeft9($$char("E"))(new Maj(E.value)));
  }();
  var parseDL2 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("\u03BB"))(new Min2(DL.value)))(voidLeft9($$char("\u039B"))(new Maj(DL.value)));
  }();
  var parseD$prime4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(D.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "z" || (v1.value0 === "Z" || v1.value0 === "\u1DBB")) {
          return applySecond5(anyChar)(pure26(makeCase(v)(DZ.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(D.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 222, column 1 - line 222, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseD4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "d" || x === "D";
  })))(function(b2) {
    return bind22(peekChar5)(parseD$prime4(b2));
  });
  var parseB4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "b" || x === "B";
  })))(function(b2) {
    return pure26(makeCase(b2)(B.value));
  });
  var parseAU3 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("\u0259"))(new Min2(AU.value)))(voidLeft9($$char("\u018F"))(new Maj(AU.value)));
  }();
  var parseA4 = /* @__PURE__ */ function() {
    return alt11(voidLeft9($$char("a"))(new Min2(A.value)))(voidLeft9($$char("A"))(new Maj(A.value)));
  }();
  var isWedge2 = function(v) {
    if (v === "\u030C") {
      return true;
    }
    ;
    if (v === "\u0306") {
      return true;
    }
    ;
    return false;
  };
  var isLabial4 = function(v) {
    if (v === "w") {
      return true;
    }
    ;
    if (v === "W") {
      return true;
    }
    ;
    if (v === "\u1D42") {
      return true;
    }
    ;
    if (v === "\u02B7") {
      return true;
    }
    ;
    return false;
  };
  var isW3 = isLabial4;
  var parseGU3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(GU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(GUW.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(GU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 181, column 1 - line 181, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG$prime4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(G.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isWedge2(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseGU3(v));
        }
        ;
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(GW.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(G.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 159, column 1 - line 159, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "g" || x === "G";
  })))(function(b2) {
    return bind22(peekChar5)(parseG$prime4(b2));
  });
  var parseGUB = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "\u01E7" || x === "\u01E6";
  })))(function(b2) {
    return bind22(peekChar5)(parseGU3(b2));
  });
  var parseKY3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(KY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(KY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 100, column 1 - line 100, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQY2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(QY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(QY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 135, column 1 - line 135, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXU4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(XU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(XU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 205, column 1 - line 205, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX$prime4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(X.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isWedge2(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseXU4(v));
        }
        ;
        if (isW3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(XW.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(X.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 198, column 1 - line 198, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "x" || x === "X";
  })))(function(b2) {
    return bind22(peekChar5)(parseX$prime4(b2));
  });
  var isApostCode = /* @__PURE__ */ disj13(/* @__PURE__ */ eq15(/* @__PURE__ */ codePointFromChar("'")))(/* @__PURE__ */ disj13(/* @__PURE__ */ eq15(/* @__PURE__ */ codePointFromChar("`")))(/* @__PURE__ */ disj13(/* @__PURE__ */ eq15(/* @__PURE__ */ codePointFromChar("\u0315")))(/* @__PURE__ */ eq15(/* @__PURE__ */ codePointFromChar("\u0313")))));
  var parsePuncts5 = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    return map31(Punct.create)(takeWhile1(function(x) {
      return !(isAlpha(x) || (isApostCode(x) || eq15(x)(pip)));
    }));
  }();
  var isApost3 = function(v) {
    if (v === "'") {
      return true;
    }
    ;
    if (v === "`") {
      return true;
    }
    ;
    if (v === "\u0315") {
      return true;
    }
    ;
    if (v === "\u0313") {
      return true;
    }
    ;
    return false;
  };
  var parseC$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(TSY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(TS.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 282, column 1 - line 282, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseC3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "c" || x === "C";
  })))(function(b2) {
    return bind22(peekChar5)(parseC$prime2(b2));
  });
  var parseJ$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(J.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(JY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(J.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 335, column 1 - line 335, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseJ3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "y" || (x === "Y" || (x === "j" || x === "J"));
  })))(function(b2) {
    return bind22(peekChar5)(parseJ$prime2(b2));
  });
  var parseKW4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(KW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 107, column 1 - line 107, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK$prime4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseKY3(v));
        }
        ;
        if (isW3(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseKW4(v));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 91, column 1 - line 91, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "k" || x === "K";
  })))(function(b2) {
    return bind22(peekChar5)(parseK$prime4(b2));
  });
  var parseL$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(L.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(LY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(L.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 349, column 1 - line 349, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseL3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "l" || x === "L";
  })))(function(b2) {
    return bind22(peekChar5)(parseL$prime2(b2));
  });
  var parseM$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(M.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(MY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(M.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 304, column 1 - line 304, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseM3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "m" || x === "M";
  })))(function(b2) {
    return bind22(peekChar5)(parseM$prime2(b2));
  });
  var parseN$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(N.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(NY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(N.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 318, column 1 - line 318, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseN3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "n" || x === "N";
  })))(function(b2) {
    return bind22(peekChar5)(parseN$prime2(b2));
  });
  var parseP$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(P.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(PY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(P.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 254, column 1 - line 254, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseP4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "p" || x === "P";
  })))(function(b2) {
    return bind22(peekChar5)(parseP$prime3(b2));
  });
  var parseQW3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(QW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(QW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 142, column 1 - line 142, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(Q.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseQY2(v));
        }
        ;
        if (isW3(v1.value0)) {
          return bind22(applySecond5(anyChar)(peekChar5))(parseQW3(v));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(Q.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 126, column 1 - line 126, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "q" || x === "Q";
  })))(function(b2) {
    return bind22(peekChar5)(parseQ$prime3(b2));
  });
  var parseT$prime4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(TY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(T.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 268, column 1 - line 268, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "t" || x === "T";
  })))(function(b2) {
    return bind22(peekChar5)(parseT$prime4(b2));
  });
  var parseTL$prime3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(TL.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(TL.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 394, column 1 - line 394, column 63): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTL4 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "\u019B";
  })))(function(b2) {
    return bind22(peekChar5)(parseTL$prime3(b2));
  });
  var parseW$prime2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure26(makeCase(v)(W.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost3(v1.value0)) {
          return applySecond5(anyChar)(pure26(makeCase(v)(WY.value)));
        }
        ;
        if (otherwise) {
          return pure26(makeCase(v)(W.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Napa (line 371, column 1 - line 371, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseW3 = /* @__PURE__ */ bind22(/* @__PURE__ */ map31(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "w" || x === "W";
  })))(function(b2) {
    return bind22(peekChar5)(parseW$prime2(b2));
  });
  var parseNapaLetter = /* @__PURE__ */ choice(foldableArray)([parseA4, parseE4, parseI4, parseO4, parseU4, parseAU3, parseK4, parseQ4, parseG4, parseGUB, parseX4, parseP4, parseT4, parseM3, parseN3, parseL3, parseW3, parseY4, parseB4, parseH4, parseD4, parseLH3, parseJ3, parseS4, parseZ4, parseDL2, parseTL4, parseC3]);
  var parseNapaCharNew = /* @__PURE__ */ function() {
    return alt11(map31(Kwak.create)(parseNapaLetter))(alt11(parsePipe)(alt11(parsePuncts5)(map31(map113(Punct.create)(singleton7))(anyCodePoint))));
  }();
  var parseNapa = /* @__PURE__ */ map31(toList)(/* @__PURE__ */ many1(parseNapaCharNew));
  var encodeFromNapa = function(txt) {
    return fromRight(Nil.value)(runParser(txt)(parseNapa));
  };

  // output/Kwakwala.Parsing.Umista/index.js
  var pure27 = /* @__PURE__ */ pure(applicativeParserT);
  var applySecond6 = /* @__PURE__ */ applySecond(applyParserT);
  var bind23 = /* @__PURE__ */ bind(bindParserT);
  var map32 = /* @__PURE__ */ map(functorParserT);
  var alt12 = /* @__PURE__ */ alt(altParserT);
  var voidLeft10 = /* @__PURE__ */ voidLeft(functorParserT);
  var peekChar6 = /* @__PURE__ */ peekChar(monadRecIdentity);
  var disj14 = /* @__PURE__ */ disj(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean));
  var eq16 = /* @__PURE__ */ eq(eqCodePoint);
  var choice3 = /* @__PURE__ */ choice(foldableArray);
  var map114 = /* @__PURE__ */ map(functorFn);
  var append9 = /* @__PURE__ */ append(semigroupList);
  var map210 = /* @__PURE__ */ map(functorList);
  var parseY$prime3 = function(v) {
    if (v instanceof Nothing) {
      return pure27(new Min2(Y.value));
    }
    ;
    if (v instanceof Just) {
      if (v.value0 === "m" || v.value0 === "M") {
        return applySecond6(anyChar)(pure27(makeCase(isUpperC(v.value0))(MY.value)));
      }
      ;
      if (v.value0 === "n" || v.value0 === "N") {
        return applySecond6(anyChar)(pure27(makeCase(isUpperC(v.value0))(NY.value)));
      }
      ;
      if (v.value0 === "l" || v.value0 === "L") {
        return applySecond6(anyChar)(pure27(makeCase(isUpperC(v.value0))(LY.value)));
      }
      ;
      if (v.value0 === "y" || v.value0 === "Y") {
        return applySecond6(anyChar)(pure27(makeCase(isUpperC(v.value0))(JY.value)));
      }
      ;
      if (v.value0 === "w" || v.value0 === "W") {
        return applySecond6(anyChar)(pure27(makeCase(isUpperC(v.value0))(WY.value)));
      }
      ;
      if (otherwise) {
        return pure27(makeCase(isUpperC(v.value0))(Y.value));
      }
      ;
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 374, column 1 - line 374, column 53): " + [v.constructor.name]);
  };
  var parseWonly2 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "w" || x === "W";
  })))(function(b2) {
    return pure27(makeCase(b2)(W.value));
  });
  var parseU5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("u"))(new Min2(U.value)))(voidLeft10($$char("U"))(new Maj(U.value)));
  }();
  var parseTY3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(TY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "s" || v1.value0 === "S") {
          return applySecond6(anyChar)(pure27(makeCase(v)(TSY.value)));
        }
        ;
        if (v1.value0 === "l" || (v1.value0 === "L" || (v1.value0 === "\u0142" || (v1.value0 === "\u019A" || (v1.value0 === "\u026B" || (v1.value0 === "\u026C" || v1.value0 === "\u0141")))))) {
          return applySecond6(anyChar)(pure27(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(TY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 212, column 1 - line 212, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseS5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("s"))(new Min2(S.value)))(voidLeft10($$char("S"))(new Maj(S.value)));
  }();
  var parseO5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("o"))(new Min2(O.value)))(voidLeft10($$char("O"))(new Maj(O.value)));
  }();
  var parseNonly2 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "n" || x === "N";
  })))(function(b2) {
    return pure27(makeCase(b2)(N.value));
  });
  var parseMonly2 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "m" || x === "M";
  })))(function(b2) {
    return pure27(makeCase(b2)(M.value));
  });
  var parseLonly2 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "l" || x === "L";
  })))(function(b2) {
    return pure27(makeCase(b2)(L.value));
  });
  var parseLH4 = /* @__PURE__ */ function() {
    return alt12(voidLeft10(satisfy(function(x) {
      return x === "\u0142" || (x === "\u019A" || (x === "\u026B" || x === "\u026C"));
    }))(new Min2(LH.value)))(voidLeft10($$char("\u0141"))(new Maj(LH.value)));
  }();
  var parseJonly2 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "j" || (x === "J" || (x === "y" || x === "Y"));
  })))(function(b2) {
    return pure27(makeCase(b2)(J.value));
  });
  var parseI5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("i"))(new Min2(I.value)))(voidLeft10($$char("I"))(new Maj(I.value)));
  }();
  var parseH5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("h"))(new Min2(H.value)))(voidLeft10($$char("H"))(new Maj(H.value)));
  }();
  var parseE5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("e"))(new Min2(E.value)))(voidLeft10($$char("E"))(new Maj(E.value)));
  }();
  var parseDZ = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "z" || (x === "Z" || (x === "\u01F3" || (x === "\u01F1" || x === "\u01F2")));
  })))(function(b2) {
    return pure27(makeCase(b2)(DZ.value));
  });
  var parseD$prime5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (v1.value0 === "z" || v1.value0 === "Z") {
          return applySecond6(anyChar)(pure27(makeCase(v)(DZ.value)));
        }
        ;
        if (v1.value0 === "l" || (v1.value0 === "L" || (v1.value0 === "\u0142" || (v1.value0 === "\u019A" || (v1.value0 === "\u026B" || (v1.value0 === "\u026C" || v1.value0 === "\u0141")))))) {
          return applySecond6(anyChar)(pure27(makeCase(v)(DL.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(D.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 316, column 1 - line 316, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseD5 = /* @__PURE__ */ bind23(/* @__PURE__ */ satisfy(function(x) {
    return x === "d" || x === "D";
  }))(function(x) {
    return bind23(peekChar6)(parseD$prime5(isUpperC(x)));
  });
  var parseB5 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("b"))(new Min2(B.value)))(voidLeft10($$char("B"))(new Maj(B.value)));
  }();
  var parseAU4 = /* @__PURE__ */ function() {
    return alt12(voidLeft10($$char("\u0101"))(new Min2(AU.value)))(voidLeft10($$char("\u0100"))(new Maj(AU.value)));
  }();
  var isUnderline = function(v) {
    if (v === "\u0331") {
      return true;
    }
    ;
    return false;
  };
  var parseA5 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "a" || x === "A";
  })))(function(b2) {
    return bind23(peekChar6)(function(x) {
      if (x instanceof Just) {
        var $66 = isUnderline(x.value0);
        if ($66) {
          return applySecond6(anyChar)(pure27(makeCase(b2)(AU.value)));
        }
        ;
        return pure27(makeCase(b2)(A.value));
      }
      ;
      return pure27(makeCase(b2)(A.value));
    });
  });
  var parseXW2 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(XW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isUnderline(v1.value0)) {
          return applySecond6(peekChar6)(pure27(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(XW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 340, column 1 - line 340, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var isLabial5 = function(v) {
    if (v === "w") {
      return true;
    }
    ;
    if (v === "W") {
      return true;
    }
    ;
    if (v === "\u1D42") {
      return true;
    }
    ;
    if (v === "\u02B7") {
      return true;
    }
    ;
    return false;
  };
  var isW4 = isLabial5;
  var parseGU4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(GU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(GUW.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(GU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 174, column 1 - line 174, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG$prime5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(G.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isUnderline(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseGU4(v));
        }
        ;
        if (isW4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(GW.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(G.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 160, column 1 - line 160, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseG5 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "g" || x === "G";
  })))(function(b2) {
    return bind23(peekChar6)(parseG$prime5(b2));
  });
  var parseGUN = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "\u01E5" || x === "\u01E4";
  })))(function(b2) {
    return bind23(peekChar6)(parseGU4(b2));
  });
  var parseKY4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(KY.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(KY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 121, column 1 - line 121, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQY3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(QW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(QY.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 147, column 1 - line 147, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseXU5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(XU.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isW4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(XUW.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(XU.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 347, column 1 - line 347, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX$prime5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(X.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isUnderline(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseXU5(v));
        }
        ;
        if (isW4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseXW2(v));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(X.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 333, column 1 - line 333, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseX5 = /* @__PURE__ */ bind23(/* @__PURE__ */ satisfy(function(x) {
    return x === "x" || x === "X";
  }))(function(x) {
    return bind23(peekChar6)(parseX$prime5(isUpperC(x)));
  });
  var isApostCP3 = /* @__PURE__ */ disj14(/* @__PURE__ */ eqCP("'"))(/* @__PURE__ */ disj14(/* @__PURE__ */ eqCP("`"))(/* @__PURE__ */ disj14(/* @__PURE__ */ eqCP("\u0315"))(/* @__PURE__ */ disj14(/* @__PURE__ */ eqCP("\u0313"))(/* @__PURE__ */ disj14(/* @__PURE__ */ eqCP("\u2019"))(/* @__PURE__ */ eqCP("\u02BC"))))));
  var parsePuncts6 = /* @__PURE__ */ function() {
    var pip = codePointFromChar("|");
    return map32(Punct.create)(takeWhile1(function(x) {
      return !(isAlpha(x) || (isApostCP3(x) || eq16(x)(pip)));
    }));
  }();
  var isApost4 = function(v) {
    if (v === "'") {
      return true;
    }
    ;
    if (v === "`") {
      return true;
    }
    ;
    if (v === "\u0315") {
      return true;
    }
    ;
    if (v === "\u0313") {
      return true;
    }
    ;
    if (v === "\u2019") {
      return true;
    }
    ;
    if (v === "\u02BC") {
      return true;
    }
    ;
    return false;
  };
  var parseKW5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(KW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(KWY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(KW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 127, column 1 - line 127, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseP5 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "p" || x === "P";
  })))(function(b2) {
    return bind23(peekChar6)(function(x) {
      if (x instanceof Just) {
        var $111 = isApost4(x.value0);
        if ($111) {
          return applySecond6(anyChar)(pure27(makeCase(b2)(PY.value)));
        }
        ;
        return pure27(makeCase(b2)(P.value));
      }
      ;
      return pure27(makeCase(b2)(P.value));
    });
  });
  var parseQW4 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(QW.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(QWY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(QW.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 141, column 1 - line 141, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseQ5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(Q.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseQY3(v));
        }
        ;
        if (isW4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseQW4(v));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(Q.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 134, column 1 - line 134, column 61): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK$prime5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(K.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isUnderline(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseQ5(v));
        }
        ;
        if (isApost4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseKY4(v));
        }
        ;
        if (isW4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseKW5(v));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(K.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 108, column 1 - line 108, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseK5 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "k" || x === "K";
  })))(function(b2) {
    return bind23(peekChar6)(parseK$prime5(b2));
  });
  var parseKUN = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "\u1E35" || (x === "\u1E34" || (x === "q" || x === "Q"));
  })))(function(b2) {
    return bind23(peekChar6)(parseQ5(b2));
  });
  var parseTL5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(TLY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(TL.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 225, column 1 - line 225, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseTS3 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(TS.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return applySecond6(anyChar)(pure27(makeCase(v)(TSY.value)));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(TS.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 219, column 1 - line 219, column 62): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT$prime5 = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure27(makeCase(v)(T.value));
      }
      ;
      if (v1 instanceof Just) {
        if (isApost4(v1.value0)) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseTY3(v));
        }
        ;
        if (v1.value0 === "s" || v1.value0 === "S") {
          return bind23(applySecond6(anyChar)(peekChar6))(parseTS3(v));
        }
        ;
        if (v1.value0 === "l" || (v1.value0 === "L" || (v1.value0 === "\u0142" || (v1.value0 === "\u019A" || (v1.value0 === "\u026B" || (v1.value0 === "\u026C" || v1.value0 === "\u0141")))))) {
          return bind23(applySecond6(anyChar)(peekChar6))(parseTL5(v));
        }
        ;
        if (otherwise) {
          return pure27(makeCase(v)(T.value));
        }
        ;
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 201, column 1 - line 201, column 64): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseT5 = /* @__PURE__ */ bind23(/* @__PURE__ */ map32(isUpperC)(/* @__PURE__ */ satisfy(function(x) {
    return x === "t" || x === "T";
  })))(function(b2) {
    return bind23(peekChar6)(parseT$prime5(b2));
  });
  var parseTS$prime = /* @__PURE__ */ bind23(/* @__PURE__ */ applySecond6(/* @__PURE__ */ $$char("\u02A6"))(peekChar6))(/* @__PURE__ */ parseTS3(false));
  var parseY5 = /* @__PURE__ */ bind23(/* @__PURE__ */ applySecond6(/* @__PURE__ */ satisfy(isApost4))(peekChar6))(parseY$prime3);
  var parseUmistaLetterNew = /* @__PURE__ */ choice3([parseA5, parseAU4, parseE5, parseI5, parseO5, parseU5, parseK5, parseG5, parseKUN, parseGUN, parseX5, parseP5, parseT5, parseMonly2, parseNonly2, parseLonly2, parseWonly2, parseY5, parseB5, parseH5, parseD5, parseLH4, parseJonly2, parseS5, parseDZ, parseTS$prime]);
  var caseOf3 = function(v) {
    return function(v1) {
      if (v instanceof Maj) {
        return new Maj(v1);
      }
      ;
      if (v instanceof Min2) {
        return new Min2(v1);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 437, column 1 - line 437, column 48): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var parseUmistaWordX$prime = function(ltr) {
    if (isKwkVow$prime(ltr)) {
      return map32(append9(new Cons(caseOf3(ltr)(Y.value), new Cons(ltr, Nil.value))))(many(parseUmistaLetterNew));
    }
    ;
    if (otherwise) {
      return map32(Cons.create(ltr))(many(parseUmistaLetterNew));
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.Parsing.Umista (line 431, column 1 - line 431, column 69): " + [ltr.constructor.name]);
  };
  var parseUmistaWordX = /* @__PURE__ */ bind23(parseUmistaLetterNew)(parseUmistaWordX$prime);
  var parseUmistaMainNew = /* @__PURE__ */ function() {
    return alt12(map32(map210(Kwak.create))(parseUmistaWordX))(alt12(map32(singleton3)(parsePipe))(alt12(map32(singleton3)(parsePuncts6))(map32(map114(map114(singleton3)(Punct.create))(singleton7))(anyCodePoint))));
  }();
  var parseUmista = /* @__PURE__ */ map32(/* @__PURE__ */ map114(concat)(toList))(/* @__PURE__ */ many1(parseUmistaMainNew));
  var encodeFromUmista = function(txt) {
    return fromRight(Nil.value)(runParser(txt)(parseUmista));
  };

  // output/Kwakwala.GUI.Convert/index.js
  var outputByType = function(kot) {
    return function(ops) {
      return function(lst) {
        if (kot instanceof OutGrubb) {
          return outputGrubbAsciiChars(ops.grubbOrthOptions)(lst);
        }
        ;
        if (kot instanceof OutNapa) {
          return outputNapaChars(lst);
        }
        ;
        if (kot instanceof OutUmista) {
          return outputUmistaChars(lst);
        }
        ;
        if (kot instanceof OutIPA) {
          return outputIPAChars(ops.ipaOrthOptions)(lst);
        }
        ;
        if (kot instanceof OutSyllabic) {
          return outputSyllabics(lst);
        }
        ;
        throw new Error("Failed pattern match at Kwakwala.GUI.Convert (line 41, column 28 - line 46, column 37): " + [kot.constructor.name]);
      };
    };
  };
  var encodeByType = function(kit) {
    return function(str) {
      if (kit instanceof InGrubb) {
        return encodeFromGrubbAscii(str);
      }
      ;
      if (kit instanceof InNapa) {
        return encodeFromNapa(str);
      }
      ;
      if (kit instanceof InUmista) {
        return encodeFromUmista(str);
      }
      ;
      if (kit instanceof InIsland) {
        return encodeFromIsland(str);
      }
      ;
      if (kit instanceof InBoas) {
        return encodeFromBoas(str);
      }
      ;
      throw new Error("Failed pattern match at Kwakwala.GUI.Convert (line 33, column 24 - line 38, column 35): " + [kit.constructor.name]);
    };
  };
  var convertOrthography = function(kit) {
    return function(kot) {
      return function(ops) {
        var $3 = outputByType(kot)(ops);
        var $4 = encodeByType(kit);
        return function($5) {
          return $3($4($5));
        };
      };
    };
  };

  // output/Kwakwala.GUI.Components/index.js
  var slot3 = /* @__PURE__ */ slot();
  var slot12 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "orthOptions";
    }
  })(ordUnit);
  var slot23 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "inputSelect";
    }
  })(ordUnit);
  var slot32 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "outputSelect";
    }
  })(ordUnit);
  var inputFileIsSymbol = {
    reflectSymbol: function() {
      return "inputFile";
    }
  };
  var slot4 = /* @__PURE__ */ slot3(inputFileIsSymbol)(ordUnit);
  var slot_2 = /* @__PURE__ */ slot_();
  var outputTextIsSymbol = {
    reflectSymbol: function() {
      return "outputText";
    }
  };
  var slot_1 = /* @__PURE__ */ slot_2(outputTextIsSymbol)(ordUnit);
  var outputFileIsSymbol = {
    reflectSymbol: function() {
      return "outputFile";
    }
  };
  var slot_22 = /* @__PURE__ */ slot_2(outputFileIsSymbol)(ordUnit);
  var bind24 = /* @__PURE__ */ bind(bindHalogenM);
  var gets3 = /* @__PURE__ */ gets(monadStateHalogenM);
  var discard13 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var when5 = /* @__PURE__ */ when(applicativeHalogenM);
  var eq6 = /* @__PURE__ */ eq(eqKwakInType);
  var notEq4 = /* @__PURE__ */ notEq(eqKwakInType);
  var $$void9 = /* @__PURE__ */ $$void(functorHalogenM);
  var query3 = /* @__PURE__ */ query();
  var query12 = /* @__PURE__ */ query3(inputFileIsSymbol)(ordUnit);
  var modify7 = /* @__PURE__ */ modify2(monadStateHalogenM);
  var pure28 = /* @__PURE__ */ pure(applicativeHalogenM);
  var query23 = /* @__PURE__ */ query3(outputTextIsSymbol)(ordUnit);
  var query32 = /* @__PURE__ */ query3(outputFileIsSymbol)(ordUnit);
  var ChangeOrthIn2 = /* @__PURE__ */ function() {
    function ChangeOrthIn22(value0) {
      this.value0 = value0;
    }
    ;
    ChangeOrthIn22.create = function(value0) {
      return new ChangeOrthIn22(value0);
    };
    return ChangeOrthIn22;
  }();
  var ChangeOrthOut2 = /* @__PURE__ */ function() {
    function ChangeOrthOut22(value0) {
      this.value0 = value0;
    }
    ;
    ChangeOrthOut22.create = function(value0) {
      return new ChangeOrthOut22(value0);
    };
    return ChangeOrthOut22;
  }();
  var ChangeOrthOpts2 = /* @__PURE__ */ function() {
    function ChangeOrthOpts22(value0) {
      this.value0 = value0;
    }
    ;
    ChangeOrthOpts22.create = function(value0) {
      return new ChangeOrthOpts22(value0);
    };
    return ChangeOrthOpts22;
  }();
  var ConvertText2 = /* @__PURE__ */ function() {
    function ConvertText22(value0) {
      this.value0 = value0;
    }
    ;
    ConvertText22.create = function(value0) {
      return new ConvertText22(value0);
    };
    return ConvertText22;
  }();
  var renderConverter2 = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var orthComp2 = orthComp(MonadEffect0);
    var inputComp2 = inputComp(MonadEffect0);
    var outputComp2 = outputComp(MonadEffect0);
    var inputFileComp2 = inputFileComp(dictMonadAff);
    var outputTextComp2 = outputTextComp(MonadEffect0.Monad0());
    var outputFileComp2 = outputFileComp(dictMonadAff);
    return function(st) {
      return div_([h1_([text5("Kwak'wala Orthography Conversion (File)")]), p_([slot12(_orthOptions)(unit)(orthComp2)(unit)(ChangeOrthOpts2.create)]), p_([text5("Input Orthography")]), p_([slot23(_inputSelect)(unit)(inputComp2)(st.inputSelect)(ChangeOrthIn2.create)]), p_([text5("Output Orthography")]), p_([slot32(_outputSelect)(unit)(outputComp2)(st.outputSelect)(ChangeOrthOut2.create)]), p_([slot4(_inputFile)(unit)(inputFileComp2)(st.inputFile.fileStr)(ConvertText2.create)]), p_([slot_1(_outputText)(unit)(outputTextComp2)(st.outputText)]), p_([slot_22(_outputFile)(unit)(outputFileComp2)({
        fileStr: st.outputText,
        fileTyp: st.inputFile.fileTyp
      })])]);
    };
  };
  var handleConvertAction2 = function(x) {
    if (x instanceof ChangeOrthIn2) {
      return bind24(gets3(function(v) {
        return v.inputSelect;
      }))(function(old) {
        return discard13(modify_4(function(st) {
          var $85 = {};
          for (var $86 in st) {
            if ({}.hasOwnProperty.call(st, $86)) {
              $85[$86] = st[$86];
            }
            ;
          }
          ;
          $85.inputSelect = x.value0;
          return $85;
        }))(function() {
          return discard13(when5(eq6(x.value0)(InIsland.value) && notEq4(old)(InIsland.value))($$void9(query12(_inputFile)(unit)(new InputFileIsland(unit)))))(function() {
            return when5(eq6(old)(InIsland.value) && notEq4(x.value0)(InIsland.value))($$void9(query12(_inputFile)(unit)(new InputFileNonIsland(unit))));
          });
        });
      });
    }
    ;
    if (x instanceof ChangeOrthOut2) {
      return modify_4(function(st) {
        var $89 = {};
        for (var $90 in st) {
          if ({}.hasOwnProperty.call(st, $90)) {
            $89[$90] = st[$90];
          }
          ;
        }
        ;
        $89.outputSelect = x.value0;
        return $89;
      });
    }
    ;
    if (x instanceof ChangeOrthOpts2 && x.value0 instanceof OrthGrubbOptions) {
      return modify_4(function(st) {
        var $96 = {};
        for (var $97 in st) {
          if ({}.hasOwnProperty.call(st, $97)) {
            $96[$97] = st[$97];
          }
          ;
        }
        ;
        $96.orthOptions = function() {
          var $93 = {};
          for (var $94 in st.orthOptions) {
            if ({}.hasOwnProperty.call(st.orthOptions, $94)) {
              $93[$94] = st["orthOptions"][$94];
            }
            ;
          }
          ;
          $93.grubbOrthOptions = x.value0.value0;
          return $93;
        }();
        return $96;
      });
    }
    ;
    if (x instanceof ChangeOrthOpts2 && x.value0 instanceof OrthIPAOptions) {
      return modify_4(function(st) {
        var $104 = {};
        for (var $105 in st) {
          if ({}.hasOwnProperty.call(st, $105)) {
            $104[$105] = st[$105];
          }
          ;
        }
        ;
        $104.orthOptions = function() {
          var $101 = {};
          for (var $102 in st.orthOptions) {
            if ({}.hasOwnProperty.call(st.orthOptions, $102)) {
              $101[$102] = st["orthOptions"][$102];
            }
            ;
          }
          ;
          $101.ipaOrthOptions = x.value0.value0;
          return $101;
        }();
        return $104;
      });
    }
    ;
    if (x instanceof ConvertText2) {
      return bind24(modify7(function(st) {
        var $109 = {};
        for (var $110 in st) {
          if ({}.hasOwnProperty.call(st, $110)) {
            $109[$110] = st[$110];
          }
          ;
        }
        ;
        $109.inputFile = x.value0;
        return $109;
      }))(function(stt) {
        return bind24(pure28(convertOrthography(stt.inputSelect)(stt.outputSelect)(stt.orthOptions)(x.value0.fileStr)))(function(newStr) {
          return discard13($$void9(query23(_outputText)(unit)(new OutputString(newStr, unit))))(function() {
            return discard13($$void9(query32(_outputFile)(unit)(new ReceiveFileData({
              fileStr: newStr,
              fileTyp: x.value0.fileTyp
            }, unit))))(function() {
              return modify_4(function(st) {
                var $112 = {};
                for (var $113 in st) {
                  if ({}.hasOwnProperty.call(st, $113)) {
                    $112[$113] = st[$113];
                  }
                  ;
                }
                ;
                $112.outputText = newStr;
                return $112;
              });
            });
          });
        });
      });
    }
    ;
    throw new Error("Failed pattern match at Kwakwala.GUI.Components (line 235, column 26 - line 259, column 50): " + [x.constructor.name]);
  };
  var defParentState2 = /* @__PURE__ */ function() {
    return {
      inputSelect: InGrubb.value,
      outputSelect: OutGrubb.value,
      orthOptions: defAllOrthOptions,
      inputFile: {
        fileStr: "",
        fileTyp: Nothing.value
      },
      outputText: ""
    };
  }();
  var convertComp2 = function(dictMonadAff) {
    return mkComponent({
      initialState: function(v) {
        return defParentState2;
      },
      render: renderConverter2(dictMonadAff),
      "eval": mkEval({
        handleAction: handleConvertAction2,
        handleQuery: defaultEval.handleQuery,
        receive: Just.create,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize
      })
    });
  };

  // output/MainFile/index.js
  var convertComp22 = /* @__PURE__ */ convertComp2(monadAffAff);
  var main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind(bindAff)(awaitBody)(function(body2) {
    return runUI2(convertComp22)(new ConvertText2({
      fileStr: "",
      fileTyp: Nothing.value
    }))(body2);
  }));

  // <stdin>
  main2();
})();
