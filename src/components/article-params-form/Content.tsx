import { FC } from 'react';

import {
	UserParameters,
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from '../../constants/articleProps';

import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import styles from './ArticleParamsForm.module.scss';

interface Content {
	userParameters: UserParameters;
	onChangeParameters: (key: string, value: OptionType) => void;
}

export const Content: FC<Content> = (props) => {
	const { userParameters, onChangeParameters } = props;

	const contents = [
		{
			label: 'шрифт',
			content: (
				<Select
					selected={userParameters.fontFamilyOption}
					options={fontFamilyOptions}
					onChange={(value) => onChangeParameters('fontFamilyOption', value)}
				/>
			),
		},
		{
			content: (
				<RadioGroup
					title={'размер шрифта'}
					selected={userParameters.fontSizeOption}
					options={fontSizeOptions}
					name={userParameters.fontSizeOption.title}
					onChange={(value) => onChangeParameters('fontSizeOption', value)}
				/>
			),
		},
		{
			label: 'цвет шрифта',
			content: (
				<Select
					selected={userParameters.fontColor}
					options={fontColors}
					onChange={(value) => onChangeParameters('fontColor', value)}
				/>
			),
		},
		{
			content: <Separator />,
		},
		{
			label: 'цвет фона',
			content: (
				<Select
					selected={userParameters.backgroundColor}
					options={backgroundColors}
					onChange={(value) => onChangeParameters('backgroundColor', value)}
				/>
			),
		},
		{
			label: 'ширина контента',
			content: (
				<Select
					selected={userParameters.contentWidth}
					options={contentWidthArr}
					onChange={(value) => onChangeParameters('contentWidth', value)}
				/>
			),
		},
	];

	return (
		<>
			{contents.map((content, cIndex) => {
				return (
					<div className={styles.content} key={`content_cIndex`}>
						{content.label && (
							<Text size={12} weight={800} uppercase>
								{content.label}
							</Text>
						)}

						{content.content}
					</div>
				);
			})}
		</>
	);
};
