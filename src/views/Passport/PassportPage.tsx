'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Tab, Tabs } from '@heroui/react';
import { SigninForm } from './SigninForm';
import { SignupForm } from './SignupForm';

interface PassportPageProps {
  /**
   * The default tab to show when the page is loaded from server side component.
   */
  defaultTab?: 'login' | 'register';
}

export const PassportPage: FC<PassportPageProps> = ({ defaultTab }) => {
  const [value, setValue] = useState(
    defaultTab === 'login' ? 'login' : 'register'
  );

  return (
    <div className="flex w-full flex-col justify-center">
      <Tabs
        className="mx-auto my-4"
        selectedKey={value}
        onSelectionChange={(key) => {
          setValue(key as 'login' | 'register');
        }}
      >
        <Tab key={'login'} title="Sign in">
          <SigninForm />
        </Tab>
        <Tab key={'register'} title="Sign up">
          <SignupForm />
        </Tab>
      </Tabs>
    </div>
  );
};
