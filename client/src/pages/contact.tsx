import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertInquiry, ContactContent } from "@shared/schema";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  // Fetch contact content
  const { data: contactContent } = useQuery<ContactContent>({
    queryKey: ['/api/contact-content'],
  });

  const createInquiry = useMutation({
    mutationFn: async (data: InsertInquiry) => {
      const response = await apiRequest("POST", "/api/inquiries", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createInquiry.mutate(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="pt-24 min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {contactContent?.title || "Ready to Get Started?"}
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {contactContent?.description || "Contact our expert team today to discuss your property and business service needs. We're here to provide personalized solutions for your success."}
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Phone</p>
                  <p className="text-gray-300">{contactContent?.phone || "+1 (555) 123-4567"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Email</p>
                  <p className="text-gray-300">{contactContent?.email || "info@prestigeproperties.com"}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 gold" />
                </div>
                <div>
                  <p className="text-white font-semibold">Address</p>
                  <p className="text-gray-300">{contactContent?.address || "123 Luxury Lane, Beverly Hills, CA 90210"}</p>
                </div>
              </div>
              
              {contactContent?.officeHours && (
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 gold" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Office Hours</p>
                    <p className="text-gray-300">{contactContent.officeHours}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="bg-white/5 backdrop-blur-sm border-white/20">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-white text-sm font-semibold mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Phone
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Service Interest
                    </label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white focus:border-yellow-400">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="properties">Property Investment</SelectItem>
                        <SelectItem value="company">Company Establishment</SelectItem>
                        <SelectItem value="visa">Visa Services</SelectItem>
                        <SelectItem value="banking">Banking Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-semibold mb-2">
                      Message *
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 resize-none"
                      placeholder="Tell us about your needs..."
                      rows={4}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold text-black hover:bg-yellow-500 font-semibold py-3"
                    disabled={createInquiry.isPending}
                  >
                    {createInquiry.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
