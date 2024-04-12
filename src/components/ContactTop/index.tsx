"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import "react-toastify/dist/ReactToastify.css";
import styles from "./style.module.scss";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "1 〜 30文字以内で入力してください！" })
    .max(30, { message: "1 〜 30文字以内で入力してください！" }),
  email: z
    .string()
    .email({ message: "メールアドレスの形式で入力してください！" }),
  subject: z
    .string()
    .min(1, { message: "1 〜 30文字以内で入力してください！" })
    .max(30, { message: "1 〜 30文字以内で入力してください！" }),
  text: z.string().min(10, { message: "10文字以上入力してください！" }),
});

type FormInputs = z.infer<typeof schema>;

export default function ContactTop() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await toast.promise(
      fetch(`${process.env.NEXT_PUBLIC_URL}/api/mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(async (res) => {
        const data = await res.json();

        if (data.message === "success") {
          reset();
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      }),
      {
        pending: "送信中...",
        success: "メールを送信しました！ 🫡",
        error: "送信時にエラーが発生しました 😱",
      },
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.contactTop}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formItem}>
            <div className={styles.itemLabel}>
              <label htmlFor="name">お名前 *</label>
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>
            <input type="text" {...register("name")} />
          </div>
          <div className={styles.formItem}>
            <div className={styles.itemLabel}>
              <label htmlFor="email">メールアドレス *</label>
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>
            <input type="text" {...register("email")} />
          </div>
          <div className={styles.formItem}>
            <div className={styles.itemLabel}>
              <label htmlFor="subject">題名</label>
              <ErrorMessage
                errors={errors}
                name="subject"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>
            <input type="text" {...register("subject")} />
          </div>
          <div className={styles.formItem}>
            <div className={styles.itemLabel}>
              <label htmlFor="text">本文 *</label>
              <ErrorMessage
                errors={errors}
                name="text"
                render={({ message }) => (
                  <span className={styles.error}>{message}</span>
                )}
              />
            </div>
            <textarea {...register("text")} rows={9} />
          </div>
          <button className={styles.submit} type="submit">
            送信
          </button>
        </form>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />
      </div>
    </div>
  );
}
