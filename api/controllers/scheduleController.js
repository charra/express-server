const config = require("../../config/env");
const database = require("../../config/database.js");
const Op = database.Sequelize.Op;

class ScheduleController {
  create(req, res, next) {
    let obj = req.body.data;
    
    return database.Schedule.create(obj)
      .then((savedObject) => {
        const scheduleId = savedObject.scheduleId;
        return savedObject.setOwner(req.user)
          .then(schedule => {
            return database.Schedule.findAll({
              where: {
                scheduleId: scheduleId
              },
              attributes: { exclude: [ "createdAt", "updatedAt" ]},
              include: [
                { 
                  model: database.User,
                  as: 'owner',
                  attributes: { exclude: [ "createdAt", "updatedAt", "password" ]}
                },
                { 
                  model: database.User,
                  as: 'workers',
                  attributes: { exclude: [ "createdAt", "updatedAt", "password" ]}
                },
              ]
            })
          })
          .then(schedule => {
            return res.ok({schedule: schedule[0]});
          });
      })
      .catch(err => {
        return res.forbidden(err)
      });
  }
  getlist(req, res, next) {
    const userId = req.user.userId;
    const query = { status: "OPENED" };
    req.query.category ? query.category = req.query.category : "";
    return database.Schedule.findAll({ 
      where: query,
      attributes: { exclude: [ "createdAt", "updatedAt" ]},
      include: [
        { 
          model: database.User,
          as: 'owner',
          attributes: { exclude: [ "createdAt", "updatedAt", "password" ]}
        },
        { 
          model: database.User,
          as: 'workers',
          attributes: { exclude: [ "createdAt", "updatedAt", "password" ]}
        },
      ]
    })
      .then(schedulesArr => {
        res.ok({ schedules: schedulesArr});
      })      
      .catch(err => {
        return res.serverError();
      });
  }
  join(req, res, next) {
    const schedule = req.schedule;
    if(schedule.userId === req.user.userId) {
      res.forbidden("Can`t join your own schedule.");
    }
    else {
      schedule.addWorker(req.user.userId);
      schedule.peoplesNow = schedule.peoplesNow + 1;
      if(schedule.peoples === schedule.peoplesNow) {
        schedule.status = "CLOSED"; 
      };           
      return schedule.save()
        .then(result => {
          res.ok({schedule: result});
        });
    }    
  }
};

module.exports = ScheduleController;