import * as attendanceService from "../services/attendance.service.js";

export const scan = async (req, res) => {
  try {
    const result = await attendanceService.scanAttendance(req.body);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};