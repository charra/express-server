const AppController = require('./appController.js');
const config = require("../../config/env");

class ScheduleController extends AppController {
  constructor(model) {
    super(model);
  }
  getlist(req, res, next) {
    const { email, password } = req.body.data;
    return this._model.findOne({ email })
      .then(user => {
        if (!user) {
          throw new Error("User not found");
        }
        else {
          return bcryptCompareAsync(
            password,
            user.encryptedPassword
          )
            .then(result => {
              if (!result) {
                throw new Error("Invalid password or email");
              }
              else {
                const token = authService.issueToken({
                  exp: (Date.now() / 1000) + config.jwtExpirationInterval, // expire date in ceconds, now 2 hour
                  id: user.id
                });
                return this._responce.ok({ Authorization: `Bearer ${token}` })
              }
            });
        }
      })      
      .catch(err => {
        return res.forbidden(err.message)
      });
  }
  join(req, res, next) {
    const sheduleId = req.param.scheduleId;
    return this._model.findOne({ id: scheduleId, status: ["NEW", "PENDING"]})
      .then(schedule => {
        if (!schedule) {
          throw new Error("Schedule not found or been completed");
        }
        else {
          schedule.users.push(req.user.id)
          return schedule.save()
            .then(result => {
              if (!result) {
                throw new Error("Invalid password or email");
              }
            });
        }
      })
      .catch(error => next(error.message));
  }
}

module.exports = ScheduleController;