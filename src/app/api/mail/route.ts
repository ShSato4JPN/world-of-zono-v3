import { NextRequest, NextResponse } from "next/server";

import transporter from "@/libs/nodemailer-client";

export type NodeMailerResponse = {
  message: "success" | "error";
};

type ApiProps = {
  email: string;
  subject: string;
  text: string;
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse<NodeMailerResponse>> {
  try {
    const { email, subject, text } = (await req.json()) as ApiProps;

    await transporter.sendMail({
      to: process.env.NODEMAILER_EMAIL,
      replyTo: email,
      subject: subject,
      text: `from: ${email}\nbody: ${text}`,
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}
