/* Implementation List
Methods:
  saveMemory
Roomhandler:
  ACTIONS
    format is a string with name of action and then the function to run
*/
var compareObjects = require("compareObjects");
/*
args: a valid creepId
action: set up the variable for the creep class
returns: will return if class was iniated correctly
notes: none
*/
function creepBase(creepId){
  var creep = Game.getObjectById(creepId);
  if(creep!=null){
    this.primaryTarget = Game.getObjectById(creep.memory.primaryTarget);
    this.secondaryTarget = Game.getObjectById(creep.memory.secondaryTarget);
    this.action = creep.memory.action;
    this.movePath = creep.memory.movePath; //Can be two things, an number or a string, the number says path to use in room memory , string is a serialized path
    this.creep = creep;
    this.room = Game.getObjectById(creep.room);
    this.id = creepId;
    return true;
  }
  return false;
};

creepBase.prototype.doAction = function(){
  var actionConstants = this.room.ACTIONS;
  if(actionConstants[this.action] == undefined){
    actionConstants[this.action].call(this);
  }else{
    this.room.addIdleCreep(this.id);
  }
};

/*
args: none
action: get the creep closer to end of movepath
returns: will return true if it as end of movepath
notes: a private method, never call
*/
creepBase.prototype.move = function(){
  var path = this.movePath;
  var type = typeof path;
  if(type == "number"){
    path = this.room.movePaths[path];
  }
  path = Room.deserializePath(path);
  
  var result = this.creep.moveByPath(path);
  if(result == ERR_NOT_FOUND){
    this.creep.moveTo(path[0].x,path[0].y);    
  }else if(result != OK || result != ERR_TIRED){
    console.log("Error in move function of creep:",this.id," with error code ",result);
  }
  
  if(compareObjects(this.creep.pos,path[path.length-1])){
    return true;
  }
};

/*
args: none
action: will do the move action
returns: nothing
notes: this is differnt from move() because this will notify the Room when it is at the end of the path
*/
creepBase.prototype.moveAction = function(){
  var result = this.move();
  if(result == true){
    this.room.addIdleCreep(this.id);
  }
};

creepBase.prototype.setAction = function(action){
  this.action = action; 
};

creepBase.prototype.setPrimaryTarget = function(target){
 this.primaryTarget = target; 
};

creepBase.prototype.setSecondaryTarget = function(target){
 this.secondaryTarget = target; 
};

creepBase.prototype.saveMemory = function(){
  this.creep.memory.primaryTarget = this.primaryTarget.id;
  this.creep.memory.secondaryTarget = this.secondaryTarget.id;
  this.creep.memory.action = this.action;
  this.creep.memory.movePath = this.movePath;
};
module.exports = creepBase;
