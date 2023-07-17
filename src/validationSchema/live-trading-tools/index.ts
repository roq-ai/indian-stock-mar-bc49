import * as yup from 'yup';

export const liveTradingToolValidationSchema = yup.object().shape({
  name: yup.string().required(),
  brokerage_id: yup.string().nullable(),
});
