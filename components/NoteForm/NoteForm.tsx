"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { NoteTag } from "@/types/note"; 
import css from "./NoteForm.module.css";

interface NoteFormProps {
  onCancel: () => void;
  onSuccess: () => void;
}


interface FormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required").min(3, "Too short"),
  content: Yup.string().required("Content is required").min(10, "Too short"),
  tag: Yup.string()
    .oneOf(["Work", "Personal", "Study"], "Invalid tag")
    .required("Tag is required"),
});

const NoteForm = ({ onCancel, onSuccess }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      
      onSuccess();
    },
  });

  const formik = useFormik<FormValues>({
  initialValues: {
    title: "",
    content: "",
    tag: "Personal" as NoteTag,
    },
    validationSchema,
    onSubmit: (values) => {
    mutation.mutate(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <div className={css.field}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          {...formik.getFieldProps("title")}
          className={formik.touched.title && formik.errors.title ? css.inputError : ""}
        />
        {formik.touched.title && formik.errors.title && (
          <div className={css.error}>{formik.errors.title}</div>
        )}
      </div>

      <div className={css.field}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          {...formik.getFieldProps("content")}
          className={formik.touched.content && formik.errors.content ? css.inputError : ""}
        />
        {formik.touched.content && formik.errors.content && (
          <div className={css.error}>{formik.errors.content}</div>
        )}
      </div>

      <div className={css.field}>
        <label htmlFor="tag">Tag</label>
        <select id="tag" {...formik.getFieldProps("tag")}>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Study">Study</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={onCancel} className={css.cancelBtn}>
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isPending}
          className={css.submitBtn}
        >
          {mutation.isPending ? "Saving..." : "Save Note"}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;