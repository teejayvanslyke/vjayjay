var Vjayjay = function(callback) {

  function Listener(params, callback) {
    this.params = params;
    this.callback = callback;

    this.match = function(params) {
      for (key in this.params) {
        if (params[key] != this.params[key]) {
          return false;
        }
      }

      return true;
    };
  };

  var listeners = [];
  this.socket = new WebSocket("ws://localhost:8080");
  this.socket.onmessage = function(message) {
    message = JSON.parse(message.data);
    $.each(listeners, function(index, listener) {
      if (listener.match(message)) {
        listener.callback(message);
      }
    });
  };
  this.plugin = Vjayjay.plugin;


  this.listen = function(params, callback) {
    listeners.push(new Listener(params, callback));
  };

  callback(this);
};

Vjayjay.plugins   = {};

Vjayjay.plugin = function(name, callbackOrArgs) {
  console.log(typeof(callbackOrArgs));
  if (typeof(callbackOrArgs) == 'function') {
    // Register the plugin since they're probably creating one.
    Vjayjay.plugins[name] = callbackOrArgs;
  }
  else {
    // Call the plugin bound to this since they're probably calling it.
    Vjayjay.plugins[name](this, callbackOrArgs);
  }
};
