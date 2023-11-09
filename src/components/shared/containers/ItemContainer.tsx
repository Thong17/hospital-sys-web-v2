import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { IThemeStyle } from 'contexts/theme/interface'
import useTheme from 'hooks/useTheme'

export const CustomBox = styled(Box)(
  ({ styled, color }: { styled: IThemeStyle; color?: any }) => ({
    backgroundColor: `${color ?? styled.color.info}22`,
    color: color ?? styled.color.info,
    padding: '5px 10px',
    borderRadius: styled.radius.primary,
    width: 'fit-content',
    cursor: 'default',
    lineHeight: '1.3',
  })
)

const ItemContainer = ({
  text,
  color,
  ...props
}: {
  text: any
  color?: any
  [key: string]: any
}) => {
  const { theme } = useTheme()
  return (
    <CustomBox styled={theme} color={color} {...props}>
      {text}
    </CustomBox>
  )
}

export default ItemContainer
