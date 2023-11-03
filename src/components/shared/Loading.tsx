import { Box, CircularProgress, styled } from '@mui/material'
import useTheme from 'hooks/useTheme'

export const StyledBox = styled(Box)(({ styled }: any) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  backgroundColor: styled.layout.container,
  opacity: 1000,
}))

const Loading = ({ ...props }: any) => {
  const { theme } = useTheme()
  return (
    <StyledBox styled={theme} {...props}>
      <CircularProgress size={30} />
    </StyledBox>
  )
}

export default Loading
