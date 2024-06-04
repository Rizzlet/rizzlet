import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "./vecteezy_esoteric-witchcraft-attributes-doodle-set-collection-of_21937338.jpg";
const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section
          className="relative w-full bg-cover bg-no-repeat py-12 md:py-32 lg:py-40"
          style={{ backgroundImage: 'url("Online_Tools.png")' }}
        >
          <div
            className="absolute inset-0 z-0 bg-gradient-to-t from-transparent via-[rgba(0,0,0,0.68)] to-transparent"
            aria-hidden="true"
          ></div>
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10 [&>*]:z-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
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
              className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm 
            transition-colors hover:bg-gray-100 hover:text-gray-900 "
              to="/login"
            >
              Get Started!
            </Link>
          </div>
        </section>
        <section className="w-full bg-gray-800 py-12 md:py-32 lg:py-40">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3 bg-gray-700 p-6 rounded-lg shadow-2xl"> 
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Study Efficiently
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Rizzlet's platform is designed to make studying more efficient
                and effective. Our interactive flashcards allow you to focus on
                the most important concepts, and our spaced repetition algorithm
                ensures that you retain information better over time.
              </p>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-32 lg:py-40">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>

          {/* White overlay */}
          <div className="absolute inset-0 bg-white opacity-50"></div>

          {/* Text container with white bubble background */}
          <div className="relative z-10 grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3 bg-black p-6 rounded-lg shadow-xl">
              <h2 className="text-3xl font-bold tracking-tighter text-gray-50 sm:text-4xl md:text-5xl">
                Personalized Learning
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-50 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                With Rizzlet, you can create your own custom flashcards to match
                your learning style. You can answer your own questions and one's
                that your classmates have made. Each question answered correctly
                moves you up the leaderboard!
              </p>
            </div>
          </div>
        </section>
        
        <section className="grid w-full grid-cols-2-uneven">
          <div className="grid items-center justify-center gap-4 px-4 py-12 text-center md:px-6 md:py-40">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Study. Compete. Succeed.
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Rizzlet lets you create flashcards, test your knowledge, and see
                how you stack up against your peers. It's the fun way to study.
              </p>
            </div>
          </div>
          <div className="w-full py-10 md:py-20 lg:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Leaderboard
              </h2>
              <div className="mt-4 inline-block text-left">
                <div className="flex flex-col items-start space-y-2">
                  <div className="flex items-center space-x-5">
                    <span className="text-2xl font-bold">1.</span>
                    <span className="text-2xl pl-1">Dylan</span>
                    <span className="text-2xl font-bold">2500</span>           
                    <i className="fas fa-crown text-yellow-500"></i>        
                  </div>
                  <div className="flex items-center space-x-5 space-y-1">
                    <span className="text-2xl font-bold">2.</span>
                    <span className="text-2xl pl-1">San</span>
                    <span className="text-2xl font-bold">2000</span>
                  </div>
                  <div className="flex items-center space-x-5 space-y-1">
                    <span className="text-2xl font-bold">3.</span>
                    <span className="text-2xl pl-1">Kevin</span>
                    <span className="text-2xl font-bold">1500</span>
                   
                  </div>
                  <div className="flex items-center space-x-5 space-y-1">
                    <span className="text-2xl font-bold">4.</span>
                    <span className="text-2xl pl-1">Trycia</span>
                    <span className="text-2xl font-bold">1000</span>                    
                  </div>
                  <div className="flex items-center space-x-5 space-y-1">
                    <span className="text-2xl font-bold">5.</span>
                    <span className="text-2xl pl-1">Naomi</span>
                    <span className="text-2xl font-bold">500</span>                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default HomePage;
