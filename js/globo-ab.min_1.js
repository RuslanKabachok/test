!(function (e, t) {
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define([], t)
    : 'object' == typeof exports
    ? (exports.GloboAB = t())
    : (e.GloboAB = t());
})(this, function () {
  return (function (e) {
    function t(r) {
      if (n[r]) return n[r].exports;
      var i = (n[r] = { i: r, l: !1, exports: {} });
      return e[r].call(i.exports, i, i.exports, t), (i.l = !0), i.exports;
    }
    var n = {};
    return (
      (t.m = e),
      (t.c = n),
      (t.i = function (e) {
        return e;
      }),
      (t.d = function (e, n, r) {
        t.o(e, n) ||
          Object.defineProperty(e, n, {
            configurable: !1,
            enumerable: !0,
            get: r,
          });
      }),
      (t.n = function (e) {
        var n =
          e && e.__esModule
            ? function () {
                return e.default;
              }
            : function () {
                return e;
              };
        return t.d(n, 'a', n), n;
      }),
      (t.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
      }),
      (t.p = ''),
      t((t.s = 8))
    );
  })([
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(9),
        a = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            r(this, e), (this.options = t);
          }
          return (
            i(
              e,
              [
                {
                  key: 'getParams',
                  value: function (e) {
                    var t = { skipImpressions: this.isSkippedImpression() };
                    return Object.assign({}, t, e);
                  },
                },
                {
                  key: 'getLocationParams',
                  value: function () {
                    return {
                      drawed: !0,
                      countImpressions: !this.isSkippedImpression(),
                    };
                  },
                },
                {
                  key: 'getHeaders',
                  value: function () {
                    return this.options.extraHeaders || [];
                  },
                },
                {
                  key: 'getHeader',
                  value: function (e) {
                    var t = '';
                    return (
                      this.getHeaders().forEach(function (n) {
                        Object.keys(n).forEach(function (r) {
                          e === r && (t = n[r]);
                        });
                      }),
                      t
                    );
                  },
                },
                {
                  key: 'getDict',
                  value: function () {
                    return this.options;
                  },
                },
                {
                  key: 'getTimeout',
                  value: function () {
                    var e = this.options.timeout;
                    return void 0 === e && (e = 1e3), e;
                  },
                },
                {
                  key: 'skipImpression',
                  value: function () {
                    return (this.options.skipImpressions = !0), this;
                  },
                },
                {
                  key: 'timeout',
                  value: function (e) {
                    return (this.options.timeout = e), this;
                  },
                },
                {
                  key: 'isFieldSetted',
                  value: function (e) {
                    return void 0 !== e && !1 !== e;
                  },
                },
                {
                  key: 'isSkippedImpression',
                  value: function () {
                    return this.isFieldSetted(this.options.skipImpressions);
                  },
                },
                {
                  key: 'addHeader',
                  value: function (e) {
                    var t = [];
                    return (
                      this.options.hasOwnProperty('extraHeaders') &&
                        (t = this.options.extraHeaders),
                      t.push(e),
                      (this.options.extraHeaders = t),
                      this
                    );
                  },
                },
                {
                  key: 'withOriginURL',
                  value: function (t) {
                    return new e(this.clone(this.options)).originURL(t);
                  },
                },
                {
                  key: 'originURL',
                  value: function (e) {
                    return this.addHeader({ 'x-canonical-uri': e }), this;
                  },
                },
                {
                  key: 'getOriginURL',
                  value: function () {
                    return this.getHeader('x-canonical-uri');
                  },
                },
                {
                  key: 'enableGADebugger',
                  value: function () {
                    return (this.options.enableGADebugger = !0), this;
                  },
                },
                {
                  key: 'isEnabledGADebugger',
                  value: function () {
                    return this.isFieldSetted(this.options.enableGADebugger);
                  },
                },
                {
                  key: 'clone',
                  value: function (e) {
                    return JSON.parse(JSON.stringify(e));
                  },
                },
                {
                  key: 'withContext',
                  value: function (e) {
                    return (this.options.context = o.validated(e)), this;
                  },
                },
                {
                  key: 'getContext',
                  value: function () {
                    return this.options.context ? this.options.context : [];
                  },
                },
              ],
              [
                {
                  key: 'validated',
                  value: function (t) {
                    if (t instanceof e) return t;
                    if (void 0 === t) return new e();
                    throw new TypeError('GloboABOptions não válido');
                  },
                },
              ]
            ),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(10),
        a = (function () {
          function e(t) {
            r(this, e), (this.abHost = t);
          }
          return (
            i(e, [
              {
                key: 'oneWaySend',
                value: function (e, t, n, r) {
                  this.do('PUT', e, null, t, null, null, n, r);
                },
              },
              {
                key: 'do',
                value: function (e, t, n, r, i, a) {
                  var s = this,
                    u =
                      arguments.length > 6 && void 0 !== arguments[6]
                        ? arguments[6]
                        : [],
                    c =
                      arguments.length > 7 && void 0 !== arguments[7]
                        ? arguments[7]
                        : 1e3,
                    l = '',
                    f = o.interceptParams(t, n);
                  for (var p in f)
                    f.hasOwnProperty(p) && (l += '&' + p + '=' + f[p]);
                  l && (l = '?' + l.substring(1));
                  var h = this.abHost + t + l,
                    v = this.createXHR();
                  v.open(e, h, !0),
                    (v.timeout = c),
                    (v.onload = function () {
                      v.status >= 200 && v.status < 400
                        ? s.callIfDefined(i, v)
                        : s.callIfDefined(a, s.handleError(v, h));
                    }),
                    (v.onerror = function (e) {
                      s.callIfDefined(a, s.handleError(e, h));
                    }),
                    (v.ontimeout = function (e) {
                      s.callIfDefined(a, s.handleError(e, h));
                    }),
                    r &&
                      (v.setRequestHeader(
                        'Content-Type',
                        'application/json;charset=utf-8'
                      ),
                      (r = JSON.stringify(r))),
                    Array.from(u).forEach(function (e) {
                      Object.keys(e).forEach(function (t) {
                        v.setRequestHeader(t, e[t]);
                      });
                    }),
                    v.send(r);
                },
              },
              {
                key: 'handleError',
                value: function (e, t) {
                  var n = {};
                  return (
                    (n.type = e.type ? e.type : 'undefined'),
                    e.target instanceof XMLHttpRequest && (e = e.target),
                    e instanceof XMLHttpRequest
                      ? ((n.status = e.status),
                        (n.url = t),
                        (n.timeout = e.timeout),
                        (n.msg = e.responseText))
                      : (n.msg = e.toString()),
                    n
                  );
                },
              },
              {
                key: 'createXHR',
                value: function () {
                  var e = new XMLHttpRequest();
                  return (e.withCredentials = !0), e;
                },
              },
              {
                key: 'callIfDefined',
                value: function (e, t) {
                  e && e(t);
                },
              },
            ]),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      var r,
        i =
          'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
            ? function (e) {
                return typeof e;
              }
            : function (e) {
                return e &&
                  'function' == typeof Symbol &&
                  e.constructor === Symbol &&
                  e !== Symbol.prototype
                  ? 'symbol'
                  : typeof e;
              };
      r = (function () {
        return this;
      })();
      try {
        r = r || Function('return this')() || (0, eval)('this');
      } catch (e) {
        'object' === ('undefined' == typeof window ? 'undefined' : i(window)) &&
          (r = window);
      }
      e.exports = r;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(1),
        a = n(16),
        s = (function () {
          function e(t) {
            r(this, e),
              (this.abHost = t),
              (this.request = new o(this.abHost)),
              (this.requestWrapper = new a(this.abHost));
          }
          return (
            i(e, [
              {
                key: 'selectedAlternatives',
                value: function (e, t, n, r) {
                  this.request.do(
                    'GET',
                    '/v2/selected-alternatives',
                    t.getParams({ experiments: e }),
                    null,
                    n,
                    r,
                    t.getHeaders(),
                    t.getTimeout()
                  );
                },
              },
              {
                key: 'chooseWithContext',
                value: function (e, t, n, r) {
                  var i = t.getParams({ experiments: [e] });
                  this.request.do(
                    'POST',
                    '/choose',
                    {},
                    Object.assign(i, { context: t.getContext() }),
                    n,
                    r,
                    t.getHeaders(),
                    t.getTimeout()
                  );
                },
              },
              {
                key: 'recordMetric',
                value: function (e, t, n) {
                  var r = '/v2/tests/' + t.testId + '/' + e,
                    i = {
                      experiment: t.experiment,
                      alternative: t.alternative,
                      context: n.getContext(),
                    };
                  this.requestWrapper.oneWay(
                    r,
                    i,
                    n.getHeaders(),
                    n.getTimeout()
                  );
                },
              },
            ]),
            e
          );
        })();
      e.exports = s;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(0),
        a = (function () {
          function e(t, n) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : new o();
            r(this, e),
              (this.data = t || {}),
              (this.context = n),
              (this.options = i),
              (this.experiment = this._getStringFromData('experiment')),
              (this.alternative = this._getStringFromData('alternative')),
              (this.testId = this._getStringFromData('testId')),
              (this.properties = this._getPropertiesFromData());
          }
          return (
            i(
              e,
              [
                {
                  key: 'isValid',
                  value: function () {
                    return (
                      'string' == typeof this.experiment &&
                      '' !== this.experiment.trim() &&
                      'string' == typeof this.alternative &&
                      '' !== this.alternative.trim() &&
                      'string' == typeof this.testId &&
                      '' !== this.testId.trim()
                    );
                  },
                },
                {
                  key: 'impression',
                  value: function (e) {
                    if (this.isValid()) {
                      var t = e || this.options;
                      this._sendMetric('impression', t);
                    } else
                      console.warn(
                        'Os dados do exp não são válidos para impressão'
                      );
                  },
                },
                {
                  key: 'conversion',
                  value: function (e) {
                    if (this.isValid()) {
                      var t = e || this.options;
                      this._sendMetric('conversion', t);
                    } else
                      console.warn(
                        'Os dados do exp não são válidos para conversão!'
                      );
                  },
                },
                {
                  key: '_canProcessEvent',
                  value: function () {
                    return (
                      !(
                        this.data &&
                        this.data['extra-info'] &&
                        this.data['extra-info']['draw-rule'] &&
                        void 0 !==
                          this.data['extra-info']['draw-rule']['process-event']
                      ) || this.data['extra-info']['draw-rule']['process-event']
                    );
                  },
                },
                {
                  key: '_sendMetric',
                  value: function (e) {
                    var t =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : this.options;
                    if (this._canProcessEvent()) {
                      var n = {
                        experiment: this.experiment,
                        alternative: this.alternative,
                        testId: this.testId,
                      };
                      this.context.abEndpoint.recordMetric(e, n, t);
                    } else
                      console.warn(
                        'Nao será enviado sinais de impressão ou conversão, uma vez que o experimento foi finalizado ou desativado.'
                      );
                  },
                },
                {
                  key: '_getPropertiesFromData',
                  value: function () {
                    var e = {};
                    return (
                      (Array.isArray(this.data.properties)
                        ? this.data.properties
                        : []
                      ).forEach(function (t) {
                        var n = t.key,
                          r = t.value;
                        e[n] = r;
                      }),
                      e
                    );
                  },
                },
                {
                  key: '_getStringFromData',
                  value: function (e) {
                    return 'string' == typeof this.data[e]
                      ? this.data[e]
                      : null;
                  },
                },
              ],
              [
                {
                  key: 'parseRequest',
                  value: function (t, n, r) {
                    var i = JSON.parse(t),
                      o = {};
                    for (var a in i.experiments)
                      if (i.experiments.hasOwnProperty(a)) {
                        var s = i.experiments[a],
                          u = new e(s, n, r);
                        o[a] = u;
                      }
                    return o;
                  },
                },
              ]
            ),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(0),
        a = n(3),
        s = n(4),
        u = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : new o();
            r(this, e),
              (this.server = t),
              (this.abEndpoint = new a(this.server)),
              (this._options = n);
          }
          return (
            i(e, [
              {
                key: 'options',
                value: function () {
                  return this._options;
                },
              },
              {
                key: 'impression',
                value: function (e, t) {
                  this._getExperiment(e, t).impression();
                },
              },
              {
                key: 'conversion',
                value: function (e, t) {
                  this._getExperiment(e, t).conversion();
                },
              },
              {
                key: 'choose',
                value: function (e) {
                  return 'string' == typeof e && '' !== e.trim()
                    ? this._chooseOne(e)
                    : Array.isArray(e) && e.length > 0
                    ? this._chooseMulti(e)
                    : Promise.reject(
                        new TypeError(
                          'Para sorteio o experimento precisa ser uma string ou uma lista válida.'
                        )
                      );
                },
              },
              {
                key: '_chooseOne',
                value: function (e) {
                  var t = this;
                  return this._options.getContext().length > 0
                    ? new Promise(function (n, r) {
                        t.abEndpoint.chooseWithContext(
                          e,
                          t.options(),
                          function (r) {
                            var i = s.parseRequest(
                                r.responseText,
                                t,
                                t.options()
                              ),
                              o = i[e];
                            n(o);
                          },
                          function (e) {
                            r(e);
                          }
                        );
                      })
                    : new Promise(function (n, r) {
                        t.abEndpoint.selectedAlternatives(
                          e,
                          t.options(),
                          function (r) {
                            var i = s.parseRequest(
                                r.responseText,
                                t,
                                t.options()
                              ),
                              o = i[e];
                            n(o);
                          },
                          function (e) {
                            r(e);
                          }
                        );
                      });
                },
              },
              {
                key: '_chooseMulti',
                value: function (e) {
                  var t = this,
                    n = e.join(',');
                  return new Promise(function (e, r) {
                    t.abEndpoint.selectedAlternatives(
                      n,
                      t.options(),
                      function (n) {
                        var r = s.parseRequest(n.responseText, t, t.options());
                        e(r);
                      },
                      function (e) {
                        r(e);
                      }
                    );
                  });
                },
              },
              {
                key: '_getExperiment',
                value: function (e, t) {
                  var n = t || this._options;
                  return void 0 !== e &&
                    e.__proto__ &&
                    e.__proto__.constructor &&
                    'Experiment' === e.__proto__.constructor.name
                    ? ((e.options = n), e)
                    : new s(e, this, n);
                },
              },
            ]),
            e
          );
        })();
      e.exports = u;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(12),
        a = n(11),
        s = n(0),
        u = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : new s();
            r(this, e),
              (this.server = t),
              (this.abEndpoint = new a(this.server)),
              (this._options = n);
          }
          return (
            i(e, [
              {
                key: 'options',
                value: function () {
                  return this._options;
                },
              },
              {
                key: 'choose',
                value: function (e) {
                  var t = this;
                  return this.options().getContext().length > 0
                    ? new Promise(function (n, r) {
                        t.abEndpoint.chooseLocationWithContext(
                          e,
                          t.options(),
                          function (e) {
                            var r = o.parseRequest(
                              e.responseText,
                              t,
                              t.options()
                            );
                            n(r);
                          },
                          function (e) {
                            r(e);
                          }
                        );
                      })
                    : new Promise(function (n, r) {
                        t.abEndpoint.selectedDrawedExperiment(
                          e,
                          t.options(),
                          function (e) {
                            var r = o.parseRequest(
                              e.responseText,
                              t,
                              t.options()
                            );
                            n(r);
                          },
                          function (e) {
                            r(e);
                          }
                        );
                      });
                },
              },
            ]),
            e
          );
        })();
      e.exports = u;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(0),
        a = n(13),
        s = n(14),
        u = (function () {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : new o();
            r(this, e),
              (this.server = t),
              (this._options = n),
              (this.mabEndpoint = new a(this.server));
          }
          return (
            i(e, [
              {
                key: 'options',
                value: function () {
                  return this._options;
                },
              },
              {
                key: 'increment',
                value: function (e) {
                  var t = e.experiment,
                    n = e.arm,
                    r = e.testId,
                    i = e.abAlternative,
                    o = e.arms;
                  new s(
                    {
                      experiment: t,
                      arm: n,
                      testId: r,
                      abAlternative: i,
                      arms: void 0 === o ? [] : o,
                    },
                    this,
                    this.options()
                  ).increment();
                },
              },
              {
                key: 'reward',
                value: function (e) {
                  var t = e.experiment,
                    n = e.arm,
                    r = e.testId,
                    i = e.abAlternative,
                    o = e.slot,
                    a = void 0 === o ? 0 : o;
                  new s(
                    { experiment: t, arm: n, testId: r, abAlternative: i },
                    this,
                    this.options()
                  ).reward(a, n);
                },
              },
              {
                key: 'choose',
                value: function (e) {
                  return 'string' == typeof e && '' !== e.trim()
                    ? this._chooseOne(e)
                    : Array.isArray(e) && e.length > 0
                    ? this._chooseMulti(e)
                    : Promise.reject(
                        new TypeError(
                          'Para sorteio o experimento precisa ser uma string ou uma lista válida.'
                        )
                      );
                },
              },
              {
                key: '_chooseOne',
                value: function (e) {
                  var t = this;
                  return new Promise(function (n, r) {
                    t.mabEndpoint.getSelectedArm(
                      e,
                      t.options(),
                      function (r) {
                        var i = s.parseRequest(
                          r.responseText,
                          e,
                          t,
                          t.options()
                        );
                        n(i);
                      },
                      function (e) {
                        r(e);
                      }
                    );
                  });
                },
              },
              {
                key: '_chooseMulti',
                value: function (e) {
                  var t = this,
                    n = e.join(',');
                  return new Promise(function (e, r) {
                    t.mabEndpoint.getSelectedArms(
                      n,
                      t.options(),
                      function (n) {
                        var r = s.parseRequestWithQueryString(
                          n.responseText,
                          t,
                          t.options()
                        );
                        e(r);
                      },
                      function (e) {
                        r(e);
                      }
                    );
                  });
                },
              },
            ]),
            e
          );
        })();
      e.exports = u;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(0),
        a = n(5),
        s = n(7),
        u = n(6),
        c = (function () {
          function e(t) {
            r(this, e),
              (this.env = this._getEnv(t)),
              (this._options = new o()),
              (this.abMain = new a(this._getServer(this.env), this._options));
          }
          return (
            i(e, [
              {
                key: 'createOptions',
                value: function () {
                  return (
                    (this._options = new o()),
                    (this.abMain = new a(
                      this._getServer(this.env),
                      this._options
                    )),
                    this._options
                  );
                },
              },
              {
                key: 'options',
                value: function () {
                  return this._options;
                },
              },
              {
                key: 'mab',
                value: function () {
                  return new s(this._getMabServer(this.env), this.options());
                },
              },
              {
                key: 'location',
                value: function () {
                  return new u(
                    this._getServer(this.env),
                    this.options(),
                    this.context
                  );
                },
              },
              {
                key: 'impression',
                value: function (e, t) {
                  this.abMain.impression(e, t);
                },
              },
              {
                key: 'conversion',
                value: function (e, t) {
                  this.abMain.conversion(e, t);
                },
              },
              {
                key: 'choose',
                value: function (e) {
                  return this.abMain.choose(e);
                },
              },
              {
                key: '_getEnv',
                value: function (e) {
                  return 'prod' === e ||
                    'prod.be' === e ||
                    'qa' === e ||
                    'qa.be' === e ||
                    'local' === e
                    ? e
                    : 'qa';
                },
              },
              {
                key: '_getServer',
                value: function (e) {
                  return 'local' === this.env
                    ? 'http://localhost:8888'
                    : 'prod' === this.env
                    ? 'https://globo-ab.globo.com'
                    : 'prod.be' === this.env
                    ? 'http://be.globo-ab.globoi.com'
                    : 'qa.be' === this.env
                    ? 'http://be.globo-ab.qa.globoi.com'
                    : 'https://globo-ab.qa.globoi.com';
                },
              },
              {
                key: '_getMabServer',
                value: function (e) {
                  return 'local' === this.env
                    ? 'http://localhost:8888'
                    : 'prod' === this.env
                    ? 'https://globo-mab.globo.com'
                    : 'prod.be' === this.env
                    ? 'http://be.globo-mab.globoi.com'
                    : 'qa.be' === this.env
                    ? 'http://be.globo-mab.qa.globoi.com'
                    : 'https://globo-mab.qa.globoi.com';
                },
              },
            ]),
            e
          );
        })();
      e.exports = c;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = (function () {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : [];
            r(this, e), (this.context = t);
          }
          return (
            i(e, null, [
              {
                key: 'validated',
                value: function (e) {
                  if (Array.isArray(e) && this.isValid(e)) return e;
                  if (void 0 === e) return [];
                  throw new TypeError('Contexto não válido');
                },
              },
              {
                key: 'isValid',
                value: function (e) {
                  for (var t = !0, n = 0; n < e.length; n++)
                    t =
                      t &&
                      'string' == typeof e[n].name &&
                      'string' == typeof e[n].value;
                  return t;
                },
              },
            ]),
            e
          );
        })();
      e.exports = o;
    },
    function (e, t, n) {
      'use strict';
      (function (t) {
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        }
        var r = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t;
            };
          })(),
          i = (function () {
            function e() {
              n(this, e);
            }
            return (
              r(e, null, [
                {
                  key: 'getPluginParams',
                  value: function () {
                    var t = {},
                      n = [
                        'ab-client-context',
                        'ab-client-experiment',
                        'ab-client-alternative',
                      ],
                      r = e.getDocumentLocationSearch().substr(1).split('&');
                    for (var i in r)
                      if (r.hasOwnProperty(i)) {
                        var o = r[i].split('=');
                        n.indexOf(o[0]) > -1 && (t[o[0]] = o[1]);
                      }
                    return t;
                  },
                },
                {
                  key: 'getDocumentLocationSearch',
                  value: function () {
                    return document.location.search;
                  },
                },
                {
                  key: 'isCompatibleWithPlugin',
                  value: function () {
                    return void 0 !== t.window;
                  },
                },
                {
                  key: 'interceptParams',
                  value: function (t, n) {
                    try {
                      if (e.isCompatibleWithPlugin() && t) {
                        var r = void 0,
                          i = void 0;
                        if (t.indexOf('/location/') > -1) {
                          var o = t.split('/');
                          r = o[o.length - 1];
                        } else
                          t.indexOf('selected-alternatives') > -1 &&
                            (i = n.experiments || n.experiment);
                        if (i || r)
                          return Object.assign(
                            {},
                            n,
                            this.getExperimentSettings(r, i)
                          );
                      }
                    } catch (e) {
                      console.error(e);
                    }
                    return n;
                  },
                },
                {
                  key: 'getExperimentSettings',
                  value: function (e, t) {
                    var n = this.getPluginParams();
                    if (
                      e &&
                      n['ab-client-context'] === e &&
                      n['ab-client-experiment']
                    ) {
                      var r = {
                        experiment: n['ab-client-experiment'],
                        alternative: n['ab-client-alternative'],
                      };
                      return r.alternative || delete r.alternative, r;
                    }
                    return t &&
                      t.includes(n['ab-client-experiment']) &&
                      n['ab-client-alternative']
                      ? { alternative: n['ab-client-alternative'] }
                      : {};
                  },
                },
              ]),
              e
            );
          })();
        e.exports = i;
      }).call(t, n(2));
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      function i(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      function o(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        (e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
          t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : (e.__proto__ = t));
      }
      var a = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        s = n(1),
        u = n(3),
        c = (function (e) {
          function t(e) {
            r(this, t);
            var n = i(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).call(this, e)
            );
            return (n.abHost = e), (n.request = new s(n.abHost)), n;
          }
          return (
            o(t, e),
            a(t, [
              {
                key: 'selectedDrawedExperiment',
                value: function (e, t, n, r) {
                  this.request.do(
                    'GET',
                    '/ab/location/' + e,
                    t.getLocationParams(),
                    null,
                    n,
                    r
                  );
                },
              },
              {
                key: 'chooseLocationWithContext',
                value: function (e, t, n, r) {
                  this.request.do(
                    'POST',
                    '/location/' + e + '/choose',
                    {},
                    Object.assign(t.getLocationParams(), {
                      context: t.getContext(),
                    }),
                    n,
                    r
                  );
                },
              },
            ]),
            t
          );
        })(u);
      e.exports = c;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(4),
        a = (function () {
          function e() {
            r(this, e);
          }
          return (
            i(e, null, [
              {
                key: 'parseRequest',
                value: function (e, t, n) {
                  var r = JSON.parse(e),
                    i = Object.keys(r)[0],
                    a = r[i],
                    s = a.alternative,
                    u = a.testId;
                  return new o(
                    { experiment: i, alternative: s, testId: u },
                    t,
                    n
                  );
                },
              },
            ]),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(1),
        a = (function () {
          function e(t) {
            r(this, e), (this.abHost = t), (this.request = new o(this.abHost));
          }
          return (
            i(e, [
              {
                key: 'getSelectedArm',
                value: function (e, t, n, r) {
                  var i = '',
                    o = 'GET';
                  t.isSkippedImpression()
                    ? (i = '/mab/' + e + '/choose')
                    : ((i = '/mab/' + e + '/chooseAndIncrement'), (o = 'POST')),
                    this.request.do(
                      o,
                      i,
                      null,
                      null,
                      n,
                      r,
                      t.getHeaders(),
                      t.getTimeout()
                    );
                },
              },
              {
                key: 'getSelectedArms',
                value: function (e, t, n, r) {
                  var i = '';
                  (i = t.isSkippedImpression()
                    ? '/choose'
                    : '/chooseAndIncrement'),
                    this.request.do(
                      'GET',
                      i,
                      t.getParams({ experiments: e }),
                      null,
                      n,
                      r,
                      t.getHeaders(),
                      t.getTimeout()
                    );
                },
              },
              {
                key: 'recordMABMetric',
                value: function (e, t, n) {
                  var r = '/mab/' + t.experiment + '/' + e,
                    i = t.arms ? t.arms : [],
                    o = {
                      arm: t.arm,
                      testId: t.testId,
                      abAlternative: t.abAlternative,
                      arms: i,
                    };
                  this.request.do(
                    'POST',
                    r,
                    {},
                    o,
                    null,
                    null,
                    n.getHeaders(),
                    n.getTimeout()
                  );
                },
              },
            ]),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      function r(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      var i = (function () {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              (r.enumerable = r.enumerable || !1),
                (r.configurable = !0),
                'value' in r && (r.writable = !0),
                Object.defineProperty(e, r.key, r);
            }
          }
          return function (t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t;
          };
        })(),
        o = n(0),
        a = (function () {
          function e(t, n) {
            var i = t.experiment,
              a = t.arm,
              s = t.testId,
              u = t.abAlternative,
              c = t.arms,
              l = void 0 === c ? [] : c,
              f =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : new o();
            r(this, e),
              (this.experiment = i),
              (this.arm = a),
              (this.testId = s),
              (this.abAlternative = u),
              (this.arms = l),
              (this.context = n),
              (this.options = f);
          }
          return (
            i(
              e,
              [
                {
                  key: 'increment',
                  value: function () {
                    var e = this.arms;
                    0 === e.length && (e = [{ slot: 0, name: this.arm }]),
                      this._sendMetric('increment', e);
                  },
                },
                {
                  key: 'reward',
                  value: function () {
                    var e =
                        arguments.length > 0 && void 0 !== arguments[0]
                          ? arguments[0]
                          : 0,
                      t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : '',
                      n = [{ slot: e, name: '' === t ? this.arm : t }];
                    this._sendMetric('reward', n);
                  },
                },
                {
                  key: '_sendMetric',
                  value: function (e, t) {
                    var n = {
                      experiment: this.experiment,
                      arm: this.arm,
                      testId: this.testId,
                      abAlternative: this.abAlternative,
                      arms: t,
                    };
                    this._recordMetric(e, n);
                  },
                },
                {
                  key: '_recordMetric',
                  value: function (e, t) {
                    this.context.mabEndpoint.recordMABMetric(
                      e,
                      t,
                      this.options
                    );
                  },
                },
              ],
              [
                {
                  key: 'parseRequest',
                  value: function (t, n, r, i) {
                    var o = JSON.parse(t);
                    return (o.experiment = n), new e(o, r, i);
                  },
                },
                {
                  key: 'parseRequestWithQueryString',
                  value: function (t, n, r) {
                    var i = JSON.parse(t),
                      o = {};
                    for (var a in i)
                      if (i.hasOwnProperty(a)) {
                        i[a].experiment = a;
                        var s = i[a],
                          u = new e(s, n, r);
                        o[a] = u;
                      }
                    return o;
                  },
                },
              ]
            ),
            e
          );
        })();
      e.exports = a;
    },
    function (e, t, n) {
      'use strict';
      (function (t) {
        function n(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        }
        var r = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t;
            };
          })(),
          i = (function () {
            function e(t) {
              n(this, e), (this.abHost = t);
            }
            return (
              r(e, [
                {
                  key: 'send',
                  value: function (e, n) {
                    t.navigator.sendBeacon(this.abHost + e, JSON.stringify(n));
                  },
                },
              ]),
              e
            );
          })();
        e.exports = i;
      }).call(t, n(2));
    },
    function (e, t, n) {
      'use strict';
      (function (t) {
        function r(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        }
        var i = (function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                (r.enumerable = r.enumerable || !1),
                  (r.configurable = !0),
                  'value' in r && (r.writable = !0),
                  Object.defineProperty(e, r.key, r);
              }
            }
            return function (t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t;
            };
          })(),
          o = n(15),
          a = n(1),
          s = (function () {
            function e(t) {
              r(this, e),
                (this.host = t),
                (this.sendBeaconOneWay = new o(this.host)),
                (this.xmlHttp = new a(this.host));
            }
            return (
              i(e, [
                {
                  key: 'oneWay',
                  value: function (e, t, n, r) {
                    this.isBrowserSupportSendBeacon() && !this.hasHeaders(n)
                      ? this.sendBeaconOneWay.send(e, t)
                      : this.xmlHttp.oneWaySend(e, t, n, r);
                  },
                },
                {
                  key: 'isBrowserSupportSendBeacon',
                  value: function () {
                    return !(void 0 === t.navigator || !t.navigator.sendBeacon);
                  },
                },
                {
                  key: 'hasHeaders',
                  value: function (e) {
                    return void 0 !== e && e.length > 0;
                  },
                },
              ]),
              e
            );
          })();
        e.exports = s;
      }).call(t, n(2));
    },
  ]);
});
