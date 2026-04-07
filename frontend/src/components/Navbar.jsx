import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top banner */}
      <div className="bg-black text-white text-center text-xs py-2 px-4">
        Sign up and get 20% off your first order.{' '}
        <Link to="/register" className="underline font-semibold">Sign Up Now</Link>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-100'}`}>
        <div className="container-main">
          <div className="flex items-center justify-between h-16">
            {/* Hamburger (mobile) */}
            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo */}
            <Link to="/" className="font-black text-2xl tracking-tighter">SHOP.CO</Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <div className="relative group">
                <button className="flex items-center gap-1 hover:opacity-70 transition-opacity">
                  Shop <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                  {['casual','formal','party','gym'].map(cat => (
                    <Link key={cat} to={`/products?category=${cat}`} className="block px-4 py-2.5 capitalize hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl text-sm">
                      {cat}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/products?sort=price_asc" className="hover:opacity-70 transition-opacity">On Sale</Link>
              <Link to="/products?isNew=true" className="hover:opacity-70 transition-opacity">New Arrivals</Link>
              <Link to="/products" className="hover:opacity-70 transition-opacity">Brands</Link>
            </div>

            {/* Search bar (desktop) */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 gap-2">
              <Search size={16} className="text-gray-400 shrink-0" />
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="bg-transparent text-sm w-full outline-none"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </form>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              {/* Mobile search */}
              <button className="md:hidden p-2" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                <Search size={20} />
              </button>

              {/* Cart */}
              <Link to="/cart" className="relative p-2" aria-label="Cart">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              {user ? (
                <div className="relative">
                  <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="p-2 flex items-center gap-1 text-sm font-medium">
                    <User size={20} />
                    <span className="hidden md:block">{user.name?.split(' ')[0]}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-xl z-50">
                      <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500">{user.email}</div>
                      {user.role === 'admin' && (
                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50">Admin Panel</Link>
                      )}
                      <Link to="/orders" onClick={() => setUserMenuOpen(false)} className="block px-4 py-2.5 text-sm hover:bg-gray-50">My Orders</Link>
                      <button onClick={() => { logout(); setUserMenuOpen(false); }} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 flex items-center gap-2 text-red-500 rounded-b-xl">
                        <LogOut size={14} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="p-2" aria-label="Login"><User size={22} /></Link>
              )}
            </div>
          </div>

          {/* Mobile search bar */}
          {searchOpen && (
            <div className="md:hidden pb-3">
              <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-4 py-2 gap-2">
                <Search size={16} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="bg-transparent text-sm flex-1 outline-none"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="container-main py-4 flex flex-col gap-4 text-sm font-medium">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Shop by Style</p>
                {['casual','formal','party','gym'].map(cat => (
                  <Link key={cat} to={`/products?category=${cat}`} onClick={() => setMenuOpen(false)} className="block py-2 capitalize border-b border-gray-50">
                    {cat}
                  </Link>
                ))}
              </div>
              <Link to="/products?sort=price_asc" onClick={() => setMenuOpen(false)}>On Sale</Link>
              <Link to="/products?isNew=true" onClick={() => setMenuOpen(false)}>New Arrivals</Link>
              {!user && (
                <div className="flex gap-3 pt-2">
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-center flex-1">Login</Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-center flex-1">Register</Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
