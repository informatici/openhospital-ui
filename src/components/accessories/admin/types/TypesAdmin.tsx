import { sortBy } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '~/libraries/hooks/redux';
import { PATHS } from '../../../../consts';
import SelectField from '../../selectField/SelectField';
import './styles.scss';

type TypeOption = {
	label: string;
	value: string;
};

const DEFAULT_TYPE_OPTION: TypeOption = { label: '', value: '' };

const TypesAdmin = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] =
		useState<TypeOption>(DEFAULT_TYPE_OPTION);
	const mode = useAppSelector((state) => state.types.config.mode);

	const typeOptions: TypeOption[] = useMemo(
		() =>
			sortBy(
				[
					DEFAULT_TYPE_OPTION,
					{ label: t('types.exams'), value: 'exams' },
					{ label: t('types.ages'), value: 'ages' },
					{ label: t('types.vaccines'), value: 'vaccines' },
					{ label: t('types.medicals'), value: 'medicals' },
					{ label: t('types.diseases'), value: 'diseases' },
					{ label: t('types.admissions'), value: 'admissions' },
					{ label: t('types.deliveries'), value: 'deliveries' },
					{ label: t('types.discharges'), value: 'discharges' },
					{ label: t('types.operations'), value: 'operations' },
					{
						label: t('types.deliveryResultType'),
						value: 'deliveryresulttypes',
					},
					{
						label: t('types.pregnantTreatment'),
						value: 'pregnanttreatmenttypes',
					},
				],
				(type) => type.label,
			),
		[t],
	);

	const typeFromUrl = useMemo(
		() =>
			typeOptions.find((typeOption) =>
				typeOption.value?.includes(
					location.pathname.substring(`${PATHS.admin_types_base}/`.length),
				),
			),
		[location, typeOptions],
	);

	useEffect(() => {
		if (
			location.pathname !== PATHS.admin_types_base &&
			location.pathname !== `${PATHS.admin_types_base}/`
		) {
			if (typeFromUrl) {
				setSelectedOption(typeFromUrl);
			} else {
				setSelectedOption(DEFAULT_TYPE_OPTION);
			}
		}
	}, [location, typeOptions, typeFromUrl]);

	const handleTypeChange = useCallback(
		(value: string) => {
			if (value?.length > 0) {
				navigate(`${PATHS.admin_types_base}/${value}`);
			} else {
				navigate(PATHS.admin_types_base);
			}
		},
		[navigate],
	);

	return (
		<>
			{mode === 'manage' && (
				<div className="selectTypeControl">
					<SelectField
						fieldName="selectedType"
						fieldValue={selectedOption?.value}
						label={t('types.selectAType')}
						onChange={handleTypeChange}
						options={typeOptions}
						errorText={''}
						isValid={false}
						onBlur={() => {}}
					/>
				</div>
			)}

			<div className="typeContent">
				<Outlet />
			</div>
		</>
	);
};

export default TypesAdmin;
