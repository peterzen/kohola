import { TimeRange, TimeSeries, TimeEvent, Collection } from "pondjs"
import moment from "./moment-helper"


export function makeTimerange(days: number) {
    const now = moment.default()
    return new TimeRange(now.subtract(days, "days").startOf("day"), now)
}

