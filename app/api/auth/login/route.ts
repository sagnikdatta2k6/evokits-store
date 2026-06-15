import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getAdminSettings } from '@/lib/admin';
import { authenticator } from 'otplib';

export async function POST(req: Request) {
  try {
    const { password, token } = await req.json();

    const settings = getAdminSettings();

    if (password === settings.passwordHash) {
      
      // If 2FA is enabled, verify token
      if (settings.twoFactorEnabled && settings.twoFactorSecret) {
        if (!token) {
          return NextResponse.json({ requires2FA: true });
        }
        
        const isValid = authenticator.verify({ token, secret: settings.twoFactorSecret });
        if (!isValid) {
          return NextResponse.json({ error: 'Invalid authenticator code' }, { status: 401 });
        }
      }

      // Create a secure session token
      const mockSessionToken = "admin_" + Math.random().toString(36).substr(2, 9);
      
      // Set HTTP-Only Cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', mockSessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 1 day
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
