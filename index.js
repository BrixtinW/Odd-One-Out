
// document.addEventListener("DOMContentLoaded", function() {
    let users = [
        { username: "user1", password: "password1" },
        { username: "user2", password: "password2" }
    ];

    console.log(users);

    localStorage.setItem("usersData", JSON.stringify(users));
// })

// function selectPlayer(myName, playerName){
//     voteMap.set(myName, playerName);
//     console.log(myName, "votes for", playerName)
// }
