import { GetMarketChartResponse } from "../proto/walletgui_pb"

const w = window as any

export const ExchangeRateBotBackend = {
    getMarketChart: async (currencyCode: string, days: number) => {
        try {
            const r = await w.exchangerate__GetMarketChart(currencyCode, days)
            if (r.error != undefined) {
                throw r.error
            }
            return GetMarketChartResponse.deserializeBinary(r.payload)
        } catch (e) {
            console.error(e)
            throw e
        }
    },
}
