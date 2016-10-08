var room = require("room");
var creepBase = require("creepBase");
var creepBuilder = require("creepBuilder");

module.exports.loop = function () {
  var rooms = [];
  for(aRoom in Game.rooms){
    if(aRoom.memory.initalized != undefined){
      rooms.push(new room(aRoom.id));
    }  
  }
  for(int i = 0;i<rooms.length;i++){
    rooms[i].assesSituation(); 
  }
  for(int i = 0;i<rooms.length;i++){
    rooms[i].orderCreeps(); 
  }
  for(int i = 0;i<rooms.length;i++){
    rooms[i].saveMemory(); 
  }
}
