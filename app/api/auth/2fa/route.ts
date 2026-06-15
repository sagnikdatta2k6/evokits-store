import { NextResponse } from 'next/server';
import { getAdminSettings, saveAdminSettings } from '@/lib/admin';
import { authenticator } from 'otplib';
import QRCode from 'qrcode';

export async function GET() {
  const settings = getAdminSettings();
  return NextResponse.json({ isEnabled: settings.twoFactorEnabled });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;
    const settings = getAdminSettings();

    if (action === 'generate') {
      const secret = authenticator.generateSecret();
      const otpauth = authenticator.keyuri('Admin', 'EVOKITS Store', secret);
      const qrCodeUrl = await QRCode.toDataURL(otpauth);
      
      return NextResponse.json({ secret, qrCodeUrl });
    }

    if (action === 'enable') {
      const { secret, token } = body;
      
      const isValid = authenticator.verify({ token, secret });
      if (!isValid) {
        return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 });
      }

      settings.twoFactorSecret = secret;
      settings.twoFactorEnabled = true;
      
      if (saveAdminSettings(settings)) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
      }
    }

    if (action === 'disable') {
      const { password } = body;
      
      if (password !== settings.passwordHash) {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
      }

      settings.twoFactorSecret = null;
      settings.twoFactorEnabled = false;

      if (saveAdminSettings(settings)) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
      }
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
