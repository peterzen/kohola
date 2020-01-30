import * as React from "react";
import { connect } from "react-redux";

import { IApplicationState } from "../../store/types";
import { Agenda } from "../../models";
import { loadAgendasAttempt } from "../../store/staking/actions";
import { IAgendasState } from "../../store/staking/types";


interface AgendasOwnProps {
	// propFromParent: number
}

interface DispatchProps {
	// onSomeEvent: () => void
}

type Props = IAgendasState & DispatchProps & AgendasOwnProps

interface InternalState {
	// internalComponentStateField: string
}


function renderAgenda(agenda: Agenda) {
	return (
		{ agenda }
	)
}

class AgendasComponent extends React.Component<Props, InternalState> {
	render() {
		const agendaList = this.props.agendas.getAgendasList().map(renderAgenda);
		return (
			<div>
				<h4>Agendas v{this.props.agendas.getVersion()}</h4>
				<div>
					{agendaList}
				</div>
			</div>
		)
	}

	componentDidMount() {
		this.props.dispatch(loadAgendasAttempt())
	}

}


const mapStateToProps = (state: IApplicationState, ownProps: AgendasOwnProps): IAgendasState => {
	return {
		agendas: state.staking.agendas,
		errorAgendas: state.staking.errorAgendas,
		getAgendasRequest: state.staking.getAgendasRequest
	};
}
export default connect(mapStateToProps)(AgendasComponent)
