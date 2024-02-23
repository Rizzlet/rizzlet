import React from "react";
import { Link } from "react-router-dom";

const FrontPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 py-6 grid gap-4 items-center md:gap-6 lg:grid-cols-[auto-1fr] xl:gap-8 xl:py-10">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-900 text-gray-50">
            R
          </div>
          <div className="space-y-0.5 ml-2">
            <h1 className="text-lg font-bold tracking-tighter">Rizzlet</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Interactive Flashcards
            </p>
          </div>
        </div>
        <nav className="justify-self-end flex-1 min-w-0 space-x-4">
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/login">Login/Sign Up</Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" to="/">About</Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ace your exams with Rizzlet's interactive flashcards!</h2>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FrontPage;
