var Vjayjay = function(callback) {

  this.listeners = [];
  this.socket = new WebSocket("ws://localhost:8080");

  this.listen = function(callback) {
    this.socket.onmessage = function(message) {
      message = JSON.parse(message.data);
      callback(message);
    };
  };

  callback(this);
};
