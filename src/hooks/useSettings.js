import { useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

export const useSettings = () => {
  const [settings, setSettings] = useState(settingsService.getSettingsSync());

  useEffect(() => {
    const unsubscribe = settingsService.subscribe((newSettings) => {
      setSettings(newSettings);
    });
    settingsService.getSettings().then(res => {
      if (res.success) setSettings(res.data);
    });
    return unsubscribe;
  }, []);

  return settings;
};
