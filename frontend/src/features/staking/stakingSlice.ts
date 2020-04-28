import _, { CollectionChain } from "lodash"

import Moment from "moment"
import moment from "../../helpers/moment-helper"

import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit"
import { makeTimeline, IChartdataTimelineItem, Dictionary } from "../../helpers/helpers"

import {
    AppError,
    AppThunk,
    IApplicationState,
    AppDispatch,
    IGetState,
} from "../../store/types"
import {
    PurchaseTicketsResponse,
    PurchaseTicketsRequest,
    CommittedTicketsResponse,
    VoteChoicesResponse,
    SetVoteChoicesResponse,
    RunTicketBuyerResponse,
    RunTicketBuyerRequest,
    RevokeTicketsResponse,
} from "../../proto/api_pb"
import LorcaBackend from "../../middleware/lorca"
import {
    Ticket,
    TicketPrice,
    Agendas,
    StakeInfo,
} from "../../middleware/models"

import { StakingHistory, StakeDiffHistory } from "../../proto/walletgui_pb"
import { TransactionType } from "../../constants"
import { ChartTimeframe, timeframes } from "../../components/Shared/IntervalChooser"
import { TimeEvent, Collection, TimeSeries } from "pondjs"


// GetTickets
export interface ITicketsState {
    readonly tickets: Ticket[]
    readonly endBlockHeight: number
    readonly startBlockHeight: number
    readonly targetTicketCount: number
    readonly getTicketsAttempting: boolean
    readonly errorGetTickets: AppError | null
}

// TicketPrice
export interface ITicketPriceState {
    readonly ticketPrice: TicketPrice
    readonly errorTicketPrice: AppError | null
    readonly getTicketPriceAttempting: boolean
}

// Agendas
export interface IAgendasState {
    readonly agendas: Agendas
    readonly errorAgendas: AppError | null
    readonly getAgendasAttempting: boolean
}

// VoteChoices
export interface IGetVoteChoicesState {
    readonly voteChoicesAttempting: boolean
    readonly voteChoicesResponse: VoteChoicesResponse | null
    readonly voteChoicesError: AppError | null
}

// SetVoteChoices
export interface ISetVoteChoicesState {
    readonly setVoteChoicesAttempting: boolean
    readonly setVoteChoicesResponse: SetVoteChoicesResponse | null
    readonly setVoteChoicesError: AppError | null
}

// StakeInfo
export interface IStakeInfoState {
    readonly stakeinfo: StakeInfo
    readonly errorStakeInfo: AppError | null
    readonly getStakeInfoAttempting: boolean
}

// PurchaseTickets
export interface IPurchaseTicketsState {
    readonly errorPurchaseTickets: AppError | null
    readonly purchaseTicketResponse: PurchaseTicketsResponse | null
    readonly purchaseTicketAttempting: boolean
}

// CommittedTickets
export interface ICommittedTicketsState {
    readonly committedTicketsAttempting: boolean
    readonly committedTicketsResponse: CommittedTicketsResponse | null
    readonly errorCommittedTickets: AppError | null
}

// RunTicketBuyer
export interface IRunTicketbuyerState {
    readonly runTicketBuyerAttempting: boolean
    readonly runTicketBuyerResponse: RunTicketBuyerResponse | null
    readonly runTicketBuyerError: AppError | null
    readonly isTicketBuyerRunning: boolean
    readonly stopTicketBuyerAttempting: boolean
}

// RevokeTickets
export interface IRevokeTicketsState {
    readonly revokeTicketsAttempting: boolean
    readonly revokeTicketsResponse: RevokeTicketsResponse | null
    readonly errorRevokeTickets: AppError | null
}

// StakingHistory
export interface IStakingHistoryState {
    readonly stakingHistory: StakingHistory | null
    readonly getStakingHistoryError: AppError | null
    readonly getStakingHistoryAttempting: boolean
    readonly selectedTimeframe: ChartTimeframe
}

// StakeDiffHistory
export interface IStakeDiffHistoryState {
    readonly stakediffHistory: StakeDiffHistory | null
    readonly getStakediffHistoryError: AppError | null
    readonly getStakediffHistoryAttempting: boolean
}

