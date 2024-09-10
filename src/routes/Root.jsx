import NavBar from "../shared/components/NavBar";

export default function Root() {
    return (
        <div className="bg-mobile-landing-page md:bg-desktop-landing-page bg-cover bg-no-repeat h-screen">
            <NavBar />
        </div>
    );
}