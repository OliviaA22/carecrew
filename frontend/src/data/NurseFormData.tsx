import React from "react";
import GenericForm, { FormField } from "../components/forms/GenericForm";

export interface NurseFormData {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  date_of_birth: Date | null;
  phone_number: string;
  gender: string;
  address: {
    street: string;
    postcode: string;
    city: string;
    state: string;
    country: string;
  };
  hospital_id: string;
  ward_id: string;
}

interface NurseFormProps {
  handleSubmit: (formData: NurseFormData) => void;
  onClose: () => void;
  initialData?: Partial<NurseFormData>;
}

const NurseForm: React.FC<NurseFormProps> = ({
  handleSubmit,
  onClose,
  initialData,
}) => {
  const fields: FormField[] = [
    { name: "first_name", type: "text", label: "First Name", isRequired: true },
    { name: "last_name", type: "text", label: "Last Name", isRequired: true },
    { name: "email", type: "email", label: "Email", isRequired: true },
    {
      name: "password",
      type: "password",
      label: "Password",
      isRequired: !initialData,
    },
    {
      name: "date_of_birth",
      type: "date",
      label: "Date of Birth",
      isRequired: true,
    },
    { name: "phone_number", type: "tel", label: "Phone Number" },
    {
      name: "gender",
      type: "select",
      label: "Gender",
      options: ["Male", "Female", "Other"],
      isRequired: true,
    },
    {
      name: "address.street",
      type: "text",
      label: "Street Address",
      isRequired: true,
    },
    {
      name: "address.postcode",
      type: "text",
      label: "Postcode",
      isRequired: true,
    },
    { name: "address.city", type: "text", label: "City", isRequired: true },
    { name: "address.state", type: "text", label: "State", isRequired: true },
    {
      name: "address.country",
      type: "text",
      label: "Country",
      isRequired: true,
    },
    {
      name: "hospital_id",
      type: "text",
      label: "Hospital ID",
      isRequired: true,
    },
    { name: "ward_id", type: "text", label: "Ward ID", isRequired: true },
  ];

  const onSubmit = (formData: NurseFormData) => {
    handleSubmit(formData);
  };

  return (
    <GenericForm
      fields={fields}
      onSubmit={onSubmit}
      buttonText={initialData ? "Update Nurse" : "Add Nurse"}
      initialData={initialData}
    />
  );
};

export default NurseForm;
