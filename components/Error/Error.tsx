import css from "./Error.module.css";

interface ErrorTextProps {
  message: string;
}

export default function ErrorText({ message }: ErrorTextProps) {
    return (
        <div className={css.errorText}>
          <p>{message}</p>
        </div>
    );
}