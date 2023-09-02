import useWeb from 'hooks/useWeb'
import { FC, ReactElement } from 'react'
import { NAVBAR_HEIGHT } from 'styles/constant'

interface IContainer {
  children: any
  header?: ReactElement
}

const Container: FC<IContainer> = ({ children, header }) => {
  const { width, device } = useWeb()
  const HEADER_HEIGHT = header ? 30 : 0
  const SPACE_TOP = device !== 'mobile' ? 10 : 10
  const MOBILE_HEIGHT = header
    ? `calc(100vh - ${180 + NAVBAR_HEIGHT - HEADER_HEIGHT - SPACE_TOP}px + 20px)`
    : `calc(100vh - ${110 + NAVBAR_HEIGHT - HEADER_HEIGHT - SPACE_TOP}px + 20px)`
  const CONTAINER_HEIGHT = header
    ? `calc(100vh - ${190 + NAVBAR_HEIGHT}px + 60px)`
    : `calc(100vh - ${150 + NAVBAR_HEIGHT}px + 60px)`

  return (
    <>
      {header && <div
        style={{
          padding: width < 1024 ? '0 20px' : '0 100px',
          height: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {header}
      </div>}
      <div
        style={{
          padding: 0,
          margin: width < 1024 ? '0 20px' : '0 50px',
          minHeight: device !== 'mobile' ? CONTAINER_HEIGHT : MOBILE_HEIGHT,
          boxSizing: 'border-box',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </>
  )
}

export default Container
