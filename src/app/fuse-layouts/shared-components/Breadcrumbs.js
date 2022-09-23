import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useLocation, useHistory } from 'react-router-dom';

import Stack from '@mui/material/Stack';

const Breadcrumb = () => {
  const location = useLocation();
  const history = useHistory();
  const pathname = location.pathname
    .split('/')
    .filter((x) => x)
    .pop()
    .split('-')
    .join(' ');
  const linkPath = location.pathname.split('/').filter((x) => x);
  const handleNavigate = (event) => {
    event.preventDefault();
    history.push('/home');
  };

  const breadcrumbs = [
    <Link underline="hover" key="2" color="inherit" href="/home" onClick={handleNavigate}>
      Home
    </Link>,
    linkPath.length > 1 && (
      <Link
        underline="hover"
        key="2"
        color="inherit"
        href={`/${linkPath[0]}`}
        onClick={handleNavigate}
      >
        {linkPath[0]}
      </Link>
    ),
    <Typography key="3" color="text.primary">
      {pathname}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
};
export default Breadcrumb;
