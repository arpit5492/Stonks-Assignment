create table channel (
  channel_id serial PRIMARY KEY,
  username varchar(100) unique,
  email varchar(100),
  bio text,
  is_notify boolean,
  is_streaming boolean default false
);
