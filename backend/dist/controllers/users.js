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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUserById = exports.logout = exports.adminAccess = exports.login = exports.register = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
;
const validation_1 = require("../validation");
const services_1 = require("../services");
const models_1 = require("../models");
const middlewares_1 = require("../middlewares");
const users_1 = require("../routers/users");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateUser)(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    }
    try {
        const { username, password, email, firstname, lastname } = value;
        const hashedPassword = yield argon2_1.default.hash(password);
        const newUser = yield models_1.User.create({
            username,
            password: hashedPassword,
            email,
            firstname,
            lastname
        });
        const isValidPassword = yield newUser.validPassword(password);
        if (!isValidPassword) {
            throw new Error('Invalid password');
        }
        const token = (0, services_1.generateToken)(newUser.userId);
        res.status(201).json({ newUser, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = (0, validation_1.validateUserAuth)(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { password, email } = value;
    try {
        const user = yield models_1.User.findOne({ where: { email } });
        // si l'user n'existe pas
        if (!user) {
            return res.status(401).send({ message: "nom d'utilisateur ou mot de passe erroné." });
        }
        const isPasswordCorrect = yield argon2_1.default.verify(user.password, password);
        if (!isPasswordCorrect) {
            return res.status(401).send({ message: "le mot de passe est erroné." });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.userId }, 'your_secret_key', { expiresIn: '3h' });
        return res.status(200).send({ messsage: "authentification de l'user réussie", token });
    }
    catch (error) {
        middlewares_1.logger.error(error);
        return res.status(500).send({ message: "erreur interne" });
    }
});
exports.login = login;
const adminAccess = (req, res) => {
    // TODO
};
exports.adminAccess = adminAccess;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO
    const token = req.token;
    if (token) {
        users_1.tokenRevocationList.push(token);
        res.status(200).json({ message: 'Deconnexion réussie' });
    }
    else {
        res.status(400).json({ message: 'Pas de jeton fourni' });
    }
});
exports.logout = logout;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield models_1.User.findByPk(userId);
        if (user !== null) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "utilisateur non retrouvé" });
        }
    }
    catch (error) {
        middlewares_1.logger.error(error);
        res.status(500).json({ message: "Erreur lors de la recherche de l'utilisateur" });
    }
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield models_1.User.findAll();
        return res.status(200).json(users);
    }
    catch (error) {
        middlewares_1.logger.error(error);
        res.status(500).json({ message: "Erreur survenue lors de la tentative de récupération des utilisateurs." });
    }
});
exports.getAllUsers = getAllUsers;
