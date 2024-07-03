// import EmailTemplate from "@/app/components/EmailTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const { email_ids, username, userEmail } = await req.json();
  console.log(email_ids, username, userEmail);

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const response = await resend.emails.send({
      from: `${username} <onboarding@resend.dev>`,
      to: ["arpitlm1999@gmail.com"],
      subject: "Join My Stream",
      html: `<div>Welcome to ${username}'s channel</div>`,
    });

    if (response) {
      console.log(response);
      return NextResponse.json({ message: "Email sent successfully!" });
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json({ message: "Error in sending email" });
  }
}
