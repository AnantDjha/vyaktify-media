import { FrontBanner } from "./landing-component/front-banner"
import SEO from "@/components/seo"

export const LandingPage = () => {
    return (
        <>
            <SEO
                title="Vyaktify Media | Digital Marketing & Web Development Agency"
                description="Vyaktify Media offers premium digital marketing, web development, video production, and branding services to elevate your business."
            />
            <FrontBanner />
        </>
    )
}