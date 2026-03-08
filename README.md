# Flick Portfolio

A cinematic portfolio website for **Flick (Surya)**, a 3D and VFX Artist. This application showcases video works, skills, and provides a way to contact the artist. Built with React and Tailwind CSS.

## 🚀 Features

- **Immersive UI**: Dark-themed, cinematic design with custom fonts and smooth transitions.
- **Video Portfolio**: Grid layout showcasing VFX work with a custom-built video player modal.
- **Custom Video Player**: Features custom controls, progress bar, and fullscreen capabilities.
- **Contact Form**: Integrated with Brevo (formerly Sendinblue) API for direct email inquiries.
- **Responsive Design**: Fully optimized for desktop and mobile devices.
- **SEO Optimized**: Dynamic meta tag injection for better search engine visibility.

## 🛠️ Tech Stack

- **Frontend**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Video Hosting**: [Supabase Storage](https://supabase.com/)
- **Email Service**: [Brevo API](https://www.brevo.com/) (SMTP)

## 📦 Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/flick-portfolio.git
    cd flick-portfolio
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Set up Environment Variables**

    Create a `.env` file in the root directory and add the following keys for the contact form to work:

    ```env
    VITE_BREVO_API_KEY=your_brevo_api_key
    VITE_CONTACT_EMAIL=destination_email@example.com
    VITE_SENDER_EMAIL=sender_email_configured_in_brevo@example.com
    ```

4.  **Run the development server**

    ```bash
    npm run dev
    ```

## 📂 Project Structure

- `src/components/`: Contains all React components.
  - `HomePage.jsx`: The main landing page aggregating sections.
  - `WorkSection.jsx`: Displays the video portfolio grid and modal.
  - `ContactSection.jsx`: Handles the contact form logic.
  - `CustomVideoPlayer.jsx`: A bespoke video player implementation.
  - `Loader.jsx`: Initial loading animation.
- `src/data/`: JSON files for static data (navigation links, etc.).