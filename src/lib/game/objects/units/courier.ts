import type { IGameObjectCourier } from "$lib/game/types"
import { generateUnitUserName } from "../../common/generators/unitName.ts"
import { generateUnitTop } from "../../common/generators/unitTop.ts"
import type { GameScene } from "../../scenes/gameScene.ts"
import { Unit } from "./unit"

interface ICourierOptions {
  scene: GameScene
  x: number
  y: number
}

export class Courier extends Unit implements IGameObjectCourier {
  constructor({ scene, x, y }: ICourierOptions) {
    super({
      scene,
      x,
      y,
    })

    this.speedPerSecond = 100
    this.minDistance = 15
    this.userName = generateUnitUserName()

    this.initVisual({
      head: "1",
      hairstyle: "BOLD",
      top: generateUnitTop(),
    })
  }
}