export const initialState: ITicketsState &
    ITicketPriceState &
    IAgendasState &
    IGetVoteChoicesState &
    ISetVoteChoicesState &
    IStakeInfoState &
    IPurchaseTicketsState &
    ICommittedTicketsState &
    IRunTicketbuyerState &
    IRevokeTicketsState &
    IStakingHistoryState &
    IStakeDiffHistoryState = {
    // GetTickets
    tickets: [],
    endBlockHeight: 1,
    startBlockHeight: -1,
    targetTicketCount: 0,
    getTicketsAttempting: false,
    errorGetTickets: null,

    // TicketPrice
    ticketPrice: new TicketPrice(),
    getTicketPriceAttempting: false,
    errorTicketPrice: null,

    // Agendas
    agendas: new Agendas(),
    getAgendasAttempting: false,
    errorAgendas: null,

    // VoteChoices
    voteChoicesAttempting: false,
    voteChoicesResponse: null,
    voteChoicesError: null,

    // SetVoteChoices
    setVoteChoicesAttempting: false,
    setVoteChoicesResponse: null,
    setVoteChoicesError: null,

    // StakeInfo
    stakeinfo: new StakeInfo(),
    getStakeInfoAttempting: false,
    errorStakeInfo: null,

    // PurchaseTickets
    purchaseTicketResponse: null,
    purchaseTicketAttempting: false,
    errorPurchaseTickets: null,

    // CommittedTickets
    committedTicketsAttempting: false,
    committedTicketsResponse: null,
    errorCommittedTickets: null,

    // RunTicketBuyer
    runTicketBuyerAttempting: false,
    runTicketBuyerResponse: null,
    runTicketBuyerError: null,
    isTicketBuyerRunning: false,
    stopTicketBuyerAttempting: false,

    // RevokeTickets
    revokeTicketsAttempting: false,
    revokeTicketsResponse: null,
    errorRevokeTickets: null,

    // StakingHistory
    stakingHistory: null,
    getStakingHistoryAttempting: false,
    getStakingHistoryError: null,
    selectedTimeframe: timeframes[2],

    // StakeDiffHistory
    stakediffHistory: null,
    getStakediffHistoryError: null,
    getStakediffHistoryAttempting: false,
}

