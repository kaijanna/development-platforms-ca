import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = "https://resdlmehlbigaicuvjkz.supabase.co";
const supabaseAnonKey = "sb_publishable_AEfI_RXqw9j4UI7KSdfyzA_ZEiXuSP2";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);