import _ from "lodash"

import * as Moment from "moment"
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import { ATOMS_DIVISOR } from "../constants"
import { sprintf } from "sprintf-js"

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
    const valuesColl = _.map(datapoints, (d: any): number => d[fieldName])
    const minValue = _.min(valuesColl) || 0
    return _.map(
        datapoints,
        (d: any): T => {
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

export interface Dictionary<T> {
    [index: string]: T;
}

export function makeDateRangeFromDays(days: number, fromDate = Moment.default()) {
    return moment.range(
        moment.default().subtract(days, "day"),
        fromDate
    )
}

export function AmountString(
    amount: number,
    showCurrency: boolean,
    rounding: number = 8
) {
    if (amount == undefined || !isFinite(amount)) return ""
    const dcrAmount = amount / ATOMS_DIVISOR
    const split = dcrAmount.toFixed(rounding).toString().split(".")
    const head = [split[0], split[1].slice(0, 2)].join(".")
    const tail = split[1].slice(2).replace(/0{1,3}$/, "")
    const negativeZero = parseFloat(head) === 0 && dcrAmount < 0

    return (sprintf("%s%02.02f", negativeZero ? "-" : "", head) +
        tail +
        (showCurrency ? "DCR" : ""))
}
