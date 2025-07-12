"use client";

import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { DraftNote } from "@/types/note";
import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface NoteFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function NoteForm({ onSuccess, onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  
  const [formData, setFormData] = useState({
    title: draft.title || "",
    content: draft.content || "",
    tag: draft.tag || "Todo",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { mutate, isPending } = useMutation({
    mutationFn: (noteData: DraftNote) => createNote(noteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      if (onSuccess) {
        onSuccess();
      } else {
        router.push("/notes/filter/All");
      }
    },
  });

  // Update the draft when the shape changes
  useEffect(() => {
    setDraft(formData);
  }, [formData, setDraft]);

  const validateForm = (data: typeof formData) => {
    const newErrors: Record<string, string> = {};

    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    } else if (data.title.length < 3) {
      newErrors.title = "Must be at least 3 characters";
    } else if (data.title.length > 50) {
      newErrors.title = "Must be at most 50 characters";
    }

    if (data.content.length > 500) {
      newErrors.content = "Must be at most 500 characters";
    }

    if (!data.tag) {
      newErrors.tag = "Tag is required";
    }

    return newErrors;
  };

  const handleSubmit = async (formDataObj: FormData) => {
    const data = {
      title: formDataObj.get("title") as string,
      content: formDataObj.get("content") as string,
      tag: formDataObj.get("tag") as string,
    };

    const validationErrors = validateForm(data);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      mutate(data);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear the error for the field that is being changed

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCancel = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          className={css.input}
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
        />
        {errors.title && <span className={css.error}>{errors.title}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
        />
        {errors.content && <span className={css.error}>{errors.content}</span>}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={formData.tag}
          onChange={(e) => handleInputChange("tag", e.target.value)}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
        {errors.tag && <span className={css.error}>{errors.tag}</span>}
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
  );
}