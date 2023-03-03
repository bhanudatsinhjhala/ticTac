/*
 * Create A Tic Tac Toe(X and O) Game 
 * Get Input from user from console for 2 playsr 
 * Simulate a tic tac toe game between them 
 * Create ticTacArray of 3X3 to store values of the game    
 * Rules:   
 * Player 1 Will Always start with X. Ask the user to enter the coordinate to put x in. For example top-left should be 00 top-middle should be 01 
 * After one player enters the value display the entire grid. 
 * Next player 2 will play. Follow same procedure that you have followed for player 1 but he/she will be adding O instead of x 
 * Follow normal rules of X and O i.e if any players makes consecutive X's or O's in row or column they win 
 * Display the name of the player that won 
 *
 */

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let ticTacArray = [
    ['-', '-', '-', ],
    ['-', '-', '-', ],
    ['-', '-', '-', ],
];
let players = [{
        name: 'player1',
        value: 'x',
        wins: 0
    },
    {
        name: 'player2',
        value: 'o',
        wins: 0
    }
];
console.log("\n Welcome to Tic-Tac-Toe game!!!!!!!")
rl.question(`\n ------ Now the game starts --------`, function () {
    createPlayer(1);
})

function createPlayer(playerNo) {
    rl.question(`\n Enter the name of player ${playerNo} \n `, function (name) {
        if (name) {
            addPlayerName(name, playerNo);
            return;
        } else {
            console.log("\n you can not leave player name empty");
            createPlayer(playerNo);
        }
    })
}

function addPlayerName(name, index) {
    if (name !== players[0].name) {
        players[index - 1].name = name;
        console.log('\n player name added sucessfully \n');
        if (index === 1) {
            createPlayer(2);
        }
        if (index === 2) {
            askToPlay(players[0]);
        }
    } else {
        console.log("\n you can not leave player name empty or duplicate name");
        createPlayer(index);
    }
}

function askToPlay(playerObj) {
    rl.question(`\n [${playerObj.name}] place your ${playerObj.value} : \n`, function (position) {
        if (position) {
            if (position.length === 2) {
                placeDice(playerObj.name, playerObj.value, position.split('')[0], position.split('')[1]);
            } else {
                console.log('\n please enter the position of two digit and numbers between 0-2 inclusive');
                askToPlay(playerObj);
            }
        } else {
            console.log("\n You can not left the position empty \n");
            askToPlay(playerObj);
        }
    });
}

function placeDice(player, dice, index1 = parseInt(index1), index2 = parseInt(index2)) {
    // console.log(index1, index2);
    if (0 <= index1 && index1 <= 2 && 0 <= index2 && index2 <= 2) {
        // console.log("\n in player dice", ticTacArray[index1][index2]);
        if (ticTacArray[index1][index2] && ticTacArray[index1][index2] === '-') {
            ticTacArray[index1][index2] = dice;
            console.log(ticTacArray[0]);
            console.log(ticTacArray[1]);
            console.log(ticTacArray[2]);
            if (checkValues(player, index1, index2) !== 'won' && !checkDraw()) {
                if (player === players[0].name) {
                    askToPlay(players[1]);
                } else {
                    askToPlay(players[0]);
                }
            } else {
                reStartGame();
            }
        } else {
            console.log("\n this position is already filled \n");
            askToPlay(players.find((value) => value.name === player));
        }
    } else {
        console.log("\n you have entered the wrong position \n");
        askToPlay(players.find((value) => value.name === player));
    }
}

function checkValues(player, index1, index2) {
    let position = index1.concat(index2);
    let count = 0;
    let value;
    if (player === players[0].name) {
        value = 'x'
    } else {
        value = 'o'
    }
    for (let i = 0; i < 3; i++) {
        if (ticTacArray[i][index2] === value) {
            count++;
        }
    }
    console.log("column check", count);
    if (count === 3) {
        console.log(`\n ${player} won`);
        players.find((value) => {
            if (value.name === player) {
                value.wins = parseInt(value.wins) + 1;
                // console.log("player", value);
            }
        })
        return 'won';
    } else {
        count = 0;
        ticTacArray[index1].filter((item) => {
            if (item === value) {
                count++;
            }
        });
        console.log("\n row check", count);
        if (count === 3) {
            console.log(`\n ${player} won`);
            players.find((value) => {
                if (value.name === player) {
                    value.wins = parseInt(value.wins) + 1;
                    // console.log("player", value);
                }
            })
            return 'won';
        }
    }
    if (position === '00' || position === '11' || position === '22' || position === '02' || position === '20') {
        count = 0;
        for (let i = 0; i < 3; i++) {
            if (ticTacArray[i][i] === value) {
                count++;
            }
        }
        console.log("\n start cross check", count);
        if (count === 3) {
            console.log(`\n ${player} won`);
            players.find((value) => {
                if (value.name === player) {
                    value.wins = parseInt(value.wins) + 1;
                    console.log("player", value);
                }
            })
            return 'won';
        } else {
            count = 0;
            for (let i = 0; i < 3; i++) {
                if (ticTacArray[i][2 - i] === value) {
                    count++;
                }
            }
            console.log("\n end cross check", count);
            if (count === 3) {
                console.log(`\n ${player} won`);
                players.find((value) => {
                    if (value.name === player) {
                        value.wins = parseInt(value.wins) + 1;
                        console.log("player", value);
                    }
                })
                return 'won';
            }
        }
    }
}

function displayWinners() {
    players.forEach((player) => {
        console.log(`\n ${player.name} has won ${player.wins} times`);
    });
}

function reStartGame() {
    rl.question("\n Do you want to replay the game? (y/n)", function (answer) {
        if (answer === 'y' || answer === 'yes') {
            displayWinners();
            ticTacArray = [
                ['-', '-', '-', ],
                ['-', '-', '-', ],
                ['-', '-', '-', ],
            ];
            askToPlay(players[0]);
        } else {
            displayWinners();
        }
    })
}

function checkDraw() {
    let drawArray = ticTacArray.map((array) => {
        return array.some((item) => item === '-');
    });

    if (drawArray.includes(true)) {
        return false;
    } else {
        return true;
    };
}