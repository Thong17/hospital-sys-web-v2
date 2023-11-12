import { Box, BoxProps, InputLabel, Stack, TextFieldProps, styled } from '@mui/material'
import { IThemeStyle } from 'contexts/theme/interface'
import useTheme from 'hooks/useTheme'
import { forwardRef, useEffect, useState } from 'react'
import { TextInput } from './TextInput'
import ImageContainer from '../containers/ImageContainer'
import Loading from '../Loading'

const BoxStyle = styled(Box)(({ styled }: { styled: IThemeStyle }) => ({
  '& .preview-item': {
    height: '70px',
    minWidth: '70px',
    borderRadius: styled.radius.primary,
    border: styled.border.tertiary,
    overflow: 'hidden',
  }
}))

interface IImageInput {
  containerProps: BoxProps
  urls?: string[] | Blob[]
}

type CombinedTextFieldProps = TextFieldProps & IImageInput

export const ImageInput = forwardRef(({ containerProps, urls, ...props }: CombinedTextFieldProps, ref) => {
  const { theme } = useTheme()

  return <BoxStyle styled={theme} {...containerProps}>
    <InputLabel></InputLabel>
    <TextInput type='file' inputRef={ref} InputLabelProps={{ shrink: true }} {...props} />
    <Stack direction={'row'} flexWrap={'wrap'} gap={1} mt={1}>
      {Array.from([...urls || []])?.map((item, key) => <ImageBox key={key} data={item} />)}
    </Stack>
  </BoxStyle>
})

const ImageBox = ({ data }: { data: any | Blob }) => {
  const [file, setFile] = useState<any>(null)

  useEffect(() => {
    if (!data) return
    if (!(data instanceof Blob)) return setFile(data.filename)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(data as Blob)
    return () => {
      setFile(null)
    }
  }, [data])
  
  return <Box className='preview-item'>
    {file ? <ImageContainer url={file} /> : <Loading />}
  </Box>
}