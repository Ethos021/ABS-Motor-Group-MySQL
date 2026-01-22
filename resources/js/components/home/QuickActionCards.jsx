import React from "react";
import { Link } from "@inertiajs/react";
import { Search, DollarSign, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const quickActions = [
  {
    icon: Search,
    title: "Search Stock",
    description: "With one of the largest prestige vehicle ranges, search and find yourself the perfect car.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=600&fit=crop",
    href: "/browse",
  },
  {
    icon: DollarSign,
    title: "Sell Your Car",
    description: "Trust our team of luxury and prestige experts to provide a competitive offer on your car.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop",
    href: "/sell",
  },
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Speak to a member of our team or find directions to our showroom.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop",
    href: "/contact",
  },
];

export default function QuickActionCards() {
  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={action.href}>
                  <Card className="bg-zinc-900 border-zinc-800 hover:border-red-500 transition h-full">
                    <CardContent className="p-8 min-h-[300px] flex flex-col">
                      <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <h3 className="text-xl font-bold mb-3">{action.title}</h3>
                      <p className="text-zinc-400 flex-grow">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
