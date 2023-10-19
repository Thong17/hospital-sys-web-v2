import useDevice from 'hooks/useDevice'
import useTheme from 'hooks/useTheme'

interface ISectionContainer  {
    label?: any
    boxShadow?: any
    error?: any
    children: any
    [key: string]: any
}

export const SectionContainer = ({ children, label, boxShadow, error, ...props }: ISectionContainer) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <div {...props}>
      <div
        style={{
          padding: '20px',
          border: error ? `1px solid ${theme.color.error}` : theme.border.quaternary,
          borderRadius: theme.radius.secondary,
          position: 'relative',
          boxShadow: boxShadow ?? ''
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: -16,
            left: 13,
            color: error ? theme.color.error : theme.text.quaternary,
            fontSize: theme.responsive[device]?.text.tertiary
          }}
        >
          {label}
        </span>
        {children}
      </div>
    </div>
  )
}
