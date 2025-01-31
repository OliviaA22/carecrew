const MedicationPlanService  = require("../services/medicationPlanService.js");

class MedicationPlanController {

  /**
   * The `created_by` field is automatically assigned to the logged-in user's ID.
   */
  async createMedPlan(req, res, next) {
    try {
      const createdBy = req.user.id; 
      const requestData = {
        ...req.body,
        created_by: createdBy,
      };

      const medicationPlan = await MedicationPlanService.createMedPlan(requestData);
      res.status(201).json({ message: "Medication plan created successfully.", medicationPlan });
    } catch (error) {
      next(error);
    }
  }


  async addMedicationsToPlan(req, res, next) {
    try {
      const { planId } = req.params;
      const response = await MedicationPlanService.addMedicationsToPlan(planId, req.body.medications);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllMedPlans(req, res, next) {
    try {
      const medicationPlans = await MedicationPlanService.getAllMedPlans();
      res.status(200).json(medicationPlans);
    } catch (error) {
      next(error);
    }
  }

  async getMedPlanById(req, res, next) {
    try {
      const { planId } = req.params;
      const medicationPlan = await MedicationPlanService.getMedPlanById(planId);
      res.status(200).json(medicationPlan);
    } catch (error) {
      next(error);
    }
  }

  async updateMedPlan(req, res, next) {
    try {
      const { planId } = req.params;
      const response = await MedicationPlanService.updateMedPlan(planId, req.body);
      res.status(200).json(response);
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


// class MedicationController {
//   /**
//    * Retrieve the active medication plan for a given patient.
//    * @param {Request} req - Express request object.
//    * @param {Response} res - Express response object.
//    * @param {Function} next - Express next middleware function.
//    */
//   async getMedicationPlan(req, res, next) {
//     try {
//       const plan = await MedicationService.getMedicationPlan(req.params.patientId);
//       res.status(200).json(plan);
//     } catch (error) {
//       next(error);
//     }
//   }

//   /**
//    * Update the status of a specific medication item.
//    * @param {Request} req - Express request object.
//    * @param {Response} res - Express response object.
//    * @param {Function} next - Express next middleware function.
//    */
//   async updateMedicationStatus(req, res, next) {
//     try {
//       const { id } = req.params; // Medication item ID
//       const { status, notes } = req.body;
//       const updatedMed = await MedicationService.updateMedicationStatus(id, status, notes);
//       res.status(200).json(updatedMed);
//     } catch (error) {
//       next(error);
//     }
//   }

//   /**
//    * Log a medication administration record.
//    * @param {Request} req - Express request object.
//    * @param {Response} res - Express response object.
//    * @param {Function} next - Express next middleware function.
//    */
//   async logMedicationAdministration(req, res, next) {
//     try {
//       const logData = req.body;
//       const log = await MedicationService.logMedicationAdministration(logData);
//       res.status(201).json(log);
//     } catch (error) {
//       next(error);
//     }
//   }
// }