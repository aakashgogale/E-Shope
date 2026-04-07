import { Link } from 'react-router-dom';
import { MessageCircle, Send, Globe, Rss } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-12 pb-6">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-black text-2xl tracking-tighter block mb-3">SHOP.CO</Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              We have clothes that suit your style and that you're proud to wear. From women to men.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {[{ Icon: Send, href: '#' }, { Icon: Globe, href: '#' }, { Icon: MessageCircle, href: '#' }, { Icon: Rss, href: '#' }].map(({ Icon, href }, i) => (
                <a key={i} href={href} className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-all duration-200">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>


          {/* Links */}
          {[
            { title: 'Company', links: ['About', 'Features', 'Works', 'Career'] },
            { title: 'Help', links: ['Customer Support', 'Delivery Details', 'Terms & Conditions', 'Privacy Policy'] },
            { title: 'FAQ', links: ['Account', 'Manage Deliveries', 'Orders', 'Payments'] },
            { title: 'Resources', links: ['Free eBooks', 'Development Tutorial', 'How to - Blog', 'Youtube Playlist'] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-black transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">SHOP.CO © 2000-2025, All Rights Reserved</p>
          <div className="flex items-center gap-2">
            {['VISA', 'Mastercard', 'PayPal', 'Apple Pay', 'G Pay'].map(method => (
              <span key={method} className="px-2.5 py-1 border border-gray-200 rounded text-xs text-gray-600 font-medium">{method}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
