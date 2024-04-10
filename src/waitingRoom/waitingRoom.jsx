import React from 'react';

export function WaitingRoom() {
    

    async function fetchQRCode(url) {
        try {
          let newUrl = url.replace('/waitingRoom.html', '/invitation.html');
            const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=%3C%22${newUrl}%22%3E`);
            if (!response.ok) {
                throw new Error('Failed to fetch QR code');
            }
            const qrCodeImage = await response.blob();
            return URL.createObjectURL(qrCodeImage);
        } catch (error) {
            console.error('Error fetching QR code:', error);
            return null;
        }
    }

    async function displayQRCode(currentUrl) {
        const qrCodeUrl = await fetchQRCode(currentUrl);
        if (qrCodeUrl) {
            document.getElementById("qrcode").innerHTML = `<img src="${qrCodeUrl}" alt="QR Code" />`;
        } else {
            document.getElementById("qrcode").innerHTML = 'Failed to fetch QR code';
        }
    }

    let socket;
    let startGame = false;
    // document.addEventListener("DOMContentLoaded", async function() {
      
      // const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      // const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      

  const urlQueries = window.location.search;

// Create a URLSearchParams object from the URL query string
const urlParams = new URLSearchParams(urlQueries);

// Get the value of the 'code' parameter
const code = urlParams.get('code');
console.log(code);

if (code) {
    // The 'code' parameter was found in the URL
    console.log('Value of code parameter:', code);
    document.getElementById("gameRoomCode").textContent = code;
    sessionStorage.setItem("code", code);
    
    const playerName = sessionStorage.getItem('myName');


    addName(playerName, code).then(() => {
      socket = configureWebSocket(socket, code, playerName)
    });

    window.addEventListener('beforeunload', function(event) {
          alert("before unload called!");
          const message = { type: "leaveRoom", code: code, name: playerName, startGame: startGame}
          socket.send(JSON.stringify(message));
          alert("this should ahve a stop");
    });
    // configureWebSocket(socket, codeVariable, playerName);
    displayQRCode(window.location.href);

} else {
    // The 'code' parameter was not found in the URL
    console.log('The code parameter was not found in the URL');



    displayGameRoomCode().then(code => {
    
      sessionStorage.setItem("code", code);

      // Get the current URL
      let url = new URL(window.location.href);

      // Add a parameter to the URL
      url.searchParams.set('code', encodeURIComponent(code));

      // Replace the current URL with the modified URL
      window.history.replaceState({}, '', url);
    
      const playerName = sessionStorage.getItem('myName');
      addName(playerName, code).then(() => {
      socket = configureWebSocket(socket, code, playerName)
    });
      displayQRCode(window.location.href);

      window.addEventListener('beforeunload', function(event) {
        alert("before unload called!");
          const message = { type: "leaveRoom", code: code, name: playerName, startGame: startGame}
          socket.send(JSON.stringify(message));
          alert("this should ahve a stop");
    });

    }).catch(error => {
      console.error("An error occurred:", error);
    });
}

// window.addEventListener('beforeunload', function(event) {
//         alert("before unload called!");
//           const message = { type: "leaveRoom", code: code, name: playerName }
//           socket.send(JSON.stringify(message));
//           alert("this should ahve a stop");
//     });



// });

async function fetchGameRoomCode() {
  try {
    const response = await fetch('/api/gameroom');
    if (!response.ok) {
      throw new Error('Failed to fetch game room code');
    }
    const gameRoomCode = await response.json();
    return gameRoomCode;
  } catch (error) {
    console.error('Error fetching game room code:', error);
    return null;
  }
}

async function displayGameRoomCode() {
  const gameRoomCode = await fetchGameRoomCode();
  if (gameRoomCode) {
    document.getElementById("gameRoomCode").textContent = gameRoomCode;
    return gameRoomCode;
  } else {
    document.getElementById("gameRoomCode").textContent = 'Failed to fetch game room code';
  }
}

async function addName(playerName, gameRoomCode) {

      const postData = {
        name: playerName,
        code: gameRoomCode
      };

      fetch('/api/addPlayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Player added successfully:', data);
      })
      .catch(error => {
        console.error('Error adding player:', error);
      });

    }


  function loadGameRoom() {
    startGame = true;
    const postData = { type: "loadRoom", code: `${sessionStorage.getItem('code')}`};
    socket.send(JSON.stringify(postData));

// console.log("BUTTON PRESSED BUT NOTHING HAPPENED?????")


// const postData = {
//               "code": `${sessionStorage.getItem('code')}`,
//             };

//             fetch('/api/generateOddOneOut', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//               body: JSON.stringify(postData)
//             })
//             .then(response => {
//               if (!response.ok) {
//                 throw new Error('Network response was not ok');
//               }
//               return response.json();
//             })
//             .catch(error => {
//               console.error('Error adding player:', error);
//             });



//             const currentUrl = window.location.href;
//                 let newUrl = currentUrl.replace('/waitingRoom.html', '/gameRoom.html');
//                 window.location.href = newUrl;
};


function playGame() {
        // Make a GET request to the /user endpoint
        fetch('/user', {
            method: 'GET',
            credentials: 'same-origin' // Include cookies in the request
        })
        .then(response => {
            if (response.ok) {
                var playerName = prompt("Please enter your player name:");
                sessionStorage.setItem("myName", playerName);
                window.location.href = 'waitingRoom.html';
            } else {
                // If user is not logged in, navigate to invitation.html
                window.location.href = 'invitation.html';
            }
        })
        .catch(error => {
            console.error('Error checking user login status:', error);
        });
    }

    function logout() {
    fetch('/logout', {
        method: 'GET',
        credentials: 'same-origin' // Include cookies in the request
    })
    .then(response => {
        if (response.ok) {
            // Redirect user to the homepage or login page upon successful logout
            window.location.href = 'index.html';
        } else {
            // Handle logout error, e.g., display error message to user
            console.error('Logout failed:', response.statusText);
        }
    })
    .catch(error => {
        console.error('Error logging out:', error);
    });
}

    // const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    // const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

function configureWebSocket(socket, code, name) {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    socket.addEventListener('open', () => {
      console.log("connected sucessfully to WebSocket!");
      socket.send(JSON.stringify({ type: "joinRoom", code: code, name: name }));
});
    // socket.onopen = (event) => {
    // };
    
    // socket.onclose = (event) => {
    //   socket.send(JSON.stringify({ type: "leaveRoom", code: code, name: name, startGame: true }));
    // };

    socket.onmessage = async (event) => {
      console.log("hey THIS WAS CALLED YOU DIDN't kmnpw what would daca;lkj;alsdf;j");
      console.log(event)
      console.log(event.data)
      const msg = JSON.parse(await event.data);
      if (msg.type === "updatePlayers") {
      var carousel = document.getElementById("carousel");

      // Remove all existing child elements of the carousel
      while (carousel.firstChild) {
          carousel.removeChild(carousel.firstChild);
      }

      // Iterate through each player name in the players list
      for (let playerName of msg.players) {
          // Create a new div element for the player
          var newItem = document.createElement("div");
          newItem.classList.add("item");
          newItem.textContent = playerName;
          carousel.appendChild(newItem);
      }

      } else if (msg.type === "Game Started") {
        
        startGame = true;
        const currentUrl = window.location.href;
        let newUrl = currentUrl.replace('/waitingRoom.html', '/gameRoom.html');
        window.location.href = newUrl;

      } 
    };
    return socket;
  }





    return (
        <main>
        <div class="waiting">
          <h1>Waiting For Players...</h1>
          <h3 id="gameRoomCode"></h3>
          <div id="qrcode"></div>
        </div>
    
    <div id="carousel">
      {/* <!-- DIV ELEMENTS INSERTED HERE --> */}
    </div>
      
  
        <form>
          <a class="button" id="startGame" onclick="loadGameRoom()">Start Game</a>
    
        </form>
  
        <h2>Instructions</h2>
        <li class="instructions">
          The game begins with a randomly chosen player and continues clockwise. Each player takes a turn to describe their secret word with a one or two-word clue, such as “Crunchy” for “Apple.”
        </li>
        <li>
          After all players have given their clues, engage in a brief discussion period. Here, players exchange suspicions and opinions about who they think is the Odd One Out based on the clues given.
        </li>
        <li class="instructions">
          Next, each player casts a vote on their suspect for the Odd One Out by selecting that player's icon in the voting section. After the voting has finished, the player with the most votes is accused of being the Odd One Out.
        </li>
        <li class="instructions">
          If the majority correctly identifies the Odd One Out, the accused has one chance to guess the common secret word of the other players. If the Odd One Out guesses correctly, they win; if not, the group wins.
        </li>
        <li class="instructions">
          However, if the majority is incorrect, often likely in the first round, the wrongly accused player is eliminated from the game. The remaining players continue, giving new descriptions for the same word in subsequent rounds and voting again.
        </li>
        <li class="instructions">
          In each new round, players provide fresh clues for the same secret word.
        </li>
        <li class="instructions">
          This continues with players giving new, one or two-word descriptions. The rounds of clue-giving and voting repeat, with players being eliminated for incorrect accusations of being the Odd One Out.
        </li>
        <li class="instructions">
          The game continues in this manner until the Odd One Out is either caught or successfully guesses the common secret word when caught.
        </li>
        <p>Note: The aim for the Odd One Out is to remain undetected until they are the last person remaining. However, if the Odd One Out is sure they know the common word, they could opt to get caught and then correctly guess the common word, thereby winning the game.</p>
      </main>
    );
  }