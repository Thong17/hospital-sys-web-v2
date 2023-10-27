export declare type ThemeOptions = 'Light' | 'Dark' | 'Blue' | 'Gray'

export declare type TextOptions = {
  primary: string | number
  secondary?: string | number
  tertiary?: string | number
  quaternary?: string | number
  h5?: string | number
  h4?: string | number
  h3?: string | number
  h2?: string | number
  h1?: string | number
  m5?: string | number
  m4?: string | number
  m3?: string | number
  m2?: string | number
  m1?: string | number
  l5?: string | number
  l4?: string | number
  l3?: string | number
  l2?: string | number
  l1?: string | number
}

export interface IThemeMode {
  layout: {
    container: string,
    sidebar: string,
    navbar: string,
    footer: string
  }
  background: {
    primary: string
    secondary: string
    tertiary?: string
    quaternary?: string
  }
  text: {
    primary: string
    secondary: string
    tertiary?: string
    quaternary?: string
    contrast?: string
  }
  active: {
    primary: string
    secondary: string
    tertiary?: string
    quaternary?: string
  }
  border: {
    primary: string
    secondary: string
    tertiary: string
    quaternary?: string
    dashed?: string
  }
  shadow: {
    container: string
    primary: string
    secondary: string
    tertiary: string
    quaternary: string
    inset: string
    bottom: string
  }
}

export declare type IColorOption = {
  error: string,
  success: string,
  info: string,
  warning: string,
  purple: string,
}

export interface IThemeStyle extends IThemeMode {
  radius: {
    primary: string
    secondary: string
    ternary: string
    quaternary: string
    rounded: string
    circle: string
  }
  font: {
    family: string
    weight: number
  }
  color: IColorOption,
  responsive: {
    mobile: {
      text: TextOptions
    }
    tablet: {
      text: TextOptions
    }
    laptop: {
      text: TextOptions
    }
    desktop: {
      text: TextOptions
    }
  }
}

export interface IThemeContext {
  mode: ThemeOptions
  theme: IThemeStyle
  changeTheme: Function
}
