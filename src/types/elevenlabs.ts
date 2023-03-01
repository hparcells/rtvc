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

interface Language {
  iso_code: string;
  display_name: string;
}

interface IModel {
  model_id: string;
  display_name: string;
  supported_languages: Language[];
}

interface IInvoice {
  amount_due_cents: number;
  next_payment_attempt_unix: number;
}

export interface ISubscription {
  tier: string;
  character_count: number;
  character_limit: number;
  can_extend_character_limit: boolean;
  allowed_to_extend_character_limit: boolean;
  need_character_count_reset_unit: number;
  voice_limit: number;
  can_extend_voice_limit: boolean;
  can_use_instant_voice_cloning: boolean;
  available_models: IModel[];
  status: string;
  next_invoice: IInvoice;
}
