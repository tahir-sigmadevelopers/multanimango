import React from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Truck, 
  Shield, 
  Star, 
  Award, 
  Users, 
  Globe, 
  Leaf,
  Phone,
  Mail,
  MapPin,
  MessageCircle
} from "lucide-react";

const teamMembers = [
  {
    name: "Ayoub Khan",
    role: "Founder & CEO",
    img: "/ayoub.jpg",
    bio: "Passionate about bringing the best mangoes to customers worldwide.",
    whatsapp: "923044709479"
  },
  {
    name: "Younis Irfan",
    role: "Marketing Head",
    img: "/younis.jpg",
    bio: "Expert in digital marketing and customer engagement strategies.",
    whatsapp: "923012826151"
  },
  {
    name: "Usama Hanan",
    role: "Operations Manager",
    img: "/usama.jpg",
    bio: "Ensuring smooth operations and quality control across all processes.",
    whatsapp: "923088678762"
  },
];

const stats = [
  { number: "10K+", label: "Happy Customers", icon: Heart },
  { number: "50+", label: "Farm Partners", icon: Leaf },
  { number: "100%", label: "Fresh Quality", icon: Shield },
  { number: "24/7", label: "Support", icon: Phone },
];

const values = [
  {
    icon: Heart,
    title: "Quality First",
    description: "We never compromise on the quality of our mangoes. Every fruit is hand-picked and carefully selected."
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery in major cities, ensuring your mangoes reach you at peak freshness."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Secure payments and guaranteed satisfaction with every order you place."
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. We're here to make your mango experience exceptional."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br md:pt-20 from-yellow-50 via-orange-50 to-yellow-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-orange-300 rounded-full opacity-30 animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-400 rounded-full opacity-40 animate-ping"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl font-extrabold text-yellow-800 mb-6"
            >
              About MangoStore
              <span className="block text-6xl md:text-8xl">🥭</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-4xl mx-auto text-xl md:text-2xl text-yellow-700 leading-relaxed mb-8"
            >
              Bringing the finest Pakistani mangoes to your doorstep with love, 
              care, and unmatched quality since 2020.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex justify-center items-center gap-4 text-yellow-600"
            >
              <Star className="w-6 h-6 fill-current" />
              <span className="text-lg font-semibold">Premium Quality</span>
              <Star className="w-6 h-6 fill-current" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
              hidden: { opacity: 0, y: 50 },
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-800 mb-2">
                  {stat.number}
                </div>
                <div className="text-yellow-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: -50 },
              }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-yellow-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-yellow-700 leading-relaxed mb-6">
                At MangoStore, we're passionate about connecting you with the finest 
                Pakistani mangoes. Our mission is to bring the authentic taste of 
                Pakistan's most beloved fruit directly to your home, ensuring every 
                bite is a moment of pure joy.
              </p>
              <p className="text-lg text-yellow-700 leading-relaxed mb-8">
                We work directly with local farmers, ensuring fair prices and 
                sustainable practices while delivering exceptional quality that 
                our customers deserve.
              </p>
              <div className="flex items-center gap-4 text-yellow-600">
                <Globe className="w-6 h-6" />
                <span className="font-semibold">Serving Pakistan & Beyond</span>
              </div>
            </motion.div>

            <motion.div
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0, x: 50 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-white">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold mb-4">Farm to Table</h3>
                <p className="text-yellow-100 leading-relaxed">
                  Every mango in our collection is carefully selected from the finest 
                  orchards across Pakistan, ensuring you get the most authentic and 
                  delicious experience possible.
                </p>
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-300 rounded-full animate-bounce"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white/30">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-yellow-800 mb-6"
            >
              Our Values
            </motion.h2>
            <motion.p
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-yellow-700 max-w-3xl mx-auto"
            >
              The principles that guide everything we do
            </motion.p>
          </motion.div>

          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
              hidden: { opacity: 0, y: 50 },
            }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-yellow-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-yellow-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-bold text-yellow-800 mb-6"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-yellow-700 max-w-3xl mx-auto"
            >
              The passionate individuals behind MangoStore's success
            </motion.p>
          </motion.div>

          <motion.div
            variants={{
              visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2 } },
              hidden: { opacity: 0, y: 50 },
            }}
            className="grid md:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 30 },
                }}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-yellow-200 group-hover:border-yellow-400 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-yellow-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-yellow-600 font-semibold mb-4">
                  {member.role}
                </p>
                <p className="text-yellow-700 mb-6 leading-relaxed">
                  {member.bio}
                </p>
                
                <div className="flex justify-center gap-4">
                  <a
                    href={`https://wa.me/${member.whatsapp}?text=Hello ${member.name}, I'm interested in your mango business!`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                    title="Contact on WhatsApp"
                  >
                    <svg 
                      className="w-6 h-6 text-white" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Taste the Difference?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 leading-relaxed">
              Join thousands of satisfied customers who have discovered the authentic 
              taste of Pakistani mangoes through MangoStore.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="bg-white text-yellow-800 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Shopping Now 🥭
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
