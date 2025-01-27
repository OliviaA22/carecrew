const MedicationPlanService  = require("../services/medicationPlanService.js");

class MedicationPlanController {

  async createMedPlan(req, res, next) {
    try {
      const medicationPlan = await MedicationPlanService.createMedPlan(req.body);
      res.status(201).json({
        message: 'Medication plan created successfully',
        medicationPlan,
      });
    } catch (error) {
      next(error);
    }
  }

  // async getMedicationsForShift(req, res, next) {
  //   try {
  //     const { patient_id } = req.params;
  //     const medications = await MedicationPlanService.getMedicationsForShift(patient_id);
  //     res.status(200).json(medications);
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  async getAllMedPlans(req, res, next) {
    try {
      const medicationPlan = await MedicationPlanService.getAllMedPlans();
      res.status(200).json(medicationPlan);
    } catch (error) {
      next(error);
    }
  }

  async getMedPlanById(req, res, next) {
    try {
      const medicationPlan = await MedicationPlanService.getMedPlanById(req.params.id);
      res.status(200).json(medicationPlan);
    } catch (error) {
      next(error);
    }
  }

  async getMedPlansForPatient(req, res, next) {
    try {
      const plans = await MedicationPlanService.getMedPlansForPatient(req.params.patientId);
      res.status(200).json(plans);
    } catch (error) {
      next(error);
    }
  }
  
  async updateMedPlan(req, res, next) {
    try {
      const medicationPlan = await MedicationPlanService.updateMedPlan(req.params.id, req.body);
      res.status(200).json({
        message: 'Medication plan updated successfully',
        medicationPlan,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteMedPlan(req, res, next) {
    try {
      const result = await MedicationPlanService.deleteMedPlan(req.params.id);
      res.status(200).json({ message: result });
    } catch (error) {
      next(error);
    }
  }



}

module.exports = new MedicationPlanController();
