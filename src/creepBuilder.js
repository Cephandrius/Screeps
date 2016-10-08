/*Implementation list:
Vars:
  repairThingsYouPassBy
Methods:
  buildAction
  repair
  repairAction
  harvest (steal from harvester)
  fill(steal from carrier)
*/
var creepBase = require("creepBase");

function creepBuilder(creepId){//I don't know how constructors are inherited
  new creepBase.call(this,creepId);
}

