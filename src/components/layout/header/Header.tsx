import styles from './Header.module.scss'
import logo from '../../../assets/obj-logo.png'

function Avatar(){
	return (
		<div 
			className={styles.avatar}
			data-testid="avatar"
		>
			<b>
				CB
			</b>
		</div>
	);
};

function ExtraContent(){
	return (
		<div 
			className={styles.extraContent}
			data-testid="extra-content"
		>
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

export default function Header() {
	return (
		<header 
			className={styles.header}
			data-testid="header"
		>
			<img
				src={logo}
				alt="obj logo"
				width={100}
				height={30}
				data-testid="logo-image-header"
			/>
			<ExtraContent/>
		</header>
	);
};