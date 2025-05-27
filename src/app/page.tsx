import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits/Benefits";
import Header from "@/components/Header";
import ProblemSolution from "@/components/ProblemSolution";

const HomePage: React.FC = () => {
  return (
    <>
      <Header />

      <Hero />

      <ProblemSolution />
      <Benefits />
    </>
  );
};

export default HomePage;
