import { createContext, useMemo, useState } from 'react'
import { ThemeOptions, IThemeContext, IThemeStyle } from './interface'
import { themeMode, themeStyle } from './constant'
import 'assets/styles/index.css'
import { store } from 'app/store'
import { createTheme } from '@mui/material'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'

const initMode: ThemeOptions = localStorage.getItem('setting-theme') as ThemeOptions || 'Light'

export const getTheme = () => {
  const { session } = store.getState()
  const mode = session.user?.theme || initMode
  return { ...themeMode[mode as ThemeOptions], ...themeStyle }
}
const theme = getTheme()

export const muiTheme = createTheme({
  components: {
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckBoxOutlineBlankRoundedIcon />,
        checkedIcon: <CheckBoxRoundedIcon />,
      },
    },
    MuiTypography: {
      defaultProps: {
        color: theme.text.secondary
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '11px',
          letterSpacing: '1px',
          textAlign: 'justify'
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        IconComponent: ArrowDropDownRoundedIcon
      }
    }
  },
})

export const ThemeContext = createContext<IThemeContext>({
  mode: initMode,
  theme: { ...themeMode[initMode], ...themeStyle },
  changeTheme: (_mode: ThemeOptions) => {},
})

const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeOptions>(initMode)

  const theme = useMemo<IThemeStyle>(() => {
    document.body.style.backgroundColor = themeMode[mode]?.background?.primary
    return { ...themeMode[mode], ...themeStyle }
  }, [mode])

  const changeTheme = async (mode: ThemeOptions) => {
    setMode(mode)
    localStorage.setItem('setting-theme', mode)
  }

  return (
    <ThemeContext.Provider value={{ mode, theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemesProvider
