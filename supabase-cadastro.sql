-- Bio sem Mistério: criação automática do perfil do aluno após o cadastro no Supabase Auth.
-- Execute uma única vez no SQL Editor do projeto Bioaulas.
-- O perfil nasce sempre com aprovado = false. A professora aprova pelo painel admin.

create or replace function public.criar_perfil_novo_usuario()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfis (id, nome, aprovado)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nome', ''),
    false
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists ao_criar_usuario_criar_perfil on auth.users;

create trigger ao_criar_usuario_criar_perfil
after insert on auth.users
for each row
execute procedure public.criar_perfil_novo_usuario();
