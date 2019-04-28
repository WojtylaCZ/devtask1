import * as Joi from 'joi';

export const complexityApiBody = Joi.object({
  text: Joi.string().required()
});

export const modeApiParam = Joi.object({
  mode: Joi.string().only(['verbose'])
});
