import { NextRequest, NextResponse } from 'next/server';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  turnstileToken: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

interface DiscordEmbed {
  title: string;
  color: number;
  fields: {
    name: string;
    value: string;
    inline?: boolean;
  }[];
  footer: {
    text: string;
  };
  timestamp: string;
}

interface DiscordWebhookPayload {
  embeds: DiscordEmbed[];
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message, turnstileToken }: ContactFormData = await request.json();

    // Validation
    if (!name || !email || !message || !turnstileToken) {
      return NextResponse.json(
        { error: '必須項目が入力されていません。' },
        { status: 400 }
      );
    }

    // Turnstile verification
    const turnstileVerificationUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const turnstileResponse = await fetch(turnstileVerificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.CF_SECRET_KEY!,
        response: turnstileToken,
      }),
    });

    const turnstileResult: TurnstileResponse = await turnstileResponse.json();

    if (!turnstileResult.success) {
      return NextResponse.json(
        { error: 'ボット確認に失敗しました。再度お試しください。' },
        { status: 400 }
      );
    }

    // Create Discord embed
    const embed: DiscordEmbed = {
      title: '🚀 新しいお問い合わせ',
      color: 0x00D4FF, // Cyan color
      fields: [
        {
          name: '👤 お名前',
          value: name,
          inline: true,
        },
        {
          name: '📧 メールアドレス',
          value: email,
          inline: true,
        },
        {
          name: '💬 メッセージ',
          value: message.length > 1000 ? message.substring(0, 1000) + '...' : message,
          inline: false,
        },
        {
          name: '🕒 受信時刻',
          value: new Date().toLocaleString('ja-JP', { 
            timeZone: 'Asia/Tokyo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          }),
          inline: true,
        },
      ],
      footer: {
        text: 'ikeikeoshin.com お問い合わせフォーム',
      },
      timestamp: new Date().toISOString(),
    };

    const webhookPayload: DiscordWebhookPayload = {
      embeds: [embed],
    };

    // Send to Discord webhook
    const webhookResponse = await fetch(process.env.WEBHOOK_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      console.error('Discord webhook failed:', webhookResponse.status, await webhookResponse.text());
      return NextResponse.json(
        { error: 'メッセージの送信に失敗しました。しばらく後にお試しください。' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'お問い合わせを送信しました。' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました。' },
      { status: 500 }
    );
  }
}