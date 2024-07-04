import { Resend } from "resend";
import { NextResponse } from "next/server";
import EmailTemplate from "@/app/components/EmailTemplate";

export async function POST(req, res) {
  const { email_ids, username, userEmail } = await req.json();
  console.log(email_ids, username, userEmail);
  // const dummy_emails = ["", ""];

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const emailPromises = email_ids.map((email) => {
      resend.emails.send({
        from: `${username} <onboarding@resend.dev>`,
        to: email,
        subject: "I am Live!! Join My Stream Now",
        react: <EmailTemplate userName={username} />,
      });
    });

    const response = await Promise.all(emailPromises);
    if (response) {
      return NextResponse.json({ message: "Email sent successfully!" });
    }
  } catch (err) {
    console.log(err);

    return NextResponse.json({ message: "Error in sending email" });
  }
}
