import { createContext, useEffect, useMemo, useState } from 'react'
import { LanguageOptions, ILanguageContext } from './interface'
import { languages } from './constant'
import useNotify from 'hooks/useNotify'
import axios from 'configs/axios'
import { useAppSelector } from 'app/store'
import { selectSession } from 'stores/session/selector'

const initState: LanguageOptions = 'English'

export const LanguageContext = createContext<ILanguageContext>({
  lang: initState,
  language: languages[initState],
  changeLanguage: (_language: LanguageOptions) => {},
})

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAppSelector(selectSession)
  const [lang, setLang] = useState<LanguageOptions>(user?.language || initState)
  const { notify } = useNotify()

  useEffect(() => {
    const userLang: LanguageOptions = user?.language || initState
    setLang(userLang)
  }, [user?.language])

  const language = useMemo<any>(() => languages[lang], [lang])

  const changeLanguage = async (language: LanguageOptions) => {
    const response = await axios.post(`/user/language/change`, { language })

    if (response?.data?.code !== 'SUCCESS') {
      return notify(response.data.msg, 'error')
    }
    setLang(response.data.language)
  }

  return (
    <LanguageContext.Provider value={{ lang, language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export default LanguageProvider
