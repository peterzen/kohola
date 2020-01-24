import _ from "lodash"
import { IApplicationState } from "../types"


export const getAllAccountNumbers = (state: IApplicationState): number[] => {
	return _.keys(state.accounts.accounts)
}
