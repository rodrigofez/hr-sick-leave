// AnimatedBox.tsx
import styles from './styles.module.scss';

const Skeleton: React.FC = () => {
	return <div className={`${styles.box} ${styles.animated}`}></div>;
};

export default Skeleton;
