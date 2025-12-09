export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

export interface Database {
    public: {
        Tables: {
            orders: {
                Row: {
                    amount_total: number | null;
                    created_at: string | null;
                    currency: string | null;
                    id: string;
                    payment_status: string | null;
                    product_ids: string | null;
                    stripe_customer_id: string | null;
                    supabase_user_id: string | null;
                };
                Insert: {
                    amount_total?: number | null;
                    created_at?: string | null;
                    currency?: string | null;
                    id: string;
                    payment_status?: string | null;
                    product_ids?: string | null;
                    stripe_customer_id?: string | null;
                    supabase_user_id?: string | null;
                };
                Update: {
                    amount_total?: number | null;
                    created_at?: string | null;
                    currency?: string | null;
                    id?: string;
                    payment_status?: string | null;
                    product_ids?: string | null;
                    stripe_customer_id?: string | null;
                    supabase_user_id?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "orders_supabase_user_id_fkey";
                        columns: ["supabase_user_id"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            profiles: {
                Row: {
                    address_line1: string | null;
                    address_line2: string | null;
                    city: string | null;
                    full_name: string | null;
                    id: string;
                    phone: string | null;
                    postal_code: string | null;
                    state: string | null;
                    stripe_customer_id: string | null;
                    updated_at: string | null;
                };
                Insert: {
                    address_line1?: string | null;
                    address_line2?: string | null;
                    city?: string | null;
                    full_name?: string | null;
                    id: string;
                    phone?: string | null;
                    postal_code?: string | null;
                    state?: string | null;
                    stripe_customer_id?: string | null;
                    updated_at?: string | null;
                };
                Update: {
                    address_line1?: string | null;
                    address_line2?: string | null;
                    city?: string | null;
                    full_name?: string | null;
                    id?: string;
                    phone?: string | null;
                    postal_code?: string | null;
                    state?: string | null;
                    stripe_customer_id?: string | null;
                    updated_at?: string | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey";
                        columns: ["id"];
                        isOneToOne: true;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}

