import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
import useToggle from '../../../../hooks/useToggle';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock';
// components
import Iconify from '../../../../components/Iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';

// ----------------------------------------------------------------------

InvoiceNewEditAddress.propTypes = {
  currentUser: PropTypes.object,
};

export default function InvoiceNewEditAddress({ currentUser }) {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={<Divider flexItem orientation={upMd ? 'vertical' : 'horizontal'} sx={{ borderStyle: 'dashed' }} />}
      sx={{ p: 3 }}
    >
      {console.log(values)}
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            From:
          </Typography>
        </Stack>

        <AddressInfo
          name={'Pure Tech'}
          address={'Epoka University, Tirana, Albania, 1001'}
          phone={'+355 69 293 75 36'}
        />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            To:
          </Typography>
        </Stack>
        <AddressInfo name={currentUser.name} address={currentUser.address} phone={currentUser.phoneNumber} />
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

AddressInfo.propTypes = {
  address: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
};

function AddressInfo({ name, address, phone }) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
