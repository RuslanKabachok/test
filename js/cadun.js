function JsonpService(c) {
  var f = 0,
    e = {},
    a = c + '.callbacks',
    d = function () {
      return;
    };
  var b = function (g, j) {
    var q = j.onSuccess || d,
      o = j.onTimeout || d,
      l = j.timeout || 10 * 1000;
    var i = 'request_' + f,
      m = document.getElementsByTagName('head')[0],
      n = document.createElement('script');
    f += 1;
    var h = function () {
      m.removeChild(n);
      delete e[i];
    };
    var k = setTimeout(function () {
      o();
    }, l);
    e[i] = function (r) {
      clearTimeout(k);
      h();
      q(r);
    };
    n.type = 'text/javascript';
    n.async = true;
    var p = a + '.' + i;
    g += g.indexOf('?') + 1 ? '&' : '?';
    g += 'callback=' + encodeURIComponent(p);
    n.src = g;
    m.appendChild(n);
  };
  return { jsonp: b, callbacks: e };
}
function Util() {
  function h(k) {
    return (
      unescape(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              escape(k).replace(/[\-\.\+\*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      ) || null
    );
  }
  function i(l, m, n, k) {
    n = n || '/';
    k = k || 30;
    window.document.cookie =
      l +
      '=' +
      m +
      '; max-age=' +
      k +
      '; path=' +
      n +
      '; domain=' +
      window.document.domain;
  }
  function b(k) {
    var l = h(k);
    return l !== undefined && l !== null && !String(l).match(/^\s*$/);
  }
  function g(k) {
    k = k.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var m = new RegExp('[\\?&]' + k + '=([^&#]*)'),
      l = m.exec(location.search);
    return l === null ? '' : decodeURIComponent(l[1].replace(/\+/g, ' '));
  }
  function c(k) {
    var l = g(k);
    return l !== undefined && l !== null && !String(l).match(/^\s*$/);
  }
  function f() {
    return window.navigator.userAgent;
  }
  function a(k) {
    window.top.location.href = k;
  }
  function e() {
    window.location.href = window.location.href;
  }
  function d() {
    return window.parent.location.host;
  }
  function j(k) {
    var m = [];
    for (var l in k) {
      if (k[l]) {
        m.push(encodeURIComponent(l) + '=' + encodeURIComponent(k[l]));
      }
    }
    return m.join('&');
  }
  return {
    getQueryStringByName: g,
    hasQueryString: c,
    hasCookie: b,
    getCookie: h,
    setCookie: i,
    getUserAgent: f,
    refreshWindow: e,
    redirectTo: a,
    serialize: j,
    getParentLocationHost: d,
  };
}
function CacheService(e) {
  var a = window.localStorage;
  var g = new Util();
  var d = parseInt('10000');
  function b(l, n, k) {
    k = k !== undefined ? k : d;
    var m = { value: n, expireAt: Date.now() + k };
    a.setItem(l, JSON.stringify(m));
  }
  function f(n) {
    var o = a.getItem(n);
    if (o === null || o === undefined) {
      return undefined;
    }
    var p = JSON.parse(o);
    if (p === null || p === undefined) {
      return undefined;
    }
    var k = new Date(p.expireAt).getTime();
    var l = new Date(Date.now());
    var m = new Date(k);
    if (k < Date.now()) {
      a.removeItem(n);
      return undefined;
    }
    return p.value;
  }
  function c(k, l) {
    return k + '|' + l;
  }
  function i(m) {
    var l = g.getCookie('GLBID');
    var k = f(l);
    if (m === undefined) {
      return k;
    }
    var n = f(c(l, m));
    return n ? k : undefined;
  }
  function j(m, n, k) {
    var l = g.getCookie('GLBID');
    b(l, m, k);
    if (n !== undefined) {
      b(c(l, n, k), true);
    }
  }
  function h(l) {
    var k = g.getCookie('GLBID');
    a.removeItem(k);
    if (l !== undefined) {
      a.removeItem(c(k, l));
    }
  }
  return { loggedUser: i, store: j, clean: h };
}
var Cadun;
(function () {
  if (window.Cadun !== undefined && Cadun !== null) {
    return;
  }
  window.Cadun = {};
  window.Cadun.initialized = false;
  Cadun.version = '0.9.6';
  Cadun.service = new JsonpService('Cadun.service');
  Cadun.cache = new CacheService('Cadun.cache');
  Cadun.util = new Util();
  Cadun.callback = null;
  Cadun.isRedirectEnabled = false;
  Cadun.closeButtonDisabled = false;
  Cadun.closeModalCallback = null;
  Cadun.serviceId = null;
  Cadun.Event = new EventService();
  Cadun.user = { me: undefined };
  function c() {
    Cadun.Event.cached = [];
    if (window._cdn !== undefined && _cdn.length > 0) {
      Cadun.Event.cached = _cdn;
      Cadun.Event.trigger('ready', Cadun);
    }
    if (window.cq !== undefined && cq.length > 0) {
      Cadun.Event.cached = cq;
      Cadun.Event.trigger('ready', Cadun);
    }
    var f = window.addEventListener ? 'addEventListener' : 'attachEvent';
    var e = window[f];
    var d = f === 'attachEvent' ? 'onmessage' : 'message';
    e(
      d,
      function (g) {
        if (Cadun.didLoginFinished(g)) {
          if (Cadun.callback) {
            Cadun.modal.close(true);
            Cadun.authorize(Cadun.serviceId, function (h) {
              Cadun.user.me = h;
              if (h !== null && h.token !== null) {
                Cadun.util.setCookie('GLBID', h.token);
              }
              if (typeof Cadun.callback == 'function') {
                Cadun.callback(h);
                Cadun.callback = null;
              }
            });
            if (window.glb !== undefined && window.glb.barra !== undefined) {
              glb.barra.component.handleAuthArea();
            }
            if (Cadun.isRedirectEnabled) {
              Cadun.util.redirectTo(g.data);
            }
          }
        }
      },
      false
    );
  }
  function a() {
    window._cdn = {
      push: function (e) {
        var d = Object.keys(e);
        for (var f = 0; f < d.length; f = f + 1) {
          Cadun.Event.subscribe(d[f], e[d[f]]);
        }
      },
    };
    window.cq = _cdn;
  }
  function b() {
    if (util.hasQueryString('GLBID') && !util.hasCookie('GLBID')) {
      util.setCookie('GLBID', util.getQueryStringByName('GLBID'));
      util.refreshWindow();
    }
  }
  Cadun.init = function () {
    window.Cadun.initialized = true;
    c();
    a();
    Cadun.authorize(undefined, function (d) {});
  };
})();
Cadun.authorize = function (c, d) {
  var a = Cadun.getLoggedUser(c);
  if (a !== undefined) {
    d(a);
    return;
  }
  var b =
    'https://cocoon.globo.com/v2/user/logged' +
    (c === undefined ? '' : '?servico_id=' + c);
  Cadun.Request.ajax({
    method: 'POST',
    url: b,
    withCredentials: true,
    timeout: 5000,
    success: function (e) {
      if (e && e.status && e.provider && e.token) {
        Cadun.setLoggedUser(e, c);
      } else {
        e = Cadun.unauthorize();
      }
      d(e);
    },
    error: function (e) {
      e = Cadun.unauthorize();
      d(e);
    },
  });
};
Cadun.getLoggedUser = function (b) {
  var a = Cadun.cache.loggedUser(b);
  if (a !== undefined && Cadun.user.me === undefined) {
    Cadun.setLoggedUser(a, b);
  }
  return a;
};
Cadun.setLoggedUser = function (a, b) {
  Cadun.user.me = a;
  Cadun.cache.store(a, b);
  Cadun.Event.trigger('userInfoAvailable', a);
};
Cadun.unauthorize = function () {
  var a = { status: 'unauthorized' };
  Cadun.Event.trigger('userUnauthorized', a);
  return a;
};
function EventService() {
  function a(e, f) {
    if (e === 'ready') {
      f(Cadun);
      return;
    } else {
      if (e === 'userInfoAvailable' && Cadun.user.me) {
        f(Cadun.user.me);
      }
    }
    var d = {};
    d[e] = f;
    Cadun.Event.cached.push(d);
  }
  function c(d, k) {
    var g = Cadun.Event.cached || [],
      e = [],
      j = false;
    for (var f = 0; f < g.length; f = f + 1) {
      var h = g[f];
      if (h[d] !== k) {
        e.push(h);
      } else {
        j = true;
      }
    }
    if (j) {
      Array.prototype.splice.apply(g, [0, g.length].concat(e));
    }
    return j;
  }
  function b() {
    var d = Array.prototype.shift.call(arguments);
    var f = Cadun.Event.cached || [];
    for (var e = 0; e < f.length; e = e + 1) {
      var g = f[e][d];
      if (g) {
        g.apply(null, arguments);
      }
    }
  }
  return { subscribe: a, unsubscribe: c, trigger: b };
}
Cadun.user.feed = function (a) {};
Cadun.login = function (d, b, f, e, a, c) {
  Cadun.serviceId = d;
  Cadun.closeModalCallback = a;
  if (GloboIDSDK.isActive()) {
    GloboIDSDK.bindLogin(d).onSuccess(function (g) {
      e(g);
      if (f) {
        Cadun.util.redirectTo(b);
      }
    });
    return;
  }
  Cadun.authorize(d, function (g) {
    if (g.status !== 'authorized') {
      var i = '?url=' + b + '&tam=WIDGET';
      if (
        typeof c === 'object' &&
        typeof c._ga === 'string' &&
        typeof c.glbProduct === 'string' &&
        typeof c.component === 'string'
      ) {
        i =
          i +
          '&_ga=' +
          c._ga +
          '&glbproduct=' +
          c.glbProduct +
          '&component=' +
          c.component;
      }
      var h = 'https://login.globo.com/login/' + d + i;
      if (Cadun.needsToOpenInNewWindow()) {
        Cadun.util.redirectTo(h);
        return;
      }
      Cadun.cache.clean(d);
      if (f) {
        Cadun.isRedirectEnabled = true;
      }
      if (e) {
        Cadun.callback = e;
      }
      Cadun.modal.open(h);
    }
  });
};
Cadun.needsToOpenInNewWindow = function () {
  var c = window.location.host.toLowerCase(),
    e = c.substring(c.lastIndexOf('globo.com')),
    b = e === 'globo.com' || e === 'globoi.com',
    d = Cadun.util.getUserAgent().toLowerCase(),
    a =
      d.indexOf('msie ') !== -1 ||
      d.indexOf('trident/') !== -1 ||
      (d.indexOf('safari') !== -1 && d.indexOf('chrome') === -1);
  return a && !b;
};
Cadun.didLoginFinished = function (f) {
  var g = [
      'provisionamento',
      'confirmar-email',
      'recuperacaoSenha',
      'recuperacaoLogin',
      'login',
    ],
    c = f.origin.indexOf('login.globo.com') !== -1;
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function (h, e) {
      e = e || 0;
      return this.indexOf(h, e) === e;
    };
  }
  if (!c) {
    return false;
  }
  for (var b in g) {
    var d = f.data.startsWith('/') || f.data.indexOf('login.globo.com') !== -1;
    var a = f.data.indexOf(g[b]) !== -1;
    if (d && a) {
      return false;
    }
  }
  return true;
};
Cadun.logout = function (d, a) {
  if (!a) {
    a = 'globo.com';
  }
  if (GloboIDSDK.isActive()) {
    GloboIDSDK.bindLogout().onSuccess(function () {
      d();
    });
    return;
  }
  var b = '//login.globo.com/logout?realm=' + a;
  var c = document.createElement('IFRAME');
  c.setAttribute('id', 'cadun-logout');
  c.setAttribute('src', b);
  c.style.width = 0;
  c.style.height = 0;
  document.getElementsByTagName('html')[0].appendChild(c);
  document.getElementById('cadun-logout').onload = function () {
    Cadun.cache.clean();
    if (typeof d == 'function') {
      d.apply();
    }
    document.getElementsByTagName('html')[0].removeChild(this);
  };
};
Cadun.user.setPreference = function (a, b) {
  prefsService = function (c) {
    var d =
      'https://cocoon.globo.com/v2/preferences/' +
      a.context +
      '/' +
      a.key +
      '?value=' +
      a.value;
    Cadun.Request.ajax({
      method: 'POST',
      url: d,
      withCredentials: true,
      timeout: 5000,
      success: function (e) {
        b(e);
      },
      error: function (e) {
        b({});
      },
    });
  };
  if (Cadun.user.me) {
    prefsService(Cadun.user.me);
  } else {
    Cadun.authorize(464, prefsService);
  }
};
Cadun.user.getPreference = function (a, b) {
  prefsService = function (c) {
    var d = 'https://cocoon.globo.com/v2/preferences/' + a.context;
    if (a.key) {
      d = d + '/' + a.key;
    }
    Cadun.Request.ajax({
      method: 'GET',
      url: d,
      withCredentials: true,
      timeout: 5000,
      success: function (e) {
        b(e);
      },
      error: function (e) {
        b({});
      },
    });
  };
  if (Cadun.user.me) {
    prefsService(Cadun.user.me);
  } else {
    Cadun.authorize(464, prefsService);
  }
};
var GloboIDSDK;
(function () {
  if (window.GloboIDSDK !== undefined) {
    return;
  }
  var a = function () {};
  var c = function () {};
  function e(j) {
    if (window.console !== undefined && window.console.log !== undefined) {
      console.log(j);
    }
  }
  function i() {
    var j = Cadun.util.hasCookie('GLOBOIDSDK');
    return j;
  }
  function f(j) {
    GloboIDSDK.loadURL('globoidsdk://login/' + j);
    return GloboIDSDK;
  }
  function d() {
    GloboIDSDK.loadURL('globoidsdk://logout');
    return GloboIDSDK;
  }
  function b(j) {
    GloboIDSDK.failureCallback = j || a;
    return GloboIDSDK;
  }
  function g(j) {
    GloboIDSDK.successCallback = j || c;
    return GloboIDSDK;
  }
  function h(j) {
    setTimeout(function () {
      window.location = j;
    });
  }
  GloboIDSDK = {
    isActive: i,
    bindLogin: f,
    bindLogout: d,
    onSuccess: g,
    onFailure: b,
    successCallback: c,
    failureCallback: a,
    loadURL: h,
  };
})();
Cadun.user.checkMissingData = function (a, d, c) {
  d =
    d ||
    function () {
      console.log('[CheckMissingData] success');
    };
  c =
    c ||
    function (f) {
      console.log('[CheckMissingData] error:', f);
    };
  if (!(a instanceof Array)) {
    c({ error: 'requiredData must be Array' });
    return;
  }
  var b = 'https://login.globo.com/api/user/fulfilled-data';
  Cadun.Request.ajax({
    method: 'GET',
    url: b,
    withCredentials: true,
    timeout: 5000,
    success: function (e) {
      var h = e.missing;
      if (!(h instanceof Array)) {
        c(e);
        return;
      }
      var j = false;
      for (var g = 0; g < a.length; g++) {
        var f = a[g];
        if (h.indexOf(f) !== -1) {
          j = true;
          break;
        }
      }
      d(j);
    },
    error: function (e) {
      c(e);
    },
  });
};
Cadun.user.requestMissingData = function (c, a, d) {
  var b =
    'https://login.globo.com/{serviceID}#/complemento?required_data={requiredData}'
      .replace('{serviceID}', c)
      .replace('{requiredData}', a.join(','));
  Cadun.modal.open(b);
  if (d) {
    Cadun.callback = d;
  }
};
Cadun.modal = (function () {
  function a() {
    var b = document.createElement('iframe');
    b.style.height = '100%';
    b.style.width = '100%';
    var h = document.getElementsByTagName('head')[0];
    var g = document.createElement('link');
    g.rel = 'stylesheet';
    g.type = 'text/css';
    g.href = 'https://s.glbimg.com/pc/ca/login.css';
    g.media = 'all';
    h.appendChild(g);
    var e = document.createElement('div');
    e.className = 'cadun-modal';
    e.setAttribute('id', 'globoid-modal-container');
    var k = document.createElement('div');
    k.className = 'login-wrapper-modal';
    k.onclick = i;
    var c = document.createElement('div');
    c.className = 'login-modal';
    var f = document.createElement('div');
    f.className = 'close-modal';
    f.onclick = i;
    c.appendChild(f);
    c.appendChild(b);
    e.appendChild(c);
    e.appendChild(k);
    var j = {};
    function d(m) {
      if (!String(m).match('^https?://login(?:.[^.]+)?.globoi?.com')) {
        throw '[Cadun.JS] ERROR - invalid domain for url:' + m;
      }
      b.src = m;
      f.style.display = Cadun.closeButtonDisabled ? 'none' : 'block';
      j.bodyOverflow = document.body.style.overflow;
      j.htmlOverflow = document.documentElement.style.overflow;
      j.bodyPosition = document.body.style.position;
      j.bodyHeight = document.body.style.height;
      j.htmlPosition = document.documentElement.style.position;
      j.htmlHeight = document.documentElement.style.height;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.position = 'relative';
      document.body.style.height = '100%';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'relative';
      document.documentElement.style.height = '100%';
      var l = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      k.style.height = l + 'px';
      e.focus();
      document.body.appendChild(e);
    }
    function i(m) {
      var l = document.body.getElementsByClassName('cadun-modal').length > 0;
      if (l) {
        document.body.removeChild(e);
      }
      if (m !== true && Cadun.closeModalCallback) {
        Cadun.closeModalCallback();
      }
      document.body.style.overflow = j.bodyOverflow;
      document.documentElement.style.overflow = j.htmlOverflow;
      document.body.style.position = j.bodyPosition;
      document.body.style.height = j.bodyHeight;
      document.documentElement.style.position = j.htmlPosition;
      document.documentElement.style.height = j.htmlHeight;
    }
    this.open = d;
    this.close = i;
  }
  return new a();
})();
Cadun.closeLogin = Cadun.modal.close;
var Cadun = Cadun || {};
(function () {
  if (Cadun.Request !== undefined) {
    return;
  }
  var d = /^(?:text|application)\/xml/i,
    j = 'application/json',
    c = 'text/html',
    g = /^\s*$/;
  function h(k, l) {
    return (k + '&' + l).replace(/[&?]{1,2}/, '?');
  }
  function i(p, o, m, l) {
    var q = Array.isArray(o);
    for (var k in o) {
      var n = o[k];
      if (l) {
        k = m ? l : l + '[' + (q ? '' : k) + ']';
      }
      if (!l && q) {
        p.add(n.name, n.value);
      } else {
        if (m ? Array.isArray(n) : typeof n === 'object') {
          i(p, n, m, k);
        } else {
          p.add(k, n);
        }
      }
    }
  }
  function b(l, k) {
    var m = [];
    m.add = function (o, n) {
      this.push(escape(o) + '=' + escape(n));
    };
    i(m, l, k);
    return m.join('&').replace('%20', '+');
  }
  function e(k) {
    if (typeof k.data === 'object') {
      k.data = b(k.data);
    }
    if (k.data && (!k.method || k.method.toUpperCase() == 'GET')) {
      k.url = h(k.url, k.data);
    }
  }
  function a(k) {
    return (
      (k &&
        (k == c ? 'html' : k.indexOf(j) > -1 ? 'json' : d.test(k) && 'xml')) ||
      'text'
    );
  }
  function f(l) {
    var m;
    if (window.XMLHttpRequest) {
      m = new XMLHttpRequest();
    } else {
      m = new ActiveXObject('Microsoft.XMLHTTP');
    }
    e(l);
    var k = l.url;
    var p = l.headers || {};
    var n = l.data;
    var q = l.method || (n ? 'POST' : 'GET');
    m.open(q, k, true);
    m.timeout = l.timeout || 0;
    m.ontimeout = function (r) {
      var s = l.error.call(s, 'timeout', null, null, null);
    };
    m.onerror = function (r) {
      l.error.call(this, 'Request error', m, m.status, r);
    };
    m.onload = function () {
      var r,
        u = false;
      if (m.readyState === XMLHttpRequest.DONE) {
        if ((m.status >= 200 && m.status < 300) || m.status == 304) {
          var t = a(m.getResponseHeader('Content-Type'));
          r = m.responseText;
          try {
            if (t == 'xml') {
              r = m.responseXML;
            } else {
              if (t == 'json') {
                r = g.test(r) ? null : JSON.parse(r);
              }
            }
          } catch (x) {
            u = x;
          }
          if (u) {
            var v = l.error.call(v, 'Parse error', m, m.status, u);
          } else {
            var s = l.success.call(s, r, m, m.status);
          }
        } else {
          var w = l.error.call(w, 'error', m, m.status, null);
        }
      }
    };
    p['X-Requested-With'] = 'XMLHttpRequest';
    if (l.contentType || (n && l.method.toUpperCase() != 'GET')) {
      p['Content-Type'] = l.contentType || 'application/x-www-form-urlencoded';
    }
    for (var o in p) {
      m.setRequestHeader(o, p[o]);
    }
    m.withCredentials = l.withCredentials ? l.withCredentials : false;
    m.send(n);
  }
  Cadun.Request = { ajax: f };
})();
(function () {
  if (window.Cadun && window.Cadun.initialized !== true) {
    Cadun.init();
  }
})();
