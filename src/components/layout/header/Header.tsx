import Image from 'next/image';
import styles from './Header.module.scss'

import logo from '@/assets/obj-logo.png'

const Avatar = () => {
	return (
		<div className={styles.avatar}>
			<b>
				CB
			</b>
		</div>
	);
};

const ExtraContent = () => {
	return (
		<div className={styles.extraContent}>
			<div className={styles.textContainer}>
				<span className={styles.userName}>
					<b>
						João Victor Nascimento
					</b>
				</span>
				<span className={styles.frontTestText}>
					Teste de Front-end
				</span>
			</div>
			<Avatar />
		</div>
	)
};

const Header = () => {
	return (
		<header className={styles.header}>
			<Image
				src={logo}
				alt="obj logo"
				width={100}
				height={30}
			/>
			<ExtraContent/>
		</header>
	);
};

export default Header;