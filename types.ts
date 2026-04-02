import React from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  duration: string;
  price: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  id: string;
  name: string;
  timeframe: string; // e.g., "12 Weeks"
  result: string;    // e.g., "-15kg Fat Loss"
  quote: string;
  imageBefore: string;
  imageAfter: string;
}

export interface NavItem {
  label: string;
  href: string;
}