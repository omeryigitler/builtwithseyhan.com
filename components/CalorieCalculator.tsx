import React, { useState } from 'react';
import { Calculator, Activity, ChevronDown, RefreshCcw } from 'lucide-react';
import { Button } from './Button';
import { content, Language } from '../translations';

interface CalorieCalculatorProps {
  lang: Language;
  onBookClick: () => void;
}

export const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({ lang, onBookClick }) => {
  const t = content[lang].calculator;

  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [activity, setActivity] = useState<number>(1.2);
  const [result, setResult] = useState<number | null>(null);

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);

    if (!w || !h || !a) return;

    // Mifflin-St Jeor Equation
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (gender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = Math.round(bmr * activity);
    setResult(tdee);
  };

  const reset = () => {
    setResult(null);
    setWeight('');
    setHeight('');
    setAge('');
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden flex flex-col md:flex-row transition-colors duration-300">
      {/* Input Section */}
      <div className="p-8 md:p-12 w-full md:w-1/2 flex flex-col justify-center">
        <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Calculator size={14} />
                {t.badge}
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{t.subtitle}</p>
        </div>

        <div className="space-y-6">
            {/* Gender Switch */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <button 
                    onClick={() => setGender('male')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${gender === 'male' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    {t.gender.male}
                </button>
                <button 
                    onClick={() => setGender('female')}
                    className={`flex-1 py-3 rounded-lg text-sm font-semibold transition-all ${gender === 'female' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
                >
                    {t.gender.female}
                </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.inputs.weight}</label>
                    <input 
                        type="number" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="75"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-brand font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.inputs.height}</label>
                    <input 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="180"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-brand font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.inputs.age}</label>
                    <input 
                        type="number" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="25"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-brand font-bold text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-600"
                    />
                </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase">{t.inputs.activity}</label>
                <div className="relative">
                    <select 
                        value={activity}
                        onChange={(e) => setActivity(parseFloat(e.target.value))}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-brand font-bold text-gray-900 dark:text-white appearance-none cursor-pointer"
                    >
                        <option value={1.2}>{t.activity.sedentary}</option>
                        <option value={1.375}>{t.activity.light}</option>
                        <option value={1.55}>{t.activity.moderate}</option>
                        <option value={1.725}>{t.activity.active}</option>
                        <option value={1.9}>{t.activity.athlete}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
            </div>

            <Button fullWidth size="lg" onClick={calculateCalories} disabled={!weight || !height || !age}>
                {t.calculateBtn}
            </Button>
        </div>
      </div>

      {/* Result Section */}
      <div className={`w-full md:w-1/2 p-8 md:p-12 text-white flex flex-col justify-center transition-all duration-500 ${result ? 'bg-gray-900 dark:bg-gray-950' : 'bg-gray-800 dark:bg-gray-900'}`}>
         {result ? (
             <div className="animate-fade-in-up space-y-8">
                <div>
                    <div className="flex justify-between items-start">
                        <p className="text-gray-400 font-medium mb-1">{t.result.maintenance}</p>
                        <button onClick={reset} aria-label={t.reset} className="text-gray-500 hover:text-white transition-colors">
                            <RefreshCcw size={18} />
                        </button>
                    </div>
                    <div className="text-6xl font-black tracking-tight text-white mb-2">
                        {result} <span className="text-2xl font-medium text-brand">kcal</span>
                    </div>
                    <div className="h-2 w-full bg-gray-800 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-brand rounded-full animate-pulse shadow-[0_0_10px_rgba(204,255,0,0.5)]"></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800/50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-700 dark:border-gray-700">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t.result.cut}</p>
                        <p className="text-2xl font-bold text-white">{result - 500}</p>
                        <p className="text-xs text-gray-500">{t.result.unitPerDay}</p>
                    </div>
                    <div className="bg-gray-800/50 dark:bg-gray-800 p-4 rounded-2xl border border-gray-700 dark:border-gray-700">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-1">{t.result.bulk}</p>
                        <p className="text-2xl font-bold text-white">{result + 300}</p>
                        <p className="text-xs text-gray-500">{t.result.unitPerDay}</p>
                    </div>
                </div>

                <div className="bg-gray-800 dark:bg-gray-800 p-6 rounded-2xl border border-gray-700 dark:border-gray-700">
                    <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                        {t.result.ctaText}
                    </p>
                    <Button variant="primary" fullWidth onClick={onBookClick} icon={<Activity size={18} />}>
                        {t.result.ctaBtn}
                    </Button>
                </div>
             </div>
         ) : (
             <div className="flex flex-col items-center justify-center text-center h-full opacity-30">
                 <Activity size={64} className="mb-6 text-brand" />
                 <h4 className="text-2xl font-bold mb-2">{t.empty.title}</h4>
                 <p className="max-w-xs mx-auto">{t.empty.subtitle}</p>
             </div>
         )}
      </div>
    </div>
  );
};
