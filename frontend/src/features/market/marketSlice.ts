import _ from "lodash"
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"

import moment from "../../helpers/moment-helper"

import { TimeRange, TimeSeries, TimeEvent, Collection } from "pondjs"

import {
    AltCurrencyRates, GetMarketChartResponse,
} from "../../proto/walletgui_pb"
import {
    AppError,
    AppDispatch,
    IGetState,
    IApplicationState,
} from "../../store/types"
import { hexToRaw } from "../../helpers/byteActions"
import { ExchangeRateBotBackend } from "../../middleware/exchangeratebot"


const w = window as any

export interface ExchangeRateState {
    readonly currentRates: AltCurrencyRates | null
    readonly currentRatesError: AppError | null
}

interface RateChartData {
    readonly getMarketChartAttempting: boolean
    readonly getMarketChartError: AppError | null

    // readonly timerange: TimeRange
    readonly priceSeries: TimeSeries | null
    readonly volumeSeries: TimeSeries | null
}


interface CachedRateChartData {
    [currencyCode: string]: RateChartData
}

export interface GetMarketChartState {
    readonly timerange: TimeRange
    readonly marketChartState: CachedRateChartData
}

export const initialState: ExchangeRateState & GetMarketChartState = {
    currentRates: null,
    currentRatesError: null,

    timerange: new TimeRange(),
    marketChartState: {},
}

const exchangeRateSlice = createSlice({
    name: "exchangeRateSlice",
    initialState,
    reducers: {
        currentRatesSuccess(state, action: PayloadAction<AltCurrencyRates>) {
            state.currentRates = action.payload
        },
        currentRatesFailed(state, action: PayloadAction<AppError>) {
            state.currentRatesError = action.payload
        },

        updateTimerange(state, action: PayloadAction<TimeRange>) {
            state.timerange = action.payload
        },

        // GetMarketChart
        getMarketChartAttempt(state, action: PayloadAction<string>) {
            const currencyCode = action.payload
            state.marketChartState[currencyCode] = {
                getMarketChartAttempting: true,
                getMarketChartError: null,
                priceSeries: null,
                volumeSeries: null,
            }
        },
        getMarketChartFailed(
            state,
            action: PayloadAction<{ currencyCode: string; error: AppError }>
        ) {
            const currencyCode = action.payload.currencyCode
            state.marketChartState[
                currencyCode
            ].getMarketChartAttempting = false
            state.marketChartState[currencyCode].getMarketChartError =
                action.payload.error
        },
        getMarketChartSuccess(
            state,
            action: PayloadAction<{
                currencyCode: string
                priceSeries: TimeSeries,
                volumeSeries: TimeSeries,

                // TODO remove
                prices: GetMarketChartResponse.MarketChartDataPoint[]
                totalVolumes: GetMarketChartResponse.MarketChartDataPoint[],
            }>
        ) {
            const currencyCode = action.payload.currencyCode
            state.marketChartState[currencyCode] = {
                getMarketChartAttempting: false,
                getMarketChartError: null,
                priceSeries: action.payload.priceSeries,
                volumeSeries: action.payload.volumeSeries,
            }
        },
    },
})

export const {
    currentRatesSuccess,
    currentRatesFailed,

    getMarketChartAttempt,
    getMarketChartFailed,
    getMarketChartSuccess,
} = exchangeRateSlice.actions

export default exchangeRateSlice.reducer

export type ChartDataPoint = {
    name: string
    value: number
}

export const subscribeExchangeRateFeed: ActionCreator<any> = () => {
    return async (dispatch: AppDispatch) => {
        w.lorcareceiver__OnExchangeRateUpdate = (serializedMsg: string) => {
            if (serializedMsg != "") {
                const rates = AltCurrencyRates.deserializeBinary(
                    hexToRaw(serializedMsg)
                )
                console.log(rates.toObject())
                dispatch(currentRatesSuccess(rates))
            } else {
                const error = new AppError(0, "Exchange rates fetch error")
                dispatch(currentRatesFailed(error))
            }
        }
    }
}

export const fetchExchangeChartData: ActionCreator<any> = (
    currencyCode: string,
    days: number
) => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        if (
            getState().market.marketChartState[currencyCode]
                ?.getMarketChartAttempting
        ) {
            return
        }
        dispatch(getMarketChartAttempt(currencyCode))
        try {
            const resp = await ExchangeRateBotBackend.getMarketChart(
                currencyCode,
                days
            )
            dispatch(
                getMarketChartSuccess({
                    currencyCode: currencyCode,
                    prices: resp.getPricesList(),
                    totalVolumes: resp.getVolumesList(),

                    priceSeries: makePriceSeries(resp.getPricesList(), currencyCode),
                    volumeSeries: makeVolumeSeries(resp.getVolumesList(), currencyCode),
                })
            )
        } catch (error) {
            debugger
            dispatch(
                getMarketChartFailed({
                    currencyCode: currencyCode,
                    error: error,
                })
            )
        }
    }
}

// selectors
export const getCurrentExchangeRates = (state: IApplicationState) => {
    return state.market.currentRates
}

export const getCurrentExchangeRate = (
    state: IApplicationState,
    currencyCode: string
) => {
    return _.find(
        state.market.currentRates?.getRatesList(),
        (r) => r.getCurrencyCode() == currencyCode
    )?.getCurrentRate()
}

export const haveExchangeRateData = (state: IApplicationState) => {
    return (
        state.market.currentRates != undefined &&
        state.market.currentRates.getRatesList().length > 0
    )
}

export const getMarketCurrencyState = (
    state: IApplicationState,
    currencyCode: string
) => {
    return state.market.marketChartState[currencyCode]
}

export const isChartDataLoaded = (
    state: IApplicationState,
    currencyCodes: string[]
) => {
    const loadedState = _.map(
        currencyCodes,
        (c) => state.market.marketChartState[c]?.getMarketChartAttempting
    )
    return _.every(loadedState, (s) => s === false)
}

// helpers
function makePriceSeries(data: GetMarketChartResponse.MarketChartDataPoint[], currencyCode: string) {

    const events = _.map(data, item => {
        const args: any = {}
        args[currencyCode] = item.getValue()
        return new TimeEvent(item.getTimestamp()*1000, args)
    })
    const series = new TimeSeries({
        name: `dcr-${currencyCode}`,
        columns: ["time", currencyCode],
        collection: new Collection(events).sortByTime()
    })
    return series
}


function makeVolumeSeries(data: GetMarketChartResponse.MarketChartDataPoint[], currencyCode: string) {

    const events = _.map(data, item => {
        const timestamp = moment.default(item.getTimestamp())
        // const index = timestamp.format("I").replace(/\//g, "-")
        return new TimeEvent(timestamp, {
            volume: item.getValue(),
        })
    })
    const collection = new Collection(events)
    const sortedCollection = collection.sortByTime()
    const series = new TimeSeries({
        name: "DCR-volume",
        columns: ["time", "volume"],
        collection: sortedCollection
    })
    return series
}
