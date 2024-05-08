import type {
  IGameObjectPlayer,
  IGameSkill,
} from "../../../../../../packages/api-sdk/src"
import { PlayerInterface } from "../../components/playerInterface"
import type { Game } from "../../game"
import { Unit } from "./unit"

interface IPlayerOptions {
  game: Game
  object: IGameObjectPlayer
}

export class Player extends Unit implements IGameObjectPlayer {
  reputation!: number
  villainPoints!: number
  refuellerPoints!: number
  userName!: string
  skills!: IGameSkill[]

  constructor({ game, object }: IPlayerOptions) {
    super({ game, object })
    this.update(object)

    this.init()
  }

  init() {
    super.init()

    this.initInterface()
    super.addChild(this.interface)
  }

  initInterface() {
    this.interface = new PlayerInterface(this)
  }

  animate() {
    super.animate()

    this.interface.animate()
    this.showToolInHand()
    this.handleSoundByState()
  }

  showToolInHand() {
    let interfaceContainer: PlayerInterface | undefined

    for (const container of this.children) {
      if (container instanceof PlayerInterface) {
        interfaceContainer = container
      }
    }

    if (!interfaceContainer) {
      return
    }

    if (this.state === "CHOPPING") {
      interfaceContainer.showAxeInHand()
    }
    if (this.state === "MINING") {
      interfaceContainer.showPickaxeInHand()
    }
  }

  handleSoundByState() {
    if (this.state === "CHOPPING") {
      if (this.inventory?.items.find((item) => item.type === "AXE")) {
        this.game.audio.playChopWithAxeSound()
        return
      }

      this.game.audio.playHandPunch()
    }

    if (this.state === "MINING") {
      if (this.inventory?.items.find((item) => item.type === "PICKAXE")) {
        this.game.audio.playMineWithPickaxeSound()
        return
      }

      this.game.audio.playHandPunch()
    }
  }

  update(object: IGameObjectPlayer) {
    super.update(object)

    this.reputation = object.reputation
    this.villainPoints = object.villainPoints
    this.refuellerPoints = object.refuellerPoints
    this.userName = object.userName
    this.skills = object.skills
  }
}
