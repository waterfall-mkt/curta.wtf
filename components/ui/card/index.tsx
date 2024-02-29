import { cardBodyVariants, cardFooterStyles, cardHeaderVariants, cardStyles } from './styles';
import type {
  CardBodyProps,
  CardComposition,
  CardFooterProps,
  CardHeaderProps,
  CardProps,
} from './types';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Card: React.FC<CardProps> & CardComposition = ({ className, ...rest }) => (
  <div className={twMerge(clsx(cardStyles, className))} {...rest} />
);

const CardBody: React.FC<CardBodyProps> = ({ className, noPadding = false, ...rest }) => (
  <div className={twMerge(clsx(cardBodyVariants({ noPadding }), className))} {...rest} />
);

const CardFooter: React.FC<CardFooterProps> = ({ className, ...rest }) => (
  <div className={twMerge(clsx(cardFooterStyles, className))} {...rest} />
);

const CardHeader: React.FC<CardHeaderProps> = ({ className, noPadding = false, ...rest }) => (
  <div className={twMerge(clsx(cardHeaderVariants({ noPadding }), className))} {...rest} />
);

// -----------------------------------------------------------------------------
// Export
// -----------------------------------------------------------------------------

Card.displayName = 'Card';
CardBody.displayName = 'CardBody';
CardFooter.displayName = 'CardFooter';
CardHeader.displayName = 'CardHeader';

Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Header = CardHeader;

export default Card;
