export interface CosmicFile {
  url: string;
  imgix_url: string;
}

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at?: string;
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    name?: string;
    tagline?: string;
    description?: string;
    concept_status?: string;
    key_features?: string;
    brand_color?: string;
    hero_image?: CosmicFile;
  };
}

export interface Film extends CosmicObject {
  type: 'films';
  metadata: {
    product?: Product;
    runtime?: string;
    aspect_ratio?: string;
    end_tagline?: string;
    sound_direction?: string;
    visual_system?: string;
  };
}

export interface Shot extends CosmicObject {
  type: 'shots';
  metadata: {
    film?: Film;
    shot_number?: number | string;
    start_time?: string;
    duration?: string;
    camera?: string;
    visual_description?: string;
    onscreen_text?: string;
    voiceover?: string;
    sound_design?: string;
    frame_reference?: CosmicFile;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}