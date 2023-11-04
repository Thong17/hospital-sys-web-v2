import { styled } from '@mui/system'
import { Button, IconButton, Stack } from '@mui/material'
import { FOOTER_HEIGHT } from 'constants/layout'
import { DeviceOptions } from 'contexts/web/interface'
import { getTheme } from 'contexts/theme/ThemeContext'
const theme = getTheme()

export const CustomButton = styled(Button)(
  () => ({
    borderRadius: theme.radius.primary,
    boxShadow: theme.shadow.quaternary,
    padding: '5px 10px'
  })
)

export const CustomIconButton = styled(IconButton)(
  () => ({
    borderRadius: theme.radius.primary,
  })
)

export const CustomFooter = styled(Stack)(
  () => ({
    width: '100%',
    color: theme.text.primary,
    height: FOOTER_HEIGHT,
    backgroundColor: theme.layout.footer
  })
)

export const CustomPagination = styled('div')(
  ({ device }: { device: DeviceOptions }) => ({
    position: 'absolute',
    width: '100%',
    bottom: 0,
    right: 0,
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    gap: '10px',
    paddingInline: theme.responsive[device]?.padding.side,
    boxSizing: 'border-box',
    '& .MuiPagination-root ul li button': {
      color: theme.text.secondary,
      backgroundColor: `${theme.text.secondary}11`,
    },
    '& .Mui-selected': {
      backgroundColor: `${theme.text.secondary}22 !important`,
    }
  })
)

export const CustomTableContainer = styled('div')(
  ({ device }: { device: DeviceOptions }) => ({
    backgroundColor: theme.layout.container,
    boxSizing: 'border-box',
    '& .table-container': {
      maxWidth: '100%',
      position: 'relative',
      '& .table': {
        paddingBottom: 50,
        overflowX: 'initial',
      },
      '& thead tr': {
        boxShadow: theme.shadow.quaternary,
        borderRadius: theme.radius.primary,
        '& th:first-of-type': {
          borderRadius: `${theme.radius.primary} 0 0 ${theme.radius.primary}`,
          overflow: 'hidden',
        },
        '& th:last-of-type': {
          borderRadius: `0 ${theme.radius.primary} ${theme.radius.primary} 0`,
          overflow: 'hidden',
        }
      },
      '& th': {
        backgroundColor: theme.layout.navbar,
        color: `${theme.text.primary} !important`,
        borderBottom: 0,
        fontWeight: theme.font.weight,
        fontSize: theme.responsive[device]?.text.tertiary,
        padding: '11px 20px',
        wordWrap: 'break-word',
        '& *': {
          color: `${theme.text.primary} !important`,
        }
      },
      '& tr td': {
        color: theme.text.secondary,
        borderBottom: theme.border.quaternary,
        fontSize: theme.responsive[device]?.text.tertiary,
        fontWeight: theme.font.weight,
        padding: '11px 20px',
        overflow: 'hidden',
      },
    },
  })
)
