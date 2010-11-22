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
  this.patch = Vjayjay.patch;
  this.scene = Vjayjay.scene;
  callback(this);
};

Vjayjay.patches   = {};
Vjayjay.patch = function(name, callbackOrArgs) {
  if (typeof(callbackOrArgs) == 'function') {
    // Register the patch since they're probably creating one.
    Vjayjay.patches[name] = callbackOrArgs;
  }
  else {
    // Call the patch bound to this since they're probably calling it.
    Vjayjay.patches[name](this, callbackOrArgs);
  }
};

Vjayjay.scenes = {};
Vjayjay.Scene = function(callbackOrArgs) {
  this.setup = function(callback) {
    if (typeof(callback) == 'function') {
      this.setupCallback = callback;
    } else if (this.setupCallback) {
      this.setupCallback(callback);
    }
  };

  this.teardown = function(callback) {
    if (typeof(callback) == 'function') {
      this.teardownCallback = callback;
    } else if (this.teardownCallback) {
      this.teardownCallback(callback);
    }
  };

  callbackOrArgs(this);
};

Vjayjay.scene = function(name, callbackOrArgs) {
  if (typeof(callbackOrArgs) == 'function') {
    // Register the scene since they're probably creating one.
    Vjayjay.scenes[name] = new Vjayjay.Scene(callbackOrArgs);
  }
  else {
    // Call the scene bound to this since they're probably calling it.
    if (Vjayjay.currentScene) {
      Vjayjay.currentScene.teardown(this);
    }
    var scene = Vjayjay.scenes[name];
    Vjayjay.currentScene = scene;
    if (scene) {
      scene.setup(this);
    } else {
      console.log("WARNING: Scene '"+name+"' does not exist.");
    }
  }
};

