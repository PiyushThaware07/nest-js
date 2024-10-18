import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter;
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'piyushbthaware2@gmail.com',
                pass: 'ennrsrpqqotpickr',
            }
        })
    }


    async sendEmail(to: string, subject: string, text: string) {
        const mailOptions = {
            from: "piyushbthaware2@gmail.com",
            to: to,
            subject: subject,
            text: text,
        }
        const info = await this.transporter.sendMail(mailOptions);
        console.log(info);
        return info;
    }
}
