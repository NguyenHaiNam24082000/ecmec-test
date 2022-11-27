import { useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import Logo from '@assets/favicon/logo.png';
import { Link, NavLink } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
    const icon = getRef('icon');
    return {
        header: {
            paddingBottom: theme.spacing.md,
            marginBottom: theme.spacing.md * 1.5,
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        footer: {
            paddingTop: theme.spacing.md,
            marginTop: theme.spacing.md,
            borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
                }`,
        },

        link: {
            ...theme.fn.focusStyles(),
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            fontSize: theme.fontSizes.sm,
            color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
            padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
            borderRadius: theme.radius.sm,
            fontWeight: 500,

            '&:hover': {
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.white : theme.black,

                [`& .${icon}`]: {
                    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
                },
            },
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

const data = [
    { link: 'about', label: 'About' },
    { link: 'service', label: 'Service' },
    { link: 'project', label: 'Project' },
    { link: 'contact', label: 'Contact' },
    { link: 'recruitment', label: 'Recruitment' },
];

export function NavBar() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('');

    const links = data.map((item) => (
        <NavLink
            className={({ isActive }) => cx(classes.link, { [classes.linkActive]: isActive })}
            to={`/admin/${item.link}`}
            key={item.label}
        >
            {/* <item.icon className={classes.linkIcon} stroke={1.5} /> */}
            <span>{item.label}</span>
        </NavLink>
    ));

    return (
        <Navbar height={'100vh'} width={{ sm: 300 }} p="md">
            <Navbar.Section grow>
                <Group className={classes.header} position="center">
                    <img src={Logo} alt="Logo" className="logo" />
                </Group>
                {links}
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    {/* <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} /> */}
                    <span>Change account</span>
                </a>

                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
                    {/* <IconLogout className={classes.linkIcon} stroke={1.5} /> */}
                    <span>Logout</span>
                </a>
            </Navbar.Section>
        </Navbar>
    );
}
