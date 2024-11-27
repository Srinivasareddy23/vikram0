export interface FormData {
  email: string;
  password: string;
};

export interface ApiResponse {
  success: boolean;
  message?: string;
  managerData?: {
      id: string;
      firstname: string;
      email: string;
      role: string;
    };
};


export interface InitialState {
  id: string; 
  firstname: string;
  email: string;
  role: string;
}