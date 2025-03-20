
import React from 'react';
import Layout from '@/components/layout/Layout';
import { SettingsSidebar } from '@/components/settings/SettingsLayout';
import { SettingsContent } from '@/components/settings/SettingsContent';

export default function Settings() {
  return (
    <Layout>
      <div className="space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
            <p className="text-muted-foreground mt-1">
              Configure your application preferences and system settings
            </p>
          </div>
        </div>
        
        {/* Settings Content */}
        <div className="grid grid-cols-12 gap-8">
          <SettingsSidebar defaultValue="profile" />
          <SettingsContent defaultValue="profile" isMobile={false} />
          <SettingsContent defaultValue="profile" isMobile={true} />
        </div>
      </div>
    </Layout>
  );
}
