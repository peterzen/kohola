import _ from "lodash";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";

import { AppError, AppThunk, IApplicationState } from "../../store/types";
import { PurchaseTicketsResponse, PurchaseTicketsRequest, CommittedTicketsResponse, VoteChoicesResponse, SetVoteChoicesResponse, RunTicketBuyerResponse, RunTicketBuyerRequest } from "../../proto/api_pb";
import LorcaBackend from "../../datasources/lorca";
import { Ticket, TicketPrice, Agendas, StakeInfo } from "../../models";


// GetTickets
export interface ITicketsState {
	readonly tickets: Ticket[]
	readonly endBlockHeight: number
	readonly startBlockHeight: number
	readonly targetTicketCount: number
	readonly getTicketsRequest: boolean
	readonly errorGetTickets: AppError | null
}

// TicketPrice
export interface ITicketPriceState {
	readonly ticketPrice: TicketPrice
	readonly errorTicketPrice: AppError | null
	readonly getTicketPriceRequest: boolean
}

// Agendas
export interface IAgendasState {
	readonly agendas: Agendas
	readonly errorAgendas: AppError | null
	readonly getAgendasRequest: boolean
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
	readonly getStakeInfoRequest: boolean
}

// PurchaseTickets
export interface IPurchaseTicketsState {
	readonly errorPurchaseTickets: AppError | null
	readonly purchaseTicketResponse: PurchaseTicketsResponse | null
	readonly isPurchaseTicketAttempting: boolean
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

export const initialState: ITicketsState &
	ITicketPriceState &
	IAgendasState &
	IGetVoteChoicesState &
	ISetVoteChoicesState &
	IStakeInfoState &
	IPurchaseTicketsState &
	ICommittedTicketsState &
	IRunTicketbuyerState = {

	// GetTickets
	tickets: [],
	endBlockHeight: 1,
	startBlockHeight: -4,
	targetTicketCount: 0,
	getTicketsRequest: false,
	errorGetTickets: null,

	// TicketPrice
	ticketPrice: new TicketPrice(),
	getTicketPriceRequest: false,
	errorTicketPrice: null,

	// Agendas
	agendas: new Agendas(),
	getAgendasRequest: false,
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
	getStakeInfoRequest: false,
	errorStakeInfo: null,

	// PurchaseTickets
	purchaseTicketResponse: null,
	isPurchaseTicketAttempting: false,
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
}

const stakingSlice = createSlice({
	name: "stakingSlice",
	initialState,
	reducers: {
		// GetTickets
		getTicketsAttempt(state) {
			state.getTicketsRequest = true
		},
		getTicketsFailed(state, action: PayloadAction<AppError>) {
			state.tickets = []
			state.errorGetTickets = action.payload
			state.getTicketsRequest = false
		},
		getTicketsSuccess(state, action: PayloadAction<Ticket[]>) {
			state.tickets = action.payload
			state.getTicketsRequest = false
		},

		// TicketPrice
		getTicketPriceAttempt(state) {
			state.errorTicketPrice = null
			state.getTicketPriceRequest = true
		},
		getTicketPriceFailed(state, action: PayloadAction<AppError>) {
			state.errorTicketPrice = action.payload
			state.getTicketPriceRequest = false
		},
		getTicketPriceSuccess(state, action: PayloadAction<TicketPrice>) {
			state.ticketPrice = action.payload
			state.errorTicketPrice = null
			state.getTicketPriceRequest = false
		},

		// Agendas
		getAgendasAttempt(state) {
			state.errorAgendas = null
			state.getAgendasRequest = true
		},
		getAgendasFailed(state, action: PayloadAction<AppError>) {
			state.errorAgendas = action.payload
			state.getAgendasRequest = false
		},
		getAgendasSuccess(state, action: PayloadAction<Agendas>) {
			state.agendas = action.payload
			state.errorAgendas = null
			state.getAgendasRequest = false
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
		getVoteChoicesSuccess(state, action: PayloadAction<VoteChoicesResponse>) {
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
		setVoteChoicesSuccess(state, action: PayloadAction<SetVoteChoicesResponse>) {
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
			state.getStakeInfoRequest = true
		},
		getStakeInfoFailed(state, action: PayloadAction<AppError>) {
			state.errorStakeInfo = action.payload
			state.getStakeInfoRequest = false
		},
		getStakeInfoSuccess(state, action: PayloadAction<StakeInfo>) {
			state.stakeinfo = action.payload
			state.errorStakeInfo = null
			state.getStakeInfoRequest = false
		},

		// PurchaseTicket
		purchaseTicketAttempt(state) {
			state.errorPurchaseTickets = null
			state.purchaseTicketResponse = null
			state.isPurchaseTicketAttempting = true
		},
		purchaseTicketFailed(state, action: PayloadAction<AppError>) {
			state.errorPurchaseTickets = action.payload
			state.purchaseTicketResponse = null
			state.isPurchaseTicketAttempting = false
		},
		purchaseTicketSuccess(state, action: PayloadAction<PurchaseTicketsResponse>) {
			state.errorPurchaseTickets = null
			state.purchaseTicketResponse = action.payload
			state.isPurchaseTicketAttempting = false
		},
		purchaseTicketCleanup(state) {
			state.errorPurchaseTickets = null
			state.purchaseTicketResponse = null
			state.isPurchaseTicketAttempting = false
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
		getCommittedTicketsSuccess(state, action: PayloadAction<CommittedTicketsResponse>) {
			state.errorCommittedTickets = null
			state.committedTicketsResponse = action.payload
			state.committedTicketsAttempting = false
		},
	}
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

} = stakingSlice.actions

export default stakingSlice.reducer

// actions
export const loadTicketsAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const {
			getTicketsRequest,
			startBlockHeight,
			endBlockHeight,
			targetTicketCount } = getState().staking

		if (getTicketsRequest) {
			return
		}
		dispatch(getTicketsAttempt())
		try {
			const resp = await LorcaBackend.fetchTickets(startBlockHeight, endBlockHeight, targetTicketCount)
			dispatch(getTicketsSuccess(resp))
		}
		catch (error) {
			dispatch(getTicketsFailed(error))
		}
	}
}



export const loadTicketPriceAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {
		const { getTicketPriceRequest } = getState().staking
		if (getTicketPriceRequest) {
			return
		}

		dispatch(getTicketPriceAttempt())
		try {
			const resp = await LorcaBackend.fetchTicketPrice()
			dispatch(getTicketPriceSuccess(resp))
		}
		catch (error) {
			dispatch(getTicketPriceFailed(error))
		}
	}
}

export const loadAgendasAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const { getAgendasRequest } = getState().staking;
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

		const { voteChoicesAttempting } = getState().staking;
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


export const setVoteChoices: ActionCreator<any> = (agendaId: string, choiceId: string): AppThunk => {
	return async (dispatch, getState) => {

		const { setVoteChoicesAttempting } = getState().staking;
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


export const loadStakeInfoAttempt: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const { getStakeInfoRequest } = getState().staking;
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

export const purchaseTicket: ActionCreator<any> = (request: PurchaseTicketsRequest): AppThunk => {
	return async (dispatch, getState) => {

		const { isPurchaseTicketAttempting } = getState().staking;
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


export const runTicketBuyer: ActionCreator<any> = (request: RunTicketBuyerRequest): AppThunk => {
	return async (dispatch, getState) => {

		const { runTicketBuyerAttempting } = getState().staking;
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
			await LorcaBackend.runTicketBuyer(request, onErrorFn, onDoneFn, onStopFn)
		} catch (error) {
			dispatch(runTicketBuyerFailed(error))
		}
	}
}


export const stopTicketBuyer: ActionCreator<any> = (): AppThunk => {
	return async (dispatch, getState) => {

		const { stopTicketBuyerAttempting } = getState().staking;
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



// selectors
export const getTickets = (state: IApplicationState): Ticket[] => {
	return _.orderBy(state.staking.tickets, (e) => e.getTx().getTimestamp(), "desc")
}

export const getTicketPrice = (state: IApplicationState): TicketPrice => {
	return state.staking.ticketPrice
}