const stakingSlice = createSlice({
    name: "stakingSlice",
    initialState,
    reducers: {
        // GetTickets
        getTicketsAttempt(state) {
            state.getTicketsAttempting = true
        },
        getTicketsFailed(state, action: PayloadAction<AppError>) {
            state.tickets = []
            state.errorGetTickets = action.payload
            state.getTicketsAttempting = false
        },
        getTicketsSuccess(state, action: PayloadAction<Ticket[]>) {
            state.tickets = action.payload
            state.getTicketsAttempting = false
        },

        // TicketPrice
        getTicketPriceAttempt(state) {
            state.errorTicketPrice = null
            state.getTicketPriceAttempting = true
        },
        getTicketPriceFailed(state, action: PayloadAction<AppError>) {
            state.errorTicketPrice = action.payload
            state.getTicketPriceAttempting = false
        },
        getTicketPriceSuccess(state, action: PayloadAction<TicketPrice>) {
            state.ticketPrice = action.payload
            state.errorTicketPrice = null
            state.getTicketPriceAttempting = false
        },

        // Agendas
        getAgendasAttempt(state) {
            state.errorAgendas = null
            state.getAgendasAttempting = true
        },
        getAgendasFailed(state, action: PayloadAction<AppError>) {
            state.errorAgendas = action.payload
            state.getAgendasAttempting = false
        },
        getAgendasSuccess(state, action: PayloadAction<Agendas>) {
            state.agendas = action.payload
            state.errorAgendas = null
            state.getAgendasAttempting = false
        },

        // VoteChoices
        getVoteChoicesAttempt(state) {
            state.voteChoicesError = null
            state.voteChoicesResponse = null
            state.voteChoicesAttempting = true
        },
        getVoteChoicesFailed(state, action: PayloadAction<AppError>) {
            state.voteChoicesError = action.payload
            state.voteChoicesResponse = null
            state.voteChoicesAttempting = false
        },
        getVoteChoicesSuccess(
            state,
            action: PayloadAction<VoteChoicesResponse>
        ) {
            state.voteChoicesError = null
            state.voteChoicesResponse = action.payload
            state.voteChoicesAttempting = false
        },

        // SetVoteChoices
        setVoteChoicesAttempt(state) {
            state.setVoteChoicesError = null
            state.setVoteChoicesResponse = null
            state.setVoteChoicesAttempting = true
        },
        setVoteChoicesFailed(state, action: PayloadAction<AppError>) {
            state.setVoteChoicesError = action.payload
            state.setVoteChoicesResponse = null
            state.setVoteChoicesAttempting = false
        },
        setVoteChoicesSuccess(
            state,
            action: PayloadAction<SetVoteChoicesResponse>
        ) {
            state.setVoteChoicesError = null
            state.setVoteChoicesResponse = action.payload
            state.setVoteChoicesAttempting = false
        },
        setVoteChoicesCleanup(state) {
            state.setVoteChoicesError = null
            state.setVoteChoicesResponse = null
            state.setVoteChoicesAttempting = false
        },

        // StakeInfo
        getStakeInfoAttempt(state) {
            state.errorStakeInfo = null
            state.getStakeInfoAttempting = true
        },
        getStakeInfoFailed(state, action: PayloadAction<AppError>) {
            state.errorStakeInfo = action.payload
            state.getStakeInfoAttempting = false
        },
        getStakeInfoSuccess(state, action: PayloadAction<StakeInfo>) {
            state.stakeinfo = action.payload
            state.errorStakeInfo = null
            state.getStakeInfoAttempting = false
        },

        // PurchaseTicket
        purchaseTicketAttempt(state) {
            state.errorPurchaseTickets = null
            state.purchaseTicketResponse = null
            state.purchaseTicketAttempting = true
        },
        purchaseTicketFailed(state, action: PayloadAction<AppError>) {
            state.errorPurchaseTickets = action.payload
            state.purchaseTicketResponse = null
            state.purchaseTicketAttempting = false
        },
        purchaseTicketSuccess(
            state,
            action: PayloadAction<PurchaseTicketsResponse>
        ) {
            state.errorPurchaseTickets = null
            state.purchaseTicketResponse = action.payload
            state.purchaseTicketAttempting = false
        },
        purchaseTicketCleanup(state) {
            state.errorPurchaseTickets = null
            state.purchaseTicketResponse = null
            state.purchaseTicketAttempting = false
        },

        // RunTicketBuyer
        runTicketBuyerAttempt(state) {
            state.runTicketBuyerAttempting = true
            state.runTicketBuyerResponse = null
            state.runTicketBuyerError = null
            state.isTicketBuyerRunning = false
        },
        runTicketBuyerFailed(state, action: PayloadAction<AppError>) {
            state.runTicketBuyerAttempting = false
            state.runTicketBuyerResponse = null
            state.runTicketBuyerError = action.payload
            state.isTicketBuyerRunning = false
        },
        runTicketBuyerSuccess(state) {
            state.runTicketBuyerAttempting = false
            state.runTicketBuyerResponse = null
            state.runTicketBuyerError = null
            state.isTicketBuyerRunning = true
        },
        stopTicketBuyerAttempt(state) {
            state.stopTicketBuyerAttempting = true
        },
        stopTicketBuyerSuccess(state) {
            state.runTicketBuyerError = null
            state.isTicketBuyerRunning = false
            state.stopTicketBuyerAttempting = false
        },

        // CommittedTickets
        getCommittedTicketsAttempt(state) {
            state.errorCommittedTickets = null
            state.committedTicketsResponse = null
            state.committedTicketsAttempting = true
        },
        getCommittedTicketsFailed(state, action: PayloadAction<AppError>) {
            state.errorCommittedTickets = action.payload
            state.committedTicketsResponse = null
            state.committedTicketsAttempting = false
        },
        getCommittedTicketsSuccess(
            state,
            action: PayloadAction<CommittedTicketsResponse>
        ) {
            state.errorCommittedTickets = null
            state.committedTicketsResponse = action.payload
            state.committedTicketsAttempting = false
        },

        // RevokeTickets
        revokeExpiredTicketsAttempt(state) {
            state.revokeTicketsAttempting = true
            state.revokeTicketsResponse = null
            state.errorRevokeTickets = null
        },
        revokeExpiredTicketsFailed(state, action: PayloadAction<AppError>) {
            state.revokeTicketsAttempting = false
            state.revokeTicketsResponse = null
            state.errorRevokeTickets = action.payload
        },
        revokeExpiredTicketsSuccess(
            state,
            action: PayloadAction<RevokeTicketsResponse>
        ) {
            state.revokeTicketsAttempting = false
            state.revokeTicketsResponse = action.payload
            state.errorRevokeTickets = null
        },

        // GetStakingHistory
        getStakingHistoryAttempt(state) {
            state.getStakingHistoryAttempting = true
            state.stakingHistory = null
            state.getStakingHistoryError = null
        },
        getStakingHistoryFailed(state, action: PayloadAction<AppError>) {
            state.getStakingHistoryAttempting = false
            state.stakingHistory = null
            state.getStakingHistoryError = action.payload
        },
        getStakingHistorySuccess(state, action: PayloadAction<StakingHistory>) {
            state.getStakingHistoryAttempting = false
            state.stakingHistory = action.payload
            state.getStakingHistoryError = null
        },

        // GetStakingHistory
        getStakediffHistoryAttempt(state) {
            state.stakediffHistory = null
            state.getStakediffHistoryError = null
            state.getStakediffHistoryAttempting = true
        },
        getStakediffHistoryFailed(state, action: PayloadAction<AppError>) {
            state.stakediffHistory = null
            state.getStakediffHistoryError = action.payload
            state.getStakediffHistoryAttempting = false
        },
        getStakediffHistorySuccess(
            state,
            action: PayloadAction<StakeDiffHistory>
        ) {
            state.stakediffHistory = action.payload
            state.getStakediffHistoryError = null
            state.getStakediffHistoryAttempting = false
        },

        //Charts
        setSelectedTimeframe(state, action: PayloadAction<ChartTimeframe>) {
            state.selectedTimeframe = action.payload
        },
    },
})

