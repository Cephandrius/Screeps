/* Implementation List
Vars:
  primaryTarget
  secondaryTarget
  action
  movePath
  creep
  room
Functions:
  doAction(will have separate functions from this)
  move
  constructor
    Initalize all variables
*/

//Constructor
var creepBase = function(creep){
  this.primaryTarget = creep.memory.primaryTarget;
  this.secondaryTarget = creep.memory.secondaryTarget;
  this.action = creep.memory.action;
  this.movePath = creep.memory.movePath;
  this.creep = creep;
  this.room = creep.memory.room;
}
creepBase.doAction = function(){
  
}
