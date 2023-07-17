import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLiveTradingTool } from 'apiSdk/live-trading-tools';
import { Error } from 'components/error';
import { liveTradingToolValidationSchema } from 'validationSchema/live-trading-tools';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BrokerageInterface } from 'interfaces/brokerage';
import { getBrokerages } from 'apiSdk/brokerages';
import { LiveTradingToolInterface } from 'interfaces/live-trading-tool';

function LiveTradingToolCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LiveTradingToolInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLiveTradingTool(values);
      resetForm();
      router.push('/live-trading-tools');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LiveTradingToolInterface>({
    initialValues: {
      name: '',
      brokerage_id: (router.query.brokerage_id as string) ?? null,
    },
    validationSchema: liveTradingToolValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Live Trading Tool
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BrokerageInterface>
            formik={formik}
            name={'brokerage_id'}
            label={'Select Brokerage'}
            placeholder={'Select Brokerage'}
            fetcher={getBrokerages}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'live_trading_tool',
    operation: AccessOperationEnum.CREATE,
  }),
)(LiveTradingToolCreatePage);
