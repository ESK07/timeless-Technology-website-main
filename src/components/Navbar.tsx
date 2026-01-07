import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const location = useLocation();

  /* ---------- Scroll Logic ---------- */
  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 60);

      if (currentY > lastY) setScrollDirection("down");
      else setScrollDirection("up");

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------- Dark Mode ---------- */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    {
      label: "Services",
      children: [
        { path: "/internet-services", label: "Internet Services" },
        { path: "/cloud-services", label: "Cloud Services" },
        { path: "/connectivity", label: "Connectivity" },
        { path: "/services", label: "All we do" },
      ],
    },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`
        fixed w-full z-50 transition-all duration-500
        ${scrollDirection === "down" ? "-translate-y-20" : "translate-y-0"}
        ${
          scrolled
            ? "bg-white dark:bg-black backdrop-blur-2xl shadow-lg"
            : "bg-white dark:bg-black shadow-sm"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/images/timeless.png"
              alt="Timeless Technology Logo"
              className={`transition-all duration-500 w-auto ${
                scrolled ? "h-10" : "h-14"
              }`}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) =>
              item.children ? (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-500 transition"
                  >
                    {item.label}
                  </button>

                  {servicesOpen && (
                    <div className="absolute left-0 mt-3 w-56 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl py-2 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setServicesOpen(false)}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 group"
                >
                  {item.label}
                  <span
                    className={`absolute left-0 bottom-0 h-0.5 bg-green-500 transition-all duration-300 ${
                      location.pathname === item.path
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-black shadow-xl z-40 transform transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 space-y-4">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label}>
                <button
                  onClick={() => setServicesOpen(!servicesOpen)}
                  className="w-full text-left text-gray-700 dark:text-gray-300 font-medium"
                >
                  {item.label}
                </button>

                {servicesOpen && (
                  <div className="ml-4 space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => {
                          setIsOpen(false);
                          setServicesOpen(false);
                        }}
                        className="block text-gray-700 dark:text-gray-300"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 dark:text-gray-300"
              >
                {item.label}
              </Link>
            )
          )}

          {/* Mobile Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-6 flex items-center gap-2 p-2 bg-gray-200 dark:bg-gray-800 rounded"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
