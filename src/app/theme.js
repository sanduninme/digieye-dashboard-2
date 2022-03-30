import { THEMES } from './constants'
import { useLocalStorage } from '../utils/hooks'

const stylesheets = {
  light: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.18.4/antd.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/antd/4.18.4/antd.dark.min.css',
}

const createStylesheetLink = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.id = 'antd-stylesheet'
  document.head.appendChild(link)
  return link
}

const getStylesheetLink = () => document.head.querySelector('#antd-stylesheet') || createStylesheetLink()

const systemTheme = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

export default function useTheme() {
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', systemTheme())

  const setTheme = theme => {
    if (theme !== THEMES.LIGHT && theme !== THEMES.DARK) theme = THEMES.LIGHT
    setStoredTheme(theme)
    getStylesheetLink().href = stylesheets[theme]
  }

  const toggleTheme = () => setTheme(storedTheme === 'dark' ? 'light' : 'dark')

  return { theme: storedTheme, setTheme, toggleTheme }
}
