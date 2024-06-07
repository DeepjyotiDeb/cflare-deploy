import { writable } from 'svelte/store';

type TState = '' | 'uploaded';
const createHeaderStore = () => {
	const { subscribe, set } = writable<TState>('');
	return {
		subscribe,
		setState(state: TState) {
			set(state);
		}
	};
};
export const state = createHeaderStore();
