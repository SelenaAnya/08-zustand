'use client';

import css from '@/components/Error/Error.module.css';

type ErrorProps = {
    error: Error
};

export default function ErrorPage({ error }: ErrorProps) {
    return (
        <div>
            <h1 className={css.errorText}>Something went wrong</h1>
            <p>{error.message}</p>
        </div>
    );
};
