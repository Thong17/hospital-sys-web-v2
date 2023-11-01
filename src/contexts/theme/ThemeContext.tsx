import { createContext, useEffect, useMemo, useState } from 'react'
import { ThemeOptions, IThemeContext, IThemeStyle } from './interface'
import { themeMode, themeStyle } from './constant'
import axios from 'configs/axios'
import useNotify from 'hooks/useNotify'
import 'assets/styles/index.css'
import { store, useAppSelector } from 'app/store'
import { selectSession } from 'stores/session/selector'
import { createTheme } from '@mui/material'
import CheckBoxOutlineBlankRoundedIcon from '@mui/icons-material/CheckBoxOutlineBlankRounded'
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded'

const initMode: ThemeOptions = localStorage.getItem('setting-theme') as ThemeOptions || 'Blue'

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
    }
  },
})

export const ThemeContext = createContext<IThemeContext>({
  mode: initMode,
  theme: { ...themeMode[initMode], ...themeStyle },
  changeTheme: (_mode: ThemeOptions) => {},
})

const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector(selectSession)
  const [mode, setMode] = useState<ThemeOptions>(initMode)
  const { notify } = useNotify()

  useEffect(() => {
    const userTheme: ThemeOptions = user?.theme || initMode
    setMode(userTheme)
    localStorage.setItem('setting-theme', userTheme)
  }, [user?.theme])

  const theme = useMemo<IThemeStyle>(() => {
    document.body.style.backgroundColor = themeMode[mode]?.background?.primary
    return { ...themeMode[mode], ...themeStyle }
  }, [mode])

  const changeTheme = async (mode: ThemeOptions) => {
    const response = await axios.post(`/user/theme/change`, { theme: mode })

    if (response?.data?.code !== 'SUCCESS') {
      return notify(response.data.msg, 'error')
    }
    setMode(response.data.theme)
    localStorage.setItem('setting-theme', response.data.theme)
  }

  return (
    <ThemeContext.Provider value={{ mode, theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemesProvider
