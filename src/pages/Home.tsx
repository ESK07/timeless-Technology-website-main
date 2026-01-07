can you remove our expertise section on this import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Code,
  Smartphone,
  Cloud,
  Brain,
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
  const features = [
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: "Custom Development",
      description:
        "Tailored software solutions built to meet your unique business requirements.",
    },
    {
      icon: <Smartphone className="h-8 w-8 text-green-500" />,
      title: "Mobile Applications",
      description:
        "Native and cross-platform mobile apps that deliver exceptional user experiences.",
    },
    {
      icon: <Cloud className="h-8 w-8 text-green-500" />,
      title: "Cloud Solutions",
      description:
        "Scalable cloud infrastructure and migration services for modern businesses.",
    },
    {
      icon: <Brain className="h-8 w-8 text-green-500" />,
      title: "AI Integration",
      description:
        "Intelligent automation and AI-powered features to transform your operations.",
    },
  ];

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
            We create innovative digital solutions that empower businesses to thrive in the modern world.
            Our digital offers start from the needs and wants of you, our customer. As technology advances and users evolve, we tailor our service scope to meet the complex demands of businesses and users. We strive to ensure that our solutions are developed to fit into your current ways of working, so, you need not to change how you work in order to employ the system.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:scale-105 transition"
            >
           <span>Get Started</span>
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

      {/* Features Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Expertise
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in cutting-edge technologies to deliver solutions that drive your business forward.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:scale-105 transition"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mt-6 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Services */}
          <div className="mt-20">
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Why Choose Timeless Technology?
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We combine technical expertise with business acumen to deliver solutions that not only work flawlessly but also drive real business results.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-green-50 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition-all duration-300">
                <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure & Reliable</h3>
                <p className="text-gray-600 text-sm">Enterprise-grade security standards</p>
              </div>
              <div className="bg-green-50 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition-all duration-300">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
                <p className="text-gray-600 text-sm">Skilled professionals at your service</p>
              </div>
              <div className="bg-green-50 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition-all duration-300">
                <Award className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Award Winning</h3>
                <p className="text-gray-600 text-sm">Recognized for excellence</p>
              </div>
              <div className="bg-green-50 backdrop-blur-sm border border-green-200 rounded-xl p-6 text-center hover:bg-green-100 transition-all duration-300">
                <ArrowRight className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Future Ready</h3>
                <p className="text-gray-600 text-sm">Built for tomorrow's challenges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Let's discuss how we can help you achieve your technology goals and stay ahead of the competition.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 space-x-2"
          >
            <span>Start Your Project</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
