import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle mobile menu toggle
  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenuContainer = document.querySelector(
        ".mobile-menu-container"
      );
      const hamburgerButton = document.querySelector(".hamburger-button");

      if (
        isMobileMenuOpen &&
        mobileMenuContainer &&
        !mobileMenuContainer.contains(target) &&
        hamburgerButton &&
        !hamburgerButton.contains(target)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Gallery", path: "/gallery" },
    { name: "Book", path: "/booking" },
    { name: "AdminPage", path: "/admin" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm z-50"
            : "bg-transparent z-50"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-space font-light tracking-tight relative z-50"
            >
              <span
                className={`transition-colors duration-300 ${
                  isScrolled ? "text-barbershop-black" : "text-white"
                }`}
              >
                Solution
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-12">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 relative group ${
                    isScrolled
                      ? "text-barbershop-black hover:text-barbershop-gray-600"
                      : "text-white/90 hover:text-white"
                  } ${location.pathname === link.path ? "font-semibold" : ""}`}
                >
                  {link.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                      isScrolled ? "bg-barbershop-black" : "bg-white"
                    } ${location.pathname === link.path ? "w-full" : ""}`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`hamburger-button md:hidden p-3 relative z-50 touch-none select-none ${
                isScrolled || isMobileMenuOpen
                  ? "text-barbershop-black"
                  : "text-white"
              }`}
              style={{
                WebkitTouchCallout: "none",
                touchAction: "manipulation",
              }}
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Menu container */}
          <div className="mobile-menu-container fixed top-0 right-0 h-full w-full bg-white pt-24 px-6 z-40">
            <div className="flex flex-col space-y-8 ">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-xl font-medium text-barbershop-black hover:text-barbershop-gray-600 transition-colors duration-200 py-4 border-b border-barbershop-gray-100  ${
                    location.pathname === link.path ? "font-semibold" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Call to action in mobile menu */}
              <div className="pt-8">
                <Link
                  to="/booking"
                  className="premium-button w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
