import { Router } from "express";
import { createEventController, deleteEventController, getEventByEventNameController, getEventByEventTypeController, getEventByIdController, getEventsController, updateEventController } from "../Controllers/Event.Controller";
import { verifyAccessToken } from "../Utils/jwt";

const router = Router();

router.post('/',verifyAccessToken, createEventController);
router.get('/', verifyAccessToken, getEventsController);
router.get('/:id', verifyAccessToken, getEventByIdController);
router.get('/eventName/:eventName', verifyAccessToken, getEventByEventNameController);
router.get('/eventType/:eventType', verifyAccessToken, getEventByEventTypeController);
router.put('/:id', verifyAccessToken, updateEventController);
router.delete('/:id', verifyAccessToken, deleteEventController);


export default router;