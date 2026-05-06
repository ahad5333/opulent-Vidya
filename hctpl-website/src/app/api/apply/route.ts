import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const jobTitle = formData.get('jobTitle');
    const cv = formData.get('cv'); // This is a File object

    console.log('--- New Job Application ---');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Job:', jobTitle);
    console.log('CV Received:', cv ? (cv as File).name : 'No CV');

    /**
     * TO ENABLE ACTUAL EMAIL SENDING:
     * 1. Install nodemailer: `npm install nodemailer`
     * 2. Import nodemailer at the top.
     * 3. Configure your transporter (SMTP, Gmail, etc.)
     * 4. Send the email with the form data and CV as attachment.
     * 
     * Example:
     * const transporter = nodemailer.createTransport({ ... });
     * await transporter.sendMail({
     *   from: '"HCTPL Careers" <careers@hctpl.com>',
     *   to: 'ahad5333@gmail.com', // USER'S EMAIL
     *   subject: `New Application: ${jobTitle} from ${name}`,
     *   text: `New application received...\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
     *   attachments: [{ filename: (cv as File).name, content: Buffer.from(await (cv as File).arrayBuffer()) }]
     * });
     */

    return NextResponse.json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to submit application' }, { status: 500 });
  }
}
