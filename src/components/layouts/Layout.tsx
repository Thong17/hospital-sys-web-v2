import { FC, ReactElement } from 'react'
import useTheme from 'hooks/useTheme'
import useWeb from 'hooks/useWeb'

interface ILayout {
  navbar?: ReactElement
  children: ReactElement
}

export const Layout: FC<ILayout> = ({ children }) => {
  const { theme } = useTheme()
  const { device } = useWeb()

  return (
    <div
      style={{
        background: theme.background.primary,
        fontFamily: theme.font.family,
        fontWeight: theme.font.weight,
        fontSize: theme.responsive[device].text.primary,
      }}
    >
      {children}
    </div>
  )
}
