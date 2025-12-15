"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailService } from "../service/emailjs";
import ReCAPTCHA from "react-google-recaptcha";

// Define types for form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  customSubject: string;
  message: string;
}

const apiURL = process.env.NEXT_PUBLIC_API_URL;
const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string | undefined;
const requireCaptcha = Boolean(siteKey);

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    customSubject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required!");
      toast.error("All fields are required!");
      return;
    }

    // Validate subject
    if (!formData.subject || (formData.subject === "other" && !formData.customSubject.trim())) {
      setError("Please select a subject or provide a custom subject!");
      toast.error("Please select a subject or provide a custom subject!");
      return;
    }

  setIsSubmitting(true);

    try {
      // Prepare data for both API and EmailJS
      const messageData = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject === "other" ? formData.customSubject : formData.subject,
        message: formData.message,
      };

      const emailData = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject === "other" ? formData.customSubject : formData.subject,
        message: formData.message,
      };

      // Send both API request and email concurrently
      
      const apiPromise = apiURL ? axios.post<{ message: string }>(
          `${apiURL}web/message`,
          messageData,
          requireCaptcha && captchaToken ? { headers: { captchaToken } } : undefined
        ) : Promise.resolve({ data: { message: "API URL not configured, skipped" } });

      const [apiResponse, emailResponse] = await Promise.allSettled([
        apiPromise,
        emailService.sendContactEmail(emailData)
      ]);

      // Check API response
      let apiSuccess = false;
      let apiMessage = "";
      
      if (apiResponse.status === 'fulfilled') {
        apiSuccess = true;
        apiMessage = apiResponse.value.data.message;
      } else {
        console.error('API Error:', apiResponse.reason);
        apiMessage = "Failed to save message to database";
      }

      // Check email response
      let emailSuccess = false;
      let emailMessage = "";

      
      if (emailResponse.status === 'fulfilled') {
        emailSuccess = emailResponse.value.success;
        emailMessage = emailResponse.value.message;
      } else {
        console.error('Email Error:', emailResponse.reason);
        emailMessage = "Failed to send email notification";
      }

      // Handle different success scenarios
      if (apiSuccess && emailSuccess) {
        toast.success("Message sent successfully! We'll get back to you soon. 🎉");
      } else if (apiSuccess && !emailSuccess) {
        toast.success("Message saved successfully! 📝");
        toast.warn(`Email notification failed: ${emailMessage}`);
      } else if (!apiSuccess && emailSuccess) {
        toast.success("Email sent successfully! 📧");
        toast.warn(`Database save failed: ${apiMessage}`);
      } else {
        throw new Error(`Both services failed - API: ${apiMessage}, Email: ${emailMessage}`);
      }

      // Clear form on any success
      if (apiSuccess || emailSuccess) {
        setFormData({ name: "", email: "", subject: "", customSubject: "", message: "" });
        // Reset captcha
        if (requireCaptcha) {
          setCaptchaToken(null);
          recaptchaRef.current?.reset();
        }
      }

    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Form submission error:", error);

      // Show error toast
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-transparent md:p-6 rounded-2xl">
      <h2 className="text-2xl font-bold text-background mb-4 text-center">Connect with us</h2>

      {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit}>
        <motion.input
          whileFocus={{ scale: 1 }}
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 text-white mb-4 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPrimary"
          required
        />

        <motion.input
          whileFocus={{ scale: 1 }}
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 text-white border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPrimary"
          required
        />

        <motion.select
          whileFocus={{ scale: 1 }}
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 mb-4 text-white border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPrimary"
          required
        >
          <option value="" disabled className="text-gray-900">
            Select Subject
          </option>
          <option value="advertise" className="text-gray-900">
            Advertise with Us
          </option>
          <option value="branding" className="text-gray-900">
            Branding Partnership
          </option>
          <option value="admission" className="text-gray-900">
            Regarding Admission
          </option>
          <option value="careers" className="text-gray-900">
            Careers
          </option>
          <option value="other" className="text-gray-900">
            Other
          </option>
        </motion.select>

        {formData.subject === "other" && (
          <motion.input
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            whileFocus={{ scale: 1 }}
            type="text"
            name="customSubject"
            placeholder="Please specify your subject"
            value={formData.customSubject}
            onChange={handleChange}
            className="w-full p-3 text-white mb-4 border bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPrimary"
            required
          />
        )}

        <motion.textarea
        
          whileFocus={{ scale: 1 }}
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="w-full p-3 h-32 border text-white bg-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-lightPrimary"
          required
        />

        {/* reCAPTCHA v2 Checkbox */}
        {requireCaptcha ? (
          <div className="mt-4">
            <ReCAPTCHA
          
              ref={recaptchaRef}
              sitekey={siteKey!}
              onChange={(token: string | null) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
              theme="dark"
            />
          </div>
        ) : (
          <p className="mt-3 text-sm text-yellow-400">
            reCAPTCHA not configured. Set NEXT_PUBLIC_RECAPTCHA_SITE_KEY in your .env.
          </p>
        )}

        <motion.button
          whileHover={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={isSubmitting || (requireCaptcha && !captchaToken)}
          className={`w-full bg-lightPrimary text-white p-3 rounded-lg mt-4 transition-all ${
            isSubmitting || (requireCaptcha && !captchaToken)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </form>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" className="z-100" autoClose={3000} />
    </div>
  );
}
