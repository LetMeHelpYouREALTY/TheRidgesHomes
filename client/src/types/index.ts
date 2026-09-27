export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  tag?: {
    type: string;
    color: 'primary' | 'secondary' | 'accent';
  };
}

export interface Testimonial {
  id: number;
  name: string;
  type: string;
  content: string;
  date: string;
  rating: number;
}

export interface CommunityFeature {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
  consent: boolean;
  company?: string;
}
