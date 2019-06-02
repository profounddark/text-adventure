# Data Structures

## The Node
This represents nodes in the story (i.e., pages in the booklet). At a minimum, a node should have a name (reference), a default text block, and at least one destination. However, nodes can also have a title (displayed at the top of the page), some sort of media links, multiple blocks of text that display on different conditions, and a list of choices (some fo which display under different circumstances).
To begin with, the logic for whether text or options appear should be something on the order of "is a certain node in the game history" or "is a certain node NOT in the game history." This will probably get more complicated as we go along.

### Data Structure
* nodeTitle: the title that appears at the top of the page (can be *null*)
* nodeText: An array of text that appears for this node. The text block that will be displayed is parsed in array order.
  * requirement: the name of the node that must be present in the gameState (history of the current session). In the alternative, it can be prefaced with a ! to mean that the node must NOT be present. If not included or set to *null*, this text will always be displayed. **OPTIONAL**
  * text: the text to be displayed. It is appended to the previous blocks when assembling the text.
* nodeOptions: An array of the different options that can be selected from this node.
  * requirement: similar to how it works for nodeText. If not included or set to *null*, this option will always be displayed. **OPTIONAL**
  * text: the text to be displayed for this choice.
  * destination: the node that this option leads to.

### Methods:
* isRequired: it's supposed to be for internal use only, but this takes a requirement (string) and the gameState array and checks to see if this requirement is satisfactory based on gameState.
* getNodeTitle: returns the title of the Node.
* getStoryText: takes an ordered array of game state and returns a string of the compiled text. It should be as straightforward as going through the text element in order and appending any one that meets the requirements (based on game state).
* getChoices: takes an ordered array of game state and returns .. an array of objects, each one corresponding to a string (what to display for the choice) and a string (the destination node).

## The Adventure
Not sure how to implement this. It actually makes sense that most of the operation of the game would be internal, although I'm not 100% sure how to implement it. In theory, the methods would output text & options and, when told which choice is made, move to the next node.

So, when it's constructed, it reads in the JSON story data structure. It builds an array of nodes. It establishes gameState. It sets the currentNode to the startNode. And it has methods that return the current node data. It has a method to move to a node (which is normally governed by which node is selected next). The use can get the current Node's text and options list (with associated destination nodes). 

The idea is "instance a new Adventure, passing it the data for the adventure you want to run. Then, you can ask it for the "description text" and the "options list with destinations." You can then pass it a destination and it advances to that node, ready to provide new stuff. Tracking gameState and other weird shit is all internal; all the user of the class has to handle is "put this shit on screen and then tell the class where to go next."

### Data Structures
* storyTitle - Name of the story
* storyAuthor - author of the story
* startNode - the start node of the story (this may not be necessary if the Adventure is a specific instance of an adventure)
* failNode - the failure node (what it goes to if the node that it tries to seek out isn't there)
* an list of nodes, ordered by name of the node.
* currentNode - the current Node, initially set to startNode
* gameHistory - an array of all of the nodes that the player has visited.

### Methods
* getCurrentNode - returns the current node name (not super useful?)
* getCurrentNodeTitle
* getCurrentStoryText(gameState)
* getCurrentChoices(gameState) - returns the available choices with their respective links (i.e., calls getChoices from the node)
* moveToNode(nodeName) - when the interface will know what possible destination node are available and pass it when a button/option is selected. So, this just tells the game to move to the next node.
