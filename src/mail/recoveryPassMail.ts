import transporter from "./transporter";

export default async (code: string, name: string, email: string) => {
    await transporter.sendMail({
        from: "E-commerce<bryangomesrocha@gmail.com>",
        to: email,
        subject: "Recuperação de senha.",
        html: `
        <p><strong>Para manter sua conta segura, &eacute; necess&aacute;rio verificar sua identidade antes de prosseguir com a altera&ccedil;&atilde;o da sua senha</strong>.</p>
        <h2>Seu c&oacute;digo de verifica&ccedil;&atilde;o &eacute;:&nbsp; ${code}</h2>
        `
    }).catch((error) => {
        console.log(error);
    });
};
