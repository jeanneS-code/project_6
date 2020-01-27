When the board first loads the positions for obstacles, weapons and players are randomly generated and drawn on the board. 
The 'reset' button is activated at this point and onClick will regenerate all object positions on the board and they will be redrawn. 
This can be useful if obstacles are generated in such a way that a weapon is inaccessible to either of the 2 players due to the random placing of obstacles. 
I'm using an implementation the A* Algorithm(Dijkstra's algorithm) to place the players on the board. 
Essentially this means finding the optimal path from a position of 10 possible positions(player 1) to a postion of 10 possible positions(player 2) at the opposite end of the board. 
The start button is activated on page load & onClick this enables players to move around the board. 
The start button then subsequently becomes deavtivated. 
Using the arrow keys player 1 has default control to move 1 - 3 cells(left, right, up & down) 
Once all 3 moves are used control passes to player 2. 
The endTurn button will also pass control to the other player when clicked(if a player does not want to use all 3 moves) 
I added a pause between passing control: on the 4th attempt to move a player that player is first redrawn in their position before control is passed completely to the other player. 
When players become adjacent the attack and defend buttons become activated. 
The functionality still needs to be added for these fight maneuvers
Work to continue.
