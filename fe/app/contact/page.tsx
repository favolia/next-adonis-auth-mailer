"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = "http://localhost:3333/api/send-email";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": "111",
            },
            body: JSON.stringify({
                targetEmail: form.email,
                subjectMessage: form.name,
                html: `
          <!DOCTYPE html>
          <html lang="en">

          <head>
              <style>
                  body {
                      margin: 0;
                      padding: 0;
                      font-family: Arial, sans-serif;
                      background-color: #ffffff;
                  }

                  .header {
                      background:
                          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                          linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                          radial-gradient(circle at top left, #749c70, transparent 30%),
                          radial-gradient(circle at bottom right, #749c70, transparent 30%),
                          linear-gradient(135deg, #3c6c2f, #558b3c);
                      background-size: 60px 60px, 60px 60px, 100% 100%, 100% 100%, 100% 100%;
                      color: #ffffff;
                      text-align: center;
                      padding: 60px 20px;
                  }

                  .header img {
                      max-width: 140px;
                      margin-bottom: 20px;
                  }

                  .header h1 {
                      font-size: 32px;
                      font-weight: bold;
                      margin: 0;
                  }

                  .header p {
                      font-size: 16px;
                      margin: 10px 0 0;
                  }

                  .content {
                      padding: 40px 20px;
                      max-width: 600px;
                      margin: 0 auto;
                      color: #000000;
                      line-height: 1.6;
                  }

                  .content h2 {
                      font-size: 18px;
                      margin: 0 0 20px;
                  }

                  .footer {
                      background-color: #3c6c2f;
                      text-align: center;
                      padding: 30px 20px;
                      color: #ffffff;
                      font-size: 1rem;
                      line-height: 1;
                  }

                  .footer a {
                      color: #f6a623;
                      text-decoration: none;
                  }
              </style>
          </head>

          <body>
              <div class="header">
                  <img src="https://i.imgur.com/CBZpZpJ.png" alt="TASFR Logo">
                  <h1>Submission Confirmation</h1>
                  <p>[description of the email]</p>
              </div>

              <div class="content">
                  <h2>Dear ${form.name},</h2>
                  <p>Thank you for your submission. We have received your message:</p>
                  <p>"${form.message}"</p>
                  <p>Best regards,<br/>TASFRL</p>
                  <img src="cid:mailImage" alt="Image" style="width: 100%; max-width: 600px; height: auto;" />
                  <br/>
                  <em style="font-size: 8pt; font-family: georgia, palatino;">
                    The information contained in this e-mail message is intended for the confidential use of the addresses only. If you are not an addressee or an authorized agent responsible for delivering this e-mail to a designated addressee, you have received this email in error.  Any further review, dissemination, distribution, or copying or forwarding of this email is strictly prohibited.
                  </em>
              </div>

              <div class="footer">
                  <p>
                      <b>TASFRL</b> |
                      <a href="#">Website</a> |
                      <a href="#">Contact us</a>
                  </p>
                  <p>
                      Follow us :
                      <a href="#">Facebook</a> |
                      <a href="#">Instagram</a> |
                      <a href="#">LinkedIn</a>
                  </p>
              </div>
          </body>
          </html>`,
            }),
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`Error ${response.status}: ${text}`);
        }

        const data = await response.json();
        console.log({ data });
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h1 className="text-2xl font-bold mb-4">Contact Form</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                    />
                </div>

                <Button type="submit" className="w-full">
                    Send
                </Button>
            </form>
        </div>
    );
}
