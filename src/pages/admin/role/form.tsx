import { LocaleInput } from 'components/shared/form/LocaleInput'
import { TextInput } from 'components/shared/form/TextInput'
import { SubmitHandler, useForm } from 'react-hook-form'

type RoleForm = {
  name: string
}

const form = () => {
  const { handleSubmit, register } = useForm<RoleForm>()

  const onSubmit: SubmitHandler<RoleForm> = (data) => {
    console.log(data)
  }

  const handleChangeLocaleInput = (data: any) => {
    console.log(data)
  }

  return (
    <form style={{ padding: '50px' }} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('name')}
        label='Name'
        required
      />
      <LocaleInput label='Name' name='name' onChange={handleChangeLocaleInput} error={{ English: { message: 'Is Required' } }} />
    </form>
  )
}

export default form
