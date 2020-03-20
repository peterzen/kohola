import { AltCurrencyRates } from "../../proto/dcrwalletgui_pb";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";
import { AppError, AppDispatch, IGetState, IApplicationState } from "../../store/types";
import { hexToRaw } from "../../helpers/byteActions";
import _ from "lodash";
import { ExchangeRateBotBackend } from "../../middleware/exchangeratebot";


const w = (window as any)

export interface ExchangeRateState {
	readonly currentRates: AltCurrencyRates | null
	readonly currentRatesError: AppError | null
}

interface CachedRateChartData {
	[currencyCode: string]: {
		readonly getMarketChartAttempting: boolean
		readonly getMarketChartError: AppError | null
		readonly getMarketChartData: number[]
	}
}

export interface GetMarketChartState {
	readonly marketChartState: CachedRateChartData
}

export const initialState:
	ExchangeRateState &
	GetMarketChartState = {
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
		getMarketChartFailed(state, action: PayloadAction<{ currencyCode: string, error: AppError }>) {
			const currencyCode = action.payload.currencyCode
			state.marketChartState[currencyCode].getMarketChartAttempting = false
			state.marketChartState[currencyCode].getMarketChartError = action.payload.error
		},
		getMarketChartSuccess(state, action: PayloadAction<{ currencyCode: string, chartData: number[] }>) {
			const currencyCode = action.payload.currencyCode
			state.marketChartState[currencyCode].getMarketChartAttempting = false
			state.marketChartState[currencyCode].getMarketChartError = null
			state.marketChartState[currencyCode].getMarketChartData = action.payload.chartData
		},
	}
})

export const {
	currentRatesSuccess,
	currentRatesFailed,

	getMarketChartAttempt,
	getMarketChartFailed,
	getMarketChartSuccess,

} = exchangeRateSlice.actions

export default exchangeRateSlice.reducer

export const subscribeExchangeRateFeed: ActionCreator<any> = () => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		w.lorcareceiver__OnExchangeRateUpdate = (
			serializedMsg: string
		) => {
			if (serializedMsg != "") {
				const rates = AltCurrencyRates.deserializeBinary(hexToRaw(serializedMsg))
				console.log(rates.toObject())
				dispatch(currentRatesSuccess(rates))
			} else {
				const error = new AppError(0, "Exchange rates fetch error")
				dispatch(currentRatesFailed(error))
			}
		}
	}
}

export const fetchExchangeChartData: ActionCreator<any> = (currencyCode: string, days: number) => {
	return async (dispatch: AppDispatch, getState: IGetState) => {
		if (getState().exchangerates.marketChartState[currencyCode]?.getMarketChartAttempting) {
			return
		}
		dispatch(getMarketChartAttempt(currencyCode))
		try {
			const resp = await ExchangeRateBotBackend.getMarketChart(currencyCode, days)
			const chartData = _.map(resp.getDatapointsList(), d => d.getExchangeRate())
			dispatch(getMarketChartSuccess({
				currencyCode: currencyCode,
				chartData: chartData
			}))
		}
		catch (error) {
			dispatch(getMarketChartFailed({
				currencyCode: currencyCode,
				error: error
			}))
		}
	}
}

// selectors
export const getCurrentExchangeRates = (state: IApplicationState) => {
	return state.exchangerates.currentRates
}

export const getCurrentExchangeRate = (state: IApplicationState, currencyCode: string) => {
	return _.find(state.exchangerates.currentRates?.getRatesList(), r => r.getCurrencyCode() == currencyCode)?.getCurrentRate()
}

export const getMarketChartData = (state: IApplicationState, currencyCode: string) => {
	return state.exchangerates.marketChartState[currencyCode]?.getMarketChartData
}
