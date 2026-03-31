import { Button, Menu, MenuItem } from '@mui/material';
import { type SyntheticEvent, useCallback, useState } from 'react';
import { usePluginsContext } from '../provider';
import type { Remote } from '../types';

export type PluginMenuProps = {
	onSelect?: (item: Remote) => void;
};

export function PluginMenu({ onSelect }: PluginMenuProps) {
	const { remotes: items } = usePluginsContext();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: SyntheticEvent<HTMLButtonElement>) => {
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
			<Button
				id="plugins-menu-button"
				aria-controls={open ? 'plugins-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				Plugins
			</Button>
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
						{item.name}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
