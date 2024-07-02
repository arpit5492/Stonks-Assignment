import NavBar from "./components/NavBar";
import HomeComp from "./components/HomeComp";

export const metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="h-screen">
      <NavBar />
      <HomeComp />
    </div>
  );
}
