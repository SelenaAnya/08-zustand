import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';
import css from './Header.module.css';

export default function Header() {
    return (
        <header className={css.header}>
            <Link href="/" aria-label="Home">
                NoteHub
            </Link>
            <nav aria-label="Main Navigation">
                <ul className={css.navigation}>
                    <li className={css.navigationItem}>
                        <Link className={css.navigationLink} href="/">Home</Link>
                    </li>
                    <li className={css.navigationLink}><TagsMenu /></li>
                </ul>
            </nav>
        </header>
    );
};
