import joi from "joi";

export const PROCESSIMAGEDTO = joi.object({
  width: joi.number(),
  height: joi.number(),
  angle: joi.number(),
});

export const ADDWATERMARKDTO = joi.object({
    text: joi.string(),
    color: joi.string(),
    size: joi.number(),
    position: joi.string(),
    });
