export const responseSuccess = (res, status, data) => {
	res.status(status).send({success: true, data });
};

export const responseError = (res, status, errors) => {
	res.status(status).send({messages: errors});
};
