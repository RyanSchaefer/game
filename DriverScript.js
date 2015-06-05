/* 
######################################################################
##(C)Squid Dev 2015                                                 ##
##have a suggestion or see a bug contact: contact.devsquid@gmail.com##
######################################################################
*/



//Don't touch the amount part ;) that would be cheating 
var stone  = {amount:0};
var copper = {amount:0};
var iron   = {amount:0};
var coal   = {amount:0};
var hardStone   = {amount:0};
var copperPlate = {amount:0};
var ironPlate   = {amount:0};
var cokeCoal    = {amount:0, special:1};
var stoneMine  = {amount : 0, onOff : 0 };
var copperMine = {amount : 0, onOff : 0 };
var ironMine   = {amount : 0, onOff : 0 };
var coalMine   = {amount : 0, onOff : 0 };
var stoneSmelter = {amount : 0, onOff : 0};
var copperSmelter = {amount : 0, onOff : 0};
var ironSmelter = {amount : 0, onOff : 0};
var coalSmelter = {amount : 0, onOff : 0};
var quartz = {amount : 0};
var tin = {amount : 0};
var gold = {amount : 0};
var anthracite = {amount : 0};
var story  = "";
var storyStage=0;
var eventCompleted=0;

function cheatMode(on){
	if(on==1){
		alert("cheater");
		stone.amount=1000000000000000;
		copper.amount=1000000000000000;
		coal.amount=100000000000000000;
		iron.amount=100000000000000000;
		hardStone.amount=10000000000000000;
		copperPlate.amount=1000000000000000;
		ironPlate.amount=1000000000000000;
		cokeCoal.amount=10000000000000000;
		storyStage=3;
	}
}
cheatMode(1);
//change to run with (1) or without (0) cheats


/*STORY FUNCITONS*/
function storyAdvance(){
	document.getElementById("story").innerHTML="";
	story="";
	if (storyStage==0){
		story="<<Get Time>> SYSTEM TIME 3Y;345D;4x10^3AD || EARTH TIME : N/A <<END>>";
		printLetterByLetter("story", story, 20);
		storyStage=1;
	}
	else if (storyStage==1){
		story="<<Send || Class : Report || Priority : 0>> $?Begin? Resources : Present // Surface // SubSurface // Deep || Water : Present // Surface // SubSurface || Life : Present // Class2 // DangerToLife || Assesment : Disengage // ## Reason: Following protocol 23-60-555 automatic disengage in progress, full destruction of presence of colony awaiting confirmation. ##$ <<END>> ";
		printLetterByLetter("story", story, 1);
	storyStage=2;
	}
	else if (storyStage==2){
	story= "<<Reply || Class : Orders || Priority : 14 || ##EXECUTE IMMEDIATELY## ||EstTravelTime : 1.23x10^6 Y>>$?Begin? Operation : ##Last Hope## || Override : Active || Orders : ##Prepare for sustained population in excess of 1 million persons. Adequate materials must be present. Disregard life readings.##$<END>>";
	printLetterByLetter("story", story, 1);
	storyStage = 3;
	}
	else if (storyStage==3){
	document.getElementById("push").style.display="none";
	document.getElementById("resourceGrid").style.display="table";
	document.getElementById("mineTitle").style.display="block";
	fadeIn("mineTitle", 20);
	fadeIn("teirIresources", 20);
	document.getElementById("story").style.opacity=0;
	storyStage = 4;
	}
}



/*BASIC FUNCTIONS*/
function updateAmount(varAmount, unit, elementUpdated){
document.getElementById(elementUpdated).innerHTML = varAmount.amount+" "+unit;
}

function smelt(resource, product){
	if(product.special==1&&coal.amount>=2){
	cokeCoal.amount++;
	coal.amount=coal.amount - 2;
	}
	else if (product.special==null){
	if (coal.amount>=1&&resource.amount>=1){
			 product.amount++;
			    coal.amount--;
			resource.amount--;
		}
	}
}

function machineOn(machine, machineSwitchElement){
	if(machine.onOff==1){
		machine.onOff = 0; 
		machineSwitchElement.innerHTML="STATUS : OFF"
		machineSwitchElement.style.background="red"
	}
	else if(machine.onOff==0){
		machine.onOff = 1;
		machineSwitchElement.innerHTML="STATUS : ON";
		machineSwitchElement.style.background ="green";
	}
}

function addTeirIMachine(copperPlateCost, ironPlateCost, product){
	if(ironPlate.amount>=ironPlateCost&&copperPlateCost<=copperPlate.amount){
		product.amount++;
		ironPlate.amount   = ironPlate.amount - ironPlateCost;
		copperPlate.amount = copperPlate.amount - copperPlateCost;
	}
}

function smeltCraft(machine, cost, product){
	if(coal.amount >= machine.amount && cost.amount>=machine.amount&&machine.onOff==1){
		coal.amount= coal.amount - machine.amount;
		cost.amount= cost.amount - machine.amount;
		product.amount = product.amount + machine.amount;
	}
}

function mine(machine, product){
	if(coal.amount >= machine.amount && machine.onOff==1){
		coal.amount= coal.amount - machine.amount;
		product.amount= product.amount + machine.amount*2;
	}
}

/*STORY ANIMATIONS*/
function printLetterByLetter(destination, message, speed){
	var p = printLetterByLetter.intervals;
	if (!p)
		printLetterByLetter.intervals = p = {};

	if (p[destination])
		clear();

	function clear() {
		clearInterval(p[destination]);
		delete p[destination];
	}

	var i = 0;
	var elem = document.getElementById(destination);
	p[destination] = setInterval(function(){
		elem.innerHTML += message.charAt(i);
		i++;
		if (i > message.length){
			clear();
		}
	}, speed);
}

