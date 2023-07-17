import * as yup from 'yup';

export const indicatorValidationSchema = yup.object().shape({
  name: yup.string().required(),
  brokerage_id: yup.string().nullable(),
});
