import { supabase } from './supabaseClient';

export async function fetchCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('id', { ascending: true });
  if (error) throw error;
  return data;
}

export async function insertCard(card, file) {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw userError || new Error('User not found');

  let imagePath = '';
  if (file) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const path = `${userData.user.id}/${fileName}`;

    const { error: uploadError } = await supabase
      .storage
      .from('card-images')
      .upload(path, file);

    if (uploadError) throw uploadError;

    imagePath = path;
  }

  const enrichedCard = {
    ...card,
    user_id: userData.user.id,
    ...(imagePath && { image_path: imagePath }),
  };

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

export async function fetchCardTypes() {
  const { data, error } = await supabase
    .from('card_types')
    .select('*')
    .order('label');
  if (error) throw error;
  return data;
}