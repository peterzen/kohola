


for __CAMELCASE__ in Network Agendas StakeInfo VoteChoices StopAutoBuyer TicketBuyerConfig LoadActiveDataFilters; do

	__UPCASE__=$(echo $__CAMELCASE__|tr '[a-z]' '[A-Z]')
	__LCASE__=$(echo $__CAMELCASE__|tr '[A-Z]' '[a-z]')
	__LCASECAMEL__=_$__CAMELCASE__

	comp="src/components/$__CAMELCASE__"Component.tsx
	storedir=src/store/$__LCASE__
	mkdir -p $storedir
	cp tmpl/actions.ts tmpl/reducers.ts tmpl/types.ts $storedir/
	cp tmpl/component.tsx $comp

	perl -pi -e "s/__CAMELCASE__/$__CAMELCASE__/g" $storedir/* $comp
	perl -pi -e "s/__LCASE__/$__LCASE__/g" $storedir/* $comp
	perl -pi -e "s/__LCASECAMEL__/$__LCASECAMEL__/g" $storedir/* $comp
	perl -pi -e "s/__UPCASE__/$__UPCASE__/g" $storedir/* $comp

	# echo "$__LCASE__: $__CAMELCASE__"State,
	# echo "$__LCASE__: $__LCASE__"InitialState,
	# echo "import $__LCASE__ from './$__LCASE__/reducers'"
	# echo "export class $__CAMELCASE__ extends $__CAMELCASE__"Response {}

done
