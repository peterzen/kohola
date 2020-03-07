
import * as jspb from "google-protobuf"
import _ from "lodash"

// Updates a member of a collection/list of ProtoBuf message objects and returns the mutated list
export function updateObjectInList<T extends jspb.Message>(list: T[], updatedObject: T, identityAttribute: string): T[] {
	const updatedList = _.filter(
		list,
		(o) => (o.toObject() as any)[identityAttribute] == (updatedObject.toObject() as any)[identityAttribute]
	)
	updatedList.push(updatedObject)
	return updatedList
}
