import { Request } from 'express';

export enum BlogMandatoryFields {
  name = 'name',
  description = 'description',
  websiteUrl = 'websiteUrl',
}

export interface IBlog {
  id: string;
  [BlogMandatoryFields.name]: string;
  [BlogMandatoryFields.description]: string;
  [BlogMandatoryFields.websiteUrl]: string;
}

export interface IBlogRequest extends Request {
  body: IBlog;
}