export const {
    // GetTickets
    getTicketsAttempt,
    getTicketsFailed,
    getTicketsSuccess,

    // TicketPrice
    getTicketPriceAttempt,
    getTicketPriceFailed,
    getTicketPriceSuccess,

    // Agendas
    getAgendasAttempt,
    getAgendasFailed,
    getAgendasSuccess,

    // VoteChoices
    getVoteChoicesAttempt,
    getVoteChoicesFailed,
    getVoteChoicesSuccess,

    // SetVoteChoices
    setVoteChoicesAttempt,
    setVoteChoicesFailed,
    setVoteChoicesSuccess,
    setVoteChoicesCleanup,

    // StakeInfo
    getStakeInfoAttempt,
    getStakeInfoFailed,
    getStakeInfoSuccess,

    // PurchaseTicket
    purchaseTicketAttempt,
    purchaseTicketFailed,
    purchaseTicketSuccess,
    purchaseTicketCleanup,

    // RunTicketBuyer
    runTicketBuyerAttempt,
    runTicketBuyerFailed,
    runTicketBuyerSuccess,
    stopTicketBuyerAttempt,
    stopTicketBuyerSuccess,

    // CommittedTickets
    getCommittedTicketsAttempt,
    getCommittedTicketsFailed,
    getCommittedTicketsSuccess,

    // RevokeTickets
    revokeExpiredTicketsAttempt,
    revokeExpiredTicketsFailed,
    revokeExpiredTicketsSuccess,

    // GetStakingHistory
    getStakingHistoryAttempt,
    getStakingHistoryFailed,
    getStakingHistorySuccess,

    // GetStakediffHistory
    getStakediffHistoryAttempt,
    getStakediffHistoryFailed,
    getStakediffHistorySuccess,

    // Charts
    setSelectedTimeframe,
} = stakingSlice.actions

export default stakingSlice.reducer

// actions
export const loadTicketsAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const {
            getTicketsAttempting: getTicketsRequest,
            startBlockHeight,
            endBlockHeight,
            targetTicketCount,
        } = getState().staking

        if (getTicketsRequest) {
            return
        }
        dispatch(getTicketsAttempt())
        try {
            const resp = await LorcaBackend.fetchTickets(
                startBlockHeight,
                endBlockHeight,
                targetTicketCount
            )
            dispatch(getTicketsSuccess(resp))
        } catch (error) {
            dispatch(getTicketsFailed(error))
        }
    }
}

export const loadTicketPriceAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const {
            getTicketPriceAttempting: getTicketPriceRequest,
        } = getState().staking
        if (getTicketPriceRequest) {
            return
        }

        dispatch(getTicketPriceAttempt())
        try {
            const resp = await LorcaBackend.fetchTicketPrice()
            dispatch(getTicketPriceSuccess(resp))
        } catch (error) {
            dispatch(getTicketPriceFailed(error))
        }
    }
}

