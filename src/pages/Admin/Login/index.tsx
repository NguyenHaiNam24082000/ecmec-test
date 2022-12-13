import { loginApi } from '@apis/authenticateApi';
import {
  BackgroundImage,
  Box,
  Button,
  Group,
  Paper,
  Text,
  TextInput,
  PasswordInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'redux/hook';
import { setIsAuth } from 'redux/reducer/auth.slice';

function Login() {
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (value.length ? null : 'Invalid username'),
      password: (value) => (value.length ? null : 'Invalid password'),
    },
  });
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100vw', height: '100vh' }} mx="auto">
      <BackgroundImage
        src="https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
        radius="sm"
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper
          shadow="xs"
          p="md"
          sx={{
            width: '50%',
          }}
        >
          <Text fz={32} fw={700} tt="uppercase" ta="center">
            Login
          </Text>
          <form
            onSubmit={form.onSubmit((values) => {
              loginApi(values).then((response) => {
                localStorage.setItem('token', response.data);
                return dispatch(setIsAuth(true));
              }).then(() => {
                navigate('/admin', { replace: true });
              });
            })}
          >
            <TextInput
              label="Username"
              placeholder="Username"
              {...form.getInputProps('username')}
            />
            <PasswordInput
              mt="md"
              label="Password"
              placeholder="Password"
              {...form.getInputProps('password')}
            />

            <Group position="right" mt="md" grow>
              <Button type="submit">Login</Button>
            </Group>
          </form>
        </Paper>
      </BackgroundImage>
    </Box>
  );
}

export default Login;
