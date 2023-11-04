import { languages } from 'contexts/language/constant'
import { SectionContainer } from '../containers/SectionContainer'
import { TextInput } from './TextInput'
import { useEffect, useState } from 'react'

interface ILocaleInput {
    name: string
    label: any
    onChange: (_data: any) => void
    defaultValue?: any
    error?: any
    gridArea?: string
}

export const LocaleInput = ({
  name,
  onChange,
  label,
  defaultValue,
  error,
  gridArea
}: ILocaleInput) => {
  const [localeField, setLocaleField] = useState(defaultValue || {})
  const langs = Object.keys(languages)

  useEffect(() => {
    setLocaleField(defaultValue)
  }, [defaultValue])

  const handleChange = (event: any) => {
    const props = event.target.name.split('.')
    const value = event.target.value

    const newCategory = {
      ...localeField,
      [props[1]]: value,
    }

    setLocaleField(newCategory)
    return onChange(newCategory)
  }

  return (
    <>
      {langs.length > 1 ? (
        <SectionContainer label={label} style={{ width: '100%', gridArea }} padding='30px 20px 20px' error={error}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
              gridGap: 20,
            }}
          >
            {langs.map((language, index) => {
              return (
                <TextInput
                  error={!!error?.[language]?.message}
                  helperText={error?.[language]?.message}
                  onChange={handleChange}
                  key={index}
                  label={language}
                  name={`${name}.${language}`}
                  value={localeField?.[language] || ''}
                  required={language === 'English'}
                />
              )
            })}
          </div>
        </SectionContainer>
      ) : (
        <TextInput
          error={!!error?.[langs[0]]?.message}
          helperText={error?.[langs[0]]?.message}
          onChange={handleChange}
          label={label}
          name={`${name}.${langs[0]}`}
          value={localeField?.[langs[0]] || ''}
        />
      )}
    </>
  )
}
