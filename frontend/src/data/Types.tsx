export interface User {
  token: string;
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

export interface Shift {
  id: number;
  nurse_id: number;
  start_time: string;
  end_time: string | null;
  status: "in progress" | "completed";
  notes: string | null;
  user?: {
    first_name: string;
    last_name: string;
  };
}

export interface Patient {
  id: number;
  ward_id: number;
  ward: Ward; // Change this to use the Ward interface
  hospital_id: number;
  hospital: { name: string }; // Change this to an object with a name property
  room_no: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  admission_date: string;
  discharge_date: string | null;
  diagnosis: string;
  medical_record_number: string;
  medication_plans: MedicationPlan[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MedicationPlan {
  id: number;
  name: string;
  additional_notes: string;
  medication_items: MedicationItem[];
  valid_from: string;
  valid_until: string;
}

export interface MedicationItem {
  id: number;
  plan_id: number;
  medication_id: number;
  time_administered: Date;
  administered_by: string;
  dose: string;
  frequency: string;
  route_of_administration: string;
  scheduled_time: string;
  start_date: string;
  end_date: string;
  status: string;
  instructions: string;
  createdAt: string;
  updatedAt: string;
  medication: {
    id: number;
    name: string;
    description: string;
    dosage_form: string;
    strength: string;
  };
}

export interface Notification {
  id: number;
  message: string;
  created_at: string;
  type: "task" | "reminder" | "alert";
  is_read: boolean;
  patient: {
    id: number;
    first_name: string;
    last_name: string;
  };
  start_time: string;
  medication_item: {
    id: number;
    scheduled_time: string;
    status: string;
    medication_plan: {
      id: number;
      name: string;
    };
  };
}
