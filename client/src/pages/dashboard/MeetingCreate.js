import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation, Link as RouterLink } from 'react-router-dom';
// @mui
import { Container, Button } from '@mui/material';
// icons
import Iconify from '../../components/Iconify';
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
import MeetingNewEditForm from '../../sections/@dashboard/meeting/MeetingNewEditForm';

// ----------------------------------------------------------------------

export default function MeetingCreate() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentMeeting = _meetingList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="Create a new meeting">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {isEdit ? (
          <HeaderBreadcrumbs
            heading={!isEdit ? 'Create a new meeting' : 'Edit meeting'}
            links={[
              { name: 'Meetings', href: PATH_DASHBOARD.meeting.list },
              { name: !isEdit ? 'New meeting' : capitalCase(name) },
              // { name: 'User', href: PATH_DASHBOARD.user.list },
            ]}
            action={
              <Button
                variant="outlined"
                component={RouterLink}
                to={isEdit ? PATH_DASHBOARD.references.newReference(paramCase(currentMeeting.name)) : ''}
                startIcon={<Iconify icon={'eva:plus-fill'} />}
              >
                Add Reference
              </Button>
            }
          />
        ) : (
          <HeaderBreadcrumbs
            heading={!isEdit ? 'Create a new meeting' : 'Edit meeting'}
            links={[
              { name: 'Meetings', href: PATH_DASHBOARD.meeting.list },
              { name: !isEdit ? 'New meeting' : capitalCase(name) },
              // { name: 'User', href: PATH_DASHBOARD.user.list },
            ]}
          />
        )}

        <MeetingNewEditForm isEdit={isEdit} currentMeeting={currentMeeting} />
      </Container>
    </Page>
  );
}
