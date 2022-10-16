import joi from "joi";

const postShortenUrl = joi.object({
  // url: joi.string().domain().required(),
  url: joi
    .string()
    .pattern(
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    )
    .required(),
});

export { postShortenUrl };
