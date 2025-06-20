const { StatusCodes } = require('http-status-codes');

const validator = require('../utils/validators');
const schema = require('../utils/validators/attendances.read.one.validator');

const ATTENDANCE_STATUS_CODE = require('../utils/enums/AttendanceStatusCode');
const BaseError = require('../utils/errors');
const Attendance = require('../models/attendance');

const attendanceReadOne = async (body, isRequired = false) => {
    const validatedBody = validator(schema, body);

    const attendance = await Attendance.findOne({
        where: {
            ...validatedBody.value,
            status: ATTENDANCE_STATUS_CODE.NEW,
        }
    });

    if (isRequired)
        if (!attendance)
            throw new BaseError({
                statusCode: StatusCodes.NOT_FOUND,
                message: 'Attendance not found',
            })

    return attendance;
}

module.exports = attendanceReadOne;
