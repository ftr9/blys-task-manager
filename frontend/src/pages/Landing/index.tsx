import { CtaSection, Features, Header, Hero } from "./components";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      <Header />
      <Hero />
      <Features />
      <CtaSection />
    </div>
  );
};

export default LandingPage;
