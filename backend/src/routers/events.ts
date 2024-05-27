/**
 * Routes pour gérer les évènements.
 */

import express, { Router, Request, Response } from "express";
import { createEvent, deleteEvent, getAllEvents, getEventById, updateEvent } from '../controllers';
import { isAuth } from "../middlewares";

export const router = Router();

//router.post('/', isAuth, createEvent);
router.post('/', createEvent); 
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', isAuth, updateEvent);
//router.delete('/:id', isAuth, deleteEvent);
router.delete('/:id', deleteEvent);


