# text-adventure
My second attempt at doing a text adventure style game in HTML5/CSS/JS. My first legitimate expedition into making a text adventure game can be found [here](https://github.com/profounddark/wats3020-text-adventure). That version was made as part of a class assignment. This new version will start from the ground up, building new data structures to support a larger variety of text adventure style games.

# Basic Format
The intent is to have a Single Page App (SPA) that allows the player to go through a variety of different works of Interactive Fiction. The basic format will be built around a multiple-choice interaction; each "node" of the story will present the player with different choices, with different choices going to different nodes in the story. This is intended to be comparable to the  [Choose-Your-Own-Adventure](https://www.cyoa.com/) stories currently published by ChooseCo, LLC.
Once the basic format is created, additional features will be added to support more expansive stories.

# Current Status
1. Basic Functionality.
2. Text and options change based on nodes previously visited.
3. Allow the user to select different stories at start.

# Known Issues
1. The GameState array never resets. If the story sets the player back to the start on reaching an endpoint, future playthroughs will get weird with old GameState data. It's probably worthwhile to have pages that RESET the GameState. That being said, there's probably also value in having a system that prevent the purging of *certain* GameState data. This would allow for Bandersnatch/Shadows of Destiny style weirdness.

# Future Features
1. Implementing custom style sheet control for different stories.
2. Adding graphics/images to specific nodes.
3. Adding sound/dialogue to specific nodes.