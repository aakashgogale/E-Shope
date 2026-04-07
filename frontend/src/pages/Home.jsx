import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react';
import api from '../lib/api';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import { useToast } from '../context/ToastContext';

// Fade-up animation helper
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

// Section wrapper with scroll reveal
const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-80px' }}
    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: 'easeOut' } } }}
    className={className}
  >
    {children}
  </motion.div>
);

const testimonials = [
  { name: 'Sarah M.', rating: 5, text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", verified: true },
  { name: 'Alex K.', rating: 5, text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.", verified: true },
  { name: 'James L.', rating: 5, text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point.", verified: true },
  { name: 'Moira', rating: 4, text: "The delivery was fast and the packaging was wonderful. I love how the clothes fit perfectly and the quality exceeds my expectations every time.", verified: true },
];

const Home = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/products?isNew=true&limit=4').then(r => setNewArrivals(r.data.products || [])).catch(() => {});
    api.get('/products?isTopSelling=true&limit=4').then(r => setTopSelling(r.data.products || [])).catch(() => {});
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await api.post('/newsletter', { email });
      addToast('🎉 Successfully subscribed!', 'success');
      setEmail('');
    } catch (err) {
      addToast(err.response?.data?.message || 'Subscription failed', 'error');
    } finally {
      setSubscribing(false);
    }
  };

  const visibleReviews = testimonials.slice(reviewIndex, reviewIndex + 3);
  const nextReview = () => setReviewIndex((reviewIndex + 1) % testimonials.length);
  const prevReview = () => setReviewIndex((reviewIndex - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="overflow-x-hidden">
      {/* ————— HERO ————— */}
      <section className="bg-gray-50 overflow-hidden">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row items-center min-h-[540px] py-12 gap-8">
            {/* Text */}
            <motion.div initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="flex-1 z-10">
              <h1 className="font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] uppercase mb-6">
                Find Clothes<br />That Matches<br />Your Style
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-md mb-8 leading-relaxed">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
              </p>
              <Link to="/products" className="btn-primary inline-block text-base px-10 py-4">
                Shop Now
              </Link>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-10 divide-x divide-gray-200">
                {[
                  { value: '200+', label: 'International Brands' },
                  { value: '2,000+', label: 'High-Quality Products' },
                  { value: '30,000+', label: 'Happy Customers' },
                ].map(({ value, label }) => (
                  <div key={label} className="first:pl-0 pl-6">
                    <p className="font-black text-3xl md:text-4xl">{value}</p>
                    <p className="text-gray-400 text-sm mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 flex justify-center relative"
            >
              {/* Decorative stars */}
              <div className="absolute top-8 left-4 text-3xl animate-pulse">✦</div>
              <div className="absolute bottom-12 right-4 text-5xl animate-pulse delay-700">✦</div>
              <img
                src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&q=90"
                alt="Fashion models"
                className="w-full max-w-lg object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ————— BRAND STRIP ————— */}
      <Reveal>
        <section className="bg-black py-5 overflow-hidden">
          <div className="flex items-center justify-center flex-wrap gap-8 md:gap-16 px-8">
            {['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'].map(brand => (
              <span key={brand} className={`text-white font-black tracking-tight select-none ${brand === 'PRADA' ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
                {brand}
              </span>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ————— NEW ARRIVALS ————— */}
      <section className="py-16">
        <div className="container-main">
          <Reveal>
            <h2 className="section-title mb-10">New Arrivals</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.length > 0
              ? newArrivals.map((p, i) => (
                  <Reveal key={p._id} delay={i * 0.1}>
                    <ProductCard product={p} />
                  </Reveal>
                ))
              : Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
                ))
            }
          </div>
          <div className="flex justify-center mt-10">
            <Link to="/products?isNew=true" className="btn-outline">View All</Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-main"><div className="border-t border-gray-100" /></div>

      {/* ————— TOP SELLING ————— */}
      <section className="py-16">
        <div className="container-main">
          <Reveal>
            <h2 className="section-title mb-10">Top Selling</h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {topSelling.length > 0
              ? topSelling.map((p, i) => (
                  <Reveal key={p._id} delay={i * 0.1}>
                    <ProductCard product={p} />
                  </Reveal>
                ))
              : Array(4).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
                ))
            }
          </div>
          <div className="flex justify-center mt-10">
            <Link to="/products?isTopSelling=true" className="btn-outline">View All</Link>
          </div>
        </div>
      </section>

      {/* ————— BROWSE BY DRESS STYLE ————— */}
      <section className="py-16 bg-gray-50">
        <div className="container-main">
          <Reveal>
            <div className="bg-gray-100 rounded-4xl p-8 md:p-12">
              <h2 className="section-title mb-10">Browse by Dress Style</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: 'Casual', img: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80', span: 'lg:col-span-2' },
                  { name: 'Formal', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80', span: 'lg:col-span-2' },
                  { name: 'Party', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&q=80', span: 'lg:col-span-2' },
                  { name: 'Gym', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80', span: 'lg:col-span-2' },
                ].map((cat, i) => (
                  <motion.div
                    key={cat.name}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className={`relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group ${cat.span}`}
                    onClick={() => navigate(`/products?category=${cat.name.toLowerCase()}`)}
                  >
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 font-black text-xl text-black bg-white bg-opacity-90 px-4 py-1.5 rounded-full">
                      {cat.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ————— TESTIMONIALS ————— */}
      <section className="py-16">
        <div className="container-main">
          <Reveal>
            <div className="flex items-center justify-between mb-10">
              <h2 className="section-title text-left">Our Happy Customers</h2>
              <div className="flex gap-2">
                <button onClick={prevReview} className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextReview} className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(reviewIndex % testimonials.length, (reviewIndex % testimonials.length) + 3).concat(
              testimonials.slice(0, Math.max(0, 3 - (testimonials.length - reviewIndex % testimonials.length)))
            ).slice(0, 3).map((t, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                  <StarRating rating={t.rating} />
                  <h4 className="font-bold mt-3 mb-1 flex items-center gap-1.5">
                    {t.name}
                    {t.verified && <CheckCircle size={14} className="text-green-500" />}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">"{t.text}"</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ————— NEWSLETTER ————— */}
      <section className="py-8">
        <div className="container-main">
          <Reveal>
            <div className="bg-black rounded-3xl px-8 md:px-14 py-12 flex flex-col md:flex-row items-center gap-8 justify-between">
              <h2 className="font-black text-3xl md:text-4xl text-white uppercase leading-tight max-w-xs md:max-w-sm">
                Stay Upto Date About Our Latest Offers
              </h2>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full md:w-auto md:min-w-[340px]">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-5 py-3.5 rounded-full bg-white text-sm outline-none w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" disabled={subscribing} className="bg-white text-black px-5 py-3.5 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors w-full disabled:opacity-70">
                  {subscribing ? 'Subscribing...' : 'Subscribe to Newsletter'}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
