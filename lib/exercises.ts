/** Curated exercise library for the workout tracker (Hevy-style picker). */

export type MuscleGroup =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'core'
  | 'cardio';

export interface LibraryExercise {
  name: string;
  muscle: MuscleGroup;
}

export const MUSCLE_ORDER: MuscleGroup[] = [
  'chest',
  'back',
  'shoulders',
  'arms',
  'legs',
  'core',
  'cardio',
];

export const EXERCISES: LibraryExercise[] = [
  // Chest
  { name: 'Bench Press (Barbell)', muscle: 'chest' },
  { name: 'Incline Bench Press (Dumbbell)', muscle: 'chest' },
  { name: 'Chest Press (Machine)', muscle: 'chest' },
  { name: 'Cable Fly', muscle: 'chest' },
  { name: 'Push-Up', muscle: 'chest' },
  { name: 'Dips', muscle: 'chest' },
  // Back
  { name: 'Deadlift (Barbell)', muscle: 'back' },
  { name: 'Pull-Up', muscle: 'back' },
  { name: 'Lat Pulldown (Cable)', muscle: 'back' },
  { name: 'Bent Over Row (Barbell)', muscle: 'back' },
  { name: 'Seated Row (Cable)', muscle: 'back' },
  { name: 'Face Pull', muscle: 'back' },
  // Shoulders
  { name: 'Overhead Press (Barbell)', muscle: 'shoulders' },
  { name: 'Shoulder Press (Dumbbell)', muscle: 'shoulders' },
  { name: 'Lateral Raise (Dumbbell)', muscle: 'shoulders' },
  { name: 'Rear Delt Fly', muscle: 'shoulders' },
  { name: 'Shrug (Dumbbell)', muscle: 'shoulders' },
  // Arms
  { name: 'Bicep Curl (Dumbbell)', muscle: 'arms' },
  { name: 'Barbell Curl', muscle: 'arms' },
  { name: 'Hammer Curl', muscle: 'arms' },
  { name: 'Triceps Pushdown (Cable)', muscle: 'arms' },
  { name: 'Skull Crusher', muscle: 'arms' },
  { name: 'Overhead Triceps Extension', muscle: 'arms' },
  // Legs
  { name: 'Back Squat (Barbell)', muscle: 'legs' },
  { name: 'Front Squat (Barbell)', muscle: 'legs' },
  { name: 'Leg Press (Machine)', muscle: 'legs' },
  { name: 'Romanian Deadlift', muscle: 'legs' },
  { name: 'Leg Extension (Machine)', muscle: 'legs' },
  { name: 'Leg Curl (Machine)', muscle: 'legs' },
  { name: 'Walking Lunge', muscle: 'legs' },
  { name: 'Calf Raise', muscle: 'legs' },
  { name: 'Hip Thrust (Barbell)', muscle: 'legs' },
  // Core
  { name: 'Plank', muscle: 'core' },
  { name: 'Hanging Leg Raise', muscle: 'core' },
  { name: 'Cable Crunch', muscle: 'core' },
  { name: 'Russian Twist', muscle: 'core' },
  // Cardio
  { name: 'Treadmill', muscle: 'cardio' },
  { name: 'Rowing Machine', muscle: 'cardio' },
  { name: 'Cycling', muscle: 'cardio' },
  { name: 'Jump Rope', muscle: 'cardio' },
];
