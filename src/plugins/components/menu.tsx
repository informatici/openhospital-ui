import { Menu, MenuItem } from '@mui/material';
import {
	type ComponentProps,
	type SyntheticEvent,
	useCallback,
	useState,
} from 'react';
import { usePluginsContext } from '../provider';
import type { Remote } from '../types';

export type PluginMenuProps = {
	onSelect?: (item: Remote) => void;
} & Omit<ComponentProps<'div'>, 'onClick' | 'onSelect'>;

export function PluginMenu({ onSelect, ...props }: PluginMenuProps) {
	const { remotes: items } = usePluginsContext();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: SyntheticEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = useCallback(
		(item: Remote) => () => {
			setAnchorEl(null);
			onSelect?.(item);
		},
		[onSelect],
	);

	return (
		<div>
			<div
				id="plugins-menu-button"
				aria-controls={open ? 'plugins-menu' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				{...props}
			>
				Plugins
			</div>
			<Menu
				id="plugins-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						'aria-labelledby': 'plugins-menu-button',
					},
				}}
			>
				{items.map((item) => (
					<MenuItem key={item.name} onClick={handleClose(item)}>
						{item.label}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
