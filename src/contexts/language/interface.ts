import { languages } from "./constant"
export declare type LanguageOptions = 'English' | 'Khmer'

export interface ILanguageContext {
  lang: LanguageOptions
  language: typeof languages.English,
  changeLanguage: Function
}
