
import React from 'react';
import { Tabs } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ProfileSettings } from './ProfileSettings';
import { SecuritySettings } from './SecuritySettings';
import { NotificationSettings } from './NotificationSettings';
import { SystemSettings } from './SystemSettings';
import { ConnectionsSettings } from './ConnectionsSettings';

interface SettingsContentProps {
  defaultValue?: string;
  isMobile?: boolean;
}

export function SettingsContent({ defaultValue = "profile", isMobile = false }: SettingsContentProps) {
  return (
    <>
      {!isMobile && (
        <div className="col-span-12 md:col-span-9 hidden md:block">
          <Card>
            <Tabs defaultValue={defaultValue} value={defaultValue}>
              <ProfileSettings />
              <SecuritySettings />
              <NotificationSettings />
              <SystemSettings />
              <ConnectionsSettings />
            </Tabs>
          </Card>
        </div>
      )}
      
      {isMobile && (
        <div className="col-span-12 md:hidden">
          <Card>
            <Tabs defaultValue={defaultValue} value={defaultValue}>
              <ProfileSettings />
              <SecuritySettings />
              <NotificationSettings />
              <SystemSettings />
              <ConnectionsSettings />
            </Tabs>
          </Card>
        </div>
      )}
    </>
  );
}
