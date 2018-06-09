/* 
######################################################################
##(C)Ryan Schaefer 2016                                             ##
##have a suggestion or see a bug: contact.devsquid@gmail.com        ##
######################################################################
*/
"use strict";
//let storyStage=0;
//skip story
let storyStage = 3;
let resources = {};
let machines = {};
let typeItInstance = '';
// EX - 'primative_mine':{'type':{}}, 'primative_smelter':{'type':{}}


window.TypeItDefaults.cursor = "";
//window.TypeItDefaults.html = false;
window.TypeItDefaults.speed = 10;
window.TypeItDefaults.callback = (
    () => {
        $('#story').click(() => {
            storyAdvance();
        })
    });


class resource {
    constructor (element) {
        this.amount = 0;
        this.productionBonus = 1;
        this.element = element;
        this.substrates = JSON.parse($(element).attr('data-substrates'));
    }
    mine () {
        for (let substrate in this.substrates) {
            console.log(substrate);
            if (resources[substrate]['amount'] >= this.substrates[substrate]){
            } else {
                return false;
            }
        }
        for (let substrate in this.substrates) {
            resources[substrate]['amount'] -= this.substrates[substrate];
            $(resources[substrate]['element']).text(resources[substrate]['amount']);
        }
        this.amount += 1 * this.productionBonus;
        $(this.element).text(this.amount);
    }
}

class machine {
    constructor (element) {
        this.amount = 0;
        this.productionBonus = 1;
        this.productionTimeReduction = 1;
        this.element = element;
        this.switch = '';
        this.fuel = '';
        this.substrates = JSON.parse($(element).attr('data-machine-substrates'));
        this.productSubstrates = JSON.parse($(element).attr('data-product-substrates'));
        this.products = JSON.parse($(element).attr('data-products'));
        this.productionInterval = false;
    }
    craft () {
        for (let substrate in this.substrates) {
            if (resources[substrate]['amount'] >= this.substrates[substrate]){
            } else {
                return false;
            }
        }
        for (let substrate in this.substrates) {
            resources[substrate]['amount'] -= this.substrates[substrate];
            $(resources[substrate]['element']).text(resources[substrate]['amount']);
        }
        this.amount += 1;
        $(this.element).text(this.amount);
    }
    produce () {
        for (let substrate in this.productSubstrates) {
            if (resources[substrate]['amount'] >= this.productSubstrates[substrate]){
            } else {
                this.stopProduction();
                return false;
            }
        }
        for (let substrate in this.productSubstrates) {
            resources[substrate]['amount'] -= this.productSubstrates[substrate];
            $(resources[substrate]['element']).text(resources[substrate]['amount']);
        }
        for(let product in this.products) {
            resources[product].amount += 1 * this.productionBonus;
            $(resource[product].element).text(resources[product].amount);
        }
    }
    startProduction () {
        this.productionInterval = setInterval(produce, this.productionTime * this.productionTimeReduction);
        $(this.switch).css("background-color", 'green');
        $(this.switch).text("PRODUCING");
        $(this.switch).off('click.switch');
        $(this.switch).on('click.switch', this.stopProduction);
    }
    stopProduction () {
        clearInterval(this.productionInterval);
        $(this.switch).css('background-color', 'red');
        $(this.switch).text('OFF');
        $(this.switch).off('click.switch');
        $(this.switch).on('click.switch', this.startProduction);
    }
}

/*STORY FUNCITONS*/
function storyAdvance() {
    switch (storyStage) {
        case 0:
            $("#story").off('click');
            $("#story").html("&lt;&lt;Get Time&gt;&gt; SYSTEM TIME 3Y;345D;4x10^3AD || EARTH TIME : N/A &lt;&lt;END&gt;&gt;");
            storyStage++;
            new TypeIt('#story');
            break;
        case 1:
            $("#story").off('click');
            $("#story").html('&lt;&lt;Send || Class : Report || Priority : 0&gt;&gt; $?Begin? Resources : Present // Surface // SubSurface // Deep || Water : Present // Surface // SubSurface || Life : Present // Class2 // DangerToLife || Assessment : Disengage // ## Reason: Following protocol 23-60-555 automatic disengage in progress, full destruction of presence of colony awaiting confirmation. ##$ &lt;&lt;END&gt;&gt; ');
            storyStage++;
            new TypeIt('#story');
            break;
        case 2:
            $("#story").off('click');
            $('#story').html('&lt;&lt;Reply || Class : Orders || Priority : 14 || ##EXECUTE IMMEDIATELY## ||EstTravelTime : 1.23x10^6 Y&gt;&gt;$?Begin? Operation : ##Last Hope## || Override : Active || Orders : ##Prepare for sustained population in excess of 1 million persons. Adequate materials must be present. Disregard life readings.##$&lt;END&gt;&gt;');
            storyStage++;
            new TypeIt('#story');
            break;
        case 3:
            $("#story").off('click');
            $("#story").html("");
            $('#tierIResources').children().each(function () {
                let instance = new resource(this);
                resources[$(this).attr('id')] = instance;
                $(this).click(function () {
                    instance.mine();
                });
                $(this).on('click.check', function check(){
                   for(let resource in resources){
                       if (resources[resource]['amount'] >= 25) {
                           storyAdvance();
                       }
                   }
                })
            });
            $("#resources").fadeIn('slow');
            $("#tierIIResources").css('display', 'none');
            storyStage++;
            break;
        case 4:
            $('#story').html("One of this and one of these.");
            $('#tierIIResources').fadeIn('slow');
            $('#tierIIResources').children().each(function () {
                let instance = new resource(this);
                resources[$(this).attr('id')] = instance;
                $(this).click(function () {
                    instance.mine();
                });
            });
            $('#tierIResources').children().each(function (){
               $(this).off('click.check');
            });
            storyStage++;
            new TypeIt('#story');
            break;
        case 5:
            $('#story').html("10 of this and 10 of these... Whew... That takes a load off.");
            $('#machines').fadeIn('slow');
            $('#mines').children().each(function () {
                let instance = new machine(this);
                machines[$(this).attr('id')] = instance;
                $(this).click(function (){
                    instance.craft();
                });
            });
            $('#mineSwtiches').children().each(function (){
                machines[$(this).attr('data-machine')]['switch'] = this;
                $(this).on('click.switch', machines[$(this).attr('data-machine')].startProduction);
            });
            
            break;

    }
}


// page loaded
$(
    function () {
        $("#story").click(
            function (){
                storyAdvance();
            }
        );
    }
);