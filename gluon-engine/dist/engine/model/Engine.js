"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Engine = (function () {
    function Engine(game) {
        this.lastFrameTime = 0;
        this.setGame(game);
        this.clock = new THREE.Clock();
    }
    Engine.prototype.animationLoop = function () {
        if (this.running) {
            window.requestAnimationFrame(this.animationLoop.bind(this));
            var delta = this.clock.getDelta();
            var now = this.clock.getElapsedTime();
            if (this.game && this.game.isRunning())
                this.game.update(delta);
            if (this.game && this.game.isRunning() && (now - this.lastFrameTime) / 1000 > (1000 / 30)) {
                this.lastFrameTime = now;
                this.game.render(delta);
            }
        }
    };
    Engine.prototype.getGame = function () {
        return this.game;
    };
    Engine.prototype.setGame = function (game) {
        this.game = game;
    };
    Engine.prototype.start = function () {
        var _this = this;
        this.running = true;
        var game = this.getGame();
        this.animationLoop();
        game.init().subscribe(function () {
            game.load().subscribe(function () {
                game.isRunning(true);
                setTimeout(function () { _this.stop(); }, 5000);
            });
        });
        return game;
    };
    Engine.prototype.stop = function () {
        this.running = false;
        this.getGame().isRunning(false);
        this.getGame().destroy();
    };
    return Engine;
}());
exports.default = Engine;
//# sourceMappingURL=Engine.js.map