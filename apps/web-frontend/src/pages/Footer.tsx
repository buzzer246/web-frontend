// components/Footer.tsx
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Address Section */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Our Company</h3>
            <address className="not-italic">
              <p>123 Business Avenue</p>
              <p>Suite 456</p>
              <p>San Francisco, CA 94107</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@company.com</p>
            </address>
          </div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-gray-300 transition">About Us</Link></li>
              <li><Link href="/services" className="hover:text-gray-300 transition">Services</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300 transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300 transition">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-gray-300 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition"
              >
                <FaFacebook className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="bg-blue-400 hover:bg-blue-500 p-3 rounded-full transition"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-pink-600 hover:bg-pink-700 p-3 rounded-full transition"
              >
                <FaInstagram className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="bg-blue-700 hover:bg-blue-800 p-3 rounded-full transition"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="bg-red-600 hover:bg-red-700 p-3 rounded-full transition"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded-l text-gray-800 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} PearlThoughts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}