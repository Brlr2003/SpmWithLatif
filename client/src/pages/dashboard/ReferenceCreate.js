import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
// import { _userList } from '../../_mock';
import { _referenceList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import ReferenceNewEditForm from '../../sections/@dashboard/references/ReferenceNewEditForm';

// ----------------------------------------------------------------------

export default function ReferenceCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentReference = _referenceList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="Create a new Reference">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new reference' : 'Edit reference'}
          links={[
            { name: 'References', href: PATH_DASHBOARD.eCommerce },
            { name: !isEdit ? 'New Reference' : capitalCase(name) },
            // { name: 'User', href: PATH_DASHBOARD.user.list },
          ]}
        />

        <ReferenceNewEditForm isEdit={isEdit} currentReference={currentReference} />
      </Container>
    </Page>
  );
}
