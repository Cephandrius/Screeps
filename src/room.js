/*Implementation list:
methods:
  addIdleCreep
  assesSituation(will be blank for now)
  orderCreeps
  saveMemory
*/
var creepBuilder = require("creepBuilder");
var creepBase = require("creepBase");

function room(roomId){
  this.room = Game.getObjectById(roomId);
  if(this.room!=null){
    if(this.room.memory.initialized == undefined){
      this.initialSetup();
      this.room.memory.initialized = true;
    }else{
      this.creeps = this.room.memory.creeps;
      for(int i = 0;i<this.creeps.length;i++){
        this.creeps[i] = Game.getObjectById(spawns[i]); 
      }
      this.roomPaths = this.room.memory.roomPaths;
      this.idleCreeps = this.room.memory.idleCreeps;
      this.spawns = this.room.memory.spawns;//should be objects
      for(int i = 0;i<this.spawns.length;i++){
        this.spawns[i] = Game.getObjectById(spawns[i]); 
      }
      this.sources = this.room.memory.sources;//should be objects
      for(int i = 0;i<this.sources.length;i++){
        this.sources[i] = Game.getObjectById(this.sources[i]); 
      }
      this.ACTIONS = { fill : creepBuilder.fillAction , move : creepBase.moveAction , build: creepBuilder.buildAction, repair : creepBuilder.repairAction}
    }
  }
};

room.initialSetup = function(){
  this.spawns = this.room.find(FIND_MY_STRUCTURES,{
    filter: { structureType: STRUCTURE_SPAWN }  
  });
  this.sources = this.room.find(FIND_SOURCES);
  this.idleCreeps = [];
  this.roomPaths = [];
};

room.addIdleCreep = function(creepId){
  this.idleCreeps.push(creepId);
};

room.assesSituation = function(){
//Currently not finished  
};

room.orderCreeps =  function(){
  var length = this.idleCreeps.length;
  for(int i = 0;i<length;i++){
    var creep = Game.getObjectById(this.idleCreeps.pop());
    creep.setAction("fill");
    creep.setPrimaryTarget(this.spawns[0]);
    creep.setSecondaryTarget(this.sources[0]);                                
  }
  for(int i = 0;i<this.creeps.length;i++){
    this.creeps[i].doAction();
  }
};

room.spawnCreeps = function(){
  if(this.spawns[0].energy == 300){
     var creep = this.spawns[0].createCreep([WORK,WORK,CARRY,MOVE]
                                           {primaryTarget:this.spawns[0],
                                            secondarTarget:this.sources[0],
                                            action:"fill",
                                            fillingEnergy:true,
                                            repairConstantly:true});
     this.creeps.push(new creepBuilder(creep.id));
  }
};

room.saveMemory = function(){
    
}

