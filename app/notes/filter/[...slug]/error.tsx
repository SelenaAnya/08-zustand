'use client';

import css from '@/components/Error/Error.module.css'; 
// import React from 'react';


type ErrorProps = {
    error: Error;
    reset: () => void;
};

export default function ErrorPage({ error }: ErrorProps) {
    return (
            <p className={css.errorText}>Could not fetch the list of notes. {error.message}</p>
    );
}