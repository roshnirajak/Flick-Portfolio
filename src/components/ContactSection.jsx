import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const apiKey = import.meta.env.VITE_BREVO_API_KEY;
    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;
    const senderEmail = import.meta.env.VITE_SENDER_EMAIL;

    if (!apiKey || !contactEmail || !senderEmail) {
      console.error("Missing environment variables for Brevo API");
      setStatus("error");
      return;
    }

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": apiKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: {
            name: "Portfolio Contact Form",
            email: senderEmail,
          },
          to: [
            {
              email: contactEmail,
              name: "Portfolio Owner",
            },
          ],
          subject: `New Contact from ${formData.name}`,
          htmlContent: `
            <html>
              <body>
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Company:</strong> ${formData.company}</p>
                <p><strong>Job Title:</strong> ${formData.jobTitle}</p>
                <p><strong>Message:</strong></p>
                <p>${formData.message}</p>
              </body>
            </html>
          `,
          replyTo: {
            email: formData.email,
            name: formData.name,
          },
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', jobTitle: '', message: '' });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        const errorData = await response.json();
        console.error("Brevo API Error:", errorData);
        setStatus('error');
      }
    } catch (error) {
      console.error("Network Error:", error);
      setStatus('error');
    }
  };
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20 relative"
      style={{ backgroundColor: 'var(--dark-grey)' }}
    >
      <div 
        className="absolute top-0 right-20 pointer-events-none select-none opacity-5 z-0 transform -rotate-90 origin-bottom-right translate-x-1/5"
      >
        <h1 
          className="text-[8rem] md:text-[12rem] font-bold leading-none"
          style={{ 
            fontFamily: 'var(--font-akira-expanded)',
            WebkitTextStroke: '2px white',
            color: 'transparent'
          }}
        >
          FLICK
        </h1>
      </div>

      <div className="max-w-2xl mx-auto w-full relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 text-center">
          Let's Connect
        </h2>
        <p className="text-gray-400 text-center mb-12 text-base md:text-lg">
          I won't stop until the tracking markers are invisible and my coffee is cold.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Row 1: Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white bg-transparent"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white bg-transparent"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Row 2: Company name and Job title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="company"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Company name <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white bg-transparent"
                placeholder="Company Name"
              />
            </div>
            <div>
              <label
                htmlFor="jobTitle"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Job title <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white bg-transparent"
                placeholder="Job Title"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white resize-none bg-transparent"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity font-medium disabled:opacity-50"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" && (
            <p className="text-green-500 text-center mt-4">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-center mt-4">Failed to send message. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
}
