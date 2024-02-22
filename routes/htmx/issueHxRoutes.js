const router = require('express').Router();
const c = require('../../controller/issueController');

router.route('/')
  .get(c.renderIssues)
  .post(c.renderNewIssue);

// enter additional routes above the /id route as needed

router.route('/:id')
  .get(c.renderOneIssue)
  .put(c.renderUpdatedIssue)
  .delete(c.renderDeletedIssue);

router.route('/:id/isDone')
  .patch(c.renderIsIssueDone);

router.route('/:issue_id/tasks/:task_id/isDone')
  .patch(c.renderIsTaskDone);

router.route('/property/:id')
  .get(c.renderOneIssueByProperty)
  
module.exports = router;