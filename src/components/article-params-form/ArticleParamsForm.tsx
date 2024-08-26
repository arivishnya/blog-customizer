import { useState, useRef, Fragment } from 'react';
import { clsx } from 'clsx';

import {
	UserParameters,
	defaultArticleState,
	OptionType,
} from '../../constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

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
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<div ref={rootRef}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside className={clsx(styles.container, { [styles.open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(ev) => {
						ev.preventDefault();
						setIsOpen(false);
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
