import { Box, Dialog, Stack } from '@mui/material'
import useTheme from 'hooks/useTheme'
import { ReactNode } from 'react'

const FormDialog = ({
  isOpen = false,
  onClose,
  list,
  justify = 'center',
  form,
}: {
  isOpen?: boolean
  onClose: () => void
  list?: ReactNode
  justify?: 'end' | 'start' | 'center'
  form: ReactNode
}) => {
  const { theme } = useTheme()
  return (
    <Dialog
      sx={{
        '& div': {
          color: theme.text.secondary,
          fontFamily: theme.font.family,
          fontWeight: theme.font.weight,
        },
        '& .MuiDialog-container': {
          justifyContent: justify,
        },
        '& .MuiDialog-paper': {
          backgroundColor: theme.background.primary,
          minWidth: 'fit-content',
          borderRadius: theme.radius.quaternary,
        },
      }}
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <Stack
        direction={'column'}
        gap={'20px'}
        sx={{
          position: 'relative',
          height: list ? '91vh' : '100%',
          padding: '40px 20px 20px',
        }}
      >
        <Box>{form}</Box>
        <Box>{list}</Box>
      </Stack>
    </Dialog>
  )
}

export default FormDialog
