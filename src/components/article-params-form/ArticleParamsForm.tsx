import { useState, useRef } from 'react';
import { clsx } from 'clsx';

import {
	UserParameters,
	defaultArticleState,
	OptionType,
} from '../../constants/articleProps';
import { useClose } from '../../hooks/useClose';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Content } from './Content';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
	onChangeStyle: (userParameters: UserParameters) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { onChangeStyle } = props;

	const [userParameters, setUserParameters] =
		useState<UserParameters>(defaultArticleState);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useClose({
		isOpen: isMenuOpen,
		onClose: () => setIsMenuOpen(false),
		rootRef,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => {
					setIsMenuOpen(!isMenuOpen);
				}}
			/>
			<aside className={clsx(styles.container, { [styles.open]: isMenuOpen })}>
				<form
					className={styles.form}
					onSubmit={(ev) => {
						ev.preventDefault();
						setIsMenuOpen(false);
						onChangeStyle(userParameters);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Content
						userParameters={userParameters}
						onChangeParameters={(key: string, value: OptionType) => {
							setUserParameters((prevUserParameters) => ({
								...prevUserParameters,
								[key]: value,
							}));
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setUserParameters(defaultArticleState);
								onChangeStyle(defaultArticleState);
							}}
						/>

						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
