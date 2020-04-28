import { TimeRange, TimeSeries, TimeEvent, Collection } from "pondjs"
import moment from "./moment-helper"


export function makeTimerange(days: number) {
    const now = moment.default()
    return new TimeRange(now.subtract(days, "days").startOf("day"), now)
}



    /*

	const coll = series.pipeline()
		.windowBy("1d")           // 1 day fixed windows
		.emitOn("eachEvent")      // emit result on each event
		.aggregate({
			tx_count: { txType: count() },
		})
		.asIndexedEvents({ duration: "1d" })
		.toEventList()

	debugger

	const txTypeSeries = new TimeSeries({
		name: "tx-type",
		// columns: ["index", "value"],
		collection: new Collection(coll).sortByTime()
	})
	// .toEventList()
	// .to(CollectionOut, c => new TimeSeries({ name: "newTimeseries", collection: c }));


	debugger
	*/
