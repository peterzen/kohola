import _ from "lodash";
import { createSlice, PayloadAction, ActionCreator } from "@reduxjs/toolkit";

import { AppError } from "../../store/types";
import { PurchaseTicketsResponse, PurchaseTicketsRequest, CommittedTicketsResponse } from "../../proto/api_pb";
import { AppThunk, IApplicationState } from "../../store/store";
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
	readonly committedTicketsAttempting: boolean,
	readonly committedTicketsResponse: CommittedTicketsResponse | null
	readonly errorCommittedTickets: AppError | null
}

export const initialState: ITicketsState &
	ITicketPriceState &
	IAgendasState &
	IStakeInfoState &
	IPurchaseTicketsState &
	ICommittedTicketsState = {

	// GetTickets
	tickets: [],
	endBlockHeight: 0,
	startBlockHeight: 1,
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

	// StakeInfo
	getStakeInfoAttempt,
	getStakeInfoFailed,
	getStakeInfoSuccess,

	// PurchaseTicket
	purchaseTicketAttempt,
	purchaseTicketFailed,
	purchaseTicketSuccess,

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
		} catch (error) {
			dispatch(purchaseTicketFailed(error))
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
