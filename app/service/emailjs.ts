import emailjs from '@emailjs/browser';

// Email configuration interface
interface EmailConfig {
  serviceId: string;
  templateId: string;
  autoReplyTemplateId: string;
  publicKey: string;
}

// Template parameters interface
interface ContactFormData {
  from_name: string;
  from_email: string;
  subject?: string;
  message: string;
  to_name?: string;
}

class EmailService {
  private config: EmailConfig;

  constructor() {
    this.config = {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      autoReplyTemplateId: process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || '',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    };

    // Initialize EmailJS with public key
    if (this.config.publicKey) {
      emailjs.init(this.config.publicKey);
    }
  }

  // Validate configuration
  private validateConfig(): boolean {
    const isValid = !!(this.config.serviceId && this.config.templateId && this.config.publicKey);
    
    if (!isValid) {
      console.error('EmailJS Configuration Check:', {
        serviceId: !!this.config.serviceId,
        templateId: !!this.config.templateId,
        autoReplyTemplateId: !!this.config.autoReplyTemplateId,
        publicKey: !!this.config.publicKey,
      });
    }
    
    return isValid;
  }

  // Get configuration status for debugging
  getConfigStatus() {
    return {
      serviceId: !!this.config.serviceId,
      templateId: !!this.config.templateId,
      autoReplyTemplateId: !!this.config.autoReplyTemplateId,
      publicKey: !!this.config.publicKey,
      isValid: this.validateConfig(),
    };
  }

  // Send contact form email
  async sendContactEmail(formData: ContactFormData): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.validateConfig()) {
        throw new Error('EmailJS configuration is incomplete. Please check your environment variables. Run emailService.getConfigStatus() to debug.');
      }

      // Prepare template parameters for main contact email
      const templateParams = {
        from_name: formData.from_name,
        from_email: formData.from_email,
        subject: formData.subject || 'General Inquiry',
        message: formData.message,
        to_name: 'Your Sport Your World Team',
        reply_to: formData.from_email,
        sent_at: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        }),
      };

      console.log('Sending contact email with params:', { ...templateParams, message: '[REDACTED]' });

      // Send main contact email
      const response = await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams
      );

      if (response.status === 200) {
        console.log('Contact email sent successfully');
        
        // Send auto-reply to user
        await this.sendAutoReply(formData.from_email, formData.from_name);
        
        return {
          success: true,
          message: 'Your message has been sent successfully! We\'ll get back to you soon.',
        };
      } else {
        throw new Error(`Failed to send email. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to send message. Please try again.',
      };
    }
  }

  // Send auto-reply email to user
  async sendAutoReply(userEmail: string, userName: string): Promise<void> {
    try {
      if (!this.config.autoReplyTemplateId) {
        console.warn('Auto-reply template ID not configured. Skipping auto-reply.');
        return;
      }

      const autoReplyParams = {
        to_email: userEmail,
        to_name: userName,
        from_name: 'Your Sport Your World',
        from_email: 'noreply@yoursportyourworld.com',
        reply_to: 'support@yoursportyourworld.com',
        sent_at: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        }),
      };

      console.log('Sending auto-reply to:', userEmail);

      await emailjs.send(
        this.config.serviceId,
        this.config.autoReplyTemplateId,
        autoReplyParams
      );

      console.log('Auto-reply sent successfully to:', userEmail);
    } catch (error) {
      console.error('Auto-reply failed:', error);
      // Don't throw error for auto-reply failure to prevent blocking main email
    }
  }

  // Get template content for preview (optional utility method)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getTemplatePreview(type: 'contact' | 'autoReply', data: any): string {
    if (type === 'contact') {
      return `
        New contact message from ${data.from_name} (${data.from_email})
        
        Message: ${data.message}
        
        Sent at: ${data.sent_at}
      `;
    } else {
      return `
        Auto-reply sent to ${data.to_name} at ${data.to_email}
        
        Thank you message with platform information included.
      `;
    }
  }
}

// Export singleton instance
export const emailService = new EmailService();
export default emailService;