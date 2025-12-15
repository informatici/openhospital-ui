import { PatientDTOStatusEnum } from '../../../generated/models/PatientDTO';
import { PatientDischarge } from '../../accessories/discharge/PatientDischarge';
import { PatientSummary } from '../../accessories/patientSummary/PatientSummary';
import { usePatient } from '../../activities/patientDetailsActivity/PatientDetailsActivity';
import './styles.scss';

const DischargeDetailsActivityContent = () => {
	const status = usePatient();
	return status?.toString() === PatientDTOStatusEnum.O ? (
		<PatientSummary />
	) : (
		<PatientDischarge />
	);
};

export default DischargeDetailsActivityContent;
