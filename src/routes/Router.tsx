import React from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home/Home'));
const Service = React.lazy(() => import('../pages/Service/Service'));
const About = React.lazy(() => import('../pages/About/About'));
const Projects = React.lazy(() => import('../pages/Projects/Projects'));
const Recruit = React.lazy(() => import('../pages/Recruit/Recruit'));
const Contact = React.lazy(() => import('../pages/Contact/Contact'));
const ServiceDetail = React.lazy(() => import('../pages/Service/ServiceDetail/ServiceDetail'));
const AboutDetail = React.lazy(() => import('../pages/About/AboutDetail/AboutDetail'));
const ProjectDetail = React.lazy(() => import('../pages/Projects/ProjectDetail/ProjectDetail'));
const RecruitDetail = React.lazy(() => import('../pages/Recruit/RecruitDetail/RecruitDetail'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/recruitment',
    element: <Recruit />,
  },
  {
    path: '/recruitment/:slug',
    element: <RecruitDetail />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/projects/:slug',
    element: <ProjectDetail />,
  },
  {
    path: '/service',
    element: <Service />,
  },
  {
    path: '/service/:slug',
    element: <ServiceDetail />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/about/:slug',
    element: <AboutDetail />,
  },
];

const Router = () => {
  return (
    <Routes>
      {routes.map((route, i) => (
        <Route path={route.path} element={route.element} key={i} />
      ))}
    </Routes>
  );
};

export default Router;
