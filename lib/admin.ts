import fs from 'fs';
import path from 'path';

const SETTINGS_FILE = path.join(process.cwd(), 'admin-settings.json');

export interface AdminSettings {
  passwordHash: string; // Storing plain text for prototype, but naming it hash to imply intent
  twoFactorEnabled: boolean;
  twoFactorSecret: string | null;
}

const DEFAULT_SETTINGS: AdminSettings = {
  passwordHash: "admin123",
  twoFactorEnabled: false,
  twoFactorSecret: null,
};

export function getAdminSettings(): AdminSettings {
  try {
    if (fs.existsSync(SETTINGS_FILE)) {
      const data = fs.readFileSync(SETTINGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to read admin settings:', error);
  }
  return DEFAULT_SETTINGS;
}

export function saveAdminSettings(settings: AdminSettings): boolean {
  try {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Failed to save admin settings:', error);
    return false;
  }
}
