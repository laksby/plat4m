import { useForm } from '@mantine/form';
import { FormValidateInput } from '@mantine/form/lib/types';
import { yupResolver } from 'mantine-form-yup-resolver';
import { useCallback } from 'react';
import * as yup from 'yup';

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required('Email required').email('Invalid email'),
  password: yup.string().required('Password required'),
});

export function useLogin() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema) as FormValidateInput<FormValues>,
  });

  const onSubmit = useCallback((values: FormValues) => {
    // TODO: Implement login
  }, []);

  return {
    form,
    onSubmit,
  };
}
