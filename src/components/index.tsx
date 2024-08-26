import { CSSProperties, useState } from 'react';

import { Article } from './article/Article';
import { ArticleParamsForm } from './article-params-form/ArticleParamsForm';
import { UserParameters, defaultArticleState } from '../constants/articleProps';

import styles from '../styles/index.module.scss';

const App = () => {
	const [parameters, setParameters] =
		useState<UserParameters>(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': parameters.fontFamilyOption.value,
					'--font-size': parameters.fontSizeOption.value,
					'--font-color': parameters.fontColor.value,
					'--container-width': parameters.contentWidth.value,
					'--bg-color': parameters.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onChangeStyle={(parameters: UserParameters) =>
					setParameters(parameters)
				}
			/>
			<Article />
		</main>
	);
};

export default App;
