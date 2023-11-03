import { SectionContainer } from './SectionContainer'

interface ILocaleDetail {
  label?: String
  children?: any
  marginTop?: String
}

export const LabelDetail = ({ label, children, marginTop = '40px' }: ILocaleDetail) => {
  return (
    <SectionContainer
      className='section-container'
      label={label}
      sx={{
        marginBottom: '20px',
        marginTop: marginTop,
        width: '100%',
        '& div': { border: 'none !important' },
      }}
      padding='10px'
    >
      {children}
    </SectionContainer>
  )
}
