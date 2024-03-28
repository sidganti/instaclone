/*

CREATE PROFILE FUNCTION

create function handle_new_profile()
returns trigger as $$
begin
  insert into public.profiles (id, username, email, fullname)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'email', new.raw_user_meta_data->>'fullname');
  return new;
end;
$$ language plpgsql security definer;

NEW USER CREATED TRIGGER

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_profile();


AUTHENTICATED USERS RLS

create policy "Authenticated users access policy select" on schema.tables for select
  using (auth.uid () is not null);

create policy "Authenticated users access policy insert" on schema.tables for insert
with
  check (auth.uid () is not null);

create policy "Authenticated users access policy update" on schema.tables for update
  using (auth.uid () is not null);

create policy "Authenticated users access policy delete" on schema.tables for delete
  using (auth.uid () is not null);

PUBLIC RLS

create policy "Enable read access for all users"
on "public"."profiles"
for select using (true);

*/
