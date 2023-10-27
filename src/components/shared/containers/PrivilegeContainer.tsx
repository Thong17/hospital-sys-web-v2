import { Box, Stack, Typography } from '@mui/material'
import { translate } from 'contexts/language/LanguageContext'
import { SectionContainer } from './SectionContainer'
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded'
import ItemContainer from './ItemContainer'
import useTheme from 'hooks/useTheme'

const PrivilegeContainer = ({
  navigation = {},
  privilege = {},
}: {
  navigation: any
  privilege: any
}) => {
  const { theme } = useTheme()

  const renderColor = (color: String) => {
    switch (true) {
      case ['list', 'detail'].includes(color as any):
        return theme.color.info

      case ['create'].includes(color as any):
        return theme.color.success

      case ['delete'].includes(color as any):
        return theme.color.error

      case ['update'].includes(color as any):
        return theme.color.warning

      default:
        return theme.color.info
    }
    return
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      {Object.keys(navigation)?.map((nav, key) => {
        return (
          <SectionContainer
            key={key}
            label={`${translate(nav?.toUpperCase())}`}
          >
            <Stack direction={'column'} gap={3} ml={1}>
              {Object.keys(navigation[nav])?.map((sub, key) => {
                return (
                  <Box key={key}>
                    <Stack direction={'row'} gap={1}>
                      <ShortcutRoundedIcon sx={{ transform: 'scaleY(-1)' }} />
                      <Typography sx={{ color: theme.text.tertiary }}>{translate(sub?.toUpperCase())}</Typography>
                    </Stack>
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(140px, 1fr))',
                        padding: '10px 40px',
                        gap: '10px',
                      }}
                    >
                      {Object.keys(privilege[nav]?.[sub] || {}).length > 0 ? Object.keys(privilege[nav]?.[sub] || {}).map(
                        (action, key) => (
                          <ItemContainer
                            text={translate(action.toUpperCase())}
                            key={key}
                            color={renderColor(action)}
                          />
                        )
                      ) : translate('NO_ITEM')}
                    </Box>
                  </Box>
                )
              })}
            </Stack>
          </SectionContainer>
        )
      })}
    </Box>
  )
}

export default PrivilegeContainer
