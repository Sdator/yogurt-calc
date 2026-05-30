export interface YogurtRecord {
  id: string;
  date: string;
  waterVol: number; // in ml
  powderWeight: number; // in g
  proteinPowder: number; // g / 100g
  targetProtein: number; // g / 100g or g/100ml
  isSuccess: 'success' | 'fail' | 'pending';
  predictedTexture: string;
  actualTexture?: string;
  rating?: number; // 1 to 5 stars
  notes: string;
  tags: string[]; // e.g. ["偏酸", "完美浓稠", "乳清偏多", "奶香浓郁"]
}

export interface PresetFormula {
  name: string;
  description: string;
  targetProtein: number; // g/100ml
  waterVol: number; // ml
  suggestedPowder: number; // g
}
