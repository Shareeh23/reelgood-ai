"use client";

import { useState } from "react";

const movies = [
  {
    title: "Dune: Part Two",
    year: 2024,
    genre: "Sci-Fi · Adventure",
    rating: "8.5",
  },
  { title: "Past Lives", year: 2023, genre: "Romance · Drama", rating: "7.8" },
  {
    title: "The Grand Budapest Hotel",
    year: 2014,
    genre: "Comedy · Adventure",
    rating: "8.1",
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "Animation · Action",
    rating: "8.4",
  },
];

export default function Home() {
  const [query, setQuery] = useState("");

  const filteredMovies = movies.filter((movie) =>
    `${movie.title} ${movie.genre} ${movie.year}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <a href="#" className="text-xl font-bold tracking-tight">
            <span className="text-amber-400">reel</span>good
          </a>
          <span className="text-sm text-zinc-400">
            Your next favorite movie awaits
          </span>
        </nav>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
          Movie finder
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          What are you in the mood to watch?
        </h1>
        <p className="mt-5 max-w-xl text-lg text-zinc-400">
          Search films by title, year, or genre and find something worth
          watching tonight.
        </p>

        <label htmlFor="movie-search" className="sr-only">
          Search movies
        </label>
        <input
          id="movie-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try “sci-fi”, “comedy”, or a movie title"
          className="mt-9 w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-base outline-none transition placeholder:text-zinc-500 focus:border-amber-400"
        />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">
            {query ? "Search results" : "A few good picks"}
          </h2>
          <span className="text-sm text-zinc-500">
            {filteredMovies.length} movies
          </span>
        </div>

        {filteredMovies.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredMovies.map((movie, index) => (
              <li
                key={movie.title}
                className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900"
              >
                <div
                  className={`flex aspect-[4/5] items-end bg-gradient-to-br p-5 ${
                    [
                      "from-indigo-950 via-violet-900 to-amber-700",
                      "from-rose-950 via-red-900 to-orange-700",
                      "from-sky-950 via-blue-900 to-emerald-700",
                      "from-fuchsia-950 via-purple-900 to-pink-700",
                    ][index % 4]
                  }`}
                >
                  <span className="rounded-full bg-black/30 px-3 py-1 text-sm font-medium backdrop-blur">
                    ★ {movie.rating}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{movie.title}</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    {movie.year} <span aria-hidden="true">·</span> {movie.genre}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-dashed border-white/15 p-8 text-zinc-400">
            No movies found. Try a different title, year, or genre.
          </p>
        )}
      </section>
    </main>
  );
}
