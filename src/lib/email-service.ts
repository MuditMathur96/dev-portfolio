import Configs from '@/config';
import emailJs from '@emailjs/browser';

emailJs.init({
    publicKey:Configs.emailPublicKey,
    limitRate:{
        id:'app',
        throttle:1000
    }
});


export async function sendContactEmail(from:string,name:string,subject:string,message:string){

    await emailJs.send(Configs.emailServiceId,Configs.emailTemplateId,{
        from_name:from,
        message,
        subject,
    });

}
export default emailJs;