import { Router } from "express";
import { createEventController, deleteEventController, getEventByEventNameController, getEventByEventTypeController, getEventByIdController, getEventsController, updateEventController } from "../Controllers/Event.Controller";

const router = Router();

router.post('/', createEventController);
router.get('/', getEventsController);
router.get('/:id', getEventByIdController);
router.get('/eventName/:eventName', getEventByEventNameController);
router.get('/eventType/:eventType', getEventByEventTypeController);
router.put('/:id', updateEventController);
router.delete('/:id', deleteEventController);


export default router;