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
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="/login"
          >
            Login
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default FrontPage;
