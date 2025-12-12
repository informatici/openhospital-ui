import type { PermissionDTO } from '../../../../../generated';
import { PermissionCheckbox } from './PermissionCheckbox';
import type { PermissionActionEnum } from './permission.utils';

interface IProps {
	permissions: PermissionDTO[];
	groupPermissions: PermissionDTO[];
	onChange: (
		permissions: PermissionDTO[],
		action: PermissionActionEnum,
	) => void;
}

export const AreaAccess = ({
	permissions,
	groupPermissions,
	onChange,
}: IProps) => {
	return (
		<ul>
			{permissions
				.filter(
					(perm: PermissionDTO) => perm.name && /\.access$/.test(perm.name),
				)
				.map((perm) => (
					<li key={perm.name}>
						<PermissionCheckbox
							permission={perm}
							groupPermissions={groupPermissions}
							onChange={onChange}
						/>
					</li>
				))}
		</ul>
	);
};
