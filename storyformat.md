# The Story File

The story file is a **JSON** file that stores the story data. It includes some basic information about the story and the collection of all of the nodes of the story. The nodes are essentially like pages of a novel. Each node contains the content of the page along with a list of selectable options. Each option will be a connection to another node.

## Story File - JSON Structure

* title: The name of the story. **REQUIRED**
* author: The author of the story.
* startnode: The name of the node at which this story should normally begin. **REQUIRED**
* failurenode: The name of the node that the story will direct to if it tries to go to a node that does not exist. This is not required (but recommended).
* nodes: A list of all of the nodes in the story. **REQUIRED**
  * pagetitle: A title for the page. This could also be considered a "location" and will be displayed above the story text. This is not required.
  * storytext: The actual text of the page. This is enclosed in \<p> tags. Either \<br>\<br> or \</p>\<p> tags can be used for multiple paragraphs.
  * choices: An array of choices. There can be more than one choice. **REQUIRED**
    * requirement: default is null. **OPTIONAL**
    * text: The text listed on the button.
    * link: The name of the node that this choice connects to.

## Story File - Example
The following is an example of the Story File format excerpted from The Strange Cave:
```
{
    "title": "The Strange Cave",
    "author": "A. J. Asplund",
    "startnode": "cover",
    "failnode": "failure",
    "nodes":
    {
    "cover":
    {
        "pagetitle": null,
        "text": "Welcome to The Strange Cave, a work of Interactive Fiction. Throughout this adventure, you will make decisions about what your character does. Some decisions may lead to a conclusion while others may lead to further opportunities. Choose wisely!",
        "choices":
        [
            {
                "text": "Begin the story!",
                "link": "p1"
            }
        ]
    },

    "p1": 
    {
        "pagetitle": "Outside of the Cave",
        "text": "You and your friends are standing at the entrance of a sinister looking cave. Stalactites hang from the mouth of the cave almost like sharp fangs, ready to bite down on anything that may enter. \"Are you going to go in?\" one of your friends asks you.</p><p>You were all here because you agreed to be the brave one, going inside and finding out what was in there. However, you suddenly feel a bit scared. It's a lot darker and a lot scarier than you thought it was when you decided to go in there.</p><p>Do you want to go into the cave? Or do you think you should just give up and go home?",
        "choices":
        [
            {
                "text": "Go in the cave.",
                "link": "p5"
            },
            {
                "text": "Give up and go home.",
                "link": "p2"
            },
        ]
    },
        "failure" :
    {
        "text": "This doesn't actually exist. You must have gotten here by accident, because you really shouldn't be here. Maybe you need to start over?",
        "choices":
        [
            {
                "text": "Begin again?",
                "link": "p1"
            }
        ]
    }
    }
}
```
