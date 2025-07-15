// Authentication Types
export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface AccountDto {
  id: string;
  username: string;
  role: string;
}

export interface LoginResponseDto {
  token: string;
  account: AccountDto;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  account: AccountDto | null;
  loading: boolean;
  error: string | null;
}
