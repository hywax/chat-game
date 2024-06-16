import { type AnimatedSprite, Sprite } from 'pixi.js'
import { FireParticlesContainer } from '../../components/fireParticlesContainer'
import { AssetsManager } from '../../utils'
import { BaseBuilding } from './baseBuilding'
import type { GameScene, IGameBuildingCampfire } from '$lib/game/types'

interface ICampfireOptions {
  scene: GameScene
  x: number
  y: number
}

export class Campfire extends BaseBuilding implements IGameBuildingCampfire {
  private fireAnimation!: AnimatedSprite
  private fireParticles!: FireParticlesContainer

  constructor({ scene, x, y }: ICampfireOptions) {
    super({ scene, x, y, type: 'CAMPFIRE' })

    this.initGraphics()
  }

  public animate() {
    super.animate()

    this.fireAnimation.animationSpeed = 0.08
    this.fireAnimation.play()

    this.fireParticles.animate(1)

    this.handleSoundByState()
  }

  private initGraphics() {
    const sprite = Sprite.from('campfire1')
    sprite.anchor.set(0.5, 1)

    this.fireAnimation = AssetsManager.getAnimatedSpriteCampfire()
    this.fireParticles = new FireParticlesContainer({
      x: 0,
      y: -40,
      areaWidth: 40,
    })

    this.addChild(sprite, this.fireAnimation, this.fireParticles)
  }

  private handleSoundByState() {
    if (!this.visible) {
      return
    }

    if (this.state === 'IDLE') {
      this.scene.game.audio.playSound('FIRE_BURN')
    }
  }
}
