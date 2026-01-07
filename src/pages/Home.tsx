import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Users,
  Award,
  CheckCircle,
} from "lucide-react";

/* =========================
   Animated Counter Component
========================= */
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div
      ref={ref}
      className="text-4xl md:text-5xl font-bold text-green-600 mb-2"
    >
      {count}
      {suffix}
    </div>
  );
};

/* =========================
   Home Component
========================= */
const Home = () => {
  const services = [
    { title: "Microsoft 365", image: "/images/microsoft365.jpg" },
    { title: "Local Area Network", image: "/images/lan.jpg" },
    { title: "IP PBX Solution", image: "/images/pbx.jpg" },
  ];

  const stats = [
    { value: 150, suffix: "+", label: "Projects Completed" },
    { value: 50, suffix: "+", label: "Happy Clients" },
    { value: 5, suffix: "+", label: "Years Experience" },
    { value: 24, suffix: "/7", label: "Support Available" },
  ];

  const benefits = [
    "Cutting-edge technology stack",
    "Agile development methodology",
    "Dedicated project management",
    "Post-launch support and maintenance",
    "Scalable and secure solutions",
    "Competitive pricing",
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-800 via-emerald-900 to-green-800">
        <div className="absolute inset-0 bg-white/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Building the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              {" "}
              Future{" "}
            </span>
            of Technology
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We create innovative digital solutions that empower businesses to
            thrive in the modern world. Our digital offers start from the needs
            and wants of you, our customer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:scale-105 transition"
            >
              Get Started
            </Link>
            <Link
              to="/portfolio"
              className="border border-white/40 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                />
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">
            Our Services
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg hover:scale-105 transition"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 text-center font-semibold">
                  {service.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Why Choose Timeless Technology?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InfoCard icon={<Shield />} title="Secure & Reliable" />
              <InfoCard icon={<Users />} title="Expert Team" />
              <InfoCard icon={<Award />} title="Award Winning" />
              <InfoCard icon={<ArrowRight />} title="Future Ready" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-50 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Transform Your Business?
        </h2>
        <Link
          to="/contact"
          className="inline-flex items-center bg-green-600 text-white px-8 py-4 rounded-lg hover:scale-105 transition"
        >
          Start Your Project
          <ArrowRight className="ml-2" />
        </Link>
      </section>
    </div>
  );
};

const InfoCard = ({ icon, title }) => (
  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition">
    <div className="text-green-500 mx-auto mb-4 h-12 w-12">
      {icon}
    </div>
    <h3 className="font-semibold">{title}</h3>
  </div>
);

export default Home;
