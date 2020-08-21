/*
Name: COMP125-M2020-FInalTest
Author: Julian Miguel Alapan
Student#: 300836721
WebsiteName: COMP125 - M2020 - Final Test
Description: Dice Roller
*/
let Game = (function(){

    // variable declarations
    let canvas:HTMLCanvasElement = document.getElementsByTagName('canvas')[0];
    let stage:createjs.Stage;
    
    let assets: createjs.LoadQueue;

    let diceBackground: Core.GameObject;

    let leftDiceLabel: UIObjects.Label;
    let rightDiceLabel: UIObjects.Label;
    
    let rollButton: UIObjects.Button;
    let resetButton: UIObjects.Button;

    let leftDice: Core.GameObject;
    let rightDice: Core.GameObject;

    // Symbol Tallies
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;

    let assetManifest = 
    [
        {id:"1", src:"./Assets/images/1.png"},
        {id:"2", src:"./Assets/images/2.png"},
        {id:"3", src:"./Assets/images/3.png"},
        {id:"4", src:"./Assets/images/4.png"},
        {id:"5", src:"./Assets/images/5.png"},
        {id:"6", src:"./Assets/images/6.png"},
        {id:"backButton", src:"./Assets/images/startButton.png"},
        {id:"background", src:"./Assets/images/background.png"},
        {id:"blank", src:"./Assets/images/blank.png"},
        {id:"button", src:"./Assets/images/button.png"},
        {id:"nextButton", src:"./Assets/images/nextButton.png"},
        {id:"placeholder", src:"./Assets/images/placeholder.png"},
        {id:"resetButton", src:"./Assets/images/resetButton.png"},
        {id:"rollButton", src:"./Assets/images/rollButton.png"},
        {id:"startButton", src:"./Assets/images/startButton.png"},
        {id:"startOverButton", src:"./Assets/images/startOverButton.png"}
    ];

    function Preload():void
    {
        console.log(`%c Preload Function`, "color: grey; font-size: 14px; font-weight: bold;");
        assets = new createjs.LoadQueue(); // asset container 
        assets.installPlugin(createjs.Sound); // supports sound preloading
        assets.loadManifest(assetManifest);
        assets.on("complete", Start);
    }

    /**
     * This method initializes the CreateJS (EaselJS) Library
     * It sets the framerate to 60 FPS and sets up the main Game Loop (Update)
     */
    function Start():void
    {
        console.log(`%c Start Function`, "color: grey; font-size: 14px; font-weight: bold;");
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = Config.Game.FPS;
        createjs.Ticker.on('tick', Update);
        stage.enableMouseOver(20);
        
        Config.Game.ASSETS = assets; // make a reference to the assets in the global config

        Main();
    }

    /**
     * This function is triggered every frame (16ms)
     * The stage is then erased and redrawn 
     */
    function Update():void
    {
        stage.update();
    }

    /* Utility function to check if a value falls within a range of bounds */
    function checkRange(value:number, lowerBounds:number, upperBounds:number):number | boolean {
        if (value >= lowerBounds && value <= upperBounds)
        {
            return value;
        }
        else {
            return !value;
        }
    }

    /* When this function is called it determines the diceRoll results.*/
    function Dices():string[] {
        let diceRoll = [" ", " "];
        let outCome = [0, 0];

        for (let roll = 0; roll < 2; roll++) {
            outCome[roll] = Math.floor((Math.random() * 6) + 1);
            switch (outCome[roll]) {
                case checkRange(outCome[roll], 1, 1):
                    diceRoll[roll] = "1";
                    one++;
                    break;
                case checkRange(outCome[roll],2,2):
                    diceRoll[roll] = "2";
                    two++;
                    break;
                case checkRange(outCome[roll],3,3):
                    diceRoll[roll] = "3";
                    three++;
                    break;
                case checkRange(outCome[roll],4,4):
                    diceRoll[roll] = "4";
                    one++;
                    four;
                case checkRange(outCome[roll],5,5):
                    diceRoll[roll] = "5";
                    five++;
                    break;
                case checkRange(outCome[roll],6,6):
                    diceRoll[roll] = "6";
                    six++;
                    break;
            }
        }
        return diceRoll;
    }

    function buildInterface():void
    {
        // Background
        diceBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceBackground);

        // Labels
        leftDiceLabel = new UIObjects.Label(" ", "18px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(leftDiceLabel);

        rightDiceLabel = new UIObjects.Label(" ", "18px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(rightDiceLabel);
        
        // Buttons
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 150, true);
        stage.addChild(rollButton);

        resetButton = new UIObjects.Button("resetButton", Config.Game.CENTER_X + 200, Config.Game.CENTER_Y + 150, true);
        stage.addChild(resetButton);

        // Dice GameObjects
        leftDice = new Core.GameObject("1", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(leftDice);

        rightDice = new Core.GameObject("2", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(rightDice);
    }

    function interfaceLogic():void
    {
        rollButton.on("click", ()=>{
            console.log("roll button clicked");

            let dices = Dices();

            // Update leftDice image
            leftDice.image = assets.getResult(dices[0]) as HTMLImageElement;
            // Update leftDiceLabel text
            leftDiceLabel.setText(dices[0]);
            console.log("Left dice rolled: " + dices[0]);

            // Update leftDice image
            rightDice.image = assets.getResult(dices[1]) as HTMLImageElement;
            // Update leftDiceLabel text
            rightDiceLabel.setText(dices[1]);
            console.log("Right dice rolled: " + dices[1]);
        });

        resetButton.on("click", ()=>{
            console.log("reset button clicked");

            leftDice.image = assets.getResult("blank") as HTMLImageElement;
            leftDiceLabel.setText(" ");

            rightDice.image = assets.getResult("blank") as HTMLImageElement;
            rightDiceLabel.setText(" ");

        })
    }

    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main():void
    {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");

        buildInterface();

        interfaceLogic();
    }

    window.addEventListener('load', Preload);


})();