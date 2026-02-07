"use client";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{ backgroundColor: 'var(--dark-grey)' }}
    >
      <div className="max-w-2xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-6 text-center">
          Let's Connect
        </h2>
        <p className="text-gray-400 text-center mb-12 text-base md:text-lg">
          I won't stop until the tracking markers are invisible and my coffee is cold.
        </p>
        
        <form className="space-y-6">
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
              className="w-full pl-0 pr-4 py-3 border-b border-gray-600 text-white focus:outline-none focus:border-b focus:border-white resize-none bg-transparent"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition-opacity font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

