/**
 * Routes pour répertorier les membres de l'association.
 */

import express, { Router, Request, Response } from "express";
import { register, login, adminAccess, logout, getAllUsers, getUserById } from '../controllers';
import { authenticateToken } from "../middlewares";

export const router = Router();

// révoquer les jetons
export const tokenRevocationList: string[] = [];

router.post('/register', register);
router.post('/login', login);
//router.get('/', authenticateToken, getAllUsers);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
//router.get('/admin', authenticateToken, authorizeAdmin, adminAccess);
//router.post('/logout', authenticateToken, logout);