import { styled } from '@mui/system'
import { Stack } from '@mui/material'
import { IThemeMode } from 'contexts/theme/interface'
import { FOOTER_HEIGHT } from 'constants/layout'

export const CustomFooter = styled(Stack)(
  ({ styled }: { styled: IThemeMode }) => ({
    width: '100%',
    color: styled.text.primary,
    height: FOOTER_HEIGHT,
    backgroundColor: 'blueviolet'
  })
)
