
export interface IPost {
  _id: string;
  title: string;
  category: string; 
  author: string;   
  publish_on: string;                
  tags: string[];                    
  meta_description: string;
  blog_content: string;
  is_featured?: boolean;             
  image?: string;                    
  createdAt?: string;
  updatedAt?: string;
}
