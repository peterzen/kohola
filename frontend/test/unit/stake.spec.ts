import _ from "lodash"
import { StakingHistory } from "../../src/proto/walletgui_pb"

import { ChartTimeframe } from "../../src/components/Shared/IntervalChooser"
import { TransactionType } from "../../src/constants"
import moment from "moment"

var m = moment()

// const stakingHistoryRaw = [
//     { timestamp: Number(m.format('X')), rewardCredit: 0.49, ticketCostCredit: 0.12, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.04, ticketCostCredit: 0.78, txType: TransactionType.REVOCATION },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.37, ticketCostCredit: 0.40, txType: TransactionType.TICKET_PURCHASE },

//     { timestamp: Number(m.subtract(1, 'days').format('X')), rewardCredit: 0.82, ticketCostCredit: 0.68, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.29, ticketCostCredit: 0.33, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.10, ticketCostCredit: 0.67, txType: TransactionType.REVOCATION },


//     { timestamp: Number(m.subtract(1, 'days').format('X')), rewardCredit: 0.35, ticketCostCredit: 0.95, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.51, ticketCostCredit: 0.27, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.82, ticketCostCredit: 0.52, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.81, ticketCostCredit: 0.12, txType: TransactionType.REVOCATION },

//     { timestamp: Number(m.subtract(1, 'days').format('X')), rewardCredit: 1.00, ticketCostCredit: 0.24, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.13, ticketCostCredit: 0.49, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.57, ticketCostCredit: 0.08, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.35, ticketCostCredit: 0.38, txType: TransactionType.REVOCATION },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.71, ticketCostCredit: 0.08, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.68, ticketCostCredit: 0.39, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.74, ticketCostCredit: 0.65, txType: TransactionType.TICKET_PURCHASE },

//     { timestamp: Number(m.subtract(1, 'days').format('X')), rewardCredit: 0.03, ticketCostCredit: 0.42, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.83, ticketCostCredit: 0.00, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.83, ticketCostCredit: 0.23, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.11, ticketCostCredit: 0.08, txType: TransactionType.REVOCATION },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.23, ticketCostCredit: 0.89, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.60, ticketCostCredit: 0.50, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 1.00, ticketCostCredit: 0.55, txType: TransactionType.TICKET_PURCHASE },

//     { timestamp: Number(m.subtract(2, 'days').format('X')), rewardCredit: 0.10, ticketCostCredit: 0.17, txType: TransactionType.TICKET_PURCHASE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.06, ticketCostCredit: 0.14, txType: TransactionType.VOTE },
//     { timestamp: Number(m.format('X')), rewardCredit: 0.21, ticketCostCredit: 0.13, txType: TransactionType.TICKET_PURCHASE }
// ]

// const stakingHistory: StakingHistory.StakingHistoryLineItem[] = stakingHistoryRaw.map(item => {
//     const historyLineItem = new StakingHistory.StakingHistoryLineItem()
//     historyLineItem.setTimestamp(item.timestamp)
//     historyLineItem.setRewardCredit(item.rewardCredit)
//     historyLineItem.setTicketCostCredit(item.ticketCostCredit)
//     historyLineItem.setTxType(item.txType)
//     return historyLineItem
// })



// test("aggregateChartDataBy with 1 step works", () => {
//     const timeframe: ChartTimeframe = { days: 7, name: "1 week", windowSize: 1 }
//     const data = getStakingHistoryCountEvents(stakingHistory, timeframe.days);

//     expect(aggregateChartDataBy(timeframe, data, sumTxTypeCountsChartdata)).toEqual(data)
// })

