import React, { useState, useEffect } from 'react';
import { X, Clock, ArrowRight, CheckCircle2, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import { content, Language } from '../translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  lang: Language;
}

// Helper: Format Date to YYYY-MM-DD key for locking slots
const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// --- SIMULATED BACKEND DATA ---
// This generates some "booked" slots for the next few days so you can test the UI.
const getMockedBlockedSlots = () => {
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today); dayAfter.setDate(dayAfter.getDate() + 2);

    const keyTomorrow = formatDateKey(tomorrow);
    const keyDayAfter = formatDateKey(dayAfter);

    return {
        // Blocks 09:00 and 14:30 for Tomorrow
        [keyTomorrow]: ["09:00", "14:30"],
        // Blocks 11:00, 13:00, 16:00 for Day After Tomorrow
        [keyDayAfter]: ["11:00", "13:00", "16:00"]
    };
};

const BLOCKED_DB = getMockedBlockedSlots();

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, serviceTitle, lang }) => {
  const [step, setStep] = useState<1 | 2>(1);
  
  // State for the calendar
  const [viewDate, setViewDate] = useState(new Date()); // The month we are looking at
  const [selectedDateObj, setSelectedDateObj] = useState<Date | null>(null); // The specific day selected
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
        // Reset to today when opening
        setViewDate(new Date());
        setSelectedDateObj(null);
        setSelectedTime(null);
        setStep(1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const t = content[lang].modal;
  const resolvedServiceTitle = serviceTitle || content[lang].ui.defaultServiceTitle;
  const times = ["09:00", "09:30", "10:00", "11:00", "13:00", "14:30", "16:00"];

  // Calendar Logic
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth(); // 0-indexed

  // Get number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Get day of week the month starts on (0=Sun, 1=Mon, ...)
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Calculate padding based on Language preference
  // TR: Starts Monday (1). If month starts Sunday (0), padding is 6. If Monday (1), padding 0.
  // EN: Starts Sunday (0). Padding is simply firstDayOfWeek.
  let startOffset = 0;
  if (lang === 'tr') {
    startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  } else {
    startOffset = firstDayOfWeek;
  }

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    
    setSelectedDateObj(newDate);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2);
  };

  // Check if a specific time is blocked for the selected date
  const isTimeBlocked = (time: string) => {
      if (!selectedDateObj) return false;
      const key = formatDateKey(selectedDateObj);
      // Check simulated DB
      if (BLOCKED_DB[key] && BLOCKED_DB[key].includes(time)) {
          return true;
      }
      return false;
  };

  // Formatters
  const monthName = new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', { month: 'long', year: 'numeric' }).format(viewDate);
  const formattedSelectedDate = selectedDateObj 
    ? new Intl.DateTimeFormat(lang === 'tr' ? 'tr-TR' : 'en-US', { day: 'numeric', month: 'long', year: 'numeric' }).format(selectedDateObj)
    : '';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[600px] animate-fade-in-up transition-colors duration-300">
        <button 
          onClick={onClose}
          aria-label={t.closeLabel}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 z-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        {/* Left Panel: Service Details */}
        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-950 border-r border-gray-100 dark:border-gray-800 p-8 flex flex-col justify-between transition-colors duration-300">
            <div>
                <div className="mb-6">
                    <img 
                        src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=200&h=200&q=80" 
                        alt={t.serviceDetails.coachAlt}
                        className="w-16 h-16 rounded-full border-2 border-white dark:border-gray-800 shadow-md mb-4 object-cover grayscale"
                    />
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-sm mb-1">Mustafa Seyhan</p>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{resolvedServiceTitle}</h2>
                </div>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-3">
                        <Clock size={18} />
                        <span className="font-medium">{t.serviceDetails.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe size={18} />
                        <span className="font-medium">{t.serviceDetails.platform}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-500 mt-4">
                        {t.serviceDetails.desc}
                    </p>
                </div>
            </div>
            
            <div className="mt-auto pt-8">
                <p className="text-xs text-gray-400 dark:text-gray-600">{t.serviceDetails.poweredBy}</p>
            </div>
        </div>

        {/* Right Panel: Calendar & Time */}
        <div className="w-full md:w-2/3 p-8 bg-white dark:bg-gray-900 overflow-y-auto no-scrollbar transition-colors duration-300">
          {step === 1 ? (
             <div className="h-full flex flex-col justify-center">
                <h3 id="booking-modal-title" className="text-lg font-semibold text-gray-900 dark:text-white mb-6">{t.title}</h3>
                <div className="flex flex-col md:flex-row gap-10 lg:gap-12">
                    {/* Real Calendar */}
                    <div className="flex-1">
                         <div className="flex justify-between items-center mb-4 h-10 border-b border-transparent">
                             {/* Capitalize first letter of month */}
                             <span className="font-medium text-gray-900 dark:text-white capitalize text-lg">{monthName}</span>
                             <div className="flex gap-2">
                                 <button onClick={handlePrevMonth} aria-label={t.prevMonthLabel} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                                    <ChevronLeft size={20} />
                                 </button>
                                 <button onClick={handleNextMonth} aria-label={t.nextMonthLabel} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors">
                                    <ChevronRight size={20} />
                                 </button>
                             </div>
                         </div>
                         
                         <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2 text-gray-400 dark:text-gray-600 font-medium">
                             {t.days.map((d, i) => <span key={i}>{d}</span>)}
                         </div>
                         
                         <div className="grid grid-cols-7 gap-2">
                             {/* Empty slots for start offset */}
                             {Array.from({length: startOffset}).map((_, i) => <div key={`empty-${i}`} />)}
                             
                             {/* Days */}
                             {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                                 const isSelected = selectedDateObj?.getDate() === day && selectedDateObj?.getMonth() === month && selectedDateObj?.getFullYear() === year;
                                 const currentDate = new Date(year, month, day);
                                 const isPast = currentDate < today;
                                 
                                 return (
                                     <button 
                                        key={day}
                                        onClick={() => handleDateClick(day)}
                                        disabled={isPast}
                                        aria-pressed={isSelected}
                                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all
                                            ${isPast
                                                ? 'text-gray-300 dark:text-gray-700 cursor-not-allowed'
                                                : isSelected
                                                ? 'bg-gray-900 text-white dark:bg-brand dark:text-black shadow-md scale-105' 
                                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:scale-105'
                                            }`}
                                     >
                                         {day}
                                     </button>
                                 );
                             })}
                         </div>
                    </div>

                    {/* Time Slots - Header aligned with Calendar Header */}
                    <div className={`w-full md:w-60 flex flex-col transition-all duration-300 ${selectedDateObj ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4 pointer-events-none'}`}>
                        {/* Static Header Container for Alignment */}
                        <div className="flex items-center justify-between mb-4 h-10 border-b border-gray-100 dark:border-gray-800">
                             <span className="font-medium text-gray-900 dark:text-white capitalize text-lg">
                                {selectedDateObj ? formattedSelectedDate : <span className="opacity-0">{t.datePlaceholder}</span>}
                             </span>
                        </div>

                        <div className="space-y-2 max-h-[360px] overflow-y-auto pr-2 pl-1 no-scrollbar flex-1">
                            {times.map((time) => {
                                const isBlocked = isTimeBlocked(time);
                                return (
                                    <button
                                        key={time}
                                        disabled={isBlocked}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`w-full py-3 px-4 rounded-xl border text-sm font-semibold transition-all flex justify-between group
                                            ${isBlocked 
                                                ? 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-gray-300 dark:text-gray-700 cursor-not-allowed opacity-60 decoration-slate-400 line-through' 
                                                : 'border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-brand hover:ring-1 hover:ring-gray-900 dark:hover:ring-brand hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }
                                        `}
                                    >
                                        <span className="flex items-center gap-2">
                                            {time}
                                            {isBlocked && <span className="text-[10px] font-normal no-underline uppercase bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-500">{t.unavailable}</span>}
                                        </span>
                                        {!isBlocked && (
                                            <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0 text-gray-900 dark:text-brand" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
             </div>
          ) : (
             <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                 <div className="w-16 h-16 bg-green-100 dark:bg-brand/20 text-green-600 dark:text-brand rounded-full flex items-center justify-center mb-6">
                     <CheckCircle2 size={32} />
                 </div>
                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t.confirmedTitle}</h3>
                 <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-sm">{t.confirmedMsg(selectedTime || '', formattedSelectedDate)}</p>
                 <Button onClick={onClose} variant="secondary">{t.done}</Button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};
