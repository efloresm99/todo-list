import Handlebars from 'handlebars';
import * as path from 'path';
import { readFileSync } from 'fs';

import { VerificationDto } from '@Users/dto';

export const buildMail = (verification: VerificationDto, context: any) => {
  const file = getVerificationTemplate();
  const html = Handlebars.compile(file);
  return {
    from: process.env.SENDER,
    to: verification.customId,
    subject: 'Verify Account',
    html: html({
      verifyUrl: `${process.env.FE_URL}?verificationId=${
        verification.verificationId
      }&email=${encodeURIComponent(context.user.email)}`,
      firstName: context.user.firstName,
    }),
  };
};

const getVerificationTemplate = (): string => {
  return readFileSync(
    path.join(
      __dirname,
      '..',
      '..',
      'common/templates/verification.template.hbs',
    ),
  ).toString('utf-8');
};
