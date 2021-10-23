import {Ticket} from "../models/Ticket"
import {DetailedUser} from "../models/DetailedUser";
import {SecureUser} from "../models/SecureUser";
import {DetailedUserModel, SecureUserModel, TicketModel} from "@pavo/shared-services-shared/src";
import {TicketDAO} from "../models/dao/ticket.dao";
import {NextFunction, Request, Response} from "express";

export function addTicket (req: Request, res: Response, next: NextFunction) {
    // @ts-ignore
    const { payload: { id } } = req;
    const ticket = new Ticket (
        {
            title: req.body.title,
            description: req.body.description,
            answer: req.body.answer,
            isResolved: false,
        }
    );
    saveTicket(ticket);

    function saveTicket(obj: TicketModel) {
        SecureUser.findById(id).then((user: SecureUserModel) => {
            DetailedUser.find({"email" : user.email}).then((userProps: DetailedUserModel[]) => {
                new Ticket(obj).save((err: unknown, ticket: TicketDAO): any => {
                    if (err) {
                        res.send(err);
                    } else if (!ticket) {
                        res.status(400).send();
                    } else {
                        return ticket.addReporter(userProps[0]._id).then((_ticket) => {
                            return res.send(_ticket)
                        });
                    }
                    next();
                })
            })
        })
    }
}

export function assign (req: Request, res: Response, next: NextFunction) {
    Ticket.updateOne(
        {_id: req.body.ticketId},
        {$set:{"assignee": req.body.id}},
        null,
        function(err: unknown) {
        if (err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function addAnswer (req: Request, res: Response, next: NextFunction) {
    Ticket.updateOne({_id: req.body.ticketId}, {$set:{"answer": req.body.answer}}, null,function(err: unknown) {
        if(err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function resolve (req: Request, res: Response, next: NextFunction) {
    Ticket.updateOne({_id: req.body.ticketId}, {$set:{"isResolved": "true"}}, null,function(err: unknown) {
        if(err) {
            return next(err)
        }
        res.status(200).send()
    })
}

export function getAll (_req: Request, res: Response, next: NextFunction) {
    Ticket.find({})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, tickets: TicketModel[])=> {
            if (err)
                res.send(err)
            else if (!tickets)
                res.status(404).send()
            else
                res.send(tickets)
            next()
        });
}

export function getTicket (req: Request, res: Response, next: NextFunction) {
    Ticket.findById(req.params.id)
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, ticket: TicketModel)=> {
        if (err)
            res.send(err)
        else if (!ticket)
            res.status(404).send()
        else
            res.send(ticket)
        next()
    })
}

export function getAllUnresolved (_req: Request, res: Response, next: NextFunction) {
    Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, tickets: TicketModel[])=> {
        if (err) {
            res.send(err);
        } else if (!tickets) {
            res.status(404).send();
        } else {
            res.send(tickets);
        }
        next();
    })
}

export function getMyUnresolvedTickets (req: Request, res: Response, next: NextFunction) {
    Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, tickets: TicketModel[])=> {
        if (err) {
            res.send(err);
        } else if (!tickets) {
            res.status(404).send();
        } else {
            res.send(tickets.filter((t) => t.reporter._id === req.body.id));
            next();
        }
    })
}

export function getMyTickets (req: Request, res: Response, next: NextFunction) {
    Ticket.find({})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, tickets: TicketModel[]) => {
            if(err) {
                res.send(err)
            }
            else if (!tickets) {
                res.status(404).send()
            }
            else {
                res.send(tickets.filter((t) => t.reporter._id === req.body.id));
            }
            next();
        });
}

export const getUnassignedUnresolvedTickets = (_req: Request, res: Response, next: NextFunction) => {
    Ticket.find({"isResolved": false})
        .populate('reporter')
        .populate('assignee')
        .exec((err: unknown, tickets: TicketModel[])=> {
        if (err) {
            res.send(err);
        } else if (!tickets) {
            res.status(404).send();
        } else {
            res.send(tickets.filter((t) => !t.assignee));
        }
        next();
    })
};

export function getAssignedTickets (req: Request, res: Response, next: NextFunction) {
    Ticket.find({})
        .populate('reporter')
        .populate ('assignee')
        .exec((err: unknown, tickets: TicketModel[]) => {
            if (err) {
                res.send(err);
            }
            else if (!tickets) {
                res.status(404).send();
            } else {
                res.send(tickets.filter((t) => t.assignee._id === req.body.id));
            }
            next();
        })
}
