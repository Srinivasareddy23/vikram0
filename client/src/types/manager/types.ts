export interface FormData {
  email: string;
  password: string;
};

export interface ApiResponse {
  success: boolean;
  token?: string;
  message?: string;
  data?: {
    token?: string;
    manager?: {
      id: string;
      name: string;
      email: string;
      address: string;
    };
  };
};

export interface InitialState {
  id: string; 
  name: string;
  email: string;
  address: string;
}