import { FC } from 'react';
const Footer: FC = () => {
	return (
		<footer>
			<p>Copyright {new Date().getFullYear()} Transport for NSW.</p>
		</footer>
	);
};

export default Footer;