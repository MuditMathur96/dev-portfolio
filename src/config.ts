export default class Configs{
    public static emailServiceId:string = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "";
    public static emailTemplateId:string = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "";
    public static emailPublicKey:string = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || " ";
    public static email =process.env.NEXT_PUBLIC_EMAIL;
    public static linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN;
    public static githubUrl = process.env.NEXT_PUBLIC_GITHUB;
}