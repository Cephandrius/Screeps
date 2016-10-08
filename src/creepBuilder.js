/*Implementation list:
Methods:
  saveMemory
*/
var creepBase = require("creepBase");

function creepBuilder(creepId){//I don't know how constructors are inherited
  this.repairConstantly = this.creep.memory.repairConstantly;
  this.fillingEnergy = this.creep.memory.fillingEnergy;
};

creepBuilder.setRepairConstantly = function(temp){
  this.repairConstantly = temp;
};

/*
args: nothing
action: will collect energy
return: whether or not the creep is full
notes: this is a priavte function, don't use
*/
creepBuilder.gatherEnergy = function(){
  var result = this.creep.withdraw(this.secondaryTarget,RESOURCE_ENERGY);
  if(result == ERR_INVALID_TARGET){
    this.creep.harvest(this.secondaryTarget);
    if(this.creep.carry[RESOURCE_ENERGY]==this.creep.carryCapacity){
      return true;
    }else{
      return false;
    }
  }else if(result!=OK){
    console.log("There was an error in the build action of creep (", this.creep.pos.x,",",this.creep.pos.y,") with an error code ",result);
    return false;
  }else{
    return true;
  }
};

/*
args: nothing
action: will run the build action for the builder
returns: nothing
notes: none
*/
creepBuilder.buildAction = function(){
  var result = this.move();
  if(result){
    if(this.fillingEnergy){
       result = this.gatherEnergy();
       if(result){
          this.fillingEnergy = false;
          var end = this.primaryTarget.pos;
          end.x = end.x-1;
          var result = this.room.findPath(this.creep.pos,end,
                                          {ignoreCreeps:true,serialize:true})
          this.movePath = result;
        }
    }else{
      if(this.creep.energy == 0){
        this.fillingEnergy = true;
        var result = this.room.findPath(this.creep.pos,this.secondaryTarget.pos,
                                        {ignoreCreeps:true,serialize:true})
        this.movePath = result;
      }else{
        this.creep.build(this.primaryTarget);
        if((this.primaryTarget.progressTotal-this.primaryTarget.progress) == 0){
          this.room.addIdleCreep(this.id);
        }
      }
    }
  }
};

creepBuilder.repairAction = function(){
  var result = this.move();
  if(result){
    if(this.fillingEnergy){
      result = this.gatherEnergy();
      if(result){
        this.fillingEnergy = false;
        var end = this.primaryTarget.pos;
        end.x = end.x-1;
        var result = this.room.findPath(this.creep.pos,end,
                                        {ignoreCreeps:true,serialize:true})
        this.movePath = result;
      }
    }else{//This needs to be modified
      this.creep.repair(this.primaryTarget);
      if(this.primaryTarget.hits==this.primaryTarget.hitsMax){
        this.room.addIdleCreep(this.id);
      }
    }
  }
};

creepBuilder.fill = function(){
   var result = this.move();
  if(result){
    if(this.fillingEnergy){
      result = this.gatherEnergy();
      if(result){
        this.fillingEnergy = false;
        var end = this.primaryTarget.pos;
        end.x = end.x-1;
        var result = this.room.findPath(this.creep.pos,end,
                                        {ignoreCreeps:true,serialize:true});
        this.movePath = result;
      }
    }else{//This needs to be modified
      this.creep.transfer(this.primaryTarget,RESOURCE_ENERGY);
      this.room.addIdleCreep(this.id);
      }
    }
  }
};

creepBuilder.saveMemory = function(){
  this.creep.memory.repairConstantly = this.repairConstantly;
  this.creep.memory.fillingEnergy = this.fillingEnergy;
  creepBase.prototype.saveMemory();
};
module.exports = creepBuilder;
