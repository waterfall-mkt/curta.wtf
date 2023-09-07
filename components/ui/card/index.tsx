import type { FC } from 'react';

import { cardBodyVariants, cardFooterStyles, cardHeaderVariants, cardStyles } from './styles';
import type {
  CardBodyProps,
  CardComposition,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from './types';
import { cx } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const Card: FC<CardProps> & CardComposition = ({ className, children, ...rest }) => {
  return (
    <div className={twMerge(cx(cardStyles, className))} {...rest}>
      {children}
    </div>
  );
};

const CardBody: FC<CardBodyProps> = ({ className, noPadding = false, children, ...rest }) => {
  return (
    <div className={twMerge(cx(cardBodyVariants({ noPadding }), className))} {...rest}>
      {children}
    </div>
  );
};

CardBody.displayName = 'CardBody';

const CardFooter: FC<CardFooterProps> = ({ className, children, ...rest }) => {
  return (
    <div className={twMerge(cx(cardFooterStyles, className))} {...rest}>
      {children}
    </div>
  );
};

CardFooter.displayName = 'CardFooter';

const CardHeader: FC<CardHeaderProps> = ({ className, noPadding = false, children, ...rest }) => {
  return (
    <div className={twMerge(cx(cardHeaderVariants({ noPadding }), className))} {...rest}>
      {children}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

Card.displayName = 'Card';

export default Card;
