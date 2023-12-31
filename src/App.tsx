import { FC, useState } from 'react';
import useFetch from './customHooks/useFetch';
import { appStaticLabels } from './constants';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Alerts from './Components/Alert/Alert';
import Loader from './Components/Loader/Loader';
import AccordionPanel from './Components/AccordionPanel/AccordionPanel';
import './style.scss';

const App: FC = () => {
	const { data, loading, error } = useFetch('./bus.json');
	const [expanded, setExpanded] = useState('panel0');
	const { sectionTitle } = appStaticLabels;

	const handleAccordionChange = (panel) => (e, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};
	return (
		<>
			<Header />
			<main>
				<h1>{sectionTitle}</h1>
				{error && <Alerts severity={'error'} message={error} />}
				{loading && <Loader />}
				{data?.map((service, idx) => (
					<>
						<AccordionPanel
							key={idx}
							service={service}
							idx={idx}
							expanded={expanded}
							handleAccordionChange={handleAccordionChange}
						/>
					</>
				))}
			</main>
			<Footer />
		</>
	);
};

export default App;