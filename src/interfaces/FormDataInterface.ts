export interface IFormData {
  name?: string;
  age?: number | string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  acceptTerms?: boolean;
  picture?: string | null | File | FileList | undefined | unknown;
  country?: string;
}
