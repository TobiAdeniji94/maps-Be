export enum Action {
    Create = 'Create', // amdin & reporter create a report / only admin can create a state / only admin can create a user
    Approve = 'Approve',// only admin can approve a report
    Decline = 'Decline',// only admin can decline a report
    Delete = 'Delete', // admin & reporter can delete a report / only admin can delete a state / only admin can delete a user
    Edit = 'Edit',// admin & reporter can update a report / only admin can update a state / admin/reporter/viewer can update a user
    View = 'View',// admin/reporter/viewer can view a user
    Save = 'Save', // admin/reporter can save a report
    Publish = 'Publish', // only admin can publish a report
}