// test("aggregateChartDataBy with 3 step works", () => {
//     m = moment()
//     const timeframe: ChartTimeframe = { days: 7, name: "1 week", windowSize: 3 }
//     const data = getStakingHistoryCountEvents(stakingHistory, timeframe.days);
//     const aggregatedData = aggregateChartDataBy(timeframe, data, sumTxTypeCountsChartdata)
//     const expected = [
//         { timestamp: m.format("L"), voteCounts: 5, purchasedCounts: 2, revocationCounts: 3 },
//         { timestamp: m.subtract(timeframe.windowSize, 'days').format("L"), voteCounts: 4, purchasedCounts: 8, revocationCounts: 2 },
//         { timestamp: m.subtract(timeframe.windowSize, 'days').format("L"), voteCounts: 1, purchasedCounts: 2, revocationCounts: 0 },
//     ].reverse()
//     expect(aggregatedData).toEqual(expected);
// })

// test("getStakingHistoryCountEvents 7 days works", () => {
//     const days = 7
//     m = moment().subtract(days, 'days')
//     expect(getStakingHistoryCountEvents(stakingHistory, days)).toEqual([
//         { timestamp: m.format("L"), voteCounts: 0, purchasedCounts: 0, revocationCounts: 0 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 1, purchasedCounts: 2, revocationCounts: 0 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 0, purchasedCounts: 0, revocationCounts: 0 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 3, purchasedCounts: 3, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 1, purchasedCounts: 5, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 2, purchasedCounts: 1, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 2, purchasedCounts: 0, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 1, purchasedCounts: 1, revocationCounts: 1 }
//     ]);
// });


// test("getStakingHistoryRewardData 7 days works", () => {
//     const days = 7
//     m = moment().subtract(days, 'days')
//     expect(getStakingHistoryRewardData(stakingHistory, days)).toEqual([
//         { timestamp: m.format("L"), sumRewardCredits: 0, rewardPercent: 0 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 0.37, rewardPercent: 0.8409090909090908 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 0, rewardPercent: 0 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 3.6300000000000003, rewardPercent: 1.3183520599250937 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 4.18, rewardPercent: 1.658008658008658 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 2.49, rewardPercent: 0.9032258064516129 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 1.21, rewardPercent: 0.6607142857142856 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 0.9, rewardPercent: 0.6615384615384615 }
//     ]);
// });

// test("getStakingHistoryCountEvents 3 days works", () => {
//     const days = 3
//     m = moment().subtract(days, 'days')
//     expect(getStakingHistoryCountEvents(stakingHistory, days)).toEqual([
//         { timestamp: m.format("L"), voteCounts: 1, purchasedCounts: 5, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 2, purchasedCounts: 1, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 2, purchasedCounts: 0, revocationCounts: 1 },
//         { timestamp: m.add(1, 'days').format("L"), voteCounts: 1, purchasedCounts: 1, revocationCounts: 1 }
//     ]);
// });

// test("getStakingHistoryRewardData 3 days works", () => {
//     const days = 3
//     m = moment().subtract(days, 'days')
//     expect(getStakingHistoryRewardData(stakingHistory, days)).toEqual([
//         { timestamp: m.format("L"), sumRewardCredits: 4.18, rewardPercent: 1.658008658008658 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 2.49, rewardPercent: 0.9032258064516129 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 1.21, rewardPercent: 0.6607142857142856 },
//         { timestamp: m.add(1, 'days').format("L"), sumRewardCredits: 0.9, rewardPercent: 0.6615384615384615 }
//     ]);
// });

// test("aggregateChartDataBy with 7 days and 3 step works", () => {
//     m = moment()
//     const timeframe: ChartTimeframe = { days: 7, name: "1 week", windowSize: 3 }
//     const data = getStakingHistoryRewardData(stakingHistory, timeframe.days);
//     const aggregatedData = aggregateChartDataBy(timeframe, data, sumRewardDataChartdata)
//     const expected = [
//         { timestamp: m.format("L"), sumRewardCredits: 4.6000000000000005, rewardPercent: 2.22547855370436 },
//         { timestamp: m.subtract(timeframe.windowSize, 'days').format("L"), sumRewardCredits: 7.8100000000000005,   rewardPercent: 2.9763607179337517 },
//         { timestamp: m.subtract(timeframe.windowSize, 'days').format("L"), sumRewardCredits: 0.37, rewardPercent: 0.8409090909090908 },
//     ].reverse()
//     expect(aggregatedData).toEqual(expected);
// })
