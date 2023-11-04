import { Box } from "@mui/material"
import useTheme from "hooks/useTheme"

const ListTable = ({ list }: { list: any[] }) => {
    const { theme } = useTheme()
  return (
    <Box sx={{ boxSizing: 'border-box', padding: '20px', borderRadius: theme.radius.primary, border: theme.border.dashed }}>
        {list?.map((item: any, key: number) => <Item data={item} key={key} />)}
    </Box>
  )
}

const Item = ({ data }: any) => {
    console.log(data)
    return <></>
}

export default ListTable