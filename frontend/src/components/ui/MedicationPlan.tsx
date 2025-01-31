import React from "react";
import PageLayout from "./layout/PageLayout";

interface Medication {
  wirkstoff: string;
  handelsname: string;
  stärke: string;
  form: string;
  einheit: string;
  hinweise: string;
  grund: string;
  morgen?: string;
  mittag?: string;
  abend?: string;
  nacht?: string;
}

interface TimedMedication {
  wirkstoff: string;
  handelsname: string;
  stärke: string;
  form: string;
  alle?: string;
  tage?: string;
  von: string;
  bis: string;
}

interface BedarfMedication {
  wirkstoff: string;
  handelsname: string;
  stärke: string;
  form: string;
  bedarf: string;
}

interface Props {
  patientName: string;
  dateOfBirth: string;
  printDate: string;
  apothekeName: string;
  apothekeAddress: string;
  apothekeContact: string;
  medications: Medication[];
  timedMedications?: TimedMedication[];
  bedarfMedications?: BedarfMedication[];
}

const MedicationPlan: React.FC<Props> = ({
  patientName,
  dateOfBirth,
  printDate,
  apothekeName,
  apothekeAddress,
  apothekeContact,
  medications,
  timedMedications,
  bedarfMedications,
}) => {
  const renderMedicationRow = (medication: Medication) => (
    <tr
      key={medication.wirkstoff + medication.handelsname}
      className="border-b border-blue-100"
    >
      <td className="p-2">{medication.wirkstoff}</td>
      <td className="p-2">{medication.handelsname}</td>
      <td className="p-2">{medication.stärke}</td>
      <td className="p-2">{medication.form}</td>
      <td className="p-2">{medication.morgen}</td>
      <td className="p-2">{medication.mittag}</td>
      <td className="p-2">{medication.abend}</td>
      <td className="p-2">{medication.nacht}</td>
      <td className="p-2">{medication.einheit}</td>
      <td className="p-2">{medication.hinweise}</td>
      <td className="p-2">{medication.grund}</td>
    </tr>
  );

  const renderTimedMedicationRow = (medication: TimedMedication) => (
    <tr
      key={
        medication.wirkstoff +
        medication.handelsname +
        medication.von +
        medication.bis
      }
      className="border-b border-blue-100"
    >
      <td className="p-2">{medication.wirkstoff}</td>
      <td className="p-2">{medication.handelsname}</td>
      <td className="p-2">{medication.stärke}</td>
      <td className="p-2">{medication.form}</td>
      <td className="p-2">
        {medication.alle} {medication.tage}
      </td>
      <td className="p-2">
        {medication.von} - {medication.bis}
      </td>
    </tr>
  );

  const renderBedarfMedicationRow = (medication: BedarfMedication) => (
    <tr
      key={medication.wirkstoff + medication.handelsname}
      className="border-b border-blue-100"
    >
      <td className="p-2">{medication.wirkstoff}</td>
      <td className="p-2">{medication.handelsname}</td>
      <td className="p-2">{medication.stärke}</td>
      <td className="p-2">{medication.form}</td>
      <td className="p-2">{medication.bedarf}</td>
    </tr>
  );

  return (
    <PageLayout text="Medication Plan">
      <div className="p-6 space-y-6">
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold text-xl text-blue-500">
              Medikationsplan für: {patientName}
            </p>
            <p className="text-gray-600">geb. am: {dateOfBirth}</p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{apothekeName}</p>
            <p className="text-gray-600">{apothekeAddress}</p>
            <p className="text-gray-600">Tel.: {apothekeContact}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-2 text-left">Wirkstoff</th>
                <th className="p-2 text-left">Handelsname</th>
                <th className="p-2 text-left">Stärke</th>
                <th className="p-2 text-left">Form</th>
                <th className="p-2 text-left">Morgen</th>
                <th className="p-2 text-left">Mittag</th>
                <th className="p-2 text-left">Abend</th>
                <th className="p-2 text-left">Nacht</th>
                <th className="p-2 text-left">Einheit</th>
                <th className="p-2 text-left">Hinweise</th>
                <th className="p-2 text-left">Grund</th>
              </tr>
            </thead>
            <tbody>{medications.map(renderMedicationRow)}</tbody>
          </table>
        </div>

        {timedMedications && timedMedications.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="font-bold mb-2 text-lg text-blue-500">
              Zeitlich befristete Medikation
            </h3>
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Wirkstoff</th>
                  <th className="p-2 text-left">Handelsname</th>
                  <th className="p-2 text-left">Stärke</th>
                  <th className="p-2 text-left">Form</th>
                  <th className="p-2 text-left">Alle</th>
                  <th className="p-2 text-left">Von - Bis</th>
                </tr>
              </thead>
              <tbody>{timedMedications.map(renderTimedMedicationRow)}</tbody>
            </table>
          </div>
        )}

        {bedarfMedications && bedarfMedications.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg shadow-md overflow-x-auto">
            <h3 className="font-bold mb-2 text-lg text-blue-500">
              Bedarfsmedikation
            </h3>
            <table className="min-w-full">
              <thead>
                <tr className="bg-blue-100">
                  <th className="p-2 text-left">Wirkstoff</th>
                  <th className="p-2 text-left">Handelsname</th>
                  <th className="p-2 text-left">Stärke</th>
                  <th className="p-2 text-left">Form</th>
                  <th className="p-2 text-left">Bedarf</th>
                </tr>
              </thead>
              <tbody>{bedarfMedications.map(renderBedarfMedicationRow)}</tbody>
            </table>
          </div>
        )}

        <div className="mt-4 text-right text-sm text-gray-600">
          <p>Seite 1 von 1</p>
          <p>Ausgedruckt am: {printDate}</p>
        </div>
      </div>
    </PageLayout>
  );
};

export default MedicationPlan;
