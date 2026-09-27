import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { SITE_INFO } from '@/lib/constants';
import type { ContactFormData } from '@/types';

const formSchema = z.object({
  firstName: z.string().min(2, { message: 'First name is required' }),
  lastName: z.string().min(2, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  interest: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine(val => val === true, {
    message: 'You must consent to receive communications'
  }),
  company: z.string().optional(),
});

const submitErrorMessage = `Sorry, something went wrong sending your message. Please call or text Dr. Jan Duffy at ${SITE_INFO.phone}.`;

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: 'buying',
      message: '',
      consent: false,
      company: '',
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Map consent field to match server-side expectation
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          sourceUrl: window.location.href,
        })
      });
      
      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        toast({
          title: "Message Sent Successfully",
          description: "Thank you for contacting Dr. Jan Duffy. She will respond to your inquiry shortly.",
        });
        
        form.reset();
      } else {
        toast({
          title: "Error Sending Message",
          description: submitErrorMessage,
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error Sending Message",
        description: submitErrorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">Contact Dr. Jan Duffy</h2>
            <p className="text-lg text-neutral-600 mb-8">
              Whether you're looking to buy, sell, or simply learn more about The Ridges Summerlin, I'm here to help you achieve your real estate goals.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4 text-white">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary">Phone</h4>
                  <p className="text-neutral-600">
                    <a 
                      href={`tel:${SITE_INFO.phone.replace(/[^\d+]/g, '')}`} 
                      className="hover:text-secondary transition-standard"
                    >
                      {SITE_INFO.phone}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4 text-white">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary">Email</h4>
                  <p className="text-neutral-600">
                    <a 
                      href={`mailto:${SITE_INFO.email}`}
                      className="hover:text-secondary transition-standard"
                    >
                      {SITE_INFO.email}
                    </a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4 text-white">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary">Office</h4>
                  <p className="text-neutral-600">
                    {SITE_INFO.address.street}<br />
                    {SITE_INFO.address.city}, {SITE_INFO.address.state} {SITE_INFO.address.zip}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary rounded-full p-3 mr-4 text-white">
                  <i className="fas fa-clock"></i>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-primary">Hours</h4>
                  <p className="text-neutral-600">
                    {SITE_INFO.hours.weekdays}<br />
                    {SITE_INFO.hours.weekends}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              {Object.entries(SITE_INFO.social).map(([platform, url]) => (
                <a 
                  key={platform}
                  href={url} 
                  className="bg-neutral-800 hover:bg-black text-white rounded-full w-10 h-10 flex items-center justify-center transition-standard"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${platform}`}
                >
                  <i className={`fab fa-${platform}`}></i>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <div className="bg-neutral-100 rounded-lg p-8 shadow-lg">
              <h3 className="text-2xl font-display font-bold text-primary mb-6">Send a Message</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute left-[-9999px] h-0 w-0 opacity-0 pointer-events-none"
                    {...form.register('company')}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-secondary text-sm">First Name*</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-secondary text-sm">Last Name*</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-secondary text-sm">Email*</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="email"
                              className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-neutral-700 font-secondary text-sm">Phone*</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="tel"
                              className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-secondary text-sm">I'm Interested In</FormLabel>
                        <FormControl>
                          <Select 
                            value={field.value} 
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="buying">Buying a Property</SelectItem>
                              <SelectItem value="selling">Selling a Property</SelectItem>
                              <SelectItem value="valuation">Home Valuation</SelectItem>
                              <SelectItem value="community">Community Information</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 font-secondary text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            rows={4}
                            className="px-4 py-3 rounded border border-neutral-300 focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-20 outline-none transition-standard" 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="consent"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-2">
                        <FormControl>
                          <Checkbox 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                            id="consent" 
                            className="mt-1 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary"
                          />
                        </FormControl>
                        <div className="text-sm text-neutral-600">
                          <FormLabel htmlFor="consent" className="font-normal">
                            I consent to receiving emails and communications from Dr. Jan Duffy. I understand my data will be processed in accordance with the Privacy Policy.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-secondary hover:bg-secondary-dark text-white font-secondary font-medium py-3 rounded transition-standard"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
