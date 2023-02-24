interface ISample {
  sample_id: string;
  file_name: string;
  mime_type: string;
  size_bytes: number;
  hash: string;
}

interface IFineTuning {
  is_allowed_to_fine_tine: boolean;
  fine_tuning_requested: boolean;
  finetuning_state: string;
  verification_attempt_count: number;
}

interface ISettings {
  stability: number;
  similarity_boost: number;
}

export interface IVoice {
  voice_id: string;
  name: string;
  samples: ISample[];
  category: string;
  fine_tuning: IFineTuning;
  labels: { [key: string]: string }[];
  preview_url: string;
  available_for_tiers: string[];
  settings: ISettings;
}
