

import React, { useState } from "react";
import { toast } from "sonner";
import Axios from "../Axios/axiosInatance";

// Inline Button component
const CustomButton = ({
  type = "button",
  className = "",
  children,
  onClick,
}) => (
  <button
    type={type}
    className={`bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Inline Input component
const CustomInput = ({
  id,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
}) => (
  <input
    id={id}
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    className={`w-full p-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
  />
);

// Inline Textarea component
const CustomTextarea = ({
  id,
  value,
  onChange,
  required = false,
  placeholder = "",
  className = "",
}) => (
  <textarea
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    className={`w-full p-2 min-h-[150px] resize-y bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 ${className}`}
  />
);

// Inline SVG icons
const MailIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-400"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MessageSquareIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-400"
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-blue-400"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const SendIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: name,
        email,
        subject,
        message,
      };
      await Axios.post("/contact", payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Message sent successfully", {
        description: "We'll get back to you as soon as possible.",
      });
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Error sending contact message:", error);
      toast.error(
        "Failed to send message: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <>
      {/* Inline meta tags as a substitute for Helmet */}
      <head>
        <title>Contact Us - YVO3D</title>
        <meta
          name="description"
          content="Get in touch with the YVO3D team for any questions, feedback, or business inquiries."
        />
      </head>

      <div className="min-h-screen bg-black text-white flex flex-col">
        {/* Navbar placeholder */}
        <div className="bg-black h-20"></div>

        <main className="flex-1 pt-20">
          <div className="container mx-auto px-4 py-16">
            <div
              className="text-center mb-12"
              style={{ opacity: 0, transform: "translateY(20px)" }}
              onLoad={(e) => {
                const element = e.currentTarget;
                setTimeout(() => {
                  element.style.transition = "all 0.5s";
                  element.style.opacity = "1";
                  element.style.transform = "translateY(0)";
                }, 100);
              }}
            >
              <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Have questions or feedback about our products and services? We'd
                love to hear from you. Get in touch with our team today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="md:col-span-1">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 h-full">
                  <h2 className="text-xl font-bold mb-6">Get in Touch</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4">
                        <MailIcon />
                      </div>
                      <div>
                        <h3 className="font-medium text-left">Email</h3>
                        <p className="text-white/70 mt-1">contact@yvo3d.com</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4">
                        <MessageSquareIcon />
                      </div>
                      <div>
                        <h3 className="font-medium text-left">Discord</h3>
                        <p className="text-white/70 mt-1">Join our community</p>
                        <CustomButton
                          variant="outline"
                          size="sm"
                          className="mt-2 border-white/20"
                          onClick={() =>
                            window.open("https://discord.gg/yvo3d", "_blank")
                          }
                        >
                          <MessageSquareIcon />
                          Join Discord
                        </CustomButton>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-white/10 p-2 rounded-full mr-4">
                        <GlobeIcon />
                      </div>
                      <div>
                        <h3 className="font-medium text-left">Social Media</h3>
                        <div className="mt-2 flex space-x-3">
                          <a
                            href="https://twitter.com/yvo3d"
                            target="_blank"
                            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="text-white/70"
                            >
                              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
                            </svg>
                          </a>
                          <a
                            href="https://instagram.com/yvo3d"
                            target="_blank"
                            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="text-white/70"
                            >
                              <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                            </svg>
                          </a>
                          <a
                            href="https://linkedin.com/company/yvo3d"
                            target="_blank"
                            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              viewBox="0 0 16 16"
                              className="text-white/70"
                            >
                              <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/5 border border-white/10 rounded-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-6">Send a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-white/70"
                      >
                        Your Name
                      </label>
                      <CustomInput
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-white/70"
                      >
                        Your Email
                      </label>
                      <CustomInput
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-white/70"
                    >
                      Subject
                    </label>
                    <CustomInput
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div className="mb-6 space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-white/70"
                    >
                      Message
                    </label>
                    <CustomTextarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="Your message here..."
                    />
                  </div>

                  <CustomButton type="submit" className="w-full py-6">
                    <SendIcon />
                    Send Message
                  </CustomButton>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Footer placeholder */}
        <div className="bg-black h-20"></div>
      </div>
    </>
  );
};

export default ContactPage;
