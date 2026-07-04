import { BioSection } from "@/components/BioSection";
import { ContactsSection } from "@/components/ContactsSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StatementSection } from "@/components/StatementSection";
import { WorksSection } from "@/components/WorksSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <WorksSection />
        <StatementSection />
        <BioSection />
        <ContactsSection />
      </main>
      <Footer />
    </>
  );
}