function fadeIn(element, speed){
var fade=0;
	var interval2 =setInterval(function(){
		fade=fade+.01;
		document.getElementById(element).style.opacity=fade;
		if (fade > 1){
			clearInterval(interval2);
		}
	}, speed)
}

function clearText(element){
element.innerHTML="";
}

/* RESEARCH */
function researchSmelting(){
	if (stone.amount>=10&&iron.amount>=10&&copper.amount>=10){
		document.getElementById("tierIIresources").style.display="table-row";
		fadeIn("tierIIresources", 20);
		document.getElementById("currentResearch").innerHTML="<b class=\"red\">Research Auto-Mines</b> (+Miners, -20 copper plates, -20 iron Plates)";
		document.getElementById("currentResearch").onclick=researchMines;
		stone.amount=stone.amount-10;
		iron.amount=iron.amount-10;
		copper.amount=copper.amount-10;
		document.getElementById("story").innerHTML="";
		printLetterByLetter("story", "One of this and one of these.", 100);
	}
}

function researchMines(){
	if (copperPlate.amount>=20&&ironPlate.amount>=20){
		copperPlate.amount = copperPlate.amount - 20;
		ironPlate.amount = ironPlate.amount - 20;
		document.getElementById("machines").style.display="block";
		fadeIn("machines", 20);
		document.getElementById("currentResearch").innerHTML="<b class=\"red\">Research Auto-Smelting</b>(+Smelters, -25 copper plates, -25 iron Plates)";
		document.getElementById("currentResearch").onclick=researchAutoSmelting;
		document.getElementById("story").innerHTML="";
		printLetterByLetter("story", "10 of this and 10 of those... hmm ... We might need something to power it.", 100);
	}
}
function researchAutoSmelting(){
	if (copperPlate.amount>=25&&ironPlate.amount>=25){
		copperPlate.amount = copperPlate.amount - 25;
		ironPlate.amount = ironPlate.amount -25;
		document.getElementById("smelters").style.display = "table-row";
		document.getElementById("smelterSwitches").style.display = "table-row";
		document.getElementById("currentResearch").innerHTML="Research New Extraction Techniques(+new ores, -1000 coke coal, -1000 hard stone, -1000 copper plate, -1000 iron plate)"
		document.getElementById("currentResearch").onclick = researchTeirII;
		document.getElementById("story").innerHTML="";
		printLetterByLetter("story", "Just move this part over here ... lets power this the same way.", 100);
	}
}

function researchTeirII(){
	if(copperPlate.amount>=1000&&hardStone.amount>=1000&&ironPlate.amount>=1000&&cokeCoal.amount>=1000){
		cokeCoal.amount = cokeCoal.amount - 1000;
		hardStone.amount = hardStone.amount - 1000;
		copperPlate.amount = copperPlate.amount - 1000;
		ironPlate.amount = ironPlate.amount - 1000;
		document.getElementById("tierIIbasicResources").style.display="table-row";
		fadeIn("tierIIbasicResources", 20);
		document.getElementById("story").innerHTML="";
		printLetterByLetter("story", "We may need these someday.", 100);
	}
}

function researchTrading(){
//add this in later
}

window.setInterval(function tick(){
updateAmount(stone, "stone", "stone");
updateAmount(iron, "iron", "iron");
updateAmount(copper, "copper", "copper");
updateAmount(coal, "coal", "coal");
updateAmount(hardStone, "hard stones", "smeltStone");
updateAmount(copperPlate, "copper plates", "smeltCopper");
updateAmount(ironPlate, "iron plates", "smeltIron");
updateAmount(cokeCoal, "coke coal", "smeltCoal");
updateAmount(ironMine, "iron mines", "ironMine");
updateAmount(coalMine, "coal mines", "coalMine");
updateAmount(stoneMine, "stone mines", "stoneMine");
updateAmount(copperMine, "copper mines", "copperMine");
updateAmount(stoneSmelter, "stone smelters", "stoneSmelter");
updateAmount(copperSmelter, "copper smelters", "copperSmelter");
updateAmount(ironSmelter, "iron smelters", "ironSmelter");
updateAmount(coalSmelter, "coal smelters", "coalSmelter");
updateAmount(quartz, "quartz", "mineQuartz");
updateAmount(tin, "tin", "mineTin");
updateAmount(anthracite, "anthracite", "mineAnthracite");
updateAmount(gold, "gold", "mineGold");
if (stone.amount>=10||coal.amount>=10||copper.amount>=10||iron.amount>=10){
	if(storyStage==4){
		if(eventCompleted==0){
	document.getElementById("story").innerHTML="Even the greatest of minds continue to learn.";
		document.getElementById("research").style.display="block";
		fadeIn("story", 20);
		fadeIn("research", 20);
		eventCompleted=1;
		}
	}
}
}, 1);

window.setInterval(function check(){
mine(stoneMine, stone);
mine(copperMine, copper);
mine(ironMine, iron);
mine(coalMine, coal);
smeltCraft(stoneSmelter, stone, hardStone);
smeltCraft(copperSmelter, copper, copperPlate);
smeltCraft(ironSmelter, iron, ironPlate);
smeltCraft(coalSmelter, coal, cokeCoal);
}, 1000)
