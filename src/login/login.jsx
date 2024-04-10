import React from 'react';

export function Login() {


    function authenticate() {
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;

        const postData = {
          "username": `${usernameInput}`,
          "password": `${passwordInput}`
        };

        const userExists = fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => {
          if (!response.ok) {
            alert("Invalid username or password");
          }
          return response.json();
        })
        .then(data => {
          console.log('Player logged in called:', data);

          if (data) {
            var playerName = prompt("Please enter your player name:");
            sessionStorage.setItem("myName", playerName);


            const currentUrl = window.location.href;
            let newUrl = currentUrl.replace('/invitation.html', '/waitingRoom.html');
            window.location.href = newUrl;
            // const urlParams = new URLSearchParams(currentUrl);
            // const codeVariable = urlParams.get('code');

            // Check if the codeVariable exists
            // if (codeVariable) {
            //     // Construct the new URL with the code variable
            //     let newUrl = currentUrl.replace('/invitation.html', '/waitingRoom.html');
            //     newUrl += '?code=' + encodeURIComponent(codeVariable);

            //     // Navigate to the new URL
            //     window.location.href = newUrl;
            // } else {
            //     // Navigate to waitingRoom.html
            //     window.location.href = 'waitingRoom.html';
            // }


        } else {
            alert("Invalid username or password");
        }

        })
        .catch(error => {
          console.error('Error adding player:', error);
        });
    }

    function registerUser() {
        let usernameInput = document.getElementById("username").value;
        let passwordInput = document.getElementById("password").value;

        const postData = {
          "username": `${usernameInput}`,
          "password": `${passwordInput}`
        };

        fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => {
          if (!response.ok) {
            alert("User already exists")
            
          } else {
            var playerName = prompt("Please enter your player name:");
            sessionStorage.setItem("myName", playerName);




            const currentUrl = window.location.href;
            let newUrl = currentUrl.replace('/invitation.html', '/waitingRoom.html');
            window.location.href = newUrl;
            // const currentUrl = window.location.href;
            // const urlParams = new URLSearchParams(currentUrl);
            // const codeVariable = urlParams.get('code');

            // // Check if the codeVariable exists
            // if (codeVariable) {
            //     // Construct the new URL with the code variable
            //     let newUrl = currentUrl.replace('/invitation.html', '/waitingRoom.html');
            //     newUrl += '?code=' + encodeURIComponent(codeVariable);

            //     // Navigate to the new URL
            //     window.location.href = newUrl;
            // } else {
            //     // Navigate to waitingRoom.html
            //     window.location.href = 'waitingRoom.html';
            // }



          }
          return response.json();
        })
        .then(data => {
          console.log('Player registered successfully:', data);
        })
        }


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




    return (
        <main class="smallPage">
        <h1>Sign in</h1>
        {/* <!-- <p>Please enter the game room code and your name below</p> --> */}
        <p>Enter your information and sign in if you've played Odd One Out previouly, or register if its your first time.</p>
  
        <form>
          <a class="button" onclick="authenticate()">Sign In</a>   
          <a class="button" onclick="registerUser()">Register</a>   
          <input type="text" class="textbox" id="username" placeholder="Enter username" /> 
          <input type="text" class="textbox" id="password" placeholder="Enter password" /> 
        </form>
      </main>
    );
  }