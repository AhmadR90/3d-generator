import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Youtube, Github, Mail, ArrowUpRight } from 'lucide-react';
import { Button } from './UI/Button';

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Showcase", href: "/showcase" },
        { name: "Updates", href: "/updates" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Tutorials", href: "/tutorials" },
        { name: "Blog", href: "/blog" },
        { name: "Support", href: "/support" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Partners", href: "/partners" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
        { name: "License", href: "/license" },
        { name: "Cookie Policy", href: "/cookies" }
      ]
    }
  ];
  
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20 md:py-32">
        {/* Pre-footer callout */}
        <div className="mb-24 rounded-2xl bg-gradient-to-br from-blue-900/20 to-black border border-white/5 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-white mb-3">Ready to bring your ideas to life?</h3>
              <p className="text-zinc-400 max-w-xl">Join thousands of creators using YVO3D to create stunning 3D models with AI.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="premium" size="lg" className="min-w-[140px]">
                Get Started
              </Button>
              <Button variant="minimal" size="lg" className="group">
                See Plans
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand and Newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="inline-flex items-center mb-8 group transition-transform duration-300 hover:scale-105">
              <div className="h-10 w-10 bg-gradient-to-tr from-black to-zinc-800 rounded-full flex items-center justify-center mr-3 border border-white/10">
                <img src="/lovable-uploads/4ba1134c-9ced-4a73-9f44-a0b9ab07513a.png" alt="YVO3D Logo" className="h-7 w-7" />
              </div>
              <span className="text-2xl font-medium text-white">YVO3D</span>
            </Link>
            
            <p className="text-base text-zinc-400 max-w-sm mb-8 leading-relaxed">
              Create stunning 3D assets with AI. Transform ideas into professional 3D models in seconds without technical expertise.
            </p>
            
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-white mb-3">Subscribe to our newsletter</h3>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-white/5 border border-white/10 rounded-l-lg px-4 py-2.5 text-white flex-grow focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <Button variant="premium" className="rounded-l-none" noAnimation>
                  Subscribe
                </Button>
              </div>
              <p className="mt-2 text-xs text-zinc-500">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {footerLinks.map((group) => (
                <div key={group.title}>
                  <h3 className="text-sm font-semibold text-white mb-5">{group.title}</h3>
                  <ul className="space-y-4">
                    {group.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          to={link.href} 
                          className="text-zinc-400 hover:text-white text-sm transition-colors duration-300 flex items-center group"
                        >
                          {link.name}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                            <ArrowUpRight size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-zinc-400 text-sm">
            © {currentYear} YVO3D. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-8 md:mt-0">
            <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} label="Twitter" />
            <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} label="Instagram" />
            <SocialLink href="https://youtube.com" icon={<Youtube size={18} />} label="YouTube" />
            <SocialLink href="https://github.com" icon={<Github size={18} />} label="GitHub" />
            <SocialLink href="mailto:info@yvo3d.com" icon={<Mail size={18} />} label="Email" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => {
  return (
    <motion.a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-zinc-400 hover:text-white transition-colors duration-300 hover:scale-110 block"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
};

export default Footer;