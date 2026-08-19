export interface Artwork {
  id: number;
  title: string;
  description?: string;
  imageUrl?: string;
  price: number;
  dimensions?: string;
  medium?: string;
  isAvailable: boolean;
  categoryId: number;
  category?: { id: number; name: string }; // populated when reading, not when writing
}