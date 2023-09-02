import useTheme from 'hooks/useTheme'

const StrongText = ({ children }: { children: any }) => {
  const { theme } = useTheme()
  return <span style={{ color: theme.color.info, fontWeight: 'bold' }}>{children}</span>
}

export default StrongText
