import { Stack } from '@mui/material'
import { Layout } from 'components/layouts/Layout'
import Container from 'components/shared/Container'
import SelectInput from 'components/shared/forms/SelectInput'
import { themeMode } from 'contexts/theme/constant'
import useTheme from 'hooks/useTheme'

const index = () => {
  const { changeTheme, mode } = useTheme()
  const handleChangeTheme = (event: any) => {
    changeTheme(event?.target?.value)
  }

  return (
    <Layout>
      <Container>
        <Stack pt={3}>
          <SelectInput
            onChange={handleChangeTheme}
            options={Object.keys(themeMode || {}).map((item) => ({
              value: item,
              label: item,
            }))}
            value={mode || ''}
            label={'Theme'}
          />
        </Stack>
      </Container>
    </Layout>
  )
}

export default index
