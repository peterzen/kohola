import _ from "lodash"
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"

import { AppError, AppThunk, IApplicationState } from "../../store/types"
import {
    RunAccountMixerResponse,
    RunAccountMixerRequest,
} from "../../proto/api_pb"
import LorcaBackend from "../../middleware/lorca"
import { getMixTransactions, getWalletTransactions } from "../transactions/transactionsSlice"

// @ts-ignore
import { TimeSeries, Collection, IndexedEvent, TimeEvent, TimeRange, count, Pipeline, TimeRangeEvent } from "pondjs"

import moment from "moment"
import { ATOMS_DIVISOR } from "../../constants"
import { ChartTimeframe } from "../../components/Shared/IntervalChooser"

// RunAccountMixer
export interface IRunAccountMixerState {
    readonly runAccountMixerAttempting: boolean
    readonly runAccountMixerResponse: RunAccountMixerResponse | null
    readonly runAccountMixerError: AppError | null
    readonly isAccountMixerRunning: boolean
    readonly stopAccountMixerAttempting: boolean
}

export interface IMixerStatsState {
    timeframe: ChartTimeframe | null
    baseSeries: TimeSeries | null
    rollup: TimeSeries | null
}

export const initialState:
    IRunAccountMixerState &
    IMixerStatsState = {
    // RunAccountMixer
    runAccountMixerAttempting: false,
    runAccountMixerResponse: null,
    runAccountMixerError: null,
    isAccountMixerRunning: false,
    stopAccountMixerAttempting: false,

    timeframe: null,
    baseSeries: null,
    rollup: null,
}

const stakingSlice = createSlice({
    name: "stakingSlice",
    initialState,
    reducers: {
        // RunAccountMixer
        runAccountMixerAttempt(state) {
            state.runAccountMixerAttempting = true
            state.runAccountMixerResponse = null
            state.runAccountMixerError = null
            state.isAccountMixerRunning = false
        },
        runAccountMixerFailed(state, action: PayloadAction<AppError>) {
            state.runAccountMixerAttempting = false
            state.runAccountMixerResponse = null
            state.runAccountMixerError = action.payload
            state.isAccountMixerRunning = false
        },
        runAccountMixerSuccess(state) {
            state.runAccountMixerAttempting = false
            state.runAccountMixerResponse = null
            state.runAccountMixerError = null
            state.isAccountMixerRunning = true
        },
        stopAccountMixerAttempt(state) {
            state.stopAccountMixerAttempting = true
        },
        stopAccountMixerSuccess(state) {
            state.runAccountMixerError = null
            state.isAccountMixerRunning = false
            state.stopAccountMixerAttempting = false
        },
    },
})

export const {
    // RunAccountMixer
    runAccountMixerAttempt,
    runAccountMixerFailed,
    runAccountMixerSuccess,
    stopAccountMixerAttempt,
    stopAccountMixerSuccess,
} = stakingSlice.actions

export default stakingSlice.reducer

export const runAccountMixer: ActionCreator<any> = (
    request: RunAccountMixerRequest
): AppThunk => {
    return async (dispatch, getState) => {
        const { runAccountMixerAttempting } = getState().mixer
        if (runAccountMixerAttempting) {
            return
        }
        dispatch(runAccountMixerAttempt())

        const onErrorFn = (errorMsg: string) => {
            if (getState().mixer.stopAccountMixerAttempting) {
                dispatch(stopAccountMixerSuccess())
            } else {
                const err = new AppError(0, errorMsg)
                dispatch(runAccountMixerFailed(err))
            }
        }
        const onDoneFn = () => {
            dispatch(runAccountMixerSuccess())
        }
        const onStopFn = () => {
            dispatch(stopAccountMixerSuccess())
        }

        try {
            await LorcaBackend.runAccountMixer(
                request,
                onErrorFn,
                onDoneFn,
                onStopFn
            )
        } catch (error) {
            dispatch(runAccountMixerFailed(error))
        }
    }
}

export const stopAccountMixer: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const { stopAccountMixerAttempting } = getState().mixer
        if (stopAccountMixerAttempting) {
            return
        }

        dispatch(stopAccountMixerAttempt())
        try {
            await LorcaBackend.stopAccountMixer()
            // debugger
        } catch (error) {
            // dispatch(stopAccountMixerFailed(error))
        }
    }
}


// selectors
export const getFilteredTransactions = (state: IApplicationState, days: number) => {
    const now = moment()
    return getWalletTransactions(state)
        .filter(tx => moment(tx.getTimestamp()).isAfter(now.subtract(days, "days").startOf("day")))
}

export const getMixerStatsChartData = (state: IApplicationState, timeframe: ChartTimeframe) => {
    const now = moment()

    const chain = getMixTransactions(state)
        .filter(tx => moment(tx.getTimestamp()).isAfter(now.subtract(timeframe.days, "days").startOf("day")))
        .orderBy(t => t.getTimestamp())

    // const chain = getMixerStatsChartData(state, ownProps.timeframe.days)

    if (chain == undefined || chain.value().length < 1) {
        return
    }
    const events = _.map(
        chain.value(), (t) => new TimeEvent(t.getTimestamp(), {
            denomination: t.getAmount() / ATOMS_DIVISOR,
        })
    )
    const series = new TimeSeries({
        name: "denoms",
        columns: ["time", "denomination"],
        collection: new Collection(events).sortByTime(),
    })
    console.log("SERIES", series.toJSON())

    return series

}
