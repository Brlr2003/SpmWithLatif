import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, Typography, FormControlLabel, Divider } from '@mui/material';
// utils
import { fData } from '../../../utils/formatNumber';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// _mock
import { countries } from '../../../_mock';
// components
import Label from '../../../components/Label';
import {
  FormProvider,
  RHFSelect,
  RHFSwitch,
  RHFTextField,
  RHFUploadAvatar,
  RHFTextFieldMulti,
} from '../../../components/hook-form';

// ----------------------------------------------------------------------

ReferenceNewEditForm.propTypes = {
  referral: PropTypes.string,
};

export default function ReferenceNewEditForm({ referral }) {
  referral = referral ? `Referenced by: ${referral}` : '';

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewReferenceSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    references: Yup.string().required('Reference is required'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    status: Yup.string().required('Status is required'),
    comment: Yup.string().required('Comment is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      references: '',
      phoneNumber: '',
      address: '',
      city: '',
      status: '',
      role: '',
      comment: referral || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [referral]
  );

  const methods = useForm({
    resolver: yupResolver(NewReferenceSchema),
    defaultValues,
  });

  const referenceStatus = ['Qualitified', 'Unqualified'];

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const values = watch();

  useEffect(() => {
    if (!referral) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [referral]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar('Create success!');
      navigate(PATH_DASHBOARD.references.list);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {console.log(referral)}
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="name" label="Full Name" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
              <RHFTextField name="address" label="Address" />
              <RHFTextField name="city" label="City" />
              <RHFTextField name="role" label="Profession" />
              <RHFSelect name="status" label="Status" placeholder="Status">
                <option value="" />
                {referenceStatus.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </RHFSelect>
            </Box>
            <RHFTextFieldMulti sx={{ mt: 3 }} name="comment" label="Comment" />

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {'Create Reference'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
