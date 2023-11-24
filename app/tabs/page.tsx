'use client';

import { MessageCircle } from 'lucide-react';

import { Tabs } from '@/components/ui';

export default function TabsPage() {
  return (
    <div className="w-full">
      <Tabs.Root>
        <Tabs.List className="w-full">
          <Tabs.Trigger value="0" icon={<MessageCircle />} stat={3}>
            fiveoutofnine
          </Tabs.Trigger>
          <Tabs.Trigger value="1">sabnock</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="0">5/9</Tabs.Content>
        <Tabs.Content value="1">sudolabel.eth</Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
