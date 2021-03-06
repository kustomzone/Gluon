"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Engine_1 = require("../model/Engine");
var RunningGameRegistry = require("../registries/RunningGameRegistry");
var GameStateRegistry = require("../registries/GameStateRegistry");
function GameMain(options) {
    return function (decorated) {
        var game = new decorated(decorated.name);
        if (!game.getName())
            game.setName(decorated.name);
        console.log("Registering Game: " + game.getName());
        RunningGameRegistry.setRunningGame(game);
        var runningGameSubject = RunningGameRegistry.getRunningGameSubject();
        runningGameSubject.subscribe(function (game) {
            var lastRegisteredStateObservable = GameStateRegistry.getLastRegisteredGameState();
            lastRegisteredStateObservable.subscribe(function (state) {
                if (state.getName() === game.getInitialStateName()) {
                    console.log("Starting engine");
                    var engine = new Engine_1.default(game);
                    engine.start();
                    runningGameSubject.unsubscribe();
                }
            });
        });
    };
}
exports.default = GameMain;
//# sourceMappingURL=GameMain.js.map