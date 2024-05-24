import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, CircularProgress, Icon, IconButton, Stack, Tooltip } from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// mock
import { _invoiceAddressFrom } from '../../../../_mock';
// components
import { FormProvider } from '../../../../components/hook-form';
//
import InvoiceToolbar from '../details/InvoiceToolbar';
import InvoiceNewEditDetails from './InvoiceNewEditDetails';
import InvoiceNewEditAddress from './InvoiceNewEditAddress';
import InvoiceNewEditStatusDate from './InvoiceNewEditStatusDate';
import InvoicePDF from '../details/InvoicePDF';
import Iconify from '../../../../components/Iconify';
// ----------------------------------------------------------------------

InvoiceNewEditForm.propTypes = {
  isEdit: PropTypes.bool,
  currentInvoice: PropTypes.object,
  currentUser: PropTypes.object,
};

export default function InvoiceNewEditForm({ isEdit, currentInvoice, currentUser }) {
  const navigate = useNavigate();

  const [loadingSave, setLoadingSave] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  const NewUserSchema = Yup.object().shape({
    createDate: Yup.string().nullable().required('Create date is required'),
    dueDate: Yup.string().nullable().required('Due date is required'),
    invoiceTo: Yup.mixed().nullable().required('Invoice to is required'),
  });

  const currentDate = new Date();
  const dueDate = new Date(currentDate);
  dueDate.setFullYear(dueDate.getFullYear() + 5);

  const defaultValues = useMemo(
    () => ({
      createDate: currentDate.toDateString(),
      dueDate: dueDate.toDateString(),
      taxes: currentInvoice?.taxes || '',
      status: currentInvoice?.status || 'draft',
      discount: currentInvoice?.discount || '',
      invoiceFrom: currentInvoice?.invoiceFrom || _invoiceAddressFrom[0],
      invoiceTo: currentInvoice?.invoiceTo || null,
      items: currentInvoice?.items || [{ title: '', description: '', service: '', quantity: 0, price: 0, total: 0 }],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentInvoice]
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentInvoice) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentInvoice]);

  const newInvoice = {
    ...values,
    items: values.items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    })),
  };

  const handleSaveAsDraft = async () => {
    setLoadingSave(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSave(true);
      navigate(PATH_DASHBOARD.invoice.list);
      console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateAndSend = async () => {
    setLoadingSend(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      setLoadingSend(false);
      navigate(PATH_DASHBOARD.invoice.list);
      // console.log(JSON.stringify(newInvoice, null, 2));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FormProvider methods={methods}>
      <Card>
        <InvoiceNewEditAddress currentUser={currentUser} />
        <InvoiceNewEditStatusDate />
        <InvoiceNewEditDetails />
      </Card>

      <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ mt: 3 }}>
        <LoadingButton
          size="large"
          variant="contained"
          loading={loadingSend && isSubmitting}
          onClick={handleSubmit(handleCreateAndSend)}
        >
          {isEdit ? 'Update' : 'Print'} & Send
        </LoadingButton>
        {/* <PDFDownloadLink
          document={<InvoicePDF invoice={currentInvoice} />}
          fileName={currentUser.id}
          style={{ textDecoration: 'none' }}
        >
          {({ loading }) => (
            <Tooltip title="Download">
              <IconButton>
                {loading ? <CircularProgress size={24} color="inherit" /> : <Iconify icon={'eva:download-fill'} />}
              </IconButton>
            </Tooltip>
          )}
        </PDFDownloadLink> */}
      </Stack>
    </FormProvider>
  );
}
