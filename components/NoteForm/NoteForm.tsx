// форма створення нотатки
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NewNoteData } from "@/types/note";
import { createNote } from "@/lib/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function NoteForm({ onSuccess, onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate } = useMutation({
    mutationFn: (noteData: NewNoteData) => createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft(); // Очищаємо draft при успішному створенні
      onSuccess();
    },
  });

  const NoteSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Must be at least 3 characters")
      .max(50, "Must be at most 50 characters")
      .required("Title is required"),
    content: Yup.string().max(500, "Must be at most 500 characters"),
    tag: Yup.string()
      .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"])
      .required("Tag is required"),
  });

  // Використовуємо draft як початкові значення, якщо він існує
  const initialValues = {
    title: draft.title || "",
    content: draft.content || "",
    tag: draft.tag || "Todo",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteSchema}
      onSubmit={(values, actions) => {
        mutate(values);
        actions.resetForm();
      }}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFieldValue("title", e.target.value);
                setDraft({
                  ...values,
                  title: e.target.value,
                });
              }}
            />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows={8}
              className={css.textarea}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFieldValue("content", e.target.value);
                setDraft({
                  ...values,
                  content: e.target.value,
                });
              }}
            />
            <ErrorMessage
              name="content"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field
              as="select"
              id="tag"
              name="tag"
              className={css.select}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setFieldValue("tag", e.target.value);
                setDraft({
                  ...values,
                  tag: e.target.value,
                });
              }}
            >
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="button"
              className={css.cancelButton}
              onClick={onClose} // Draft не очищається при скасуванні
            >
              Cancel
            </button>
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              Create note
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}