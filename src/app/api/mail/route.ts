import { NextRequest, NextResponse } from "next/server";

import transporter from "@/libs/nodemailer-client";

type ApiProps = {
  email: string;
  subject: string;
  text: string;
};

type ApiResponse = {
  message: "success" | "error";
};

export async function POST(
  req: NextRequest,
): Promise<NextResponse<ApiResponse>> {
  try {
    const { email, subject, text } = (await req.json()) as ApiProps;

    await transporter.sendMail({
      to: process.env.NODEMAILER_EMAIL,
      replyTo: email,
      subject: subject,
      text: `${email}\n${text}`,
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ message: "error" });
  }
}
