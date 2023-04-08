var command;
var allCommands = ["contact", "war", "resume", "clear"];
var x = 0;
var fuck = "<p id='command-text'> fuck me! </p>"
var sinan = "<a id='command-text' href='https://www.youtube.com/watch?v=k3b44qfx-ZQ'> November 14 <a>"
var contact = "<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='mailto:derins@stanford.edu'><i class='fa fa-envelope' style='font-size:25px;color:white;'></i></a>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://github.com/derins'><i class='fa fa-github' style='font-size:30px;color:white;'></i></a>" +
                "&nbsp;&nbsp;&nbsp;&nbsp;<a href='https://www.linkedin.com/in/derin-serbetcioglu-4a1a62104/'><i class='fa fa-linkedin' style='font-size:30px;color:white;'></i></a><br>";
var resume = "<div><embed class='container' src='./derin_serbet_resume.pdf' type='application/pdf' height='600px' width='100%'/></div>"
var askHelp = "<p id='command-text'> you are clearly clueless, just ask for help </p>"

$('#outside').click(function() {
     $('#terminal-input' + x).focus();
});


function runTerminal(event) {
    if (event.which == 13 || event.keyCode == 13) {
        command = document.getElementById('terminal-input' + x).value;
        command = command.replace(/^\s+/g, '');
        command = command.replace(/^\s+|\s+$/g, '');
        command = command.toLowerCase()

        if (command === "clear") {
            document.location.reload();
        }
        else if (command === "sinan") {
            $('#terminal').append(sinan);
        }
        else if (command === "help") {
            help();
        }
        else if (command === "fuck") {
            $('#terminal').append(fuck);
        }
        else if (command === "war") {
            war();
        }
        else if (command === "resume") {
            $('#terminal').append(resume);
        }
        else if(command === "contact") {
            $('#terminal').append(contact);
        }
        else {
            $('#terminal').append(askHelp);
        }

        x += 1;
        $('#terminal').append("<br><code>$DERIN Serbetcioglu: <input type='text' id='terminal-input" + x + "'onkeypress='return runTerminal(event)' autofocus/></code>");
        $('#terminal-input' + x).focus();
        return false;
    }
    return true;
}


function help() {
    var help = "<div id='command-text'>type one of the below commands"
    for (var com = 0; com < allCommands.length; com++){
        help += "<br> - " + allCommands[com];
    }
    help += "<div>"
    $('#terminal').append(help);
}


function deal_deck() {
    var deck = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    for (var y = 0; y < 13; y++) {
        deck.push(deck[y]);
        deck.push(deck[y]);
        deck.push(deck[y]);
    }
    shuffle(deck);
    player = deck.splice(0,26);
    computer = deck.splice(0,26);
}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// function war(player, computer, table_cards) {
function warHappens(player, computer, table_cards) {

    if (player.length < 2) {
        return ([],computer,[]);
    }
    if (computer.length < 2) {
        return (player, [], []);
    }

    var cards = ("<p id='command-text'>&emsp;&emsp;&emsp; player's cards = " + table_cards[0] + ", " + player[0] + "</p></br>");
    cards += ("<p id='command-text'>&emsp;&emsp;&emsp;&emsp;&emsp; player's war card = " + player[1] + " </p></br>");
    cards += ("<p id='command-text'>&emsp;&emsp;&emsp; cpu's cards = " + table_cards[1] + ", " + computer[0] + "</p></br>");
    cards += ("<p id='command-text'>&emsp;&emsp;&emsp;&emsp;&emsp; cpu's war card = " + computer[1] + " </p></br>");
    //
    $('#terminal').append(cards);

    warcard1 = player[1];
    warcard2 = computer[1];
    table_cards.push(warcard1);
    table_cards.push(warcard2);
    table_cards.push(player[0]);
    table_cards.push(computer[0]);
    player.splice(0,2);
    computer.splice(0,2);
    shuffle(table_cards)

    if (warcard1 > warcard2){
        for (var y = 0; y < table_cards.length; y++){
            player.push(table_cards[y]);
            $('#terminal').append("<p id='command-text'>&emsp; player takes it </p></br>");
        }
    }

    else if (warcard2 > warcard1){
        for (var y = 0; y < table_cards.length; y++){
            computer.push(table_cards[y]);
            $('#terminal').append("<p id='command-text'>&emsp; computer takes it </p></br>");
        }
    }

    else {
        player, computer, table_cards = warHappens(player, computer, table_cards)
    }
    return (player, computer, table_cards)
}


function war() {
    $('#terminal').append("<p id='command-text'> deck dealt </p>");
    deal_deck();
    var winnner;
    while (player.length > 0 && computer.length > 0){

        var card1 = player[0];
        player.splice(0,1);
        var card2 = computer[0];
        computer.splice(0,1);

        var table_cards = [card1, card2];
        $('#terminal').append("<p id='command-text'> player's card = " + table_cards[0] + "</p>");
        $('#terminal').append("<p id='command-text'> computers's card = " + table_cards[1] + "</p></br>");

        if (card1 > card2) {
            shuffle(table_cards);
            player.push(table_cards[0]);
            player.push(table_cards[1]);
            $('#terminal').append("<p id='command-text'>&emsp; player takes it </p></br>");
        }
        else if (card2 > card1) {
            shuffle(table_cards);
            computer.push(table_cards[0]);
            computer.push(table_cards[1]);
            $('#terminal').append("<p id='command-text'>&emsp; computer takes it </p></br>");
        }
        else {
            $('#terminal').append("<p id='command-text'>&emsp; it's time for war </p></br>");
            player, computer, table_cards = warHappens(player, computer, table_cards);
        }
    }

    if (player.length === 0){
        winner = "computer wins</br>&emsp;&emsp;&emsp;&nbsp;@@</br>&emsp;&emsp;&emsp;&ensp;\\_/";
    }

    else if (computer.length === 0){
        winner = "**you win**";
    }

    $('#terminal').append("<p id='command-text'>" + winner + "</p>");
}
