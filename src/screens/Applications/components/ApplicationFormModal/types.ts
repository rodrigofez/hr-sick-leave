import { Application } from '../../../../types/applications';

export type Props = {
	initialState?: Application;
	isOpen: boolean;
	onComplete: () => void;
	onClose: () => void;
};
