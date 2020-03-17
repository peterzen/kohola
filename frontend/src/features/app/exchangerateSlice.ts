import { AltCurrencyRates } from "../../proto/dcrwalletgui_pb";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";
import { AppError, AppDispatch, IGetState, IApplicationState } from "../../store/types";
import { hexToRaw } from "../../helpers/byteActions";
import _ from "lodash";


const w = (window as any)

export interface ExchangeRateState {
	readonly currentRates: AltCurrencyRates | null
	readonly currentRatesError: AppError | null
}

export const initialState: ExchangeRateState = {
	currentRates: null,
	currentRatesError: null
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
	}
})

export const {
	currentRatesSuccess,
	currentRatesFailed,
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

// selectors
export const getCurrentExchangeRates = (state: IApplicationState) => {
	return state.exchangerates.currentRates
}

export const getCurrentExchangeRate = (state: IApplicationState, currencyCode: string) => {
	return _.find(state.exchangerates.currentRates?.getRatesList(), r => r.getCurrencyCode() == currencyCode)?.getCurrentRate()
}
