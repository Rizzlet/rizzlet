import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 py-6 grid gap-4 items-center md:gap-6 lg:grid-cols-[auto-1fr] xl:gap-8 xl:py-10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-green-700 text-gray-50">R</div>
          <div className="space-y-0.5 ml-2">
            <h1 className="text-lg font-bold tracking-tighter">Rizzlet</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Interactive Flashcards</p>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ace your exams with Rizzlet's interactive flashcards!</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed dark:text-gray-400">
                Study smarter, not harder! Rizzlet can help you master your coursework with interactive and engaging flashcards! Compete against your classmates and see where you land on the leaderboard!
                </p>
            </div>
            <Link className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 shadow-sm text-sm font-medium 
            transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800
             dark:hover:text-gray-50 dark:focus-visible:ring-gray-300" 
            to="/login">Get Started!</Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Study Efficiently</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Rizzlet's platform is designed to make studying more efficient and effective. Our interactive flashcards
                allow you to focus on the most important concepts, and our spaced repetition algorithm ensures that you
                retain information better over time.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="
          grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Personalized Learning</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                With Rizzlet, you can create your own custom flashcards to match your learning style. You can answer your own questions and one's that
                your classmates have made. Each question answered correctly answered moves you up the leaderboard!
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Study. Compete. Succeed.</h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Rizzlet lets you create flashcards, test your knowledge, and see how you stack up against your peers.
                It's the fun way to study.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;