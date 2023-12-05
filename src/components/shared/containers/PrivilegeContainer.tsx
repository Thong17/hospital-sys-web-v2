import { Box, Stack, Typography } from '@mui/material'
import { translate } from 'contexts/language/LanguageContext'
import { SectionContainer } from './SectionContainer'
import ShortcutRoundedIcon from '@mui/icons-material/ShortcutRounded'
import ItemContainer from './ItemContainer'
import useTheme from 'hooks/useTheme'
import { checkAllFieldObject, renderColor } from 'utils/index'

const PrivilegeContainer = ({
  navigation = {},
  privilege = {},
}: {
  navigation: any
  privilege: any
}) => {
  const { theme } = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      {Object.keys(navigation)?.length > 0 ? (
        Object.keys(navigation)?.map((nav, key) => {
          return (
            <SectionContainer
              key={key}
              label={`${translate(nav?.toUpperCase())}`}
              sx={{
                display: checkAllFieldObject(navigation[nav])
                  ? 'block'
                  : 'none',
              }}
            >
              <Stack direction={'column'} gap={3} ml={1}>
                {Object.keys(navigation[nav])?.map((sub, key) => {
                  return (
                    <Box
                      key={key}
                      sx={{
                        display:
                          Object.keys(privilege[nav]?.[sub] || {}).length > 0 &&
                          checkAllFieldObject(privilege[nav]?.[sub])
                            ? 'block'
                            : 'none',
                      }}
                    >
                      <Stack direction={'row'} gap={1}>
                        <ShortcutRoundedIcon
                          sx={{
                            transform: 'scaleY(-1)',
                            color: theme.text.tertiary,
                          }}
                        />
                        <Typography sx={{ color: theme.text.tertiary }}>
                          {translate(sub?.toUpperCase())}
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns:
                            'repeat(auto-fill, minmax(140px, 1fr))',
                          padding: '10px 40px',
                          gap: '10px',
                        }}
                      >
                        {Object.keys(privilege[nav]?.[sub] || {}).map(
                          (action, key) => (
                            <ItemContainer
                              text={translate(action.toUpperCase())}
                              key={key}
                              color={renderColor(action, theme)}
                              sx={{
                                display: privilege[nav]?.[sub]?.[action]
                                  ? 'block'
                                  : 'none',
                              }}
                            />
                          )
                        )}
                      </Box>
                    </Box>
                  )
                })}
              </Stack>
            </SectionContainer>
          )
        })
      ) : (
        <Typography>{translate('NO_PRIVILEGE')}</Typography>
      )}
    </Box>
  )
}

export default PrivilegeContainer
