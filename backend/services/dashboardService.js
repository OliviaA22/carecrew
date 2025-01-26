const axios = require("axios");
const db = require("../models");
bcrypt = require("bcryptjs");

const User = db.User;
const Op = db.Op;
const Ward = db.Ward;
const Hospital = db.Hospital;

class DashboardService {

  async getHospitals() {
    const hospitals = await Hospital.findAll();
    return hospitals;
  }

  async getWards() {
    const wards = await Ward.findAll();
    return wards;
  }




}

module.exports = new DashboardService();
