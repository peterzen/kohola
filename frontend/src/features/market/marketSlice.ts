import _ from "lodash"
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"

import moment from "moment"

import {
    AltCurrencyRates,
    MarketChartDataPoint,
} from "../../proto/walletgui_pb"
import {
    AppError,
    AppDispatch,
    IGetState,
    IApplicationState,
} from "../../store/types"
import { hexToRaw } from "../../helpers/byteActions"
import { ExchangeRateBotBackend } from "../../middleware/exchangeratebot"
import { normalizeDatapoints } from "../../helpers/helpers"

const w = window as any

export interface ExchangeRateState {
    readonly currentRates: AltCurrencyRates | null
    readonly currentRatesError: AppError | null
}

interface CachedRateChartData {
    [currencyCode: string]: {
        readonly getMarketChartAttempting: boolean
        readonly getMarketChartError: AppError | null
        readonly getMarketChartData: MarketChartDataPoint[]
    }
}

export interface GetMarketChartState {
    readonly marketChartState: CachedRateChartData
}

export const initialState: ExchangeRateState & GetMarketChartState = {
    currentRates: null,
    currentRatesError: null,

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

        // GetMarketChart
        getMarketChartAttempt(state, action: PayloadAction<string>) {
            const currencyCode = action.payload
            state.marketChartState[currencyCode] = {
                getMarketChartAttempting: true,
                getMarketChartError: null,
                getMarketChartData: [],
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
                chartData: MarketChartDataPoint[]
            }>
        ) {
            const currencyCode = action.payload.currencyCode
            state.marketChartState[currencyCode] = {
                getMarketChartAttempting: false,
                getMarketChartError: null,
                getMarketChartData: action.payload.chartData,
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
    return async (dispatch: AppDispatch, getState: IGetState) => {
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
                    chartData: resp.getDatapointsList(),
                })
            )
        } catch (error) {
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

export const getMarketChartData = (
    state: IApplicationState,
    currencyCode: string
): MarketChartDataPoint[] => {
    return state.market.marketChartState[currencyCode]?.getMarketChartData || []
}

export const getExchangeSparklineData = (
    state: IApplicationState,
    currencyCode: string,
    days: number
): ChartDataPoint[] => {
    return _.map(
        datapointsAsPOJO(getMarketChartData(state, currencyCode)),
        (point: MarketChartDataPoint.AsObject) => {
            return {
                name: timeConverter(point.timestamp, days),
                value: point.exchangeRate,
            }
        }
    )
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

export const getCombinedMarketChartData = (
    state: IApplicationState,
    currencyCodes: string[]
) => {
    const combinedChartsData: any = []
    const allChartdata: any = {}
    for (let i = 0; i < currencyCodes.length; i++) {
        const currencyCode = currencyCodes[i]
        allChartdata[currencyCode] = normalizeDatapoints(
            datapointsAsPOJO(getMarketChartData(state, currencyCode)),
            "exchangeRate"
        )
    }
    const masterChartCollection = allChartdata[_.first(currencyCodes) || ""]
    for (let di = 0; di < masterChartCollection.length; di++) {
        const d: any = {
            timestamp: masterChartCollection[di].timestamp,
        }
        for (let i = 0; i < currencyCodes.length; i++) {
            const currencyCode = currencyCodes[i]
            d[currencyCode] = allChartdata[currencyCode][i].exchangeRate
            combinedChartsData.push(d)
        }
    }

    return combinedChartsData
}

// helpers
export function datapointsAsPOJO(
    datapoints: MarketChartDataPoint[]
): MarketChartDataPoint.AsObject[] {
    return _.map(datapoints, (d) => d.toObject())
}

export function timeConverter(timestamp: number, timeframeDays: number) {
    const m = moment(timestamp * 1000)
    switch (timeframeDays) {
        case 1:
            return m.format("HH:mm")
        case 3:
        case 7:
            return m.format("D ddd")
        default:
            return m.format("MM/DD")
    }
}
