/* 
######################################################################
##(C)Ryan Schaefer 2016                                             ##
##have a suggestion or see a bug: contact.devsquid@gmail.com        ##
######################################################################
*/
"use strict";
let story  = "";
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
    constructor (element){
        this.amount = 0;
        this.bonus = 1;
        this.element = element;
    }
    mine () {
        this.amount += 1 * this.bonus;
        $(this.element).text(this.amount);
        console.log(this.amount);
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
            $("#story").css("display", 'none');
            $('#tierIResources').children().each(function () {
                let instance = new resource($(this));
                resources[$(this).attr('id')] = instance;
                $(this).click(function () {
                    instance.mine()
                })
            });
            $("#resources").fadeIn(3000);
            storyStage++;
            break;
    }
}


// page loaded
$(
    function () {
        $("#clickToBegin").click(
            function () {
                $("#clickToBegin").remove();
                storyAdvance();
            }
        );
        $("#story").click(
            function (){
                storyAdvance();
            }
        );
    }
);