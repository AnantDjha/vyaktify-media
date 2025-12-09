
import './App.css'
import { createBrowserRouter, RouterProvider, } from 'react-router-dom'
import { LandingPage } from './home/landing-page'
import Navbar from './navbar/nab-bar'
import AllSections from './home/landing-component/home'
import ServicesPage from './services/services-page'
import { TempCompo } from './home/landing-component/temp-compo'
import AboutPage from './about/about-us-page'
import ContactPage from './contact/contact-page'
import OurWorksPage from './our-work/our-work-page'
import { AddWorkPage } from './our-work/our-work-form'
import SignUpForm from './forms/register-from'
import LoginForm from './forms/login-form'
import SecretNavbar from './navbar/secret-navbar'
import WorksList from './our-work/our-work-secret-page'
import Footer from './footer/footer'

function App() {

  const router = createBrowserRouter([
    {
      path: '/home',
      element: <><LandingPage /><AllSections /><Navbar /> <Footer /></>,
    },
    {
      path: '/',
      element: <TempCompo />,
    },
    {
      path: '/about',
      element: <><AboutPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/contact',
      element: <><ContactPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/works',
      element: <><OurWorksPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/services',
      element: <><ServicesPage /><Navbar /> <Footer /></>,
    },
    {
      path: '/works-form',
      element: <><AddWorkPage /><SecretNavbar /></>,
    },
    {
      path: '/signup',
      element: <><SignUpForm /><SecretNavbar /></>,
    },
    {
      path: '/login',
      element: <><LoginForm /></>,
    },
    {
      path: '/manage-our-works',
      element: <><WorksList /><SecretNavbar /></>,
    }
  ])

  return (
    <RouterProvider router={router} />
  )

}

export default App
