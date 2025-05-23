import { createTransport } from "nodemailer";

const transport = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_PASS,
  },
});

const sendEmailOfRegister = async ({ email, verifyCode }) =>
  await transport.sendMail({
    from: `GUSTAVO ECOMMERCE <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "📧 Verificación de tu cuenta en GUSTAVO ECOMMERCE",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #2c3e50;">¡Gracias por registrarte!</h2>
        <p style="font-size: 16px; color: #333;">
          Para verificar tu cuenta, por favor utiliza el siguiente código:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; font-size: 28px; padding: 10px 20px; background-color: #3498db; color: white; border-radius: 8px;">
            ${verifyCode}
          </span>
        </div>
        <p style="font-size: 14px; color: #777;">
          Si no creaste esta cuenta, simplemente ignorá este mensaje.
        </p>
        <p style="font-size: 14px; color: #777;">
          - El equipo de GUSTAVO ECOMMERCE
        </p>
      </div>
    `,
  });

export default sendEmailOfRegister;