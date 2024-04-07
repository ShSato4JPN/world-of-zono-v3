"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { ErrorMessage } from "@hookform/error-message";

import styles from "./style.module.scss";

interface IFormInput {
  name: string;
  email: string;
  subject: string;
  text: string;
}

export default function ContactTop() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onSubmit",
    criteriaMode: "all",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log(data);
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
            <input
              type="text"
              {...register("name", {
                required: {
                  value: true,
                  message: "お名前を入力してください！",
                },
              })}
            />
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
            <input
              type="text"
              {...register("email", {
                required: {
                  value: true,
                  message: "メールアドレスを入力してください！",
                },
                pattern: {
                  value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                  message: "入力形式がメールアドレスではありません！",
                },
              })}
            />
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
            <textarea
              {...register("text", {
                required: { value: true, message: "本文を入力してください！" },
                minLength: {
                  value: 10,
                  message: "10文字以上入力してください！",
                },
              })}
              rows={9}
            />
          </div>
          <button className={styles.submit} type="submit">
            送信
          </button>
        </form>
      </div>
    </div>
  );
}
