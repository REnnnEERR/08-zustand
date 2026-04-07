"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import type { NoteTag } from '@/types/note';
import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '@/lib/api'; 
import toast from 'react-hot-toast'; 

interface NoteFormProps {
  // Знак питання робить проп необов'язковим, щоб не було помилки Property missing
  onCancel?: () => void;
}

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Мінімум 3 символи')
    .max(50, 'Максимум 50 символів')
    .required("Це поле обов'язкове"),
  content: Yup.string()
    .max(500, 'Максимум 500 символів'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required("Оберіть тег"),
});

const NoteForm = ({ onCancel }: NoteFormProps) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Нотатку успішно створено!');
      if (onCancel) onCancel(); 
    },
    onError: () => {
      toast.error('Щось пішло не так при створенні...');
    }
  });

  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo' as NoteTag,
  };

  // Використовуємо FormikHelpers замість any для типізації методів форми
  const handleSubmit = (values: NoteFormValues, { resetForm }: FormikHelpers<NoteFormValues>) => {
    mutate(values);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {/* Явно вказуємо тип для деструктуризації, щоб прибрати implicit any */}
      {({ isSubmitting }: { isSubmitting: boolean }) => (
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="title">Title</label>
            <Field id="title" name="title" className={css.input} />
            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="content">Content</label>
            <Field 
              id="content" 
              name="content" 
              as="textarea" 
              rows={8} 
              className={css.textarea} 
            />
            <ErrorMessage name="content" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="tag">Tag</label>
            <Field id="tag" name="tag" as="select" className={css.select}>
              <option value="Todo">Todo</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Meeting">Meeting</option>
              <option value="Shopping">Shopping</option>
            </Field>
            <ErrorMessage name="tag" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            {onCancel && (
              <button type="button" className={css.cancelButton} onClick={onCancel}>
                Cancel
              </button>
            )}
            <button type="submit" className={css.submitButton} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create note'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NoteForm;