# CS_260

### Progress
- [x] Specification Deliverable
- [ ] HTML Deliverable
- [ ] CSS Deliverable
- [ ] JavaScript Deliverable
- [ ] Service Deliverable
- [ ] Database/Login Deliverable
- [ ] WebSocket Deliverable
- [ ] React Deliverable

## Specification Deliverable

### **Elevator Pitch** 
Have you ever played a social game like Mafia or One Night Werewolf and been frustrated about having to download an app or designate someone as a host before you can play it? Have you ever wanted to play remotely or ensure that no one changes their votes last minute? The Odd-One-Out website provides a simple and easy-to-use interface that the whole family can enjoy. With a brand new perspective on traditional social games, players have to figure out what team they are on in the game based on other players' responses. Unlike other social games, Odd-One-Out will keep everyone guessing until the very end!

### **Game Rules**
The game begins when everyone receives the same "secret word" except the Odd-One-Out who receives a similar but slightly different word. Starting with a random player determined by the application, each player takes turns clockwise, describing their "secret word" with another word while trying to avoid giving away their identity as the potential Odd-One-Out. The other players must use their detective skills to figure out who has a different word and vote on who they think the Odd-One-Out is. If they vote the Odd-One-Out, the Odd-One-Out has one chance to guess what everyone else's word is. If the Odd-One-Out guesses the word correctly or if they are never voted out, they win. If not, everyone else wins. 

### **Design**
There are four main pages. The first displays the login where you enter your username.

  ![Instructions page for the web app](Heading.jpg)
  
  The second is the waiting room that the host creates and where players wait to start.
  
  ![Waiting room for the web app](2.jpg)
  
  The third is the page with the instructions that will detail how to play the game. this page can be checked in the middle of the game for reference.
  
  ![Instructions page for the web app](1.jpg)
  
  The last page is the game page that displays the Secret Word and the voting feature. 
  
  ![Main game page for the web app](3.jpg)

### **Key Features**
The project will showcase the following features
- Ability to host and join game groups
- Outline of game instructions
- Distribution of "secret words"
- Moderate player guesses and reveal player teams

### **Technologies**
I will implement the following technologies:
- **HTML** - Three HTML pages for hosting a game, joining a game, and voting on the Odd-One-Out.
- **CSS** - Intuitive game display that fits well on mobile devices, featuring a game instructions tab, voting buttons, and a "secret word card". 
- **JavaScript** - Manages players' votes and creates game rooms.
- **Service** - Backend structure that helps in handling "secret word" choices, voting status, voting verdict, player status, and authentification.
- **Database** - Stores and retrieves "secret word" pairs and players' scores in a database.
- **WebSocket** - communicates players' votes and the voting verdict. 
- **React** - Utilizes the React framework for effective design and a professional display.

<!-- ## HTML Deliverable

## CSS Deliverable

## JavaScript Deliverable

## Service Deliverable

## Database Deliverable

## WebSocket Deliverable

## React Deliverable --!>


<!-- 
The game is called odd one out or something
everyone gets a word and one person gets a slightly different word (the odd one out). starting with one random player, everyone says a word that indirectly points to their shared word. after everyone says one word to show they have the same word, they guess on one person to eliminate who they think is the odd one out. if they guess correctly, the odd one out has one chance to guess the correct word. If they guess correctly, they win. if they guess incorrectly everyone else wins. if they guess someone who isnt the odd one out, then that last person is eliminated from the game. the odd one out does not know that they are the odd one out. 

--!>
