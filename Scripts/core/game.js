"use strict";
/*
Name: COMP125-M2020-FInalTest
Author: Julian Miguel Alapan
Student#: 300836721
WebsiteName:
Description: Dice
*/
let Game = (function () {
    // variable declarations
    let canvas = document.getElementsByTagName('canvas')[0];
    let stage;
    let assets;
    let diceBackground;
    let exampleLabel;
    let leftDiceLabel;
    let rightDiceLabel;
    let rollButton;
    let leftDice;
    let rightDice;
    // Symbol Tallies
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let assetManifest = [
        { id: "1", src: "./Assets/images/1.png" },
        { id: "2", src: "./Assets/images/2.png" },
        { id: "3", src: "./Assets/images/3.png" },
        { id: "4", src: "./Assets/images/4.png" },
        { id: "5", src: "./Assets/images/5.png" },
        { id: "6", src: "./Assets/images/6.png" },
        { id: "backButton", src: "./Assets/images/startButton.png" },
        { id: "background", src: "./Assets/images/background.png" },
        { id: "blank", src: "./Assets/images/blank.png" },
        { id: "button", src: "./Assets/images/button.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "placeholder", src: "./Assets/images/placeholder.png" },
        { id: "resetButton", src: "./Assets/images/resetButton.png" },
        { id: "rollButton", src: "./Assets/images/rollButton.png" },
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "startOverButton", src: "./Assets/images/startOverButton.png" }
    ];
    function Preload() {
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
    function Start() {
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
    function Update() {
        stage.update();
    }
    /* When this function is called it determines the diceRoll results.*/
    function Dices() {
        let diceRoll = [" ", " "];
        let outCome = [0, 0];
        for (let roll = 0; roll < 2; roll++) {
            outCome[roll] = Util.Mathf.RandomRange(1, 6);
            switch (outCome[roll]) {
                case Util.Mathf.Clamp(outCome[roll], 1, 1):
                    diceRoll[roll] = "one";
                    one++;
                    break;
                case Util.Mathf.Clamp(outCome[roll], 2, 2):
                    diceRoll[roll] = "two";
                    two++;
                    break;
                case Util.Mathf.Clamp(outCome[roll], 3, 3):
                    diceRoll[roll] = "three";
                    three++;
                    break;
                case Util.Mathf.Clamp(outCome[roll], 4, 4):
                    diceRoll[roll] = "four";
                    one++;
                    four;
                case Util.Mathf.Clamp(outCome[roll], 5, 5):
                    diceRoll[roll] = "five";
                    five++;
                    break;
                case Util.Mathf.Clamp(outCome[roll], 6, 6):
                    diceRoll[roll] = "six";
                    six++;
                    break;
            }
        }
        return diceRoll;
    }
    function buildInterface() {
        diceBackground = new Core.GameObject("background", Config.Game.CENTER_X, Config.Game.CENTER_Y, true);
        stage.addChild(diceBackground);
        exampleLabel = new UIObjects.Label("An Example", "40px", "Consolas", "#000000", Config.Game.CENTER_X, Config.Game.CENTER_Y + 100, true);
        stage.addChild(exampleLabel);
        leftDiceLabel = new UIObjects.Label("leftDice", "16px", "Consolas", "#000000", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(leftDiceLabel);
        rightDiceLabel = new UIObjects.Label("rightDice", "16px", "Consolas", "#000000", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y + 60, true);
        stage.addChild(rightDiceLabel);
        rollButton = new UIObjects.Button("rollButton", Config.Game.CENTER_X, Config.Game.CENTER_Y + 150, true);
        stage.addChild(rollButton);
        // Dice GameObjects
        leftDice = new Core.GameObject("blank", Config.Game.CENTER_X - 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(leftDice);
        rightDice = new Core.GameObject("blank", Config.Game.CENTER_X + 150, Config.Game.CENTER_Y - 50, true);
        stage.addChild(rightDice);
    }
    function interfaceLogic() {
        rollButton.on("click", () => {
            console.log("roll button clicked");
            let dices = Dices();
            leftDice.image = assets.getResult(dices[0]);
            rightDice.image = assets.getResult(dices[1]);
        });
    }
    /**
     * This is the main function of the Game (where all the fun happens)
     *
     */
    function Main() {
        console.log(`%c Main Function`, "color: grey; font-size: 14px; font-weight: bold;");
        buildInterface();
        interfaceLogic();
    }
    window.addEventListener('load', Preload);
})();
//# sourceMappingURL=game.js.map