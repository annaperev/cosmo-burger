import { ChangeEvent, useState } from 'react';

export const useForm = <T extends { [key: string]: string }>(
	baseForm: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void, () => void] => {
	const [form, setForm] = useState<T>(baseForm);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const element = e.target;
		setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
	};

	const resetForm = () => {
		setForm(baseForm);
	};

	return [form, handleChange, resetForm];
};
