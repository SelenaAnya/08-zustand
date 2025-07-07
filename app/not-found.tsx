import css from "./Home.module.css";
import Link from "next/link";

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
