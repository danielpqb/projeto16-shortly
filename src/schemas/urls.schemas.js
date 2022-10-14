import joi from "joi";

const postShortenUrl = joi.object({
  url: joi.string().domain().required(),
});

export { postShortenUrl };
