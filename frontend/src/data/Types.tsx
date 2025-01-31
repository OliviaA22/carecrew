export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
}

export interface Language {
  id: number;
  language_name: string;
}

export interface Specialization {
  id: number;
  area_of_specialization: string;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  address: Address;
  phone_number: string;
  date_of_birth: string;
  password?: string;
  gender: string;
  hospital_id: number;
  ward_id: number;
  ward: Ward;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  city: string;
  street: string;
  country: string;
  postalCode: string;
}

export interface Ward {
  id: number;
  hospital_id: number;
  name: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Patient extends User {
  room: string;
  nextMedicationTime: string;
}

export interface Availability {
  id: number;
  doctor_id: number;
  availability_date: string;
  active: boolean;
}

export interface AppointmentReason {
  reason?: string;
  notes?: string;
}

export interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentReason: AppointmentReason;
  bookTranslation: boolean;
  completed: boolean;
  patient: Patient; // Make patient properties optional
  availability: Availability;
}