export const loadAgendasAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const { getAgendasAttempting: getAgendasRequest } = getState().staking
        if (getAgendasRequest) {
            return
        }

        dispatch(getAgendasAttempt())
        try {
            const resp = await LorcaBackend.fetchAgendas()
            dispatch(getAgendasSuccess(resp))
        } catch (error) {
            dispatch(getAgendasFailed(error))
        }
    }
}

export const getVoteChoices: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const { voteChoicesAttempting } = getState().staking
        if (voteChoicesAttempting) {
            return
        }

        dispatch(getVoteChoicesAttempt())
        try {
            const resp = await LorcaBackend.fetchVoteChoices()
            dispatch(getVoteChoicesSuccess(resp))
        } catch (error) {
            dispatch(getVoteChoicesFailed(error))
        }
    }
}

export const setVoteChoices: ActionCreator<any> = (
    agendaId: string,
    choiceId: string
): AppThunk => {
    return async (dispatch, getState) => {
        const { setVoteChoicesAttempting } = getState().staking
        if (setVoteChoicesAttempting) {
            return
        }

        dispatch(setVoteChoicesAttempt())
        try {
            const resp = await LorcaBackend.setVoteChoices(agendaId, choiceId)
            dispatch(setVoteChoicesSuccess(resp))
            dispatch(getVoteChoices())
            setTimeout(() => {
                dispatch(setVoteChoicesCleanup())
            }, 3000)
        } catch (error) {
            dispatch(setVoteChoicesFailed(error))
        }
    }
}

export const revokeExpiredTickets: ActionCreator<any> = (
    passphrase: string
) => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const { revokeTicketsAttempting } = getState().staking
        if (revokeTicketsAttempting) {
            return
        }
        dispatch(revokeExpiredTicketsAttempt())

        try {
            const resp = await LorcaBackend.revokeExpiredTickets(passphrase)
            dispatch(revokeExpiredTicketsSuccess(resp))
        } catch (error) {
            dispatch(revokeExpiredTicketsFailed(error))
        }
    }
}

export const loadStakeInfoAttempt: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const { getStakeInfoAttempting: getStakeInfoRequest } = getState().staking
        if (getStakeInfoRequest) {
            return
        }

        dispatch(getStakeInfoAttempt())
        try {
            const resp = await LorcaBackend.fetchStakeInfo()
            dispatch(getStakeInfoSuccess(resp))
        } catch (error) {
            dispatch(getStakeInfoFailed(error))
        }
    }
}

export const purchaseTicket: ActionCreator<any> = (
    request: PurchaseTicketsRequest
): AppThunk => {
    return async (dispatch, getState) => {
        const {
            purchaseTicketAttempting: isPurchaseTicketAttempting,
        } = getState().staking
        if (isPurchaseTicketAttempting) {
            return
        }

        dispatch(purchaseTicketAttempt())
        try {
            const resp = await LorcaBackend.purchaseTickets(request)
            dispatch(purchaseTicketSuccess(resp))

            setTimeout(() => {
                dispatch(purchaseTicketCleanup())
            }, 3000)
        } catch (error) {
            dispatch(purchaseTicketFailed(error))
        }
    }
}

export const runTicketBuyer: ActionCreator<any> = (
    request: RunTicketBuyerRequest
): AppThunk => {
    return async (dispatch, getState) => {
        const { runTicketBuyerAttempting } = getState().staking
        if (runTicketBuyerAttempting) {
            return
        }
        dispatch(runTicketBuyerAttempt())

        const onErrorFn = (errorMsg: string) => {
            if (getState().staking.stopTicketBuyerAttempting) {
                dispatch(stopTicketBuyerSuccess())
            } else {
                const err = new AppError(0, errorMsg)
                dispatch(runTicketBuyerFailed(err))
            }
        }
        const onDoneFn = () => {
            dispatch(runTicketBuyerSuccess())
        }
        const onStopFn = () => {
            dispatch(stopTicketBuyerSuccess())
        }

        try {
            await LorcaBackend.runTicketBuyer(
                request,
                onErrorFn,
                onDoneFn,
                onStopFn
            )
        } catch (error) {
            dispatch(runTicketBuyerFailed(error))
        }
    }
}

