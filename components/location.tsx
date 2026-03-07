"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, ExternalLink } from "lucide-react";
import { RESTAURANT_DATA } from "@/data/restaurant";
import ScrollReveal from "@/components/ui/scroll-reveal";

export default function Location() {
  return (
    <section id="location" className="py-24 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <h2 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Find Us</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Visit Our <span className="text-secondary">Kitchen</span>
            </h3>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl mb-1">Address</div>
                  <p className="text-white/60 leading-relaxed">{RESTAURANT_DATA.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl mb-1">Phone</div>
                  <a href={`tel:${RESTAURANT_DATA.phoneClean}`} className="text-white/60 hover:text-primary transition-colors">
                    {RESTAURANT_DATA.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-2xl text-primary shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="font-bold text-xl mb-1">Opening Hours</div>
                  <p className="text-white/60">{RESTAURANT_DATA.openingHours}</p>
                  <p className="text-green-400 text-sm font-bold mt-1 uppercase tracking-wider">● Open Now</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <a
                href={RESTAURANT_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
              >
                <Navigation size={20} />
                Get Directions
              </a>
              <a
                href={`tel:${RESTAURANT_DATA.phoneClean}`}
                className="bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </ScrollReveal>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <iframe
              src={RESTAURANT_DATA.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-90 hover:opacity-100 transition-opacity"
            />
            <a
              href={RESTAURANT_DATA.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-4 right-4 glass p-2.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ExternalLink size={18} className="text-white/60" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
