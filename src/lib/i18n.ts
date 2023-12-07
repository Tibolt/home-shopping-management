import { browser } from '$app/environment'
import { init, register, addMessages } from 'svelte-i18n'

const defaultLocale = 'en'

import en from '../i18n/en.json';
import pl from '../i18n/pl.json';

addMessages('en', en);
addMessages('pl', pl);

// register('en', () => import('../i18n/en.json'));
// register('pl', () => import('../i18n/pl.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})