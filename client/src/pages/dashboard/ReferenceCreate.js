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
import { _meetingList } from '../../_mock';
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

  const currentReference = _meetingList.find((user) => paramCase(user.name) === name);

  return (
    <Page title={`Create a new Reference `}>
      {console.log(currentReference)}
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'New Reference'}
          links={[
            { name: !name ? 'Dashboard' : capitalCase(name), href: PATH_DASHBOARD.meeting.edit(name) },
            { name: !name ? 'Create a Reference' : `New Reference by ${capitalCase(name)}` },
            // { name: 'User', href: PATH_DASHBOARD.user.list },
          ]}
        />
        <ReferenceNewEditForm referral={name ? capitalCase(name) : ''} />
      </Container>
    </Page>
  );
}
