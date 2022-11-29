import { TextInput, Checkbox, Button, Group, Box, Paper, BackgroundImage, Text } from '@mantine/core';
import { useForm } from '@mantine/form';

function Login() {
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },

    validate: {
      username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

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
          alignItems: 'center'
        }}
      >
        <Paper shadow="xs" p="md" sx={{
          width: '50%'
        }}>
          <Text fz={32} fw={700} tt="uppercase" ta="center">Login</Text>
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput label="Username" placeholder="Username" {...form.getInputProps('username')} />
            <TextInput mt="md" label="Password" placeholder="Password" {...form.getInputProps('password')} />

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
