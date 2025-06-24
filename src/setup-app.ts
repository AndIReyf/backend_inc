import express, { Express } from "express";
import {AppRoutes} from "./core";
import {db, IDriver} from "./db";
import {DriverStatus} from "./drivers";

export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  // основной роут
  app.get(AppRoutes.home, (req, res) => {
    res.status(200).send("Hello world!");
  });

  app.get(AppRoutes.drivers, (req, res) => {
    res.status(200).send(db.drivers);
  })
  app.get(AppRoutes.driversById, (req, res) => {
    const driver = db.drivers.find((d) => d.id === req.params.id);

    if (!driver) {
      res.status(404).send({message: "No driver found!"});
    }

    res.status(200).send(driver);
  })
  app.post(AppRoutes.drivers, (req, res) => {
    const newDriver: IDriver = {
      id: `${db.drivers.length ? db.drivers.length + 1 : 1}`,
      status: DriverStatus.Online,
      createdAt: new Date(),
      ...req.body,
    }

    db.drivers.push(newDriver);

    res.status(200).send(newDriver);
  })

  return app;
};