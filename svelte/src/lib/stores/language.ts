// Multi language support system
// We are using a simple system to support multiple languages
// All the data is stored in a single object
// The object is divided into sections
// The content is being accessed by using this single object

import { type Readable, writable, derived, get } from 'svelte/store'

import locales from '$lib/locales'
import { staticContent } from '$lib/schemas'

// * Constants

export const DEFAULT_LANGUAGE = 'en'

export const LANGUAGES = {
  en: {
    key: 'en',
    name: 'English',
    flag: '🇬🇧',
  },
  tr: {
    key: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
  },
}

type language = keyof typeof LANGUAGES

// ------------------------------

// * Stores

export const language = writable<language>(DEFAULT_LANGUAGE)

export const locale: Readable<staticContent> = derived(language, ($language) => {
  // constantly update the locale
  return locales[$language] ?? locales[DEFAULT_LANGUAGE]
})

// ------------------------------

// * Functions

export const setHtmlLang = (lang: language) =>
  typeof document !== 'undefined' && document.documentElement.setAttribute('lang', lang)

// change the html lang attribute to match the language
language.subscribe((lang) => {
  try {
    setHtmlLang(lang)
  } catch (e) {
    console.error('Error setting language', e)
  }
})

export function setLanguage(lang: language) {
  if (LANGUAGES[lang]) {
    language.set(lang)
    setHtmlLang(lang)
  } else {
    console.error('Language not found:', lang)
    language.set(DEFAULT_LANGUAGE)
    setHtmlLang(DEFAULT_LANGUAGE)
  }
}

/**
 * Check if a language is supported, if not return the default language
 */
export async function determineLanguage(requestedLanguage?: string) {
  // if it's a browser, get the language from the browser
  const browserLang =
    typeof navigator !== 'undefined' ? navigator.language.split(',')[0].split('-')[0] : requestedLanguage

  // if the language of the browser is not supported, use the default language
  const lang: language =
    browserLang && Object.keys(LANGUAGES).includes(browserLang) ? (browserLang as language) : DEFAULT_LANGUAGE

  return lang
}

export async function initLanguage(requestedLanguage?: string) {
  const lang: language = await determineLanguage(requestedLanguage)

  setLanguage(lang)
}
