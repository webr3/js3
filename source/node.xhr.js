/**
 * Custom XHR implementation for this package
 * provides api.XMLHttpRequest, requires api.IRI
 */
(function(api) {
  var events = require('events');

  api.XMLHttpRequest = (function() {
    function nodeXHR(xhr) {
      function _e(e,t) {
        e = t == null ? new Error('NETWORK_ERR: DOM Exception 19 - ' + e) : new Error('TIMEOUT_ERR: DOM Exception 23 - ' + e);
        xhr._vars.response = null;
        xhr._vars.headers = {};
        xhr._vars.errorflag = true;
        xhr._changeState(XMLHttpRequest.DONE);
        xhr.emit('error', e);
        xhr._sendProgressEvent('loadend', false, 0, 0);
        if(!xhr._vars.uploadComplete) {
          xhr.upload.emit('error',e);
          xhr.upload._sendProgressEvent('loadend', false, 0, 0);
        }
      };
      var port = xhr._vars.url.port(),
          scheme = xhr._vars.url.scheme(),
          host = xhr._vars.url.host(),
          path = xhr._vars.url.path(),
          query = xhr._vars.url.query(),
          secure = scheme == 'https';
      if(!port) {
        if(scheme == 'http') port = 80;
        if(scheme == 'https') port = 443;
      }
      if(!path) path = '/';
      if(query) path += query;
      xhr._vars.headers['Host'] = host;
      xhr._vars.redirects.push(xhr._vars.url.toString());
      var http = require('http');
      var client = http.createClient(port, host, secure);
      client.on('error', _e); client.on('timeout', function(e) { _e(e,true) } );
      var request = client.request(xhr._vars.method, path.toString(), xhr._vars.headers);
      request.on('error', _e); request.on('timeout', function(e) { _e(e,true) } );
      if(xhr._vars.abortsend) return request.destroy();
      if(xhr._vars.request != null) {
        request.end( xhr._vars.request )
        xhr.upload._sendProgressEvent('progress', false, 0, 0);
      } else {
        request.end();
      }
      request.on('response', function (response) {
        function maybeAbort(force) {
          if(force || xhr._vars.abortsend) {
            response.removeAllListeners('end');
            response.removeAllListeners('data');
            response.destroy();
          }
        };
        if(xhr.followRedirects && [301,302,303,307].indexOf(response.statusCode) > -1) {
          maybeAbort(true);
          var newurl = xhr._vars.url.resolveReference(response.headers.location).toAbsolute();
          if(xhr._vars.redirects.indexOf(newurl.toString()) > -1) {
            client.emit('error', new Error('NETWORK_ERR: DOM Exception 19 - Redirect Loop') );
            return;
          }
          xhr._vars.url = newurl;
          nodeXHR(xhr);
        } else {
          if(!xhr._vars.uploadComplete) {
            xhr._vars.uploadComplete = true;
            xhr.upload._sendProgressEvent('load', false, 0, 0);
            xhr.upload._sendProgressEvent('loadend', false, 0, 0);
          }
          xhr._vars.responseHeaders = response.headers;
          xhr._status = response.statusCode;
          xhr._statusText = xhr._status + ' ' + http.STATUS_CODES[xhr._status];
          xhr._changeState(XMLHttpRequest.HEADERS_RECEIVED);
          var total = xhr._vars.responseHeaders['content-length'] ? xhr._vars.responseHeaders['content-length'] : 0;
          var length = 0;
          var data = '';
          response.on('end', function() {
            maybeAbort();
            if(xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED && data.length == 0) {
              xhr._changeState(XMLHttpRequest.LOADING);
            }
            xhr._responseText = data.toString('utf8'); // TODO juggle this!
            xhr._changeState(XMLHttpRequest.DONE);
            xhr._sendProgressEvent('load',total == 0,length,total);
            xhr._sendProgressEvent('loadend',total == 0,length,total);
          });
          if(xhr._vars.method == 'HEAD' || xhr.status == 204) {
            xhr._changeState(XMLHttpRequest.LOADING);
          } else {
            response.on('data', function (chunk) {
              maybeAbort();
              if(xhr.readyState == XMLHttpRequest.HEADERS_RECEIVED) xhr._changeState(XMLHttpRequest.LOADING);
              length += chunk.length;
              xhr._sendProgressEvent('progress',total == 0,length,total);
              data += chunk;
            });
          }
        }
      });
    };
    
    XMLHttpRequestUpload = function() {
      function _(v) { return { writable: false, configurable : false, enumerable: true, value: v }};
      function __(v) { return { writable: true, configurable : false, enumerable: false, value: v }};
      function createEvent(type, target, augment) {
        if(!augment) augment = {};
        augment.type = type;
        augment.target = target;
        augment.timeStamp = new Date;
        return augment;
      };
      Object.defineProperties(this, {
        _sendProgressEvent: __(function(type, computable, loaded, total) {
          var ev = createEvent(type, this, { lengthComputable: computable, loaded: loaded, total: total });
          this.emit( type , ev );
          if(this['on' + type]) this['on' + type](ev);
        }),
      });
      this.onloadstart = null;
      this.onprogress = null;
      this.onabort = null;
      this.onerror = null;
      this.onload = null;
      this.ontimeout = null;
      this.onloadend = null;
      this.on('error', function(e) {
        if(this.onerror) this.onerror(e);
      });
    };
    XMLHttpRequestUpload.prototype = {__proto__: events.EventEmitter.prototype};
    XMLHttpRequest = function() {
      function _(v) { return { writable: false, configurable : false, enumerable: true, value: v }};
      function __(v) { return { writable: true, configurable : false, enumerable: false, value: v }};
      function createEvent(type, target, augment) {
        if(!augment) augment = {};
        augment.type = type;
        augment.target = target;
        augment.timeStamp = new Date;
        return augment;
      };
      Object.defineProperties(this, {
        upload: _(new XMLHttpRequestUpload),
        _readyState: __(0), readyState: {configurable : false, enumerable: true,
          get: function() { return this._readyState; },
        },
        _timeout: __(0), timeout: {configurable : false, enumerable: true,
          get: function() { return this._timeout; },
          set: function(v) {
            if(this.readyState != XMLHttpRequest.OPENED || this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
            this._timeout = v;
          }
        },
        _asBlob: __(false), asBlob: {configurable : false, enumerable: true,
          get: function() { return this._asBlob; },
          set: function(v) {
            if(this.readyState != XMLHttpRequest.OPENED || this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
            this._asBlob = v;
          }
        },
        _followRedirects: __(false), followRedirects: {configurable : false, enumerable: true,
          get: function() { return this._followRedirects; },
          set: function(v) {
            if(this.readyState != XMLHttpRequest.OPENED || this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
            this._followRedirects = v;
          }
        },
        _withCredentials: __(false), withCredentials: {configurable : false, enumerable: true,
          get: function() { return this._withCredentials; },
          set: function(v) {
            if(this.readyState != XMLHttpRequest.OPENED || this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
            this._withCredentials = v;
          }
        },
        _status: __(null), status: {configurable : false, enumerable: true,
          get: function() {
            if(this.readyState <= 1 || this._vars.errorflag) return 0;
            return this._status;
          },
        },
        _statusText: __(null), statusText: {configurable : false, enumerable: true,
          get: function() {
            if(this.readyState <= 1 || this._vars.errorflag) return '';
            return this._statusText;
          },
        },
        _responseText: __(null), responseText: {configurable : false, enumerable: true,
          get: function() { return this._responseText; },
        },
        //TODO responseBody, responseBlob, responseXML
        _vars: __({
          method: null, url: null, async: null, user: null, pass: null, headers: null, request: null,
          sendflag: false, errorflag: false, uploadcomplete: false, abortsend: false,
          responseHeaders: null, response: null, redirects: []
        }),
        _changeState: __(function(state) {
          this._readyState = state;
          ev = createEvent('readystatechange',this);
          this.emit('readystatechange', ev);
          if(this.onreadystatechange) this.onreadystatechange(ev);
        }),
        _sendProgressEvent: __(function(type, computable, loaded, total) {
          var ev = createEvent(type, this, { lengthComputable: computable, loaded: loaded, total: total });
          this.__emit(type,ev);
        }),
        __emit: _(function(type,ev) {
          this.emit( type , ev );
          if(this['on' + type]) this['on' + type](ev);
        })
      });
      this.onloadstart = null;
      this.onprogress = null;
      this.onabort = null;
      this.onerror = null;
      this.onload = null;
      this.ontimeout = null;
      this.onloadend = null;
      this.onreadystatechange = null;
      this.on('error', function(e) {
        if(this.onerror) this.onerror(e);
        else throw e;
      });
    };
    // states
    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.DONE = 4;
    XMLHttpRequest.prototype = {
      __proto__: events.EventEmitter.prototype,
      open: function(method, url, async, user, password ) {
        var tempuser, temppass, temp;
        for(i in method) if(method.charCodeAt(i) > 0xFF) throw new Error('SYNTAX_ERR: DOM Exception 12 - invalid method ' + method);
        method = (['CONNECT','DELETE','GET','HEAD','OPTIONS','POST','PUT','TRACE','TRACK'].indexOf(method.toUpperCase()) > -1) ? method.toUpperCase() : method;
        if(['CONNECT','TRACE','TRACK'].indexOf(method) > -1) throw new Error('SECURITY_ERR: DOM Exception 18 - method not allowed ' + method);
        url = new api.IRI(url).toAbsolute();
        if(['http','https'].indexOf(url.scheme()) == -1) throw new Error('SYNTAX_ERR: DOM Exception 12 - invalid url scheme ' + url.scheme());
        temp = url.userinfo();
        if(temp) {
          temp = temp.split(':');
          tempuser = temp[0];
          temppass = temp[1] ? temp[1] : temppass;
        }
        async = async == null ? true : async;
        if(!async) {
          async = true;
          require('util').debug('Sorry, async only');
        }
        if(user) tempuser = user;
        if(password) tempuser = user;
        this._vars.abortsend = true;
        this._vars.method = method;
        this._vars.url = url;
        this._vars.async = async;
        this._vars.user = tempuser;
        this._vars.pass = temppass;
        this._vars.headers = {};
        this._vars.request = null;
        this._timeout = 0;
        this._asBlob = false;
        this._followRedirects = false;
        this._withCredentials = false;
        this._vars.sendflag = false;
        this._vars.response = null;
        this._changeState(XMLHttpRequest.OPENED);      
      },
      setRequestHeader: function(header, value) {
        if(this.readyState != XMLHttpRequest.OPENED) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
        if(this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
        for(i in header) if(header.charCodeAt(i) > 0XFF) throw new Error('SYNTAX_ERR: DOM Exception 12 - invalid header ' + header);
        for(i in value) if(value.charCodeAt(i) > 0XFF) throw new Error('SYNTAX_ERR: DOM Exception 12 - invalid value ' + header);
        if(['accept-charset','accept-encoding','access-control-request-headers','access-control-request-method',
            'connection','content-length','cookie','cookie2','content-transfer-encoding','date','expect','host',
            'keep-alive','origin','referer','te','trailer','transfer-encoding','upgrade','user-agent','via']
        .indexOf(header.toLowerCase()) > -1) return;
        if(header.toLowerCase().substring(0,6) == 'proxy-' || header.toLowerCase().substring(0,4) == 'sec-') return;
        if(!this._vars.headers[header]) this._vars.headers[header] = [];
        this._vars.headers[header].unshift(value);
      },
      send: function(data) {
        if(this.readyState != XMLHttpRequest.OPENED) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
        if(this._vars.sendflag) throw new Error('INVALID_STATE_ERR: DOM Exception 11');
        this._vars.abortsend = false;
        if(['GET','HEADER','OPTIONS','DELETE'].indexOf(this._vars.method) > -1) {
          data = null;
        }
        this._vars.uploadComplete = true;
        if(data != null) {
          this._vars.request = data; // handle data ? FormData ?
          this._vars.uploadComplete = false;
        }
        this._vars.errorflag = false;     
        this._vars.sendflag = true;
        this._changeState(this.readyState);
        this._sendProgressEvent('loadstart', false, 0, 0);
        if(!this._vars.uploadComplete) this.upload._sendProgressEvent('loadstart', false, 0, 0);
        nodeXHR(this);
        return;
      },
      abort: function() {
        this._vars.abortsend = true;
        this._vars.response = null;
        this._vars.request = null;
        this._vars.headers = null;
        this._vars.errorflag = true;
        if( !(this.readyState == XMLHttpRequest.UNSENT || (this.readyState == XMLHttpRequest.OPENED && !this.sendflag) || this.readyState == XMLHttpRequest.DONE) ) {
          this._vars.sendflag = false;
          this._changeState(XMLHttpRequest.DONE);
          this._sendProgressEvent('abort',false,0,0);
          this._sendProgressEvent('loadend',false,0,0);
          if(!this._vars.uploadComplete) {
            this.upload._sendProgressEvent('abort', false, 0, 0);
            this.upload._sendProgressEvent('loadend', false, 0, 0);
          }
        }
        this._readyState = XMLHttpRequest.UNSENT;
      },
      getResponseHeader: function(header) {
        if(this.readyState <= 1 || this._vars.errorflag) return null;
        for(i in header) if(header.charCodeAt(i) > 0XFF) return null;
        header = header.toLowerCase();
        if(!this._vars.responseHeaders[header]) return null;
        if(Array.isArray(this._vars.responseHeaders[header])) return this._vars.responseHeaders[header].join(', ');
        return this._vars.responseHeaders[header];
      },
      getAllResponseHeaders: function() {
        if(this.readyState <= 1 || this._vars.errorflag) return null;
        var out = {}, _$ = this;
        Object.keys(this._vars.responseHeaders).forEach(function(k) {
          var v = _$._vars.responseHeaders[k];
          out[k] = Array.isArray(v) ? v.join(', ') : v;
        });
        return out;
      },
      overrideMimeType: function(mime) {
        // nothing one can really implement here..
      }
    };
    return XMLHttpRequest;
  })();
})( js3 );
