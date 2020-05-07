import _ from "lodash"

import { Transaction } from "../../src/middleware/models"


test("new Transaction works", () => {
	const tx = new Transaction()
	expect(tx).toBeTruthy()
})
