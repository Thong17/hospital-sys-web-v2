import { toast } from 'react-toastify'
import { createContext } from 'react'
import { ToastOptions, TypeOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './Notify.css'

const initState: ToastOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  closeButton: false
}
export const notify = (message: any, type?: TypeOptions) => {
  toast(message || 'Internal Server Error', { ...initState, type })
}

export const NotifyContext = createContext({
  ...initState,
  notify: (_message: any, _type?: TypeOptions) => {},
})

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotifyContext.Provider value={{ ...initState, notify }}>
      {children}
    </NotifyContext.Provider>
  )
}

export default NotifyProvider
