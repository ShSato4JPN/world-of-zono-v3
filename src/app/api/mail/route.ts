import type { NextApiRequest, NextApiResponse } from "next";

import transporter from "@/libs/nodemailer-client";

type ApiProps = {
  slug: {
    email: string;
    subject: string;
    text: string;
  };
};

interface ExtendsNextApiRequest extends NextApiRequest {
  body: ApiProps;
}

export default async function handler(
  req: ExtendsNextApiRequest,
  res: NextApiResponse,
) {
  try {
    await transporter.sendMail({
      to: process.env.NODEMAILER_EMAIL,
      replyTo: req.body.slug.email,
      subject: req.body.slug.subject,
      text: `${req.body.slug.email}\n${req.body.slug.text}`,
    });

    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
}
