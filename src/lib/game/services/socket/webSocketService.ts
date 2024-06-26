import type { Game, WebSocketMessage } from '$lib/game/types'
import type { GameWebSocketService } from '$lib/game/services/socket/interface'
import { browser } from '$app/environment'
import { config } from '$lib/config'

export class WebSocketService implements GameWebSocketService {
  socket!: WebSocket
  messagesPerSecond = 0
  kbitPerSecond = 0
  game: Game

  constructor(game: Game) {
    this.game = game

    if (browser && this.game.options.isSocketOn) {
      this.#init()
    }
  }

  update() {}

  async #handleMessage(message: WebSocketMessage) {
    if (message.type === 'COMMAND') {
      console.log('handling command from user', message)
      const id = message.data.player.id
      if (id) {
        const player = await this.game.playerService.findOrCreatePlayer(id)
        this.game.addChild(player)
      }
    }
    if (message.type === 'MESSAGE') {
      console.log('handling message from user', message)
    }
    // if (message.type === 'RAID_STARTED') {
    //   this.game.audio.playSound('MARCHING_WITH_HORNS')
    // }
    // if (message.type === 'GROUP_FORM_STARTED') {
    //   this.game.audio.playSound('MARCHING_WITH_HORNS')
    // }
    // if (message.type === 'MAIN_QUEST_STARTED') {
    //   this.game.audio.playSound('MARCHING_WITH_HORNS')
    // }
    // if (message.type === 'SCENE_CHANGED') {
    //   this.game.rebuildScene()
    // }
    // if (message.type === 'IDEA_CREATED') {
    //   this.game.audio.playSound('YEAH')
    // }
  }

  #init() {
    this.socket = new WebSocket(config.websocketUrl ?? '', [this.game.id])

    this.#setMessagesPerSecondHandler()

    this.socket.addEventListener('open', () => {
      this.socket.send(JSON.stringify({ type: 'GAME_HANDSHAKE', id: this.game.id, profileJWT: this.game.profileJWT }))
    })

    this.socket.addEventListener('message', (event) => {
      const message = this.#parse(event.data.toString())
      if (!message) {
        return
      }

      this.messagesPerSecond += 1
      const bytes = JSON.stringify(message).length
      this.kbitPerSecond += Math.round((bytes * 8) / 1024)

      void this.#handleMessage(message)
    })
  }

  #parse(message: string): WebSocketMessage | undefined {
    console.log(message)
    const parsed = JSON.parse(message)
    if (parsed) {
      return parsed as WebSocketMessage
    }

    return undefined
  }

  #setMessagesPerSecondHandler() {
    return setInterval(() => {
      // console.log(
      //   `${WebSocketManager.messagesPerSecond} msg/s, ${WebSocketManager.kbitPerSecond} kbit/s`,
      // )
      this.messagesPerSecond = 0
      this.kbitPerSecond = 0
    }, 1000)
  }
}
