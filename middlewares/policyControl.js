const responseRender = require('./responseRender');
const errorsMessages = require('../constant/errors');
const accountRole = require('../helpers/AuthorizationDecode');
module.exports = {
    //check if super admin
    isSuperAdmin: (rq, rs, nx) => {
        if (rq.headers.authorization) {
            let token = rq.headers.authorization.split(" ")[1];
            if (accountRole.getRole(token) == "SUPER_ADMIN") {
                nx();
            } else {
                rs.status(403).json(responseRender({}, errorsMessages.FORBIDDEN, ""));
            }
        } else {
            rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
        }
    },
    //check if  admin
    isAdmin: (rq, rs, nx) => {
        if (rq.headers.authorization) {
            let token = rq.headers.authorization.split(" ")[1];
            if (accountRole.getRole(token) == "ADMIN") {
                nx();
            } else {
                rs.status(403).json(responseRender({}, errorsMessages.FORBIDDEN, ""));
            }
        } else {
            rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
        }
    },
    //check if user
    isUser: (rq, rs, nx) => {
        if (rq.headers.authorization) {
            let token = rq.headers.authorization.split(" ")[1];
            if (accountRole.getRole(token) == "USER") {
                nx();
            } else {
                rs.status(403).json(responseRender({}, errorsMessages.FORBIDDEN, ""));
            }
        } else {
            rs.status(401).json(responseRender({}, errorsMessages.UNAUTHORIZED, ""));
        }
    },
    //check for roles
    grantRoles: (rq, rs, nx, roles) => {
        if (Array.isArray(roles)) {
            try {
                let token = rq.headers.authorization.split(" ")[1];
                if (roles.indexOf(accountRole.getRole(token)) != -1) {
                    nx();
                } else {
                    rs.status(403).json(responseRender({}, errorsMessages.FORBIDDEN, ""));
                }
            } catch (err) {
                rs.status(400).json({}, errorsMessages.UNAUTHORIZED, "");
            }
        } else {
            rs.status(500).json(responseRender({}, errorsMessages.SERVER_ERROR, ""));
        }
    }
}
