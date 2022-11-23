import Button from '@components/Button/Button';
import { Box, Flex, Image, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  image: string;
  name: string;
  address: string;
  path: string;
}

const ProjectItem = (props: ProjectItemProps) => {
  return (
    <Flex
      gap={20}
      direction={{ base: 'column', md: 'row' }}
      mb={40}
      w="100%"
      justify="center"
      align="flex-start"
    >
      <Link to={`/projects/${props.path}`}>
        <Image radius={20} maw={710} mah={499} mih="100%" src={props.image} alt={props.name} />
      </Link>
      <Box sx={{ width: '50%', '@media (max-width: 600px)': { width: '100%' } }}>
        <Title
          order={1}
          size={48}
          weight={700}
          sx={{
            '@media (max-width: 1400px)': {
              fontSize: 35,
            },
          }}
        >
          {props.name}
        </Title>
        <Text
          size={24}
          fw={400}
          lh={'29px'}
          maw={656}
          mt={24}
          mb={80}
          sx={{
            font: 'Helvetica Neue',
            '@media (max-width: 1400px)': {
              fontSize: 20,
            },
          }}
        >
          <svg
            width={20}
            height={20}
            fill="#B3B3B3"
            style={{ marginRight: 8 }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z" />
          </svg>{' '}
          {props.address}
        </Text>
        <Link to={`/projects/${props.path}`}>
          <Button w={345} h={69}>
            Chi tiết
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default ProjectItem;
