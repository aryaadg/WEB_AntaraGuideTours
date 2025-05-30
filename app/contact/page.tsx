"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock, FaEnvelope, FaInstagram, FaFacebook, FaTiktok,FaTripadvisor } from 'react-icons/fa';
import { SiGooglemaps } from 'react-icons/si';

export default function ContactPage() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/6281338544519", "_blank")
  }

  const handleSocialClick = (url: string) => {
    window.open(url, "_blank")
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
<main className="bg-white min-h-screen pt-24 pb-20 px-4">
      <section className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with us through our social media or direct contacts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">
                    Jl. Ir Sutami  Br. Tengkulak Mas, Desa Kemenuh, Sukawati, Gianyar Bali
                  </p>
                </div>
              </div>

              {/* Phone Numbers */}
              <div className="flex items-start gap-4">
                <FaPhone className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone Numbers</h3>
                  <ul className="text-gray-600 space-y-2">
                    <li>+62 822-6622-7866 (Ibu Jro Puspa)</li>
                    <li>+62 812-4650-3411 (Wayan Ariadi)</li>
                    <li>+62 812-386-2099 (Ketut Sujata)</li>
                    <li>+62 813-3925-9935 (Komang Alit)</li>
                  </ul>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <FaEnvelope className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">info.tirtakipasunggrigis@gmail.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <FaClock className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Sunday: 9:00 AM - 5:00 PM<br />
                    Ceremonies by appointment
                  </p>
                </div>
              </div>
            </div>
          </div>

        {/* Social Media Section */}
<div className="bg-gray-50 p-8 rounded-xl shadow-lg border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Social Media</h2>
  
  <div className="space-y-4">
    {/* Instagram */}
    <a
      href="https://www.instagram.com/tirta.kipasunggrigis?igsh=MW1tcHl6MmE1YWJ6MA=="
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition duration-300 shadow-md"
    >
      <FaInstagram className="text-2xl" />
      <span className="font-medium">@ki_pacung_grigis</span>
    </a>

    {/* Facebook */}
    <a
      href="https://www.facebook.com/share/1Eo1dK6428/?mibextid=wwXIfr"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300 shadow-md"
    >
      <FaFacebook className="text-2xl" />
      <span className="font-medium">Petirtan Ki Pacung Grigis</span>
    </a>

    {/* TikTok */}
    <a
      href="https://www.tiktok.com/@tirta.kipasunggrigis?_t=ZS-8w2L94pxUvg&_r=1"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-black hover:bg-gray-800 text-white rounded-lg transition duration-300 shadow-md"
    >
      <FaTiktok className="text-2xl" />
      <span className="font-medium">@ki_pacung_grigis</span>
    </a>

    {/* WhatsApp */}
    <a
      href="http://wa.me/6282266227866"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300 shadow-md"
    >
      <FaWhatsapp className="text-2xl" />
      <span className="font-medium">Chat via WhatsApp</span>
    </a>

    {/* Google Maps */}
    <a
      href="https://g.co/kgs/mVN2rVP"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-300 shadow-md"
    >
      <SiGooglemaps className="text-2xl" />
      <span className="font-medium">View on Google Maps</span>
    </a>

    {/* TripAdvisor */}
    <a
      href="YOUR_TRIPADVISOR_LINK_HERE"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 bg-[#34E0A1] hover:bg-[#2AC98F] text-white rounded-lg transition duration-300 shadow-md"
    >
      <FaTripadvisor className="text-2xl" />
      <span className="font-medium">Visit us on TripAdvisor</span>
    </a>
  </div>
</div>
        
        {/* bawah */}
        </div>

      </section>
    </main>

      <Footer />
    </div>
  )
}