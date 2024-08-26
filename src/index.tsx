import { StrictMode, CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { UserParameters, defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [parameters, setParameters] =
		useState<UserParameters>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
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
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
