
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
import ScrollToTop from './scroll/scroll'
import NotFound from './endPage/end-page'
import MessageInbox from './message/available-maessage'
import { Helmet } from 'react-helmet-async'

function App() {

  const router = createBrowserRouter([
    {
      path: '/home',
      element: <><ScrollToTop /><LandingPage /><AllSections /><Navbar /> <Footer /></>,
    },
    {
      path: '/',
      element: <><ScrollToTop /> <TempCompo /></>,
    },
    {
      path: '/about',
      element: <><ScrollToTop /><AboutPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/contact',
      element: <><ScrollToTop /><ContactPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/works',
      element: <><ScrollToTop /><OurWorksPage /> <Navbar /> <Footer /></>,
    },
    {
      path: '/services',
      element: <><ScrollToTop /><ServicesPage /><Navbar /> <Footer /></>,
    },
    {
      path: '/works-form',
      element: <><ScrollToTop /><AddWorkPage /><SecretNavbar /></>,
    },
    {
      path: '/signup',
      element: <><ScrollToTop /><SignUpForm /><SecretNavbar /></>,
    },
    {
      path: '/login',
      element: <><ScrollToTop /><LoginForm /></>,
    },
    {
      path: '/manage-our-works',
      element: <><ScrollToTop /><WorksList /><SecretNavbar /></>,
    },
    {
      path: '/my-cusomer-messages',
      element: <><ScrollToTop /><MessageInbox /><SecretNavbar /></>,
    },
    {
      path: "/*",
      element: <><NotFound /><Navbar /></>
    }
  ])

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vyaktify Media",
            "url": "https://vyaktifymedia.com",
            "logo": "https://vyaktifymedia.com/favicon.ico"
          })}
        </script>
      </Helmet>
      <RouterProvider router={router} />
    </>
  )

}

export default App
