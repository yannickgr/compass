import { supabase } from './supabaseClient';

export async function fetchCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

export async function insertCard(card) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw userError || new Error('User not found');

  const enrichedCard = { ...card, user_id: userData.user.id };

  const { data, error } = await supabase
    .from('cards')
    .insert([enrichedCard])
    .select();

  if (error) throw error;
  return data;
}

export async function removeCard(id) {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', id);
  if (error) throw error;
}