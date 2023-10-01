import { FC, useState } from 'react';
import Alert from '../Alert/Alert';
import { deviationLabel, highlightSubString } from '../../utils';
import { appStaticLabels } from '../../constants';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

interface AccordionPanelProps {
	service: {
		organisation: String;
		date: String;
		busData: [
			{
				busId: Number;
				routeVariant: String;
				deviationFromTimetable: Number | String;
			}
		];
	};
	idx: Number;
	expanded: String;
	handleAccordionChange: any;
}

const AccordionPanel: FC<AccordionPanelProps> = (props) => {
	const { service, idx, expanded, handleAccordionChange } = props;
	const { organisation, date, busData } = service;

	const {
		sectionHeaders,
		textAreaPlaceholder,
		saveNotesButton,
		confirmSaveMessage,
	} = appStaticLabels;
	const { busId, variant, deviation } = sectionHeaders;

	const savedNote =
		localStorage.getItem(`note${idx}`)?.length > 0
			? localStorage.getItem(`note${idx}`)
			: '';

	const [note, setNote] = useState(savedNote);
	const [message, setMessage] = useState(false);

	function saveNoteHandler() {
		localStorage.setItem(`note${idx}`, note);
		setMessage(true);
		setTimeout(() => {
			setMessage(false);
		}, 2500);
	}
	return (
		<>
			<Accordion
				expanded={expanded === `panel${idx}`}
				onChange={handleAccordionChange(`panel${idx}`)}>
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls={`panel${idx}a-content`}
					id={`panel${idx}a-header`}>
					<strong>{organisation}</strong> - {date}
				</AccordionSummary>
				<AccordionDetails>
					<ul className='flat-list'>
						<li className='list-header'>
							<span>{busId}</span>
							<span>{variant}</span>
							<span>{deviation}</span>
						</li>
						{busData.map((serviceData) => {
							const {
								busId,
								routeVariant,
								deviationFromTimetable,
							} = serviceData;
							const {
								label,
								status,
							}: { label: String; status: string } =
								deviationLabel(deviationFromTimetable);
							const rvLabel = highlightSubString(
								routeVariant,
								0,
								3
							);
							return (
								<li key={busId.toString()}>
									<span>{busId.toString()}</span>
									<span
										dangerouslySetInnerHTML={{
											__html: rvLabel,
										}}></span>
									<span>
										<span className={'status ' + status}>
											{label}
										</span>
									</span>
								</li>
							);
						})}
					</ul>
					<Stack spacing={2}>
						{message && (
							<Alert
								severity={'info'}
								message={confirmSaveMessage}
							/>
						)}
						<textarea
							id={`panel${idx}a-header-notes`}
							placeholder={textAreaPlaceholder}
							onChange={(e) => setNote(e.target.value)}
							defaultValue={note}
						/>
						<button
							className='save-notes-button'
							onClick={saveNoteHandler}>
							{saveNotesButton}
						</button>
					</Stack>
				</AccordionDetails>
			</Accordion>
			<Divider />
		</>
	);
};

export default AccordionPanel;
