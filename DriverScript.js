/* 
######################################################################
##(C)Squid Dev 2015                                                 ##
##have a suggestion or see a bug contact: contact.devsquid@gmail.com##
######################################################################
*/



// Resource objects
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



/*STORY FUNCITONS*/
function storyAdvance(){
	document.getElementById("story").innerHTML="";
	story="";

	if (storyStage==0){
		story="<<Get Time>> SYSTEM TIME 3Y;345D;4x10^3AD || EARTH TIME : N/A <<END>>";
		printLetterByLetter("story", story, 50);
		storyStage=1;
	}
	else if (storyStage==1){
		story="<<Send || Class : Report || Priority : 0>> $?Begin? Resources : Present // Surface // SubSurface // Deep || Water : Present // Surface // SubSurface || Life : Present // Class2 // DangerToLife || Assesment : Disengage // ## Reason: Following protocol 23-60-555 automatic disengage in progress, full destruction of presence of colony awaiting confirmation. ##$ <<END>> ";
		printLetterByLetter("story", story, 50);
	storyStage=2;
	}
	else if (storyStage==2){
	story= "<<Reply || Class : Orders || Priority : 14 || ##EXECUTE IMMEDIATELY## ||EstTravelTime : 1.23x10^6 Y>>$?Begin? Operation : ##Last Hope## || Override : Active || Orders : ##Prepare for sustained population in excess of 1 million persons. Adequate materials must be present. Disregard life readings.##$<END>>";
	printLetterByLetter("story", story, 50);
	storyStage = 3;
	}
	else if (storyStage==3){
        document.getElementById("push").style.display="none";
        document.getElementById("resourceGrid").style.display="table";
        document.getElementById("mineTitle").style.display="block";
        fadeIn("mineTitle", 20);
        fadeIn("teirIresources", 50);
        document.getElementById("story").style.opacity=0;
        storyStage = 4;
	}
}



/*BASIC FUNCTIONS*/
function updateAmount(varAmount, unit, elementUpdated, white){
    /*
    * varAmount: int
    * unit: str
    * elementUpdated: elem
    * white: int
    * */
	if (white==0) {
		document.getElementById(elementUpdated).innerHTML = varAmount.amount+" "+unit;
	}
	else if (white==1) {
		document.getElementById(elementUpdated).innerHTML ="<p class=\"white\">"+varAmount.amount+" "+unit+"</p>";
	}
}

function smelt(resource, product) {
    /*
    * resource: object
    * product: object
    * */
	if (product.special==1 && coal.amount>=2) {
        cokeCoal.amount++;
        coal.amount=coal.amount - 2;
	}
	else if (product.special==null){
        if (coal.amount>=1 && resource.amount>=1){
                 product.amount++;
                 coal.amount--;
                 resource.amount--;
        }
	}
}

function machineOn(machine, machineSwitchElement) {
    /*
    * machine: object
    * machineSwitchElement: element
    * */
	if (machine.onOff==1) {
		machine.onOff = 0; 
		machineSwitchElement.innerHTML="STATUS : OFF";
		machineSwitchElement.style.background="red"
	}
	else if (machine.onOff==0) {
		machine.onOff = 1;
		machineSwitchElement.innerHTML="STATUS : ON";
		machineSwitchElement.style.background ="green";
	}
}

function addTeirIMachine(copperPlateCost, ironPlateCost, product) {
    /*
    * copperPlateCost: int
    * ironPlateCost: int
    * product: object
    * */
	if(ironPlate.amount>=ironPlateCost&&copperPlateCost<=copperPlate.amount){
		product.amount++;
		ironPlate.amount = ironPlate.amount - ironPlateCost;
		copperPlate.amount = copperPlate.amount - copperPlateCost;
	}
}

function smeltCraft(machine, cost, product) {
    /*
    * machine: object
    * cost: object
    * product: object
    * */
	if (coal.amount >= machine.amount && cost.amount>=machine.amount && machine.onOff==1) {
		coal.amount= coal.amount - machine.amount;
		cost.amount= cost.amount - machine.amount;
		product.amount = product.amount + machine.amount;
	}
}

