import Footer from '@components/Footer/Footer';
import Header from '@components/Header/Header';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import RecruitAdmin from '../pages/Admin/Recruit/Recruit';
import AboutAdmin from '../pages/Admin/About/About';
import ProjectAdmin from '../pages/Admin/Project/Project';
import BannerAdmin from '../pages/Admin/Banner/Banner';
import ServiceAdmin from '../pages/Admin/Service/Service';
import PartnerAdmin from '../pages/Admin/Partner/Partner';
import NotFound from '../pages/NotFound/NotFound';

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
const Dashboard = React.lazy(() => import('../pages/Admin/Dashboard/Dashboard'));
const Login = React.lazy(() => import('../pages/Admin/Login/index'));
const AdminContainer = React.lazy(() => import('../pages/Admin/AdminContainer'));

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
      <Route
        path="/"
        element={
          <div className="container">
            <div className="main">
              <Header />
              <Outlet />
              <Footer />
            </div>
          </div>
        }
      >
        {routes.map((route, i) => (
          <Route path={route.path} element={route.element} key={i} />
        ))}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/banner" element={<BannerAdmin />} />
        <Route path="/admin/about" element={<AboutAdmin />} />
        <Route path="/admin/partner" element={<PartnerAdmin />} />
        <Route path="/admin/project" element={<ProjectAdmin />} />
        <Route path="/admin/service" element={<ServiceAdmin />} />
        <Route path="/admin/recruitment" element={<RecruitAdmin />} />
      </Route>
      {/* <Route
        path="/admin/*"
        element={
          <AdminContainer>
            <Outlet />
          </AdminContainer>
        }
      >
      </Route>
      <Route path="/admin/login" element={<Login />} /> */}
    </Routes>
  );
};

export default Router;
