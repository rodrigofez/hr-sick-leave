import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';
import IconButton from '../../../../components/IconButton';

const ActionsCell = ({
	onDelete,
	onEdit,
}: {
	onDelete: () => void;
	onEdit: () => void;
}) => {
	return (
		<div style={{ display: 'flex', gap: '8px' }}>
			<IconButton icon={<Pencil1Icon />} onClick={onEdit} />
			<IconButton variant="danger" icon={<TrashIcon />} onClick={onDelete} />
		</div>
	);
};

export default ActionsCell;