function mine(machine, product) {
    /*
    * machine: object
    * product: object
    * */
	if (coal.amount >= machine.amount && machine.onOff==1) {
		coal.amount = coal.amount - machine.amount;
		product.amount = product.amount + machine.amount*2;
	}
}

/*STORY ANIMATIONS*/
function printLetterByLetter(destination, message, speed){
    //adds one letter at a time to an element at a given speed using intervals
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
    // fades in an element
    var fade=0;
	var interval2 = setInterval(function(){
		fade=fade+.01;
		document.getElementById(element).style.opacity=fade;
		if (fade > 1){
			clearInterval(interval2);
		}
	}, speed)
}

function clearText(element){
    // erases an elements inside
    element.innerHTML="";
}

/* RESEARCH */
function researchSmelting(){
    // unlocks smelting and animates the process
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
    // unlocks mines and animates the process
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
    // unlocks smelting machines and animates the process
	if (copperPlate.amount>=25&&ironPlate.amount>=25){
		copperPlate.amount = copperPlate.amount - 25;
		ironPlate.amount = ironPlate.amount -25;
		document.getElementById("smelters").style.display = "table-row";
		document.getElementById("smelterSwitches").style.display = "table-row";
		document.getElementById("currentResearch").innerHTML="Research New Extraction Techniques(+new ores, -1000 coke coal, -1000 hard stone, -1000 copper plate, -1000 iron plate)";
		document.getElementById("currentResearch").onclick = researchTeirII;
		document.getElementById("story").innerHTML="";
		printLetterByLetter("story", "Just move this part over here ... lets power this the same way.", 100);
	}
}

function researchTeirII(){
    // researches tier two resources
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

function researchTrade(){
	if(stone.amount>=25){
		stone.amount = stone.amount - 25;
		document.getElementById("trade").style.display="block";
	}
}

window.setInterval(function tick(){
    // updates each element with the number of resources that the user has
    // this will be changed in a later version
    updateAmount(stone, "stone", "stone", 0);
    updateAmount(iron, "iron", "iron", 0);
    updateAmount(copper, "copper", "copper", 0);
    updateAmount(coal, "coal", "coal", 1);
    updateAmount(hardStone, "hard stones", "smeltStone", 0);
    updateAmount(copperPlate, "copper plates", "smeltCopper",0 );
    updateAmount(ironPlate, "iron plates", "smeltIron", 0);
    updateAmount(cokeCoal, "coke coal", "smeltCoal", 0);
    updateAmount(ironMine, "iron mines", "ironMine", 0);
    updateAmount(coalMine, "coal mines", "coalMine", 0);
    updateAmount(stoneMine, "stone mines", "stoneMine", 0);
    updateAmount(copperMine, "copper mines", "copperMine", 0);
    updateAmount(stoneSmelter, "stone smelters", "stoneSmelter", 0);
    updateAmount(copperSmelter, "copper smelters", "copperSmelter", 0);
    updateAmount(ironSmelter, "iron smelters", "ironSmelter", 0);
    updateAmount(coalSmelter, "coal smelters", "coalSmelter", 0);
    updateAmount(quartz, "quartz", "mineQuartz", 0);
    updateAmount(tin, "tin", "mineTin", 0);
    updateAmount(anthracite, "anthracite", "mineAnthracite", 1);
    updateAmount(gold, "gold", "mineGold", 0);
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
    // runs the mines
    mine(stoneMine, stone);
    mine(copperMine, copper);
    mine(ironMine, iron);
    mine(coalMine, coal);
    smeltCraft(stoneSmelter, stone, hardStone);
    smeltCraft(copperSmelter, copper, copperPlate);
    smeltCraft(ironSmelter, iron, ironPlate);
    smeltCraft(coalSmelter, coal, cokeCoal);
}, 1000);
