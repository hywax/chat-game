import { Howl } from 'howler'
import chop1Audio from '$lib/assets/game/audio/chop-1.wav'
import fireBurn1Audio from '$lib/assets/game/audio/fire-1.wav'
import forest1Audio from '$lib/assets/game/audio/forest-1.mp3'
import handPunch1Audio from '$lib/assets/game/audio/hand-punch-1.wav'
import marchWithHorns1Audio from '$lib/assets/game/audio/marching-with-horns-1.wav'
import mine1Audio from '$lib/assets/game/audio/mine-1.wav'
import wagon1Audio from '$lib/assets/game/audio/wagon-1.wav'
import yeah1Audio from '$lib/assets/game/audio/yeah-1.wav'
import type { Game, GameAudio, GameAudioName } from '$lib/game/types'

export class AudioManager implements GameAudio {
  game: Game

  constructor(game: Game) {
    this.game = game
  }

  #chop1 = new Howl({
    src: chop1Audio,
  })

  #mine1 = new Howl({
    src: mine1Audio,
    rate: 0.7,
    volume: 0.4,
  })

  #handPunch1 = new Howl({
    src: handPunch1Audio,
    volume: 0.2,
    rate: 0.8,
  })

  #marchWithHorns1 = new Howl({
    src: marchWithHorns1Audio,
    volume: 0.7,
  })

  #forest1 = new Howl({
    src: forest1Audio,
    loop: true,
    volume: 0.5,
  })

  #wagon1 = new Howl({
    src: wagon1Audio,
    rate: 0.7,
    volume: 0.08,
  })

  #fireBurn1 = new Howl({
    src: fireBurn1Audio,
    volume: 0.7,
  })

  #yeah1 = new Howl({
    src: yeah1Audio,
    volume: 0.8,
  })

  playSound(name: GameAudioName) {
    return this.#play(this.#findSound(name))
  }

  destroy() {
    this.#fireBurn1.stop()
    this.#forest1.stop()
  }

  #findSound(name: GameAudioName): Howl[] {
    switch (name) {
      case 'CHOP_HIT':
        return [this.#chop1]
      case 'MINE_HIT':
        return [this.#mine1]
      case 'HAND_HIT':
        return [this.#handPunch1]
      case 'MARCHING_WITH_HORNS':
        return [this.#marchWithHorns1]
      case 'WAGON_MOVING':
        return [this.#wagon1]
      case 'FIRE_BURN':
        return [this.#fireBurn1]
      case 'YEAH':
        return [this.#yeah1]
      case 'FOREST_BACKGROUND':
        return [this.#forest1]
      default:
        return []
    }
  }

  #play(audios: Howl[]) {
    if (!audios.length || !this.game.options.isSoundOn) {
      return
    }

    const randomAudio = audios[Math.floor(Math.random() * audios.length)]
    if (randomAudio.playing()) {
      return
    }

    randomAudio.play()
  }
}
