
import * as jspb from "google-protobuf"
import _ from "lodash"


function filterList<T extends jspb.Message>(list: T[], updatedObject: T, identityAttribute: string) {
	return _.filter(
		list,
		(o) => (o.toObject() as any)[identityAttribute] != (updatedObject.toObject() as any)[identityAttribute]
	)
}

// Updates a member of a collection/list of ProtoBuf message objects and returns the mutated list
export function updateObjectInList<T extends jspb.Message>(list: T[], updatedObject: T, identityAttribute: string): T[] {
	const updatedList = filterList(list, updatedObject, identityAttribute)
	updatedList.push(updatedObject)
	return updatedList
}

// Deletes the specified member of a collection/list of ProtoBuf message objects
export function deleteObjectFromList<T extends jspb.Message>(list: T[], updatedObject: T, identityAttribute: string): T[] {
	return filterList(list, updatedObject, identityAttribute)
}
