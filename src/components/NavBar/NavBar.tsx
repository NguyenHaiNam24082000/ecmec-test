import Logo from '@assets/favicon/logo.png';
import {
  Box,
  Button,
  createStyles,
  Group,
  Navbar,
  ScrollArea,
  SegmentedControl,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    control: {
      fontWeight: 500,
      display: 'block',
      width: '100%',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
      fontSize: theme.fontSizes.sm,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    header: {
      paddingBottom: theme.spacing.md,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      fontWeight: 500,
      display: 'block',
      textDecoration: 'none',
      padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
      paddingLeft: 31,
      marginLeft: 30,
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      borderLeft: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },

    links: {
      marginLeft: -theme.spacing.md,
      marginRight: -theme.spacing.md,
    },

    linksInner: {
      paddingTop: theme.spacing.xl,
      paddingBottom: theme.spacing.xl,
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },
  };
});

export function NavBar() {
  const { t } = useTranslation();
  const { classes, cx } = useStyles();

  const mockData = [
    { label: t('Dashboard') },
    {
      label: t('Apps'),
      initiallyOpened: true,
      links: [
        { label: t('Banner'), link: 'banner' },
        { label: t('About'), link: 'about' },
        { label: t('Partner'), link: 'partner' },
        { label: t('Service'), link: 'service' },
        { label: t('Project'), link: 'project' },
        { label: t('Recruitment'), link: 'recruitment' },
      ],
    },
  ];

  return (
    <Navbar height={'100vh'} width={{ sm: 300 }} p="md">
      <Navbar.Section>
        <Group className={classes.header} position="center">
          <img src={Logo} alt="Logo" className="logo" />
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>
          {!!mockData?.length &&
            mockData.map((item) => (
              <>
                <UnstyledButton className={classes.control}>
                  <Group position="apart" spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box ml="md">{item.label}</Box>
                    </Box>
                  </Group>
                </UnstyledButton>
                {!!item?.links?.length &&
                  item.links.map((item) => (
                    <NavLink
                      className={({ isActive }) =>
                        cx(classes.link, { [classes.linkActive]: isActive })
                      }
                      to={`/admin/${item.link}`}
                      key={item.label}
                    >
                      {/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
                      <span>{item.label}</span>
                    </NavLink>
                  ))}
              </>
            ))}
        </div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Stack>
          <SegmentedControl
            color="blue"
            data={[
              { label: 'Tiếng việt', value: 'vi_VN' },
              { label: 'English', value: 'en_US' },
            ]}
            onChange={i18n.changeLanguage}
          />

          <Button>Logout</Button>
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}
