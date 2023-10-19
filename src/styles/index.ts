import { styled } from '@mui/system'
import { Button, Stack } from '@mui/material'
import { IThemeMode, IThemeStyle } from 'contexts/theme/interface'
import { FOOTER_HEIGHT } from 'constants/layout'
import { DeviceOptions } from 'contexts/web/interface'

export const CustomButton = styled(Button)(
  ({ styled }: { styled: IThemeStyle }) => ({
    borderRadius: styled.radius.primary,
    boxShadow: styled.shadow.quaternary,
    padding: '5px 10px'
  })
)

export const CustomFooter = styled(Stack)(
  ({ styled }: { styled: IThemeMode }) => ({
    width: '100%',
    color: styled.text.primary,
    height: FOOTER_HEIGHT,
    backgroundColor: styled.layout.container
  })
)

export const CustomPagination = styled('div')(
  ({ styled }: { styled: IThemeStyle }) => ({
    position: 'absolute',
    bottom: 0,
    right: 37,
    height: 40,
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    overflow: 'hidden',
    '& div, & div div svg': {
      color: styled.text.secondary,
    },
  })
)

export const CustomTableContainer = styled('div')(
  ({ styled, device }: { styled: IThemeStyle; device: DeviceOptions }) => ({
    backgroundColor: styled.layout.container,
    '& .table-container': {
      maxWidth: '100%',
      position: 'relative',
      '& .table': {
        paddingBottom: 50,
        overflowX: 'initial',
      },
      '& thead tr': {
        boxShadow: styled.shadow.secondary,
        borderRadius: styled.radius.primary,
        '& th:first-of-type': {
          borderRadius: `${styled.radius.primary} 0 0 ${styled.radius.primary}`,
          overflow: 'hidden',
        },
        '& th:last-of-type': {
          borderRadius: `0 ${styled.radius.primary} ${styled.radius.primary} 0`,
          overflow: 'hidden',
        }
      },
      '& th': {
        backgroundColor: styled.layout.container,
        color: styled.text.primary,
        borderBottom: 0,
        fontWeight: styled.font.weight,
        fontSize: styled.responsive[device]?.text.tertiary,
        padding: '11px 20px',
        wordWrap: 'break-word',
      },
      '& tr td': {
        color: styled.text.secondary,
        borderBottom: styled.border.quaternary,
        fontSize: styled.responsive[device]?.text.tertiary,
        fontWeight: styled.font.weight,
        padding: '11px 20px',
        overflow: 'hidden',
      },
    },
  })
)
