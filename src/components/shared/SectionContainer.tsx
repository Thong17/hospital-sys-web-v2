import useDevice from 'hooks/useDevice'
import useTheme from 'hooks/useTheme'

export const Section = ({ children, label, boxShadow, error, ...props }: any) => {
  const { theme } = useTheme()
  const { device } = useDevice()
  return (
    <div {...props}>
      <div
        style={{
          padding: '30px 20px 20px 20px',
          border: error ? `1px solid ${theme.color.error}77` : theme.border.quaternary,
          borderRadius: theme.radius.secondary,
          position: 'relative',
          boxShadow: boxShadow ?? ''
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: -12,
            backgroundColor: theme.layout.container,
            color: error ? theme.color.error : theme.text.quaternary,
            padding: '2px 8px',
            border: theme.border.quaternary,
            borderRadius: 6,
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
