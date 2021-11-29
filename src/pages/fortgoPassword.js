import { styled } from '@material-ui/core/styles';
// Card,
import { Stack, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import { FortgoPasswordForm } from '../components/authentication/login';
// import { fakeAuth } from '../fakeAuth';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 564,
  boxShadow: 0,
  display: 'flex',
  border: 0,
  textAlign: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  verticalAlign: 'middle',
  margin: theme.spacing(0, 0, 5, 7)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  color: '#343F59',
  maxWidth: 580,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle>
      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, color: '#343F59' }}>
            KESHO CONGO
          </Typography>
          <img src="/static/logo/undraw_doctors_hwty.svg" alt="login" />
        </SectionStyle>
      </MHidden>
      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Mot de passe oublié ?
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Renseignez votre adresse mail pour réinitialiser votre mot de passe.
            </Typography>
          </Stack>
          <FortgoPasswordForm />
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
