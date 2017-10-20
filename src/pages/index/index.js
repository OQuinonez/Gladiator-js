const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

// Makes the Gladiator with the basics
// Health, Rage, Damage_low, and damage_high
function Gladiator(name, health, rage, damageLow, damageHigh) {
    this.name = name;
    this.health = health;
    this.rage = rage;
    this.damageLow = damageLow;
    this.damageHigh = damageHigh;
}

const player1 = new Gladiator('Ryu', 100, 0, 3, 21);
const player2 = new Gladiator('Ken', 100, 0, 5, 16);
STATE = {
    whoseTurn: 1,
    points: ''
};

// Does the basic attack move
// Makes the attacker have a
function attack(attacker, defender) {
    const hit =
        Math.floor(Math.random() * attacker.damageHigh) + attacker.damageLow;
    if (Math.floor(Math.random() * 100) + 1 <= attacker.rage) {
        defender.health = defender.health - hit * 2;
        attacker.rage = 0;
        STATE.points = 'Crit hit of ' + hit * 2 + ' Damage!';
    } else {
        attacker.rage += 15;
        defender.health = defender.health - hit;
        STATE.points = 'Regular hit of ' + hit + ' Damage!';
    }
    if (defender.health <= 0) {
        defender.health = 0;
        STATE.points = attacker.name + ' Wins!';
    }
}

// Heals Gladiator
function heal(attacker) {
    if (attacker.rage >= 10) {
        attacker.health = attacker.health += 5;
        STATE.points = 'Player healed 5 points.';
        if (attacker.health > 100) {
            attacker.health = 100;
        }
        attacker.rage = attacker.rage - 10;
        if (attacker.rage < 0) {
            attacker.rage = 0;
        }
    }
}
// Another move more powerful than a regular attack
function haduken(attacker, defender) {
    const hdkn = Math.floor(Math.random() * 40) + 25;
    if (attacker.rage >= 40) {
        defender.health -= hdkn;
        attacker.rage = 0;
        STATE.points = 'Haduken! ' + hdkn + ' Damage!';
    }
    if (defender.health <= 0) {
        defender.health = 0;
        STATE.points = attacker.name + ' Wins!';
    }
}
//Skips turn and add 20 rage to the user
function ragingUp(attacker) {
    if (attacker.rage >= 100) {
        attacker.rage = 100;
    } else {
        attacker.rage += 15;
    }
}
//Checks if player is dead
function isDead(attacker) {
    if (attacker.health <= 0) {
        return true;
    } else {
        return false;
    }
}
// ********************************* USED FOR THE PAGE

//Checks if it is player one's turn
function combater() {
    if (STATE.whoseTurn === 1) {
        return player1;
    } else {
        return player2;
    }
}
//Checks if it is player two's turn
function defending() {
    if (STATE.whoseTurn === 1) {
        return player2;
    } else {
        return player1;
    }
}
// Changes turn for the user
function changeTurn() {
    if (STATE.whoseTurn === 1) {
        STATE.whoseTurn = 2;
    } else {
        STATE.whoseTurn = 1;
    }
}
// Starts both players like new with both at 100 health and 0 rage
// function reload(player, other) {
//     able = [];
//     if (player.health < 0 || other.health < 0) {
//         able.push(
//             "<div><button id='restart' class='btn btn-moves' onclick='document.location.reload()'>Restart</button></div>"
//         );
//     }
//     return able.join('');
// }

// Makes the buttons do what they are suppose to do
function attatchHandlers() {
    $('#attack').click(function() {
        attack(combater(), defending());
        changeTurn();
        draw();
    });
    $('#heal').click(function() {
        heal(combater());
        changeTurn();
        draw();
    });
    $('#restart').click(function() {
        reload(combater(), defending());
        draw();
    });
    $('#rage').click(function() {
        ragingUp(combater());
        changeTurn();
        draw();
    });
    $('#hadukening').click(function() {
        haduken(combater(), defending());
        changeTurn();
        draw();
    });
}

// Makes the buttons viewable under certain
// circumstances for the user
function viewableButtons(player, other) {
    able = [];
    if (player.health > 0) {
        able.push(
            "<button type='button' class='btn btn-moves' id='attack'>Attack</button>"
        );
        able.push(
            "<button type='button' class='btn btn-moves' id='rage'>Increase Rage</button> "
        );
    }
    if (player.health < 0) {
        able.push(
            // "<button type='button' class='btn btn-moves' id='attack'>Attack</button>"
            "<button id='restart' class='btn btn-moves' onclick='document.location.reload()'>Restart</button>"
        );
    }
    if (player.rage >= 10 && player.health > 0) {
        able.push(
            "<button type='button' class='btn btn-moves' id='heal'>Heal</button>"
        );
    }
    if (player.rage > 40 && player.health > 0) {
        able.push(
            "<button type='button' class='btn btn-moves' id='hadukening'>Haduken</button>"
        );
    }
    if (player.health <= 0) {
        able.push(
            "<button id='restart' class='btn btn-moves' onclick='document.location.reload()'>Restart</button>"
        );
    }
    return able.join('');
}

// Apply the function which lets the users see which
// button is usable
function buttonView() {
    return [
        '<div class="damage">',
        STATE.points,
        '</div>',
        '<div class="btns">',
        viewableButtons(combater()),
        '</div>'
        // "<div><button type='button' class='btn btn-moves' id='restart'>Restart</button></div>"
    ].join('');
}
// Displays the health, name, and rage
// of the Gladiators to the user
function gladiatorView(player) {
    return [
        '<div class="col-lg-6">',
        '<div class="info"><h2>Name: ',
        player.name,
        '</h2><br />',
        '<h2>Player Health: ',
        player.health,
        '</h2><br />',
        '<h2>Player Rage: ',
        player.rage,
        '</h2></div>',
        '<hr />',
        '</div>'
    ].join('');
}

// Draws everything being used in the html page
function draw() {
    appRoot.html(
        '<div class="row">' +
            gladiatorView(player1) +
            gladiatorView(player2) +
            '</div>' +
            buttonView()
    );
    attatchHandlers();
}
// *****************************************************************

//Main function which connects everything to the html page
function main() {
    draw();
}
$(main);
