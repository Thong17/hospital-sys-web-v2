import { Box, BoxProps, InputLabel, Stack, TextFieldProps, styled } from '@mui/material'
import { IThemeStyle } from 'contexts/theme/interface'
import useTheme from 'hooks/useTheme'
import { forwardRef, useEffect, useState } from 'react'
import { TextInput } from './TextInput'

const BoxStyle = styled(Box)(({ styled }: { styled: IThemeStyle }) => ({
  '& .preview-item': {
    height: '70px',
    borderRadius: styled.radius.primary,
    border: styled.border.tertiary,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
    }
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
      {Array.from([...urls || []])?.map((item, key) => <ImageBox key={key} url={item} />)}
    </Stack>
  </BoxStyle>
})

const ImageBox = ({ url }: { url: string | Blob }) => {
  const [file, setFile] = useState<any>(null)

  useEffect(() => {
    if (!url) return
    if (typeof url !== 'object') return setFile(url)
    const reader = new FileReader()
    reader.onloadend = () => {
      setFile(reader.result)
    }
    reader.readAsDataURL(url as Blob)
    return () => {
      setFile(null)
    }
  }, [url])
  
  return <Box className='preview-item'>
    <img src={file} alt={'IMAGE'} loading='lazy' />
  </Box>
}