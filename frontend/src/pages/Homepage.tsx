import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section
          className="w-full py-12 md:py-32 lg:py-40 bg-no-repeat bg-cover relative"
          style={{ backgroundImage: 'url("Online_Tools.png")' }}
        >
          <div
            className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent via-[rgba(0,0,0,0.68)] z-0"
            aria-hidden="true"
          ></div>
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 [&>*]:z-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ace your exams with Rizzlet's interactive flashcards!
              </h2>
              <p className="mx-auto max-w-[700px] text-white md:text-xl/relaxed lg:text-base/relaxed ">
                Study smarter, not harder! Rizzlet can help you master your
                coursework with interactive and engaging flashcards! Compete
                against your classmates and see where you land on the
                leaderboard!
              </p>
            </div>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 shadow-sm text-sm font-medium 
            transition-colors hover:bg-gray-100 hover:text-gray-900"
              to="/login"
            >
              Get Started!
            </Link>
          </div>
        </section>
        <section className="w-full py-12 md:py-32 lg:py-40">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Study Efficiently
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Rizzlet's platform is designed to make studying more efficient
                and effective. Our interactive flashcards allow you to focus on
                the most important concepts, and our spaced repetition algorithm
                ensures that you retain information better over time.
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-32 lg:py-40 bg-gray-100">
          <div
            className="
          grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10"
          >
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Personalized Learning
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                With Rizzlet, you can create your own custom flashcards to match
                your learning style. You can answer your own questions and one's
                that your classmates have made. Each question answered correctly
                answered moves you up the leaderboard!
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-32 lg:py-40">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Study. Compete. Succeed.
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Rizzlet lets you create flashcards, test your knowledge, and see
                how you stack up against your peers. It's the fun way to study.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
