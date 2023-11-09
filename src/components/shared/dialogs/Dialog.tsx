import { Dialog } from '@mui/material'
import useTheme from 'hooks/useTheme'

const ContainerDialog = ({ isOpen = false, onClose, children, justify = 'center' }: { isOpen?: boolean, onClose: () => void, children: any, justify?: 'end' | 'start' | 'center' }) => {
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
      {children}
    </Dialog>
  )
}

export default ContainerDialog
