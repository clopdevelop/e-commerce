import { EmailTemplate } from '@/components/contact/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'Hello world',
      react: EmailTemplate({ firstName: 'John' }),
      text: ""
    });

    return Response.json({message:"Email enviado"});
  } catch (error) {
    return Response.json({mensaje:"Error al enviar: ", error });
  }
}
