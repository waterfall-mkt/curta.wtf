'use client';

import { type FC, ReactNode, useState } from 'react';

import type { Author } from '@/lib/types/protocol';

import { Button, Modal } from '@/components/ui';

// ---------------------------------------–-------------------------------------
// Props
// ---------------------------------------–-------------------------------------

type AuthorsModalProps = {
  data: Author[];
  children: ReactNode;
};

// ---------------------------------------–-------------------------------------
// Component
// ---------------------------------------–-------------------------------------

const SUBMIT_PUZZLE_GOOGLE_FORM =
  'https://docs.google.com/forms/d/e/1FAIpQLSe_ZLf3Xwqrpp9P3m7d8J1Iya6v9UOagXbEWzlYn3CHQFr4dw/viewform';

const AuthorsModal: FC<AuthorsModalProps> = ({ data, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Modal open={isOpen} onOpenChange={setIsOpen}>
      <Modal.Trigger asChild>
        <button
          id="author-avatar-7"
          className="z-[9] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gray-350 text-gray-100 ring-[3px] ring-gray-600 transition-transform hover:z-[10] hover:scale-110 hover:ring-0 focus-visible:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-250"
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') {
              document.getElementById('author-avatar-6')?.focus();
            }
          }}
        >
          <div>+{data.length - 7}</div>
        </button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Header align="center">
          <Modal.Title>Authors</Modal.Title>
          <Modal.Close />
        </Modal.Header>
        <Modal.Body noPadding>
          <div className="hide-scrollbar flex max-h-[20.5rem] flex-col overflow-y-scroll px-4">
            {children}
          </div>

          <div className="sticky bottom-0 flex grow border-t border-stroke bg-gray-600 p-4">
            <Button
              className="hidden w-full py-3 lg:pointer-events-auto lg:block"
              size="md"
              variant="primary"
              intent="primary"
              href={SUBMIT_PUZZLE_GOOGLE_FORM}
              newTab
            >
              Submit a puzzle
            </Button>
            <Button
              className="w-full lg:hidden"
              size="sm"
              variant="primary"
              intent="primary"
              href={SUBMIT_PUZZLE_GOOGLE_FORM}
              newTab
            >
              Submit a puzzle
            </Button>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AuthorsModal;
