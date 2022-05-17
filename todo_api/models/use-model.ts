import Joi from "joi";

export const Registerschema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(0).max(50).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  date: Joi.string().required(),
});
