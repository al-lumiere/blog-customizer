import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useMemo } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, type ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [applied, setApplied] = useState<ArticleStateType>(defaultArticleState);

	const [isOpen, setOpen] = useState(false);

	const mainStyle = useMemo(
    () =>
      ({
        '--font-family': applied.fontFamilyOption.value,
        '--font-size': applied.fontSizeOption.value,
        '--font-color': applied.fontColor.value,
        '--container-width': applied.contentWidth.value,
        '--bg-color': applied.backgroundColor.value,
      }) as CSSProperties,
    [applied]
  );

	return (
		<main
			className={clsx(styles.main)}
			style={mainStyle}>
			<ArticleParamsForm
			open={isOpen}
			applied={applied}
			onOpen={() => setOpen(true)}
			onClose={() => setOpen(false)}
			onApply={(next) => {
				setApplied(next);
				setOpen(false);
			}}
			onReset={() => {
				setApplied(defaultArticleState);
				setOpen(false);
			}}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
