"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminMiddleware = void 0;
const checkAdminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.headers);
        const currentUser = req.user;
        // if (!currentUser || !currentUser.isAdmin) {
        //   return res
        //     .status(403)
        //     .json({ message: "Access Forbidden: Admin privileges required" });
        // }
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});
exports.checkAdminMiddleware = checkAdminMiddleware;
