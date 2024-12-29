export interface IMovie {
  poster_url: string | undefined;
  _id: string;  
  name: string;  
  genre: string;  
  duration: string;  
  cast: string[]; 
  rating: number;  
  trailer_url: string;  
  image_url: string;  
  release_date: Date;  
  date: Date;  
  description: string;  
  theatre_id: string;  
  screen_id: string; 
 }
