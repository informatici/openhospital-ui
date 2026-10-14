import {
	DescriptionOutlined,
	ImageOutlined,
	SaveAlt as SaveAltIcon,
	ViewHeadlineOutlined,
} from '@mui/icons-material';
import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
} from '@mui/material';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import type React from 'react';
import { type FunctionComponent, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import './styles.scss';
import type { IOwnProps } from './types';

const DataDownloadButton: FunctionComponent<IOwnProps> = ({
	csvData,
	graphRef,
	title,
}) => {
	const { t } = useTranslation();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleDownloadCSV = () => {
		handleClose();
	};
	// html2canvas + jsPDF are used directly: the previous react-component-export-image wrapper is
	// unmaintained, pins a vulnerable jsPDF and relies on ReactDOM.findDOMNode, removed in React 19
	const handleDownloadPDF = () => {
		handleClose();
		if (!graphRef.current) {
			return;
		}
		html2canvas(graphRef.current).then((canvas) => {
			const pdf = new jsPDF({ orientation: 'l', unit: 'px', format: 'a3' });
			const ratio = Math.min(
				pdf.internal.pageSize.getWidth() / canvas.width,
				pdf.internal.pageSize.getHeight() / canvas.height,
			);
			pdf.addImage(
				canvas.toDataURL('image/png'),
				'PNG',
				0,
				0,
				canvas.width * ratio,
				canvas.height * ratio,
			);
			pdf.save(`${title ?? 'data'}.pdf`);
		});
	};

	const handleDownloadPNG = () => {
		handleClose();
		if (!graphRef.current) {
			return;
		}
		html2canvas(graphRef.current).then((canvas) => {
			const link = document.createElement('a');
			link.download = `${title ?? 'data'}.png`;
			link.href = canvas.toDataURL('image/png');
			link.click();
		});
	};

	return (
		<div
			className="dashboard-download-action"
			onMouseDown={(event) => event.stopPropagation()}
		>
			<IconButton
				aria-controls="download-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<SaveAltIcon />
			</IconButton>
			<Menu
				id="download-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				onClick={(event) => event.stopPropagation()}
			>
				<MenuItem>
					<CSVLink
						className="download-link"
						data={csvData}
						filename={title ?? 'data'}
						onClick={handleDownloadCSV}
					>
						<ListItemIcon>
							<ViewHeadlineOutlined fontSize="small" />
						</ListItemIcon>
						<Typography variant="inherit">{t('dashboard.csv')}</Typography>
					</CSVLink>
				</MenuItem>
				<MenuItem onClick={handleDownloadPDF}>
					<ListItemIcon>
						<DescriptionOutlined fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">{t('dashboard.pdf')}</Typography>
				</MenuItem>
				<MenuItem onClick={handleDownloadPNG}>
					<ListItemIcon>
						<ImageOutlined fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">{t('dashboard.png')}</Typography>
				</MenuItem>
			</Menu>
		</div>
	);
};

export default DataDownloadButton;