export const stopTicketBuyer: ActionCreator<any> = (): AppThunk => {
    return async (dispatch, getState) => {
        const { stopTicketBuyerAttempting } = getState().staking
        if (stopTicketBuyerAttempting) {
            return
        }

        dispatch(stopTicketBuyerAttempt())
        try {
            await LorcaBackend.stopTicketBuyer()
            // debugger
        } catch (error) {
            // dispatch(stopTicketBuyerFailed(error))
        }
    }
}

export const loadStakingHistory: ActionCreator<any> = (

): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {

        const { getStakingHistoryAttempting, startBlockHeight, endBlockHeight } = getState().staking
        if (getStakingHistoryAttempting) {
            return
        }
        dispatch(getStakingHistoryAttempt())
        try {
            const resp = await LorcaBackend.getStakingHistory(startBlockHeight, endBlockHeight)
            dispatch(getStakingHistorySuccess(resp))
        } catch (error) {
            dispatch(getStakingHistoryFailed(error))
        }
    }
}


export const loadStakeDiffHistory: ActionCreator<any> = (
    startDate: Moment.Moment,
    endDate?: Moment.Moment
): AppThunk => {
    return async (dispatch: AppDispatch, getState: IGetState) => {
        const { getStakediffHistoryAttempting } = getState().staking
        if (getStakediffHistoryAttempting) {
            return
        }

        const myEndDate = endDate || moment.default()

        dispatch(getStakediffHistoryAttempt())
        try {
            const resp = await LorcaBackend.fetchStakeDiffHistory(
                startDate.unix(),
                myEndDate.unix()
            )
            dispatch(getStakediffHistorySuccess(resp))
        } catch (error) {
            dispatch(getStakediffHistoryFailed(error))
        }
    }
}

export const onTimeFrameChanged: ActionCreator<any> = (timeframe: ChartTimeframe): AppThunk => {
    return async (dispatch: AppDispatch, _) => {
        dispatch(setSelectedTimeframe(timeframe))
    }
}

// selectors
export const getTickets = (state: IApplicationState): Ticket[] => {
    return _.orderBy(
        state.staking.tickets,
        (e) => e.getTx().getTimestamp(),
        "desc"
    )
}

export const getTicketPrice = (state: IApplicationState): TicketPrice => {
    return state.staking.ticketPrice
}

export const getStakingHistory = (state: IApplicationState) => {
    return state.staking.stakingHistory
}

export const getOrderedStakingHistory = (
    state: IApplicationState,
    days: number = 7
): StakingHistory.StakingHistoryLineItem[] => {
    if (getStakingHistory(state) == null) {
        return []
    }
    const startTimestamp = moment.default().subtract(days, "days").unix()
    return _.chain(getStakingHistory(state)?.getLineItemsList())
        .filter((item) => item.getTimestamp() >= startTimestamp)
        .orderBy((item) => item.getTimestamp(), "desc")
        .value()
}

export const getFilteredStakingHistory = (
    state: IApplicationState,
    days: number
): CollectionChain<StakingHistory.StakingHistoryLineItem> => {
    if (getStakingHistory(state) == null) {
        return _.chain(new Array<StakingHistory.StakingHistoryLineItem>())
    }
    const startTimestamp = moment.default().subtract(days, "days").unix()
    return _.chain(getStakingHistory(state)?.getLineItemsList())
        .filter((item) => item.getTimestamp() >= startTimestamp)
}


export const getStakingHistoryAsTimeSeries = (
    state: IApplicationState,
    selectedTimeframe: ChartTimeframe
): TimeSeries => {

    const columns = [
        "txType",
        "rewardCredit",
        "ticketCostCredit",
        "ticketCostDebit",
        "feeDebit",
    ]

    const events = getFilteredStakingHistory(state, selectedTimeframe.days)
        .map((t) => new TimeEvent(
            t.getTimestamp() * 1000,
            _.pick(t.toObject(), columns)
        ))
        .value()

    return new TimeSeries({
        name: "staking-history",
        columns: ["time", ...columns],
        collection: new Collection(events).sortByTime(),
    })
}



export const getStakediffHistory = (state: IApplicationState) => {
    return state.staking.stakediffHistory?.getSdiffValuesList()
}
