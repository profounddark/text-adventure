
// BEGIN the AdventureNode class

class AdventureNode
{
    constructor(title, textArray, options)
    {
        this.nodeTitle = title;
        this.nodeText = [];
        this.nodeOptions = [];
        
        // TODO: implement this when I know how to determine if something is a string
        /*
        if (textArray is a string)
        {
            let tempText = {text: textArray, requirement: null};
            this.nodeText.push(tempText);
        }
        else
        {
            DO THE LOOP
        }
        */

        for (let count = 0; count < textArray.length; count++)
        {
            
            let tempText = {text: null, requirement: null};

            tempText.text = textArray[count].text;
            if (textArray[count].requirement)
            {
                tempText.requirement = textArray[count].requirement;
            }
            this.nodeText.push(tempText);
        }

        // allows for nodes to not have requirements
        for (let count = 0; count < options.length; count++)
        {
            let tempOption = {requirement: null, text: null, destination: null};

            tempOption.text = options[count].text;
            tempOption.destination = options[count].text;

            if (options[count].requirement)
            {
                tempOption.requirement = options[count].requirement;
            }
            this.nodeOptions.push(tempOption);
        }
    }

    isRequired(requirement, gameState)
    {
        // JavaScript short-circuits, so this should only evaluate as far as it has to go
        let outputBool = (
            // requirement is NULL
            (!requirement) ||
            // requirement is in gameState
            (gameState.includes(requirement)) ||
            // requirement starts with '!' and is not in gameState
            ((requirement.substring(0,1) == '!') && !(gameState.includes(requirement.substring(1))))
        )
        return outputBool;
    }

    // Just returns the title
    getNodeTitle()
    {
        return(this.nodeTitle);
    }

    //returns a text string
    getStoryText(gameState)
    {
        let outputString = "";
        for (let count = 0; count < this.nodeText.length; count++)
        {
            if  (this.isRequired(this.nodeText[count].requirement, gameState))
            {
                outputString = outputString + " " + this.nodeText[count].text;
            }
        }
        return outputString;
    }

    // returns an array of {text, link}
    getChoices(gameState)
    {
        let outputArray = [];
        for (let count = 0; count < this.nodeOptions.length; count++)
        {
            if  (this.isRequired(this.nodeOptions[count].requirement, gameState))
            {
                let newChoice = {
                    "text" : this.nodeOptions[count].text,
                    "destination" : this.nodeOptions[count].destination
                };
                outputArray.push(newChoice);
            }
        }
        return(outputArray);
    }

}

// END the AdventureNode class


// BEGIN testing crap

let textArray = [
    {
        text: "You are in a small holding cell, a 3 meter by 3 meter square space with a bench attached to the wall on one side and the cell door on the other."
    },
    {
        text: "The cell door is closed.",
        requirement: "!openthedoor"
    },
    {
        text: "The cell door is open.",
        requirement: "openthedoor"
    }
]

let testString = "You are in a small holding cell, a 3 meter by 3 meter square space with a bench attached to the wall on one side and the cell door on the other.";

let options = [
    {
        text: "Look around the cell.",
        destination: "lookaroundcell"
    },
    {
        requirement: "openthedoor",
        text: "Exit through the door.",
        destination: "exitthecell"
    }
];

let testNode = new AdventureNode(null, textArray, options);
console.log(testNode);
console.log(testNode.getStoryText(["openthedoor"]));
console.log(testNode.getStoryText([]));
console.log(testNode.getChoices([]));