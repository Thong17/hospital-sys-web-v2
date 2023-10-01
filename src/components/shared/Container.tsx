import { Box } from "@mui/material"

const Container = ({ children }: { children: any }) => {
  return (
    <Box sx={{ marginTop: '10px' }}>{children}</Box>
  )
}

export default Container