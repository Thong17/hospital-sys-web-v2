import { store, useAppDispatch, useAppSelector } from 'app/store'
import { createContext } from 'react'
import { selectConfig } from 'stores/config/selector'

interface IConfig {
  sidebar: boolean
}

const initState: IConfig = {
  sidebar: !!store.getState()?.config?.sidebar
}
export const ConfigContext = createContext({
  ...initState,
  toggleSidebar: () => {},
})

const ConfigProvider = ({ children }: any) => {
  const { sidebar } = useAppSelector(selectConfig)
  const dispatch = useAppDispatch()

  const toggleSidebar = () => {
    dispatch({ type: 'config/toggleSidebar' })
  }

  return (
    <ConfigContext.Provider value={{ sidebar, toggleSidebar }}>
      {children}
    </ConfigContext.Provider>
  )
}

export default ConfigProvider
