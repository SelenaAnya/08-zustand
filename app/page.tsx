import css from './page.module.css';

export default function Home() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <section className={css.hero}>
          <h1 className={css.title}>Welcome to NoteHub</h1>
          <p className={css.subtitle}>
            Your personal space for organizing thoughts, ideas, and important information
          </p>
        </section>

        <p className={css.description}>
          NoteHub is a simple yet powerful note-taking application that helps you capture,
          organize, and manage your thoughts efficiently. Whether you're jotting down quick
          reminders, planning your day, or brainstorming ideas, NoteHub provides the perfect
          digital workspace for all your note-taking needs.
        </p>
      </div>
    </main>
  );
}