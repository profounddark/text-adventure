// TODO: Figure out how to import/export JS, just to clean this shit up.2
class AdventureNode
{
    constructor(title, textArray, options)
    {
        this.nodeTitle = title;
        this.nodeText = [];
        this.nodeOptions = [];
        
        // TODO: implement this when I know how to determine if something is a string
        
        if (typeof textArray == "string")
        {
            let tempText = {text: textArray, requirement: null};
            this.nodeText.push(tempText);
        }
        else
        {
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
        }
        
        // allows for nodes to not have requirements
        for (let count = 0; count < options.length; count++)
        {
            let tempOption = {requirement: null, text: null, destination: null};

            tempOption.text = options[count].text;
            tempOption.destination = options[count].destination;

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


/******************** BEGIN the Adventure class ********************/
class Adventure 
{
    constructor(title, author, start, failure, nodes)
    {
        this.storyTitle = title;
        this.storyAuthor = author;
        // the "current state" is always the last member of the array.
        this.gameState = [start];
        this.failureNode = failure;
        
        // This is the node part.
        this.nodeList = {};
        let keyList = Object.keys(nodes);
        
        for(let count = 0; count < keyList.length; count++)
        {
            let tempKey = keyList[count];
            let tempNode = new AdventureNode(nodes[tempKey].pagetitle, nodes[tempKey].storyText, nodes[tempKey].choices);
            this.nodeList[tempKey] = tempNode;
        }
        
    }

    // sets the current gameState to the node specified. If it's not there, it throws it to the failure node.
    moveToNode(newNode)
    {
        if (this.nodeList.hasOwnProperty(newNode))
        {
            this.gameState.push(newNode);
        }
        else
        {
            this.gameState.push(this.failureNode);
            console.log("uh oh! Failure!");
        }
    }

    getStoryTitle()
    {
        return (this.storyTitle);
    }
    getStoryAuthor()
    {
        return (this.storyAuthor);
    }

    getCurrentNode()
    {
        let node = this.gameState[this.gameState.length - 1];
        return node;
    }
    
    getPageTitle()
    {
        return (this.nodeList[this.getCurrentNode()].getNodeTitle());
    }

    getPageText()
    {
        return (this.nodeList[this.getCurrentNode()].getStoryText(this.gameState));
    }
    
    getPageChoices()
    {
        return (this.nodeList[this.getCurrentNode()].getChoices(this.gameState));
    }
}

// BEGIN testing crap

let adventureData;

function loadStory(storyURL)
{
 
   fetch('./stories/' + storyURL + '.json')
    .then((resp) => resp.json())
    .then(function(data)
        {
            adventureData = new Adventure(data.title, data.author, data.startnode, data.failnode, data.nodes);
            title.innerHTML = adventureData.getStoryTitle();
            updatePage();
        });
}


let title = document.querySelector('#story-title');

let pageTitle = document.querySelector('#page-title');
let pageContent = document.querySelector('#page-text');
let choicesUL = document.querySelector('#choices');

function updatePage() 
{
    if (adventureData.getPageTitle())
    {
        pageTitle.style.display = "block";
        pageTitle.innerHTML = adventureData.getPageTitle();
    }
    else
    {
        pageTitle.style.display = "none";
    }
    pageContent.innerHTML = adventureData.getPageText();
    choicesUL.innerHTML = '';
    let choiceArray = adventureData.getPageChoices();
    for (let count = 0; count < choiceArray.length; count++)
    {
        let newLI = document.createElement('li');
        newLI.innerHTML = choiceArray[count].text;
        newLI.setAttribute('data-slug', choiceArray[count].destination);
        choicesUL.appendChild(newLI);
    }
    addEventListeners();
}

function addEventListeners(){
    let choices = document.querySelectorAll('#choices li');
    for (choice of choices){
        choice.addEventListener('click', function(e){
            console.log(`Moving to page: ${e.target.dataset.slug}`);
            adventureData.moveToNode(e.target.dataset.slug);
            updatePage();
        })
    }
}

loadStory("strangecave");