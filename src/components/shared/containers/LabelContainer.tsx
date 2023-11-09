import { SectionContainer } from './SectionContainer'

interface ILocaleDetail {
  label?: String
  children?: any
  marginTop?: String
  marginBottom?: String
}

export const LabelDetail = ({ label, children, marginTop = '40px', marginBottom = '20px' }: ILocaleDetail) => {
  return (
    <SectionContainer
      className='section-container'
      label={label}
      sx={{
        marginBottom,
        marginTop,
        width: '100%',
        '& div': { border: 'none !important' },
      }}
      padding='10px'
    >
      {children}
    </SectionContainer>
  )
}
