import { servicesImages } from './images';

export const servicesData = [
  {
    id: 'bridal',
    featured: true,
    image: servicesImages.bridal,
    imageAlt: "Bridal Artistry",
    title: "Bridal Artistry",
    price: "From $500",
    description: "The ultimate bridal experience. A comprehensive, personalized makeup application designed to ensure you look breathtaking in person and flawless on camera throughout your wedding day. Includes a thorough pre-wedding consultation and trial, skin preparation with luxury skincare, and application using premium, long-wearing professional cosmetics.",
    linkText: "Book This Service",
    linkTo: "/booking?service=bridal"
  },
  {
    id: 'engagement',
    image: servicesImages.engagement,
    imageAlt: "Engagement Makeup",
    title: "Engagement Makeup",
    price: "From $250",
    description: "Perfectly pitched glamour for your engagement photos or celebration. Enhancing your natural beauty for a radiant, memorable look.",
    linkText: "Inquire",
    linkTo: "/booking?service=engagement"
  },
  {
    id: 'editorial',
    image: servicesImages.editorial,
    imageAlt: "Editorial Makeup",
    title: "Editorial & Print",
    price: "Half/Full Day Rates",
    description: "Precision artistry for fashion, commercial, and print campaigns. Specialized in high-definition camera readiness and creative briefs.",
    linkText: "Inquire",
    linkTo: "/booking?service=editorial"
  },
  {
    id: 'airbrush',
    isAddon: true,
    icon: "air",
    title: "Airbrush Makeup",
    price: "Add-on: $75",
    description: "A lightweight, silicone-based formula sprayed onto the skin as a fine mist, providing a flawless, water-resistant, and incredibly long-lasting finish. Ideal for humid climates or HD photography.",
    linkText: "Learn More",
    linkTo: "/services#airbrush"
  },
  {
    id: 'hair',
    image: servicesImages.hair,
    imageAlt: "Hair Styling",
    title: "Hair Styling",
    price: "From $150",
    description: "From classic Hollywood waves to intricate romantic updos. Expert styling to perfectly complement your makeup and overall aesthetic.",
    linkText: "Inquire",
    linkTo: "/booking?service=hair"
  },
  {
    id: 'event',
    isAddon: true,
    icon: "celebration",
    title: "Event Artistry",
    price: "From $200",
    description: "Stand out at any gala, prom, or special event. Custom makeup tailored to your outfit and the event's atmosphere, ensuring you feel confident and beautiful.",
    linkText: "Book Now",
    linkTo: "/booking?service=event"
  }
];
