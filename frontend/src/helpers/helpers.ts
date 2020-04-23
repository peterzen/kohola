import _ from "lodash"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)

export function formatTimestamp(ts: Moment.Moment): string {
    return ts.fromNow()
}

export function reverseHash(s: string) {
    s = s.replace(/^(.(..)*)$/, "0$1") // add a leading zero if needed
    let a = s.match(/../g) // split number in groups of two
    if (a !== null) {
        a.reverse() // reverse the groups
        var s2 = a.join("")
        return s2
    }
    return ""
}

export function formatHash(hash: Uint8Array) {
    return reverseHash(Buffer.from(hash).toString("hex"))
}

export function normalizeDatapoints<T extends any>(
    datapoints: T[],
    fieldName: string
): T[] {
    const valuesColl = _.map(datapoints, (d: T): number => d[fieldName])
    const minValue = _.min(valuesColl) || 0
    return _.map(
        datapoints,
        (d: T): T => {
            d[fieldName] = d[fieldName] - minValue
            return d
        }
    )
}

export interface IChartdataTimelineItem {
    timestamp: string
    value: number
}

export function makeTimeline(
    days: number,
    fromDate?: Moment.Moment
): IChartdataTimelineItem[] {
    const dateRange = makeDateRangeFromDays(days, fromDate)
    const datePoints = Array.from(dateRange.by("day"))
    return _.transform(
        datePoints.map((m) => m.format("L")),
        (result: any, d: string) => (result[d] = 0),
        {}
    )
}

export function makeDateRangeFromDays(days: number, fromDate = Moment.default()) {
    return moment.range(
        moment.default().subtract(days, "day"),
        fromDate
    )
}

