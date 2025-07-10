import css from "./Home.module.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404 - Page Not Found | NoteHub",
  description: "Sorry, the page you are looking for does not exist. Return to NoteHub to manage your notes.",
  openGraph: {
    title: "404 - Page Not Found | NoteHub",
    description: "Sorry, the page you are looking for does not exist. Return to NoteHub to manage your notes.",
    url: "https://notehub.example.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub - Page Not Found",
      },
    ],
    type: "website",
  },
};

export default function NotFound() {
  return (
    <div>
      <section className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <article className={css.description}>
          <p>Sorry, the page you are looking for does not exist.</p>

          <Link href="/">Go back home</Link>
        </article>
      </section>
    </div>
  );
}
