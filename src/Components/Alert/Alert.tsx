import { FC } from 'react';

interface AlertProps {
	severity: string;
	message: string;
}

const Alert: FC<AlertProps> = (props) => {
	const { severity, message } = props;
	return (
		<>
			<div className={'alert '+severity}>{message}</div>
		</>
	);
};

export default Alert;
