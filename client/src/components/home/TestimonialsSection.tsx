import { GOOGLE_REVIEWS_URL } from '@/lib/constants';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 px-4 md:px-8 bg-primary">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Client Reviews</h2>
        <p className="text-lg text-neutral-200 max-w-3xl mx-auto mb-8">
          Read what clients say about working with Dr. Jan Duffy on her Google Business Profile.
        </p>
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-white hover:bg-neutral-100 text-primary font-secondary font-medium py-3 px-8 rounded transition-standard"
        >
          Read Reviews on Google
        </a>
      </div>
    </section>
  );
};

export default TestimonialsSection;
