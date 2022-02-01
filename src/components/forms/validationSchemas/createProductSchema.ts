import * as yup from 'yup'

export const createProductSchema = yup
  .object({
    name: yup.string().required('Name is required!').min(3, 'Too Short!').max(20, 'Too Long!'),
    price: yup
      .number()
      .typeError('Price must be a number!')
      .required('Price is required!')
      .integer('Price must be an integer!')
      .positive('Price must be a positive number!')
      .max(2147483647, 'Price is too high!'),
    origin: yup.object().shape({
      value: yup.string().required('Origin is required!'),
      label: yup.string().required('Origin is required!'),
    }),
  })
  .required()
