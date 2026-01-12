import { Injectable } from '@nestjs/common';


    export class EmailService {
    async sendEmail(to: string, subject: string, body: string) {
    // Replace with real provider (Mailjet, SendGrid, Nodemailer)
    console.log(`EMAIL → ${to}: ${subject}`);
    return true;
    }
    }