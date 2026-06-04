import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  return (
    <button
        type="button"
        onClick={onClick}
        className="group relative min-h-[340px] w-full overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-500 ease-out hover:border-brand/50 hover:shadow-[0_12px_24px_rgba(0,0,0,0.08)] focus-visible:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_2px_8px_rgba(0,0,0,0.2)] dark:hover:border-brand/50 dark:hover:shadow-[0_12px_24px_rgba(204,255,0,0.1)] md:h-[340px]"
    >
        {/* Default Content: Icon & Title */}
        <div className="absolute inset-0 hidden flex-col items-center justify-center p-8 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-90 group-hover:-translate-y-4 group-focus-visible:opacity-0 group-focus-visible:scale-90 group-focus-visible:-translate-y-4 md:flex">
            <div className="relative flex items-center justify-center w-28 h-28 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-[1.5rem] mb-8 shadow-[inset_0_1px_4px_rgba(0,0,0,0.02)] group-hover:bg-brand/10 group-focus-visible:bg-brand/10 transition-colors">
                {/* Decorative Screws */}
                <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full" />
                
                <div className="text-gray-800 dark:text-white group-hover:text-black dark:group-hover:text-brand group-focus-visible:text-black dark:group-focus-visible:text-brand transition-colors">
                    {service.icon}
                </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center tracking-tight">{service.title}</h3>
            <div className="mt-3 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold rounded-full border border-gray-100 dark:border-gray-700">
                {service.price}
            </div>
        </div>

        {/* Hover Content: Details & Action */}
        <div className="relative flex min-h-[340px] flex-col items-center justify-center bg-white p-8 text-center opacity-100 transition-all duration-300 ease-out dark:bg-gray-900 md:absolute md:inset-0 md:min-h-0 md:translate-y-8 md:scale-95 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:scale-100 md:group-hover:opacity-100 md:group-focus-visible:translate-y-0 md:group-focus-visible:scale-100 md:group-focus-visible:opacity-100">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
            <div className="mb-4 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-semibold rounded-full border border-gray-100 dark:border-gray-700 md:hidden">
                {service.price}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8 line-clamp-4">
                {service.description}
            </p>

            <div className="mt-auto w-full flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider">
                    <Clock size={14} />
                    <span>{service.duration}</span>
                </div>
                
                <span className="flex items-center justify-center w-14 h-14 bg-brand text-black rounded-2xl shadow-lg group-hover:bg-brand-hover group-hover:scale-110 group-focus-visible:bg-brand-hover group-focus-visible:scale-110 transition-all">
                    <ArrowRight size={24} />
                </span>
            </div>
        </div>
    </button>
  );
};
