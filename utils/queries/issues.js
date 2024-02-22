const { Vendor, Issue, Property, Task } = require('../../models');
const { NotFoundError, BadRequestError, InternalServerError,  } = require('../errors/index');

async function findAllIIssues() {
  const issues = await Issue.findAll({
    include: [
      { model: Property },
      { model: Task}
    ],
    raw: true,
    nest: true,
  });

  if (!issues) {
    throw new NotFoundError('No issues found');
  }
  // console.log(issues);
  return issues;
};

async function getIssuesByPropertyID() {
  const issues = await Issue.findAll({
    include: [
      { model: Property },
      { model: Task}
    ],
    raw: true,
    nest: true,
  });

  if (!issues) {
    throw new NotFoundError('No issues found');
  }
  // console.log(issues);
  return issues;
};

async function findOneIssue(issue_id) {
  const issue = await Issue.findByPk(issue_id, {
    include: [
      { model: Property, },
      { model: Task, },
      { model: Vendor, },
    ],
    raw: true,
    nest: true,
  });

  if (!issue) {
    throw new NotFoundError(`No issue found with id ${issue_id}`);
  }
  // console.log(issue);
  return issue;
};

async function createIssue(issueData) {
  const issue = await Issue.create(issueData);

  if (!issue) {
    throw new InternalServerError("Couldn't create an issue");
  }
  // console.log(issue);
  return issue.toJSON();
};

async function updateIssue(issue_id, issueData) {
  const issue = await Issue.update(issueData, {
    where: { issue_id }
  });

  if (!issue) {
    throw new BadRequestError(`Couldn't update issue with id ${issue_id}`);
  }
  // console.log(issue);
  return issue;
};

async function deleteIssue(issue_id) {
  const issue = await Issue.destroy({ where: { issue_id } });

  if (!issue) {
    throw new BadRequestError(`Couldn't delete issue with id ${issue_id}`);
  }
  // console.log(issue);
  return issue;
};

async function addVendorToIssue(issue_id, vendor_id) {
  const issue = await Issue.findByPk(issue_id);

  if (!issue) {
    throw new BadRequestError(`No issue found with id ${issue_id}`);
  }
  
  const result = await issue.addVendor(vendor_id);

  // console.log(result);
  return result;
};


module.exports = {
  findAllIIssues,
  findOneIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  addVendorToIssue,

}