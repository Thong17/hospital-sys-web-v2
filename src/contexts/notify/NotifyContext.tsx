import { toast, ToastContainer } from 'react-toastify'
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

export const NotifyContext = createContext({
  ...initState,
  notify: (message: any, type?: TypeOptions) => {},
})

const NotifyProvider = ({ children }: { children: React.ReactNode }) => {
  const notify = (message: any, type?: TypeOptions) => {
    toast(message || 'Internal Server Error', { ...initState, type })
  }

  return (
    <NotifyContext.Provider value={{ ...initState, notify }}>
      {children}
      <ToastContainer className="toast-container" limit={5} newestOnTop />
    </NotifyContext.Provider>
  )
}

export default NotifyProvider
