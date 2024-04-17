import { createId } from "@paralleldrive/cuid2";
import {
  type IGameObjectRaider,
  getRandomInRange,
} from "../../../../../packages/api-sdk/src";
import {
  RAIDER_CAMP_MAX_X,
  RAIDER_CAMP_MAX_Y,
  RAIDER_CAMP_MIN_X,
  RAIDER_CAMP_MIN_Y,
} from "../../config";
import { GameObject } from "./gameObject";

export class Raider extends GameObject implements IGameObjectRaider {
  public readonly entity = "RAIDER";
  public userName = "рейдер";
  public colorIndex = 0;

  constructor() {
    const objectId = createId();

    const finalX = getRandomInRange(RAIDER_CAMP_MIN_X, RAIDER_CAMP_MAX_X);
    const finalY = getRandomInRange(RAIDER_CAMP_MIN_Y, RAIDER_CAMP_MAX_Y);

    super({ id: objectId, x: finalX, y: finalY });
  }

  live() {
    if (this.state === "IDLE") {
      this.sendMessageObjectUpdated();
      return;
    }

    if (this.state === "MOVING") {
      const isMoving = this.move(1);
      if (!isMoving) {
        this.state = "IDLE";
        return;
      }

      this.sendMessageObjectUpdated();
      return;
    }
  }
}