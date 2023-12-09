import { languages } from 'contexts/language/constant'
import { SectionContainer } from '../containers/SectionContainer'
import { Stack, Typography } from '@mui/material'
import useTheme from 'hooks/useTheme'
import useDevice from 'hooks/useDevice'
import ItemContainer from './ItemContainer'

interface ILocaleDetail {
  label?: String
  data?: any
}

export const LocaleDetail = ({ label, data }: ILocaleDetail) => {
  const langs = Object.keys(languages)
  const { theme } = useTheme()
  const { device } = useDevice()

  return (
    <>
      {langs.length > 1 ? (
        <SectionContainer
          label={label}
          sx={{ marginBottom: '20px', marginTop: '40px', width: '100%', '& div': { border: 'none !important' } }}
          padding='10px'
        >
          <Stack
            gap={1}
          >
            {langs.map((language, index) => {
              return (
                <Stack key={index} direction={'row'} alignItems={'center'} gap={1}>
                  <ItemContainer text={language?.substring(0, 2)} />
                  <Typography lineHeight={1} fontSize={theme.responsive[device]?.text.primary}>{data?.[language] || '...'}</Typography>
                </Stack>
              )
            })}
          </Stack>
        </SectionContainer>
      ) : (
        <Stack>
          <Typography>English</Typography>
          <Typography>{data?.['English']}</Typography>
        </Stack>
      )}
    </>
  )
}
