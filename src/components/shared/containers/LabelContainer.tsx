import { SectionContainer } from './SectionContainer'

interface ILocaleDetail {
  label?: String
  children?: any
}

export const LabelDetail = ({ label, children }: ILocaleDetail) => {
  return (
    <SectionContainer
      label={label}
      sx={{
        marginBottom: '20px',
        marginTop: '50px',
        width: '100%',
        '& div': { border: 'none !important' },
      }}
      padding='10px'
    >
      {children}
    </SectionContainer>
  )
}
