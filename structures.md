# Data Structures

## Nodes
This represents nodes in the story (i.e., pages in the booklet). At a minimum, a node should have a name (reference), a default text block, and at least one destination. However, nodes can also have a title (displayed at the top of the page), some sort of media links, multiple blocks of text that display on different conditions, and a list of choices (some fo which display under different circumstances).
To begin with, the logic for whether text or options appear should be something on the order of "is a certain node in the game history" or "is a certain node NOT in the game history." This will probably get more complicated as we go along.

### Data Structure
* nodeTitle: the title that appears at the top of the page (can be *null*)
* nodeText: An array of text that appears for this node. The text block that will be displayed is parsed in array order.
  * requirement: the name of the node that must be present in the gameState (history of the current session). In the alternative, it can be prefaced with a ! to mean that the node must NOT be present. In the alternative, it can be *null*, which means the text will always be displayed.
  * text: the text to be displayed. It is appended to the previous blocks when assembling the text.
* nodeOptions: An array of the different options that can be selected from this node.
  * requirement: similar to how it works for nodeText.
  * text: the text to be displayed for this choice.
  * destination: the node that this option leads to.

### Methods:
* isRequired: it's supposed to be for internal use only, but this takes a requirement (string) and the gameState array and checks to see if this requirement is satisfactory based on gameState.
* getStoryText: takes an ordered array of game state and returns a string of the compiled text. It should be as straightforward as going through the text element in order and appending any one that meets the requirements (based on game state).
* getChoices: takes an ordered array of game state and returns .. an array of objects, each one corresponding to a string (what to display for the choice) and a string (the destination node).