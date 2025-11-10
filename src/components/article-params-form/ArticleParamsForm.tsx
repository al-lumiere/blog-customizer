import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useClose } from 'src/hooks/useClose'
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions,
	type ArticleStateType,
	type OptionType,
	defaultArticleState
} from 'src/constants/articleProps';

type StateProps = {
  value: ArticleStateType;
	onChange: (next: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ value, onChange}: StateProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [draft, setDraft] = useState(value);

	useEffect(() => {
		if (isMenuOpen) setDraft(value)
	}, [isMenuOpen, value]);

	const ref = useRef<HTMLElement | null>(null);

	const openMenu = () => setIsMenuOpen(true);
	const closeMenu = () => setIsMenuOpen(false);

	useClose({
		isOpen: isMenuOpen,
		onClose: closeMenu,
		rootRef: ref,
	});


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(draft);
		closeMenu;
	}

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onChange(defaultArticleState);
		closeMenu;
	}

	const setFontFamily = (option: OptionType) => {
		setDraft(previous => ({...previous, fontFamilyOption: option}))
	};

	const setFontColor = (option: OptionType) => {
		setDraft(previous => ({...previous, fontColor: option}))
	};

	const setBGColor = (option: OptionType) => {
		setDraft(previous => ({...previous, backgroundColor: option}))
	};

	const setWidth = (option: OptionType) => {
		setDraft(previous => ({...previous, contentWidth: option}))
	};

	const setFontSize = (option: OptionType) => {
		setDraft(previous => ({...previous, fontSizeOption: option}))
	};


	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={() => (isMenuOpen ? closeMenu() : openMenu())} />
			<aside ref={ref} className={clsx(styles.container, {[styles.container_open] : isMenuOpen})}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text children="Задайте параметры" size={31} weight={800} uppercase={true}/>
					<Select title="Шрифт"
					options={fontFamilyOptions}
					selected={draft.fontFamilyOption}
					onChange={setFontFamily}
					/>
					<RadioGroup
					name="font-size"
					options={fontSizeOptions}
					selected = {draft.fontSizeOption}
					onChange={setFontSize}
					title="Размер шрифта"
					/>
					<Select title="Цвет шрифта"
					options={fontColors}
					selected={draft.fontColor}
					onChange={setFontColor}
					/>
					<Separator/>
					<Select title="Цвет фона"
					options={backgroundColors}
					selected={draft.backgroundColor}
					onChange={setBGColor}
					/>
					<Select title="Ширина контента"
					options={contentWidthArr}
					selected={draft.contentWidth}
					onChange={setWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
