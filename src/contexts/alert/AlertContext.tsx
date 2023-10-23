import { createContext, useRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { TextInput } from 'components/shared/forms/TextInput'
import { translate } from 'contexts/language/LanguageContext'
import useTheme from 'hooks/useTheme'
import { CustomButton } from 'styles/index'
import { Box } from '@mui/material'

export interface IAlertProps {
  title?: any
  description?: any
  reason?: boolean
  variant?: 'info' | 'warning' | 'error'
}

export const AlertContext = createContext<
  (options: IAlertProps) => Promise<void>
>(Promise.reject)

const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialog, setDialog] = useState<IAlertProps & { open: boolean }>({
    open: false,
  })
  const { theme } = useTheme()
  const reasonRef = useRef(document.createElement('input'))

  const awaitingPromiseRef = useRef<{
    resolve: (data: any) => void
    reject: () => void
  }>()

  const closeDialog = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.reject()
    }
    setDialog({ ...dialog, open: false })
  }

  const confirmDialog = (event: any) => {
    event.preventDefault()
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve({ reason: reasonRef.current?.value })
    }
    setDialog({ ...dialog, open: false })
  }

  const confirm = (props: IAlertProps) => {
    setDialog({ ...props, open: true })

    return new Promise<void>((resolve, reject) => {
      awaitingPromiseRef.current = { resolve, reject }
    })
  }

  return (
    <AlertContext.Provider value={confirm}>
      {children}
      <Dialog
        open={dialog.open}
        onClose={closeDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: theme.radius.ternary,
            minWidth: '400px',
          },
        }}
      >
        <form onSubmit={confirmDialog}>
          <DialogTitle id='alert-dialog-title'>{dialog?.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {dialog?.description}
            </DialogContentText>
            <Box pt={3} sx={{ display: dialog?.reason ? 'block' : 'none' }}>
              <TextInput inputProps={{ ref: reasonRef }} label={translate('DESCRIPTION')} />
            </Box>
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={closeDialog}>
              {translate('CANCEL')}
            </CustomButton>
            <CustomButton
              type='submit'
              variant='contained'
              color={dialog?.variant || 'info'}
              autoFocus
            >
              {translate('CONFIRM')}
            </CustomButton>
          </DialogActions>
        </form>
      </Dialog>
    </AlertContext.Provider>
  )
}

export default AlertProvider
