export type ProductReviewInput = 
    { title: string; user_name: string; content: string; rating: number; }

    export interface Review {
        product_id: string;
        title: string;
        user_name: string;
        rating: number;
        content: string;
        id: string;
        created_at: string;
        updated_at: string;
    }
    
    export interface ApiResponse {
        status: string;
        data: Review[];
        message: string;
    }
