import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import styles from './ArticleParamsForm.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions,
	type ArticleStateType,
	type OptionType
} from 'src/constants/articleProps';

type StateProps = {
  open: boolean;
  applied: ArticleStateType;
  onOpen: () => void;
  onClose: () => void;
  onApply: (next: ArticleStateType) => void;
  onReset: () => void;
};

export const ArticleParamsForm = ({open, applied, onOpen, onClose, onApply, onReset}: StateProps) => {
	const [draft, setDraft] = useState(applied);

	useEffect(() => {
		if (open) setDraft(applied)
	}, [open, applied]);

	const ref = useRef<HTMLElement | null>(null);
	useEffect(() => {
		if (!open) return;
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClick);
		return () => document.removeEventListener('mousedown', handleClick);
	}, [open, onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(draft);
	}

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		onReset();
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
			<ArrowButton isOpen={open} onClick={() => (open ? onClose() : onOpen())} />
			<aside ref={ref} className={`${styles.container} ${open ? styles.container_open : " "}`}>
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
