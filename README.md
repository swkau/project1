# project1 - Snakes & Ladders War Zone Edition

Hi everyone! This is a Snakes and Ladders game project based in a War Zone theme setting.

Storyline:
2 troops of different factions are trying to reach the main objective first.

Gameplay:
- This is a turn based game. Player 1 and player 2 take turns to play.
- Each player can either choose to roll the dice or call for artillery barrage
- roll the dice to move towards the main objective (100th tile)
- call for artillery barrage to attack ~34% of the tiles ahead of you (useful when other player is leading and about to win)
- player struck by artillery will drop back by 5-25 spaces!

Approach taken:
Use of HTML/CSS and background image element to do up the game board. Flex div are used to overlay over the game board.
Most of the coding used have been taught in the frst 2 weeks of WDI.

unsolved problems:
bug occurs when both players are on the same tile. When both player tokens are placed as background images,
it becomes challenging to manipulate individual player token without affect the other player token.
