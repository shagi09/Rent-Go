import { Injectable } from '@nestjs/common';
    @Injectable()
    export class SmsService {
    async sendSms(to: string, message: string) {
    // Replace with real provider (AfroSMS, Telebirr SMS, etc.)
    console.log(`SMS → ${to}: ${message}`);
    return true;
    }
    }