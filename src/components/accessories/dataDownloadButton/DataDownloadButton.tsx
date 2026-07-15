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
import jsPDF from 'jspdf';
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
	const exportCanvas = async () => {
		if (!graphRef.current) return null;

		return html2canvas(graphRef.current, {
			backgroundColor: '#ffffff',
			scrollY: -window.scrollY,
			useCORS: true,
		});
	};

	const handleDownloadPDF = async () => {
		handleClose();
		const canvas = await exportCanvas();
		if (!canvas) return;

		const orientation = canvas.width > canvas.height ? 'l' : 'p';
		const pdf = new jsPDF({
			orientation,
			unit: 'px',
			format: [canvas.width, canvas.height],
		});
		pdf.addImage(
			canvas.toDataURL('image/png'),
			'PNG',
			0,
			0,
			canvas.width,
			canvas.height,
		);
		pdf.save(`${title ?? 'data'}.pdf`);
	};

	const handleDownloadPNG = async () => {
		handleClose();
		const canvas = await exportCanvas();
		if (!canvas) return;

		const link = document.createElement('a');
		link.href = canvas.toDataURL('image/png');
		link.download = `${title ?? 'data'}.png`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
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
				<MenuItem onClick={() => void handleDownloadPDF()}>
					<ListItemIcon>
						<DescriptionOutlined fontSize="small" />
					</ListItemIcon>
					<Typography variant="inherit">{t('dashboard.pdf')}</Typography>
				</MenuItem>
				<MenuItem onClick={() => void handleDownloadPNG()}>
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
