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

    /**
   * Update the status of a specific medication item.
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
    async updateMedicationStatus(req, res, next) {
      try {
        const { status, notes } = req.body;
        const updatedMed = await MedicationPlanService.updateMedicationStatus(req.params.id, status, notes);
        res.status(200).json(updatedMed);
      } catch (error) {
        next(error);
      }
    }
  
    /**
     * Log a medication administration record.
     * @param {Request} req - Express request object.
     * @param {Response} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    async logMedicationAdministration(req, res, next) {
      try {
        const logData = req.body;
        const log = await MedicationPlanService.logMedicationAdministration(logData);
        res.status(201).json(log);
      } catch (error) {
        next(error);
      }
    }

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