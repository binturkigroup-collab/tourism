import { Helmet } from "react-helmet-async";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { packages } from "@/data/packages";
import PackageCard from "@/Pages/Site/components/PackageCard";
import TripProps from "@/Interfaces/Site/TripProps";

const Packages: React.FC<{packages: TripProps []}> = ({packages}) => {
  return (
    <>
      <Helmet>
        <title>Tour Packages - Bin Turki Group | Desert Safari & More</title>
        <meta
          name="description"
          content="Explore our tour packages from Standard (1120 AED) to VIP Dream (13000 AED). Desert safaris, city tours, and luxury experiences in UAE."
        />
      </Helmet>

      {/*<Navbar />*/}

      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Packages
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mt-3 mb-6">
                Find Your Perfect{" "}
                <span className="text-gradient-gold">Experience</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                From budget-friendly desert safaris to exclusive VIP journeys,
                discover the package that matches your dream adventure.
              </p>
            </div>
          </div>
        </section>

        {/* Packages Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  featured={pkg.tripPackage === "deluxe"}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/*<Footer />*/}
    </>
  );
};

export default Packages;
