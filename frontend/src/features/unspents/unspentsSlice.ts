import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IUnspentStats {
	fetchUnspentsAttempting: false
	unspentOutputsByAccount:{}
}


const unspentsDisplaySlice = createSlice({
	name: "unspentsDisplay",
	initialState: [],
	reducers: {
		getUnspentOutputs(state, action) {
			const { accountNumber, targetAmount, requiredConfirmations, includeImmature } = action.payload

		}
	}
})
