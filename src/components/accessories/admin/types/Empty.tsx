import { useTranslation } from 'react-i18next';
import InfoBox from '../../infoBox/InfoBox';

export const Empty = () => {
	const { t } = useTranslation();
	return <InfoBox type="info" message={t('types.chooseATypeToStart')} />;
};
