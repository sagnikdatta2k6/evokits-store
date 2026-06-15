import { NextResponse } from 'next/server';
import { getAdminSettings, saveAdminSettings } from '@/lib/admin';

export async function POST(req: Request) {
  try {
    const { oldPassword, newPassword } = await req.json();

    const settings = getAdminSettings();

    if (oldPassword !== settings.passwordHash) {
      return NextResponse.json({ error: 'Incorrect current password' }, { status: 401 });
    }

    if (!newPassword || newPassword.length < 4) {
      return NextResponse.json({ error: 'New password must be at least 4 characters' }, { status: 400 });
    }

    settings.passwordHash = newPassword;
    
    if (saveAdminSettings(settings)) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
    }

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
