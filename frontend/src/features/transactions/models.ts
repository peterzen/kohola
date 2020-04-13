import _ from "lodash"
import { WalletAccount } from "../../middleware/models"
import {
	DecodedTransaction,
	ConstructTransactionResponse,
} from "../../proto/api_pb"
import { ATOMS_DIVISOR } from "../../constants"

interface Output {
	address: string
	amount: number
}
export class AuthoredTransactionMetadata {
	fee: number
	feeRate: number
	decodedTx: DecodedTransaction
	unsignedTx: Uint8Array
	constructedTx: ConstructTransactionResponse | undefined
	sourceAccount: WalletAccount | undefined
	nonChangeAmount: number
	totalInputAmount: number
	totalOutputAmount: number
	nonChangeOutputs: Output[]
	changeOutput: Output | undefined
	estimatedSignedSize: number
	constructor(
		constructedTx: ConstructTransactionResponse,
		decodedTx: DecodedTransaction,
		sourceAccount?: WalletAccount
	) {
		this.decodedTx = decodedTx
		this.sourceAccount = sourceAccount
		this.constructedTx = constructedTx
		this.unsignedTx = constructedTx.getUnsignedTransaction_asU8()
		this.estimatedSignedSize = constructedTx.getEstimatedSignedSize()
		this.totalOutputAmount = constructedTx.getTotalOutputAmount()
		this.fee =
			constructedTx.getTotalPreviousOutputAmount() -
			constructedTx.getTotalOutputAmount()
		this.feeRate = (this.estimatedSignedSize / this.fee) * ATOMS_DIVISOR
		const changeIndex = constructedTx.getChangeIndex()
		const outputs = _.map(this.decodedTx.getOutputsList(), (output) => {
			if (_.first(output.getAddressesList()) == undefined) return null
			return {
				address: _.first(output.getAddressesList()),
				amount: output.getValue(),
			}
		})
		// @ts-ignore
		this.nonChangeOutputs = _.compact(
			_.filter(outputs, (o, idx) => idx != changeIndex)
		)
		// @ts-ignore
		this.changeOutput = _.first(
			_.compact(_.filter(outputs, (o, idx) => idx == changeIndex))
		)
		this.nonChangeAmount = _.reduce(this.nonChangeOutputs, (sum, o) => sum + o.amount, 0)
	}
}
