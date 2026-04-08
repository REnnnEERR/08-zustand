"use client";

import { Formik, Form, Field, ErrorMessage } from "formik"; 
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
  content: Yup.string().max(500, "Too long"), 
  tag: Yup.string()
    .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag") 
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

  const initialValues: FormValues = {
    title: "",
    content: "",
    tag: "Personal" as NoteTag,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <div className={css.field}>
            <label htmlFor="title">Title</label>
            <Field name="title" id="title" type="text" className={css.input} />
            {/* Використовуємо компонент ErrorMessage */}
            <ErrorMessage name="title" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="content">Content</label>
            <Field name="content" id="content" as="textarea" className={css.textarea} />
            <ErrorMessage name="content" component="div" className={css.error} />
          </div>

          <div className={css.field}>
            <label htmlFor="tag">Tag</label>
            <Field name="tag" id="tag" as="select">
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="div" className={css.error} />
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
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;