import { NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabaseClient';
import { nanoid } from 'nanoid'; // ✅ secure, URL-friendly random ID

export async function POST(req: Request) {
  const { username, email, password, country } = await req.json();

  // Step 1: Register user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return NextResponse.json({ message: authError?.message || 'Sign up failed' }, { status: 400 });
  }

  // Step 2: Generate custom API key 
  const apiKey = nanoid(32); // You can also do 64 if you want longer

  // Step 3: Insert into users table
  const { error: insertError } = await supabase.from('users').insert({
    id: authData.user.id,
    username,
    country,
    api_key: apiKey,
  });

  if (insertError) {
    return NextResponse.json({ message: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
}
