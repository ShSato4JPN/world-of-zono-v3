import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaSquareThreads } from "react-icons/fa6";

import styles from "./style.module.scss";

export default function ProfileTop() {
  const snsList = [
    {
      url: "https://twitter.com/zonono3104",
      icon: <FaXTwitter className={styles.icon} />,
    },
    {
      url: "https://github.com/ShSato4JPN",
      icon: <FaGithub className={styles.icon} />,
    },
    {
      url: "https://www.threads.net/@satoshi1221_jp",
      icon: <FaSquareThreads className={styles.icon} />,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.profileTop}>
        <figure className={styles.image}>
          <Image
            src="/profile.svg"
            alt={"管理人のイメージ画像です"}
            width={500}
            height={500}
          />
        </figure>
        <div className={styles.description}>
          <div className={styles.message}>
            <p>都内でWebエンジニアとして働いています。</p>
            <br />
            <p>30 歳の壁に怯えている 94 年生まれです。</p>
            <br />
            <p>意外と趣味が多く 1 日が 40 時間あればといつも思っています。</p>
            <br />
            <p>
              「何事もまずは挑戦！」をモットーに、好きなものはとことん追求する性格です！
            </p>
          </div>
          <div className={styles.sns}>
            {snsList.map((sns) => (
              <a href={sns.url} key={sns.url} target="_blank" rel="noopener">
                {sns.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
