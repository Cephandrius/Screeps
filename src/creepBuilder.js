/*Implementation list:
Vars:
  repairThingsYouPassBy
Methods:
  repair
  repairAction
  harvest (steal from harvester)
  fill(steal from carrier)
*/
var creepBase = require("creepBase");

function creepBuilder(creepId){//I don't know how constructors are inherited
  new creepBase.call(this,creepId);
  this.repairConstantly = this.creep.memory.repairConstantly;
  this.fillingEnergy = this.creep.memory.fillingEnergy;
}

creepBuilder.setRepairConstantly = function(temp){
  this.repairConstantly = temp;
}

/*
args: nothing
action: will collect energy
return: whether or not the creep is full
notes: this is a priavte function, don't use
*/
creepBuilder.gatherEnergy = function(){
  var energyNeeded = this.creep.carryCapacity-this.creep.carry[RESOURCE_ENERGY];
  var energyAvailible = this.secondaryTarget.energy;
  if(energyAvailible == undefined){
    energyAvailible = this.secondaryTarget.store[RESOURCE_ENERGY];
    if(energyAvailible === undefined){
      this.creep.harvest(this.secondaryTarget);
      if(this.creep.carry[RESOURCE_ENERGY]==this.creep.carryCapacity){
        return true;
      }else{
        return false;
      }
    }
  }
  energyNeeded = (energyNeeded>energyAvailible)?energyAvailible:energyNeeded;
  result = this.creep.withdraw(this.secondaryTarget,RESOURCE_ENERGY,energyNeeded);
  if(result!=OK){
    console.log("There was an error in the build action of creep (", this.creep.pos.x,",",this.creep.pos.y,") with an error code ",result);
    return false;
  }
  return true;
}
creepBuilder.buildAction = function(){
  this.fillingEnergy = false;
        var end = this.primaryTarget.pos;
        end.x = end.x-1;
        var result = this.room.findPath(this.creep.pos,end,
                                        {ignoreCreeps:true,serialize:true})
        this.movePath = result;
  var result = this.move();
  if(result){
    if(this.fillingEnergy){
      
   }else{
    if(this.creep.energy == 0){
      this.fillingEnergy = true;
      var result = this.room.findPath(this.creep.pos,this.secondaryTarget.pos,
                                      {ignoreCreeps:true,serialize:true})
      this.movePath = result;
    }else{
     this.creep.build(this.primaryTarget);
    }
  }
}

