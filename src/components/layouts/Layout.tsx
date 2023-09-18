import { FC, ReactElement } from 'react'
import { Box } from '@mui/material'
import Sidebar from 'components/shared/Sidebar'
import Navbar from 'components/shared/Navbar'
import Container from 'components/shared/Container'

interface ILayout {
  navbar?: ReactElement
  children: ReactElement
}

export const Layout: FC<ILayout> = ({ children }) => {
  return (
    <Box component={'div'}>
      <Sidebar />
      <Box component={'div'}>
        <Navbar />
        <Container>
          {children}
        </Container>
      </Box>
    </Box>
  )
}
