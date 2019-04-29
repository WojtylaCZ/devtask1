import * as Joi from 'joi';

export const complexityApiBody = Joi.object({
  text: Joi.string()
    .required()
    .max(1000)
});

export const modeApiParam = Joi.object({
  mode: Joi.string().only(['verbose'])
});
