import type { HTMLAttributes } from 'react';
import { cn } from '@heroui/react';
import type { ReviewType } from './review';
import { Review } from './review';

export type CardReviewProps = HTMLAttributes<HTMLDivElement> & ReviewType;

export const CardReview = ({ className, ...review }: CardReviewProps) => {
  return (
    <div
      className={cn('rounded-medium bg-content1 p-5 shadow-small', className)}
    >
      <Review {...review} />
    </div>
  );
};
