"use strict";
var L12_Plattformer2D;
(function (L12_Plattformer2D) {
    var ƒ = FudgeCore;
    var ƒAid = FudgeAid;
    let ACTION;
    (function (ACTION) {
        ACTION["IDLE"] = "Idle";
        ACTION["WALK"] = "Walk";
        ACTION["JUMP"] = "Jump";
    })(ACTION = L12_Plattformer2D.ACTION || (L12_Plattformer2D.ACTION = {}));
    let DIRECTION;
    (function (DIRECTION) {
        DIRECTION[DIRECTION["LEFT"] = 0] = "LEFT";
        DIRECTION[DIRECTION["RIGHT"] = 1] = "RIGHT";
    })(DIRECTION = L12_Plattformer2D.DIRECTION || (L12_Plattformer2D.DIRECTION = {}));
    let Hare = /** @class */ (() => {
        class Hare extends ƒ.Node {
            constructor(_name = "Hare") {
                super(_name);
                // private action: ACTION;
                // private time: ƒ.Time = new ƒ.Time();
                this.speed = ƒ.Vector3.ZERO();
                this.update = (_event) => {
                    this.broadcastEvent(new CustomEvent("showNext"));
                    let timeFrame = ƒ.Loop.timeFrameGame / 1000;
                    this.speed.y += Hare.gravity.y * timeFrame;
                    let distance = ƒ.Vector3.SCALE(this.speed, timeFrame);
                    this.cmpTransform.local.translate(distance);
                    this.checkCollision();
                };
                this.addComponent(new ƒ.ComponentTransform());
                for (let animation in Hare.animations) {
                    let nodeSprite = new ƒAid.NodeSprite(animation);
                    nodeSprite.setAnimation(Hare.animations[animation]);
                    nodeSprite.activate(false);
                    nodeSprite.addEventListener("showNext", (_event) => { _event.currentTarget.showFrameNext(); }, true);
                    this.appendChild(nodeSprite);
                }
                this.show(ACTION.IDLE);
                ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, this.update);
            }
            static generateSprites(_spritesheet) {
                Hare.animations = {};
                let sprite = new ƒAid.SpriteSheetAnimation(ACTION.WALK, _spritesheet);
                sprite.generateByGrid(ƒ.Rectangle.GET(2, 104, 68, 64), 6, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                Hare.animations[ACTION.WALK] = sprite;
                sprite = new ƒAid.SpriteSheetAnimation(ACTION.IDLE, _spritesheet);
                sprite.generateByGrid(ƒ.Rectangle.GET(8, 20, 45, 72), 4, ƒ.Vector2.ZERO(), 64, ƒ.ORIGIN2D.BOTTOMCENTER);
                Hare.animations[ACTION.IDLE] = sprite;
            }
            show(_action) {
                if (_action == ACTION.JUMP)
                    return;
                for (let child of this.getChildren())
                    child.activate(child.name == _action);
                // this.action = _action;
            }
            act(_action, _direction) {
                switch (_action) {
                    case ACTION.IDLE:
                        this.speed.x = 0;
                        break;
                    case ACTION.WALK:
                        let direction = (_direction == DIRECTION.RIGHT ? 1 : -1);
                        this.speed.x = Hare.speedMax.x; // * direction;
                        this.cmpTransform.local.rotation = ƒ.Vector3.Y(90 - 90 * direction);
                        // console.log(direction);
                        break;
                    case ACTION.JUMP:
                        this.speed.y = 2;
                        break;
                }
                this.show(_action);
            }
            checkCollision() {
                for (let floor of L12_Plattformer2D.level.getChildren()) {
                    let rect = floor.getRectWorld();
                    //console.log(rect.toString());
                    let hit = rect.isInside(this.cmpTransform.local.translation.toVector2());
                    if (hit) {
                        let translation = this.cmpTransform.local.translation;
                        translation.y = rect.y;
                        this.cmpTransform.local.translation = translation;
                        this.speed.y = 0;
                    }
                }
            }
        }
        Hare.speedMax = new ƒ.Vector2(1.5, 5); // units per second
        Hare.gravity = ƒ.Vector2.Y(-3);
        return Hare;
    })();
    L12_Plattformer2D.Hare = Hare;
})(L12_Plattformer2D || (L12_Plattformer2D = {}));
//# sourceMappingURL=Hare.js.map