import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';

// ----------------------------------------------------------------------

RHFTextFieldMulti.propTypes = {
  name: PropTypes.string,
};

export default function RHFTextFieldMulti({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField multiline {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}
