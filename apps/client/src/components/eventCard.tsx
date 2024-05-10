import type { IGameEvent } from "../../../../packages/api-sdk/src"
import { useCountdown } from "../hooks/useCountdown"

export const EventCard = ({ event }: { event: IGameEvent }) => {
  const [_days, _hours, minutes, seconds] = useCountdown(event.endsAt)

  let secondsWithZero: string = seconds.toString()
  if (seconds < 10) {
    secondsWithZero = `0${seconds}`
  }

  const description = getEventDescriptionByType(event)

  return (
    <div className="w-full h-auto px-4 py-4 bg-primary text-primary border-primary border-b-4 rounded-2xl">
      <p className="text-2xl font-bold">{event.title}</p>
      {description}
      <p className="mt-2 text-base italic">
        Заканчивается через {minutes}:{secondsWithZero}
      </p>
    </div>
  )
}

function getEventDescriptionByType(event: IGameEvent) {
  if (event.type === "GROUP_FORM_STARTED") {
    return (
      <div>
        <p className="text-lg leading-tight">
          Хотите в группу? Пишите в чат команду:
        </p>
        <p className="mt-1 text-3xl font-bold">!го</p>
      </div>
    )
  }
  if (event.type === "VOTING_FOR_NEW_ADVENTURE_STARTED") {
    return (
      <div>
        <p className="text-lg leading-tight">
          Проголосуем за это приключение? Пишите в чат команду:
        </p>
        <p className="mt-1 text-3xl font-bold">!го {event.poll?.id}</p>

        <p className="mt-1">
          Голосов: {event.poll?.votes.length} из {event.poll?.votesToSuccess}
        </p>
      </div>
    )
  }
}
