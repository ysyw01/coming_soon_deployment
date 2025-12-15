import AthleteFooter from "./components/AthleteFooter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-6xl md:text-8xl font-bold font-bruno mb-4 text-primary">
          COMING SOON
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl text-gray-400">
          We are building something extraordinary for athletes and sports enthusiasts. 
          Stay tuned!
        </p>
      </main>
      <AthleteFooter />
    </div>
  );
}
