const { group } = require('console');
const { randomUUID } = require('crypto');
const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);



apiRouter.get('/gameroom', (req, res) => {
    gameRoomCode = createGameRoom();
    res.send(gameRoomCode);
  });

  apiRouter.post('/addPlayer', (req, res) => {
    addPlayer(req.body);
  });

  apiRouter.post('/players', (req, res) => {
    res.send(games.get(req.body.code).players);
  });

  apiRouter.post('/login', (_req, res) => {
    var userExists = getUser(_req.body)
    res.send(userExists);
  });

  apiRouter.get('/votes', (_req, res) => {
    res.send(votes);
  });

  apiRouter.post('/secretWord', (req, res) => {
    secretWord = getSecretWord(req.body);
    console.log(secretWord);
    res.send(secretWord);
  });

apiRouter.post('/vote', (req, res) => {
  const winners = updateVotes(req.body);
  console.log(winners);
  console.log(games.get(req.body.code).gameOver);
  jsonObj = JSON.stringify({"winners": winners, "gameOver": games.get(req.body.code).gameOver})
  console.log(jsonObj)
  res.send(jsonObj)
});

apiRouter.post('/generateOddOneOut', (req, res) => {
    generateOddOneOut(req.body);
  });

  apiRouter.post('/register', (req, res) => {
    createUser(req.body);
  });


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

class GameRoom {

    constructor(code, groupWord, oddWord){
        this.players = []
        this.oddOneOutIndex = 0;
        this.groupWord = groupWord;
        this.oddWord = oddWord;
        this.code = code;
        this.votes = new Map();
        this.readyToStartGame = false;
        this.gameOver = false;
    }

    toString(){
        if(this.readyToStartGame){
            return `\tPlayers = ${this.players}\n\toddOneOut = ${players[this.oddOneOutIndex]}\n\tGame Room Code = ${this.code}\n\tVotes = ${this.votes}\n\tgroupWord = ${this.groupWord}\n\toddWord = ${this.oddWord}\n\tready to start: ${this.readyToStartGame}`;
        } else {
            return `\tPlayers = ${this.players}\n\toddOneOut = Not Yet Determined!\n\tGame Room Code = ${this.code}\n\tVotes = ${this.votes}\n\tgroupWord = ${this.groupWord}\n\toddWord = ${this.oddWord}\n\tready to start: ${this.readyToStartGame}`;
        }
    }

    generateOddOneOutIndex(){
        const randomNum = Math.floor(Math.random() * this.players.length); 
        this.oddOneOutIndex = randomNum;
    }

}

    const users = new Map([
        ['user1', 'pass1'],
        ['user2', 'pass2']
    ]);
    const games = new Map();

let secretWordPairs = [
    ["Squid", "Octopus"],
    ["Queen", "Princess"],
    ["Trophy", "Medal"]]


function getSecretWord(reqBody){
    console.log(reqBody)
    const code = reqBody.code;
    const name = reqBody.name;
    console.log(games.get(code).oddOneOutIndex);
        if( games.get(code).readyToStartGame == true){
            console.log(games.get(code).players[games.get(code).oddOneOutIndex])
            if (games.get(code).players[games.get(code).oddOneOutIndex] == name){
                console.log(games.get(code).oddWord)
                return games.get(code).oddWord;
            } else {
                console.log(games.get(code).groupWord)
                return games.get(code).groupWord;
            }
        }
}

function generateOddOneOut(reqBody){
    console.log(reqBody)
    const code = reqBody.code;
    games.get(code).generateOddOneOutIndex();
    games.get(code).readyToStartGame = true;
}

function createGameRoom() {
    const code = generateGameRoomCode()
    const[groupWord, oddWord] = organizeSecretWords();
    console.log(groupWord);
    console.log(oddWord)
    console.log(code)
    games.set(code, new GameRoom(code, groupWord, oddWord));
    console.log(games.get(code).toString());
    return JSON.stringify(code);
}

function generateGameRoomCode() {
    const uuid = randomUUID();
    const code = uuid.replace(/-/g, '').substring(0, 6);
    return code;
  }

 function addPlayer(reqBody, votes){
    console.log(reqBody)
    const code = reqBody.code;
    const name = reqBody.name;

    games.get(code).players.push(name);
    console.log(games.get(code).toString());
 }

 function getUser(reqBody) {
    console.log(reqBody)
    const username = reqBody.username;
    const password = reqBody.password;
    return users.get(username) == password;
 }

 function createUser(reqBody) {
     console.log(reqBody)
    const username = reqBody.username;
    const password = reqBody.password;
    users.set(username, password);
    console.log(users)
 }


 function organizeSecretWords(){
    const randomNum = Math.floor(Math.random() * secretWordPairs.length); 
    return [secretWordPairs[randomNum][0], secretWordPairs[randomNum][1]];
 }

 function updateVotes(requestBody){
    let winners = null;
    const voter = requestBody.voter;
    const vote = requestBody.vote;
    const code = requestBody.code;
    games.get(code).votes.set(voter, vote);
    console.log(games.get(code).votes);
    if (games.get(code).players.length >= Map.size){
        winners = readTheVotes(code);
        for (const winner of winners) {
            if (games.get(code).players[games.get(code).oddOneOutIndex] == winner) { 
                games.get(code).gameOver = true; 
            } else {
            const oddOneOut = games.get(code).players[games.get(code).oddOneOutIndex]
            games.get(code).players = games.get(code).filter(value => value !== winner);
            games.get(code).vote.clear();
            for (let i = 0; i < games.get(code).players.size; i++){
                if (games.get(code).players[i] == oddOneOut){
                    games.get(code).oddOneOutIndex = i;
                }
            }
            }
        }
    }
    return winners;
}


function readTheVotes(code){
    // Create a map to tally up the votes
    const voteCounts = new Map();
    
    // Iterate over the entries of the votes map
    for (const [player, votedFor] of games.get(code).votes) {
        // Iterate over the voted players
        for (const votedPlayer of votedFor.values()) {
            // Increment the vote count for the voted player
            const count = voteCounts.get(votedPlayer);
            voteCounts.set(votedPlayer, count + 1);
        }
    }
    
    // Find the player(s) with the highest vote count
    const maxVotes = Math.max(...voteCounts.values());
    const winners = [];
    for (const [player, votes] of voteCounts) {
        if (votes === maxVotes) {
            winners.push(player);
        }
    }
    
    // Return the winner(s)
    return winners.length === 1 ? winners[0] : winners;
}